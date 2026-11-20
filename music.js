// Original local instrumental: no player overlay, accounts or third-party requests.
export function initMusicPlayer() {
  const actions = document.querySelector('.header-actions');
  if (!actions) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'music-toggle';
  button.innerHTML = '<span class="music-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';
  button.setAttribute('aria-pressed', 'false');
  const status = document.createElement('span');
  status.className = 'sr-only';
  status.setAttribute('role', 'status');
  actions.prepend(button);
  actions.append(status);
  let audio;
  let requested = false;
  let session = 0;
  function update() {
    button.setAttribute('aria-pressed', String(requested));
    button.setAttribute('aria-label', requested ? 'Turn background music off' : 'Turn background music on');
    button.title = requested ? 'Music off' : 'Music on - original instrumental';
  }
  function stop() {
    session++;
    requested = false;
    audio?.pause();
    button.removeAttribute('aria-busy');
    update();
  }
  update();
  button.addEventListener('click', async () => {
    if (requested) { stop(); status.textContent = 'Music off.'; return; }
    if (!audio) {
      audio = new Audio('/public/audio/afterglow-v1.mp3');
      audio.preload = 'none';
      audio.loop = true;
      audio.volume = .35;
      audio.addEventListener('error', () => {
        stop(); status.textContent = 'Music could not load. Click to try again.';
      });
    }
    requested = true;
    const currentSession = ++session;
    update();
    button.setAttribute('aria-busy', 'true');
    try {
      await audio.play();
      // A late play promise must not undo an off click or a tab switch.
      if (currentSession !== session) {
        if (!requested) audio.pause();
        return;
      }
      button.removeAttribute('aria-busy');
      status.textContent = 'Background music on.';
    } catch {
      if (currentSession === session) {
        stop(); status.textContent = 'Playback did not start. Click to try again.';
      }
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
  });
  addEventListener('pagehide', stop);
}
