/* eslint-disable no-undef */
import "dotenv/config";
import getRepositories from "../hooks/getRepositories.js";
import createDirectories from "../functions/createDirectories.js";
import createDataYAML from "../functions/createDataYAML.js";
import createRepoImage from "../functions/createRepoImage.js";

export default async function client() {
  const type =
    process.env.GITHUB_REPO_TYPE === "1"
      ? "public"
      : process.env.GITHUB_REPO_TYPE === "2"
        ? "private"
        : "all";
  const GithubUsername = process.env.GITHUB_USERNAME;
  const GithubToken = process.env.GITHUB_ACCESS_TOKEN;

  const repositories = await getRepositories({
    type,
    GithubToken,
    GithubUsername,
  });

  await createDirectories({ repositories }).then(async () => {
    await createDataYAML({ repositories }).then(async () => {
        await createRepoImage({ repositories });
    });
  });
}
