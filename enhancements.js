import { animate, inView } from 'motion';
import { initAscii } from './ascii.js';
import { initCinematic } from './cinematic.js';
import { initInteractions } from './interactions.js';

const root = document.documentElement;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionEnabled = () => root.dataset.motion !== 'paused';
if (motionEnabled()) root.classList.add('js-motion');

const themeButton = document.querySelector('.theme-toggle');
if (themeButton) {
  const actions = document.createElement('div');
  actions.className = 'header-actions';
  themeButton.before(actions);
  actions.append(themeButton);
}
reducedMotion.addEventListener('change', () => {
  root.dataset.motion = reducedMotion.matches ? 'paused' : 'full';
  root.classList.toggle('js-motion', !reducedMotion.matches);
  document.dispatchEvent(new Event('portfolio:motion'));
});

initAscii(motionEnabled);
initCinematic(motionEnabled);
initInteractions(motionEnabled);

// Native scrolling remains available for trackpads, touch and the scrollbar.
document.querySelectorAll('[data-project-rail]').forEach((rail, railIndex) => {
  const cards = [...rail.querySelectorAll(':scope > a')];
  if (cards.length < 2) return;
  rail.id ||= `project-rail-${railIndex + 1}`;
  rail.tabIndex = 0;
  rail.setAttribute('role', 'region');
  rail.setAttribute('aria-roledescription', 'carousel');
  const controls = document.createElement('div');
  controls.className = 'project-rail-controls';
  controls.hidden = true;
  controls.innerHTML = `<span class="project-rail-hint">Drag or swipe to explore</span><button type="button" class="project-rail-button" aria-label="Previous project" aria-controls="${rail.id}">←</button><span class="project-rail-status" aria-live="polite" aria-atomic="true"></span><button type="button" class="project-rail-button" aria-label="Next project" aria-controls="${rail.id}">→</button>`;
  const progress = document.createElement('div');
  progress.className = 'gallery-scrubber';
  progress.innerHTML = `<span aria-hidden="true">01</span><input type="range" min="0" max="1000" step="1" value="0" aria-label="Browse projects" aria-controls="${rail.id}"><span aria-hidden="true">${String(cards.length).padStart(2,'0')}</span>`;
  const scrubber = progress.querySelector('input');
  rail.before(controls);
  rail.after(progress);
  const [previous, next] = controls.querySelectorAll('button');
  previous.hidden = true;
  next.hidden = true;
  controls.querySelector('.project-rail-hint').textContent = `${cards.length} projects · Scroll, drag, or swipe`;
  const help = document.createElement('span');
  help.id = `${rail.id}-help`;
  help.className = 'sr-only';
  help.textContent = 'Use the left and right arrow keys to browse projects. Home and End jump to the first and last project.';
  controls.append(help);
  rail.setAttribute('aria-describedby', help.id);
  const status = controls.querySelector('.project-rail-status');
  let active = 0, animation, frame = 0, drag, suppressClick = false;
  const maxScroll = () => Math.max(0, rail.scrollWidth - rail.clientWidth);
  let positions = [];
  const measure = () => { const max = maxScroll(); positions = cards.map(card => Math.min(max,card.offsetLeft-rail.offsetLeft)); };
  measure();
  const position = index => positions[index] || 0;
  const update = () => {
    const current = rail.scrollLeft;
    active = cards.reduce((closest, card, index) => Math.abs(position(index) - current) < Math.abs(position(closest) - current) ? index : closest, 0);
    if (current >= maxScroll() - 3) active = cards.length - 1;
    const label = `${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    if (status.textContent !== label) status.textContent = label;
    previous.disabled = current <= 3;
    next.disabled = current >= maxScroll() - 3;
    progress.style.setProperty('--rail-progress', String((current + rail.clientWidth) / rail.scrollWidth));
    scrubber.value = String(Math.round(maxScroll() ? current / maxScroll() * 1000 : 0));
    scrubber.setAttribute('aria-valuetext', `Project ${active + 1} of ${cards.length}`);
    progress.style.setProperty('--scrub-progress', `${scrubber.value / 10}%`);
  };
  const cancel = () => { animation?.stop(); animation = undefined; };
  scrubber.addEventListener('input', () => {
    cancel();
    rail.classList.remove('is-dragging');
    rail.scrollLeft = maxScroll() * Number(scrubber.value) / 1000;
    wheelTarget = rail.scrollLeft;
  });
  const goTo = (index, velocity = 0) => {
    cancel();
    const target = position(Math.max(0, Math.min(cards.length - 1, index)));
    if (!motionEnabled()) {
      rail.scrollLeft = target;
      rail.classList.remove('is-dragging');
      update();
      return;
    }
    rail.classList.add('is-dragging');
    animation = animate(rail.scrollLeft, target, {
      type: 'spring', stiffness: 155, damping: 26, velocity,
      onUpdate: value => { rail.scrollLeft = value; },
      onComplete: () => { rail.classList.remove('is-dragging'); update(); }
    });
  };
  const step = direction => {
    const current = rail.scrollLeft;
    const indices = cards.map((card, index) => index);
    if (direction < 0) indices.reverse();
    const target = indices.find(index => direction > 0 ? position(index) > current + 4 : position(index) < current - 4);
    if (target !== undefined) goTo(target);
  };
  previous.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  rail.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') goTo(0);
    else if (event.key === 'End') goTo(cards.length - 1);
    else step(event.key === 'ArrowRight' ? 1 : -1);
  });
  let wheelTarget = rail.scrollLeft;
  rail.addEventListener('wheel', event => {
    if (event.ctrlKey) return;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if ((delta < 0 && rail.scrollLeft <= 1) || (delta > 0 && rail.scrollLeft >= maxScroll() - 1)) return;
    event.preventDefault();
    if (!animation) wheelTarget = rail.scrollLeft;
    cancel();
    if (!motionEnabled()) { rail.scrollLeft = Math.max(0, Math.min(maxScroll(), rail.scrollLeft + delta)); return; }
    rail.classList.add('is-dragging');
    wheelTarget = Math.max(0, Math.min(maxScroll(), wheelTarget + delta * (event.deltaMode === 1 ? 30 : 1)));
    animation = animate(rail.scrollLeft, wheelTarget, {type:'spring', stiffness:110, damping:28, onUpdate:value=>{rail.scrollLeft=value;}, onComplete:()=>{animation=undefined;rail.classList.remove('is-dragging');}});
  }, { passive: false });
  rail.addEventListener('dragstart', event => event.preventDefault());
  rail.addEventListener('pointerdown', event => {
    cancel(); wheelTarget = rail.scrollLeft; rail.classList.remove('is-dragging');
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    suppressClick = false;
    drag = { startX: event.clientX, startY: event.clientY, startScroll: rail.scrollLeft, lastX: event.clientX, lastTime: performance.now(), velocity: 0, moved: false };
  });
  rail.addEventListener('pointermove', event => {
    if (!drag) return;
    const distance = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(distance) < 7) return;
    if (!drag.moved && Math.abs(event.clientY - drag.startY) > Math.abs(distance)) { drag = undefined; return; }
    if (!drag.moved) {
      drag.moved = true;
      rail.setPointerCapture(event.pointerId);
      rail.classList.add('is-dragging');
    }
    const now = performance.now();
    drag.velocity = (drag.lastX - event.clientX) / Math.max(1, now - drag.lastTime) * 1000;
    drag.lastX = event.clientX; drag.lastTime = now;
    rail.scrollLeft = drag.startScroll - distance;
  });
  const finishDrag = event => {
    if (!drag) return;
    const state = drag; drag = undefined;
    if (!state.moved) return;
    if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    suppressClick = true;
    const velocity = performance.now() - state.lastTime < 100 ? Math.max(-2500, Math.min(2500, state.velocity)) : 0;
    const projected = Math.max(0, Math.min(maxScroll(), rail.scrollLeft + velocity * .18));
    const nearest = cards.reduce((best, card, index) => Math.abs(position(index) - projected) < Math.abs(position(best) - projected) ? index : best, 0);
    cancel();
    if (!motionEnabled()) { rail.scrollLeft=projected;rail.classList.remove('is-dragging'); }
    else animation = animate(rail.scrollLeft, projected, {type:'spring', stiffness:80, damping:22, velocity, onUpdate:value=>{rail.scrollLeft=value;},onComplete:()=>{animation=undefined;rail.classList.remove('is-dragging');}});
    wheelTarget = projected;
  };
  rail.addEventListener('pointerup', finishDrag);
  rail.addEventListener('pointercancel', event => { finishDrag(event); suppressClick = false; });
  rail.addEventListener('lostpointercapture', () => { drag = undefined; });
  rail.addEventListener('click', event => {
    if (!suppressClick) return;
    event.preventDefault(); event.stopImmediatePropagation(); suppressClick = false;
  }, true);
  rail.addEventListener('scroll', () => {
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; update(); });
  }, { passive: true });
  document.addEventListener('portfolio:motion', () => {
    if (!motionEnabled()) { cancel(); rail.classList.remove('is-dragging'); }
  });
  new ResizeObserver(() => { measure(); update(); }).observe(rail);
  update();
});

const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
sections.forEach(section => sectionObserver.observe(section));
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const menu = document.querySelector('.menu-button');
  if (menu?.getAttribute('aria-expanded') === 'true') { menu.click(); menu.focus(); }
});

if (motionEnabled()) {
  inView('.project-card', card => {
    const image = card.querySelector('.project-image img');
    if (image && motionEnabled()) animate(image, { opacity: [0, 1], scale: [1.06, 1] }, { duration: 1.1, ease: [.16, 1, .3, 1] });
  }, { amount: .2 });
}
