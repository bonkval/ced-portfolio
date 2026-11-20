// Entirely fictional, fixed packet records. This module makes no network requests.
const flows = {
  dns: {name:'DNS resolver',destination:'10.10.0.53',protocol:'DNS',path:'M130 150 Q240 15 390 50',x:390,y:50},
  web: {name:'Web server',destination:'198.51.100.20',protocol:'HTTPS',path:'M135 150 L385 150',x:385,y:150},
  external: {name:'External host',destination:'203.0.113.42',protocol:'TLS :8443',path:'M130 150 Q240 285 390 250',x:390,y:250}
};
const packets = [
  [0,'dns',74,'Query: assets.example.test. A routine hostname lookup.'],
  [3,'web',1240,'An HTTPS response fragment during a page load.'],
  [5,'external',96,'Outbound TLS connection on port 8443. Encrypted payload is not available.'],
  [10,'web',812,'Another response fragment. Variable sizes and irregular timing.'],
  [25,'external',96,'Same destination, port and size. Twenty seconds after the previous connection.'],
  [30,'dns',81,'Query: api.example.test. A second routine lookup.'],
  [45,'external',96,'Third connection with the same size and another twenty-second interval.'],
  [49,'web',1460,'A larger HTTPS response fragment, forty-nine seconds into the capture.'],
  [65,'external',96,'Fourth 96-byte connection. The twenty-second interval repeats again.'],
  [70,'dns',76,'Query: static.example.test. No unusual query length in this scenario.'],
  [75,'web',602,'Final response fragment in the fictional capture.']
].map(([time,flow,size,detail],id)=>({id,time,flow,size,detail}));

export function initSecurityLab(enabled) {
  const anchor = document.querySelector('#skills');
  if (!anchor) return;
  const section = document.createElement('section');
  section.className = 'security-lab page-width'; section.id = 'security-lab';
  section.setAttribute('aria-labelledby','security-lab-title');
  section.innerHTML = `<header class="lab-heading"><div><p class="interaction-label">Simulated investigation · about one minute</p><h2 id="security-lab-title">Inspect a suspicious connection.</h2><p>A fictional 75-second capture. Follow the traffic, inspect a packet, then flag the connection worth investigating.</p></div><button type="button" class="lab-start lab-button">Start investigation <span aria-hidden="true">↗</span></button></header>
    <div class="lab-console"><div class="lab-network" aria-label="Simulated network connections">
    <svg class="lab-wires" viewBox="0 0 520 300" preserveAspectRatio="none" aria-hidden="true">${Object.entries(flows).map(([id,f])=>`<path data-flow-path="${id}" d="${f.path}"/>`).join('')}</svg>
    <div class="lab-workstation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8m-4-5v5"/></svg><strong>Workstation</strong><small>10.10.0.12</small></div>
    ${Object.entries(flows).map(([id,f])=>`<button type="button" class="lab-host lab-host-${id}" data-flow="${id}" aria-pressed="false"><span class="lab-node-dot" aria-hidden="true"></span><strong>${f.name}</strong><small>${f.destination}</small></button>`).join('')}
    <span class="lab-network-caption">Select a destination to isolate its traffic.</span></div>
    <div class="lab-intro"><span class="lab-intro-symbol" aria-hidden="true">⌁</span><p>No tools to install.<br>No real traffic is collected.</p><small>Everything runs locally in your browser.</small></div>
    <div class="lab-evidence" hidden><div class="lab-playback"><button type="button" class="lab-play lab-button" aria-label="Pause simulated traffic">Pause</button><label for="lab-time">Capture time <output id="lab-time-value">00s / 75s</output></label><input id="lab-time" type="range" min="0" max="75" step="1" value="0" aria-label="Capture time in seconds"><button type="button" class="lab-show-all">All connections</button></div>
    <div class="lab-packet-scroll"><table class="lab-packets"><caption class="sr-only">Fictional packets available at the selected capture time</caption><thead><tr><th scope="col">Time</th><th scope="col">Source → destination</th><th scope="col">Protocol</th><th scope="col">Bytes</th><th scope="col"><span class="sr-only">Inspect</span></th></tr></thead><tbody></tbody></table></div>
    <div class="lab-inspector" aria-live="polite"><strong>Choose a packet</strong><p>Inspect its timing, destination and size. Move the capture slider forward to reveal more traffic.</p></div>
    <div class="lab-verdict"><span class="lab-selection">No connection selected</span><button type="button" class="lab-flag lab-button" disabled>Flag as suspicious <span aria-hidden="true">↗</span></button></div><p class="lab-feedback" role="status"></p></div></div>
    <p class="lab-disclaimer">Fictional data, reserved documentation addresses, no scanning. A suspicious pattern is a reason to investigate—not proof of an attack.</p>`;
  anchor.before(section);
  const evidence = section.querySelector('.lab-evidence'), slider = section.querySelector('#lab-time');
  const play = section.querySelector('.lab-play'), inspector = section.querySelector('.lab-inspector');
  let started = false, playing = false, visible = false, time = 0, flow = null, selected = null, timer;
  const pad = number => String(number).padStart(2,'0');
  function trace(id) {
    const path = section.querySelector(`[data-flow-path="${id}"]`);
    if (!path || !enabled() || !visible || document.hidden) return;
    path.getAnimations().forEach(animation=>animation.cancel());
    path.animate([{strokeDasharray:'5 8',strokeDashoffset:52,opacity:1},{strokeDasharray:'5 8',strokeDashoffset:0,opacity:1}],{duration:650,easing:'ease-out'});
  }
  function render() {
    slider.value = String(time);
    section.querySelector('#lab-time-value').textContent = `${pad(time)}s / 75s`;
    play.textContent = playing ? 'Pause' : time===75 ? 'Replay' : 'Play';
    play.setAttribute('aria-label',playing ? 'Pause simulated traffic' : 'Play simulated traffic');
    section.querySelectorAll('[data-flow]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.flow===flow)));
    section.querySelectorAll('[data-flow-path]').forEach(path=>path.classList.toggle('is-selected',path.dataset.flowPath===flow));
    const shown = packets.filter(packet=>packet.time<=time && (!flow||packet.flow===flow));
    section.querySelector('tbody').innerHTML = shown.length ? shown.map(packet=>`<tr class="${packet.id===selected?'is-selected':''}"><td>${pad(packet.time)}s</td><td><span>10.10.0.12 →</span> ${flows[packet.flow].destination}</td><td>${flows[packet.flow].protocol}</td><td>${packet.size}</td><td><button type="button" data-packet="${packet.id}" aria-label="Inspect packet at ${packet.time} seconds to ${flows[packet.flow].destination}" aria-pressed="${packet.id===selected}">Inspect</button></td></tr>`).join('') : '<tr><td colspan="5">No packets for this connection at this time. Move the slider forward.</td></tr>';
    section.querySelector('.lab-selection').textContent = flow ? `Selected: ${flows[flow].name}` : 'No connection selected';
    section.querySelector('.lab-flag').disabled = !flow;
    const packet = packets.find(packet=>packet.id===selected);
    if (packet) inspector.innerHTML = `<strong>${flows[packet.flow].protocol} · ${packet.size} bytes · ${pad(packet.time)}s</strong><p>${packet.detail}</p>`;
    else inspector.innerHTML = '<strong>Choose a packet</strong><p>Inspect its timing, destination and size. Move the capture slider forward to reveal more traffic.</p>';
  }
  function syncTimer() {
    clearInterval(timer); timer = undefined;
    if (!playing || !visible || document.hidden) return;
    timer = setInterval(()=>{
      const before = time; time = Math.min(75,time+5);
      packets.filter(packet=>packet.time>before&&packet.time<=time).forEach(packet=>trace(packet.flow));
      if (time===75) playing=false;
      render(); if (!playing) syncTimer();
    },1000);
  }
  function start() {
    if (started) return;
    started=true; playing=true;
    evidence.hidden=false; section.querySelector('.lab-intro').hidden=true;
    section.querySelector('.lab-start').hidden=true;
    render(); syncTimer();
  }
  section.querySelector('.lab-start').addEventListener('click',start);
  section.querySelectorAll('[data-flow]').forEach(button=>button.addEventListener('click',()=>{
    start(); flow=button.dataset.flow; selected=null;
    section.querySelector('.lab-feedback').textContent=''; render(); trace(flow);
  }));
  section.querySelector('tbody').addEventListener('click',event=>{
    const button=event.target.closest('[data-packet]'); if (!button) return;
    selected=Number(button.dataset.packet); flow=packets[selected].flow;
    playing=false; syncTimer(); render(); trace(flow);
    section.querySelector(`[data-packet="${selected}"]`)?.focus({preventScroll:true});
  });
  slider.addEventListener('input',()=>{
    time=Number(slider.value); playing=false;
    section.querySelector('.lab-feedback').textContent='';
    if (selected!==null&&packets[selected].time>time) selected=null;
    syncTimer(); render();
  });
  play.addEventListener('click',()=>{
    section.querySelector('.lab-feedback').textContent='';
    if (time===75) {time=0; selected=null;}
    playing=!playing; render(); syncTimer();
  });
  section.querySelector('.lab-show-all').addEventListener('click',()=>{flow=null;render();});
  section.querySelector('.lab-flag').addEventListener('click',()=>{
    playing=false; syncTimer(); render();
    const feedback=section.querySelector('.lab-feedback');
    if (flow==='external') {
      const observed=packets.filter(packet=>packet.flow==='external'&&packet.time<=time).length;
      feedback.textContent=observed<4 ? 'A plausible lead, but not enough evidence yet. Move the slider to at least 65s and compare the repeated connections.' : 'Good lead. Four 96-byte TLS connections occur at 05s, 25s, 45s and 65s: a regular 20-second pattern. This can resemble beaconing, but legitimate software can behave similarly. Check process ownership, destination reputation and host logs before deciding.';
    } else feedback.textContent=flow==='dns' ? 'These short, ordinary hostname lookups provide no strong anomaly in this capture. Try comparing the timing and sizes of the other connections.' : 'These HTTPS fragments vary in size and timing. That alone is not strong evidence of an incident. Inspect another destination for a repeatable pattern.';
  });
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncTimer();},{threshold:.05}).observe(section);
  document.addEventListener('visibilitychange',syncTimer);
}
