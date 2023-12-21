// Type definitions for GitHub API

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
  };
  html_url: string;
  description: string;
  url: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  score: number;
};

type GitHubSearchResult = {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepo[];
};

type GitHubTrendingRepo = {
  id: string;
  contributors: string[];
  contributorsUrl: string;
  description: string;
  forkCount: string;
  fullName: string;
  language: string;
  meta: string;
  starCount: string;
  url: string;
};

type GitHubTrendingResult = GitHubTrendingRepo[];
