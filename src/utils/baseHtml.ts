export function wrapHtml(html: string, title: string) {
  return `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script>
<title>${title}</title></head><body>${html}</body></html>`;
}
