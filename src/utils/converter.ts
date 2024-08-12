import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { wrapHtml } from "./baseHtml";
import matter from "gray-matter";

export async function convertToHtml(filePath: string) {
  const file = Bun.file(filePath);
  const text = await file.text();

  const { data: metadata, content } = matter(text);

  const data = await unified().use(remarkHtml).use(remarkParse).process(content);

  return { html: wrapHtml(data.value as string, metadata.title ?? "My Docs"), metadata };
}
