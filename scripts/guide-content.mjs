export const guides = [
  {
    slug: "is-it-safe-to-upload-confidential-documents-to-chatgpt",
    shortTitle: "Confidential documents and ChatGPT",
    title: "Is It Safe to Upload Confidential Company Documents to ChatGPT?",
    description: "A decision framework for ChatGPT uploads covering workspace type, training controls, retention, administrator access, data minimisation, and document preparation.",
    category: "ChatGPT privacy",
    readTime: "8 min read",
    summary: "There is no blanket yes or no. The answer depends on the ChatGPT product and workspace, current settings and contract, retention, administrator access, the document itself, and your organisation's policy.",
    warning: "Not used for model training does not mean not stored. Temporary Chat is not the same as zero retention, and a managed workspace does not make every upload appropriate.",
    sections: [
      {
        heading: "Start with the workspace, not the brand name",
        html: [
          "<p>ChatGPT is offered through personal workspaces, managed business workspaces, and separate API services. They do not all use the same defaults or data lifecycle. Before considering a confidential file, identify the exact product, account, workspace, and feature that will receive it.</p>",
          "<p>OpenAI states that content from ChatGPT Business, Enterprise, Edu, Healthcare, Teachers, and its API is not used to train models by default. For a personal ChatGPT workspace, users can turn off model improvement in Data Controls. These are useful controls, but they answer only the training question.</p>",
          "<p>Storage is separate. OpenAI's retention documentation explains that chats remain until deleted in ordinary use, subject to stated deletion timelines and exceptions. Temporary Chats are not used for training or placed in history, but OpenAI says a copy may be kept for up to 30 days for safety purposes.</p>"
        ]
      },
      {
        heading: "Five questions to answer before an upload",
        html: [
          "<ol><li><strong>Is this use approved?</strong> Check the organisation's AI, client, security, records, and sector-specific rules.</li><li><strong>Which workspace receives it?</strong> Confirm whether it is personal or managed and whether a contract governs business data.</li><li><strong>Who can access it?</strong> Managed-account administrators may be able to access, audit, retain, or delete account data depending on configuration and law.</li><li><strong>How long can it remain?</strong> Review chat, file, library, and temporary-chat retention separately.</li><li><strong>Does a feature send data onward?</strong> Actions, connectors, or other third-party integrations can apply a different recipient's privacy terms.</li></ol>",
          "<p>If any answer is unknown, stop before uploading. A useful AI result rarely requires the whole source document while those questions are unresolved.</p>"
        ]
      },
      {
        heading: "Classify the content in the file",
        html: [
          "<p>Confidential company documents often combine several risk types: personal data, customer terms, forecasts, credentials, legal advice, trade secrets, or information received under a nondisclosure agreement. Removing names alone does not address all of them.</p>",
          "<div class=\"guide-table-wrap\"><table class=\"guide-table\"><thead><tr><th>Question</th><th>Safer response</th></tr></thead><tbody><tr><td>Does AI need the complete file?</td><td>Extract only the relevant pages, rows, or paragraphs.</td></tr><tr><td>Must identities remain?</td><td>Use consistent placeholders such as Customer A and Project B.</td></tr><tr><td>Are exact values required?</td><td>Round, bucket, or replace values when precision is unnecessary.</td></tr><tr><td>Could context re-identify the subject?</td><td>Generalise dates, locations, roles, and rare details together.</td></tr><tr><td>Does the file contain hidden data?</td><td>Inspect comments, changes, properties, attachments, and format-specific objects.</td></tr></tbody></table></div>"
        ]
      },
      {
        heading: "A practical decision rule",
        html: [
          "<p>Use three independent gates. First, the destination must be approved. Second, the copy must contain only the information needed for the stated task. Third, a person responsible for the data must review the exact output. Passing one gate does not compensate for failing another.</p>",
          "<p>For example, a business workspace with training disabled by default can still be the wrong place for a privileged legal memo if policy prohibits the use. Conversely, a permitted use can still be careless if the complete workbook is uploaded when a small synthetic table would answer the question.</p>",
          "<p>When the consequence of disclosure is high, consider a synthetic example, an internally hosted model, an approved API configuration, or no upload at all. The correct outcome of a preflight review is sometimes to stop.</p>"
        ]
      }
    ],
    sources: [
      { title: "Business data privacy, security, and compliance", publisher: "OpenAI", url: "https://openai.com/business-data/" },
      { title: "How does ChatGPT use my data?", publisher: "OpenAI Help Center", url: "https://help.openai.com/en/articles/8983130-how-does-chatgpt-use-my-data" },
      { title: "Temporary Chat FAQ", publisher: "OpenAI Help Center", url: "https://help.openai.com/en/articles/8914046-temporary-chat-faq" },
      { title: "Chat and file retention policies in ChatGPT", publisher: "OpenAI Help Center", url: "https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt" },
      { title: "Data access for your managed ChatGPT account", publisher: "OpenAI Help Center", url: "https://help.openai.com/en/articles/20001067-data-access-for-your-managed-chatgpt-account" }
    ]
  },
  {
    slug: "redact-sensitive-information-before-chatgpt",
    shortTitle: "Redact before ChatGPT",
    title: "How to Redact Sensitive Information Before Uploading Documents to ChatGPT",
    description: "A format-aware workflow for minimising, redacting, sanitising, and verifying a document before it is uploaded to ChatGPT.",
    category: "Practical workflow",
    readTime: "7 min read",
    summary: "Create a copy, reduce it to the minimum useful content, apply real redaction rather than visual covering, remove supported hidden data, and verify the exact output before checking the ChatGPT destination.",
    warning: "A black rectangle, white text, cropping, or a screenshot placed over text may hide content visually without removing the underlying data.",
    sections: [
      {
        heading: "1. Reduce the document before you redact it",
        html: [
          "<p>Begin with the task you want ChatGPT to perform. If the task is to rewrite one clause, extract that clause. If the task is to analyse a small table, create a new table containing only the necessary columns. Every page or field removed at this stage is one less item that redaction must catch.</p>",
          "<p>Work on a duplicate. Keep the original unchanged and clearly name the prepared copy. This protects evidence, avoids accidental data loss, and makes the exact uploaded artefact easier to review later.</p>"
        ]
      },
      {
        heading: "2. Build a redaction inventory",
        html: [
          "<p>List information that is unnecessary for the AI task. Include direct identifiers such as names, email addresses, phone numbers, account numbers, and signatures. Then consider indirect identifiers: precise dates, locations, job titles, unusual transaction values, project names, or combinations that point to one subject.</p>",
          "<p>Add non-personal company risks such as pricing, forecasts, credentials, internal URLs, security findings, source-system IDs, contract language, and information supplied by another party. Company data can be confidential even when it is not personal data.</p>",
          "<p>Choose transformations deliberately. Delete irrelevant passages, replace recurring identities with consistent placeholders, generalise unnecessary detail, and use synthetic values where the exact number is not needed.</p>"
        ]
      },
      {
        heading: "3. Apply format-aware redaction and sanitisation",
        html: [
          "<p>In a PDF, Adobe distinguishes applying redaction to visible content from sanitising hidden information. Marking text is not the final step: the redaction must be applied and the saved result checked. Sanitisation can address other items such as metadata, comments, attachments, hidden layers, or scripts.</p>",
          "<p>In Word, Excel, or PowerPoint, inspect comments, tracked changes, document properties, headers and footers, hidden rows or slides, speaker notes, external links, and embedded objects as applicable. Microsoft Document Inspector can help, but Microsoft documents items it may not detect or remove automatically.</p>",
          "<p>For scanned documents, text may exist only as pixels until OCR is applied. OCR can misread characters, so search results need a visual review of every page. Images may also carry camera and location metadata.</p>"
        ]
      },
      {
        heading: "4. Verify the exact upload copy",
        html: [
          "<ol><li>Close and reopen the prepared file.</li><li>Search for every identifier and keyword on the inventory.</li><li>Try selecting and copying text near each redaction.</li><li>Review comments, attachments, layers, notes, hidden sheets, and properties again.</li><li>Confirm that formulas, references, and document meaning still behave as intended.</li><li>Ask a second reviewer when the consequence of disclosure is high.</li></ol>",
          "<p>Finally, confirm the ChatGPT workspace, Data Controls, retention, administrator access, and organisational approval. File preparation and destination governance are different controls; both are required.</p>"
        ]
      },
      {
        heading: "A reusable final checklist",
        html: [
          "<ul><li>The original is preserved and the output is clearly named.</li><li>Only content needed for the AI task remains.</li><li>Visible redactions remove underlying content rather than cover it.</li><li>Supported hidden data and metadata have been inspected.</li><li>The output opens normally and has been searched again.</li><li>The destination, account, settings, and policy are approved.</li><li>A human has reviewed the exact file to be uploaded.</li></ul>"
        ]
      }
    ],
    sources: [
      { title: "Redact sensitive content in PDFs", publisher: "Adobe Help Center", url: "https://helpx.adobe.com/acrobat/desktop/protect-documents/redact-pdfs/redact.html" },
      { title: "Sanitize PDFs", publisher: "Adobe Help Center", url: "https://helpx.adobe.com/acrobat/desktop/protect-documents/redact-pdfs/sanitize.html" },
      { title: "Remove hidden data and personal information with Document Inspector", publisher: "Microsoft Support", url: "https://support.microsoft.com/en-us/office/collab-files/remove-hidden-data-and-personal-information-by-inspecting-documents-presentations-or-workbooks" },
      { title: "Data minimisation", publisher: "UK Information Commissioner's Office", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/" },
      { title: "Chat and file retention policies in ChatGPT", publisher: "OpenAI Help Center", url: "https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt" }
    ]
  },
  {
    slug: "anonymize-company-data-before-ai",
    shortTitle: "Anonymize company data",
    title: "How to Anonymize Company Data Before Using ChatGPT or Claude",
    description: "A practical method for reducing identification and commercial disclosure risk while preserving enough structure for useful AI analysis.",
    category: "Company data",
    readTime: "8 min read",
    summary: "Remove data the task does not need, replace direct identifiers consistently, generalise indirect identifiers together, separate any re-identification key, and test whether the remaining context still points to a person or company.",
    warning: "Replacing names is usually pseudonymisation, not complete anonymisation—especially when a mapping is retained or the remaining facts can identify the subject.",
    sections: [
      {
        heading: "Anonymisation starts with purpose",
        html: [
          "<p>Write the AI task in one sentence before transforming the data. For example: summarise the reasons customers churned, classify support themes, or identify anomalies in monthly costs. The purpose determines which relationships and values must survive.</p>",
          "<p>Then remove whole fields, records, and attachments that are not necessary. Data minimisation is more reliable than trying to mask every item in an oversized source. It also produces a smaller, clearer prompt.</p>",
          "<p>Do not assume that company information is low risk because it is not personal data. Prices, forecasts, product plans, customer lists, contract terms, system architecture, and investigation findings can create serious commercial or contractual exposure.</p>"
        ]
      },
      {
        heading: "Identify direct and indirect identifiers",
        html: [
          "<p>Direct identifiers include names, email addresses, telephone numbers, customer numbers, legal entity names, account IDs, and public profile links. Indirect identifiers—sometimes called quasi-identifiers—include combinations such as location, exact date, role, amount, rare event, or project description.</p>",
          "<p>A single indirect field may be harmless. Several together can make a subject obvious. A row that says Head of Security, Sapporo office, joined 4 April, and handled a specific incident may identify one employee even after the name is removed.</p>",
          "<p>Review free-text fields separately. Meeting notes, ticket descriptions, contract clauses, filenames, worksheet names, comments, and code examples often repeat identities that a column-based transformation misses.</p>"
        ]
      },
      {
        heading: "Choose a transformation that preserves only what you need",
        html: [
          "<div class=\"guide-table-wrap\"><table class=\"guide-table\"><thead><tr><th>Technique</th><th>Useful when</th><th>Example</th></tr></thead><tbody><tr><td>Delete</td><td>The field is irrelevant</td><td>Remove signatures and unused attachment pages</td></tr><tr><td>Consistent placeholder</td><td>Relationships must remain</td><td>Acme Ltd → Company A throughout the dataset</td></tr><tr><td>Generalise</td><td>Exact detail is unnecessary</td><td>4 April 2026 → Q2 2026; city → region</td></tr><tr><td>Bucket or round</td><td>Ranges are sufficient</td><td>$983,412 → $1.0M or $750K–$1M</td></tr><tr><td>Synthetic substitute</td><td>Structure matters more than truth</td><td>Replace live account data with invented examples</td></tr></tbody></table></div>",
          "<p>Use consistent placeholders where analysis depends on repeated actors. Randomly replacing the same customer with a different label on every row destroys the relationship and can make the output misleading.</p>",
          "<p>If a lookup table can restore the original identities, protect that table separately and do not upload it with the transformed dataset. Treat the result as pseudonymised data with remaining risk rather than claiming it is anonymous.</p>"
        ]
      },
      {
        heading: "Test the transformed copy",
        html: [
          "<ol><li>Search for every original name, domain, ID prefix, project term, and distinctive phrase.</li><li>Review the smallest groups and rarest records; these are often easiest to re-identify.</li><li>Ask whether public knowledge or another internal dataset could reconnect the remaining details.</li><li>Inspect metadata, comments, filenames, hidden content, and attachments.</li><li>Check that totals, ordering, and relationships required for the AI task still make sense.</li><li>Have a reviewer unfamiliar with the transformation try to infer the subjects.</li></ol>",
          "<p>NIST describes de-identification as a risk-management process rather than a one-time masking operation. The acceptable residual risk depends on the data, likely recipients, context, and consequence of re-identification.</p>"
        ]
      },
      {
        heading: "ChatGPT and Claude still require destination review",
        html: [
          "<p>A prepared copy does not remove the need to check service terms and settings. Consumer and commercial versions of an AI service can handle content differently, and policies can change. Confirm the exact workspace, training controls, retention, administrator access, and any connectors before upload.</p>",
          "<p>When risk remains high, use an approved enterprise environment, an internally controlled model, a synthetic sample, or no upload. The tool selection follows the data decision—not the other way around.</p>"
        ]
      }
    ],
    sources: [
      { title: "SP 800-188: De-Identifying Government Datasets", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/188/final" },
      { title: "NISTIR 8053: De-Identification of Personal Information", publisher: "NIST", url: "https://csrc.nist.gov/pubs/ir/8053/final" },
      { title: "Data minimisation", publisher: "UK Information Commissioner's Office", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/" },
      { title: "How do we ensure anonymisation is effective?", publisher: "UK Information Commissioner's Office", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation/how-do-we-ensure-anonymisation-is-effective/" },
      { title: "Is my data used for model training?", publisher: "Anthropic Privacy Center", url: "https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training" }
    ]
  },
  {
    slug: "anonymize-excel-data-before-ai",
    shortTitle: "Anonymize Excel data",
    title: "How to Anonymize Excel Data Before AI Analysis",
    description: "A workbook-specific checklist for visible cells, hidden sheets, formulas, comments, external links, document properties, and a final clean-copy review.",
    category: "Excel & XLSX",
    readTime: "8 min read",
    summary: "The safest Excel workflow is often to copy only the necessary values into a new workbook, transform identifiers there, inspect hidden data and properties, and validate the result independently.",
    warning: "Hidden rows and sheets are not private. Removing them can also change formulas and totals, so always work on a copy and test the output.",
    sections: [
      {
        heading: "Prefer a purpose-built workbook",
        html: [
          "<p>Start by defining what the AI needs to calculate, classify, or explain. Then create a new workbook with only the required columns, rows, and values. This reduces the number of formulas, hidden objects, historical notes, and internal references that must be inspected.</p>",
          "<p>Copy values rather than formulas when the formulas themselves reveal internal file paths, server names, workbook links, pricing logic, or protected business rules—and when the AI task does not require those formulas. Keep the source workbook unchanged.</p>",
          "<p>Give the new file and worksheets neutral names. Filenames and tab names can disclose customers, projects, incidents, or reporting periods even when the visible cells are transformed.</p>"
        ]
      },
      {
        heading: "Transform identifiers as a set",
        html: [
          "<p>Replace direct identifiers such as names, email addresses, employee IDs, account numbers, IP addresses, and customer domains. If relationships matter, map each original value to one consistent placeholder.</p>",
          "<p>Then review combinations of role, office, date, amount, product, and unusual events. Generalise or bucket fields that are more precise than the analysis requires. For example, use month instead of day, region instead of branch, or a revenue band instead of an exact figure.</p>",
          "<p>Recalculate uniqueness after the transformation. A row that is the only example in a group may remain identifiable even when obvious identifiers are gone.</p>"
        ]
      },
      {
        heading: "Inspect more than visible cells",
        html: [
          "<div class=\"guide-table-wrap\"><table class=\"guide-table\"><thead><tr><th>Workbook area</th><th>What may remain</th><th>Review action</th></tr></thead><tbody><tr><td>Hidden rows, columns, sheets</td><td>Raw data, lookup tables, excluded records</td><td>Unhide, inspect, and remove only after checking dependencies</td></tr><tr><td>Comments and notes</td><td>Names, explanations, review conversations</td><td>Delete unnecessary content and re-inspect</td></tr><tr><td>Names and links</td><td>Named ranges, external workbook paths, data connections</td><td>Inspect Name Manager, links, queries, and connections</td></tr><tr><td>Objects and caches</td><td>Charts, embedded files, PivotTable source data, images</td><td>Confirm sources and remove unsupported extras</td></tr><tr><td>Document properties</td><td>Author, company, last saved by, custom properties</td><td>Use Document Inspector and manual property review</td></tr><tr><td>Code</td><td>Macros, credentials, internal endpoints</td><td>Remove unless explicitly required and approved</td></tr></tbody></table></div>",
          "<p>Microsoft states that Document Inspector can find several categories of hidden information, but it also documents limits. Some content cannot be removed automatically, and objects obscured by other objects or certain hidden locations may escape detection. Treat the tool as one inspection layer, not a guarantee.</p>"
        ]
      },
      {
        heading: "Check formulas, values, and exported formats",
        html: [
          "<p>Deleting a hidden sheet or external link can change calculations. Compare key totals and sample records against the source after each transformation. Open the clean copy on its own so that missing dependencies become visible.</p>",
          "<p>CSV can reduce workbook complexity, but it is not automatically anonymous. The visible values, column names, free text, and filename can still expose sensitive information. CSV also discards formulas, formatting, and multiple sheets, which may or may not be acceptable for the task.</p>",
          "<p>If the AI needs only a small table, a new CSV containing reviewed values can be a good minimisation step. If workbook structure matters, keep XLSX and inspect its additional structures.</p>"
        ]
      },
      {
        heading: "Final Excel preflight",
        html: [
          "<ul><li>Open the prepared file without the source workbook available.</li><li>Search all worksheets for original identifiers and sensitive terms.</li><li>Unhide every row, column, and sheet for the review.</li><li>Check comments, notes, names, links, queries, connections, objects, and macros.</li><li>Run Document Inspector and read each result instead of selecting Remove All blindly.</li><li>Recheck totals, date ranges, formulas, and row counts needed by the task.</li><li>Confirm the destination and have a person review the exact upload copy.</li></ul>"
        ]
      }
    ],
    sources: [
      { title: "Remove hidden data and personal information with Document Inspector", publisher: "Microsoft Support", url: "https://support.microsoft.com/en-us/office/collab-files/remove-hidden-data-and-personal-information-by-inspecting-documents-presentations-or-workbooks" },
      { title: "Privacy supplement for Microsoft Excel", publisher: "Microsoft Support", url: "https://support.microsoft.com/en-us/excel/privacy-supplement-for-excel" },
      { title: "Data minimisation", publisher: "UK Information Commissioner's Office", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/" },
      { title: "NISTIR 8053: De-Identification of Personal Information", publisher: "NIST", url: "https://csrc.nist.gov/pubs/ir/8053/final" }
    ]
  },
  {
    slug: "remove-hidden-data-metadata-before-ai",
    shortTitle: "Remove hidden data and metadata",
    title: "Remove Hidden Data and Metadata Before Sharing Documents with AI",
    description: "A format-by-format guide to document properties, comments, revisions, attachments, hidden layers, image metadata, and post-removal verification.",
    category: "Hidden data",
    readTime: "7 min read",
    summary: "Metadata and hidden content require format-specific inspection. Renaming a file or converting it to PDF is not proof that author names, comments, attachments, hidden objects, or location data are gone.",
    warning: "Visible redaction and hidden-data removal are different jobs. Complete both when the file format can carry both types of information.",
    sections: [
      {
        heading: "Why the visible page is not the whole file",
        html: [
          "<p>A modern document is a container. In addition to the words and images you see, it may include document properties, comments, prior revisions, hidden text, worksheet tabs, speaker notes, embedded files, alternate representations, or code.</p>",
          "<p>Metadata is data about the file: author, title, organisation, last editor, timestamps, camera model, geographic coordinates, or software used. Hidden content is broader and can include substantive material such as deleted-looking revisions, attachments, cropped image areas, or an entire hidden worksheet.</p>",
          "<p>Changing the filename does not rewrite these structures. Exporting to another format can remove some items, preserve others, and introduce new metadata. The result must be inspected rather than assumed.</p>"
        ]
      },
      {
        heading: "What to inspect by format",
        html: [
          "<div class=\"guide-table-wrap\"><table class=\"guide-table\"><thead><tr><th>Format</th><th>Examples to inspect</th><th>Official starting point</th></tr></thead><tbody><tr><td>Word</td><td>Comments, tracked changes, headers, footers, hidden text, properties, custom XML, embedded objects</td><td>Microsoft Document Inspector</td></tr><tr><td>Excel</td><td>Hidden rows, columns and sheets, comments, names, links, queries, caches, properties, macros</td><td>Document Inspector plus workbook review</td></tr><tr><td>PowerPoint</td><td>Speaker notes, off-slide objects, comments, properties, embedded media</td><td>Document Inspector plus slide review</td></tr><tr><td>PDF</td><td>Metadata, comments, attachments, hidden layers, cropped content, scripts</td><td>Adobe sanitisation tools</td></tr><tr><td>Images</td><td>EXIF/IPTC/XMP, GPS, device data, thumbnails, visible background details</td><td>Metadata viewer plus visual review</td></tr><tr><td>Text and data</td><td>Comments, headers, keys, internal paths, schema names, filenames</td><td>Content and secret scan</td></tr></tbody></table></div>"
        ]
      },
      {
        heading: "Use native inspection tools deliberately",
        html: [
          "<p>Microsoft recommends running Document Inspector on a copy because some removals cannot be undone. Read each category and its limitations. A hidden sheet may be part of a formula chain, and automatically removing it can damage the workbook.</p>",
          "<p>Adobe separates PDF redaction from sanitisation. Redaction removes selected visible material after it is applied. Sanitisation is designed to remove hidden information such as metadata, comments, attachments, hidden layers, and scripts. Depending on the document, you may need both.</p>",
          "<p>Images require both metadata inspection and visual review. Removing GPS coordinates does not remove an address visible on a sign, a customer name on a badge, or confidential information reflected in the background.</p>"
        ]
      },
      {
        heading: "Recheck after removal",
        html: [
          "<ol><li>Save to a new file and close the editing application.</li><li>Reopen the exact output, preferably in a fresh process.</li><li>Review document properties and hidden-content reports again.</li><li>Search for names, domains, IDs, project terms, and other known values.</li><li>Check comments, attachments, layers, notes, hidden tabs, and embedded objects.</li><li>Confirm the document still opens and preserves only the information needed for the AI task.</li></ol>",
          "<p>Automated inspection has limits. Microsoft documents examples of content Document Inspector might not detect, and image OCR can miss or misread text. Use the report to guide human review, not to replace it.</p>"
        ]
      },
      {
        heading: "A useful reporting vocabulary",
        html: [
          "<p>Prefer precise status labels. <em>No supported findings detected</em> describes a scan result. <em>Rechecked copy</em> describes a completed workflow. Neither should be translated into <em>safe</em>, <em>anonymous</em>, or <em>compliant</em> without an independent basis.</p>",
          "<p>A trustworthy tool should disclose its supported formats, items it can detect, items it can remove, items that require manual review, and tests used to validate output. Those boundaries help a reviewer decide what to do next.</p>"
        ]
      }
    ],
    sources: [
      { title: "Remove hidden data and personal information with Document Inspector", publisher: "Microsoft Support", url: "https://support.microsoft.com/en-us/office/collab-files/remove-hidden-data-and-personal-information-by-inspecting-documents-presentations-or-workbooks" },
      { title: "Privacy supplement for Microsoft Excel", publisher: "Microsoft Support", url: "https://support.microsoft.com/en-us/excel/privacy-supplement-for-excel" },
      { title: "Sanitize PDFs", publisher: "Adobe Help Center", url: "https://helpx.adobe.com/acrobat/desktop/protect-documents/redact-pdfs/sanitize.html" },
      { title: "Types of redactable PDF data", publisher: "Adobe Help Center", url: "https://helpx.adobe.com/acrobat/desktop/protect-documents/redact-pdfs/redactable-data.html" }
    ]
  },
  {
    slug: "offline-document-redaction-tool",
    shortTitle: "Offline document redaction",
    title: "Offline Document Redaction Before ChatGPT, Claude, or Gemini",
    description: "How to evaluate a local redaction workflow, understand where offline processing ends, and minimise the copy later uploaded to an AI service.",
    category: "Local workflow",
    readTime: "8 min read",
    summary: "Offline redaction keeps the source-file preparation stage on your device. Once the prepared copy is uploaded to ChatGPT, Claude, or Gemini, that copy leaves the device and is governed by the selected service, plan, settings, and contract.",
    warning: "Desktop does not automatically mean offline. A credible local tool should document or demonstrate whether file content, extracted text, OCR, findings, and derived data generate any network traffic.",
    sections: [
      {
        heading: "Draw the boundary clearly",
        html: [
          "<p>An offline redaction workflow can reduce the amount of information disclosed during preparation because the source file does not need to be sent to another scanning service. It can inspect and transform a local copy before any AI upload occurs.</p>",
          "<p>The word <em>offline</em> ends at the upload button. When you send the prepared copy to ChatGPT, Claude, or Gemini, the selected data leaves the device. The AI provider's current terms, workspace controls, retention, and any connected third party then apply.</p>",
          "<p>This distinction matters in product claims. A tool may accurately say that its preflight processing is local while it would be inaccurate to suggest that the subsequent cloud AI interaction remains local.</p>"
        ]
      },
      {
        heading: "How to evaluate a local redaction tool",
        html: [
          "<div class=\"guide-table-wrap\"><table class=\"guide-table\"><thead><tr><th>Question</th><th>Evidence to look for</th></tr></thead><tbody><tr><td>What stays local?</td><td>A specific statement covering file bytes, extracted text, OCR, detected secrets, and derived data</td></tr><tr><td>Does it require an account?</td><td>Whether sign-in or cloud activation is needed for file processing</td></tr><tr><td>Can the claim be tested?</td><td>A zero-network test, firewall test, reproducible documentation, or independent review</td></tr><tr><td>What formats are supported?</td><td>A matrix of detected, removable, unsupported, and manual-review items by format</td></tr><tr><td>What happens to the original?</td><td>Copy-first processing, clear output path, and failure behaviour</td></tr><tr><td>Is output verified?</td><td>Reopen, readability check, second scan, and a report of remaining findings</td></tr></tbody></table></div>",
          "<p>Do not infer offline behaviour from an installer, a desktop window, or the absence of a browser. Licensing, telemetry, OCR, threat scanning, or AI-assisted detection can all create network traffic. The documentation should separate content processing from optional update or licensing traffic.</p>"
        ]
      },
      {
        heading: "A six-step local-to-cloud workflow",
        html: [
          "<ol><li><strong>Duplicate.</strong> Preserve the original and prepare a working copy under the same access controls.</li><li><strong>Minimise.</strong> Remove pages, rows, fields, attachments, and precision not needed for the AI task.</li><li><strong>Inspect locally.</strong> Scan supported visible content, hidden structures, metadata, and credentials.</li><li><strong>Transform.</strong> Apply true redaction, consistent placeholders, or generalisation appropriate to the format.</li><li><strong>Reopen and review.</strong> Verify the exact clean copy and document unresolved findings.</li><li><strong>Approve the destination.</strong> Check the AI service, plan, settings, retention, administrator access, and organisation policy.</li></ol>",
          "<p>Where possible, test the prompt with synthetic data first. A synthetic example can reveal whether the task design works before any real company information is considered.</p>"
        ]
      },
      {
        heading: "ChatGPT, Claude, and Gemini are not one policy",
        html: [
          "<p>Each provider offers multiple consumer, business, enterprise, and API products. Do not write a policy for the brand as a whole. OpenAI's API documentation, for example, states that API data is not used for training by default but also describes abuse-monitoring retention and endpoint-specific application state. That does not establish the policy for a personal ChatGPT workspace.</p>",
          "<p>Anthropic documents separate rules for consumer Claude and commercial products, including training and retention. Google likewise distinguishes Gemini Apps from Gemini features in Workspace. Confirm the current documentation for the exact account and feature on the day of use.</p>",
          "<p>Questions to record include: Is content used for model improvement? How is it retained? Can an administrator access it? Does a connector send it to another service? Is deletion supported? Is the use covered by the organisation's contract and policy?</p>"
        ]
      },
      {
        heading: "When local preprocessing is not enough",
        html: [
          "<p>Some documents should not be uploaded even after redaction. Examples can include material whose context remains identifying, information covered by strict contractual restrictions, active credentials, highly sensitive legal or security records, or data whose transformation would destroy the task's meaning.</p>",
          "<p>Alternatives include using a synthetic dataset, asking a general question without the document, running an approved model in a controlled environment, or conducting the work manually. Preflight is a decision point, not an instruction to upload.</p>"
        ]
      }
    ],
    sources: [
      { title: "Your data: default usage policies by API endpoint", publisher: "OpenAI Developers", url: "https://developers.openai.com/api/docs/guides/your-data#default-usage-policies-by-endpoint" },
      { title: "How long do you store my organization's data?", publisher: "Anthropic Privacy Center", url: "https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data" },
      { title: "Is my organization's data used for model training?", publisher: "Anthropic Privacy Center", url: "https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training" },
      { title: "Gemini Apps Privacy Hub", publisher: "Google Help", url: "https://support.google.com/gemini/answer/13594961?hl=en" },
      { title: "Artificial intelligence for small business", publisher: "Australian Cyber Security Centre", url: "https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/artificial-intelligence-for-small-business" }
    ]
  },
  {
    slug: "redact-sanitize-pdf-before-chatgpt",
    shortTitle: "Redact and sanitize a PDF",
    title: "Redact and Sanitize a PDF Before Uploading It to ChatGPT",
    description: "A careful PDF workflow covering permanent visible redaction, hidden-content sanitisation, scanned pages, OCR review, metadata, attachments, and final verification.",
    category: "PDF",
    readTime: "8 min read",
    summary: "Real PDF redaction removes selected visible content when applied; sanitisation addresses hidden information. A high-confidence workflow usually needs both, followed by a reopen, search, copy, metadata, and visual check.",
    warning: "A black shape, highlight colour, crop, password, or flattened appearance is not proof that the underlying PDF content has been removed.",
    sections: [
      {
        heading: "Redaction and sanitisation solve different problems",
        html: [
          "<p>Visible redaction targets content on the page: text, images, or selected areas. In Adobe Acrobat, marking content identifies it for redaction, but the change becomes permanent only after the redaction is applied and the file is saved.</p>",
          "<p>Sanitisation targets hidden information. Adobe lists items such as metadata, embedded content and attached files, scripts, hidden layers, overlapping objects, and information stored from prior saves. A document can need visible redaction, hidden-content sanitisation, or both.</p>",
          "<p>Password protection is an access control, not redaction. Cropping changes the visible page area but can preserve cropped content. Converting or printing a PDF can change structure but should not be assumed to remove every hidden item.</p>"
        ]
      },
      {
        heading: "Step 1: create the smallest useful PDF",
        html: [
          "<p>Duplicate the original and identify which pages ChatGPT actually needs. Extract only those pages when permitted. Remove entire attachments or sections that are outside the task before marking individual redactions.</p>",
          "<p>Create an inventory of names, email addresses, signatures, account numbers, legal references, confidential clauses, credentials, and distinctive project details. Add indirect identifiers such as exact dates, locations, roles, and rare facts.</p>",
          "<p>If the PDF came from a word processor or spreadsheet, consider preparing the source document first. Redaction may be clearer in the source format, but the final PDF still needs its own inspection.</p>"
        ]
      },
      {
        heading: "Step 2: apply real visible redaction",
        html: [
          "<ol><li>Use a redaction function designed to remove content rather than a drawing or annotation tool.</li><li>Search for known terms and inspect every result manually.</li><li>Mark text, images, and regions that must be removed.</li><li>Apply the redactions and save to a new filename.</li><li>Close and reopen the saved output before verification.</li></ol>",
          "<p>Search is an aid, not complete coverage. Adobe notes that text inside images or line art may not be found as normal text. Variants, misspellings, split words, and OCR errors can also escape a search.</p>"
        ]
      },
      {
        heading: "Step 3: handle scanned PDFs and OCR",
        html: [
          "<p>A scanned PDF can contain page images rather than searchable text. OCR creates a text layer that can help locate terms, but recognition is imperfect. Review low-quality pages, handwriting, rotated text, tables, stamps, and uncommon names visually.</p>",
          "<p>After OCR-assisted redaction, inspect the page image and the searchable text layer. Search again for each identifier and try selecting or copying text around the redacted area.</p>",
          "<p>Do not assume that a page is safe because a search returns zero results. It may mean the text was never recognised.</p>"
        ]
      },
      {
        heading: "Step 4: sanitize hidden content",
        html: [
          "<p>Use the PDF application's hidden-content or sanitisation tools to inspect metadata, comments, attachments, hidden layers, embedded files, links, scripts, form data, and other supported objects. Read the results and retain anything that the document genuinely needs.</p>",
          "<p>Review document properties manually after sanitisation. Check the author, title, subject, keywords, application, and custom properties. Also check the filename itself.</p>",
          "<p>Some workflows require interactive forms, signatures, links, or accessibility structures. Removing them can change function or evidentiary value, so work on a copy and consult the responsible reviewer.</p>"
        ]
      },
      {
        heading: "Step 5: verify before upload",
        html: [
          "<ul><li>Reopen the exact output in a new process.</li><li>Search every sensitive term and common variant again.</li><li>Attempt to select and copy around redacted regions.</li><li>Review all pages at readable zoom, including margins and background images.</li><li>Inspect properties, comments, attachments, layers, forms, and scripts again.</li><li>Confirm the PDF opens normally and contains only pages needed for the task.</li><li>Check the ChatGPT workspace and organisational approval separately.</li></ul>"
        ]
      }
    ],
    sources: [
      { title: "Redaction and sanitization overview", publisher: "Adobe Help Center", url: "https://helpx.adobe.com/acrobat/desktop/protect-documents/redact-pdfs/redacting-sanitizing.html" },
      { title: "Sanitize PDFs", publisher: "Adobe Help Center", url: "https://helpx.adobe.com/acrobat/desktop/protect-documents/redact-pdfs/sanitize.html" },
      { title: "Types of redactable PDF data", publisher: "Adobe Help Center", url: "https://helpx.adobe.com/acrobat/desktop/protect-documents/redact-pdfs/redactable-data.html" },
      { title: "Recognize text in scanned documents", publisher: "Adobe Help Center", url: "https://helpx.adobe.com/acrobat/desktop/create-documents/scan-documents-to-pdfs/recognize-text.html" },
      { title: "Chat and file retention policies in ChatGPT", publisher: "OpenAI Help Center", url: "https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt" }
    ]
  },
  {
    slug: "document-privacy-scanner",
    shortTitle: "Document privacy scanner",
    title: "Document Privacy Scanner for AI Uploads: What a Useful Scan Should Show",
    description: "How to assess scanner coverage, evidence, false negatives, format support, remediation, rechecking, and the meaning of a no-findings result.",
    category: "Evaluation",
    readTime: "7 min read",
    summary: "A useful scanner reports findings within a documented scope, distinguishes detected from removable items, exposes unsupported areas, and supports a review workflow. A no-findings result is not proof of safety.",
    warning: "Scanner quality cannot be judged by the number of risk categories in a marketing page. Ask for format-specific coverage, synthetic test fixtures, known limitations, and output verification.",
    sections: [
      {
        heading: "A scanner is decision support",
        html: [
          "<p>A document privacy scanner can find supported patterns and file structures: an email address in text, a known API-key format, an Office author property, a hidden worksheet, or a PDF attachment. The result tells a reviewer where to look and what the tool can attempt to remove.</p>",
          "<p>It cannot prove the absence of confidential content. The same phrase can be sensitive in one organisation and harmless in another, while a combination of ordinary details can identify a customer without matching any individual pattern.</p>",
          "<p>Report language should preserve that distinction. <em>No supported findings detected</em> is accurate. <em>Safe to upload</em> overstates what a scan alone establishes.</p>"
        ]
      },
      {
        heading: "Coverage should be format-specific",
        html: [
          "<div class=\"guide-table-wrap\"><table class=\"guide-table\"><thead><tr><th>Status</th><th>Meaning</th><th>Example</th></tr></thead><tbody><tr><td>Detected and removable</td><td>The tool can locate the item and has a tested transformation</td><td>Supported author property in a DOCX copy</td></tr><tr><td>Detected, manual action</td><td>The tool can report the item but cannot safely transform it</td><td>A workbook dependency that needs owner review</td></tr><tr><td>Best-effort detection</td><td>Coverage varies with content quality or structure</td><td>OCR text in a low-quality scan</td></tr><tr><td>Unsupported</td><td>The item or format is outside tested scope</td><td>A proprietary embedded object</td></tr><tr><td>Manual review</td><td>Automation cannot determine business sensitivity</td><td>A unique project fact or contractual restriction</td></tr></tbody></table></div>",
          "<p>A single label for PDF, DOCX, XLSX, PPTX, image, text, and configuration files hides important differences. Each format has distinct structures, parsing failure modes, and removal methods.</p>"
        ]
      },
      {
        heading: "Ask how the scanner was tested",
        html: [
          "<p>Good evidence includes synthetic files containing one known risk at a time, mixed-risk files, corrupted inputs, unusual encodings, and before-and-after verification. Tests should cover both positive detection and false-positive handling.</p>",
          "<p>A zero-network test is relevant for a local-processing claim. A reopen test is relevant for file integrity. A second scan of the output is relevant for removal. None replaces a human review, but each supports a specific claim.</p>",
          "<p>GitHub's secret-scanning documentation illustrates why scope matters: detection depends on supported patterns, object type, size, and other limits. Document scanners face analogous boundaries across text, OCR, embedded objects, and metadata.</p>"
        ]
      },
      {
        heading: "Look for explainable findings",
        html: [
          "<p>A finding should identify the category, location, evidence safely enough for review, confidence or rule basis, available action, and any effect of that action. The report should avoid writing a live secret into logs or telemetry.</p>",
          "<p>Reviewers also need a way to distinguish a true finding from a false positive and to add organisation-specific terms or patterns. A generic scanner cannot know every internal customer code, project nickname, or proprietary identifier.</p>",
          "<p>Removal should be reversible only through the preserved original, not through hidden content in the output. The output needs a clear path, a non-overwrite policy, and failure behaviour that does not silently publish a partial result.</p>"
        ]
      },
      {
        heading: "A scanner acceptance checklist",
        html: [
          "<ul><li>Supported formats and maximum sizes are explicit.</li><li>Detection, removal, unsupported, and manual-review items are separated.</li><li>Known blind spots are published in plain language.</li><li>The original is preserved and failures are fail-closed.</li><li>Local-processing claims have testable boundaries.</li><li>Outputs are reopened and scanned again.</li><li>Reports do not expose the sensitive values they describe.</li><li>No-findings language is qualified.</li><li>Users can complete a final human review.</li></ul>"
        ]
      }
    ],
    sources: [
      { title: "Remove hidden data and personal information with Document Inspector", publisher: "Microsoft Support", url: "https://support.microsoft.com/en-US/Office/collab-files/remove-hidden-data-and-personal-information-by-inspecting-documents-presentations-or-workbooks" },
      { title: "Secret scanning scope", publisher: "GitHub Docs", url: "https://docs.github.com/en/code-security/reference/secret-security/secret-scanning-scope" },
      { title: "SP 800-188: De-Identifying Government Datasets", publisher: "NIST", url: "https://www.nist.gov/publications/de-identifying-government-datasets-techniques-and-governance" },
      { title: "Sanitize PDFs", publisher: "Adobe Help Center", url: "https://helpx.adobe.com/acrobat/desktop/protect-documents/redact-pdfs/sanitize.html" }
    ]
  },
  {
    slug: "best-offline-document-redaction-tools",
    shortTitle: "Offline redaction tools",
    title: "Best Offline Document Redaction Tools for AI: An Honest Comparison",
    description: "A use-case comparison of FilePreflight, Adobe Acrobat Pro, Microsoft Document Inspector, and ExifTool without treating desktop software as automatically offline.",
    category: "Comparison",
    readTime: "9 min read",
    summary: "There is no single best tool for every format. Acrobat is purpose-built for PDF redaction, Document Inspector addresses hidden Office data, ExifTool specialises in metadata, and FilePreflight is a planned cross-format AI preflight workflow.",
    warning: "FilePreflight is developed by AI Labs LLC, the publisher of this comparison, and is not yet released. Its entry below describes the planned product and should not be treated as an independent endorsement.",
    sections: [
      {
        heading: "How this comparison is scoped",
        html: [
          "<p>This comparison asks which tool is appropriate for a particular pre-upload job. It does not award a universal ranking. A PDF redaction editor, an Office inspection feature, a metadata utility, and a cross-format preflight product have different purposes.</p>",
          "<p>We compare documented focus, format scope, visible-content handling, hidden-data handling, workflow, and limitations. We do not compare current prices because they change and because FilePreflight's checkout is not yet available.</p>",
          "<p>We also avoid using <em>desktop</em> and <em>offline</em> as synonyms. A desktop application can still use network services for licensing, updates, telemetry, OCR, or analysis. Confirm the current product documentation and test the boundary required by your environment.</p>"
        ]
      },
      {
        heading: "Use-case comparison",
        html: [
          "<div class=\"guide-table-wrap\"><table class=\"guide-table\"><thead><tr><th>Tool</th><th>Best fit</th><th>What it is not</th><th>Status / caveat</th></tr></thead><tbody><tr><td>Adobe Acrobat Pro</td><td>Applying visible PDF redaction and sanitising supported hidden PDF content</td><td>A general Office, source-code, or cross-format privacy scanner</td><td>Use Adobe's documented redact and sanitise workflows; verify current connectivity requirements</td></tr><tr><td>Microsoft Document Inspector</td><td>Checking supported hidden data and personal information in Word, Excel, and PowerPoint</td><td>A broad PII or secret scanner, or a guarantee that all hidden objects are found</td><td>Built into supported Office workflows; Microsoft documents detection limits</td></tr><tr><td>ExifTool</td><td>Reading and editing metadata across many file types</td><td>A visible-text redaction or contextual confidentiality tool</td><td>Powerful command-line utility; users must understand tags and preserve a source copy</td></tr><tr><td>FilePreflight</td><td>Planned cross-format preflight before AI: inspect, transform supported findings, write a copy, reopen, and recheck</td><td>A guarantee of anonymity, compliance, or complete detection</td><td>In development for Windows; supported-format claims require release testing and documentation</td></tr></tbody></table></div>"
        ]
      },
      {
        heading: "Best for PDFs: Adobe Acrobat Pro",
        html: [
          "<p>Acrobat provides a documented workflow for marking and applying redactions to text or images, then finding and removing hidden information. Adobe also documents the kinds of PDF data that can be considered in redaction and sanitisation.</p>",
          "<p>Its main advantage is depth within PDF. It can address page-level content and PDF-specific structures in one application. Its limitation in this comparison is scope: it is not a replacement for inspecting an XLSX workbook, a DOCX change history, a configuration file, or a code snippet.</p>",
          "<p>Use a separate output file, apply rather than merely mark redactions, sanitise hidden content, and verify the saved PDF by reopening, searching, copying, and reviewing properties and attachments.</p>"
        ]
      },
      {
        heading: "Best for hidden Office data: Microsoft Document Inspector",
        html: [
          "<p>Document Inspector is the natural first step for supported hidden information in Word, Excel, and PowerPoint. It can report categories such as comments, revisions, document properties, hidden content, and format-specific structures.</p>",
          "<p>Microsoft warns that some items cannot be detected or removed automatically. Removing hidden sheets or other objects can also affect document behaviour. Run it on a copy, understand each category, and combine it with a manual review of visible content and business context.</p>"
        ]
      },
      {
        heading: "Best for metadata specialists: ExifTool",
        html: [
          "<p>ExifTool reads and writes metadata across a broad set of formats. It is useful when the job is to inventory tags, remove selected metadata, or verify what remains. Its official documentation is detailed and designed for users comfortable with a command line.</p>",
          "<p>Metadata is only one layer. ExifTool is not intended to redact a person's name from PDF body text, analyse the meaning of a contract, or decide whether a spreadsheet row can identify a customer. Pair it with format-specific content tools and human review.</p>"
        ]
      },
      {
        heading: "Where FilePreflight is intended to fit",
        html: [
          "<p>FilePreflight is being designed around an AI-upload preflight sequence across supported document, Office, image, text, data, and configuration formats: inspect, transform selected findings, preserve the original, reopen the output, and scan it again.</p>",
          "<p>The product is not released, so buyers cannot yet verify those plans in production. Before release, credible evidence should include a format-and-limitations matrix, synthetic before-and-after fixtures, zero-network file-processing tests, fail-closed behaviour, and clear best-effort language.</p>",
          "<p>Even after release, a cross-format workflow will not replace Acrobat's specialist PDF tools, Office's native inspection, ExifTool's metadata depth, or organisational approval. The right answer may be a combination.</p>"
        ]
      },
      {
        heading: "Choose by the file and the consequence",
        html: [
          "<ul><li>For a PDF requiring permanent visible redaction, start with a purpose-built PDF redaction workflow.</li><li>For an Office document with revision and hidden-object risk, use native Office inspection and a content review.</li><li>For metadata inventory across many formats, use a specialist metadata tool.</li><li>For a repeatable pre-upload workflow across supported formats, evaluate a cross-format preflight tool against documented tests.</li><li>For high-consequence data, add a second reviewer and an approved destination—or do not upload.</li></ul>"
        ]
      }
    ],
    sources: [
      { title: "Redaction and sanitization overview", publisher: "Adobe Help Center", url: "https://helpx.adobe.com/acrobat/desktop/protect-documents/redact-pdfs/redacting-sanitizing.html" },
      { title: "Remove hidden data and personal information with Document Inspector", publisher: "Microsoft Support", url: "https://support.microsoft.com/en-US/Office/collab-files/remove-hidden-data-and-personal-information-by-inspecting-documents-presentations-or-workbooks" },
      { title: "ExifTool application documentation", publisher: "ExifTool", url: "https://exiftool.org/exiftool_pod2.html" },
      { title: "SP 800-188: De-Identifying Government Datasets", publisher: "NIST", url: "https://www.nist.gov/publications/de-identifying-government-datasets-techniques-and-governance" }
    ]
  },
  {
    slug: "legal-document-redaction-before-ai",
    shortTitle: "Legal document redaction",
    title: "Legal Document Redaction Before Using AI",
    description: "A cautious workflow for legal documents covering confidentiality, privilege, client and organisational approval, metadata, case-specific identifiers, and human review.",
    category: "Legal workflow",
    readTime: "9 min read",
    summary: "Legal-document preflight begins with professional duties and the exact AI service, not with a redaction button. Minimise the material, assess case-specific re-identification risk, remove supported hidden data, and obtain the review or consent required in the relevant jurisdiction.",
    warning: "This guide is general information, not legal advice. Redaction alone does not guarantee confidentiality, privilege, ethics compliance, court-rule compliance, or effective anonymisation.",
    sections: [
      {
        heading: "Begin with the professional decision",
        html: [
          "<p>Before preparing a legal document for AI, identify the governing jurisdiction, professional rules, engagement terms, protective orders, client instructions, confidentiality agreements, and organisational policy. The same technical workflow can be permitted in one matter and prohibited in another.</p>",
          "<p>ABA Formal Opinion 512 discusses lawyers' duties when using generative AI, including competence, confidentiality, communication, supervision, candour, and fees. Its confidentiality analysis calls for evaluating the information, the tool, its terms and policies, security measures, retention, and the circumstances of the representation.</p>",
          "<p>The opinion does not create a universal rule that client consent is always or never required. The answer depends on the risk and use. Obtain advice from the responsible lawyer or compliance function for the actual matter.</p>"
        ]
      },
      {
        heading: "Redaction is broader than court-filing identifiers",
        html: [
          "<p>Court privacy rules often list identifiers such as Social Security numbers, birth dates, minors' names, and financial account numbers. Those filing rules do not define every fact that must be removed before an AI upload.</p>",
          "<p>A legal file can reveal a client or matter through party roles, chronology, location, transaction value, unusual legal issue, witness description, citation pattern, internal matter number, or quoted correspondence. Names can disappear while the matter remains obvious.</p>",
          "<p>Build a matter-specific inventory that covers direct identifiers, quasi-identifiers, privileged analysis, work product, settlement positions, personal data, trade secrets, sealed content, and material received under restriction.</p>"
        ]
      },
      {
        heading: "Prepare the smallest useful extract",
        html: [
          "<p>Do not begin with the complete case file. Extract only the paragraph, clause, chronology, or synthetic fact pattern needed for the task. Replace live facts with a hypothetical when the AI can answer the legal or drafting question without them.</p>",
          "<p>Use consistent party labels only when relationships matter. Generalise dates, locations, roles, and amounts together. Consider whether the combination can still be linked to public filings, news, internal records, or the recipient's knowledge.</p>",
          "<p>Keep any re-identification key separate under appropriate access controls. If a mapping exists, describe the result as pseudonymised rather than fully anonymous.</p>"
        ]
      },
      {
        heading: "Inspect visible and hidden legal content",
        html: [
          "<div class=\"guide-table-wrap\"><table class=\"guide-table\"><thead><tr><th>Layer</th><th>Examples</th></tr></thead><tbody><tr><td>Body</td><td>Party names, facts, quoted communications, advice, signatures, account details</td></tr><tr><td>Review history</td><td>Tracked changes, comments, author initials, rejected wording, negotiation positions</td></tr><tr><td>Properties</td><td>Author, firm, client, matter title, last editor, template, timestamps</td></tr><tr><td>Attachments and objects</td><td>Exhibits, embedded emails, spreadsheets, images, hidden layers, speaker notes</td></tr><tr><td>Filename and path</td><td>Client name, matter number, court, strategy label</td></tr></tbody></table></div>",
          "<p>Use true redaction for visible material and format-specific sanitisation for hidden data. Work on a copy, apply the redaction, close and reopen the output, search again, inspect properties and attachments, and conduct a page-by-page review.</p>"
        ]
      },
      {
        heading: "Preserve privilege and confidentiality through governance",
        html: [
          "<p>A clean-looking document does not answer whether disclosure to the selected AI provider is authorised or whether privilege could be affected. Review the service terms, training policy, retention, administrator access, subpoena or legal-process terms, location, connectors, and contractual protections.</p>",
          "<p>Record the purpose, data classification, transformation, tool and workspace, settings, approver, date, and exact uploaded copy when organisational policy calls for it. Avoid placing confidential values in the audit log itself.</p>",
          "<p>For a high-risk matter, the correct choice may be an approved enterprise environment, an internally controlled model, a synthetic hypothetical, or no AI use. Automation supports the review; it does not make the professional judgment.</p>"
        ]
      },
      {
        heading: "Final legal-document checklist",
        html: [
          "<ul><li>The responsible lawyer or organisation has approved the use.</li><li>The exact service, workspace, feature, retention, and contract have been reviewed.</li><li>Only the minimum material needed for the task remains.</li><li>Direct and indirect matter identifiers have been assessed together.</li><li>Comments, revisions, properties, attachments, and filenames have been inspected.</li><li>The output was reopened, searched, visually reviewed, and approved by a person.</li><li>The decision and uploaded copy are recorded where required.</li></ul>"
        ]
      }
    ],
    sources: [
      { title: "Formal Opinion 512: Generative Artificial Intelligence Tools", publisher: "American Bar Association", url: "https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf" },
      { title: "Practical Guidance for the Use of Generative AI in the Practice of Law", publisher: "State Bar of California", url: "https://www.calbar.ca.gov/sites/default/files/portals/0/documents/ethics/Generative-AI-Practical-Guidance.pdf" },
      { title: "Privacy policies and Federal Rule of Civil Procedure 5.2", publisher: "U.S. Court of Appeals for the Fourth Circuit", url: "https://www.ca4.uscourts.gov/rules-and-procedures/privacy-policies" },
      { title: "SP 800-188: De-Identifying Government Datasets", publisher: "NIST", url: "https://www.nist.gov/publications/de-identifying-government-datasets-techniques-and-governance" },
      { title: "How do we ensure anonymisation is effective?", publisher: "UK Information Commissioner's Office", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation/how-do-we-ensure-anonymisation-is-effective/" }
    ]
  },
  {
    slug: "remove-api-keys-before-ai-coding-tools",
    shortTitle: "Remove API keys and secrets",
    title: "Remove API Keys, Credentials, and Secrets Before Using AI Coding Tools",
    description: "A response-first workflow for finding credentials in code, configuration, logs, notebooks, and history—and rotating anything already exposed.",
    category: "Code & secrets",
    readTime: "8 min read",
    summary: "Before sharing code with AI, minimise the files, scan supported and custom patterns, replace secrets with inert placeholders, and review the result. If a live secret was already exposed, revoke or rotate it first; deleting the string is not enough.",
    warning: "Treat an exposed live credential as compromised. Revoke or rotate it, review usage logs and related access, then remove it from current files and history as required.",
    sections: [
      {
        heading: "Secrets appear outside source files",
        html: [
          "<p>API keys, access tokens, private keys, passwords, connection strings, webhook secrets, session values, certificates, and signed URLs can appear in more places than the code being discussed.</p>",
          "<p>Review <code>.env</code> files, configuration, deployment manifests, CI logs, shell history, notebooks, test fixtures, screenshots, stack traces, copied terminal output, generated artefacts, build folders, documentation, and sample requests. A small code excerpt can include a live value in a comment or error message.</p>",
          "<p>Also check filenames, repository URLs, internal hostnames, tenant IDs, customer data, and security findings. These may not be credentials but can still be inappropriate for the selected AI tool.</p>"
        ]
      },
      {
        heading: "If exposure already happened, contain it first",
        html: [
          "<ol><li><strong>Revoke or rotate the credential.</strong> Use the provider's controls; do not wait for repository cleanup.</li><li><strong>Review use.</strong> Check audit, access, billing, and security logs for unexpected activity.</li><li><strong>Limit related access.</strong> Review permissions, sessions, derived tokens, and dependent systems.</li><li><strong>Notify the right people.</strong> Follow the organisation's incident and legal procedures.</li><li><strong>Then remove the value.</strong> Clean the current file, repository history, artefacts, caches, and other copies as appropriate.</li></ol>",
          "<p>GitHub's guidance stresses that removing a secret from the latest commit does not remove it from history, clones, forks, cached views, or pull-request references. Rotation changes what an attacker can do; text removal alone does not.</p>"
        ]
      },
      {
        heading: "Create the minimum code bundle",
        html: [
          "<p>Share only the files and lines required to explain the problem. Exclude environment files, lock down logs, and replace live configuration with a small synthetic example. Avoid uploading an entire repository when one function and an invented input reproduce the issue.</p>",
          "<p>Use explicit inert placeholders that preserve syntax, such as <code>OPENAI_API_KEY=REDACTED_TEST_VALUE</code> or <code>postgresql://USER:PASSWORD@HOST/DB</code>. Do not use a truncated live key or a reversible encoding as a sample.</p>",
          "<p>OpenAI's API-key safety guidance recommends keeping keys out of client-side environments and source repositories, using environment variables, and monitoring usage. The same principles apply before code is copied into an AI conversation.</p>"
        ]
      },
      {
        heading: "Scan supported and organisation-specific patterns",
        html: [
          "<p>Secret scanners recognise known provider formats and sometimes validate whether a credential is active. Coverage is not complete. Internal tokens, database passwords, proprietary headers, short secrets, and values split across files may not match a public pattern.</p>",
          "<p>Add custom patterns for organisation-specific prefixes and configuration conventions. Search for variable names such as <code>password</code>, <code>secret</code>, <code>token</code>, <code>private_key</code>, and <code>connection_string</code>, then review the assigned values and surrounding context.</p>",
          "<p>Do not copy detected live secrets into a report or prompt. A finding can be shown by category, file, line, and a safely truncated fingerprint that is not usable as authentication.</p>"
        ]
      },
      {
        heading: "Check history and generated output",
        html: [
          "<div class=\"guide-table-wrap\"><table class=\"guide-table\"><thead><tr><th>Location</th><th>Question</th></tr></thead><tbody><tr><td>Working tree</td><td>Are secrets present in tracked, untracked, ignored, or hidden files?</td></tr><tr><td>Git history</td><td>Did an earlier commit contain the value even if the current file does not?</td></tr><tr><td>Pull requests and forks</td><td>Do diffs, reviews, patches, or copies still expose it?</td></tr><tr><td>Logs and notebooks</td><td>Was the value printed in output cells, traces, or command history?</td></tr><tr><td>Build and deployment artefacts</td><td>Was configuration bundled into an archive, image, source map, or generated file?</td></tr><tr><td>Prompt attachments</td><td>Does the final upload bundle contain excluded or duplicate files?</td></tr></tbody></table></div>"
        ]
      },
      {
        heading: "Final pre-upload checklist",
        html: [
          "<ul><li>Only the minimum reproducing code and synthetic input are included.</li><li>Environment, configuration, logs, notebooks, images, and generated artefacts were reviewed.</li><li>Known provider patterns and organisation-specific patterns were scanned.</li><li>Live values were replaced with inert, non-reversible placeholders.</li><li>The exact bundle was re-scanned after transformation.</li><li>The AI coding service, account, workspace, retention, and policy are approved.</li><li>Any previously exposed secret was revoked or rotated and investigated.</li></ul>"
        ]
      }
    ],
    sources: [
      { title: "Secret scanning scope", publisher: "GitHub Docs", url: "https://docs.github.com/en/code-security/reference/secret-security/secret-scanning-scope" },
      { title: "Supported secret scanning patterns", publisher: "GitHub Docs", url: "https://docs.github.com/en/code-security/reference/secret-security/supported-secret-scanning-patterns" },
      { title: "Resolving alerts from secret scanning", publisher: "GitHub Docs", url: "https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-secret-scanning-alerts/resolving-alerts" },
      { title: "Removing sensitive data from a repository", publisher: "GitHub Docs", url: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository" },
      { title: "Best practices for API key safety", publisher: "OpenAI Help Center", url: "https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety" }
    ]
  }
];
