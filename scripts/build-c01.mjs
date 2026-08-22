import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://filepreflight.ai-labs.co.jp";
const canonical = siteUrl + "/ai-document-sanitizer/";
const title = "AI Document Sanitizer: Make Files Safe Before You Upload";
const description = "Prepare a separate copy of supported files before uploading to AI. Explore FilePreflight's local-first Windows workflow, planned formats, and known limits.";

const faqs = [
  {
    question: 'What does “safe” mean here?',
    answer: "Safe means reducing identified exposure in supported file types before upload. It does not mean anonymous, compliant, or risk-free. Detection is best-effort, so review the exported copy."
  },
  {
    question: "Do my files leave my computer?",
    answer: "FilePreflight is being designed for on-device file processing. The release evidence will document network behavior under stated test conditions. Until that evidence is published, local processing is a product design goal rather than an independently verifiable claim."
  },
  {
    question: "Does FilePreflight modify the original?",
    answer: "The planned workflow creates a separate output copy and leaves the source file unchanged. Preserve the original, then review and re-inspect the exported copy before sharing it."
  },
  {
    question: "Is redaction the same as sanitization?",
    answer: "No. Redaction generally removes visible text or graphics. Sanitization also addresses supported hidden data such as metadata, embedded content, comments, or scripts. Some files need both."
  },
  {
    question: "Can an automated scanner find every sensitive item?",
    answer: "No. Detection depends on file type, structure, content, selected rules, and context. A result with no findings is not proof that a file contains no confidential information."
  },
  {
    question: "What about scanned PDFs and complex spreadsheets?",
    answer: "Scanned pages may depend on OCR quality. Hidden sheets, formulas, external links, macros, embedded objects, and encrypted content need format-specific handling and may require manual review. Final support will be documented per format."
  },
  {
    question: "Does sanitizing a file make an upload compliant?",
    answer: "No. File preparation can support data minimisation, but compliance depends on your purpose, authorization, policies, contracts, provider settings, security controls, and applicable law."
  }
];

const schema = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": canonical + "#webpage",
      url: canonical,
      name: title,
      description,
      inLanguage: "en",
      dateModified: "2026-08-22",
      about: { "@id": canonical + "#software" },
      breadcrumb: { "@id": canonical + "#breadcrumb" },
      publisher: { "@type": "Organization", name: "AI Labs LLC", url: "https://www.ai-labs.co.jp/" }
    },
    {
      "@type": "SoftwareApplication",
      "@id": canonical + "#software",
      name: "FilePreflight",
      url: canonical,
      description: "A Windows application in development for preparing a separate, reviewable copy of supported files before AI upload.",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Windows",
      creator: { "@type": "Organization", name: "AI Labs LLC", url: "https://www.ai-labs.co.jp/" }
    },
    {
      "@type": "FAQPage",
      "@id": canonical + "#faq",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer }
      }))
    },
    {
      "@type": "BreadcrumbList",
      "@id": canonical + "#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "FilePreflight", item: siteUrl + "/" },
        { "@type": "ListItem", position: 2, name: "AI Document Sanitizer", item: canonical }
      ]
    }
  ]
});

const faqHtml = faqs.map((faq, index) => `
          <details${index === 0 ? " open" : ""}>
            <summary>${faq.question}</summary>
            <p>${faq.answer}</p>
          </details>`).join("");

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${description}" />
  <meta name="theme-color" content="#0b1020" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="FilePreflight" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${siteUrl}/og.png" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${siteUrl}/og.png" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="en" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${canonical}" />
  <link rel="stylesheet" href="../styles.css" />
  <script type="application/ld+json">${schema}</script>
  <title>${title}</title>
</head>
<body class="c01-page">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header c01-header">
    <div class="shell header-inner">
      <a class="brand" href="../" aria-label="FilePreflight home"><span class="brand-mark" aria-hidden="true"><span></span></span><span>FilePreflight</span></a>
      <nav class="desktop-nav" aria-label="Primary navigation">
        <a href="#workflow">How it works</a>
        <a href="../evidence/">Evidence</a>
        <a href="#formats">Formats &amp; limits</a>
        <a href="../guides/">Guides</a>
      </nav>
      <a class="c01-header-cta" data-cta="launch-email" data-page="ai-document-sanitizer" data-destination="email" href="mailto:contact@ai-labs.co.jp?subject=FilePreflight%20launch%20updates%20%E2%80%94%20AI%20document%20sanitizer">Get launch updates</a>
    </div>
  </header>

  <main id="main">
    <section class="c01-hero">
      <div class="hero-glow hero-glow-one" aria-hidden="true"></div>
      <div class="hero-glow hero-glow-two" aria-hidden="true"></div>
      <div class="shell c01-hero-grid">
        <div class="c01-hero-copy">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">FilePreflight</a><span aria-hidden="true">/</span><span>AI Document Sanitizer</span></nav>
          <p class="eyebrow light">Local-first Windows app · Initial release in preparation</p>
          <h1>AI Document Sanitizer: Make Files Safe Before You Upload</h1>
          <p class="c01-lede">FilePreflight is a Windows app in development for inspecting supported sensitive content, hidden metadata, and risky file elements on-device—then exporting a separate copy for you to review before an AI upload.</p>
          <div class="hero-actions">
            <a class="button button-primary" data-cta="launch-email" data-page="ai-document-sanitizer" data-destination="email" href="mailto:contact@ai-labs.co.jp?subject=FilePreflight%20launch%20updates%20%E2%80%94%20AI%20document%20sanitizer">Get launch updates</a>
            <a class="button button-secondary" data-cta="workflow" data-page="ai-document-sanitizer" data-destination="workflow" href="#workflow">See the workflow</a>
          </div>
          <p class="c01-boundary"><strong>What “safe” means here:</strong> reducing identified exposure in supported file types—not a guarantee that a file is anonymous, compliant, or risk-free. Automated detection is best-effort, so review the exported copy before uploading.</p>
          <p class="c01-release-note">Initial Windows release in preparation. No download or checkout is available yet.</p>
        </div>

        <div class="c01-scan-panel" aria-label="Illustration of a document preflight review">
          <div class="c01-panel-bar"><span class="mini-mark" aria-hidden="true"></span><div><strong>Preflight review</strong><small>Illustrative interface</small></div><span class="c01-dev-pill">In development</span></div>
          <div class="c01-file-summary"><span class="file-icon" aria-hidden="true"></span><div><strong>customer-analysis.pdf</strong><small>Separate output copy planned</small></div></div>
          <div class="c01-finding-list">
            <div><span class="c01-finding-icon">Aa</span><p><strong>Visible content</strong><small>Names, email addresses, account details</small></p><span>Review</span></div>
            <div><span class="c01-finding-icon">⌁</span><p><strong>Hidden file data</strong><small>Comments, notes, embedded elements</small></p><span>Inspect</span></div>
            <div><span class="c01-finding-icon">{ }</span><p><strong>Metadata &amp; secrets</strong><small>Properties, tokens, configuration values</small></p><span>Scan</span></div>
          </div>
          <div class="c01-export-row"><span><strong>Export and recheck</strong><small>User review remains required</small></span><span aria-hidden="true">→</span></div>
        </div>
      </div>
    </section>

    <section class="c01-signal-strip" aria-label="Product principles">
      <div class="shell">
        <span><strong>01</strong> Local-first design</span>
        <span><strong>02</strong> Separate-copy workflow</span>
        <span><strong>03</strong> Best-effort detection</span>
        <span><strong>04</strong> Human final review</span>
      </div>
    </section>

    <section class="section c01-problem" aria-labelledby="problem-title">
      <div class="shell">
        <div class="c01-section-head">
          <p class="eyebrow">Before ChatGPT, Claude, Gemini, or another AI service</p>
          <h2 id="problem-title">A file can reveal more than the page you see.</h2>
          <p>Copying a document and deleting a name may leave other clues behind. A useful AI document sanitizer must separate what is visible from what can be stored inside the file.</p>
        </div>
        <div class="c01-risk-grid">
          <article><span>01</span><h3>Visible sensitive content</h3><p>Names, email addresses, phone numbers, account identifiers, contract terms, customer details, and other information shown on the page.</p></article>
          <article><span>02</span><h3>Hidden document data</h3><p>Comments, tracked changes, hidden text, hidden sheets, speaker notes, embedded files, and other format-specific content outside the normal view.</p></article>
          <article><span>03</span><h3>Metadata and secrets</h3><p>Author and company properties, document history, image metadata, API keys, tokens, passwords, connection strings, and configuration values.</p></article>
        </div>
        <p class="c01-source-line">Microsoft documents hidden Office data that may require inspection, while Adobe distinguishes visible PDF redaction from hidden-data sanitization. <a href="#sources">See the primary sources</a>.</p>
      </div>
    </section>

    <section class="section c01-workflow" id="workflow" aria-labelledby="workflow-title">
      <div class="shell">
        <div class="c01-section-head c01-section-head-light">
          <p class="eyebrow light">A reviewable preflight, not a magic “safe” badge</p>
          <h2 id="workflow-title">Inspect. Decide. Export. Recheck.</h2>
          <p>The planned workflow keeps the decision with the person who understands the file and the destination.</p>
        </div>
        <ol class="c01-workflow-grid">
          <li><span>01</span><h3>Start with the task</h3><p>Decide what the AI actually needs. Remove entire sections, sheets, or fields that are unnecessary before relying on pattern detection.</p></li>
          <li><span>02</span><h3>Inspect supported risks</h3><p>Review visible content, file properties, hidden elements, and supported credential patterns using checks appropriate to the format.</p></li>
          <li><span>03</span><h3>Choose each change</h3><p>Remove, replace, or generalize selected findings. Context matters, so the software should assist your judgment rather than silently decide for you.</p></li>
          <li><span>04</span><h3>Export and recheck</h3><p>Write a separate copy, reopen it, confirm it is readable, scan it again, and review that exact output before uploading.</p></li>
        </ol>
      </div>
    </section>

    <section class="section c01-evidence" id="evidence" aria-labelledby="evidence-title">
      <div class="shell c01-evidence-layout">
        <div class="c01-section-head">
          <p class="eyebrow">Evidence over slogans</p>
          <h2 id="evidence-title">Proof should be inspectable.</h2>
          <p>The release will be accompanied by artifacts that let you evaluate the local-first workflow and its limits. Until they are published, this page describes those capabilities as planned.</p>
          <div class="c01-status"><span aria-hidden="true"></span><strong>Methods published; release-build results pending</strong></div>
          <p><a class="text-link" data-cta="evidence" data-page="ai-document-sanitizer" data-destination="evidence" href="../evidence/">Review the public evidence status →</a></p>
        </div>
        <div class="c01-evidence-grid">
          <article><span class="c01-evidence-number">01</span><h3>Network behavior test</h3><p>A dated, reproducible test with the environment, method, and observed network behavior documented.</p><a href="../evidence/#network">Method and status →</a></article>
          <article><span class="c01-evidence-number">02</span><h3>Synthetic redaction demo</h3><p>Educational PDFs compare visual covering with removed content. They are explicitly not FilePreflight output.</p><a href="../downloads/pdf-redaction-demo/">Open the demo →</a></article>
          <article><span class="c01-evidence-number">03</span><h3>Format-and-limits matrix</h3><p>Per-format coverage for inspection, transformation, rechecking, and cases that still need manual work.</p><a href="../evidence/#coverage">Planned coverage →</a></article>
          <article><span class="c01-evidence-number">04</span><h3>Example review record</h3><p>A findings and recheck summary—presented as a review aid, never as security certification.</p><a href="../evidence/#review-record">Record criteria →</a></article>
        </div>
      </div>
    </section>

    <section class="section c01-checks" aria-labelledby="checks-title">
      <div class="shell">
        <div class="c01-section-head">
          <p class="eyebrow">Planned inspection layers</p>
          <h2 id="checks-title">One workflow for four different exposure modes.</h2>
          <p>Each file format stores information differently. FilePreflight is being designed to apply supported, format-aware checks and show what still needs review.</p>
        </div>
        <div class="c01-check-grid">
          <article><h3>Sensitive information</h3><p>Supported patterns for personal and business identifiers in visible or extracted content.</p><small>Context-sensitive facts may not match a rule.</small></article>
          <article><h3>Hidden Office &amp; PDF data</h3><p>Supported comments, notes, hidden content, attachments, and other embedded elements.</p><small>Coverage varies by format and file structure.</small></article>
          <article><h3>Metadata</h3><p>Supported author, company, title, timestamp, image, and document-property fields.</p><small>Some properties may be stored outside tested fields.</small></article>
          <article><h3>Credentials</h3><p>Supported API-key, token, password, connection-string, and configuration patterns.</p><small>If a secret was exposed, revoke or rotate it.</small></article>
        </div>
      </div>
    </section>

    <section class="section c01-formats" id="formats" aria-labelledby="formats-title">
      <div class="shell">
        <div class="c01-section-head">
          <p class="eyebrow">Planned initial Windows coverage</p>
          <h2 id="formats-title">Formats and limits, side by side.</h2>
          <p>The 17 extensions below are targets for the initial release, subject to reproducible verification. The public support matrix will replace these planned labels at launch.</p>
        </div>
        <div class="c01-table-wrap" role="region" aria-label="Planned file format support" tabindex="0">
          <table class="c01-table">
            <thead><tr><th>File group</th><th>Planned extensions</th><th>Inspection focus</th><th>Important limits</th></tr></thead>
            <tbody>
              <tr><th>Documents &amp; Office</th><td><code>.pdf</code> <code>.docx</code> <code>.xlsx</code> <code>.pptx</code></td><td>Visible text, supported metadata, comments, notes, hidden or embedded elements</td><td>Encrypted files, macros, linked content, complex objects, and formula effects may require manual work</td></tr>
              <tr><th>Images</th><td><code>.jpg</code> <code>.jpeg</code> <code>.png</code></td><td>OCR text and supported image metadata</td><td>OCR depends on image quality, layout, language, and handwriting; visual review remains essential</td></tr>
              <tr><th>Text</th><td><code>.txt</code> <code>.md</code> <code>.markdown</code> <code>.log</code></td><td>Supported identifiers, credentials, and text patterns</td><td>Project names, commercial sensitivity, and uncommon secret formats can require contextual review</td></tr>
              <tr><th>Data &amp; config</th><td><code>.csv</code> <code>.json</code> <code>.xml</code> <code>.yaml</code> <code>.yml</code> <code>.env</code></td><td>Structured values, identifiers, keys, tokens, passwords, and connection details</td><td>Relationships between fields can remain identifying even after direct identifiers are removed</td></tr>
            </tbody>
          </table>
        </div>
        <div class="c01-limit-grid">
          <p><strong>No complete-detection guarantee.</strong> “No findings” means only that no supported rule found a match in the tested scope.</p>
          <p><strong>No automatic compliance.</strong> Your authorization, destination, provider settings, contracts, policies, and applicable law still matter.</p>
          <p><strong>No substitute for review.</strong> Re-identification and inference risks can remain after direct identifiers are removed.</p>
        </div>
      </div>
    </section>

    <section class="section c01-local" aria-labelledby="local-title">
      <div class="shell c01-local-layout">
        <div class="c01-section-head c01-section-head-light">
          <p class="eyebrow light">Local-first by design</p>
          <h2 id="local-title">Prepare the copy before it reaches an AI service.</h2>
          <p>The planned application workflow performs file inspection and transformation on the Windows device. Once you upload the reviewed copy to ChatGPT, Claude, Gemini, or another service, that copy leaves the device and the provider's terms and settings apply.</p>
        </div>
        <div class="c01-data-flow" aria-label="Planned data flow">
          <div><span>1</span><strong>Original file</strong><small>Preserved under your controls</small></div>
          <span aria-hidden="true">→</span>
          <div class="active"><span>2</span><strong>Local preflight</strong><small>Inspect, transform, recheck</small></div>
          <span aria-hidden="true">→</span>
          <div><span>3</span><strong>Reviewed copy</strong><small>You decide whether to upload</small></div>
        </div>
      </div>
    </section>

    <section class="section c01-pricing" aria-labelledby="pricing-title">
      <div class="shell c01-pricing-layout">
        <div class="c01-section-head">
          <p class="eyebrow">Planned perpetual pricing</p>
          <h2 id="pricing-title">Start free. Upgrade for workload and control.</h2>
          <p>Free and Pro are planned to use the same per-file processing approach. Published features, limits, pricing, and availability may change before release.</p>
        </div>
        <div class="c01-price-options">
          <article><div><p>Free</p><strong>$0</strong></div><span>Planned</span><ul><li>Single-file workflow</li><li>All verified launch formats</li><li>No ads or watermarks planned</li></ul></article>
          <article class="featured"><div><p>Pro</p><strong>$29 <small>once</small></strong></div><span>Planned</span><ul><li>Folder and batch workflows</li><li>Expanded capacity</li><li>Custom policies and output control</li></ul></article>
        </div>
        <a class="button button-primary" data-cta="launch-email" data-page="ai-document-sanitizer" data-destination="email" href="mailto:contact@ai-labs.co.jp?subject=FilePreflight%20launch%20updates%20%E2%80%94%20AI%20document%20sanitizer">Get launch updates</a>
      </div>
    </section>

    <section class="section c01-guides" aria-labelledby="guides-title">
      <div class="shell">
        <div class="c01-section-head">
          <p class="eyebrow">Build the full workflow</p>
          <h2 id="guides-title">Prepare the file—and check the destination.</h2>
          <p>A cleaner copy is one layer. Use these source-backed guides to review the AI service, the document type, and the disclosure decision.</p>
        </div>
        <div class="c01-guide-grid">
          <a href="../guides/is-it-safe-to-upload-confidential-documents-to-chatgpt/"><span>Decision guide</span><strong>Is it safe to upload confidential documents to ChatGPT?</strong><small>Read guide →</small></a>
          <a href="../guides/redact-sensitive-information-before-chatgpt/"><span>Redaction</span><strong>Redact sensitive information before ChatGPT</strong><small>Read guide →</small></a>
          <a href="../guides/anonymize-company-data-before-ai/"><span>Company data</span><strong>Anonymize company data before AI</strong><small>Read guide →</small></a>
          <a href="../guides/anonymize-excel-data-before-ai/"><span>Spreadsheets</span><strong>Anonymize Excel data before AI</strong><small>Read guide →</small></a>
          <a href="../guides/remove-hidden-data-metadata-before-ai/"><span>Hidden data</span><strong>Remove hidden data and metadata before AI</strong><small>Read guide →</small></a>
          <a href="../guides/redact-sanitize-pdf-before-chatgpt/"><span>PDF</span><strong>Redact and sanitize a PDF before ChatGPT</strong><small>Read guide →</small></a>
        </div>
      </div>
    </section>

    <section class="section c01-faq" id="faq" aria-labelledby="faq-title">
      <div class="shell c01-faq-layout">
        <div class="c01-section-head">
          <p class="eyebrow">Frequently asked questions</p>
          <h2 id="faq-title">Know the boundary before you rely on the tool.</h2>
          <p>FilePreflight is a preparation aid. The person sharing the file remains responsible for the final review and upload decision.</p>
        </div>
        <div class="c01-faq-list">${faqHtml}
        </div>
      </div>
    </section>

    <section class="section c01-sources" id="sources" aria-labelledby="sources-title">
      <div class="shell c01-sources-layout">
        <div><p class="eyebrow">Primary sources</p><h2 id="sources-title">Why these layers matter.</h2></div>
        <div>
          <p>Microsoft documents comments, revisions, document properties, hidden text, hidden spreadsheet rows and columns, and other information that may remain in Office files. It also describes items its Inspector cannot detect or remove and recommends inspecting a copy.</p>
          <p>Adobe distinguishes visible-content redaction from sanitization of hidden information such as metadata, embedded content, and scripts. NIST explains that de-identification techniques vary in effectiveness and that re-identification or inference risk can remain.</p>
          <ul>
            <li><a href="https://support.microsoft.com/en-US/Office/collab-files/remove-hidden-data-and-personal-information-by-inspecting-documents-presentations-or-workbooks" target="_blank" rel="noopener noreferrer">Microsoft: Remove hidden data and personal information with Document Inspector</a></li>
            <li><a href="https://helpx.adobe.com/acrobat/desktop/protect-documents/redact-pdfs/redacting-sanitizing.html" target="_blank" rel="noopener noreferrer">Adobe: Redaction and sanitization</a></li>
            <li><a href="https://helpx.adobe.com/acrobat/desktop/protect-documents/redact-pdfs/redactable-data.html" target="_blank" rel="noopener noreferrer">Adobe: Types of redactable PDF data</a></li>
            <li><a href="https://www.nist.gov/publications/de-identification-personal-information" target="_blank" rel="noopener noreferrer">NIST: De-Identification of Personal Information</a></li>
            <li><a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/" target="_blank" rel="noopener noreferrer">UK ICO: Data minimisation</a> <small>(guidance currently under review)</small></li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section c01-final-cta">
      <div class="shell c01-final-inner">
        <div><p class="eyebrow light">FilePreflight for Windows</p><h2>Make the upload decision with a file you have actually reviewed.</h2><p>Join the launch list for availability, verified format coverage, and the first public evidence package.</p></div>
        <a class="button button-light" data-cta="launch-email" data-page="ai-document-sanitizer" data-destination="email" href="mailto:contact@ai-labs.co.jp?subject=FilePreflight%20launch%20updates%20%E2%80%94%20AI%20document%20sanitizer">Get launch updates</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="shell footer-inner">
      <a class="brand footer-brand" href="../"><span class="brand-mark" aria-hidden="true"><span></span></span><span>FilePreflight</span></a>
      <p>© 2026 FilePreflight</p>
      <div class="footer-links"><a href="../">Product</a><a href="../evidence/">Evidence</a><a href="../guides/">Guides</a><a href="../#privacy">Privacy</a><a href="mailto:contact@ai-labs.co.jp">Contact</a><a href="https://www.ai-labs.co.jp/products/filepreflight">Developed by AI Labs LLC</a></div>
    </div>
  </footer>
</body>
</html>
`;

const redirectSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Document Sanitizer",
  url: canonical,
  isPartOf: { "@type": "WebSite", name: "FilePreflight", url: siteUrl + "/" }
});

const redirect = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="This FilePreflight page has moved to the AI Document Sanitizer product page." />
  <meta name="robots" content="noindex, follow" />
  <meta http-equiv="refresh" content="0; url=../../ai-document-sanitizer/" />
  <link rel="canonical" href="${canonical}" />
  <link rel="stylesheet" href="../../styles.css" />
  <script type="application/ld+json">${redirectSchema}</script>
  <title>AI Document Sanitizer | FilePreflight</title>
</head>
<body class="redirect-page">
  <main>
    <a class="brand" href="../../"><span class="brand-mark" aria-hidden="true"><span></span></span><span>FilePreflight</span></a>
    <h1>This page has moved.</h1>
    <p>Continue to <a href="../../ai-document-sanitizer/">AI Document Sanitizer: Make Files Safe Before You Upload</a>.</p>
  </main>
</body>
</html>
`;

async function write(path, content) {
  const target = join(root, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

await write("ai-document-sanitizer/index.html", page);
await write("guides/ai-document-sanitizer/index.html", redirect);
