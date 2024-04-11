/* eslint-disable no-undef */
import fs from "node:fs";
import path from "node:path";
import Logger from "../lib/Logger.js";

export default function convertPngSvg({ repositories }) {
  repositories.forEach(async (repository) => {
    const pngPath = path.join(
      process.cwd(),
      "out",
      repository.name,
      `image.png`,
    );

    const buffer = fs.readFileSync(pngPath);
    const base64 = buffer.toString("base64");

    const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="1500" height="600">
                <image href="data:image/png;base64,${base64}" x="0" y="0" width="1500" height="600"/>
            </svg>
        `;

    const svgPath = path.join(
      process.cwd(),
      "out",
      repository.name,
      `image.svg`,
    );
    fs.writeFileSync(svgPath, svg);
  });
  Logger({
    type: "info",
    message: "Converted all repository PNG images to SVG.",
  });
}
