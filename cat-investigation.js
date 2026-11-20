const paw = '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><ellipse cx="16" cy="22" rx="8" ry="6"/><ellipse cx="7" cy="13" rx="3" ry="4" transform="rotate(-25 7 13)"/><ellipse cx="14" cy="8" rx="3" ry="4"/><ellipse cx="22" cy="9" rx="3" ry="4"/><ellipse cx="27" cy="15" rx="3" ry="4" transform="rotate(25 27 15)"/></svg>';

export function initCatInvestigation(enabled) {
  const portrait = document.querySelector('.hero .profile-wrap');
  const row = document.querySelector('.hero .about-copy');
  if (!portrait || !row) return;
  portrait.tabIndex = 0;
  portrait.setAttribute('role', 'button');
  portrait.setAttribute('aria-label', 'Reveal the hidden cat. Activate again to follow it.');
  const hint = document.createElement('button');
  hint.className = 'cat-hint'; hint.type = 'button';
  hint.innerHTML = `${paw}<span>Find the cat</span>`;
  portrait.after(hint);
  const folder = document.createElement('button');
  folder.type = 'button'; folder.className = 'cat-folder'; folder.hidden = true;
  folder.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 7V5h7l2 2h9v13H3Z"/><path d="M3 10h18"/></svg><span>Sealed note</span>';
  folder.setAttribute('aria-expanded', 'false'); folder.setAttribute('aria-controls', 'cat-case');
  row.append(folder);
  const note = document.createElement('section');
  note.id = 'cat-case'; note.className = 'cat-case'; note.hidden = true;
  note.setAttribute('aria-labelledby', 'cat-case-title');
  note.innerHTML = '<div><p class="interaction-label">Recovered note</p><h2 id="cat-case-title">The cat stayed.</h2><p>The portrait and the cat behind it were part of the original portfolio. During the redesign, the original mosaic hover was restored and the extra particles over the portrait were removed.</p><a class="text-link" href="https://github.com/bonkval/ced-portfolio/commit/315ac3b" target="_blank" rel="noopener noreferrer">Portfolio redesign source &nearr;</a></div><div class="cat-terminal"><span>cat /notes/portfolio</span><pre>Mosaic reveal: preserved\nFace particles: removed\nVerdict: keep the cat.</pre><small>A fictional terminal, a real design decision.</small></div>';
  row.after(note);
  const announcement = document.createElement('span');
  announcement.className = 'sr-only'; announcement.setAttribute('role', 'status'); row.append(announcement);
  let running = false, timer, trail;
  let found = false;
  try { found = sessionStorage.getItem('portfolio-cat-found') === 'yes'; } catch {}
  function markFound() {
    hint.querySelector('span').textContent = 'Cat found';
    folder.hidden = false;
  }
  if (found) markFound();
  function showNote() {
    clearTimeout(timer);
    running = false; trail?.remove();
    found = true; markFound();
    try { sessionStorage.setItem('portfolio-cat-found', 'yes'); } catch {}
    note.hidden = false;
    folder.setAttribute('aria-expanded', 'true');
    folder.querySelector('span').textContent = 'Cat found';
    announcement.textContent = 'Cat found. Recovered note opened below the contact links.';
  }
  function follow() {
    if (running) return;
    if (found) { note.hidden = !note.hidden; folder.setAttribute('aria-expanded', String(!note.hidden)); return; }
    running = true; folder.hidden = false;
    if (!enabled()) { showNote(); return; }
    const from = portrait.getBoundingClientRect(), to = folder.getBoundingClientRect();
    trail = document.createElement('div'); trail.className = 'cat-paw-trail'; trail.setAttribute('aria-hidden', 'true');
    document.body.append(trail);
    const start = { x: from.left + from.width * .6, y: from.bottom - 15 };
    const end = { x: to.left + to.width * .5, y: to.top + to.height * .5 };
    for (let i = 0; i < 10; i++) {
      const t = i / 9, print = document.createElement('span');
      print.innerHTML = paw;
      const x = start.x + (end.x-start.x)*t + Math.sin(t*Math.PI)*-55;
      const y = start.y + (end.y-start.y)*t + (i%2 ? 6 : -6);
      print.style.left = `${x}px`; print.style.top = `${y}px`; print.style.rotate = `${-25 + t*70}deg`;
      trail.append(print);
      print.animate([{opacity:0,scale:.65},{opacity:.7,scale:1,offset:.25},{opacity:0,scale:1.1}],{duration:700,delay:i*115,fill:'both',easing:'ease-out'});
      const disturbance = document.createElement('i'); disturbance.className = 'cat-ascii-disturbance'; disturbance.textContent = ' : / + : ';
      disturbance.style.left = `${x-20}px`; disturbance.style.top = `${y+12}px`; trail.append(disturbance);
      disturbance.animate([{opacity:0,translate:'0 0'},{opacity:.5,offset:.3},{opacity:0,translate:'0 12px'}],{duration:650,delay:i*115,fill:'both'});
    }
    timer = setTimeout(showNote, 1800);
  }
  function reveal() {
    if (portrait.classList.contains('cat-peek')) { follow(); return; }
    portrait.classList.add('cat-peek');
    portrait.setAttribute('aria-label', 'Follow the revealed cat to its hidden note.');
    hint.querySelector('span').textContent = found ? 'Cat found' : 'Follow the cat';
  }
  hint.addEventListener('click', () => found ? follow() : reveal());
  portrait.addEventListener('click', event => {
    if (event.pointerType === 'mouse') follow();
    else reveal();
  });
  portrait.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); reveal(); }
  });
  folder.addEventListener('click', () => running ? showNote() : follow());
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && running) { clearTimeout(timer); trail?.remove(); running = false; }
  });
}
