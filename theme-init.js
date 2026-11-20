// Apply saved preferences before the first paint, including when storage is blocked.
(() => {
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
  try {
    const saved = localStorage.getItem('cedrick-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
    localStorage.removeItem('cedrick-motion');
  } catch {}
  root.dataset.theme = theme;
  root.dataset.motion = paused ? 'paused' : 'full';
})();
