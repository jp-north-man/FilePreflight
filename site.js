(function () {
  "use strict";

  const english = {
    skipLink: "Skip to content",
    navHow: "How it works",
    navFormats: "Formats",
    navPricing: "Pricing",
    navPrivacy: "Privacy",
    heroEyebrow: "For Windows · File processing stays fully local",
    heroTitleOne: "Before you share with AI,",
    heroTitleTwo: "remove the sensitive parts.",
    heroLede: "FilePreflight inspects and removes supported sensitive information, reopens the output, and scans it again before publishing a safe copy. Your file content never leaves your device.",
    heroPrimary: "See how it works",
    heroSecondary: "View the official GitHub",
    trustLocal: "Fully local processing",
    trustOriginal: "Never overwrites the original",
    trustAccount: "No account required",
    previewFile: "customer-review.pdf",
    previewAction: "Right click → FilePreflight",
    previewCommand: "Create a safe copy",
    previewInspect: "Inspect",
    previewInspectSub: "Find supported sensitive information",
    previewRemove: "Remove",
    previewRemoveSub: "Transform according to policy",
    previewVerify: "Verify again",
    previewVerifySub: "Reopen and validate the output",
    previewSafe: "Verified",
    previewOutput: "customer-review-SAFE.pdf",
    howEyebrow: "Simple action, rigorous processing",
    howTitle: "From right click to a safe copy.",
    howLede: "The original remains untouched. Only a copy that completes every verification step is published.",
    stepOneTitle: "Inspect",
    stepOneBody: "Identify the real format from content, then look for supported personal data, credentials, document metadata, and other selected risks.",
    stepTwoTitle: "Remove and transform",
    stepTwoBody: "Handle each selected finding with a method appropriate to the file format. The original bytes and metadata remain unchanged.",
    stepThreeTitle: "Reopen and verify",
    stepThreeBody: "Reopen the output in a fresh worker, confirm it is readable, and scan again before saving the safe copy.",
    localEyebrow: "Privacy by architecture",
    localTitle: "Your files never leave your PC.",
    localBody: "File content, extracted content, OCR text, detected secrets, and derived data are never sent to the cloud.",
    flowInput: "Original file",
    flowDevice: "Processed on this device",
    flowOutput: "Safe copy",
    formatsEyebrow: "Initial Windows release",
    formatsTitle: "17 everyday file extensions.",
    formatsLede: "Free and Pro support the same launch formats with the same per-file processing quality.",
    formatDocs: "Documents & Office",
    formatImages: "Images",
    formatText: "Text",
    formatData: "Data & config",
    pricingEyebrow: "Simple perpetual pricing",
    pricingTitle: "Choose by workload, not quality.",
    pricingLede: "Free has no ads, watermarks, or quality reduction. Pro expands capacity, batching, and control.",
    freeNote: "Free forever",
    freeFeatureOne: "One file per operation",
    freeFeatureTwo: "Up to 10 MB (10,000,000 bytes)",
    freeFeatureThree: "All 17 launch extensions",
    freeFeatureFour: "Explorer right-click safe copy",
    freeFeatureFive: "Commercial use · Unlimited devices",
    freeStatus: "Preparing for the Microsoft Store",
    proBadge: "Perpetual",
    proNote: "No subscription",
    once: "once",
    proFeatureOne: "Single, folder, and batch processing",
    proFeatureTwo: "Up to 20 GB (format and resource limits apply)",
    proFeatureThree: "Select an output destination",
    proFeatureFour: "Custom policies",
    proFeatureFive: "1 user · 3 devices",
    proStatus: "Checkout coming soon",
    qualityNote: "Neither plan requires an account. Inspection quality, conversion quality, per-file speed, post-verification, and original-file protection are identical.",
    trustEyebrow: "Transparency",
    trustTitle: "What to know before you share.",
    privacyTitle: "Privacy",
    privacyBodyOne: "All app file processing happens on the device. File content, extracted content, OCR text, and detected findings are not transmitted externally.",
    privacyBodyTwo: "Pro purchase and activation process only the information required for payment and licensing. They do not include file-derived data or a hardware fingerprint. This site uses no analytics or advertising cookies.",
    termsTitle: "Terms",
    termsBodyOne: "Free is permanently free and permits commercial use. Pro is a one-time USD 29 license for one user on up to three devices.",
    termsBodyTwo: "Detection results depend on file structure, the selected policy, and supported rules. Unsupported formats and outputs that fail verification are never labeled safe.",
    refundTitle: "Refunds and support",
    refundBody: "Refunds and payment issues are handled under the payment provider's process and applicable law. This does not limit a purchaser's statutory rights. Product support is available through the contact link below.",
    finalEyebrow: "FilePreflight for Windows",
    finalTitle: "One last check before you share with AI.",
    finalBody: "We are preparing the initial Windows release and checkout.",
    contactButton: "Contact and support",
    footerPrivacy: "Privacy",
    footerTerms: "Terms",
    footerRefunds: "Refunds"
  };

  const japanese = {};
  const translatable = Array.from(document.querySelectorAll("[data-i18n]"));

  translatable.forEach(function (element) {
    japanese[element.dataset.i18n] = element.textContent.trim();
  });

  const metadata = {
    ja: {
      title: "FilePreflight — AIへ渡す前の、安全なコピー",
      description: "FilePreflightは、AIへ共有する前のファイルから対応する重要情報を除去し、再検査済みの安全なコピーを完全ローカルで作成するWindowsアプリです。"
    },
    en: {
      title: "FilePreflight — A safer copy before you share with AI",
      description: "FilePreflight removes supported sensitive information and creates a reopened, rescanned safe copy locally on your Windows PC."
    }
  };

  function setLanguage(language, persist) {
    const dictionary = language === "en" ? english : japanese;

    translatable.forEach(function (element) {
      const value = dictionary[element.dataset.i18n];
      if (typeof value === "string") {
        element.textContent = value;
      }
    });

    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
    document.title = metadata[language].title;
    document.querySelector('meta[name="description"]').setAttribute("content", metadata[language].description);

    document.querySelectorAll("[data-language-option]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.languageOption === language));
    });

    if (persist) {
      try {
        window.localStorage.setItem("filepreflight-language", language);
      } catch (_error) {
        // The preference is optional; privacy-restricted browsers may reject storage.
      }
    }
  }

  document.querySelectorAll("[data-language-option]").forEach(function (button) {
    button.addEventListener("click", function () {
      setLanguage(button.dataset.languageOption, true);
    });
  });

  let preferred = "";
  try {
    preferred = window.localStorage.getItem("filepreflight-language") || "";
  } catch (_error) {
    preferred = "";
  }

  if (preferred !== "ja" && preferred !== "en") {
    preferred = navigator.language && navigator.language.toLowerCase().startsWith("ja") ? "ja" : "en";
  }
  setLanguage(preferred, false);
})();
