(() => {
  const root = document.documentElement;
  if (!document.querySelector('link[rel~="icon"]')) { const icon = document.createElement('link'); icon.rel = 'icon'; icon.type = 'image/svg+xml'; icon.href = '/favicon-cat.svg'; document.head.append(icon); }
  const themeButton = document.querySelector('.theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  let storedTheme;
  try { storedTheme = localStorage.getItem('cedrick-theme'); } catch {}
  const systemTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  document.querySelectorAll('.identity-name').forEach(name => { name.textContent = 'CRDV'; });
  document.querySelectorAll('.identity-role').forEach(role => role.remove());
  document.querySelectorAll('.footer').forEach(footer => {
    if (footer.querySelector('.site-update')) return;
    const update = document.createElement('span');
    update.className = 'site-update';
    update.textContent = 'Made with curiosity & care';
    footer.prepend(update);
  });
  const cvBack = document.querySelector('.cv-preview .back-link');
  if (cvBack) cvBack.textContent = '← Back to portfolio';
  document.querySelectorAll('.case-kicker span:first-child').forEach(label => { label.textContent = 'Project'; });
  document.querySelectorAll('.back-link').forEach(link => { link.textContent = '← Back to Projects'; });

  // Keep the page personal and direct while the editable placeholders remain easy to replace.
  if (cvBack) cvBack.textContent = '← Back to portfolio';
  const hero = document.querySelector('.hero');
  const aboutSection = document.querySelector('.about');
  document.querySelectorAll('.site-nav a[href$="#work"]').forEach(link => { link.textContent = 'Projects'; });
  const work = document.querySelector('.work');
  const moreWork = document.querySelector('.project-index-section');
  if (hero && work) hero.after(work);
  if (work && moreWork) work.after(moreWork);
  document.querySelectorAll('.section-label').forEach(label => { label.textContent = label.textContent.replace(/^\d+\s*[—-]\s*/, ''); });
  const principles = ['Curious', 'Methodical', 'Defensive', 'Accountable'];
  document.querySelectorAll('.principles span').forEach((item, index) => { item.textContent = principles[index] || item.textContent; });
  const cvCopy = document.querySelector('.cv-copy');
  cvCopy?.querySelector('code')?.parentElement.remove();
  const cvActions = cvCopy?.querySelector('.cv-actions');
  if (cvActions) cvActions.innerHTML = '<a class="text-link" href="/public/Cedrick-Vales-CV.pdf" download>Download CV <span aria-hidden="true"><svg class="ui-arrow" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 15 15 5M5 5h10v10"/></svg></span></a>';
  if (cvCopy) cvCopy.querySelector('h2').textContent = 'My experience, on paper.';
  const certificateList = document.querySelector('.cert-list');
  const certificates = window.PORTFOLIO_CERTIFICATIONS || [];
  if (certificateList && certificates.length) {
    certificateList.replaceChildren(...certificates.map(certificate => {
      const item = document.createElement('article');
      item.className = 'cert reveal';
      const image = document.createElement('img');
      image.className = 'cert-image'; image.loading = 'lazy'; image.decoding = 'async'; image.src = certificate.image; image.alt = `${certificate.title} certificate badge`;
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

  function setThemeState(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      const label = themeButton.querySelector('[data-theme-label]');
      if (label) label.textContent = '';
      const symbol = themeButton.querySelector('.theme-symbol');
      if (symbol) symbol.innerHTML = dark
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.9 13.1A9 9 0 0 1 10.9 3.1 9 9 0 1 0 20.9 13.1Z"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>';
      themeButton.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    }
    if (themeMeta) themeMeta.content = dark ? '#000000' : '#ffffff';
    try { localStorage.setItem('cedrick-theme', theme); } catch {}
    document.dispatchEvent(new Event('portfolio:theme'));
  }

  let themeTransition;
  let themeRequest = 0;
  let requestedTheme;
  async function applyTheme(theme, origin) {
    const request = ++themeRequest;
    requestedTheme = theme;
    if (!origin) { setThemeState(theme); return; }
    if (themeTransition) {
      themeTransition.skipTransition();
      await themeTransition.finished.catch(() => {});
    }
    if (request !== themeRequest) return;
    if (!document.startViewTransition) { setThemeState(theme); return; }
    root.dataset.themeWaving = 'true';
    const transition = document.startViewTransition(() => setThemeState(theme));
    themeTransition = transition;
    try {
      await transition.ready;
      const radius = Math.hypot(Math.max(origin.x, innerWidth-origin.x), Math.max(origin.y, innerHeight-origin.y));
      await root.animate([
        { clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` },
        { clipPath: `circle(${radius}px at ${origin.x}px ${origin.y}px)` }
      ], { duration: reducedMotion.matches ? 380 : 850, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'both', pseudoElement: '::view-transition-new(root)' }).finished;
    } catch { transition.skipTransition(); }
    await transition.finished.catch(() => {});
    if (themeTransition === transition) { themeTransition = undefined; delete root.dataset.themeWaving; }
  }

  applyTheme(storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : systemTheme);
  themeButton?.addEventListener('click', event => {
    const rect = event.currentTarget.getBoundingClientRect();
    applyTheme((requestedTheme || root.dataset.theme) === 'dark' ? 'light' : 'dark', { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  });

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

  if (!reducedMotion.matches && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(frame => {
      frame.addEventListener('pointermove', event => {
        const rect = frame.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width; const y = (event.clientY - rect.top) / rect.height;
        frame.style.setProperty('--mx', `${x * 100}%`); frame.style.setProperty('--my', `${y * 100}%`);
      });
      frame.addEventListener('pointerleave', () => {});
    });
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
    target.scrollIntoView({ behavior: reducedMotion.matches || root.dataset.motion === 'paused' ? 'instant' : 'smooth', block: 'start' });
    history.replaceState(null, '', targetId);
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
    setTimeout(() => { window.location.assign(destination.href); }, reducedMotion.matches || root.dataset.motion === 'paused' ? 0 : 320);
  }));

  document.querySelectorAll('.profile-image').forEach(image => {
    if (image.complete && image.naturalWidth === 0) image.classList.add('missing');
    image.addEventListener('error', () => image.classList.add('missing'));
  });

  const profileWrap = document.querySelector('.profile-wrap');
  document.querySelector('.profile-image')?.setAttribute('src', '/public/assets/profile/profile.webp');
  document.querySelector('.profile-image.secondary')?.setAttribute('src', '/public/assets/profile/profile2.webp');
  document.querySelectorAll('.profile-image').forEach(image => {
    image.classList.remove('missing');
    image.addEventListener('load', () => image.classList.remove('missing'));
  });
  if (profileWrap) {
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
    let mosaicFrame = 0;
    let mosaicActive = false;
    const updateProfileMosaic = event => {
      if (!profileWrap.contains(event.target)) {
        if (mosaicActive) tiles.forEach(tile => { tile.style.setProperty('--tile-opacity','0'); tile.style.setProperty('--tile-scale','.72'); });
        mosaicActive = false; return;
      }
      mosaicActive = true;
      const rect = profileWrap.getBoundingClientRect();
      const pointerX = (event.clientX - rect.left) / rect.width, pointerY = (event.clientY - rect.top) / rect.height;
      tiles.forEach(tile => {
        const distance = Math.hypot(pointerX - Number(tile.dataset.x), pointerY - Number(tile.dataset.y));
        const withinPortrait = pointerX >= 0 && pointerX <= 1 && pointerY >= 0 && pointerY <= 1;
        const strength = withinPortrait ? Math.max(0, 1 - distance / .42 - Number(tile.dataset.bias)) : 0;
        const visible = strength > .12;
        if (tile.dataset.visible === String(visible)) return;
        tile.dataset.visible = String(visible);
        tile.style.setProperty('--tile-opacity', visible ? '1' : '0');
        tile.style.setProperty('--tile-scale', visible ? '1' : '.72');
      });
    };
    document.addEventListener('pointermove', event => {
      if (mosaicFrame) return;
      mosaicFrame = requestAnimationFrame(() => { mosaicFrame = 0; updateProfileMosaic(event); });
    }, { passive: true });
  }

  if (matchMedia('(any-pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.setAttribute('aria-hidden', 'true');
    cursor.style.cssText = 'position:fixed;left:0;top:0;width:24px;height:24px;margin:-12px 0 0 -12px;border:1px solid currentColor;border-radius:50%;z-index:2147483647;pointer-events:none;opacity:0;color:#fff;mix-blend-mode:difference;box-shadow:0 0 0 5px rgba(255,255,255,.12),0 0 18px rgba(255,255,255,.65);will-change:transform';
    const cursorCore = document.createElement('i'); cursorCore.style.cssText = 'position:absolute;left:50%;top:50%;width:4px;height:4px;border-radius:50%;background:currentColor;transform:translate(-50%,-50%)'; cursor.append(cursorCore);
    cursor.classList.add('portfolio-cursor');
    document.body.append(cursor);
    const clickableSelector = 'a[href],button:not(:disabled),[role="button"],[data-project-rail],.hero-portrait .profile-wrap';
    const updateCursorTarget = event => {
      const target = event.target instanceof Element ? event.target.closest(clickableSelector) : null;
      const clickable = Boolean(target && target.getAttribute('aria-disabled') !== 'true');
      cursor.classList.toggle('is-clickable', clickable);
    };
    document.addEventListener('pointerover', updateCursorTarget, { passive: true });
    document.addEventListener('pointerout', event => {
      const target = event.relatedTarget instanceof Element ? event.relatedTarget.closest(clickableSelector) : null;
      cursor.classList.toggle('is-clickable', Boolean(target && target.getAttribute('aria-disabled') !== 'true'));
    }, { passive: true });
    document.addEventListener('pointerdown', () => cursor.classList.add('is-pressed'), { passive: true });
    document.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'), { passive: true });
    addEventListener('blur', () => { cursor.classList.remove('is-clickable', 'is-pressed'); cursor.style.opacity = '0'; });
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

  document.querySelectorAll('[data-year]').forEach(element => { element.textContent = String(new Date().getFullYear()); });
})();
