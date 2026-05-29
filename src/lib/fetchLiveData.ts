import { parsePSIResponse, setLiveCardData, LiveCardData } from "./psi";

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const TARGET_URL   = "https://billyzhang.dev/temp";

export async function fetchAndStoreLiveData(): Promise<LiveCardData> {
  const GITHUB_REPO = process.env.GITHUB_REPO ?? "Dx-B/portfolio";
  const commitSha   = process.env.VERCEL_GIT_COMMIT_SHA ?? "b446c81";

  const ghHeaders: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  };

  const psiUrl =
    `${PSI_ENDPOINT}?url=${encodeURIComponent(TARGET_URL)}&strategy=desktop` +
    `&category=performance&category=accessibility&category=best-practices&category=seo` +
    (process.env.PSI_API_KEY ? `&key=${process.env.PSI_API_KEY}` : "");

  const [psiRes, repoRes, commitRes] = await Promise.all([
    fetch(psiUrl, { cache: "no-store" }),
    fetch(`https://api.github.com/repos/${GITHUB_REPO}`,                         { headers: ghHeaders, cache: "no-store" }),
    fetch(`https://api.github.com/repos/${GITHUB_REPO}/commits/${commitSha}`,    { headers: ghHeaders, cache: "no-store" }),
  ]);

  if (!psiRes.ok) {
    const body = await psiRes.text().catch(() => "");
    throw new Error(`PSI ${psiRes.status}: ${body.slice(0, 200)}`);
  }

  const psiData = parsePSIResponse(await psiRes.json());

  const github: LiveCardData["github"] = { stars: 0, additions: 0, deletions: 0, commitDate: "" };

  if (repoRes.ok) {
    const repo = await repoRes.json();
    github.stars = repo.stargazers_count ?? 0;
  }

  if (commitRes.ok) {
    const commit = await commitRes.json();
    github.additions  = commit.stats?.additions ?? 0;
    github.deletions  = commit.stats?.deletions ?? 0;
    github.commitDate = commit.commit?.author?.date ?? "";
  }

  const data: LiveCardData = { psi: psiData, github, measuredAt: new Date().toISOString() };
  await setLiveCardData(data);
  return data;
}
