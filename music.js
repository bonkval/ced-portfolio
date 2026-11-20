// Load Spotify only when the visitor asks to open the player.
export function initMusicPlayer() {
  const actions = document.querySelector('.header-actions');
  if (!actions) return;
  const track = '0UOG0zUn7t8m8QcxfzR7AH';
  const trackUrl = `https://open.spotify.com/track/${track}`;
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'music-toggle';
  button.innerHTML = '<span aria-hidden="true">&#9834;</span>';
  button.setAttribute('aria-label', 'Open Spotify music player');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'portfolio-music');
  button.title = 'Music: Bleachers';
  actions.prepend(button);

  const panel = document.createElement('section');
  panel.id = 'portfolio-music'; panel.className = 'music-panel'; panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Spotify music player');
  panel.innerHTML = '<header><h2>Music</h2><button type="button" class="music-close" aria-label="Close music player and stop playback">&#215;</button></header><p class="music-status" role="status"></p><div class="music-frame"></div><a class="music-spotify-link" target="_blank" rel="noopener noreferrer">Open in Spotify &nearr;</a>';
  panel.querySelector('a').href = trackUrl;
  const mount = panel.querySelector('.music-frame');
  const closeButton = panel.querySelector('button');
  document.body.append(panel);
  let animation;
  let open = false;
  function close(restoreFocus = true) {
    animation?.cancel();
    open = false;
    // Removing the iframe actually stops sound; hiding it alone would not.
    mount.replaceChildren();
    panel.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open Spotify music player');
    button.innerHTML = '<span aria-hidden="true">&#9834;</span>';
    button.title = 'Music: Bleachers';
    if (restoreFocus) button.focus({ preventScroll: true });
  }
  function show() {
    animation?.cancel();
    open = true; panel.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Close music player and stop playback');
    button.innerHTML = '<span aria-hidden="true">&#215;</span>';
    button.title = 'Close player and stop music';
    const frame = document.createElement('iframe');
    const status = panel.querySelector('.music-status');
    status.textContent = 'Loading Spotify…';
    frame.title = "Merry Christmas, Please Don't Call by Bleachers — Spotify player";
    frame.src = `https://open.spotify.com/embed/track/${track}?utm_source=generator&theme=0`;
    frame.width = '100%'; frame.height = '152';
    frame.allow = 'autoplay; encrypted-media';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.addEventListener('load', () => { if (open) status.textContent = 'Press Play in Spotify to listen.'; });
    mount.replaceChildren(frame);
    const quiet = matchMedia('(prefers-reduced-motion: reduce)').matches;
    animation = panel.animate(quiet ? [{opacity:0},{opacity:1}] : [
      {opacity:0, transform:'translateY(-8px) scale(.97)'},
      {opacity:1, transform:'translateY(0) scale(1)'}
    ], {duration:quiet ? 120 : 260, easing:'cubic-bezier(.16,1,.3,1)'});
    closeButton.focus({ preventScroll:true });
  }
  button.addEventListener('click', () => open ? close() : show());
  closeButton.addEventListener('click', () => close());
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && open) { event.preventDefault(); close(); }
  });
  addEventListener('pagehide', () => close(false));
}
