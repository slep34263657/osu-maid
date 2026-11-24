# Star ratings with mods: automatic updates

`mod-stars/` holds star ratings of every ranked, approved and loved osu!standard difficulty for the common difficulty-changing mod combos, one file per `floor(beatmap_id / 1000)`:
`{"<beatmap_id>": [DT, HT, HR, EZ, DTHR, HDDT, HD, HDHR, HDDTHR, EZHD, EZDT, EZHDDT]}`, 2 decimals, `null` where a value is not computed. The order is `combos` in `meta.json` (read the index from there; NC counts as DT).
`meta.json` also records the calculator name and version, the build date and counts. Shorter entries (for example `[DT, null]`) are valid: missing or `null` values mean "not computed" until the local bulk fill has run. New combos can only be appended to the calculator's list, never reordered, and the scripts refuse to run if `meta.json`'s list is not a prefix of the calculator's.
Hidden changes the star rating in the current calculator (measured on 50 maps: HD alone +0.42 stars on average over NM, HDDT +0.21 over DT, EZHD +0.81 over EZ), so the HD combos are included.

## How it works

`.github/workflows/update-mod-stats.yml` runs daily (and on demand from the Actions tab):

1. Builds `tools/mod-stats/calc`, a small .NET tool that uses the official osu! ruleset difficulty calculator (NuGet `ppy.osu.Game.Rulesets.Osu`, pinned in its `.csproj`). It computes all combos for each map.
2. `tools/mod-stats/update_mod_stats.py` lists ranked and loved sets newest first, back to `list_from` in `meta.json`, and keeps the std beatmap ids that `mod-stars/` does not have.
3. Downloads each `.osu` into a temporary folder, runs the calculator, merges the results into the chunk files and `meta.json`. No `.osu` files are kept or committed.
4. Commits only changed files under `mod-stars/` and skips the commit when nothing changed.

At most 2000 new maps are processed per run (oldest first), so a large backlog is cleared over several days. `list_from` only moves up to the oldest set still waiting.
A map that fails to download or calculate stays in `pending` in `meta.json` and is retried on later runs; after 5 tries it is listed in `gave_up`.

## Version check

The calculator version comes from the package that was built. Before doing anything, the script compares it with `version` in `mod-stars/meta.json`, and the calculator's combo order with `combos`.
If either differs the run stops with exit code 3 and an error message, and nothing is written, so two versions are never mixed.

## One-time bulk fill (on a PC with the .osu files)

The Actions job only handles new maps. Existing maps that have only DT get every other combo from `bulk_fill_local.py`:

```
dotnet build tools/mod-stats/calc -c Release -o <build dir>
python3 tools/mod-stats/bulk_fill_local.py --tool "dotnet <build dir>/mod-stats-calc.dll" --maps <maps>/ranked <maps>/loved --dir mod-stars
```

It computes all missing combos in one pass over each map, saves after every batch of 3000 maps and skips finished maps when started again, so it can be stopped and resumed.
Then review and commit `mod-stars/`. Run it before the first Actions run so the job only adds maps newer than what the table contains.

## Mirrors (tested 2026-11-24, no keys)

| Mirror | Listing | .osu file | Result |
|---|---|---|---|
| osu.direct | `/api/v2/search?mode=0&status=1\|4&sort=ranked_date:desc&amount=100&offset=N` | `/api/osu/<id>` | works; rate limit 120 requests/min (burst 25) |
| osu.ppy.sh | none without a key | `/osu/<id>` | file works from a home IP; may be blocked from runner IPs |
| catboy.best | not used | `/osu/<id>` | answered 403 "banned" from the tested IP; unverified from runners |
| nerinyan.moe | not used | not used | answered 530 / error 1033 (down) |
| beatconnect.io | not used | not used | needs a key |

Files are tried in the order osu.direct, osu.ppy.sh, catboy.best, with 3 retries each and a 0.6 s delay between requests. Listing only has osu.direct.
If every listing mirror fails the run stops with exit code 2 and changes nothing.

## Run it locally

```
dotnet build tools/mod-stats/calc -c Release -o /tmp/dt-calc
python3 tools/mod-stats/update_mod_stats.py --tool "dotnet /tmp/dt-calc/mod-stats-calc.dll" --dry-run
python3 tools/mod-stats/update_mod_stats.py --tool "dotnet /tmp/dt-calc/mod-stats-calc.dll" --max-maps 50
```

`--simulate-fail osu.direct` treats a mirror as down, to test the fallback.

## Full rebuild (new calculator version)

A new osu! ruleset version changes star ratings, so every map has to be recomputed. Doing that through the mirrors would take days, so do it locally from a full set of `.osu` files
(for example the monthly osu! files dump, extracted to a folder of `<beatmap_id>.osu`):

1. Change `OsuVersion` in `tools/mod-stats/calc/ModStatsCalc.csproj` and build.
2. `python3 tools/mod-stats/update_mod_stats.py --tool "dotnet <build>/mod-stats-calc.dll" --rebuild-from-dir <folder of id.osu files>`
   (recomputes every map in that folder, rewrites all chunks and sets `version` in `meta.json`; keep only ranked/approved/loved std maps in the folder).
3. Review and commit the result together with the `.csproj` change.

## Limits

- Only osu!standard. NC is covered by DT; other mods (FL, relax and so on) are not.
- Maps that were later unranked or deleted are not removed.
- Maps that changed after being ranked are not recomputed.
- The gap between the original dump (2026-11-05) and the first run is filled by the first runs (`list_from` starts at 2026-11-04).
