/* eslint-disable no-undef */
import "dotenv/config";
import getRepositories from "../hooks/getRepositories.js";
import createDirectories from "../functions/createDirectories.js";
import createDataYAML from "../functions/createDataYAML.js";
import createRepoImage from "../functions/createRepoImage.js";
import convertPngSvg from "../functions/convertPngSvg.js";
import updateReadmeHead from "../functions/updateReadmeHead.js";

export default async function client() {
  const type =
    process.env.GITHUB_REPO_TYPE === "1"
      ? "public"
      : process.env.GITHUB_REPO_TYPE === "2"
        ? "private"
        : "all";
  const GithubUsername = process.env.GITHUB_USERNAME;
  const GithubToken = process.env.GITHUB_ACCESS_TOKEN;
  const EmojiEnv = process.env.GITHUB_ACCEPT_EMOJIS || "false";
  const RepoName = process.env.GITHUB_REPO_NAME;
  const UpdateHead = process.env.GITHUB_UPDATE_README_HEAD || "false";
  const IgnoreRepos = process.env.GITHUB_IGNORE_REPOS || "";

  // Do not delete the below if condition, it could cause a security vulnerability.
  if (!GithubUsername || !GithubToken || !RepoName) {
    throw new Error(
      "Please provide the required environment variables in the .env file.",
    );
  }

  const repositories = await getRepositories({
    type,
    GithubToken,
    GithubUsername,
    IgnoreRepos,
  });

  await createDirectories({ repositories }).then(async () => {
    await createDataYAML({ repositories }).then(async () => {
      await createRepoImage({ repositories, emojiEnv: EmojiEnv }).then(
        async () => {
          await convertPngSvg({ repositories });
          if (UpdateHead === "true") {
            await updateReadmeHead({
              repositories,
              GITHUB_USERNAME: GithubUsername,
              GITHUB_ACCESS_TOKEN: GithubToken,
              GITHUB_REPO_NAME: RepoName,
            });
          }
        },
      );
    });
  });
}
