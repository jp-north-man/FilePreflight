import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { guides } from "./guide-content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://filepreflight.ai-labs.co.jp";
const published = "2026-08-19";
const modified = "2026-08-22";

const resourceRoutes = [
  { path: "/evidence/", priority: "0.9" },
  { path: "/checklists/before-ai-upload/", priority: "0.75" },
  { path: "/downloads/pdf-redaction-demo/", priority: "0.75" }
];

const guideResources = {
  G01: [
    { href: "/checklists/before-ai-upload/", label: "Use the before-AI upload checklist" }
  ],
  G02: [
    { href: "/downloads/pdf-redaction-demo/", label: "Try the synthetic PDF redaction demo" },
    { href: "/downloads/redaction-verification-checklist.txt", label: "Download the redaction verification checklist" }
  ],
  G03: [
    { href: "/downloads/placeholder-mapping-template.csv", label: "Download the placeholder mapping template" }
  ],
  F03: [
    { href: "/downloads/excel-hidden-data-checklist.txt", label: "Download the Excel hidden-data checklist" }
  ],
  G05: [
    { href: "/downloads/hidden-data-inventory.txt", label: "Download the cross-format hidden-data inventory" }
  ],
  F01: [
    { href: "/downloads/pdf-redaction-demo/", label: "Compare overlay hiding with removed content" },
    { href: "/downloads/redaction-verification-checklist.txt", label: "Download the redaction verification checklist" }
  ],
  C02: [
    { href: "/evidence/#network", label: "Review the planned network-behavior test" }
  ],
  C03: [
    { href: "/evidence/#coverage", label: "Review the planned coverage evidence" }
  ],
  U01: [
    { href: "/downloads/legal-ai-review-checklist.txt", label: "Download the legal-document reviewer checklist" }
  ],
  U05: [
    { href: "/downloads/exposed-secret-response-checklist.txt", label: "Download the exposed-secret response checklist" }
  ]
};

const relatedGuideIds = {
  G01: ["G02", "G03", "G05"],
  G02: ["F01", "G05", "G01"],
  G03: ["F03", "G05", "G01"],
  F03: ["G03", "G05", "C03"],
  G05: ["F01", "F03", "C03"],
  C02: ["C01", "C03", "G07"],
  F01: ["G02", "G05", "C02"],
  C03: ["G05", "C02", "G07"],
  G07: ["C02", "C03", "F01"],
  U01: ["G02", "G03", "F01"],
  U05: ["C02", "C03", "G05"]
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function routeFor(guide) {
  return guide.route || "/guides/" + guide.slug + "/";
}

function outputPathFor(route) {
  return join(...route.split("/").filter(Boolean), "index.html");
}

function prefixFor(route) {
  const depth = route.split("/").filter(Boolean).length;
  return "../".repeat(depth);
}

function isGuideRoute(guide) {
  return routeFor(guide).startsWith("/guides/");
}

function header(prefix, route) {
  return [
    '<header class="site-header">',
    '  <div class="shell header-inner">',
    '    <a class="brand" href="' + prefix + '" aria-label="FilePreflight home">',
    '      <span class="brand-mark" aria-hidden="true"><span></span></span><span>FilePreflight</span>',
    "    </a>",
    '    <nav class="desktop-nav" aria-label="Primary navigation">',
    '      <a href="' + prefix + '">Product</a>',
    '      <a href="' + prefix + 'ai-document-sanitizer/">AI Sanitizer</a>',
    '      <a href="' + prefix + 'evidence/">Evidence</a>',
    '      <a href="' + prefix + 'guides/">Guides</a>',
    '      <a href="' + prefix + '#privacy">Privacy</a>',
    "    </nav>",
    '    <div class="language-switch" aria-label="Language">',
    '      <a href="' + prefix + 'ja/" lang="ja">日本語</a>',
    '      <a href="' + route + '" aria-current="page">EN</a>',
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
    '      <a href="' + prefix + 'ai-document-sanitizer/">AI Sanitizer</a>',
    '      <a href="' + prefix + 'evidence/">Evidence</a>',
    '      <a href="' + prefix + 'guides/">Guides</a>',
    '      <a href="https://github.com/jp-north-man/FilePreflight" target="_blank" rel="noopener noreferrer">GitHub</a>',
    '      <a href="https://www.ai-labs.co.jp/products/filepreflight">Developed by AI Labs LLC</a>',
    "    </div>",
    "  </div>",
    "</footer>"
  ].join("\n");
}

function pageSchema(guide, canonical) {
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "FilePreflight", item: siteUrl + "/" }
  ];
  if (isGuideRoute(guide)) {
    breadcrumbItems.push({ "@type": "ListItem", position: 2, name: "Guides", item: siteUrl + "/guides/" });
  }
  breadcrumbItems.push({
    "@type": "ListItem",
    position: breadcrumbItems.length + 1,
    name: guide.title,
    item: canonical
  });

  const primary = guide.pageKind === "product"
    ? {
        "@type": "WebPage",
        name: guide.title,
        description: guide.description,
        datePublished: published,
        dateModified: modified,
        inLanguage: "en",
        url: canonical,
        about: { "@type": "SoftwareApplication", name: "FilePreflight", operatingSystem: "Windows" },
        publisher: { "@type": "Organization", name: "AI Labs LLC", url: "https://www.ai-labs.co.jp/" },
        citation: guide.sources.map((source) => source.url)
      }
    : {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        datePublished: published,
        dateModified: modified,
        inLanguage: "en",
        mainEntityOfPage: canonical,
        author: { "@type": "Organization", name: "AI Labs LLC", url: "https://www.ai-labs.co.jp/" },
        publisher: { "@type": "Organization", name: "AI Labs LLC", url: "https://www.ai-labs.co.jp/" },
        citation: guide.sources.map((source) => source.url)
      };

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      primary,
      { "@type": "BreadcrumbList", itemListElement: breadcrumbItems }
    ]
  });
}

function titleFor(guide) {
  return guide.seoTitle || guide.title;
}

function descriptionFor(guide) {
  return guide.seoDescription || guide.description;
}

function launchHref(guide) {
  return "mailto:contact@ai-labs.co.jp?subject=" + encodeURIComponent("FilePreflight launch updates — " + guide.shortTitle);
}

function renderRelatedGuides(guide) {
  const related = (relatedGuideIds[guide.id] || [])
    .map((id) => guides.find((candidate) => candidate.id === id))
    .filter(Boolean);
  const extra = guide.id === "C02" || guide.id === "C03"
    ? [{ title: "AI Document Sanitizer", route: "/ai-document-sanitizer/" }]
    : [];
  const items = [
    ...extra,
    ...related.map((item) => ({ title: item.shortTitle, route: routeFor(item) }))
  ];
  if (!items.length) return "";
  return [
    '<aside class="guide-related" aria-label="Related FilePreflight resources">',
    "  <strong>Continue the workflow</strong>",
    "  <ul>",
    ...items.map((item) => '    <li><a href="' + item.route + '">' + escapeHtml(item.title) + " →</a></li>"),
    "  </ul>",
    "</aside>"
  ].join("\n");
}

function renderGuideCta(guide) {
  return [
    '<aside class="guide-inline-cta">',
    '  <div><strong>FilePreflight is in development.</strong><span>See the planned local workflow, release boundaries, and evidence status before joining launch updates.</span></div>',
    '  <div><a class="button button-primary" data-cta="launch-email" data-page="' + guide.slug + '" data-destination="email" href="' + launchHref(guide) + '">Get launch updates</a><a class="text-link" data-cta="product-workflow" data-page="' + guide.slug + '" data-destination="ai-document-sanitizer" href="/ai-document-sanitizer/">See the planned workflow →</a></div>',
    "</aside>"
  ].join("\n");
}

function renderResourceLinks(guide) {
  const links = guideResources[guide.id] || [];
  if (!links.length) return "";
  return [
    '<aside class="guide-resource">',
    "  <strong>Practical resource</strong>",
    "  <div>",
    ...links.map((link) => '    <a href="' + link.href + '">' + escapeHtml(link.label) + " →</a>"),
    "  </div>",
    "</aside>"
  ].join("\n");
}

function renderArticle(guide, index) {
  const route = routeFor(guide);
  const canonical = siteUrl + route;
  const prefix = prefixFor(route);
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
    previous ? '<a href="' + routeFor(previous) + '">← ' + escapeHtml(previous.shortTitle) + "</a>" : '<a href="/guides/">← All resources</a>',
    next ? '<a href="' + routeFor(next) + '">' + escapeHtml(next.shortTitle) + " →</a>" : '<a href="/guides/">All resources →</a>',
    "</nav>"
  ].join("\n");
  const breadcrumb = isGuideRoute(guide)
    ? '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="' + prefix + '">FilePreflight</a><span aria-hidden="true">/</span><a href="' + prefix + 'guides/">Guides</a><span aria-hidden="true">/</span><span>' + escapeHtml(guide.shortTitle) + "</span></nav>"
    : '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="' + prefix + '">FilePreflight</a><span aria-hidden="true">/</span><span>' + escapeHtml(guide.shortTitle) + "</span></nav>";
  const meta = guide.pageKind === "product"
    ? '<div class="guide-meta"><span>Product page</span><span>Initial Windows release in preparation</span><span>Evidence pending</span></div><div class="guide-hero-actions"><a class="button button-primary" data-cta="launch-email" data-page="' + guide.slug + '" data-destination="email" href="' + launchHref(guide) + '">Get launch updates</a><a class="button button-secondary" data-cta="evidence" data-page="' + guide.slug + '" data-destination="evidence" href="/evidence/">Review the evidence plan</a></div>'
    : '<div class="guide-meta"><span>Published August 19, 2026</span><span>' + escapeHtml(guide.readTime) + "</span><span>Reviewed against official sources</span></div>";
  const ogType = guide.pageKind === "product" ? "website" : "article";

  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    '  <meta name="description" content="' + escapeHtml(descriptionFor(guide)) + '" />',
    '  <meta name="theme-color" content="#0b1020" />',
    '  <meta name="robots" content="index, follow" />',
    '  <meta property="og:type" content="' + ogType + '" />',
    '  <meta property="og:site_name" content="FilePreflight" />',
    '  <meta property="og:title" content="' + escapeHtml(titleFor(guide)) + ' | FilePreflight" />',
    '  <meta property="og:description" content="' + escapeHtml(descriptionFor(guide)) + '" />',
    '  <meta property="og:url" content="' + canonical + '" />',
    '  <meta property="og:image" content="' + siteUrl + '/og.png" />',
    '  <meta property="og:locale" content="en_US" />',
    guide.pageKind === "product" ? "" : '  <meta property="article:published_time" content="' + published + '" />',
    guide.pageKind === "product" ? "" : '  <meta property="article:modified_time" content="' + modified + '" />',
    '  <meta name="twitter:card" content="summary_large_image" />',
    '  <meta name="twitter:title" content="' + escapeHtml(titleFor(guide)) + ' | FilePreflight" />',
    '  <meta name="twitter:description" content="' + escapeHtml(descriptionFor(guide)) + '" />',
    '  <meta name="twitter:image" content="' + siteUrl + '/og.png" />',
    '  <link rel="canonical" href="' + canonical + '" />',
    '  <link rel="alternate" hreflang="en" href="' + canonical + '" />',
    '  <link rel="alternate" hreflang="x-default" href="' + canonical + '" />',
    '  <link rel="stylesheet" href="' + prefix + 'styles.css" />',
    '  <script type="application/ld+json">' + pageSchema(guide, canonical) + "</script>",
    "  <title>" + escapeHtml(titleFor(guide)) + " | FilePreflight</title>",
    "</head>",
    "<body>",
    '  <a class="skip-link" href="#main">Skip to content</a>',
    header(prefix, route),
    '  <main id="main">',
    '    <section class="guide-hero">',
    '      <div class="hero-glow hero-glow-one" aria-hidden="true"></div>',
    '      <div class="guide-hero-inner">',
    "        " + breadcrumb,
    '        <p class="eyebrow light">' + escapeHtml(guide.category) + "</p>",
    "        <h1>" + escapeHtml(guide.title) + "</h1>",
    '        <p class="hero-lede">' + escapeHtml(guide.description) + "</p>",
    "        " + meta,
    "      </div>",
    "    </section>",
    '    <div class="guide-article-wrap">',
    '      <article class="guide-article">',
    '        <aside class="guide-summary"><strong>In brief</strong><p>' + escapeHtml(guide.summary) + "</p></aside>",
    guide.warning ? '<aside class="guide-warning"><strong>Important boundary</strong><p>' + escapeHtml(guide.warning) + "</p></aside>" : "",
    renderGuideCta(guide),
    renderResourceLinks(guide),
    sections,
    '        <section class="guide-sources">',
    "          <h2>Official sources</h2>",
    '          <p class="guide-disclosure">This page uses primary sources available on August 19, 2026. Product policies and software features can change, so confirm current terms before handling sensitive material.</p>',
    "          <ul>" + sources + "</ul>",
    "        </section>",
    '        <aside class="guide-note"><strong>About FilePreflight</strong><p>FilePreflight is a Windows file-preparation product being developed by AI Labs LLC. The initial release is not yet available. Planned capabilities and limits may change, and automated detection remains best-effort.' + (guide.id === "U05" ? ' The MVP covers supported text, data, configuration, and log extensions; it is not a repository or Git-history scanner.' : '') + ' <a href="/ai-document-sanitizer/">Explore the product workflow</a> or <a href="/evidence/">review the evidence plan</a>.</p></aside>',
    renderRelatedGuides(guide),
    pagination,
    "      </article>",
    "    </div>",
    "  </main>",
    footer(prefix),
    "</body>",
    "</html>",
    ""
  ].join("\n");
}

function renderRedirect(guide, aliasRoute) {
  const route = routeFor(guide);
  const canonical = siteUrl + route;
  const prefix = prefixFor(aliasRoute);
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: guide.title,
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "FilePreflight", url: siteUrl + "/" }
  });
  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    '  <meta name="description" content="This FilePreflight page has moved to its permanent URL." />',
    '  <meta name="robots" content="noindex, follow" />',
    '  <meta http-equiv="refresh" content="0; url=' + route + '" />',
    '  <link rel="canonical" href="' + canonical + '" />',
    '  <link rel="stylesheet" href="' + prefix + 'styles.css" />',
    '  <script type="application/ld+json">' + schema + "</script>",
    "  <title>" + escapeHtml(guide.title) + " | FilePreflight</title>",
    "</head>",
    '<body class="redirect-page">',
    "  <main>",
    '    <a class="brand" href="' + prefix + '"><span class="brand-mark" aria-hidden="true"><span></span></span><span>FilePreflight</span></a>',
    "    <h1>This page has moved.</h1>",
    '    <p>Continue to <a href="' + route + '">' + escapeHtml(guide.title) + "</a>.</p>",
    "  </main>",
    "</body>",
    "</html>",
    ""
  ].join("\n");
}

function indexSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FilePreflight Guides and Workflows",
    url: siteUrl + "/guides/",
    description: "Practical, source-backed guides and workflow pages for preparing documents, spreadsheets, PDFs, and code files before using AI.",
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "AI Labs LLC", url: "https://www.ai-labs.co.jp/" },
    hasPart: guides.map((guide) => ({
      "@type": guide.pageKind === "product" ? "WebPage" : "Article",
      headline: guide.title,
      url: siteUrl + routeFor(guide)
    }))
  });
}

function renderIndex() {
  const cards = guides
    .map((guide) => [
      '<a class="guide-card" href="' + routeFor(guide) + '">',
      '  <span class="guide-card-inner">',
      '    <span class="eyebrow">' + escapeHtml(guide.category) + "</span>",
      "    <h2>" + escapeHtml(guide.title) + "</h2>",
      "    <p>" + escapeHtml(guide.description) + "</p>",
      "    <span>" + (guide.pageKind ? "Explore page →" : "Read guide →") + "</span>",
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
    '  <meta name="description" content="Practical, source-backed guides and workflow pages for preparing files before using AI." />',
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
    header("../", "/guides/"),
    '  <main id="main">',
    '    <section class="guide-hero">',
    '      <div class="hero-glow hero-glow-one" aria-hidden="true"></div>',
    '      <div class="guide-hero-inner">',
    '        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">FilePreflight</a><span aria-hidden="true">/</span><span>Guides</span></nav>',
    '        <p class="eyebrow light">File privacy before AI</p>',
    "        <h1>Prepare the file, then use AI.</h1>",
    '        <p class="hero-lede">Practical, source-backed guides and workflow pages for reducing unnecessary disclosure before an AI upload.</p>',
    '        <div class="guide-meta"><span>11 research and workflow pages</span><span>Updated August 22, 2026</span><span>Official sources</span></div>',
    "      </div>",
    "    </section>",
    '    <section class="section">',
    '      <div class="shell">',
    '        <div class="guide-index-intro"><p class="eyebrow">Start with the risk, not the tool</p><h2>A review workflow you can explain.</h2><p>Each page separates visible content, hidden data, service settings, and human review. No page promises that automated detection makes a file completely safe or anonymous.</p></div>',
    '        <a class="guide-featured-product" href="../ai-document-sanitizer/"><span><span class="eyebrow light">Featured product page</span><strong>AI Document Sanitizer: Make Files Safe Before You Upload</strong><small>See the planned workflow, evidence standard, format coverage, and known limits.</small></span><span>Explore FilePreflight →</span></a>',
    '        <a class="guide-featured-evidence" href="../evidence/"><span><span class="eyebrow">Public release gate</span><strong>Evidence and test methodology</strong><small>See what is verified, what is pending, and how release claims will be tested.</small></span><span>Review evidence →</span></a>',
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
  const route = routeFor(guide);
  await write(outputPathFor(route), renderArticle(guide, index));
  if (guide.route) {
    const previousRoute = "/guides/" + guide.slug + "/";
    await write(outputPathFor(previousRoute), renderRedirect(guide, previousRoute));
  }
}

const sitemapUrls = [
  { path: "/", priority: "1.0" },
  { path: "/ja/", priority: "0.8" },
  { path: "/ai-document-sanitizer/", priority: "0.95" },
  { path: "/guides/", priority: "0.9" },
  ...resourceRoutes,
  ...guides.map((guide) => ({
    path: routeFor(guide),
    priority: guide.pageKind === "product" ? "0.9" : guide.pageKind === "format" ? "0.85" : "0.8"
  }))
];
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapUrls.map((item) => [
    "  <url>",
    "    <loc>" + siteUrl + item.path + "</loc>",
    "    <lastmod>" + modified + "</lastmod>",
    "    <changefreq>monthly</changefreq>",
    "    <priority>" + item.priority + "</priority>",
    "  </url>"
  ].join("\n")),
  "</urlset>",
  ""
].join("\n");
await write("sitemap.xml", sitemap);
