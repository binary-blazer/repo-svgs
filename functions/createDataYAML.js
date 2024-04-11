import fs from "node:fs";
import path from "node:path";
import Logger from "../lib/Logger.js";

export default async function createDataYAML({ repositories }) {
  await repositories.forEach((repository) => {
    // eslint-disable-next-line no-undef
    const directory = path.join(process.cwd(), "out", repository.name);
    const data = `name: ${repository.name}\ndescription: ${repository.description}\nurl: ${repository.html_url}\n`;
    fs.writeFileSync(path.join(directory, "data.yaml"), data);
  });
  Logger({ type: "info", message: "All data YAML created successfully!" });
}
