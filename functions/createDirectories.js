import fs from "node:fs";
import path from "node:path";
import Logger from "../lib/Logger.js";

export default async function createDirectories({ repositories }) {
  await repositories.forEach((repository) => {
    // eslint-disable-next-line no-undef
    const directory = path.join(process.cwd(), "out", repository.name);
    fs.mkdirSync(directory, { recursive: true });
  });
  Logger({ type: "info", message: "Directories created successfully!" });
}
