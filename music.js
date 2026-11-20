// Spotify loads only after a visitor clicks the header track.
export function initMusicPlayer() {
  const actions = document.querySelector('.header-actions');
  if (!actions) return;
  const trackUrl = 'https://open.spotify.com/track/0UOG0zUn7t8m8QcxfzR7AH';
  const track = document.createElement('div');
  track.className = 'header-track';
  track.innerHTML = `<button type="button" class="header-track-start" aria-label="Play Merry Christmas, Please Don't Call by Bleachers"><span class="header-track-play" aria-hidden="true">&#9654;</span><span class="header-track-copy"><strong>Merry Christmas, Please Don't Call</strong><small>Bleachers <span aria-hidden="true">&middot;</span> Spotify</small></span></button><div class="header-track-player" hidden></div><span class="sr-only" role="status"></span>`;
  actions.prepend(track);
  const start = track.querySelector('button');
  const mount = track.querySelector('.header-track-player');
  const status = track.querySelector('[role="status"]');
  let controller;
  let loading = false;
  let apiPromise;
  let session = 0;

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
  function stop() {
    session++;
    loading = false;
    if (controller) {
      try { controller.pause(); controller.destroy(); } catch {}
      controller = undefined;
    }
    mount.replaceChildren();
    mount.hidden = true;
    start.hidden = false;
    start.disabled = false;
    start.removeAttribute('aria-busy');
    status.textContent = 'Music stopped.';
  }
  function fallback() {
    const frame = document.createElement('iframe');
    frame.src = 'https://open.spotify.com/embed/track/0UOG0zUn7t8m8QcxfzR7AH?utm_source=generator';
    frame.title = "Merry Christmas, Please Don't Call by Bleachers - Spotify player";
    frame.width = '100%'; frame.height = '80';
    frame.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    mount.replaceChildren(frame);
    mount.hidden = false;
    start.hidden = true;
    start.disabled = false;
    start.removeAttribute('aria-busy');
    loading = false;
    status.textContent = 'Press Play in the header track to listen.';
  }
  start.addEventListener('click', async () => {
    if (loading) return;
    loading = true;
    const currentSession = ++session;
    start.disabled = true;
    start.setAttribute('aria-busy', 'true');
    status.textContent = 'Loading Spotify.';
    try {
      const api = await loadApi();
      if (session !== currentSession || document.hidden) return;
      const slot = document.createElement('div');
      mount.replaceChildren(slot);
      mount.hidden = false;
      start.hidden = true;
      api.createController(slot, { url: trackUrl, width: '100%', height: 80 }, player => {
        if (session !== currentSession || document.hidden) { player.destroy(); return; }
        controller = player;
        const iframe = mount.querySelector('iframe');
        if (iframe) iframe.title = "Merry Christmas, Please Don't Call by Bleachers - Spotify player";
        player.addListener('ready', () => {
          if (session !== currentSession || document.hidden) return;
          loading = false;
          status.textContent = 'Use the header track to play or pause music.';
          try { player.play(); } catch { status.textContent = 'Press Play in the header track to listen.'; }
        });
      });
    } catch {
      if (session === currentSession && !document.hidden) fallback();
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
  });
  addEventListener('pagehide', stop);
}
