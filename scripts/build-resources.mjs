import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://filepreflight.ai-labs.co.jp";
const modified = "2026-08-22";

const formats = [
  ["Documents and Office", ".pdf, .docx, .xlsx, .pptx"],
  ["Images", ".jpg, .jpeg, .png"],
  ["Text", ".txt, .md, .markdown, .log"],
  ["Data and configuration", ".csv, .json, .xml, .yaml, .yml, .env"]
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function header(prefix, route) {
  return '<header class="site-header"><div class="shell header-inner"><a class="brand" href="' + prefix + '" aria-label="FilePreflight home"><span class="brand-mark" aria-hidden="true"><span></span></span><span>FilePreflight</span></a><nav class="desktop-nav" aria-label="Primary navigation"><a href="' + prefix + '">Product</a><a href="' + prefix + 'ai-document-sanitizer/">AI Sanitizer</a><a href="' + prefix + 'evidence/">Evidence</a><a href="' + prefix + 'guides/">Guides</a><a href="' + prefix + '#privacy">Privacy</a></nav><div class="language-switch" aria-label="Language"><a href="' + prefix + 'ja/" lang="ja">日本語</a><a href="' + route + '" aria-current="page">EN</a></div></div></header>';
}

function footer(prefix) {
  return '<footer class="site-footer"><div class="shell footer-inner"><a class="brand footer-brand" href="' + prefix + '"><span class="brand-mark" aria-hidden="true"><span></span></span><span>FilePreflight</span></a><p>© 2026 FilePreflight</p><div class="footer-links"><a href="' + prefix + '#privacy">Privacy</a><a href="' + prefix + 'ai-document-sanitizer/">AI Sanitizer</a><a href="' + prefix + 'evidence/">Evidence</a><a href="' + prefix + 'guides/">Guides</a><a href="mailto:contact@ai-labs.co.jp">Contact</a><a href="https://www.ai-labs.co.jp/products/filepreflight">Developed by AI Labs LLC</a></div></div></footer>';
}

function schema({ type = "WebPage", name, description, route }) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: siteUrl + route,
    dateModified: modified,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "AI Labs LLC", url: "https://www.ai-labs.co.jp/" }
  });
}

function documentShell({ route, prefix, title, description, eyebrow, h1, lede, body, type = "WebPage", bodyClass = "" }) {
  const canonical = siteUrl + route;
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    '  <meta name="description" content="' + escapeHtml(description) + '" />',
    '  <meta name="theme-color" content="#0b1020" />',
    '  <meta name="robots" content="index, follow" />',
    '  <meta property="og:type" content="website" />',
    '  <meta property="og:site_name" content="FilePreflight" />',
    '  <meta property="og:title" content="' + escapeHtml(title) + '" />',
    '  <meta property="og:description" content="' + escapeHtml(description) + '" />',
    '  <meta property="og:url" content="' + canonical + '" />',
    '  <meta property="og:image" content="' + siteUrl + '/og.png" />',
    '  <meta name="twitter:card" content="summary_large_image" />',
    '  <link rel="canonical" href="' + canonical + '" />',
    '  <link rel="alternate" hreflang="en" href="' + canonical + '" />',
    '  <link rel="alternate" hreflang="x-default" href="' + canonical + '" />',
    '  <link rel="stylesheet" href="' + prefix + 'styles.css" />',
    '  <script type="application/ld+json">' + schema({ type, name: h1, description, route }) + '</script>',
    '  <title>' + escapeHtml(title) + '</title>',
    '</head>',
    '<body class="' + bodyClass + '">',
    '  <a class="skip-link" href="#main">Skip to content</a>',
    header(prefix, route),
    '  <main id="main">',
    '    <section class="resource-hero"><div class="hero-glow hero-glow-one" aria-hidden="true"></div><div class="shell resource-hero-inner"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="' + prefix + '">FilePreflight</a><span aria-hidden="true">/</span><span>' + escapeHtml(h1) + '</span></nav><p class="eyebrow light">' + escapeHtml(eyebrow) + '</p><h1>' + escapeHtml(h1) + '</h1><p class="hero-lede">' + escapeHtml(lede) + '</p></div></section>',
    body,
    '  </main>',
    footer(prefix),
    '</body>',
    '</html>',
    ''
  ].join("\n");
}

const evidenceDescription = "See what FilePreflight has verified, what is still pending, and how local processing, format coverage, and safe-copy behavior will be tested.";
const formatRows = formats.map(([group, extensions]) => '<tr><td>' + group + '</td><td><code>' + extensions + '</code></td><td><span class="status-tag pending">Release test pending</span></td></tr>').join("");
const evidenceBody = [
  '<section class="section resource-section"><div class="shell resource-shell">',
  '  <div class="evidence-state"><div><span class="status-tag pending">Pre-release</span><h2>Methods are public. Release-build results are not yet published.</h2><p>FilePreflight is still in development. This page deliberately separates a planned test from a passed test. A result will move to “Verified” only when the release candidate and retained synthetic fixture support it.</p></div><div class="evidence-score"><strong>0</strong><span>release claims marked verified today</span></div></div>',
  '  <div class="status-board" aria-label="Evidence status"><article><span>Product availability</span><strong>In preparation</strong><p>No download or checkout is available.</p></article><article><span>Network-behavior evidence</span><strong>Pending</strong><p>Method defined; release-build run not published.</p></article><article><span>Format conversion evidence</span><strong>Pending</strong><p>17 extensions planned; pass records not published.</p></article><article><span>Educational redaction demo</span><strong>Available</strong><p>Synthetic PDF example; not FilePreflight output.</p></article></div>',
  '  <section id="network"><p class="eyebrow">Method 01</p><h2>Local-processing network test</h2><p>The release test will monitor a clean Windows 11 x64 environment while a supported synthetic file moves through inspection, transformation, reopen, and recheck. The record will distinguish file processing from an explicit Pro purchase or license action.</p><ol class="method-list"><li><strong>Establish the environment.</strong><span>Record the app build, OS, fixture hash, adapters, DNS state, and monitoring tools.</span></li><li><strong>Run the Free file path.</strong><span>Observe DNS and outbound connections while processing; file bytes and file-derived data must not leave the device.</span></li><li><strong>Separate licensing.</strong><span>Test an explicit Pro license action independently and confirm that no file data enters the request.</span></li><li><strong>Publish the boundary.</strong><span>Report conditions, observations, limitations, and artifacts without calling an unobserved condition “zero network.”</span></li></ol><p class="method-status"><span class="status-tag pending">Result pending</span> No pass claim is made on this page.</p></section>',
  '  <section id="coverage"><p class="eyebrow">Method 02</p><h2>Planned launch-format coverage</h2><p>Free and Pro are planned to support the same 17 extensions with identical per-file inspection, conversion, speed, and post-verification quality. Each extension still needs a reproducible release-build result.</p><div class="guide-table-wrap"><table class="guide-table"><thead><tr><th>Group</th><th>Extensions</th><th>Public status</th></tr></thead><tbody>' + formatRows + '</tbody></table></div><p>A passing record must show that the selected canary is physically absent from the output, useful content remains usable, the output reopens, the second check passes, and the original hash is unchanged.</p></section>',
  '  <section id="review-record"><p class="eyebrow">Method 03</p><h2>What a public review record should contain</h2><div class="risk-grid"><div><strong>Fixture</strong><span>Synthetic input description, hash, format, and expected finding.</span></div><div><strong>Transformation</strong><span>Selected policy and the category removed—without exposing a usable secret.</span></div><div><strong>Post-check</strong><span>Reopen result, second scan, output usability, and unresolved items.</span></div><div><strong>Boundary</strong><span>Build, environment, known limitation, and a clear human-review reminder.</span></div></div><p>This is an evidence record for a tested path, not a safety certificate or an advanced reporting feature.</p></section>',
  '  <section class="resource-next"><div><p class="eyebrow light">Available now</p><h2>See why visual covering is not removal.</h2><p>Use the synthetic two-PDF demo to compare a black overlay with a comparison file authored without the canary values.</p></div><a class="button button-light" data-cta="pdf-demo" data-page="evidence" data-destination="pdf-redaction-demo" href="../downloads/pdf-redaction-demo/">Open the PDF demo</a></section>',
  '</div></section>'
].join("\n");

const evidenceHtml = documentShell({
  route: "/evidence/",
  prefix: "../",
  title: "Release Evidence and Test Methods | FilePreflight",
  description: evidenceDescription,
  eyebrow: "Evidence before claims",
  h1: "FilePreflight release evidence",
  lede: "A public status page for local-processing, format coverage, conversion quality, and post-check claims.",
  body: evidenceBody
});

const checklistDescription = "A printable checklist for deciding whether a document should be prepared and uploaded to ChatGPT, Claude, Gemini, or another AI service.";
const checklistBody = [
  '<section class="section resource-section"><div class="shell checklist-shell">',
  '  <div class="checklist-toolbar"><p><strong>How to use:</strong> print this page or save the plain-text version. Check the exact copy—not the original.</p><a class="button button-secondary" data-cta="download-checklist" data-page="before-ai-upload-checklist" data-destination="text-download" href="../../downloads/before-ai-upload-checklist.txt" download>Download .txt</a></div>',
  '  <section><p class="eyebrow">Decision gate</p><h2>All three gates must pass.</h2><div class="decision-grid"><article><span>1</span><strong>Destination approved?</strong><p>Confirm the exact service, workspace, account, feature, retention, administrator access, connectors, contract, and organisation policy.</p></article><article><span>2</span><strong>Minimum useful copy?</strong><p>Remove pages, rows, fields, precision, attachments, and identifiers the AI task does not need.</p></article><article><span>3</span><strong>Exact output reviewed?</strong><p>Reopen the prepared copy, search again, inspect hidden content, test meaning and usability, and obtain required human approval.</p></article></div><div class="stop-rule"><strong>If any gate is unknown or fails, do not upload.</strong><span>Use a synthetic example, an approved controlled environment, or complete the task without the file.</span></div></section>',
  '  <section class="print-checklist"><p class="eyebrow">Before the upload</p><h2>Document preparation checklist</h2><div class="check-group"><h3>Purpose and destination</h3><label><input type="checkbox" /> The AI task is written in one sentence.</label><label><input type="checkbox" /> The exact service, workspace, and feature are approved.</label><label><input type="checkbox" /> Training, retention, administrator access, and connected services were checked.</label><label><input type="checkbox" /> Client, legal, security, records, and sector rules are satisfied.</label></div><div class="check-group"><h3>Minimum useful copy</h3><label><input type="checkbox" /> The original is preserved and will not be uploaded by mistake.</label><label><input type="checkbox" /> Unnecessary pages, sheets, columns, rows, attachments, and precision are removed.</label><label><input type="checkbox" /> Direct identifiers are removed or replaced consistently.</label><label><input type="checkbox" /> Indirect identifiers were assessed together for re-identification risk.</label></div><div class="check-group"><h3>Visible and hidden data</h3><label><input type="checkbox" /> Redaction removed underlying content; it did not merely cover it.</label><label><input type="checkbox" /> Properties, comments, revisions, notes, hidden rows or slides, attachments, and embedded objects were inspected as applicable.</label><label><input type="checkbox" /> Credentials, tokens, connection strings, internal URLs, and filenames were checked.</label><label><input type="checkbox" /> Scans and images received a visual review; metadata and OCR limits were considered.</label></div><div class="check-group"><h3>Final verification</h3><label><input type="checkbox" /> The exact prepared copy was closed, reopened, and searched again.</label><label><input type="checkbox" /> Redacted regions cannot reveal source text through selection, copy, or extraction.</label><label><input type="checkbox" /> Required content, formulas, references, layout, and meaning still work.</label><label><input type="checkbox" /> A responsible person reviewed the exact file and approved the upload.</label></div></section>',
  '  <aside class="guide-warning"><strong>Important</strong><p>This checklist is general risk-reduction guidance, not legal, compliance, or security advice. A checked box does not prove that a file is anonymous or safe for every destination.</p></aside>',
  '</div></section>'
].join("\n");

const checklistHtml = documentShell({
  route: "/checklists/before-ai-upload/",
  prefix: "../../",
  title: "Before-AI Upload Checklist | FilePreflight",
  description: checklistDescription,
  eyebrow: "Printable workflow",
  h1: "Before-AI upload checklist",
  lede: "A practical decision and review checklist for documents prepared for ChatGPT, Claude, Gemini, or another AI service.",
  body: checklistBody,
  bodyClass: "checklist-page"
});

async function sha256(path) {
  return createHash("sha256").update(await readFile(path)).digest("hex").toUpperCase();
}

const unsafePdf = join(root, "downloads", "pdf-redaction-demo", "unsafe-overlay-demo.pdf");
const absentPdf = join(root, "downloads", "pdf-redaction-demo", "canaries-absent-demo.pdf");
const unsafeHash = await sha256(unsafePdf);
const absentHash = await sha256(absentPdf);

const demoDescription = "Download two synthetic PDFs and compare visual covering with a comparison file that never contains the canary values.";
const demoBody = [
  '<section class="section resource-section"><div class="shell resource-shell">',
  '  <aside class="guide-warning"><strong>Educational synthetic demo</strong><p>These files were created to demonstrate a verification technique. They are not FilePreflight output, do not contain real customer data, and are not evidence that the unreleased app has passed a PDF test.</p></aside>',
  '  <section><p class="eyebrow">The comparison</p><h2>Same visual idea, different underlying data.</h2><p>The first PDF places an opaque rectangle over two synthetic canaries. They are hidden from view but remain extractable. The second PDF was authored without those canaries in its content data.</p><div class="download-grid"><article class="download-card unsafe"><span class="status-tag unsafe">Unsafe technique</span><h3>Opaque overlay</h3><p>The page looks covered, but text extraction still recovers both synthetic canaries.</p><a class="button button-secondary" data-cta="download-pdf" data-page="pdf-redaction-demo" data-destination="unsafe-overlay-pdf" href="./unsafe-overlay-demo.pdf" download>Download overlay demo</a><code>SHA-256<br />' + unsafeHash + '</code></article><article class="download-card removed"><span class="status-tag verified">Canaries absent</span><h3>Comparison file</h3><p>The two canaries were never written to this PDF and are absent from its page content and decoded streams.</p><a class="button button-primary" data-cta="download-pdf" data-page="pdf-redaction-demo" data-destination="canaries-absent-pdf" href="./canaries-absent-demo.pdf" download>Download comparison file</a><code>SHA-256<br />' + absentHash + '</code></article></div></section>',
  '  <section><p class="eyebrow">Verify it yourself</p><h2>Do more than look at the page.</h2><ol class="method-list"><li><strong>Open both PDFs.</strong><span>They should render as one-page synthetic documents.</span></li><li><strong>Search the files.</strong><span>Search near the covered region or use a PDF text extraction tool.</span></li><li><strong>Try selection and copy.</strong><span>Visual covering should not be trusted when underlying text can still be selected or extracted.</span></li><li><strong>Inspect hidden structures.</strong><span>A real workflow must also consider metadata, annotations, attachments, forms, layers, OCR, and other objects.</span></li><li><strong>Review the meaning.</strong><span>Absence of these two canaries does not prove that every sensitive fact is gone.</span></li></ol><a class="text-link" href="../redaction-verification-checklist.txt" download>Download the redaction verification checklist →</a></section>',
  '  <section class="resource-next"><div><p class="eyebrow light">Next step</p><h2>Apply the full upload decision.</h2><p>Check destination approval, data minimisation, hidden content, output usability, and human review.</p></div><a class="button button-light" data-cta="before-ai-checklist" data-page="pdf-redaction-demo" data-destination="before-ai-upload-checklist" href="../../checklists/before-ai-upload/">Open the full checklist</a></section>',
  '</div></section>'
].join("\n");

const demoHtml = documentShell({
  route: "/downloads/pdf-redaction-demo/",
  prefix: "../../",
  title: "PDF Redaction Demo: Overlay vs Absence | FilePreflight",
  description: demoDescription,
  eyebrow: "Synthetic before-and-after files",
  h1: "PDF redaction demo: visual covering vs verified absence",
  lede: "A two-file exercise showing why a black rectangle is not proof that underlying PDF text is gone—and why absence must be verified separately.",
  body: demoBody
});

const beforeUploadText = `FILEPREFLIGHT — BEFORE-AI UPLOAD CHECKLIST\n\nDECISION GATES\n[ ] The exact AI service, workspace, account, feature, and organisational use are approved.\n[ ] The file is the minimum useful copy for the stated task.\n[ ] A responsible person reviewed the exact output.\n\nPURPOSE AND DESTINATION\n[ ] The task is written in one sentence.\n[ ] Training, retention, administrator access, connectors, and contract were checked.\n[ ] Client, legal, security, records, and sector rules are satisfied.\n\nMINIMUM USEFUL COPY\n[ ] The original is preserved and will not be uploaded by mistake.\n[ ] Unnecessary pages, sheets, rows, columns, fields, attachments, and precision are removed.\n[ ] Direct identifiers are removed or replaced consistently.\n[ ] Indirect identifiers were assessed together for re-identification risk.\n\nVISIBLE AND HIDDEN DATA\n[ ] Redaction removed underlying content; it did not merely cover it.\n[ ] Properties, comments, revisions, notes, hidden content, attachments, and embedded objects were inspected.\n[ ] Credentials, tokens, connection strings, internal URLs, and filenames were checked.\n[ ] Scans and images received a visual review; metadata and OCR limits were considered.\n\nFINAL VERIFICATION\n[ ] The exact copy was closed, reopened, and searched again.\n[ ] Redacted areas do not reveal source text through selection, copy, or extraction.\n[ ] Required content, formulas, references, layout, and meaning still work.\n[ ] A responsible person approved the exact file and destination.\n\nIf any gate is unknown or fails, do not upload. Use a synthetic example, an approved controlled environment, or no file.\n\nGeneral risk-reduction guidance only; not legal, compliance, or security advice.\n`;

const redactionText = `FILEPREFLIGHT — REDACTION VERIFICATION CHECKLIST\n\n[ ] Work on a copy; preserve the original.\n[ ] Use a redaction/removal function, not a shape, highlight, crop, or white text.\n[ ] Apply the redaction and save to a new file.\n[ ] Close and reopen the exact output.\n[ ] Search each sensitive term and common variant.\n[ ] Try selecting and copying around every redacted region.\n[ ] Inspect properties, comments, annotations, attachments, layers, forms, scripts, and embedded objects as applicable.\n[ ] Review scanned or image-only pages visually; account for OCR errors.\n[ ] Confirm the file opens normally and useful content still works.\n[ ] Have a responsible person review the exact upload copy.\n\nA zero-result search is not proof that an image-only or unsupported item is absent.\n`;

const secretResponseText = `FILEPREFLIGHT — EXPOSED SECRET RESPONSE CHECKLIST\n\n[ ] Revoke or rotate the live credential first.\n[ ] Review access, audit, billing, and security logs.\n[ ] Check related permissions, sessions, and dependent systems.\n[ ] Follow the organisation's incident, legal, and notification process.\n[ ] Remove the value from current files and other copies as required.\n[ ] Review Git history, forks, pull requests, logs, notebooks, caches, and generated artifacts with appropriate specialist tools.\n[ ] Prepare only the minimum supported file set for AI; use inert placeholders.\n[ ] Re-scan the exact prepared files and obtain required approval.\n\nFilePreflight's Windows MVP is planned for supported text, data, configuration, and log extensions. It is not a repository or Git-history scanner.\n`;

const placeholderMappingCsv = `placeholder_type,placeholder,original_value_local_only,transformation_notes
company,Company A,,Keep the original value only in a separately protected local mapping
person,Person 01,,Use the same placeholder for the same person throughout the prepared copy
project,Project Red,,Replace related filenames comments and free text consistently
location,Region 1,,Generalise further when a rare location could re-identify the subject
date,Q2 2026,,Preserve only the precision the AI task actually needs
amount,USD 750K-1M,,Use a range or synthetic value when the exact amount is unnecessary
`;

const excelHiddenDataText = `FILEPREFLIGHT — EXCEL HIDDEN-DATA CHECKLIST

[ ] Preserve the source workbook and create a separate working copy.
[ ] Confirm that .xlsx is the intended supported format; macro-enabled workbooks are outside the launch scope.
[ ] Delete sheets, rows, columns, tables, and precision the AI task does not need.
[ ] Inspect hidden and very-hidden worksheets.
[ ] Inspect hidden rows and columns, filtered-out rows, grouped data, and custom views.
[ ] Review formulas for internal paths, linked workbooks, server names, pricing logic, and sensitive references.
[ ] Review defined names, external links, data connections, queries, pivot caches, charts, and embedded objects.
[ ] Inspect comments, notes, threaded discussions, document properties, authors, and custom properties.
[ ] Review filenames, sheet names, headers, footers, print areas, and hidden objects.
[ ] Replace identifiers consistently and assess combinations that can re-identify a person or company.
[ ] Close and reopen the exact prepared workbook.
[ ] Confirm formulas, totals, references, formatting, and required charts still behave as intended.
[ ] Search again for every source name, domain, identifier, project term, and distinctive phrase.
[ ] Have a responsible person review the exact workbook and AI destination.

Hidden is not private. Work on a copy, and do not assume a zero-result search proves that every risk is gone.
`;

const hiddenDataInventoryText = `FILEPREFLIGHT — CROSS-FORMAT HIDDEN-DATA INVENTORY

PDF
- Document properties and XMP metadata
- Comments, annotations, form values, attachments, layers, scripts, and embedded files
- Text hidden by shapes, crops, clipping, or visual overlays
- OCR text and page-image content

WORD / DOCX
- Properties, authors, template references, comments, tracked changes, headers, footers, and hidden text
- Embedded objects, links, relationship parts, custom XML, and filenames

EXCEL / XLSX
- Hidden sheets, rows, columns, formulas, defined names, comments, connections, pivot caches, charts, and properties
- External workbook paths, queries, embedded objects, and filenames

POWERPOINT / PPTX
- Speaker notes, hidden slides, comments, off-slide objects, properties, links, and embedded media or files

JPEG / PNG
- EXIF, XMP, IPTC, GPS, device information, thumbnails, and visible text in pixels

TEXT / DATA / CONFIG
- Credentials, tokens, connection strings, internal URLs, identifiers, comments, fields, filenames, and encoding artifacts
- Relationships between otherwise ordinary fields that can re-identify a subject

FINAL CHECK
[ ] Use the minimum useful copy.
[ ] Inspect both visible content and applicable hidden structures.
[ ] Close and reopen the exact output.
[ ] Search, extract, and visually review again.
[ ] Confirm useful content and file behavior remain intact.
[ ] Obtain required human and destination approval.
`;

const legalReviewText = `FILEPREFLIGHT — LEGAL DOCUMENT AI REVIEW CHECKLIST

General information only; not legal advice.

[ ] Identify the jurisdiction, professional rules, engagement terms, protective orders, client instructions, and organisational policy.
[ ] Confirm the exact AI service, workspace, feature, contract, retention, administrator access, and connectors.
[ ] Obtain the responsible lawyer's or organisation's approval and any consent required for the actual matter.
[ ] Use only the minimum clause, chronology, extract, or synthetic hypothetical needed for the task.
[ ] Review direct identifiers and matter-specific indirect identifiers together.
[ ] Inspect comments, tracked changes, rejected wording, properties, authors, filenames, attachments, exhibits, and embedded objects.
[ ] Apply true redaction and format-specific sanitisation to a separate copy.
[ ] Close and reopen the exact output; search, extract, and visually review it again.
[ ] Confirm the document remains usable and that redaction has not changed required meaning or evidentiary value.
[ ] Record the purpose, approver, destination, settings, and exact uploaded copy where policy requires it—without logging confidential values.
[ ] Stop or use a synthetic or controlled alternative when residual risk remains too high.
`;

async function write(path, content) {
  const target = join(root, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

await write("evidence/index.html", evidenceHtml);
await write("checklists/before-ai-upload/index.html", checklistHtml);
await write("downloads/pdf-redaction-demo/index.html", demoHtml);
await write("downloads/before-ai-upload-checklist.txt", beforeUploadText);
await write("downloads/redaction-verification-checklist.txt", redactionText);
await write("downloads/exposed-secret-response-checklist.txt", secretResponseText);
await write("downloads/placeholder-mapping-template.csv", placeholderMappingCsv);
await write("downloads/excel-hidden-data-checklist.txt", excelHiddenDataText);
await write("downloads/hidden-data-inventory.txt", hiddenDataInventoryText);
await write("downloads/legal-ai-review-checklist.txt", legalReviewText);
