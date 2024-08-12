import { readdir, stat } from "node:fs/promises";
import { convertToHtml } from "./src/utils/converter";
import path from "path";
import { GLOBAL } from "./src/config/global";

async function main(dir = "./docs") {
  const files = await readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      await main(filePath);
    } else if (file.endsWith(".md")) {
      const { html, metadata } = await convertToHtml(filePath);
      GLOBAL.title = metadata.title;
      const newFilePath = path.join("./dist", filePath.replace(".md", ".html"));
      const newFile = Bun.write(newFilePath, html);
      await newFile;
    }
  }
}

main();
