import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === ".git") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

function fail(message) {
  failures.push(message);
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

const files = await walk(root);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const canonicalUrls = [];

for (const file of htmlFiles) {
  const source = await readFile(file, "utf8");
  const label = relative(root, file);
  if (!/<html lang="(?:en|ja)">/.test(source)) fail(label + ": missing supported html lang");
  if (!/<title>[^<]+<\/title>/.test(source)) fail(label + ": missing title");
  if (!/<meta name="description" content="[^"]+"/.test(source)) fail(label + ": missing description");
  if (!/<link rel="stylesheet" href="[^"]*styles\.css"/.test(source)) fail(label + ": missing stylesheet");
  const canonical = source.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) fail(label + ": missing canonical");
  else {
    canonicalUrls.push(canonical);
    if (!canonical.startsWith("https://filepreflight.ai-labs.co.jp/")) fail(label + ": canonical uses the wrong host");
  }
  const structuredData = [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!structuredData.length) fail(label + ": missing JSON-LD");
  for (const block of structuredData) {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      fail(label + ": invalid JSON-LD: " + error.message);
    }
  }
  if (source.includes("jp-north-man.github.io/FilePreflight")) fail(label + ": old GitHub Pages URL remains");
  if (source.includes("site.js")) fail(label + ": removed language script is still referenced");

  const attributes = [...source.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const rawValue of attributes) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/.test(rawValue)) continue;
    const [pathPart, fragment = ""] = rawValue.split("#", 2);
    if (!pathPart) {
      if (fragment && !source.includes('id="' + fragment + '"')) fail(label + ": missing local fragment #" + fragment);
      continue;
    }
    const clean = pathPart.split("?")[0];
    let target = clean.startsWith("/") ? join(root, clean.slice(1)) : resolve(dirname(file), clean);
    if (clean.endsWith("/")) target = join(target, "index.html");
    if (!extname(target) && !clean.endsWith("/")) target = join(target, "index.html");
    if (!await exists(target)) fail(label + ": broken local link " + rawValue + " -> " + relative(root, target));
  }
}

if (new Set(canonicalUrls).size !== canonicalUrls.length) fail("Canonical URLs are not unique");
if (htmlFiles.filter((file) => file.includes(join("guides", ""))).length !== 13) fail("Expected one guide index and 12 guide articles");

const rootHtml = await readFile(join(root, "index.html"), "utf8");
const jaHtml = await readFile(join(root, "ja", "index.html"), "utf8");
if (!rootHtml.includes('<html lang="en">')) fail("Root page must be English");
if (!jaHtml.includes('<html lang="ja">')) fail("Japanese page must use ja language");
if (!rootHtml.includes("Automated detection is best-effort")) fail("Root page must disclose best-effort detection");
if (!jaHtml.includes("自動検出はベストエフォート")) fail("Japanese page must disclose best-effort detection");

const cname = (await readFile(join(root, "CNAME"), "utf8")).trim();
if (cname !== "filepreflight.ai-labs.co.jp") fail("CNAME is incorrect");
const robots = await readFile(join(root, "robots.txt"), "utf8");
if (!robots.includes("https://filepreflight.ai-labs.co.jp/sitemap.xml")) fail("robots.txt sitemap is incorrect");
const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
for (const canonical of canonicalUrls) {
  if (!sitemap.includes(canonical)) fail("Sitemap does not contain " + canonical);
}

if (failures.length) {
  console.error("Site validation failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exitCode = 1;
} else {
  console.log("Validated " + htmlFiles.length + " HTML pages, " + canonicalUrls.length + " canonical URLs, local links, language routes, CNAME, robots.txt, and sitemap.xml.");
}
