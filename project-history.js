// Curated from public GitHub commit records and existing case-study facts, 2026-11-20.
// Walkthrough stages are explicitly not presented as separate historical releases.
export const projectHistory = {
  "canvas-copy-pasta": {
    "mode": "Selected public commits",
    "pipeline": [
      "Question content",
      "Answers + images",
      "Isolated toolbar",
      "Clipboard"
    ],
    "stages": [
      {
        "title": "Extension release",
        "text": "Released Canvas Copy Assistant v5.0.0, with the extension source, manifest, popup and project documentation.",
        "date": "2026-09-08",
        "sha": "180d5d0",
        "source": "https://github.com/bonkval/CanvasCopyPasta/commit/180d5d0d2ca5bc8031caca5ee351a6702567a764",
        "kind": "Public commit",
        "flowStep": 2
      },
      {
        "title": "Image copying",
        "text": "Added question-image copying. The change includes extension content logic and a service worker.",
        "date": "2026-09-08",
        "sha": "2f99c25",
        "source": "https://github.com/bonkval/CanvasCopyPasta/commit/2f99c2567ae4130df77a8ceda3a4bd974883b872",
        "kind": "Public commit",
        "flowStep": 1
      },
      {
        "title": "Multiple answers",
        "text": "Added multiple-answer support in v5.4.0 and updated the core tests.",
        "date": "2026-09-10",
        "sha": "98b6a03",
        "source": "https://github.com/bonkval/CanvasCopyPasta/commit/98b6a03cba429b2f3b145dc3eec0081e7bbfc51d",
        "kind": "Public commit",
        "flowStep": 1
      },
      {
        "title": "Review indicators",
        "text": "Clarified failed-review indicators in v5.4.5, with changes to content extraction and core tests.",
        "date": "2026-09-16",
        "sha": "d251d46",
        "source": "https://github.com/bonkval/CanvasCopyPasta/commit/d251d46eb52350c73e532c0897bf4b5f7f351769",
        "kind": "Public commit",
        "flowStep": 0
      }
    ],
    "repo": "https://github.com/bonkval/CanvasCopyPasta"
  },
  "codex-pulse": {
    "mode": "Selected public commits",
    "pipeline": [
      "Usage windows",
      "Local sessions",
      "Dashboard",
      "Reset alerts"
    ],
    "stages": [
      {
        "title": "Initial release",
        "text": "Published the initial AI Tray release with Electron main, preload and renderer code.",
        "date": "2026-09-11",
        "sha": "e476fcf",
        "source": "https://github.com/bonkval/Codex-Pulse/commit/e476fcf9bbc9a34ef5e6d98a8a7d2b79eb1844c0",
        "kind": "Public commit",
        "flowStep": 2
      },
      {
        "title": "Activity bridge",
        "text": "Added a live VS Code Codex activity bridge and a dedicated activity-bridge test.",
        "date": "2026-09-11",
        "sha": "7435fbd",
        "source": "https://github.com/bonkval/Codex-Pulse/commit/7435fbd8059f5375ea886a9d674394b551daab22",
        "kind": "Public commit",
        "flowStep": 1
      },
      {
        "title": "Drag refinement",
        "text": "Smoothed minimized-logo dragging through changes to the main process, preload bridge and renderer.",
        "date": "2026-09-12",
        "sha": "f56ea13",
        "source": "https://github.com/bonkval/Codex-Pulse/commit/f56ea13663af787ad571a4e60925af308574a78c",
        "kind": "Public commit",
        "flowStep": 2
      },
      {
        "title": "Dashboard release",
        "text": "Released v1.5.9 with dashboard and taskbar improvements, analytics changes and runtime regression tests.",
        "date": "2026-10-28",
        "sha": "9fea3ac",
        "source": "https://github.com/bonkval/Codex-Pulse/commit/9fea3ac0a7947165e2c55f35f0fa30a619a0c879",
        "kind": "Public commit",
        "flowStep": 2
      }
    ],
    "repo": "https://github.com/bonkval/Codex-Pulse"
  },
  "huli-na-honeypot": {
    "mode": "Selected public commits",
    "pipeline": [
      "SSH / HTTP",
      "Risk scoring",
      "Local storage",
      "Incident report"
    ],
    "stages": [
      {
        "title": "Repository setup",
        "text": "Established the public repository guardrails with a license and ignored local artifacts.",
        "date": "2026-08-11",
        "sha": "d7a1f67",
        "source": "https://github.com/bonkval/huli-na-honeypot/commit/d7a1f671980b484f9248db1678dca88b6cb1fe60",
        "kind": "Public commit",
        "flowStep": null
      },
      {
        "title": "Decoy engine",
        "text": "Added the asynchronous SSH and HTTP decoy engine, storage, analysis and report-export modules.",
        "date": "2026-08-11",
        "sha": "5005e15",
        "source": "https://github.com/bonkval/huli-na-honeypot/commit/5005e158ca090dfe8c39109074cd924748686e75",
        "kind": "Public commit",
        "flowStep": 0
      },
      {
        "title": "Control center",
        "text": "Added the desktop control center and tripwire branding.",
        "date": "2026-08-11",
        "sha": "98f629a",
        "source": "https://github.com/bonkval/huli-na-honeypot/commit/98f629abec37a9d2bcf318b66e61e60f23fa7524",
        "kind": "Public commit",
        "flowStep": 3
      },
      {
        "title": "Coverage",
        "text": "Added security, storage, protocol, network-integration and report-export tests.",
        "date": "2026-08-11",
        "sha": "b20e3bb",
        "source": "https://github.com/bonkval/huli-na-honeypot/commit/b20e3bbe47dd35dbf91fadbed7bb834818535d34",
        "kind": "Public commit",
        "flowStep": 1
      },
      {
        "title": "Windows packaging",
        "text": "Added executable packaging, an installer definition and release-signing scripts.",
        "date": "2026-08-11",
        "sha": "4310d03",
        "source": "https://github.com/bonkval/huli-na-honeypot/commit/4310d0387f41241dc515b227cc508ab85a9d8a73",
        "kind": "Public commit",
        "flowStep": null
      }
    ],
    "repo": "https://github.com/bonkval/huli-na-honeypot"
  },
  "live-screen-view": {
    "mode": "Implementation walkthrough ? 1 public commit",
    "pipeline": [
      "Capture shortcut",
      "Local viewer",
      "OCR extraction",
      "Copy text"
    ],
    "stages": [
      {
        "title": "Problem",
        "text": "Moving visible computer-screen information to a phone usually depends on cloud sync, remote desktop software, or manual retyping.",
        "sha": "78692ce",
        "source": "https://github.com/bonkval/LiveScreenView/tree/78692ce20b913bf49f88f950b0c7d26997b969a0",
        "kind": "Documented implementation",
        "flowStep": null
      },
      {
        "title": "Implementation",
        "text": "Built an on-demand capture shortcut, local HTTP viewer, responsive zoom controls, OCR extraction, and copy-all workflow.",
        "sha": "78692ce",
        "source": "https://github.com/bonkval/LiveScreenView/tree/78692ce20b913bf49f88f950b0c7d26997b969a0",
        "kind": "Documented implementation",
        "flowStep": null
      },
      {
        "title": "Documented behavior",
        "text": "Delivers on-demand primary-screen capture, fit-to-screen and actual-size viewing, touch zoom, selectable OCR output, and one-action text copying.",
        "sha": "78692ce",
        "source": "https://github.com/bonkval/LiveScreenView/tree/78692ce20b913bf49f88f950b0c7d26997b969a0",
        "kind": "Documented implementation",
        "flowStep": null
      },
      {
        "title": "Run locally",
        "text": "Install Tesseract and requirements, run python screen_streamer.py, press the apostrophe key to capture, then open the displayed local address on your phone.",
        "sha": "78692ce",
        "source": "https://github.com/bonkval/LiveScreenView/tree/78692ce20b913bf49f88f950b0c7d26997b969a0",
        "kind": "Documented implementation",
        "flowStep": null
      }
    ],
    "repo": "https://github.com/bonkval/LiveScreenView"
  },
  "network-security-lab": {
    "mode": "Selected public commits",
    "pipeline": [
      "Lab traffic",
      "Detection patterns",
      "Incidents",
      "Dashboard"
    ],
    "stages": [
      {
        "title": "Initial application",
        "text": "The initial commit contains the Flask application, dashboard and login templates, and learning guides.",
        "date": "2026-08-05",
        "sha": "38b7664",
        "source": "https://github.com/bonkval/NetworkSecLab/commit/38b7664a26f873460337d1ea9221b0a34cc29ca1",
        "kind": "Public commit",
        "flowStep": 3
      },
      {
        "title": "Network lab",
        "text": "Transformed the log demonstration into a network security lab, adding service, alert and incident-related application files.",
        "date": "2026-08-06",
        "sha": "a2daa1a",
        "source": "https://github.com/bonkval/NetworkSecLab/commit/a2daa1a2d837b5c8a2d7afb151f4a8bf4897a5b3",
        "kind": "Public commit",
        "flowStep": 1
      },
      {
        "title": "Operational dashboard",
        "text": "Added adaptive themes and operational-dashboard changes, with dashboard tests.",
        "date": "2026-08-07",
        "sha": "01c36ff",
        "source": "https://github.com/bonkval/NetworkSecLab/commit/01c36ff3203c16fa05a99b2598081b8f8a6df6c7",
        "kind": "Public commit",
        "flowStep": 3
      },
      {
        "title": "Documentation",
        "text": "Added a screenshots section to the README so the interface can be reviewed before setup.",
        "date": "2026-08-07",
        "sha": "bbba35f",
        "source": "https://github.com/bonkval/NetworkSecLab/commit/bbba35f64f9f327669848a030ea7350b83ad1711",
        "kind": "Public commit",
        "flowStep": 3
      }
    ],
    "repo": "https://github.com/bonkval/NetworkSecLab"
  },
  "phishhook": {
    "mode": "Implementation walkthrough ? 2 public commits",
    "pipeline": [
      "Final review",
      "SMTP delivery",
      "Anonymous signals",
      "Local history"
    ],
    "stages": [
      {
        "title": "Problem",
        "text": "Phishing-awareness demonstrations need measurable signals without collecting credentials or encouraging uncontrolled bulk campaigns.",
        "sha": "ae737c5",
        "source": "https://github.com/bonkval/phishhook/tree/ae737c5a4a71b4cd0a8b317541ad89ee67768c24",
        "kind": "Documented implementation",
        "flowStep": null
      },
      {
        "title": "Implementation",
        "text": "Built the desktop campaign workflow, review gates, SMTP integration, SQLite history, dashboard, and companion Cloudflare Worker with anonymous interaction events.",
        "sha": "ae737c5",
        "source": "https://github.com/bonkval/phishhook/tree/ae737c5a4a71b4cd0a8b317541ad89ee67768c24",
        "kind": "Documented implementation",
        "flowStep": null
      },
      {
        "title": "Documented behavior",
        "text": "Enforces a 25-recipient cap, final review, no-credential education page, anonymous tracking signals, send-failure summaries, and demo mode without external services.",
        "sha": "ae737c5",
        "source": "https://github.com/bonkval/phishhook/tree/ae737c5a4a71b4cd0a8b317541ad89ee67768c24",
        "kind": "Documented implementation",
        "flowStep": null
      },
      {
        "title": "Run locally",
        "text": "Install the desktop package and run python -m antiphish in demo mode. Real sending requires documented authorization and separately supplied services.",
        "sha": "ae737c5",
        "source": "https://github.com/bonkval/phishhook/tree/ae737c5a4a71b4cd0a8b317541ad89ee67768c24",
        "kind": "Documented implementation",
        "flowStep": null
      }
    ],
    "repo": "https://github.com/bonkval/phishhook"
  },
  "project-chameleon": {
    "mode": "Selected public commits",
    "pipeline": [
      "Consent",
      "Training window",
      "Buffered events",
      "Local logs"
    ],
    "stages": [
      {
        "title": "Initial release",
        "text": "Published the training application, controller, event-log modules, security documentation and tests.",
        "date": "2026-09-04",
        "sha": "bb7a356",
        "source": "https://github.com/bonkval/Project-Chameleon/commit/bb7a3569bbb1d48cfb93dae4c38dcdc4883e733a",
        "kind": "Public commit",
        "flowStep": 1
      },
      {
        "title": "Interface redesign",
        "text": "Redesigned the controller and client using a modern CustomTkinter interface.",
        "date": "2026-09-04",
        "sha": "bd5d08b",
        "source": "https://github.com/bonkval/Project-Chameleon/commit/bd5d08b072b83cce9991c64166447931b9a4ca7c",
        "kind": "Public commit",
        "flowStep": 1
      },
      {
        "title": "Visual refinement",
        "text": "Refined the header and added a custom chameleon mark through a shared widgets module.",
        "date": "2026-09-04",
        "sha": "9b946e3",
        "source": "https://github.com/bonkval/Project-Chameleon/commit/9b946e37927852982fabf295bdcf707abd9e6b50",
        "kind": "Public commit",
        "flowStep": 1
      },
      {
        "title": "Training-only scope",
        "text": "The documented application records inside project-owned training windows, with visible consent and buffered local logs. It does not use global hooks. This is current scope, not a fourth historical release.",
        "sha": "9b946e3",
        "source": "https://github.com/bonkval/Project-Chameleon/tree/9b946e37927852982fabf295bdcf707abd9e6b50",
        "kind": "Current documented scope",
        "flowStep": 0
      }
    ],
    "repo": "https://github.com/bonkval/Project-Chameleon"
  },
  "secure-me-pls": {
    "mode": "Selected public commits",
    "pipeline": [
      "Local input",
      "Pattern checks",
      "Explanation",
      "Checklist"
    ],
    "stages": [
      {
        "title": "Application launch",
        "text": "Launched the password checker, guide, shared components and Next.js application pages.",
        "date": "2026-09-04",
        "sha": "34dc72d",
        "source": "https://github.com/bonkval/secure-me-pls/commit/34dc72de16443fd6b220b7ad26e01e438badf828",
        "kind": "Public commit",
        "flowStep": 1
      },
      {
        "title": "Project README",
        "text": "Added the project README. This is a documentation milestone, not a separate application release.",
        "date": "2026-09-04",
        "sha": "c717772",
        "source": "https://github.com/bonkval/secure-me-pls/commit/c717772e256f85f5cbef70a3c0150b9bb7e31088",
        "kind": "Public commit",
        "flowStep": null
      },
      {
        "title": "Deployment guide",
        "text": "Revised the Vercel deployment instructions in the README.",
        "date": "2026-09-04",
        "sha": "6ed125f",
        "source": "https://github.com/bonkval/secure-me-pls/commit/6ed125f1a36e7dd3d77c24042752b525f0abcf77",
        "kind": "Public commit",
        "flowStep": null
      },
      {
        "title": "Usage guide",
        "text": "Rewrote the README as a project guide. Later documentation explains the application rather than implying new checker behavior.",
        "date": "2026-09-04",
        "sha": "3cd2322",
        "source": "https://github.com/bonkval/secure-me-pls/commit/3cd23221da8ccf4cf6cde53b75dd3fd0876ebf3b",
        "kind": "Public commit",
        "flowStep": null
      }
    ],
    "repo": "https://github.com/bonkval/secure-me-pls"
  },
  "sentiflow-network-lab": {
    "mode": "Selected public commits",
    "pipeline": [
      "Traffic scenarios",
      "Detection rules",
      "SQLite incidents",
      "Dashboard"
    ],
    "stages": [
      {
        "title": "Event model",
        "text": "Defined normalized security events in the event-model module.",
        "date": "2026-08-08",
        "sha": "a1cd7fd",
        "source": "https://github.com/bonkval/SentiFlow-Network-Lab/commit/a1cd7fd61a610366508ac06d939d639e30e7fc8d",
        "kind": "Public commit",
        "flowStep": 0
      },
      {
        "title": "Detection rules",
        "text": "Added explainable detection rules to the detector.",
        "date": "2026-08-08",
        "sha": "a21a028",
        "source": "https://github.com/bonkval/SentiFlow-Network-Lab/commit/a21a028ac0276c9b62bdba64b3d6c80eb714bf16",
        "kind": "Public commit",
        "flowStep": 1
      },
      {
        "title": "Traffic Lab",
        "text": "Added the interactive Traffic Lab workflow in the web application.",
        "date": "2026-08-08",
        "sha": "1479664",
        "source": "https://github.com/bonkval/SentiFlow-Network-Lab/commit/1479664d14e84fa35345728cf6e0fad8a13be9d3",
        "kind": "Public commit",
        "flowStep": 0
      },
      {
        "title": "Validation",
        "text": "Added a validation-metrics script alongside the previously committed detection-scenario tests.",
        "date": "2026-08-08",
        "sha": "67d94b4",
        "source": "https://github.com/bonkval/SentiFlow-Network-Lab/commit/67d94b4b4b48aa9c3d25bb144c1460cf71455fc4",
        "kind": "Public commit",
        "flowStep": 1
      }
    ],
    "repo": "https://github.com/bonkval/SentiFlow-Network-Lab"
  },
  "starlium": {
    "mode": "Selected public commits",
    "pipeline": [
      "Account",
      "Store + cart",
      "Checkout",
      "Inventory"
    ],
    "stages": [
      {
        "title": "Initial storefront",
        "text": "Uploaded the initial storefront assets and PHP application files, including administration pages.",
        "date": "2026-07-02",
        "sha": "50c9928",
        "source": "https://github.com/bonkval/Starlium/commit/50c9928f3712973fe1fe66f75df2dfcaf0b2b97f",
        "kind": "Public commit",
        "flowStep": 1
      },
      {
        "title": "Store entry",
        "text": "Changed the index entry point to redirect to the store page.",
        "date": "2026-07-02",
        "sha": "bda3571",
        "source": "https://github.com/bonkval/Starlium/commit/bda35718f1efe3e274038cfd2c968879eb410133",
        "kind": "Public commit",
        "flowStep": 1
      },
      {
        "title": "Inventory action",
        "text": "Added product-deletion functionality to inventory administration.",
        "date": "2026-07-09",
        "sha": "80880f8",
        "source": "https://github.com/bonkval/Starlium/commit/80880f8486f8d1ded4199eabb9375df8d6da9ee2",
        "kind": "Public commit",
        "flowStep": 3
      },
      {
        "title": "Navigation styles",
        "text": "Refactored navigation and header styling in the main stylesheet.",
        "date": "2026-07-09",
        "sha": "be57eb9",
        "source": "https://github.com/bonkval/Starlium/commit/be57eb94f445490cee113b6fe1723c0f395756f2",
        "kind": "Public commit",
        "flowStep": 1
      }
    ],
    "repo": "https://github.com/bonkval/Starlium"
  },
  "trustwho": {
    "mode": "Selected public commits",
    "pipeline": [
      "URL input",
      "Lexical features",
      "Detection layers",
      "Security report"
    ],
    "stages": [
      {
        "title": "Project foundation",
        "text": "Established the package configuration, container definition, license and example environment file.",
        "date": "2026-08-08",
        "sha": "b3ef54c",
        "source": "https://github.com/bonkval/TrustWho/commit/b3ef54c8ea569fdbf0be2631a2e94aa25dfd7b31",
        "kind": "Public commit",
        "flowStep": null
      },
      {
        "title": "Detection engine",
        "text": "Added the local-first URL detection engine, feature extraction, training, URL utilities and API modules.",
        "date": "2026-08-08",
        "sha": "e32c577",
        "source": "https://github.com/bonkval/TrustWho/commit/e32c577393cefbfdb3a75cdea2916f823f80b3b0",
        "kind": "Public commit",
        "flowStep": 2
      },
      {
        "title": "Security report",
        "text": "Built the web security-report interface using HTML, CSS and JavaScript.",
        "date": "2026-08-08",
        "sha": "bd56531",
        "source": "https://github.com/bonkval/TrustWho/commit/bd5653110bf23f496f84c672d3b57685ffb68e6f",
        "kind": "Public commit",
        "flowStep": 3
      },
      {
        "title": "Detection tests",
        "text": "Added API, detector, feature-extraction and threat-feed update tests.",
        "date": "2026-08-08",
        "sha": "0631336",
        "source": "https://github.com/bonkval/TrustWho/commit/0631336ecf8bdd40fbb2dcd67f72c867f591658e",
        "kind": "Public commit",
        "flowStep": 2
      },
      {
        "title": "Local configuration",
        "text": "Updated ignored files and the example configuration to keep environment settings local.",
        "date": "2026-08-08",
        "sha": "fcde255",
        "source": "https://github.com/bonkval/TrustWho/commit/fcde2551fba19ff37a580d0bb7688247884f769f",
        "kind": "Public commit",
        "flowStep": null
      }
    ],
    "repo": "https://github.com/bonkval/TrustWho"
  }
};
