export function isGitHubRepo(item: GitHubRepo | GitHubTrendingRepo): item is GitHubRepo {
  return (item as GitHubRepo).full_name !== undefined;
}

export function isGitHubTrendingRepo(item: GitHubRepo | GitHubTrendingRepo): item is GitHubTrendingRepo {
  return (item as GitHubTrendingRepo).fullName !== undefined;
}
