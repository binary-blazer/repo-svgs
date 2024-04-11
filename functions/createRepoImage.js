/* eslint-disable no-undef */
import fs from "node:fs";
import path from "node:path";
import Logger from "../lib/Logger.js";
import { createCanvas, loadImage } from "canvas";
import emojiRegex from "emoji-regex";

export default async function createRepoImage({ repositories, emojiEnv }) {
  await repositories.forEach(async (repository) => {
    const image =
      emojiEnv === "true"
        ? emojiRegex().exec(repository.description)
          ? emojiRegex().exec(repository.description)[0]
          : "📦"
        : "📦";

    const directory = path.join(process.cwd(), "out", repository.name);
    const canvas = createCanvas(1500, 600);
    const context = canvas.getContext("2d");

    const backgroundImage = await loadImage(
      path.join(process.cwd(), "assets", "background.png"),
    );

    const radius = 60;
    context.beginPath();
    context.moveTo(radius, 0);
    context.lineTo(canvas.width - radius, 0);
    context.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
    context.lineTo(canvas.width, canvas.height - radius);
    context.quadraticCurveTo(
      canvas.width,
      canvas.height,
      canvas.width - radius,
      canvas.height,
    );
    context.lineTo(radius, canvas.height);
    context.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
    context.lineTo(0, radius);
    context.quadraticCurveTo(0, 0, radius, 0);
    context.closePath();

    context.clip();

    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    context.font = "100px Arial";
    context.textAlign = "center";
    context.fillStyle = "#ffffff";
    context.fillText(image, canvas.width / 2, canvas.height / 2 - 90);

    context.font = "70px Arial";
    context.textAlign = "center";
    context.fillStyle = "#ffffff";

    let name = repository.name;
    let nameWidth = context.measureText(name).width;
    while (nameWidth > canvas.width) {
      name = name.slice(0, -4) + "...";
      nameWidth = context.measureText(name).width;
    }
    context.fillText(name, canvas.width / 2, canvas.height / 2 + 80);

    context.font = "30px Arial";
    context.fillStyle = "#808080"; // Set the fill color to a tone of gray
    let description = repository.description
      ? repository.description.replace(emojiRegex(), "")
      : "No description provided.";
    if (description.length > 64) {
      description = description.slice(0, 64) + "...";
    }
    let descriptionWidth = context.measureText(description).width;
    while (descriptionWidth > canvas.width) {
      description = description.slice(0, -4) + "...";
      descriptionWidth = context.measureText(description).width;
    }
    context.fillText(description, canvas.width / 2, canvas.height / 2 + 135);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(path.join(directory, "image.png"), buffer);
  });
  Logger({ type: "info", message: "All images created successfully!" });
}
