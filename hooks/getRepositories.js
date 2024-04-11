/* eslint-disable no-undef */
import Logger from "../lib/Logger.js";

export default async function getRepositories({
  type = "all",
  GithubToken,
  GithubUsername,
  IgnoreRepos,
  RepoName,
}) {
  const fetchRepositories = async () => {
    Logger({
      type: "info",
      message: "Fetching repositories...",
    });
    try {
      const response = await fetch(
        `https://api.github.com/user/repos?type=${type}`,
        {
          headers: {
            Authorization: `Bearer ${GithubToken}`,
          },
        },
      );

      if (response.status === 403) {
        Logger({
          type: "error",
          message: "API rate limit exceeded. Please try again later.",
        });
        process.exit(1);
      }

      Logger({
        type: "success",
        message: "Repositories fetched successfully.",
      });

      const toJson = await response.json();
      const data = toJson
        .filter((repo) => repo.owner.login === GithubUsername)
        .filter((repo) => repo.fork === false)
        .filter((repo) => repo.archived === false)
        .filter((repo) => repo.visibility === type)
        .filter((repo) => repo.name === RepoName);
      if (IgnoreRepos) {
        const ignoreRepos = IgnoreRepos.split(",");
        return data.filter((repo) => !ignoreRepos.includes(repo.name));
      }
      return data;
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  return fetchRepositories();
}
