export default async function getRepositories({
  type = "all",
  GithubToken,
  GithubUsername,
}) {
  const fetchRepositories = async () => {
    console.log("Fetching repositories...");
    try {
      const response = await fetch(
        `https://api.github.com/user/repos?type=${type}`,
        {
          headers: {
            Authorization: `Bearer ${GithubToken}`,
          },
        },
      );
      console.log("Repositories fetched successfully!");
      const toJson = await response.json();
      const data = toJson
        .filter((repo) => repo.owner.login === GithubUsername)
        .filter((repo) => repo.fork === false)
        .filter((repo) => repo.archived === false)
        .filter((repo) => repo.visibility === type);
      return data;
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  return fetchRepositories();
}
