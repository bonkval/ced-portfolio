import { animate, inView, springValue } from 'motion';

export function initCinematic(enabled) {
  const fine = matchMedia('(pointer:fine)').matches;
  // Headings resolve in a wave while keeping the accessible name intact.
  document.querySelectorAll('.section-header h2,.resume-heading h1,.compact-case-heading h1').forEach(heading => {
    const text = heading.textContent;
    heading.setAttribute('aria-label', text);
    heading.replaceChildren(...[...text].map((letter, index) => {
      const span = document.createElement('span');
      span.className = 'kinetic-letter';
      span.textContent = letter === ' ' ? '\u00a0' : letter;
      span.setAttribute('aria-hidden', 'true');
      span.style.setProperty('--letter', index);
      return span;
    }));
    inView(heading, () => {
      if (!enabled()) return;
      animate(heading.children, { opacity: [0, 1], y: [28, 0], rotateX: [-65, 0] }, {
        duration: .8, delay: index => index * .025, ease: [.16, 1, .3, 1]
      });
    }, { amount: .6 });
  });

  // Each skill group unfolds in reading order, then its chips follow.
  document.querySelectorAll('.skill-group').forEach((element, index) => {
    inView(element, () => {
      if (!enabled()) return;
      animate(element, { opacity: [0, 1], y: [35, 0], rotateX: [7, 0] }, {
        duration: .85, delay: index % 3 * .07, ease: [.16, 1, .3, 1]
      });
      const chips = element.querySelectorAll('li');
      if (chips.length) animate(chips, { opacity: [0, 1], y: [12, 0] }, {
        duration: .5, delay: i => .15 + i * .035, ease: [.16, 1, .3, 1]
      });
    }, { amount: .2 });
  });

  if (fine) {
    document.querySelectorAll('.project-card').forEach(card => {
      let frame = 0;
      const tiltX = springValue(0, { stiffness:160, damping:24 });
      const tiltY = springValue(0, { stiffness:160, damping:24 });
      tiltX.on('change', value => card.style.setProperty('--tilt-x', `${value}deg`));
      tiltY.on('change', value => card.style.setProperty('--tilt-y', `${value}deg`));
      const tilt = (x,y) => { tiltX.set(x); tiltY.set(y); };
      card.addEventListener('pointermove', event => {
        if (!enabled() || frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--card-x', `${(event.clientX - rect.left) / rect.width * 100}%`);
          card.style.setProperty('--card-y', `${(event.clientY - rect.top) / rect.height * 100}%`);
          card.style.setProperty('--image-x', `${((event.clientX - rect.left) / rect.width - .5) * 9}px`);
          card.style.setProperty('--image-y', `${((event.clientY - rect.top) / rect.height - .5) * 6}px`);
          tilt(-((event.clientY - rect.top) / rect.height - .5) * 5, ((event.clientX - rect.left) / rect.width - .5) * 7);
        });
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        tilt(0, 0);
        card.style.setProperty('--image-x', '0px'); card.style.setProperty('--image-y', '0px');
      });
      card.addEventListener('pointerdown', () => card.classList.add('card-pressed'));
      const release = () => card.classList.remove('card-pressed');
      card.addEventListener('pointerup', release);
      card.addEventListener('pointerleave', release);
      card.addEventListener('pointercancel', release);
      document.addEventListener('portfolio:motion', () => {
        if (!enabled()) { tiltX.jump(0); tiltY.jump(0); }
      });
    });
    document.querySelectorAll('.explore-button,.hero-actions .text-link,.theme-toggle').forEach(button => {
      button.addEventListener('pointermove', event => {
        if (!enabled()) return;
        const rect = button.getBoundingClientRect();
        button.style.translate = `${(event.clientX - rect.left - rect.width / 2) * .16}px ${(event.clientY - rect.top - rect.height / 2) * .2}px`;
      }, { passive: true });
      button.addEventListener('pointerleave', () => { button.style.translate = '0px 0px'; });
    });
  }

  // Draw only in response to input, never continuously while the page is idle.
  if (!fine) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'ascii-wake'; canvas.setAttribute('aria-hidden','true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let width, height, px = -1000, py = -1000, frame = 0, fadeTimer;
  const resize = () => { width = canvas.width = innerWidth; height = canvas.height = innerHeight; };
  resize(); addEventListener('resize',resize,{passive:true});
  const clear = () => { canvas.style.opacity='0'; };
  function draw() {
    frame=0;
    if (document.hidden || !enabled()) { clear(); return; }
    ctx.clearRect(0,0,width,height);
    const ink = document.documentElement.dataset.theme === 'dark' ? '255,255,255':'0,0,0';
    ctx.font='11px Consolas,monospace';
    // Restrict work to the small region that can actually be visible.
    for(let x=Math.max(12,Math.floor((px-180)/30)*30+12);x<Math.min(width,px+180);x+=30) {
      if(x>width*.14 && x<width*.86) continue;
      for(let y=Math.max(20,Math.floor((py-180)/32)*32+20);y<Math.min(height,py+180);y+=32){
        const alpha=Math.max(0,1-Math.hypot(x-px,y-py)/180)*.35;
        if(alpha<.02)continue;
        ctx.fillStyle=`rgba(${ink},${alpha})`;
        ctx.fillText('.:+01'[(x+y)%5],x,y);
      }
    }
    canvas.style.opacity='1';
    clearTimeout(fadeTimer);fadeTimer=setTimeout(clear,450);
  }
  addEventListener('pointermove',event=>{px=event.clientX;py=event.clientY;if(!frame && enabled())frame=requestAnimationFrame(draw);},{passive:true});
  document.addEventListener('mouseleave',clear);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();});
  document.addEventListener('portfolio:motion',()=>{if(!enabled())clear();});
}
