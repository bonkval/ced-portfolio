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
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Spotify music player');
  panel.innerHTML = '<header><h2>Music</h2><button type="button" class="music-close" aria-label="Close music player and stop playback">&#215;</button></header><p class="music-status" role="status"></p><div class="music-frame"></div><a class="music-spotify-link" target="_blank" rel="noopener noreferrer">Open in Spotify &nearr;</a>';
  panel.querySelector('a').href = trackUrl;
  const mount = panel.querySelector('.music-frame');
  const closeButton = panel.querySelector('button');
  document.body.append(panel);
  let animation;
  let open = false;
  let controller;
  let session = 0;
  let playbackTimer;
  let apiPromise;
  function minimize(restoreFocus = false) {
    if (!open || panel.hidden) return;
    animation?.cancel();
    panel.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Show music controls');
    button.innerHTML = '<span aria-hidden="true">&#9834;</span>';
    button.title = 'Music playing - show controls';
    if (restoreFocus || panel.contains(document.activeElement)) button.focus({ preventScroll: true });
  }
  function loadApi() {
    if (apiPromise) return apiPromise;
    apiPromise = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Spotify API timed out')), 10000);
      window.onSpotifyIframeApiReady = api => { clearTimeout(timer); resolve(api); };
      const script = document.createElement('script');
      script.src = 'https://open.spotify.com/embed/iframe-api/v1';
      script.async = true;
      script.onerror = () => { clearTimeout(timer); reject(new Error('Spotify API unavailable')); };
      document.head.append(script);
    });
    return apiPromise;
  }
  function close(restoreFocus = true) {
    animation?.cancel();
    open = false;
    session++;
    clearTimeout(playbackTimer);
    if (controller) { try { controller.pause(); controller.destroy(); } catch {} controller = undefined; }
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
    if (open) {
      panel.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-label', 'Minimize music controls');
      button.title = 'Minimize controls - keep music playing';
      return;
    }
    open = true; panel.hidden = false;
    const currentSession = ++session;
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Minimize music controls');
    button.innerHTML = '<span aria-hidden="true">&#215;</span>';
    button.title = 'Minimize controls - keep music playing';
    const frame = document.createElement('iframe');
    const status = panel.querySelector('.music-status');
    status.textContent = 'Loading Spotify…';
    frame.title = "Merry Christmas, Please Don't Call by Bleachers — Spotify player";
    frame.src = `https://open.spotify.com/embed/track/${track}?utm_source=generator&theme=0`;
    frame.width = '100%'; frame.height = '152';
    frame.allow = 'autoplay; encrypted-media';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.addEventListener('load', () => { if (open && session === currentSession) status.textContent = 'Starting music. If it stays silent, press Play below.'; });
    mount.replaceChildren();
    loadApi().then(api => {
      if (!open || session !== currentSession) return;
      const slot = document.createElement('div');
      mount.replaceChildren(slot);
      try {
        api.createController(slot, { url: `${trackUrl}?theme=0`, width: '100%', height: 152 }, player => {
          if (!open || session !== currentSession) { player.destroy(); return; }
          controller = player;
          const iframe = mount.querySelector('iframe');
          if (iframe) { iframe.title = frame.title; iframe.allow = 'autoplay; encrypted-media'; }
          player.addListener('ready', () => {
            if (!open || session !== currentSession) return;
            status.textContent = 'Starting music. If it stays silent, press Play below.';
            try { player.play(); } catch { status.textContent = 'Press Play in Spotify to listen.'; }
            playbackTimer = setTimeout(() => {
              if (open && session === currentSession) status.textContent = 'If the music is silent, press Play below.';
            }, 4000);
          });
          player.addListener('playback_started', () => {
            if (!open || session !== currentSession) return;
            clearTimeout(playbackTimer);
            status.textContent = 'Playing Bleachers via Spotify.';
          });
          player.addListener('playback_update', event => {
            if (!open || session !== currentSession) return;
            if (!event.data.isPaused && !event.data.isBuffering) {
              clearTimeout(playbackTimer);
              status.textContent = 'Playing Bleachers via Spotify.';
            } else if (event.data.isPaused) status.textContent = 'Paused. Press Play below to resume.';
          });
        });
      } catch {
        mount.replaceChildren(frame);
        status.textContent = 'Press Play in Spotify to listen.';
      }
    }).catch(() => {
      if (open && session === currentSession) {
        mount.replaceChildren(frame);
        status.textContent = 'Press Play in Spotify to listen.';
      }
    });
    const quiet = matchMedia('(prefers-reduced-motion: reduce)').matches;
    animation = panel.animate(quiet ? [{opacity:0},{opacity:1}] : [
      {opacity:0, transform:'translateY(-8px) scale(.97)'},
      {opacity:1, transform:'translateY(0) scale(1)'}
    ], {duration:quiet ? 120 : 260, easing:'cubic-bezier(.16,1,.3,1)'});
    closeButton.focus({ preventScroll:true });
  }
  button.addEventListener('click', () => open && !panel.hidden ? minimize(true) : show());
  // Collapse controls without unloading the Spotify frame or interrupting playback.
  document.addEventListener('pointerdown', event => {
    if (!panel.contains(event.target) && !button.contains(event.target)) minimize();
  });
  addEventListener('scroll', () => minimize(), { passive: true });
  closeButton.addEventListener('click', () => close());
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && open) { event.preventDefault(); minimize(true); }
  });
  addEventListener('pagehide', () => close(false));
}
