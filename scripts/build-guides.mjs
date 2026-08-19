import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { guides } from "./guide-content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://filepreflight.ai-labs.co.jp";
const published = "2026-08-19";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function header(prefix, guideTitle) {
  return [
    '<header class="site-header">',
    '  <div class="shell header-inner">',
    '    <a class="brand" href="' + prefix + '" aria-label="FilePreflight home">',
    '      <span class="brand-mark" aria-hidden="true"><span></span></span><span>FilePreflight</span>',
    "    </a>",
    '    <nav class="desktop-nav" aria-label="Primary navigation">',
    '      <a href="' + prefix + '">Product</a>',
    '      <a href="' + prefix + 'guides/">Guides</a>',
    '      <a href="' + prefix + '#privacy">Privacy</a>',
    '      <a href="https://github.com/jp-north-man/FilePreflight" target="_blank" rel="noopener noreferrer">GitHub</a>',
    "    </nav>",
    '    <div class="language-switch" aria-label="Language">',
    '      <a href="' + prefix + 'ja/" lang="ja">日本語</a>',
    '      <a href="' + (guideTitle ? "./" : prefix + "guides/") + '" aria-current="page">EN</a>',
    "    </div>",
    "  </div>",
    "</header>"
  ].join("\n");
}

function footer(prefix) {
  return [
    '<footer class="site-footer">',
    '  <div class="shell footer-inner">',
    '    <a class="brand footer-brand" href="' + prefix + '"><span class="brand-mark" aria-hidden="true"><span></span></span><span>FilePreflight</span></a>',
    "    <p>© 2026 FilePreflight</p>",
    '    <div class="footer-links">',
    '      <a href="' + prefix + '#privacy">Privacy</a>',
    '      <a href="' + prefix + 'guides/">Guides</a>',
    '      <a href="https://github.com/jp-north-man/FilePreflight" target="_blank" rel="noopener noreferrer">GitHub</a>',
    '      <a href="https://www.ai-labs.co.jp/products/filepreflight">Developed by AI Labs LLC</a>',
    "    </div>",
    "  </div>",
    "</footer>"
  ].join("\n");
}

function articleSchema(guide, canonical) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        datePublished: published,
        dateModified: published,
        inLanguage: "en",
        mainEntityOfPage: canonical,
        author: {
          "@type": "Organization",
          name: "AI Labs LLC",
          url: "https://www.ai-labs.co.jp/"
        },
        publisher: {
          "@type": "Organization",
          name: "AI Labs LLC",
          url: "https://www.ai-labs.co.jp/"
        },
        citation: guide.sources.map((source) => source.url)
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "FilePreflight", item: siteUrl + "/" },
          { "@type": "ListItem", position: 2, name: "Guides", item: siteUrl + "/guides/" },
          { "@type": "ListItem", position: 3, name: guide.title, item: canonical }
        ]
      }
    ]
  });
}

function renderArticle(guide, index) {
  const canonical = siteUrl + "/guides/" + guide.slug + "/";
  const previous = index > 0 ? guides[index - 1] : null;
  const next = index < guides.length - 1 ? guides[index + 1] : null;
  const sources = guide.sources
    .map((source) => '<li><a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source.title) + "</a> — " + escapeHtml(source.publisher) + "</li>")
    .join("\n");
  const sections = guide.sections
    .map((section) => '<section><h2>' + escapeHtml(section.heading) + "</h2>" + section.html.join("\n") + "</section>")
    .join("\n");
  const pagination = [
    '<nav class="guide-pagination" aria-label="Guide navigation">',
    previous ? '<a href="../' + previous.slug + '/">← ' + escapeHtml(previous.shortTitle) + "</a>" : '<a href="../">← All guides</a>',
    next ? '<a href="../' + next.slug + '/">' + escapeHtml(next.shortTitle) + " →</a>" : '<a href="../">All guides →</a>',
    "</nav>"
  ].join("\n");

  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    '  <meta name="description" content="' + escapeHtml(guide.description) + '" />',
    '  <meta name="theme-color" content="#0b1020" />',
    '  <meta name="robots" content="index, follow" />',
    '  <meta property="og:type" content="article" />',
    '  <meta property="og:site_name" content="FilePreflight" />',
    '  <meta property="og:title" content="' + escapeHtml(guide.title) + '" />',
    '  <meta property="og:description" content="' + escapeHtml(guide.description) + '" />',
    '  <meta property="og:url" content="' + canonical + '" />',
    '  <meta property="og:image" content="' + siteUrl + '/og.png" />',
    '  <meta property="og:locale" content="en_US" />',
    '  <meta property="article:published_time" content="' + published + '" />',
    '  <meta property="article:modified_time" content="' + published + '" />',
    '  <meta name="twitter:card" content="summary_large_image" />',
    '  <meta name="twitter:title" content="' + escapeHtml(guide.title) + '" />',
    '  <meta name="twitter:description" content="' + escapeHtml(guide.description) + '" />',
    '  <meta name="twitter:image" content="' + siteUrl + '/og.png" />',
    '  <link rel="canonical" href="' + canonical + '" />',
    '  <link rel="alternate" hreflang="en" href="' + canonical + '" />',
    '  <link rel="alternate" hreflang="x-default" href="' + canonical + '" />',
    '  <link rel="stylesheet" href="../../styles.css" />',
    '  <script type="application/ld+json">' + articleSchema(guide, canonical) + "</script>",
    "  <title>" + escapeHtml(guide.title) + " | FilePreflight Guides</title>",
    "</head>",
    "<body>",
    '  <a class="skip-link" href="#main">Skip to content</a>',
    header("../../", guide.title),
    '  <main id="main">',
    '    <section class="guide-hero">',
    '      <div class="hero-glow hero-glow-one" aria-hidden="true"></div>',
    '      <div class="guide-hero-inner">',
    '        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../../">FilePreflight</a><span aria-hidden="true">/</span><a href="../">Guides</a><span aria-hidden="true">/</span><span>' + escapeHtml(guide.shortTitle) + "</span></nav>",
    '        <p class="eyebrow light">' + escapeHtml(guide.category) + "</p>",
    "        <h1>" + escapeHtml(guide.title) + "</h1>",
    '        <p class="hero-lede">' + escapeHtml(guide.description) + "</p>",
    '        <div class="guide-meta"><span>Published August 19, 2026</span><span>' + escapeHtml(guide.readTime) + "</span><span>Reviewed against official sources</span></div>",
    "      </div>",
    "    </section>",
    '    <div class="guide-article-wrap">',
    '      <article class="guide-article">',
    '        <aside class="guide-summary"><strong>In brief</strong><p>' + escapeHtml(guide.summary) + "</p></aside>",
    guide.warning ? '<aside class="guide-warning"><strong>Important boundary</strong><p>' + escapeHtml(guide.warning) + "</p></aside>" : "",
    sections,
    '        <section class="guide-sources">',
    "          <h2>Official sources</h2>",
    '          <p class="guide-disclosure">This guide uses primary sources available on August 19, 2026. Product policies and software features can change, so confirm current terms before handling sensitive material.</p>',
    "          <ul>" + sources + "</ul>",
    "        </section>",
    '        <aside class="guide-note"><strong>About FilePreflight</strong><p>FilePreflight is a Windows file-preparation product being developed by AI Labs LLC. The initial release is not yet available. Planned capabilities and limits may change, and automated detection remains best-effort.</p></aside>',
    pagination,
    "      </article>",
    "    </div>",
    "  </main>",
    footer("../../"),
    "</body>",
    "</html>",
    ""
  ].join("\n");
}

function indexSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FilePreflight Guides",
    url: siteUrl + "/guides/",
    description: "Practical, source-backed guides for preparing documents, spreadsheets, PDFs, and code files before using AI.",
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "AI Labs LLC",
      url: "https://www.ai-labs.co.jp/"
    },
    hasPart: guides.map((guide) => ({
      "@type": "Article",
      headline: guide.title,
      url: siteUrl + "/guides/" + guide.slug + "/"
    }))
  });
}

function renderIndex() {
  const cards = guides
    .map((guide) => [
      '<a class="guide-card" href="' + guide.slug + '/">',
      '  <span class="guide-card-inner">',
      '    <span class="eyebrow">' + escapeHtml(guide.category) + "</span>",
      "    <h2>" + escapeHtml(guide.title) + "</h2>",
      "    <p>" + escapeHtml(guide.description) + "</p>",
      "    <span>Read guide →</span>",
      "  </span>",
      "</a>"
    ].join("\n"))
    .join("\n");

  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    '  <meta name="description" content="Practical, source-backed guides for preparing documents, spreadsheets, PDFs, and code files before using AI." />',
    '  <meta name="theme-color" content="#0b1020" />',
    '  <meta name="robots" content="index, follow" />',
    '  <meta property="og:type" content="website" />',
    '  <meta property="og:site_name" content="FilePreflight" />',
    '  <meta property="og:title" content="FilePreflight Guides — Prepare files before using AI" />',
    '  <meta property="og:description" content="Practical, source-backed guidance for reducing unnecessary disclosure before an AI upload." />',
    '  <meta property="og:url" content="' + siteUrl + '/guides/" />',
    '  <meta property="og:image" content="' + siteUrl + '/og.png" />',
    '  <meta property="og:locale" content="en_US" />',
    '  <meta name="twitter:card" content="summary_large_image" />',
    '  <link rel="canonical" href="' + siteUrl + '/guides/" />',
    '  <link rel="alternate" hreflang="en" href="' + siteUrl + '/guides/" />',
    '  <link rel="alternate" hreflang="x-default" href="' + siteUrl + '/guides/" />',
    '  <link rel="stylesheet" href="../styles.css" />',
    '  <script type="application/ld+json">' + indexSchema() + "</script>",
    "  <title>FilePreflight Guides — Prepare files before using AI</title>",
    "</head>",
    "<body>",
    '  <a class="skip-link" href="#main">Skip to content</a>',
    header("../", ""),
    '  <main id="main">',
    '    <section class="guide-hero">',
    '      <div class="hero-glow hero-glow-one" aria-hidden="true"></div>',
    '      <div class="guide-hero-inner">',
    '        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">FilePreflight</a><span aria-hidden="true">/</span><span>Guides</span></nav>',
    '        <p class="eyebrow light">File privacy before AI</p>',
    "        <h1>Prepare the file, then use AI.</h1>",
    '        <p class="hero-lede">Practical, source-backed guides for reducing unnecessary disclosure in documents, spreadsheets, PDFs, and code files before an AI upload.</p>',
    '        <div class="guide-meta"><span>12 guides</span><span>Updated August 19, 2026</span><span>Official sources</span></div>',
    "      </div>",
    "    </section>",
    '    <section class="section">',
    '      <div class="shell">',
    '        <div class="guide-index-intro"><p class="eyebrow">Start with the risk, not the tool</p><h2>A review workflow you can explain.</h2><p>Each guide separates visible content, hidden data, service settings, and human review. No guide promises that automated detection makes a file completely safe or anonymous.</p></div>',
    '        <div class="guide-grid">' + cards + "</div>",
    "      </div>",
    "    </section>",
    "  </main>",
    footer("../"),
    "</body>",
    "</html>",
    ""
  ].join("\n");
}

async function write(path, content) {
  const target = join(root, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

await write("guides/index.html", renderIndex());
for (const [index, guide] of guides.entries()) {
  await write(join("guides", guide.slug, "index.html"), renderArticle(guide, index));
}

const sitemapUrls = [
  { path: "/", priority: "1.0" },
  { path: "/ja/", priority: "0.8" },
  { path: "/guides/", priority: "0.9" },
  ...guides.map((guide) => ({ path: "/guides/" + guide.slug + "/", priority: "0.8" }))
];
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapUrls.map((item) => [
    "  <url>",
    "    <loc>" + siteUrl + item.path + "</loc>",
    "    <lastmod>" + published + "</lastmod>",
    "    <changefreq>monthly</changefreq>",
    "    <priority>" + item.priority + "</priority>",
    "  </url>"
  ].join("\n")),
  "</urlset>",
  ""
].join("\n");
await write("sitemap.xml", sitemap);
