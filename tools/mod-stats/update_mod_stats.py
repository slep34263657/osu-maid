#!/usr/bin/env python3
"""Add newly ranked/loved osu!standard maps to mod-stars/ (star ratings and SS pp for the common mod combos). Standard library only.

    python tools/mod-stats/update_mod_stats.py --tool "dotnet <build dir>/mod-stats-calc.dll"      # normal run
    python tools/mod-stats/update_mod_stats.py --tool ... --dry-run                               # list what would be added
    python tools/mod-stats/update_mod_stats.py --tool ... --rebuild-from-dir <dir of <id>.osu>    # full local rebuild (see README)

Steps: check calculator version -> list ranked/loved sets newest first until `list_from` -> keep std beatmap ids that mod-stars does not have
-> download each .osu (mirrors in order, polite delay, retries) -> run the calculator -> merge into mod-stars/<floor(id/1000)>.json and meta.json.
No .osu file is kept. Exit codes: 0 ok (including nothing to do), 2 listing failed on every mirror, 3 calculator version differs from meta.json.
"""
import argparse
import gzip
import json
import os
import shlex
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

UA = "mod-stats-updater/0.1 (github actions; static star rating table)"
DELAY = 0.6            # seconds between requests to one mirror (osu.direct allows 120/min, burst 25)
RETRIES = 3
MAX_TRIES = 5          # runs a failing map is retried before it is reported as given up

# Mirrors, tried in this order. Verified 2026-11-24 (see README): osu.direct lists and serves files; osu.ppy.sh serves files only.
# catboy.best answered 403 "banned" from the author's IP and nerinyan.moe answered 530/1033, so they are last-resort file sources, unverified.
LIST_MIRRORS = [("osu.direct/search", "https://osu.direct/api/v2/search?mode=0&status={status}&sort=ranked_date:desc&amount=100&offset={offset}")]
FILE_MIRRORS = [("osu.direct", "https://osu.direct/api/osu/{id}"),
                ("osu.ppy.sh", "https://osu.ppy.sh/osu/{id}"),
                ("catboy.best", "https://catboy.best/osu/{id}")]
STATUSES = {1: "ranked", 4: "loved"}   # approved (2) is a closed set of 2007-2015 maps, nothing new appears there
DOWN = set()           # mirrors to treat as failing (testing the fallback): --simulate-fail osu.direct,osu.ppy.sh


def log(*a):
    print(*a, flush=True)


def http(url, mirror):
    """GET with retries. Returns bytes, or raises. 429 waits for the mirror's reset header."""
    last = None
    for attempt in range(RETRIES):
        if mirror in DOWN:
            raise RuntimeError(f"{mirror} simulated down")
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=40) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            last = e
            if e.code == 404:
                raise
            if e.code == 429:
                time.sleep(min(70, int(e.headers.get("retry-after") or e.headers.get("x-ratelimit-reset") or 30)) + 1)
            elif e.code in (401, 403):
                raise   # banned or blocked: retrying will not help
            else:
                time.sleep(2 ** attempt * 2)
        except Exception as e:   # timeouts, resets, DNS
            last = e
            time.sleep(2 ** attempt * 2)
    raise last


def parse_date(s):
    return datetime.fromisoformat(s.replace("Z", "+00:00")) if s else None


def list_new(known, list_from):
    """{beatmap_id: ranked_date} for std beatmaps in ranked/loved sets since list_from that mod-stars does not have yet."""
    found = {}
    for status in STATUSES:
        offset = 0
        while True:
            data, err = None, []
            for name, tpl in LIST_MIRRORS:
                try:
                    data = json.loads(http(tpl.format(status=status, offset=offset), name))
                    time.sleep(DELAY)
                    break
                except Exception as e:
                    err.append(f"{name}: {e}")
            if data is None:
                print(f"LISTING FAILED on every mirror ({'; '.join(err)}). Nothing was changed.", file=sys.stderr)
                sys.exit(2)
            if not data:
                break
            stop = False
            for s in data:
                rd = parse_date(s.get("ranked_date"))
                if rd is None or rd < list_from:
                    stop = True
                    continue
                for b in s.get("beatmaps", []):
                    if b.get("mode_int") == 0 and b.get("status") in ("ranked", "approved", "loved") and str(b["id"]) not in known:
                        found[b["id"]] = rd
            if stop or len(data) < 100:
                break
            offset += len(data)
    return found


def download(bid, dest):
    errs = []
    for name, tpl in FILE_MIRRORS:
        try:
            body = http(tpl.format(id=bid), name)
            time.sleep(DELAY)
        except Exception as e:
            errs.append(f"{name}: {e}")
            continue
        head = body[:64].lstrip(b"\xef\xbb\xbf")
        if head.startswith(b"osu file format") and b"[HitObjects]" in body:
            Path(dest).write_bytes(body)
            return name
        errs.append(f"{name}: not an .osu file")
    raise RuntimeError("; ".join(errs))


def calc_version(tool):
    return subprocess.run(shlex.split(tool) + ["--version"], capture_output=True, text=True, check=True).stdout.strip()


def combos_compatible(meta, combos):
    """meta's combo list must be a prefix of the calculator's, so existing positions keep their meaning (new combos can only be appended)."""
    old = meta.get("combos")
    return not old or combos[:len(old)] == old


def calc_combos(tool):
    return subprocess.run(shlex.split(tool) + ["--combos"], capture_output=True, text=True, check=True).stdout.strip().split(",")


def run_calc(tool, target, only=None):
    """({beatmap_id: [stars per combo or None]}, {beatmap_id: [SS pp per combo or None]}, errors) for a folder of <id>.osu or an '@listfile'."""
    n = len(calc_combos(tool))
    cmd = shlex.split(tool) + ["--pp"] + (["--only", ",".join(only)] if only else []) + [str(target)]
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        raise SystemExit(f"calculator failed: {p.stderr[-500:]}")
    stars, pp = {}, {}
    for line in p.stdout.splitlines():
        parts = line.split("\t")
        vals = [float(v) if v else None for v in parts[1:]]
        stars[int(parts[0])], pp[int(parts[0])] = vals[:n], vals[n:2 * n]
    errors = [l for l in p.stderr.splitlines() if l.strip()]
    return stars, pp, errors


def load_chunks(folder):
    chunks = {}
    for f in folder.glob("[0-9]*.json"):
        chunks[int(f.stem)] = json.loads(f.read_text(encoding="utf-8"))
    return chunks


def write_chunks(folder, chunks, only=None):
    """Write chunk files whose text changed. Returns the files touched."""
    touched = []
    for k, d in chunks.items():
        if only is not None and k not in only:
            continue
        text = json.dumps(d, separators=(",", ":"))
        f = folder / f"{k}.json"
        if not f.exists() or f.read_text(encoding="utf-8") != text:
            f.write_text(text, encoding="utf-8")
            touched.append(f.name)
    return touched


def write_meta(folder, meta, chunks):
    files = list(folder.glob("[0-9]*.json"))
    meta["maps_covered"] = sum(len(d) for d in chunks.values())
    meta["rate"] = "per map: stars for each entry of combos, in that order (DT 1.5x, HT 0.75x, HR, EZ, DT+HR, ...); null = not computed. mod-pp/ has SS pp at the same positions"
    meta["pp"] = {"folder": "mod-pp", "kind": "SS: 100% accuracy, full combo", "decimals": 1}
    meta.pop("analyzer_build", None)
    meta["built"] = datetime.now(timezone.utc).date().isoformat()
    meta["files"] = len(files)
    meta["bytes"] = sum(f.stat().st_size for f in files)
    meta["bytes_gzipped"] = sum(len(gzip.compress(f.read_bytes())) for f in files)
    (folder / "meta.json").write_text(json.dumps(meta, separators=(",", ":")), encoding="utf-8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", default="mod-stars", help="the mod-stars folder (default ./mod-stars)")
    ap.add_argument("--pp-dir", default=None, help="the mod-pp folder (default: mod-pp next to --dir)")
    ap.add_argument("--tool", default=os.environ.get("MOD_STATS_TOOL"), help='calculator command, e.g. "dotnet /path/mod-stats-calc.dll"')
    ap.add_argument("--max-maps", type=int, default=3000, help="at most this many new maps per run (oldest first); the rest wait for the next run")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--rebuild-from-dir", help="recompute every map from <id>.osu files in this folder and rewrite all chunks (changes the stored version)")
    ap.add_argument("--simulate-fail", default="", help="comma list of mirror names to treat as down (testing the fallback)")
    ap.add_argument("--list-from", help="override meta list_from (ISO date), for testing")
    args = ap.parse_args()
    DOWN.update(x for x in args.simulate_fail.split(",") if x)
    if not args.tool:
        sys.exit("--tool (or MOD_STATS_TOOL) is required")
    folder = Path(args.dir)
    pp_folder = Path(args.pp_dir) if args.pp_dir else folder.parent / "mod-pp"
    pp_folder.mkdir(parents=True, exist_ok=True)
    meta = json.loads((folder / "meta.json").read_text(encoding="utf-8"))

    version = calc_version(args.tool)
    combos = calc_combos(args.tool)
    if args.rebuild_from_dir:
        return rebuild(args, folder, meta, version, combos)
    if not combos_compatible(meta, combos):
        print(f"COMBO MISMATCH: mod-stars/meta.json has combos {meta['combos']} but the calculator outputs {combos}. Refusing to write columns in a different order (the calculator may only append new combos).", file=sys.stderr)
        sys.exit(3)
    if version != meta["version"]:
        print(f"VERSION MISMATCH: mod-stars/meta.json was built with osu! ruleset {meta['version']} but the calculator now builds as {version}. "
              f"Refusing to mix versions. Rebuild every map with the new version (see README, 'Full rebuild'), then update the pin in the .csproj and meta.json together.", file=sys.stderr)
        sys.exit(3)
    log(f"calculator {version} matches meta.json")

    chunks = load_chunks(folder)
    pp_chunks = load_chunks(pp_folder)
    known = {k for d in chunks.values() for k in d}
    list_from = parse_date(args.list_from or meta.get("list_from") or "2026-11-04T00:00:00Z")
    log(f"{len(known)} maps in mod-stars; listing ranked/loved sets since {list_from.isoformat()}")
    found = list_new(known, list_from)
    for k, v in meta.get("pending", {}).items():   # maps that failed on earlier runs are retried (up to MAX_TRIES times in total)
        if int(k) not in known:
            found.setdefault(int(k), parse_date(v["d"]))
    todo = sorted(found, key=lambda b: (found[b], b))   # oldest first so list_from can advance safely
    log(f"{len(todo)} new std beatmaps missing; this run takes at most {args.max_maps}")
    if args.dry_run:
        return
    batch = todo[:args.max_maps]

    added, skipped, mirror_use = {}, [], {}
    with tempfile.TemporaryDirectory() as tmp:
        for n, bid in enumerate(batch, 1):
            try:
                m = download(bid, Path(tmp) / f"{bid}.osu")
                mirror_use[m] = mirror_use.get(m, 0) + 1
            except Exception as e:
                skipped.append((bid, str(e)[:200]))
            if n % 200 == 0:
                log(f"downloaded {n}/{len(batch)}")
        pp_added = {}
        if any(Path(tmp).glob("*.osu")):
            stars, pp_added, errors = run_calc(args.tool, tmp)
            for bid, row in stars.items():
                added[bid] = row
            for e in errors:
                skipped.append((int(e.split(":")[0]) if e.split(":")[0].isdigit() else 0, "calculator: " + e[:200]))
    meta["combos"] = combos
    for bid, row in added.items():
        chunks.setdefault(bid // 1000, {})[str(bid)] = [None if v is None else round(v, 2) for v in row]
    for bid, row in pp_added.items():
        pp_chunks.setdefault(bid // 1000, {})[str(bid)] = [None if v is None else round(v, 1) for v in row]
    touched = write_chunks(folder, chunks, {b // 1000 for b in added})
    write_chunks(pp_folder, pp_chunks, {b // 1000 for b in added})
    # list_from moves up only to the oldest set still waiting (or just before the newest set seen when nothing waits); ids already stored are never listed twice
    remaining = [found[b] for b in todo if b not in added and b not in {s[0] for s in skipped}]
    remaining += [found[b] for b in todo[args.max_maps:]]
    if remaining:
        meta["list_from"] = min(remaining).strftime("%Y-%m-%dT%H:%M:%SZ")
    elif found:
        meta["list_from"] = (max(found.values())).strftime("%Y-%m-%dT%H:%M:%SZ")
    # maps that failed stay in "pending" and are retried by later runs; after MAX_TRIES they move to "gave_up" so nothing is silent
    old = meta.get("pending", {})
    pending, gave_up = {}, meta.get("gave_up", [])
    for bid, _ in skipped:
        if bid in found:
            n = old.get(str(bid), {}).get("n", 0) + 1
            if n < MAX_TRIES:
                pending[str(bid)] = {"d": found[bid].strftime("%Y-%m-%dT%H:%M:%SZ"), "n": n}
            elif bid not in gave_up:
                gave_up.append(bid)
    for key, val in (("pending", pending), ("gave_up", gave_up)):
        if val:
            meta[key] = val
        else:
            meta.pop(key, None)
    write_meta(folder, meta, chunks)
    log(f"added {len(added)} maps ({', '.join(f'{k} {v}' for k, v in mirror_use.items()) or 'no downloads'}); failed {len(skipped)} (pending {len(pending)}, gave up {len(gave_up)}); files touched: {len(touched)}; list_from now {meta.get('list_from')}")
    for s in skipped[:20]:
        log("  skipped", s)


def rebuild(args, folder, meta, version, combos):
    src = Path(args.rebuild_from_dir)
    stars, pps, errors = run_calc(args.tool, src)
    pp_folder = Path(args.pp_dir) if args.pp_dir else folder.parent / "mod-pp"
    pp_folder.mkdir(parents=True, exist_ok=True)
    chunks, pp_chunks = {}, {}
    for bid in sorted(stars):
        chunks.setdefault(bid // 1000, {})[str(bid)] = [None if v is None else round(v, 2) for v in stars[bid]]
        pp_chunks.setdefault(bid // 1000, {})[str(bid)] = [None if v is None else round(v, 1) for v in pps[bid]]
    for f in list(folder.glob("[0-9]*.json")) + list(pp_folder.glob("[0-9]*.json")):
        f.unlink()
    write_chunks(folder, chunks)
    write_chunks(pp_folder, pp_chunks)
    meta["version"] = version
    meta["combos"] = combos
    meta["calculator"] = "official osu!lazer osu! ruleset difficulty calculator (NuGet ppy.osu.Game.Rulesets.Osu)"
    write_meta(folder, meta, chunks)
    log(f"rebuilt {len(stars)} maps with {version}; {len(errors)} calculator errors")


if __name__ == "__main__":
    main()
