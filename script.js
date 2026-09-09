(() => {
  const root = document.documentElement;
  if (!document.querySelector('link[href="/brand-dots.css"]')) { const dotStyles = document.createElement('link'); dotStyles.rel = 'stylesheet'; dotStyles.href = '/brand-dots.css'; document.head.append(dotStyles); }
  if (!document.querySelector('link[rel~="icon"]')) { const icon = document.createElement('link'); icon.rel = 'icon'; icon.type = 'image/svg+xml'; icon.href = '/favicon.svg'; document.head.append(icon); }
  const themeButton = document.querySelector('.theme-toggle');
  const themeWave = document.querySelector('.theme-wave');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  const storedTheme = localStorage.getItem('cedrick-theme');
  const systemTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  document.querySelectorAll('.identity-name').forEach(name => { name.textContent = 'CRDV'; });
  document.querySelectorAll('.identity-role').forEach(role => role.remove());
  const cvBack = document.querySelector('.cv-preview .back-link');
  if (cvBack) cvBack.textContent = '← Back to portfolio';
  document.querySelectorAll('.case-kicker span:first-child').forEach(label => { label.textContent = 'Project'; });
  document.querySelectorAll('.back-link').forEach(link => { link.textContent = '← Back to Projects'; });

  // Keep the page personal and direct while the editable placeholders remain easy to replace.
  if (cvBack) cvBack.textContent = '← Back to portfolio';
  document.querySelector('.hero-status')?.remove();
  const hero = document.querySelector('.hero');
  if (hero) {
    const lower = hero.querySelector('.hero-lower');
    if (lower) lower.innerHTML = '<div class="hero-about"><p>Cybersecurity student focused on monitoring, networks, automation, and practical defensive work.</p><dl><div><dt>Based in</dt><dd>Philippines</dd></div><div><dt>Address</dt><dd>Meycauayan, Bulacan</dd></div><div><dt>Email</dt><dd><a href="mailto:cedrickvales1111@gmail.com">cedrickvales1111@gmail.com</a></dd></div></dl></div>';
  }
  const aboutSection = document.querySelector('.about');
  if (hero && aboutSection) {
    const profile = aboutSection.querySelector('.profile-wrap');
    const links = aboutSection.querySelector('.profile-links');
    const heroProfile = document.createElement('aside');
    heroProfile.className = 'hero-profile reveal'; heroProfile.id = 'profile';
    if (profile) heroProfile.append(profile);
    if (links) heroProfile.append(links);
    hero.append(heroProfile);
    aboutSection.remove();
  }
  document.querySelector('.site-nav a[href="#about"]')?.remove();
  document.querySelectorAll('.site-nav a[href$="#work"]').forEach(link => { link.textContent = 'Projects'; });
  const cvSection = document.querySelector('.cv-section');
  if (hero && cvSection) hero.after(cvSection);
  const hobbiesSection = document.querySelector('.hobbies');
  const contactSection = document.querySelector('.contact');
  if (hobbiesSection && contactSection) contactSection.before(hobbiesSection);
  document.querySelectorAll('.section-label').forEach(label => { label.textContent = label.textContent.replace(/^\d+\s*[—-]\s*/, ''); });
  document.querySelectorAll('.contact [data-form-status]').forEach(status => status.remove());
  document.querySelector('.contact-intro .email')?.remove();
  const principles = ['Curious', 'Methodical', 'Defensive', 'Accountable'];
  document.querySelectorAll('.principles span').forEach((item, index) => { item.textContent = principles[index] || item.textContent; });
  const cvCopy = document.querySelector('.cv-copy');
  cvCopy?.querySelector('code')?.parentElement.remove();
  const cvActions = cvCopy?.querySelector('.cv-actions');
  if (cvActions) cvActions.innerHTML = '<a class="button" href="/cv/">View CV</a>';
  const certificateList = document.querySelector('.cert-list');
  const certificates = window.PORTFOLIO_CERTIFICATIONS || [];
  if (certificateList && certificates.length) {
    certificateList.replaceChildren(...certificates.map(certificate => {
      const item = document.createElement('article');
      item.className = 'cert reveal';
      const image = document.createElement('img');
      image.className = 'cert-image'; image.src = certificate.image; image.alt = `${certificate.title} certificate badge`;
      image.addEventListener('error', () => image.classList.add('missing'));
      const copy = document.createElement('div');
      const issuer = document.createElement('p'); issuer.textContent = certificate.issuer;
      const title = document.createElement('h3'); title.textContent = certificate.title;
      copy.append(issuer, title);
      const date = document.createElement('span');
      date.textContent = certificate.expires ? `Expires ${certificate.expires}` : certificate.issued ? `Issued ${certificate.issued}` : '';
      item.append(image, copy, date);
      return item;
    }));
  }

  const hobbyPost = document.querySelector('.social-post');
  if (hobbyPost) {
    const avatar = hobbyPost.querySelector('.post-avatar');
    if (avatar) { avatar.textContent = ''; const avatarImage = document.createElement('img'); avatarImage.alt = 'Cedrick profile'; avatarImage.src = '/public/assets/profile/instagram-profile.jpg'; avatar.append(avatarImage); }
    hobbyPost.querySelector('.post-header strong').textContent = 'c.valllll';
    hobbyPost.querySelector('.post-caption strong').textContent = 'c.valllll';
    hobbyPost.querySelector('.post-caption').lastChild.textContent = ' Outside the lab.';
    const hobbyPhotos = [
      '953dd1d313670e3e1337c30b66257594.jpeg',
      'IMG_0138.jpeg',
      'IMG_0965.jpeg',
      'IMG_1241.jpeg',
      'IMG_20251219_180615.jpeg',
      'IMG_2466.jpeg',
      'IMG_5929.jpeg',
      'IMG_7682.jpeg'
    ];
    hobbyPost.querySelectorAll('.post-slide').forEach((slide, index) => {
      slide.textContent = '';
      const photo = document.createElement('img'); photo.className = 'post-photo'; photo.alt = `Hobby photo ${index + 1}`; photo.src = `/public/assets/hobbies/instagram/${hobbyPhotos[index] || hobbyPhotos[0]}`;
      photo.addEventListener('error', () => photo.classList.add('missing'));
      slide.append(photo);
    });
    const postWindow = hobbyPost.querySelector('.post-window');
    const showDoubleTapHeart = event => {
      const heart = document.createElement('span');
      heart.className = 'double-tap-heart';
      heart.setAttribute('aria-hidden', 'true');
      const bounds = postWindow.getBoundingClientRect();
      heart.style.left = `${event.clientX - bounds.left}px`;
      heart.style.top = `${event.clientY - bounds.top}px`;
      postWindow.append(heart);
      heart.addEventListener('animationend', () => heart.remove(), { once: true });
    };
    postWindow?.addEventListener('dblclick', showDoubleTapHeart);
    let lastTap = 0;
    postWindow?.addEventListener('pointerup', event => {
      if (event.pointerType !== 'touch') return;
      const now = Date.now();
      if (now - lastTap < 360) showDoubleTapHeart(event);
      lastTap = now;
    }, { passive: true });
  }

  function setThemeState(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      const label = themeButton.querySelector('[data-theme-label]');
      if (label) label.textContent = dark ? 'Light' : 'Dark';
    }
    if (themeMeta) themeMeta.content = dark ? '#111110' : '#f6f5f1';
    localStorage.setItem('cedrick-theme', theme);
  }

  function applyTheme(theme, origin) {
    if (!origin) { setThemeState(theme); return; }
    const panel = document.createElement('div');
    panel.setAttribute('aria-hidden', 'true');
    panel.style.cssText = `position:fixed;left:-40vw;top:-8vh;width:165vw;height:118vh;background:${theme === 'dark' ? '#111110' : '#f6f5f1'};z-index:2147483640;pointer-events:none;transform:translateX(-130vw) skewX(-14deg);box-shadow:0 0 80px rgba(0,0,0,.12)`;
    document.body.append(panel);
    const animation = panel.animate([
      { transform: 'translateX(-130vw) skewX(-14deg)' },
      { transform: 'translateX(0) skewX(-14deg)', offset: .47 },
      { transform: 'translateX(5vw) skewX(-14deg)', offset: .54 },
      { transform: 'translateX(150vw) skewX(-14deg)' }
    ], { duration: 1500, easing: 'cubic-bezier(.72,0,.22,1)', fill: 'forwards' });
    setTimeout(() => setThemeState(theme), 710);
    animation.finished.finally(() => panel.remove());
  }

  applyTheme(storedTheme || systemTheme);
  themeButton?.addEventListener('click', event => {
    const rect = event.currentTarget.getBoundingClientRect();
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  });

  const intro = document.querySelector('[data-intro]');
  let introDismissed = false;
  const dismissIntro = () => {
    if (introDismissed) return;
    introDismissed = true;
    intro?.classList.add('hidden'); document.body.classList.remove('intro-active');
  };
  if (intro) {
    document.body.classList.add('intro-active');
    const count = intro.querySelector('[data-intro-count]');
    const progress = intro.querySelector('[data-intro-progress]');
    const loaderDuration = reducedMotion.matches ? 1600 : 3200;
    const fallbackDismiss = setTimeout(dismissIntro, loaderDuration + 250);
    if (reducedMotion.matches) {
      count.textContent = '100'; progress.style.transform = 'scaleX(1)';
    } else {
      const started = performance.now();
      const duration = loaderDuration;
      const updateLoader = now => {
        const ratio = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - ratio, 3);
        count.textContent = String(Math.round(eased * 100)).padStart(3, '0');
        progress.style.transform = `scaleX(${eased})`;
        if (ratio < 1 && !introDismissed) requestAnimationFrame(updateLoader);
        else { clearTimeout(fallbackDismiss); setTimeout(dismissIntro, 220); }
      };
      requestAnimationFrame(updateLoader);
    }
    document.querySelector('[data-intro-skip]')?.addEventListener('click', dismissIntro);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  document.querySelectorAll('[data-split]').forEach(element => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = []; let current;
    while ((current = walker.nextNode())) if (current.textContent.trim()) nodes.push(current);
    let index = 0;
    nodes.forEach(node => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(word => {
        if (!word.trim()) { fragment.append(word); return; }
        const wrap = document.createElement('span'); wrap.className = 'word';
        const inner = document.createElement('span'); inner.textContent = word; inner.style.setProperty('--word-index', index++);
        wrap.append(inner); fragment.append(wrap);
      });
      node.replaceWith(fragment);
    });
  });

  const progress = document.createElement('div'); progress.className = 'reading-progress'; progress.setAttribute('aria-hidden', 'true'); document.body.append(progress);
  const updateProgress = () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`; };
  addEventListener('scroll', updateProgress, { passive: true }); updateProgress();

  if (!reducedMotion.matches && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(frame => {
      frame.addEventListener('pointermove', event => {
        const rect = frame.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width; const y = (event.clientY - rect.top) / rect.height;
        frame.style.setProperty('--mx', `${x * 100}%`); frame.style.setProperty('--my', `${y * 100}%`);
      });
      frame.addEventListener('pointerleave', () => {});
    });
  }

  const caseStudyBriefs = {
    '/projects/secure-me-pls/': {
      problem: 'Password advice is often reduced to an unexplained score, leaving people unsure which patterns actually weaken a password.',
      contribution: 'Designed and built the private browser-based checker, learning guide, exercises, route structure, responsive interface, and security-focused deployment configuration.',
      technologies: 'Next.js, TypeScript, React 19, Tailwind CSS, localStorage, Vercel, and browser-side pattern analysis.',
      evidence: 'The case-study hero and gallery show the checker, study workflow, passphrase exercises, and privacy-first product direction.',
      screenshots: '/projects/secure-me-pls/screenshots/',
      challenges: 'Provide useful feedback without transmitting, storing, or logging the password entered by the visitor.',
      results: 'Checks eight documented weak-pattern categories and delivers four focused routes with interactive lessons, exercises, scenarios, and a locally saved checklist.',
      demo: 'Open securemepls.vercel.app and use a made-up test password—never a real credential—then explore the Security Guide.',
      github: 'https://github.com/bonkval/secure-me-pls'
    },
    '/projects/canvas-copy-pasta/': {
      problem: 'Canvas question content can be awkward to copy cleanly for accessibility, review, and explicitly permitted AI-assisted coursework.',
      contribution: 'Built the Manifest V3 extension, isolated toolbar, active-question selection, text and image copying, configurable prompts, history, and optional school-origin access.',
      technologies: 'JavaScript, Chrome Extension APIs, Manifest V3, Shadow DOM, Clipboard API, MutationObserver, and AutoHotkey.',
      evidence: 'The project illustration summarizes question detection, selected-answer handling, image processing, and the clipboard workflow.',
      screenshots: '/projects/canvas-copy-pasta/screenshots/',
      challenges: 'Handle changing Canvas markup, same-page updates, selected controls, images, and frames without allowing site CSS to alter the toolbar.',
      results: 'Supports text, prompt-appended text, single or combined images, selected radio and checkbox answers, persisted history, and user-approved Canvas origins.',
      demo: 'Open the browser extensions page, enable Developer mode, load the repository folder unpacked, and test only in an authorized Canvas workflow.',
      github: 'https://github.com/bonkval/CanvasCopyPasta'
    },
    '/projects/sentiflow-network-lab/': {
      problem: 'Security dashboards can announce a verdict without showing which evidence and thresholds produced it.',
      contribution: 'Built the normalized event pipeline, local SQLite storage, SOC-style dashboard, editable Traffic Lab, incident workflow, PCAP ingestion, and optional live capture path.',
      technologies: 'Python, SQLite, HTTP, JSON Lines, HTML, Bootstrap, PCAP, TShark, and Npcap.',
      evidence: 'Dashboard and Traffic Lab screenshots show the incident view, editable event input, and evidence-first workflow.',
      screenshots: '/projects/sentiflow-network-lab/screenshots/',
      challenges: 'Keep simulated events, recorded PCAPs, and optional live traffic on one validated analysis path while avoiding unsafe traffic generation.',
      results: 'Includes eight labeled traffic scenarios and seven documented detection families, with a validation script that reports precision, recall, and a confusion matrix.',
      demo: 'Run start-monitor.bat, open http://127.0.0.1:8000, choose a Traffic Lab example, and select Analyze traffic.',
      github: 'https://github.com/bonkval/SentiFlow-Network-Lab'
    },
    '/projects/project-chameleon/': {
      problem: 'Input-event forensics is difficult to demonstrate responsibly when examples behave like unrestricted keyloggers.',
      contribution: 'Built a consent-first controller and client with training-only windows, visible recording state, buffered logging, configuration, and forensic record review.',
      technologies: 'Python, CustomTkinter, threading, JSON, SHA-256, unittest, and local file storage.',
      evidence: 'The case-study visual maps the consent boundary, approved training windows, buffered events, and local forensic log.',
      screenshots: '/projects/project-chameleon/screenshots/',
      challenges: 'Keep capture visibly bounded to project-owned windows and make persistence and clipboard demonstrations explicit rather than covert.',
      results: 'Handles spaces, backspaces, tabs, Enter, foreground-title records, and opt-in clipboard tests while excluding networking, global hooks, stealth, and autostart.',
      demo: 'Install requirements, run python run_chameleon.py, launch the client, accept the disclosure, and type only inside the Training Arena.',
      github: 'https://github.com/bonkval/Project-Chameleon'
    },
    '/projects/phishhook/': {
      problem: 'Phishing-awareness demonstrations need measurable signals without collecting credentials or encouraging uncontrolled bulk campaigns.',
      contribution: 'Built the desktop campaign workflow, review gates, SMTP integration, SQLite history, dashboard, and companion Cloudflare Worker with anonymous interaction events.',
      technologies: 'Python 3.12, CustomTkinter, SQLite, SMTP, HTTPX, TypeScript, Cloudflare Workers, and D1.',
      evidence: 'Campaign-review and dashboard visuals use synthetic data to show pre-send checks, engagement interpretation, and event history.',
      screenshots: '/projects/phishhook/screenshots/',
      challenges: 'Separate scanner activity from likely human interaction while keeping SMTP and Worker secrets out of source and packaged builds.',
      results: 'Enforces a 25-recipient cap, final review, no-credential education page, anonymous tracking signals, send-failure summaries, and demo mode without external services.',
      demo: 'Install the desktop package and run python -m antiphish in demo mode. Real sending requires documented authorization and separately supplied services.',
      github: 'https://github.com/bonkval/phishhook'
    },
    '/projects/huli-na-honeypot/': {
      problem: 'A defensive decoy should expose suspicious behavior without becoming a repository for submitted passwords or request bodies.',
      contribution: 'Built the GUI-first SSH and HTTP decoy, behavior scoring, trusted ranges, SQLite analytics, alert delivery, exports, retention, and self-tests.',
      technologies: 'Python, AsyncSSH, SQLite, GeoIP2, ReportLab, Windows notifications, Discord webhooks, and DPAPI.',
      evidence: 'The overview screenshot presents listener state, severity-aware activity, analytics, and incident review in one interface.',
      screenshots: '/projects/huli-na-honeypot/screenshots/',
      challenges: 'Balance realistic protocol handling with resource limits, privacy boundaries, optional enrichment, and safe fallback behavior.',
      results: 'Classifies activity into five severity levels, recognizes multiple scanner, automation, exploit, burst, login, and cross-service signals, and exports CSV, JSON, and PDF reports.',
      demo: 'Run Huli na!.bat, select Start monitoring, and use Run listener self-test on a system and network you are authorized to monitor.',
      github: 'https://github.com/bonkval/huli-na-honeypot'
    },
    '/projects/trustwho/': {
      problem: 'Checking an unknown URL should not require the analysis service to visit or resolve the potentially dangerous destination.',
      contribution: 'Built URL normalization, layered blacklist matching, optional URLhaus intelligence, feature extraction, model training, safe artifact loading, API, and web interface.',
      technologies: 'Python, FastAPI, scikit-learn, Pandas, NumPy, skops, tldextract, Uvicorn, and pytest.',
      evidence: 'The dashboard screenshot shows the non-technical risk report, verdict, confidence, indicators, and engine status.',
      screenshots: '/projects/trustwho/screenshots/',
      challenges: 'Avoid SSRF-style retrieval, validate large training inputs, limit memory use, and refuse untrusted model artifact types.',
      results: 'Extracts 34 lexical features and evaluates URLs through three ordered layers: local indicators, optional URLhaus lookup, and machine-learning inference.',
      demo: 'Create the virtual environment, install the package, train the included smoke-test model, then run Uvicorn and open http://127.0.0.1:8000.',
      github: 'https://github.com/bonkval/TrustWho'
    },
    '/projects/network-security-lab/': {
      problem: 'Students often lack managed network hardware for practicing monitoring, incident handling, and guarded configuration workflows.',
      contribution: 'Built one local dashboard joining authentication monitoring, SNMP event handling, incident management, SSH previews, simulators, audit logs, and reports.',
      technologies: 'Python, Flask, SQLite, Paramiko, Waitress, SNMP, UDP, Docker, HTML, CSS, and JavaScript.',
      evidence: 'The project screenshots cover dashboard posture, event streams, guided labs, incidents, detection rules, and reporting.',
      screenshots: '/projects/network-security-lab/screenshots/',
      challenges: 'Demonstrate realistic operations while keeping device changes explicit, inventory-bound, backed up, validated, and reversible.',
      results: 'Provides three guided labs, five credential-attack detection patterns, a five-attempt/30-second brute-force threshold, and a real localhost SNMP datagram path.',
      demo: 'Run python start.py. The launcher creates its environment, installs changed dependencies, initializes databases, and opens http://127.0.0.1:5000.',
      github: 'https://github.com/bonkval/NetworkSecLab'
    },
    '/projects/live-screen-view/': {
      problem: 'Moving visible computer-screen information to a phone usually depends on cloud sync, remote desktop software, or manual retyping.',
      contribution: 'Built an on-demand capture shortcut, local HTTP viewer, responsive zoom controls, OCR extraction, and copy-all workflow.',
      technologies: 'Python, MSS, Pillow, pynput, pytesseract, Tesseract OCR, HTML, CSS, and local HTTP networking.',
      evidence: 'The interface-flow visual documents the implemented computer-to-phone path; the repository does not yet include a captured product screenshot.',
      screenshots: '/projects/live-screen-view/screenshots/',
      challenges: 'Make desktop-scale captures usable on a touch screen while keeping the unauthenticated server limited to a trusted local network.',
      results: 'Delivers on-demand primary-screen capture, fit-to-screen and actual-size viewing, touch zoom, selectable OCR output, and one-action text copying.',
      demo: 'Install Tesseract and requirements, run python screen_streamer.py, press the apostrophe key to capture, then open the displayed local address on your phone.',
      github: 'https://github.com/bonkval/LiveScreenView'
    },
    '/projects/starlium/': {
      problem: 'A storefront needs both a usable customer journey and practical administration for products, inventory, users, and reports.',
      contribution: 'Built account registration and login, shared authentication helpers, categorized product pages, cart, checkout, inventory administration, user management, and reports.',
      technologies: 'PHP, MySQL, SQL, JavaScript, HTML, CSS, sessions, and server-rendered templates.',
      evidence: 'The gallery uses the project’s actual brand and catalog assets; a full deployed-interface screenshot is not currently stored in the repository.',
      screenshots: '/projects/starlium/screenshots/',
      challenges: 'Keep authentication, cart state, inventory data, and administrative actions consistent across a multi-page PHP application.',
      results: 'Connects the customer flow from account and category browsing through cart and checkout with three dedicated administration areas for inventory, users, and reports.',
      demo: 'Import Final_Adidas.sql into a local MySQL database, configure local credentials in db.php, serve the folder through PHP or XAMPP, and open index.php.',
      github: 'https://github.com/bonkval/Starlium'
    }
  };

  const currentCasePath = location.pathname.endsWith('/') ? location.pathname : `${location.pathname}/`;
  const currentCase = caseStudyBriefs[currentCasePath];
  const nextProject = document.querySelector('.next-project');
  if (currentCase && nextProject) {
    const fields = [
      ['Problem', currentCase.problem],
      ['My contribution', currentCase.contribution],
      ['Technologies', currentCase.technologies],
      ['Challenges', currentCase.challenges],
      ['Results', currentCase.results],
      ['Demo instructions', currentCase.demo],
      ['GitHub link', 'Read the source, setup notes, tests, and project documentation.']
    ];
    const brief = document.createElement('section');
    brief.className = 'case-brief';
    const briefWidth = document.createElement('div');
    briefWidth.className = 'page-width';
    briefWidth.innerHTML = '<header class="case-brief-header"><div><p class="section-label">Project brief</p><h2>Built, tested, explained.</h2></div><p>A consistent summary of the work, implementation decisions, evidence, and practical way to explore it.</p></header>';
    const facts = document.createElement('div');
    facts.className = 'case-facts';
    fields.forEach(([label, copy], index) => {
      const item = document.createElement('article');
      item.className = 'case-fact';
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      const heading = document.createElement('h3');
      heading.textContent = label;
      const paragraph = document.createElement('p');
      paragraph.textContent = copy;
      item.append(number, heading, paragraph);
      if (label === 'GitHub link') {
        const source = document.createElement('a');
        source.href = currentCase.github;
        source.target = '_blank';
        source.rel = 'noopener noreferrer';
        source.textContent = 'Open repository ↗';
        item.append(source);
      }
      facts.append(item);
    });
    briefWidth.append(facts);
    brief.append(briefWidth);
    nextProject.before(brief);
  }

  const featuredCards = [...document.querySelectorAll('.work .project-card')];
  if (featuredCards.length) {
    const tracker = document.createElement('aside');
    tracker.className = 'case-tracker'; tracker.setAttribute('aria-hidden', 'true');
    tracker.innerHTML = '<span>CASE <b>01</b> / 03</span><i><em></em></i>';
    document.body.append(tracker);
    const trackerLabel = tracker.querySelector('b');
    const cardObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const index = featuredCards.indexOf(entry.target);
        trackerLabel.textContent = String(index + 1).padStart(2, '0');
        tracker.style.setProperty('--case-position', String(index / Math.max(1, featuredCards.length - 1)));
        tracker.classList.add('active');
      });
    }, { threshold: 0.42 });
    featuredCards.forEach(card => cardObserver.observe(card));
  }

  const menuButton = document.querySelector('.menu-button');
  const navigation = document.querySelector('.site-nav');
  function closeMenu() { menuButton?.setAttribute('aria-expanded', 'false'); navigation?.classList.remove('open'); document.body.classList.remove('menu-open'); }
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open)); navigation?.classList.toggle('open', !open); document.body.classList.toggle('menu-open', !open);
  });
  document.querySelectorAll('.site-nav a, .footer a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const targetId = new URL(link.href, location.href).hash;
    const target = targetId ? document.querySelector(targetId) : null;
    if (!target) { closeMenu(); return; }
    event.preventDefault(); closeMenu();
    const start = scrollY, destination = Math.max(0, target.getBoundingClientRect().top + scrollY - 90);
    if (reducedMotion.matches) { scrollTo(0, destination); history.replaceState(null, '', targetId); return; }
    const distance = destination - start, duration = Math.min(1450, Math.max(500, Math.abs(distance) * .34));
    const began = performance.now();
    const tick = now => { const progress = Math.min(1, (now - began) / duration); const eased = 1 - Math.pow(1 - progress, 4); scrollTo(0, start + distance * eased); if (progress < 1) requestAnimationFrame(tick); else history.replaceState(null, '', targetId); };
    requestAnimationFrame(tick);
  }));

  const routeLayer = document.createElement('div');
  routeLayer.className = 'route-layer'; routeLayer.setAttribute('aria-hidden', 'true');
  routeLayer.innerHTML = '<i></i><b></b>'; document.body.append(routeLayer);
  requestAnimationFrame(() => routeLayer.classList.add('route-enter'));
  // Browsers can restore this page from the back/forward cache while the exit
  // animation is still covering it. Hide the transition layer immediately.
  addEventListener('pageshow', event => {
    if (!event.persisted) return;
    routeLayer.classList.remove('route-enter', 'route-exit');
    routeLayer.style.transform = 'translateY(-100%)';
  });
  document.querySelectorAll('a[href]').forEach(link => link.addEventListener('click', event => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || link.hasAttribute('download')) return;
    const rawHref = link.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;
    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname && destination.hash) return;
    event.preventDefault();
    routeLayer.classList.remove('route-enter'); routeLayer.classList.add('route-exit');
    setTimeout(() => { window.location.assign(destination.href); }, reducedMotion.matches ? 0 : 560);
  }));

  document.querySelectorAll('.profile-image').forEach(image => {
    if (image.complete && image.naturalWidth === 0) image.classList.add('missing');
    image.addEventListener('error', () => image.classList.add('missing'));
  });

  const profileWrap = document.querySelector('.profile-wrap');
  document.querySelector('.profile-image')?.setAttribute('src', '/public/assets/profile/profile.jpg');
  document.querySelector('.profile-image.secondary')?.setAttribute('src', '/public/assets/profile/profile2.jpg');
  document.querySelectorAll('.profile-image').forEach(image => {
    image.classList.remove('missing');
    image.addEventListener('load', () => image.classList.remove('missing'));
  });
  if (profileWrap && !profileWrap.querySelector('.profile-particles')) {
    const particleLayer = document.createElement('div');
    particleLayer.className = 'profile-particles'; particleLayer.setAttribute('aria-hidden', 'true');
    profileWrap.append(particleLayer);
  }
  const aboutCopy = document.querySelector('.about-copy');
  if (aboutCopy) {
    const label = aboutCopy.querySelector('.section-label'); if (label) label.textContent = 'About';
    const heading = aboutCopy.querySelector('h2'); if (heading) heading.textContent = 'CRDV';
    const introCopy = aboutCopy.querySelector('h2 + p'); if (introCopy) introCopy.textContent = 'Third-year cybersecurity student.';
    if (!aboutCopy.querySelector('.about-details')) {
      const details = document.createElement('dl'); details.className = 'about-details';
      details.innerHTML = '<div><dt>Name</dt><dd>Cedrick Rafael Vales</dd></div><div><dt>Location</dt><dd>Philippines</dd></div><div><dt>Email</dt><dd><a href="mailto:cedrickvales1111@gmail.com">cedrickvales1111@gmail.com</a></dd></div>';
      aboutCopy.querySelector('.profile-links')?.before(details);
    }
  }
  if (profileWrap) {
    const particles = profileWrap.querySelector('.profile-particles');
    const mosaic = document.createElement('div'); mosaic.className = 'profile-mosaic'; mosaic.setAttribute('aria-hidden', 'true'); profileWrap.append(mosaic);
    const columns = 8, rows = 11, tiles = [];
    for (let row = 0; row < rows; row += 1) for (let column = 0; column < columns; column += 1) {
      const tile = document.createElement('i');
      tile.style.backgroundSize = `${columns * 100}% ${rows * 100}%`;
      tile.style.backgroundPosition = `${column / (columns - 1) * 100}% ${row / (rows - 1) * 100}%`;
      tile.dataset.x = String((column + .5) / columns); tile.dataset.y = String((row + .5) / rows);
      tile.dataset.bias = String(((row * 19 + column * 11) % 10) / 24);
      mosaic.append(tile); tiles.push(tile);
    }
    if (particles) for (let index = 0; index < 22; index += 1) {
      const particle = document.createElement('i');
      particle.style.setProperty('--particle-x', `${(index * 37) % 100}%`);
      particle.style.setProperty('--particle-y', `${(index * 61) % 100}%`);
      particle.style.setProperty('--particle-delay', `${(index % 7) * -0.18}s`);
      particles.append(particle);
    }
    const updateProfileMosaic = event => {
      const rect = profileWrap.getBoundingClientRect();
      const pointerX = (event.clientX - rect.left) / rect.width, pointerY = (event.clientY - rect.top) / rect.height;
      tiles.forEach(tile => {
        const distance = Math.hypot(pointerX - Number(tile.dataset.x), pointerY - Number(tile.dataset.y));
        const withinPortrait = pointerX >= 0 && pointerX <= 1 && pointerY >= 0 && pointerY <= 1;
        const strength = withinPortrait ? Math.max(0, 1 - distance / .42 - Number(tile.dataset.bias)) : 0;
        const visible = strength > .12;
        tile.style.setProperty('--tile-opacity', visible ? '1' : '0');
        tile.style.setProperty('--tile-scale', visible ? '1' : '.72');
      });
    };
    document.addEventListener('mousemove', updateProfileMosaic, { passive: true });
  }

  if (matchMedia('(any-pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.setAttribute('aria-hidden', 'true');
    cursor.style.cssText = 'position:fixed;left:0;top:0;width:24px;height:24px;margin:-12px 0 0 -12px;border:1px solid currentColor;border-radius:50%;z-index:2147483647;pointer-events:none;opacity:0;color:#fff;mix-blend-mode:difference;box-shadow:0 0 0 5px rgba(255,255,255,.12),0 0 18px rgba(255,255,255,.65);will-change:transform';
    const cursorCore = document.createElement('i'); cursorCore.style.cssText = 'position:absolute;left:50%;top:50%;width:4px;height:4px;border-radius:50%;background:currentColor;transform:translate(-50%,-50%)'; cursor.append(cursorCore);
    document.body.append(cursor);
    root.classList.add('custom-cursor-ready');
    document.addEventListener('mousemove', event => { cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`; cursor.style.opacity = '1'; }, { passive: true });
    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  }

  document.addEventListener('pointerdown', event => {
    const ripple = document.createElement('span');
    ripple.style.cssText = `position:fixed;left:${event.clientX}px;top:${event.clientY}px;width:20px;height:20px;margin:-10px 0 0 -10px;border:2px solid currentColor;border-radius:50%;color:${root.dataset.theme === 'dark' ? '#f6f5f1' : '#111110'};z-index:2147483646;pointer-events:none;mix-blend-mode:difference`;
    document.body.append(ripple);
    ripple.animate([{ transform: 'scale(.2)', opacity: 1 }, { transform: 'scale(6)', opacity: 0 }], { duration: 800, easing: 'cubic-bezier(.16,.8,.2,1)', fill: 'forwards' }).finished.finally(() => ripple.remove());
  }, { passive: true });

  document.querySelectorAll('[data-cv-link]').forEach(link => {
    fetch(link.href, { method: 'HEAD' }).then(response => {
      if (response.ok && response.headers.get('content-type')?.includes('pdf')) { link.classList.remove('disabled'); link.removeAttribute('aria-disabled'); }
    }).catch(() => {});
  });

  if (location.pathname.includes('/projects/network-security-lab/') && !document.querySelector('[data-network-gallery]')) {
    const section = document.createElement('section'); section.className = 'case-gallery';
    section.innerHTML = '<div class="page-width"><header class="section-header"><div><p class="section-label">Interface evidence</p><h2>Inside the lab</h2></div></header><div class="network-gallery" data-network-gallery></div></div>';
    document.querySelector('.next-project')?.before(section);
  }
  document.querySelectorAll('[data-network-gallery]').forEach(gallery => {
    ['01-dashboard.png', '02-login.png', '03-credential-lab.png', '04-snmp-lab.png', '05-guarded-change.png', '06-labs.png', '07-events.png', '08-incidents.png', '09-detections.png', '10-import.png'].forEach((file, index) => {
      const image = new Image(); image.alt = `NetworkSecLab screenshot ${index + 1}`; image.loading = 'lazy'; image.src = `/public/projects/networkseclab/${file}`;
      image.addEventListener('load', () => { const figure = document.createElement('figure'); figure.append(image); gallery.append(figure); });
    });
  });

  document.querySelectorAll('[data-signal-field]').forEach(field => {
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 96; index += 1) {
      const cell = document.createElement('i');
      cell.style.setProperty('--cell', String(index));
      cell.style.setProperty('--energy', String(((index * 17) % 11) / 10));
      fragment.append(cell);
    }
    field.append(fragment);
  });

  if (!reducedMotion.matches && matchMedia('(pointer:fine)').matches) {
    const aura = document.querySelector('.pointer-aura');
    let pointerX = innerWidth / 2, pointerY = innerHeight / 2, auraX = pointerX, auraY = pointerY;
    addEventListener('pointermove', event => { pointerX = event.clientX; pointerY = event.clientY; root.style.setProperty('--pointer-x', `${pointerX}px`); root.style.setProperty('--pointer-y', `${pointerY}px`); }, { passive: true });
    const animateAura = () => { auraX += (pointerX - auraX) * .12; auraY += (pointerY - auraY) * .12; if (aura) aura.style.transform = `translate3d(${auraX}px,${auraY}px,0)`; requestAnimationFrame(animateAura); };
    animateAura();

    const glyphs = '01/<>[]{}—';
    document.querySelectorAll('[data-scramble]').forEach(title => title.addEventListener('pointerenter', () => {
      const finalText = title.dataset.scramble; let frame = 0; clearInterval(title.scrambleTimer);
      title.scrambleTimer = setInterval(() => {
        title.textContent = [...finalText].map((character, index) => character === ' ' ? ' ' : index < frame ? character : glyphs[Math.floor(Math.random() * glyphs.length)]).join('');
        frame += .65; if (frame >= finalText.length) { clearInterval(title.scrambleTimer); title.textContent = finalText; }
      }, 34);
    }));

    document.querySelectorAll('.profile-links a,.open-mark,.theme-toggle').forEach(target => {
      target.addEventListener('pointermove', event => { const rect = target.getBoundingClientRect(); target.style.setProperty('--magnet-x', `${(event.clientX - rect.left - rect.width / 2) * .16}px`); target.style.setProperty('--magnet-y', `${(event.clientY - rect.top - rect.height / 2) * .16}px`); });
      target.addEventListener('pointerleave', () => { target.style.setProperty('--magnet-x', '0px'); target.style.setProperty('--magnet-y', '0px'); });
    });
  }

  document.querySelectorAll('[data-year]').forEach(element => { element.textContent = String(new Date().getFullYear()); });
})();
