/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
import { Octokit } from "@octokit/rest";
import Logger from "../lib/Logger.js";

export default async function updateReadmeHead({
  repositories,
  GITHUB_USERNAME,
  GITHUB_ACCESS_TOKEN,
  GITHUB_REPO_NAME,
}) {
  const octokit = new Octokit({
    auth: GITHUB_ACCESS_TOKEN,
  });

  await repositories.forEach(async (repository) => {
    try {
      const readmeResponse = await octokit.repos.getContent({
        owner: GITHUB_USERNAME,
        repo: repository.name,
        path: "README.md",
      });

      let readmeContent = global.Buffer.from(
        readmeResponse.data.content,
        "base64",
      ).toString();

      const newImageMarkdown = `![${repository.name}](https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/main/out/${repository.name}/image.svg)`;

      const imageMarkdownRegex =
        /\!\[.*\]\(https:\/\/raw\.githubusercontent\.com\/.*\/image\.svg\)\n\n/g;

      readmeContent = readmeContent.replace(imageMarkdownRegex, "");

      readmeContent = `${newImageMarkdown}\n\n${readmeContent}`;

      await octokit.repos.createOrUpdateFileContents({
        owner: GITHUB_USERNAME,
        repo: repository.name,
        path: "README.md",
        message:
          "Update README with new SVG - Action Performed by the BinaryBlazer repo-svgs software",
        content: global.Buffer.from(readmeContent).toString("base64"),
        sha: readmeResponse.data.sha,
      });
    } catch (error) {
      if (error.status === 404) {
        Logger({
          type: "info",
          message: `No README found for repository: ${repository.name}. Skipping...`,
        });
      } else if (error.status === 409) {
        Logger({
          type: "info",
          message: `Cannot update README for repository: ${repository.name} due to protected branches. Skipping...`,
        });
      } else {
        throw error;
      }
    }
  });

  Logger({
    type: "info",
    message: "All Repository Readmes updated successfully!",
  });
}
