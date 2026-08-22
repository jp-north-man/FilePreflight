import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const host = "https://filepreflight.ai-labs.co.jp";
const failures = [];

const requiredCanonicals = [
  "/", "/ja/", "/ai-document-sanitizer/", "/offline-document-redaction-tool/",
  "/document-privacy-scanner/", "/sanitize-excel-before-ai-analysis/",
  "/sanitize-pdf-before-chatgpt/", "/legal-document-redaction-for-ai/",
  "/remove-api-keys-secrets-before-ai/", "/guides/",
  "/guides/is-it-safe-to-upload-confidential-documents-to-chatgpt/",
  "/guides/redact-sensitive-information-before-chatgpt/",
  "/guides/anonymize-company-data-before-ai/",
  "/guides/remove-hidden-data-and-metadata-before-ai/",
  "/guides/best-offline-document-redaction-tools-for-ai/",
  "/evidence/", "/checklists/before-ai-upload/", "/downloads/pdf-redaction-demo/"
].map((route) => host + route);

const redirects = new Map([
  [join("guides", "ai-document-sanitizer", "index.html"), "/ai-document-sanitizer/"],
  [join("guides", "anonymize-excel-data-before-ai", "index.html"), "/sanitize-excel-before-ai-analysis/"],
  [join("guides", "remove-hidden-data-metadata-before-ai", "index.html"), "/guides/remove-hidden-data-and-metadata-before-ai/"],
  [join("guides", "offline-document-redaction-tool", "index.html"), "/offline-document-redaction-tool/"],
  [join("guides", "redact-sanitize-pdf-before-chatgpt", "index.html"), "/sanitize-pdf-before-chatgpt/"],
  [join("guides", "document-privacy-scanner", "index.html"), "/document-privacy-scanner/"],
  [join("guides", "best-offline-document-redaction-tools", "index.html"), "/guides/best-offline-document-redaction-tools-for-ai/"],
  [join("guides", "legal-document-redaction-before-ai", "index.html"), "/legal-document-redaction-for-ai/"],
  [join("guides", "remove-api-keys-before-ai-coding-tools", "index.html"), "/remove-api-keys-secrets-before-ai/"]
]);

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

function textContent(value) {
  return value.replace(/<[^>]+>/g, "").replaceAll("&amp;", "&").replaceAll("&mdash;", "—").trim();
}

const files = await walk(root);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const canonicalUrls = [];
const titles = new Map();
const descriptions = new Map();

for (const file of htmlFiles) {
  const source = await readFile(file, "utf8");
  const label = relative(root, file);
  const expectedRedirect = redirects.get(label);
  const isRedirect = source.includes('<meta name="robots" content="noindex, follow"');
  if (Boolean(expectedRedirect) !== isRedirect) fail(label + ": redirect classification is incorrect");
  if (!/<html lang="(?:en|ja)">/.test(source)) fail(label + ": missing supported html lang");
  if (!/<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/.test(source)) fail(label + ": missing h1");
  const title = textContent(source.match(/<title>([^<]+)<\/title>/)?.[1] || "");
  if (!title) fail(label + ": missing title");
  if (!isRedirect && title.length > 65) fail(label + ": title exceeds 65 characters (" + title.length + ")");
  const description = source.match(/<meta name="description" content="([^"]+)"/)?.[1] || "";
  if (!description) fail(label + ": missing description");
  if (!isRedirect && description.length > 160) fail(label + ": description exceeds 160 characters (" + description.length + ")");
  if (!/<link rel="stylesheet" href="[^"]*styles\.css"/.test(source)) fail(label + ": missing stylesheet");

  const canonical = source.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) {
    fail(label + ": missing canonical");
  } else {
    if (!canonical.startsWith(host + "/")) fail(label + ": canonical uses the wrong host");
    if (!isRedirect) {
      canonicalUrls.push(canonical);
      if (titles.has(title)) fail(label + ": duplicate title with " + titles.get(title));
      else titles.set(title, label);
      if (descriptions.has(description)) fail(label + ": duplicate description with " + descriptions.get(description));
      else descriptions.set(description, label);
    }
  }

  if (expectedRedirect) {
    if (canonical !== host + expectedRedirect) fail(label + ": redirect canonical is incorrect");
    if (!source.includes("url=" + expectedRedirect) && !source.includes("url=../../" + expectedRedirect.slice(1))) fail(label + ": redirect target is incorrect");
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

  for (const match of source.matchAll(/<a\b([^>]*\bdata-cta="[^"]+"[^>]*)>/g)) {
    if (!/\bdata-page="[^"]+"/.test(match[1])) fail(label + ": data-cta link is missing data-page");
    if (!/\bdata-destination="[^"]+"/.test(match[1])) fail(label + ": data-cta link is missing data-destination");
  }

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
    if (!await exists(target)) {
      fail(label + ": broken local link " + rawValue + " -> " + relative(root, target));
    } else if (fragment && target.endsWith(".html")) {
      const targetSource = await readFile(target, "utf8");
      if (!targetSource.includes('id="' + fragment + '"')) fail(label + ": missing target fragment " + rawValue);
    }
  }
}

if (htmlFiles.length !== 27) fail("Expected 18 indexable pages and 9 redirects; found " + htmlFiles.length + " HTML pages");
if (canonicalUrls.length !== 18) fail("Expected 18 indexable canonical URLs; found " + canonicalUrls.length);
if (new Set(canonicalUrls).size !== canonicalUrls.length) fail("Canonical URLs are not unique");
for (const canonical of requiredCanonicals) {
  if (!canonicalUrls.includes(canonical)) fail("Missing required canonical page " + canonical);
}

const rootHtml = await readFile(join(root, "index.html"), "utf8");
const jaHtml = await readFile(join(root, "ja", "index.html"), "utf8");
const c01Html = await readFile(join(root, "ai-document-sanitizer", "index.html"), "utf8");
const c02Html = await readFile(join(root, "offline-document-redaction-tool", "index.html"), "utf8");
const c03Html = await readFile(join(root, "document-privacy-scanner", "index.html"), "utf8");
const evidenceHtml = await readFile(join(root, "evidence", "index.html"), "utf8");
const secretGuide = await readFile(join(root, "remove-api-keys-secrets-before-ai", "index.html"), "utf8");

if (!rootHtml.includes("Create Safe Copy") || !rootHtml.includes("Safe copy created")) fail("English preview must match the product UI labels");
if (!jaHtml.includes("安全なコピーを作成") || !jaHtml.includes("安全なコピーを作成しました")) fail("Japanese preview must match the product UI labels");
if (!rootHtml.includes("Automated detection is best-effort")) fail("Root page must disclose best-effort detection");
if (!jaHtml.includes("自動検出はベストエフォート")) fail("Japanese page must disclose best-effort detection");
if (!c01Html.includes("<h1>AI Document Sanitizer: Make Files Safe Before You Upload</h1>")) fail("C01 must use the requested H1");
if (!c01Html.includes("No download or checkout is available yet")) fail("C01 must disclose release availability");
if (!c02Html.includes("No download or checkout is available yet")) fail("C02 must disclose release availability");
if (!c03Html.includes("Automated detection is best-effort")) fail("C03 must disclose best-effort detection");
if (!evidenceHtml.includes("0</strong><span>release claims marked verified today")) fail("Evidence page must not imply pre-release verification");
if (!evidenceHtml.includes("Result pending")) fail("Evidence page must label the release result as pending");
if (!secretGuide.includes("not a repository or Git-history scanner")) fail("U05 must disclose the MVP source-code boundary");
if (!rootHtml.includes('href="offline-document-redaction-tool/"') || !rootHtml.includes('href="document-privacy-scanner/"')) fail("Home must link product-intent pages");

const generatedArticleRoutes = [
  "/guides/is-it-safe-to-upload-confidential-documents-to-chatgpt/",
  "/guides/redact-sensitive-information-before-chatgpt/",
  "/guides/anonymize-company-data-before-ai/",
  "/sanitize-excel-before-ai-analysis/",
  "/guides/remove-hidden-data-and-metadata-before-ai/",
  "/sanitize-pdf-before-chatgpt/",
  "/guides/best-offline-document-redaction-tools-for-ai/",
  "/legal-document-redaction-for-ai/",
  "/remove-api-keys-secrets-before-ai/"
];
for (const route of generatedArticleRoutes) {
  const source = await readFile(join(root, ...route.split("/").filter(Boolean), "index.html"), "utf8");
  if (!source.includes('class="guide-related"')) fail(route + ": missing contextual related links");
  if (!source.includes('class="guide-inline-cta"')) fail(route + ": missing pre-release CTA");
}

const requiredDownloads = [
  "downloads/before-ai-upload-checklist.txt",
  "downloads/redaction-verification-checklist.txt",
  "downloads/exposed-secret-response-checklist.txt",
  "downloads/placeholder-mapping-template.csv",
  "downloads/excel-hidden-data-checklist.txt",
  "downloads/hidden-data-inventory.txt",
  "downloads/legal-ai-review-checklist.txt",
  "downloads/pdf-redaction-demo/unsafe-overlay-demo.pdf",
  "downloads/pdf-redaction-demo/canaries-absent-demo.pdf"
];
for (const path of requiredDownloads) {
  if (!await exists(join(root, path))) fail("Missing support asset " + path);
}

const expectedHashes = new Map([
  ["downloads/pdf-redaction-demo/unsafe-overlay-demo.pdf", "4910ADA866424F3CC9C738247710527D349A5D135DE3B42B33FB15E02C432CE0"],
  ["downloads/pdf-redaction-demo/canaries-absent-demo.pdf", "E6B3EF38247808599B8FF713CE4E1F569D09EE33DB761B26F046E8E577937A0A"]
]);
for (const [path, expected] of expectedHashes) {
  const actual = createHash("sha256").update(await readFile(join(root, path))).digest("hex").toUpperCase();
  if (actual !== expected) fail(path + ": SHA-256 changed; re-verify the PDF artifact");
}

const cnamePath = join(root, "CNAME");
if (!await exists(cnamePath)) {
  fail("CNAME is required for the FilePreflight custom domain");
} else if ((await readFile(cnamePath, "utf8")).trim() !== "filepreflight.ai-labs.co.jp") {
  fail("CNAME is incorrect");
}
const robots = await readFile(join(root, "robots.txt"), "utf8");
if (!robots.includes(host + "/sitemap.xml")) fail("robots.txt sitemap is incorrect");
const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
for (const canonical of canonicalUrls) {
  if (!sitemap.includes(canonical)) fail("Sitemap does not contain " + canonical);
}
for (const redirectPath of redirects.keys()) {
  const route = "/" + redirectPath.replaceAll("\\", "/").replace(/index\.html$/, "");
  if (sitemap.includes(host + route)) fail("Sitemap must not contain redirect route " + route);
}

if (failures.length) {
  console.error("Site validation failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exitCode = 1;
} else {
  console.log("Validated 27 HTML pages (18 indexable, 9 redirects), SEO metadata, structured data, local links and fragments, roadmap routes, CTA identifiers, product boundaries, support assets, PDF hashes, CNAME, robots.txt, and sitemap.xml.");
}
