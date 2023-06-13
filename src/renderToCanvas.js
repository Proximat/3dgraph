import { renderToStaticMarkup } from "react-dom/server";
import createCanvas from "./createCanvas";
import loadImage from "./loadImage";

export default async function renderToCanvas(content, { width, height }) {
  const canvas = createCanvas(400, 200, true);
  const ctx = canvas.getContext("2d");
  const url = `data:image/svg+xml,
    ${encodeURIComponent(renderToStaticMarkup(content))}`;

  const image = await loadImage(url);
  ctx.drawImage(image, 0, 0);
  return canvas;
}
