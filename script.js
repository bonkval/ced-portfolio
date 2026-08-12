(() => {
  const root = document.documentElement;
  if (!document.querySelector('link[href="/brand-dots.css"]')) { const dotStyles = document.createElement('link'); dotStyles.rel = 'stylesheet'; dotStyles.href = '/brand-dots.css'; document.head.append(dotStyles); }
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
    hobbyPost.querySelector('.post-caption').lastChild.textContent = ' Photos coming soon.';
    hobbyPost.querySelectorAll('.post-slide').forEach((slide, index) => {
      slide.textContent = '';
      const photo = document.createElement('img'); photo.className = 'post-photo'; photo.alt = `Hobby photo ${index + 1}`; photo.src = '/public/assets/hobbies/placeholder.jpg';
      photo.addEventListener('error', () => photo.classList.add('missing'));
      slide.append(photo);
    });
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

  document.querySelector('[data-contact-form]')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name')).trim();
    const email = String(data.get('email')).trim();
    const message = String(data.get('message')).trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`);
    const status = form.querySelector('[data-form-status]');
    if (status) status.textContent = 'Opening your email app…';
    window.location.href = `mailto:cedrickvales1111@gmail.com?subject=${subject}&body=${body}`;
  });

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
  navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', event => {
    const targetId = new URL(link.href, location.href).hash;
    const target = targetId ? document.querySelector(targetId) : null;
    if (!target) { closeMenu(); return; }
    event.preventDefault(); closeMenu();
    const start = scrollY, destination = Math.max(0, target.getBoundingClientRect().top + scrollY - 90);
    const distance = destination - start, duration = Math.min(1450, Math.max(500, Math.abs(distance) * .34));
    const began = performance.now();
    const tick = now => { const progress = Math.min(1, (now - began) / duration); const eased = 1 - Math.pow(1 - progress, 4); scrollTo(0, start + distance * eased); if (progress < 1) requestAnimationFrame(tick); else history.replaceState(null, '', targetId); };
    requestAnimationFrame(tick);
  }));

  const routeLayer = document.createElement('div');
  routeLayer.className = 'route-layer'; routeLayer.setAttribute('aria-hidden', 'true');
  routeLayer.innerHTML = '<i></i><b></b>'; document.body.append(routeLayer);
  requestAnimationFrame(() => routeLayer.classList.add('route-enter'));
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
