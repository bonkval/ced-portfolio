export function initAscii(motionEnabled) {
  const root = document.documentElement;
  const backdrop = document.createElement('div');
  backdrop.className = 'ascii-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  const field = document.createElement('pre');
  backdrop.append(field);
  document.body.prepend(backdrop);
  function resizeField() {
    const columns = Math.ceil(innerWidth / 7);
    const rows = Math.ceil(innerHeight / 24) + 5;
    const chars = '. : + / 0 1 - : .';
    field.textContent = Array.from({ length: rows }, (_, y) => Array.from({ length: columns }, (_, x) => {
      const noise = Math.sin(x * 7.13 + y * 13.7) * Math.cos(x * .41 - y * .37);
      return noise > .56 ? chars[(x * 3 + y * 7) % chars.length] : ' ';
    }).join('')).join('\n');
  }
  resizeField();
  addEventListener('resize', resizeField, { passive: true });

  const canvas = document.querySelector('[data-ascii-sculpture]');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  const cols = 82, rows = 52;
  const characters = ' .,:;i!+*?%$#@';
  const depth = new Float32Array(cols * rows);
  const light = new Float32Array(cols * rows);
  let width = 0, height = 0, visible = true, raf = 0, lastTime = 0, angle = 2.2;
  let pointerX = 0, pointerY = 0, followX = 0, followY = 0;
  let ink = root.dataset.theme === 'dark' ? '255,255,255' : '0,0,0';

  function render() {
    if (!width || !height) return;
    depth.fill(0); light.fill(0);
    const a = angle * .43 + followY, b = angle * .24 + followX;
    const sinA = Math.sin(a), cosA = Math.cos(a), sinB = Math.sin(b), cosB = Math.cos(b);
    // Light a sampled torus and quantize its surface into ASCII characters.
    for (let theta = 0; theta < Math.PI * 2; theta += .065) {
      const ct = Math.cos(theta), st = Math.sin(theta);
      for (let phi = 0; phi < Math.PI * 2; phi += .022) {
        const cp = Math.cos(phi), sp = Math.sin(phi), ring = 2 + ct;
        const x = ring * (cosB * cp + sinA * sinB * sp) - st * cosA * sinB;
        const y = ring * (sinB * cp - sinA * cosB * sp) + st * cosA * cosB;
        const z = cosA * ring * sp + st * sinA;
        const inverse = 1 / (8 + z);
        const col = Math.floor(cols * .5 + 68 * inverse * x);
        const row = Math.floor(rows * .5 - 35 * inverse * y);
        if (col < 0 || col >= cols || row < 0 || row >= rows) continue;
        const index = col + row * cols;
        if (inverse <= depth[index]) continue;
        depth[index] = inverse;
        const luminance = cp * ct * sinB - cosA * ct * sp - sinA * st + cosB * (cosA * st - ct * sinA * sp);
        light[index] = Math.max(.1, Math.min(1, (luminance + 1.3) / 2.7));
      }
    }
    context.clearRect(0, 0, width, height);
    const cellWidth = width / cols, cellHeight = height / rows;
    context.font = `${Math.max(5, cellWidth * 1.25)}px Consolas,monospace`;
    context.textAlign = 'center'; context.textBaseline = 'middle';
    for (let index = 0; index < depth.length; index++) {
      if (!depth[index]) continue;
      const value = light[index];
      context.fillStyle = `rgba(${ink},${.2 + value * .8})`;
      const char = characters[Math.max(1, Math.floor(value * (characters.length - 1)))];
      context.fillText(char, (index % cols + .5) * cellWidth, (Math.floor(index / cols) + .5) * cellHeight);
    }
  }
  function tick(now) {
    raf = 0;
    if (!visible || document.hidden || !motionEnabled()) return;
    if (now - lastTime >= 1000 / 24) {
      const delta = Math.min(70, now - lastTime);
      angle += delta * .00032;
      followX += (pointerX - followX) * .07;
      followY += (pointerY - followY) * .07;
      lastTime = now; render();
    }
    raf = requestAnimationFrame(tick);
  }
  function sync() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0; render();
    if (visible && !document.hidden && motionEnabled()) raf = requestAnimationFrame(tick);
  }
  new ResizeObserver(() => {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width; height = bounds.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0); sync();
  }).observe(canvas);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }).observe(canvas);
  canvas.addEventListener('pointermove', event => {
    const bounds = canvas.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width - .5;
    pointerY = (event.clientY - bounds.top) / bounds.height - .5;
  }, { passive: true });
  canvas.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; });
  document.addEventListener('portfolio:theme', () => {
    ink = root.dataset.theme === 'dark' ? '255,255,255' : '0,0,0'; render();
  });
  document.addEventListener('portfolio:motion', sync);
  document.addEventListener('visibilitychange', sync);
}
