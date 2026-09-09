const galleries = {
  'secure-me-pls': {
    title: 'Secure me, pls?', intro: 'Product screens from the private password-learning experience.',
    items: [
      ['image', '/projects/secure-me-pls/screenshots/password-analysis.png', 'Password analysis screen'],
      ['image', '/projects/secure-me-pls/screenshots/password-comparison.png', 'Password comparison screen'],
      ['image', '/projects/secure-me-pls/screenshots/security-foundations.png', 'Security foundations lesson'],
      ['image', '/projects/secure-me-pls/screenshots/threat-model-basics.png', 'Threat model basics lesson']
    ]
  },
  'canvas-copy-pasta': {
    title: 'CanvasCopyPasta', intro: 'Interface and workflow evidence for the browser extension.',
    items: [
      ['image', '/projects/canvas-copy-pasta/screenshots/toolbar-expanded.png', 'Expanded CanvasCopyPasta toolbar'],
      ['image', '/projects/canvas-copy-pasta/screenshots/toolbar-collapsed.png', 'Collapsed CanvasCopyPasta toolbar']
    ]
  },
  'sentiflow-network-lab': {
    title: 'SentiFlow Network Lab', intro: 'Dashboard and traffic-lab screens showing evidence-first analysis.',
    items: [
      ['image', '/public/projects/sentiflow/dashboard.png', 'SOC dashboard with incident evidence'],
      ['image', '/public/projects/sentiflow/traffic-lab.png', 'Traffic Lab scenario editor'],
      ['panel', 'Detection report', 'Scenario labels, thresholds, and resulting metrics are kept together for review.']
    ]
  },
  'project-chameleon': {
    title: 'Project Chameleon', intro: 'Consent-first forensic workflow visuals for the training utility.',
    items: [
      ['image', '/public/projects/project-chameleon/case-study.png', 'Consent and forensic workflow'],
      ['panel', 'Training Arena', 'Capture is bounded to the approved project window with visible recording state.'],
      ['panel', 'Forensic record', 'Buffered events and foreground titles are reviewed locally as an explicit training record.']
    ]
  },
  'phishhook': {
    title: 'PhishHook', intro: 'Synthetic campaign-review and monitoring screens.',
    items: [
      ['image', '/public/projects/phishhook/campaign-review.svg', 'Campaign review gate'],
      ['image', '/public/projects/phishhook/dashboard.svg', 'Engagement interpretation dashboard'],
      ['panel', 'Safety boundary', 'The visuals use synthetic data and keep credential collection outside the workflow.']
    ]
  },
  'huli-na-honeypot': {
    title: 'Huli na! Honeypot', intro: 'Defensive monitoring screens from the local honeypot console.',
    items: [
      ['image', '/public/projects/huli/overview.png', 'Listener overview'],
      ['image', '/public/projects/huli/activity.png', 'Activity and incident review'],
      ['image', '/public/projects/huli/analytics.png', 'Analytics dashboard']
    ]
  },
  'trustwho': {
    title: 'TrustWho', intro: 'Explainable URL-risk reporting and analysis workflow.',
    items: [
      ['image', '/public/projects/trustwho/dashboard.png', 'URL analysis dashboard'],
      ['panel', 'Layered analysis', 'Blacklist indicators are checked before optional intelligence and lexical model inference.'],
      ['panel', 'Explainable result', 'The verdict is presented with confidence, indicators, and engine status for review.']
    ]
  },
  'network-security-lab': {
    title: 'NetworkSecLab', intro: 'Workflow visuals for the local network-defense lab.',
    items: [
      ['panel', 'Operations dashboard', 'Authentication events, SNMP signals, and service posture meet in one local console.'],
      ['panel', 'Guided lab', 'Simulators make monitoring and incident response reproducible without managed hardware.'],
      ['panel', 'Incident report', 'Detection rules, audit events, and exports preserve the path from signal to response.']
    ]
  },
  'live-screen-view': {
    title: 'LiveScreenView', intro: 'The implemented computer-to-phone capture and OCR workflow.',
    items: [
      ['panel', 'Capture on demand', 'A local Python utility captures the primary screen only after the user triggers it.'],
      ['panel', 'Phone viewer', 'The responsive local viewer supports fit-to-screen, actual size, and touch zoom.'],
      ['panel', 'OCR and copy', 'Tesseract output becomes selectable text with a one-action copy workflow.']
    ]
  },
  'starlium': {
    title: 'Starlium', intro: 'Brand and catalog visuals from the PHP storefront project.',
    items: [
      ['image', '/public/projects/starlium/logo.png', 'Starlium storefront branding'],
      ['image', '/public/projects/starlium/product-12998.jpg', 'Catalog product view'],
      ['image', '/public/projects/starlium/product-ae1.webp', 'Second catalog product view']
    ]
  }
};

const slug = document.querySelector('[data-screenshot-project]')?.dataset.screenshotProject;
const gallery = galleries[slug];
const root = document.querySelector('[data-screenshot-gallery]');
if (gallery && root) {
  document.title = `${gallery.title} screenshots — Cedrick Vales`;
  root.querySelector('[data-gallery-title]').textContent = gallery.title;
  root.querySelector('[data-gallery-intro]').textContent = gallery.intro;
  const grid = root.querySelector('[data-gallery-grid]');
  gallery.items.forEach(([type, source, caption], index) => {
    const figure = document.createElement('figure');
    figure.className = `screenshot-card ${type === 'panel' ? 'screenshot-panel' : ''}`;
    if (type === 'image') {
      const image = document.createElement('img');
      image.src = source; image.alt = caption; image.loading = index ? 'lazy' : 'eager';
      figure.append(image);
    } else {
      figure.innerHTML = `<span class="screenshot-terminal">VISUAL EVIDENCE / ${String(index + 1).padStart(2, '0')}</span><strong>${source}</strong><p>${caption}</p><i aria-hidden="true"></i>`;
    }
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = caption;
    figure.append(figcaption);
    grid.append(figure);
  });
}
