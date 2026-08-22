import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://filepreflight.ai-labs.co.jp";
const modified = "2026-08-22";

const pages = [
  {
    slug: "offline-document-redaction-tool",
    route: "/offline-document-redaction-tool/",
    title: "Offline Document Redaction Tool for AI Uploads",
    seoTitle: "Offline Document Redaction Tool",
    description: "Explore FilePreflight's planned local document-redaction workflow, supported formats, release boundaries, and evidence status before an AI upload.",
    eyebrow: "Local-first Windows workflow · In development",
    lede: "FilePreflight is being built to inspect and transform supported files on your Windows PC, then publish a separate copy only after it reopens and passes a second check.",
    summary: "File processing is designed to stay on the device. The later upload to ChatGPT, Claude, Gemini, or another service is a separate decision governed by that service and your organisation.",
    boundary: "No download or checkout is available yet. Release-build network behavior and conversion coverage have not yet been published as verified results.",
    introTitle: "Prepare locally. Upload only after a separate approval.",
    intro: "The planned processing path does not upload file bytes, extracted content, OCR text, findings, hashes, or other file-derived information. Pro purchase and license activation are separate network functions and must never include file data.",
    cards: [
      ["17 launch extensions", "PDF, DOCX, XLSX, PPTX, JPEG, PNG, text, Markdown, log, CSV, JSON, XML, YAML, and .env variants within published limits."],
      ["Original preserved", "The source is read-only. A successful output uses a separate, collision-safe -SAFE filename."],
      ["Reopen and recheck", "Only an output that reopens and passes the post-sanitization check can be presented as a safe copy."]
    ],
    sections: [
      {
        heading: "The planned local-to-cloud boundary",
        html: '<div class="workflow-line"><span>Source file</span><b>→</b><span class="active">Local inspection and transformation</span><b>→</b><span>-SAFE copy</span><b>→</b><span>Your upload decision</span></div><p>“Local” describes FilePreflight file processing, not the cloud AI session that may follow. Once you choose to upload the prepared copy, the destination service\'s current plan, settings, retention, administrator access, and terms apply.</p>'
      },
      {
        heading: "One product path, four visible outcomes",
        html: '<div class="status-explainer"><div><strong>Safe copy created</strong><span>The output reopened, passed the supported checks, and is ready for your final review.</span></div><div><strong>Review required</strong><span>The app found something that needs a person\'s decision.</span></div><div><strong>Blocked</strong><span>No normal output is published because a critical issue remains.</span></div><div><strong>Failed</strong><span>Processing did not complete; the original remains unchanged.</span></div></div>'
      },
      {
        heading: "Free and Pro are planned to differ by workload—not quality",
        html: '<div class="guide-table-wrap"><table class="guide-table"><thead><tr><th></th><th>Free</th><th>Pro</th></tr></thead><tbody><tr><td>Price</td><td>USD 0, permanently free</td><td>USD 29 once</td></tr><tr><td>Files</td><td>One file, up to 10,000,000 bytes</td><td>Single, folder, or batch; up to 20,000,000,000 bytes where format and resources permit</td></tr><tr><td>Formats and per-file quality</td><td>All 17 launch extensions</td><td>The same formats, inspection, conversion, speed, and post-verification quality</td></tr><tr><td>Additional control</td><td>Default policy; source-folder output</td><td>Custom policies and selected destinations; one user on three devices</td></tr></tbody></table></div><p>Final availability, checkout, and release evidence are still in preparation.</p>'
      }
    ],
    evidenceLinks: [
      ["Release evidence status", "/evidence/"],
      ["Why visual covering is not redaction", "/downloads/pdf-redaction-demo/"],
      ["Independent evaluation guide", "/guides/offline-document-redaction-tool/"]
    ]
  },
  {
    slug: "document-privacy-scanner",
    route: "/document-privacy-scanner/",
    title: "Document Privacy Scanner for AI Uploads",
    seoTitle: "Document Privacy Scanner for AI Uploads",
    description: "See how FilePreflight plans to find supported risks, transform a separate copy, reopen it, and show when human review is still required.",
    eyebrow: "Supported findings · Separate output · Human review",
    lede: "FilePreflight is being built to find supported personal data, secrets, identifiers, metadata, comments, and hidden content before a file is shared with AI.",
    summary: "A scan is decision support, not a safety certificate. FilePreflight is designed to remove selected supported findings from a copy, reopen that output, check again, and clearly stop when verification does not pass.",
    boundary: "Automated detection is best-effort. It cannot know every fact your organisation considers confidential, and no-findings language must not be treated as proof of safety.",
    introTitle: "From a finding to a checked copy—not a dashboard full of claims.",
    intro: "The Windows MVP focuses on the shipped path: choose a supported file, inspect it, remove selected supported items, reopen the output, check again, and give one clear next action. Advanced reports and safety certificates are not part of the MVP.",
    cards: [
      ["Supported risk categories", "Names, contact details, identifiers, credentials, secrets, document metadata, comments, hidden content, and selected image metadata or OCR regions."],
      ["Format-aware transformation", "PDF, Office, image, text, and structured-data files require different removal and verification methods."],
      ["Clear limits", "Unsupported formats, edition-limit violations, failed reopening, and unresolved critical secrets stop before a safe output is shown."]
    ],
    sections: [
      {
        heading: "What the scanner is designed to check",
        html: '<div class="risk-grid"><div><strong>People and contact data</strong><span>Names, email addresses, phone numbers, postal information, and user-supplied terms.</span></div><div><strong>Business identifiers</strong><span>Customer, order, invoice, account, contract, and employee identifiers.</span></div><div><strong>Credentials and secrets</strong><span>API keys, access tokens, passwords, private keys, connection strings, and secret environment values.</span></div><div><strong>Hidden file data</strong><span>Authors, company properties, comments, revisions, hidden elements, image location metadata, and supported embedded structures.</span></div></div>'
      },
      {
        heading: "What a result can—and cannot—mean",
        html: '<div class="guide-table-wrap"><table class="guide-table"><thead><tr><th>Result</th><th>Meaning</th><th>Required next step</th></tr></thead><tbody><tr><td>Safe copy created</td><td>The output passed the supported reopen and recheck path</td><td>Review the exact output and destination before sharing</td></tr><tr><td>Review required</td><td>A supported finding or file condition needs judgement</td><td>Inspect the summary and decide whether to change or stop</td></tr><tr><td>Blocked or failed</td><td>The app cannot publish a verified normal output</td><td>Follow the stated reason; the original remains unchanged</td></tr></tbody></table></div><p>A successful technical result does not replace organisational policy, consent, legal review, or destination governance.</p>'
      },
      {
        heading: "Evidence before broad claims",
        html: '<p>Coverage must be demonstrated with synthetic fixtures and format-specific checks. Local-processing claims need a documented network-behavior method. Conversion claims need outputs that reopen, preserve useful content, remove the selected canaries, and leave the original unchanged.</p><p>The evidence hub separates planned methods from verified release results so pre-release copy does not imply a test has already passed.</p>'
      }
    ],
    evidenceLinks: [
      ["Release evidence status", "/evidence/"],
      ["Before-AI upload checklist", "/checklists/before-ai-upload/"],
      ["How to evaluate privacy scanners", "/guides/document-privacy-scanner/"]
    ]
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function schemaFor(page) {
  const canonical = siteUrl + page.route;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url: canonical,
        dateModified: modified,
        inLanguage: "en",
        about: {
          "@type": "SoftwareApplication",
          name: "FilePreflight",
          applicationCategory: "SecurityApplication",
          operatingSystem: "Windows"
        },
        publisher: { "@type": "Organization", name: "AI Labs LLC", url: "https://www.ai-labs.co.jp/" }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "FilePreflight", item: siteUrl + "/" },
          { "@type": "ListItem", position: 2, name: page.title, item: canonical }
        ]
      }
    ]
  });
}

function header(page) {
  return '<header class="site-header"><div class="shell header-inner"><a class="brand" href="../" aria-label="FilePreflight home"><span class="brand-mark" aria-hidden="true"><span></span></span><span>FilePreflight</span></a><nav class="desktop-nav" aria-label="Primary navigation"><a href="../">Product</a><a href="../ai-document-sanitizer/">AI Sanitizer</a><a href="../evidence/">Evidence</a><a href="../guides/">Guides</a><a href="../#privacy">Privacy</a></nav><div class="language-switch" aria-label="Language"><a href="../ja/" lang="ja">日本語</a><a href="' + page.route + '" aria-current="page">EN</a></div></div></header>';
}

function footer() {
  return '<footer class="site-footer"><div class="shell footer-inner"><a class="brand footer-brand" href="../"><span class="brand-mark" aria-hidden="true"><span></span></span><span>FilePreflight</span></a><p>© 2026 FilePreflight</p><div class="footer-links"><a href="../#privacy">Privacy</a><a href="../ai-document-sanitizer/">AI Sanitizer</a><a href="../evidence/">Evidence</a><a href="../guides/">Guides</a><a href="mailto:contact@ai-labs.co.jp">Contact</a><a href="https://www.ai-labs.co.jp/products/filepreflight">Developed by AI Labs LLC</a></div></div></footer>';
}

function renderPage(page) {
  const canonical = siteUrl + page.route;
  const subject = encodeURIComponent("FilePreflight launch updates — " + page.seoTitle);
  const cards = page.cards.map(([title, text]) => '<div><strong>' + escapeHtml(title) + '</strong><span>' + escapeHtml(text) + '</span></div>').join("");
  const sections = page.sections.map((section) => '<section><h2>' + escapeHtml(section.heading) + '</h2>' + section.html + '</section>').join("\n");
  const links = page.evidenceLinks.map(([title, route]) => '<a href="' + route + '"><strong>' + escapeHtml(title) + '</strong><span>Open resource →</span></a>').join("");
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    '  <meta name="description" content="' + escapeHtml(page.description) + '" />',
    '  <meta name="theme-color" content="#0b1020" />',
    '  <meta name="robots" content="index, follow" />',
    '  <meta property="og:type" content="website" />',
    '  <meta property="og:site_name" content="FilePreflight" />',
    '  <meta property="og:title" content="' + escapeHtml(page.seoTitle) + ' | FilePreflight" />',
    '  <meta property="og:description" content="' + escapeHtml(page.description) + '" />',
    '  <meta property="og:url" content="' + canonical + '" />',
    '  <meta property="og:image" content="' + siteUrl + '/og.png" />',
    '  <meta name="twitter:card" content="summary_large_image" />',
    '  <link rel="canonical" href="' + canonical + '" />',
    '  <link rel="alternate" hreflang="en" href="' + canonical + '" />',
    '  <link rel="alternate" hreflang="x-default" href="' + canonical + '" />',
    '  <link rel="stylesheet" href="../styles.css" />',
    '  <script type="application/ld+json">' + schemaFor(page) + '</script>',
    '  <title>' + escapeHtml(page.seoTitle) + ' | FilePreflight</title>',
    '</head>',
    '<body>',
    '  <a class="skip-link" href="#main">Skip to content</a>',
    header(page),
    '  <main id="main">',
    '    <section class="guide-hero product-search-hero"><div class="hero-glow hero-glow-one" aria-hidden="true"></div><div class="guide-hero-inner"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">FilePreflight</a><span aria-hidden="true">/</span><span>' + escapeHtml(page.seoTitle) + '</span></nav><p class="eyebrow light">' + escapeHtml(page.eyebrow) + '</p><h1>' + escapeHtml(page.title) + '</h1><p class="hero-lede">' + escapeHtml(page.lede) + '</p><div class="guide-meta"><span>Initial Windows release in preparation</span><span>No download yet</span><span>Evidence pending</span></div><div class="guide-hero-actions"><a class="button button-primary" data-cta="launch-email" data-page="' + page.slug + '" data-destination="email" href="mailto:contact@ai-labs.co.jp?subject=' + subject + '">Get launch updates</a><a class="button button-secondary" data-cta="evidence" data-page="' + page.slug + '" data-destination="evidence" href="../evidence/">Review evidence status</a></div></div></section>',
    '    <div class="guide-article-wrap"><article class="guide-article product-search-page">',
    '      <aside class="guide-summary"><strong>In brief</strong><p>' + escapeHtml(page.summary) + '</p></aside>',
    '      <aside class="guide-warning"><strong>Current boundary</strong><p>' + escapeHtml(page.boundary) + '</p></aside>',
    '      <section class="product-intent-panel"><p class="eyebrow">Product direction</p><h2>' + escapeHtml(page.introTitle) + '</h2><p>' + escapeHtml(page.intro) + '</p><div class="product-intent-grid">' + cards + '</div></section>',
    sections,
    '      <section><h2>Evidence and next-step resources</h2><div class="product-resource-grid">' + links + '</div></section>',
    '      <aside class="guide-inline-cta"><div><strong>Follow release evidence, not a vague promise.</strong><span>Tell us which workflow matters to you, and we will send relevant availability and evidence updates.</span></div><div><a class="button button-primary" data-cta="launch-email" data-page="' + page.slug + '" data-destination="email" href="mailto:contact@ai-labs.co.jp?subject=' + subject + '">Get launch updates</a><a class="text-link" data-cta="product-workflow" data-page="' + page.slug + '" data-destination="ai-document-sanitizer" href="../ai-document-sanitizer/">See the full sanitizer workflow →</a></div></aside>',
    '    </article></div>',
    '  </main>',
    footer(),
    '</body>',
    '</html>',
    ''
  ].join("\n");
}

for (const page of pages) {
  const target = join(root, ...page.route.split("/").filter(Boolean), "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderPage(page), "utf8");
}
