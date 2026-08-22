import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skippedDirectories = new Set([".git", "node_modules"]);
const faviconLinks = [
  '    <link rel="icon" href="/favicon.ico" sizes="any" />',
  '    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />',
  '    <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" />',
  '    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />'
].join("\n");
const faviconLinkPattern = /\r?\n[ \t]*<link rel="(?:icon|apple-touch-icon)" href="\/(?:favicon\.ico|favicon\.svg|favicon-96x96\.png|apple-touch-icon\.png)"[^>]*>/g;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && skippedDirectories.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(path);
  }
  return files;
}

for (const file of await walk(root)) {
  const source = await readFile(file, "utf8");
  const withoutFavicons = source.replace(faviconLinkPattern, "");
  const updated = withoutFavicons.replace(/(<title>[^<]+<\/title>)/, "$1\n" + faviconLinks);
  if (updated === withoutFavicons) throw new Error("Could not inject favicon links into " + file);
  if (updated !== source) await writeFile(file, updated, "utf8");
}
