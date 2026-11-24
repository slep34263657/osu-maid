// mod-stats-calc: star ratings (and optionally SS pp) of osu!standard .osu files for the common difficulty-changing mod combos, using the official osu! ruleset difficulty calculator.
//   mod-stats-calc --version              prints the osu! ruleset package version
//   mod-stats-calc --combos               prints the combo order of the output columns
//   mod-stats-calc <dir>                  every <beatmap_id>.osu in <dir>
//   add "--pp" before the target to append one SS (100% accuracy, full combo) pp column per combo after the star columns
//   add "--only HT,HR" before the target to compute only those columns (the others are left empty, so a later merge keeps old values)
//   mod-stats-calc @<listfile>            every path listed (one per line) in <listfile>; the file name (without .osu) is the beatmap id
// Output (stdout): one line per map, "<beatmap_id>" followed by one TAB-separated column per combo, in the order printed by --combos, with full doubles. Failures go to stderr as "<id>: <error>".
// NC counts as DT (same rate and same difficulty), so it has no column.
using System.Globalization;
using System.Reflection;
using osu.Framework.Audio.Track;
using osu.Framework.Graphics.Textures;
using osu.Game.Beatmaps;
using osu.Game.Beatmaps.Formats;
using osu.Game.IO;
using osu.Game.Rulesets;
using osu.Game.Rulesets.Objects;
using osu.Game.Rulesets.Scoring;
using osu.Game.Scoring;
using osu.Game.Rulesets.Mods;
using osu.Game.Rulesets.Osu;
using osu.Game.Rulesets.Osu.Difficulty;
using osu.Game.Rulesets.Osu.Mods;
using osu.Game.Skinning;

var ruleset = new OsuRuleset();
var combos = new (string Name, Func<Mod[]> Mods)[]
{
    ("DT", () => new Mod[] { new OsuModDoubleTime() }),
    ("HT", () => new Mod[] { new OsuModHalfTime() }),
    ("HR", () => new Mod[] { new OsuModHardRock() }),
    ("EZ", () => new Mod[] { new OsuModEasy() }),
    ("DTHR", () => new Mod[] { new OsuModDoubleTime(), new OsuModHardRock() }),
    ("HDDT", () => new Mod[] { new OsuModHidden(), new OsuModDoubleTime() }),
    ("HD", () => new Mod[] { new OsuModHidden() }),
    ("HDHR", () => new Mod[] { new OsuModHidden(), new OsuModHardRock() }),
    ("HDDTHR", () => new Mod[] { new OsuModHidden(), new OsuModDoubleTime(), new OsuModHardRock() }),
    ("EZHD", () => new Mod[] { new OsuModEasy(), new OsuModHidden() }),
    ("EZDT", () => new Mod[] { new OsuModEasy(), new OsuModDoubleTime() }),
    ("EZHDDT", () => new Mod[] { new OsuModEasy(), new OsuModHidden(), new OsuModDoubleTime() }),
};
var version = (typeof(OsuRuleset).Assembly.GetCustomAttribute<AssemblyInformationalVersionAttribute>()?.InformationalVersion ?? "unknown").Split('+')[0];
if (args.Length == 1 && args[0] == "--version") { Console.WriteLine(version); return 0; }
if (args.Length == 1 && args[0] == "--combos") { Console.WriteLine(string.Join(",", combos.Select(c => c.Name))); return 0; }
var only = new HashSet<string>(combos.Select(c => c.Name));
var rest = args.ToList();
bool withPp = false;
if (rest.Count >= 2 && rest[0] == "--pp") { withPp = true; rest.RemoveAt(0); }
if (rest.Count >= 3 && rest[0] == "--only") { only = new HashSet<string>(rest[1].Split(',')); rest.RemoveRange(0, 2); }
string[] files = null;
if (rest.Count == 1 && rest[0].StartsWith("@") && File.Exists(rest[0][1..])) files = File.ReadAllLines(rest[0][1..]).Where(l => l.Trim().Length > 0).ToArray();
else if (rest.Count == 1 && Directory.Exists(rest[0])) files = Directory.GetFiles(rest[0], "*.osu");
if (files == null) { Console.Error.WriteLine("usage: mod-stats-calc --version | --combos | [--pp] [--only A,B] <dir> | @<listfile>"); return 2; }

var rulesets = new Ruleset[] { ruleset };
var lines = new System.Collections.Concurrent.ConcurrentBag<(long Id, string Line)>();
Parallel.ForEach(files, new ParallelOptions { MaxDegreeOfParallelism = int.TryParse(Environment.GetEnvironmentVariable("OSU_MAP_DB_THREADS"), out var th) && th > 0 ? th : Math.Max(1, Environment.ProcessorCount) }, path =>
{
    var id = Path.GetFileNameWithoutExtension(path);
    try
    {
        var working = new FileWorkingBeatmap(path, rulesets);
        var stars = new List<string>(); var pps = new List<string>();
        Dictionary<HitResult, int> maxStats = null;
        foreach (var c in combos)
        {
            if (!only.Contains(c.Name)) { stars.Add(""); pps.Add(""); continue; }
            var mods = c.Mods();
            var attrs = ruleset.CreateDifficultyCalculator(working).Calculate(mods);
            stars.Add(attrs.StarRating.ToString("R", CultureInfo.InvariantCulture));
            if (!withPp) continue;
            maxStats ??= MaximumStatistics(working.GetPlayableBeatmap(ruleset.RulesetInfo, Array.Empty<Mod>()));
            var score = new ScoreInfo(working.BeatmapInfo, ruleset.RulesetInfo) { Accuracy = 1, MaxCombo = ((OsuDifficultyAttributes)attrs).MaxCombo, Mods = mods, Statistics = new Dictionary<HitResult, int>(maxStats), MaximumStatistics = new Dictionary<HitResult, int>(maxStats) };
            pps.Add(ruleset.CreatePerformanceCalculator().Calculate(score, attrs).Total.ToString("R", CultureInfo.InvariantCulture));
        }
        lines.Add((long.Parse(id), id + "\t" + string.Join("\t", stars) + (withPp ? "\t" + string.Join("\t", pps) : "")));
    }
    catch (Exception e)
    {
        Console.Error.WriteLine($"{id}: {e.GetType().Name}: {e.Message.Replace('\n', ' ')}");
    }
});
foreach (var l in lines.OrderBy(l => l.Id)) Console.WriteLine(l.Line);
return 0;

static Dictionary<HitResult, int> MaximumStatistics(IBeatmap beatmap)
{
    var stats = new Dictionary<HitResult, int>();
    void add(HitObject h)
    {
        foreach (var n in h.NestedHitObjects) add(n);
        var r = h.CreateJudgement().MaxResult;
        if (r != HitResult.None) stats[r] = stats.GetValueOrDefault(r) + 1;
    }
    foreach (var h in beatmap.HitObjects) add(h);
    return stats;
}

internal class FileWorkingBeatmap : WorkingBeatmap
{
    private readonly Beatmap beatmap;

    public FileWorkingBeatmap(string file, Ruleset[] rulesets)
        : this(read(file), rulesets)
    {
    }

    private FileWorkingBeatmap(Beatmap beatmap, Ruleset[] rulesets)
        : base(beatmap.BeatmapInfo, null)
    {
        this.beatmap = beatmap;
        beatmap.BeatmapInfo.Ruleset = rulesets[0].RulesetInfo;
    }

    private static Beatmap read(string file)
    {
        using var stream = File.OpenRead(file);
        using var reader = new LineBufferedReader(stream);
        return Decoder.GetDecoder<Beatmap>(reader).Decode(reader);
    }

    protected override IBeatmap GetBeatmap() => beatmap;
    public override Texture GetBackground() => throw new NotImplementedException();
    protected override Track GetBeatmapTrack() => throw new NotImplementedException();
    protected override ISkin GetSkin() => throw new NotImplementedException();
    public override Stream GetStream(string storagePath) => throw new NotImplementedException();
}
