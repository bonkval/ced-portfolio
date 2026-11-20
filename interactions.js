import { animate, inView, springValue } from 'motion';

export function initInteractions(enabled) {
  const ease = [.16, 1, .3, 1];
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;

  document.querySelectorAll('[data-copy-email]').forEach(button => {
    const feedback = button.querySelector('[role="status"]');
    let timer;
    button.addEventListener('click', async () => {
      clearTimeout(timer);
      try {
        await navigator.clipboard.writeText(button.dataset.copyEmail);
        button.classList.add('is-copied');
        feedback.textContent = 'Copied!';
      } catch {
        // Keep the address available when clipboard access is blocked.
        button.classList.add('copy-unavailable');
        feedback.textContent = button.dataset.copyEmail;
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(feedback);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      timer = setTimeout(() => {
        button.classList.remove('is-copied', 'copy-unavailable');
        feedback.textContent = 'Copy email';
      }, 3500);
    });
  });

  // Two visual faces, one accessible link name. Navigation rolls toward its destination.
  document.querySelectorAll('.site-nav a').forEach(link => {
    const text = link.textContent;
    const wrapper = document.createElement('span');
    wrapper.className = 'nav-roll';
    const face = document.createElement('span');
    face.className = 'nav-face'; face.textContent = text;
    const echo = face.cloneNode(true);
    echo.className = 'nav-echo'; echo.setAttribute('aria-hidden', 'true');
    wrapper.append(face, echo);
    link.replaceChildren(wrapper);
  });

  if (enabled()) {
    const hero = document.querySelector('.hero');
    if (hero) {
      const targets = hero.querySelectorAll('.hero-status,.hero-lower>p,.hero-actions>a,.hero-portrait .profile-wrap,.hero-email,.profile-links>a,.profile-links>button');
      animate(targets, { opacity: [0, 1], y: [22, 0] }, {
        duration: .95, delay: index => .12 + index * .065, ease
      });
    }
  }

  // Compact documentation gains a deliberate reading sequence instead of a wall of text.
  document.querySelectorAll('.compact-facts article,.compact-preview,.resume-pages figure,.screenshot-card').forEach((element, index) => {
    inView(element, () => {
      if (!enabled()) return;
      const properties = element.matches('.compact-preview,.resume-pages figure')
        ? { opacity: [0, 1] }
        : { opacity: [0, 1], y: [30, 0], scale: [.98, 1] };
      animate(element, properties, {
        duration: .85, delay: index % 4 * .075, ease
      });
    }, { amount: .15 });
  });

  const certificates = [...document.querySelectorAll('.cert')];
  const certificateAnimations = new Map();
  function revealCertificate(card, fullMotion, delay = 0) {
    certificateAnimations.get(card)?.forEach(control => control.stop());
    const badge = card.querySelector('.cert-image');
    const copy = card.querySelector(':scope > div');
    const date = card.querySelector(':scope > span:last-child');
    const controls = [];
    if (badge) controls.push(animate(badge,
      fullMotion ? { opacity: [.1, 1], scale: [.55, 1], rotate: [-14, 0] } : { opacity: [.15, 1] },
      { duration: fullMotion ? 1 : .65, delay, ease }));
    if (copy) controls.push(animate(copy,
      fullMotion ? { opacity: [0, 1], x: [24, 0] } : { opacity: [.15, 1] },
      { duration: .75, delay: delay + .12, ease }));
    if (date) controls.push(animate(date,
      fullMotion ? { opacity: [0, 1], y: [10, 0] } : { opacity: [.15, 1] },
      { duration: .65, delay: delay + .25, ease }));
    certificateAnimations.set(card, controls);
  }
  certificates.forEach((card, index) => {
    inView(card, () => { revealCertificate(card, enabled(), index % 2 * .12); }, { amount: .4 });
  });
  const footer = document.querySelector('.footer');
  if (footer) inView(footer, () => {
    if (enabled()) animate(footer.children, { opacity: [0, 1], y: [12, 0] }, {
      duration: .65, delay: index => index * .08, ease
    });
  });

  // Preview depth runs only while a pointer is interacting; there is no idle loop.
  if (fine) document.querySelectorAll('.compact-preview,.resume-pages figure').forEach(surface => {
    let frame = 0;
    const x = springValue(0, { stiffness: 150, damping: 24 });
    const y = springValue(0, { stiffness: 150, damping: 24 });
    x.on('change', value => surface.style.setProperty('--preview-rx', `${value}deg`));
    y.on('change', value => surface.style.setProperty('--preview-ry', `${value}deg`));
    surface.addEventListener('pointermove', event => {
      if (!enabled() || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const bounds = surface.getBoundingClientRect();
        x.set(-((event.clientY - bounds.top) / bounds.height - .5) * 3);
        y.set(((event.clientX - bounds.left) / bounds.width - .5) * 4);
      });
    }, { passive: true });
    surface.addEventListener('pointerleave', () => { x.set(0); y.set(0); });
    document.addEventListener('portfolio:motion', () => { if (!enabled()) { x.jump(0); y.jump(0); } });
  });

  // Briefly acknowledge activation without covering link labels or delaying navigation.
  document.querySelectorAll('.button,.text-link,.skill-evidence a,.hero-email,.profile-links a,.back-link,.next-project,.footer a').forEach(link => {
    let feedback;
    link.addEventListener('pointerdown', () => {
      if (!enabled()) return;
      feedback?.cancel();
      feedback = link.animate([{ opacity: 1 }, { opacity: .55 }, { opacity: 1 }], {
        duration: 260, easing: 'ease-out'
      });
    });
  });
}
