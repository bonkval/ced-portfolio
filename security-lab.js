import { animate } from 'motion';
// Fixed sample records. This module makes no network requests.
const flows = {
  dns: {name:'DNS resolver',destination:'10.10.0.53',protocol:'DNS',path:'M130 150 Q240 15 390 50',x:390,y:50},
  web: {name:'Web server',destination:'198.51.100.20',protocol:'HTTPS',path:'M135 150 L385 150',x:385,y:150},
  external: {name:'External host',destination:'203.0.113.42',protocol:'TLS :8443',path:'M130 150 Q240 285 390 250',x:390,y:250}
};
const timingPackets = [
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
  [75,'web',602,'Final HTTPS response fragment.']
].map(([time,flow,size,detail],id)=>({id,time,flow,size,detail}));

const dnsPackets = [
  [0,'dns',74,'Query: assets.example.test. A short hostname lookup.'],
  [4,'web',1240,'An HTTPS response fragment from the web server.'],
  [9,'external',620,'A TLS response. Its timing and size differ from the later response.'],
  [12,'dns',188,'Query: a81f02c9b7d04e6f338a9d42.c917fe0ad4b73c865e24a1bf.telemetry.example.test. Long, encoded-looking labels.'],
  [22,'dns',192,'Another long query to telemetry.example.test, with a different encoded-looking subdomain.'],
  [32,'dns',190,'A third long subdomain query to the same parent domain. Compare its size with the first lookup.'],
  [43,'web',900,'An HTTPS response fragment during ordinary web traffic.'],
  [49,'dns',196,'A fourth long query to telemetry.example.test. Repeated encoded-looking labels warrant a closer look.'],
  [59,'external',432,'A second TLS response, fifty seconds after the previous one, with a different size.'],
  [65,'dns',194,'A fifth long query to the same parent domain. Inspect resolver and process logs for context.'],
  [75,'web',602,'Final HTTPS response fragment.']
].map(([time,flow,size,detail],id)=>({id,time,flow,size,detail}));

export function initSecurityLab(enabled) {
  const anchor = document.querySelector('#skills');
  if (!anchor) return;
  let scenario='timing', packets=timingPackets;
  const section = document.createElement('section');
  section.className = 'security-lab page-width'; section.id = 'security-lab';
  section.setAttribute('aria-labelledby','security-lab-title');
  section.innerHTML = `<header class="lab-heading"><div><h2 id="security-lab-title">Network traffic lab</h2><p>Explore packet routes, compare connection timing, and inspect network activity.</p></div><button type="button" class="lab-start lab-button">Open capture <span aria-hidden="true">↗</span></button></header>
    <div class="lab-scenarios" role="group" aria-label="Sample captures"><span>Sample capture</span><button type="button" data-scenario="timing" aria-pressed="true">01 <span>Connection timing</span></button><button type="button" data-scenario="dns" aria-pressed="false">02 <span>DNS queries</span></button></div>
    <div class="lab-console"><div class="lab-visuals"><div class="lab-network" aria-label="Sample network connections">
    <svg class="lab-wires" viewBox="0 0 520 300" preserveAspectRatio="none" aria-hidden="true">${Object.entries(flows).map(([id,f])=>`<path data-flow-path="${id}" d="${f.path}"/>`).join('')}</svg>
    <div class="lab-workstation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8m-4-5v5"/></svg><strong>Workstation</strong><small>10.10.0.12</small></div>
    ${Object.entries(flows).map(([id,f])=>`<button type="button" class="lab-host lab-host-${id}" data-flow="${id}" aria-pressed="false"><span class="lab-node-dot" aria-hidden="true"></span><strong>${f.name}</strong><small>${f.destination}</small></button>`).join('')}
    <span class="lab-network-caption">Select a destination to isolate its traffic.</span></div><div class="lab-traffic" hidden><div class="lab-traffic-title"><strong>Packet timing</strong><span>0s <i aria-hidden="true">—</i> 75s</span></div><div class="lab-traffic-lanes"></div><p>Larger dots carry more bytes. Select one to inspect.</p></div></div>
    <div class="lab-intro"><svg class="lab-capture-preview" viewBox="0 0 360 150" aria-hidden="true"><path d="M10 30h340M10 75h340M10 120h340"/><g class="lab-preview-dots"></g></svg><div class="lab-preview-specs"><span><strong>11</strong> packets</span><span><strong>3</strong> connections</span><span><strong>75s</strong> capture</span></div></div>
    <div class="lab-evidence" hidden><div class="lab-playback"><button type="button" class="lab-play lab-button" aria-label="Pause simulated traffic">Pause</button><label for="lab-time">Capture time <output id="lab-time-value">00s / 75s</output></label><input id="lab-time" type="range" min="0" max="75" step="1" value="0" aria-label="Capture time in seconds"><button type="button" class="lab-show-all">All connections</button></div>
    <div class="lab-metrics" aria-label="Selected connection statistics"></div><div class="lab-packet-scroll"><table class="lab-packets"><caption class="sr-only">Sample packets available at the selected capture time</caption><thead><tr><th scope="col">Time</th><th scope="col">Source → destination</th><th scope="col">Protocol</th><th scope="col">Bytes</th><th scope="col"><span class="sr-only">Inspect</span></th></tr></thead><tbody></tbody></table></div>
    <div class="lab-inspector" aria-live="polite"><strong>Choose a packet</strong><p>Inspect its timing, destination and size. Move the capture slider forward to reveal more traffic.</p></div>
    <div class="lab-verdict"><span class="lab-selection">No connection selected</span><button type="button" class="lab-flag lab-button" disabled>Flag connection <span aria-hidden="true">↗</span></button></div><div class="lab-result" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path class="lab-result-check" d="m7 12 3 3 7-7"/><path class="lab-result-retry" d="M12 7v6m0 3v1"/></svg><p class="lab-feedback" role="status"></p></div></div></div>`;
  anchor.before(section);
  const evidence = section.querySelector('.lab-evidence'), slider = section.querySelector('#lab-time');
  const play = section.querySelector('.lab-play'), inspector = section.querySelector('.lab-inspector');
  let started = false, playing = false, visible = false, time = 0, flow = null, selected = null, timer;
  const routeAnimations=new Map();
  const pad = number => String(number).padStart(2,'0');
  function clearResult(){section.querySelector('.lab-result').hidden=true;section.querySelector('.lab-feedback').textContent='';}
  function preview(){
    section.querySelector('.lab-preview-dots').innerHTML=packets.map(packet=>`<circle cx="${10+packet.time/75*340}" cy="${{dns:30,web:75,external:120}[packet.flow]}" r="${Math.min(7,3+packet.size/250)}"/>`).join('');
  }
  function stopTraces(){routeAnimations.forEach(animation=>animation.stop());routeAnimations.clear();section.querySelectorAll('.lab-travel-packet').forEach(dot=>dot.remove());section.querySelectorAll('[data-flow-path]').forEach(path=>path.getAnimations().forEach(animation=>animation.cancel()));}
  function trace(id) {
    const path = section.querySelector(`[data-flow-path="${id}"]`);
    if (!path || !enabled() || !visible || document.hidden) return;
    path.getAnimations().forEach(animation=>animation.cancel());
    path.animate([{strokeDasharray:'5 8',strokeDashoffset:52,opacity:1},{strokeDasharray:'5 8',strokeDashoffset:0,opacity:1}],{duration:650,easing:'ease-out'});
    routeAnimations.get(id)?.stop();
    section.querySelector(`.lab-travel-packet[data-route="${id}"]`)?.remove();
    const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
    dot.setAttribute('class','lab-travel-packet');dot.setAttribute('data-route',id);dot.setAttribute('r','4');
    const origin=path.getPointAtLength(0);dot.setAttribute('cx',origin.x);dot.setAttribute('cy',origin.y);path.after(dot);const length=path.getTotalLength();
    const animation=animate(0,1,{duration:.65,ease:'linear',onUpdate:progress=>{const point=path.getPointAtLength(progress*length);dot.setAttribute('cx',point.x);dot.setAttribute('cy',point.y);},onComplete:()=>{dot.remove();routeAnimations.delete(id);}});
    routeAnimations.set(id,animation);
  }
  function render() {
    slider.value = String(time);
    section.querySelector('#lab-time-value').textContent = `${pad(time)}s / 75s`;
    play.textContent = playing ? 'Pause' : time===75 ? 'Replay' : 'Play';
    play.setAttribute('aria-label',playing ? 'Pause simulated traffic' : 'Play simulated traffic');
    section.querySelectorAll('[data-flow]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.flow===flow)));
    section.querySelectorAll('[data-flow-path]').forEach(path=>path.classList.toggle('is-selected',path.dataset.flowPath===flow));
    const shown = packets.filter(packet=>packet.time<=time && (!flow||packet.flow===flow));
    section.querySelector('.lab-traffic-lanes').innerHTML=Object.entries(flows).map(([id,connection])=>{
      const samples=packets.filter(packet=>packet.time<=time&&packet.flow===id);
      return `<div class="lab-traffic-lane ${flow&&flow!==id?'is-muted':''}"><button type="button" class="lab-lane-name" data-select-flow="${id}" aria-pressed="${flow===id}">${connection.protocol}</button><div class="lab-lane-track">${samples.map(packet=>`<button type="button" class="lab-packet-dot ${packet.id===selected?'is-selected':''}" data-packet="${packet.id}" title="${pad(packet.time)}s · ${packet.size} bytes" aria-label="Inspect ${connection.protocol} packet at ${packet.time} seconds, ${packet.size} bytes" aria-pressed="${packet.id===selected}"></button>`).join('')}<i class="lab-capture-cursor" aria-hidden="true"></i></div><span class="lab-lane-count">${samples.length}</span></div>`;
    }).join('');
    section.querySelectorAll('.lab-packet-dot').forEach(dot=>{const packet=packets[Number(dot.dataset.packet)];dot.style.left=`${packet.time/75*100}%`;dot.style.setProperty('--packet-dot-size',`${Math.min(16,6+Math.log2(Math.max(74,packet.size)/74)*3)}px`);});
    section.querySelectorAll('.lab-capture-cursor').forEach(cursor=>cursor.style.left=`${time/75*100}%`);
    const sizes=shown.map(packet=>packet.size),gaps=shown.slice(1).map((packet,index)=>packet.time-shown[index].time);
    const sizeLabel=sizes.length ? Math.min(...sizes)===Math.max(...sizes)?`${sizes[0]} B`:`${Math.min(...sizes)}–${Math.max(...sizes)} B`:'—';
    const comparison=flow ? [...new Set(gaps)].join(' / ')+(gaps.length?' s':'—') : String(new Set(shown.map(packet=>packet.flow)).size);
    section.querySelector('.lab-metrics').innerHTML=`<div><span>Packets</span><strong>${shown.length}</strong></div><div><span>${flow?'Intervals':'Destinations'}</span><strong>${comparison}</strong></div><div><span>Packet size</span><strong>${sizeLabel}</strong></div>`;
    section.querySelector('tbody').innerHTML = shown.length ? shown.map(packet=>`<tr class="${packet.id===selected?'is-selected':''}"><td>${pad(packet.time)}s</td><td><span>10.10.0.12 →</span> ${flows[packet.flow].destination}</td><td>${flows[packet.flow].protocol}</td><td>${packet.size}</td><td><button type="button" data-packet="${packet.id}" aria-label="Inspect packet at ${packet.time} seconds to ${flows[packet.flow].destination}" aria-pressed="${packet.id===selected}">Inspect</button></td></tr>`).join('') : '<tr><td colspan="5">No packets for this connection at this time. Move the slider forward.</td></tr>';
    section.querySelector('.lab-selection').textContent = flow ? `Selected: ${flows[flow].name}` : 'No connection selected';
    section.querySelector('.lab-flag').disabled = !flow;
    const packet = packets.find(packet=>packet.id===selected);
    if (packet) inspector.innerHTML = `<strong>${flows[packet.flow].protocol} · ${packet.size} bytes · ${pad(packet.time)}s</strong><p>${packet.detail}</p>`;
    else inspector.innerHTML = '<strong>Packet inspector</strong><p>Select a packet dot or an Inspect button to view its details.</p>';
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
    started=true; playing=false;time=75;
    evidence.hidden=false; section.querySelector('.lab-intro').hidden=true;
    section.querySelector('.lab-traffic').hidden=false;
    section.querySelector('.lab-start').hidden=true;
    render(); syncTimer();
  }
  section.querySelector('.lab-start').addEventListener('click',start);
  section.querySelectorAll('[data-flow]').forEach(button=>button.addEventListener('click',()=>{
    start(); flow=button.dataset.flow; selected=null;
    clearResult(); render(); trace(flow);
  }));
  section.addEventListener('click',event=>{
    const lane=event.target.closest('[data-select-flow]');
    if(lane){flow=lane.dataset.selectFlow;selected=null;clearResult();render();trace(flow);section.querySelector(`[data-select-flow="${flow}"]`).focus({preventScroll:true});return;}
    const button=event.target.closest('[data-packet]'); if (!button) return;
    const origin=button.closest('table')?'.lab-packets':'.lab-traffic';
    selected=Number(button.dataset.packet); flow=packets[selected].flow;
    playing=false; clearResult(); syncTimer(); render(); trace(flow);
    section.querySelector(`${origin} [data-packet="${selected}"]`)?.focus({preventScroll:true});
  });
  slider.addEventListener('input',()=>{
    time=Number(slider.value); playing=false;
    clearResult();
    if (selected!==null&&packets[selected].time>time) selected=null;
    syncTimer(); render();
  });
  play.addEventListener('click',()=>{
    clearResult();
    if (time===75) {time=0; selected=null;}
    playing=!playing; render(); syncTimer();
  });
  section.querySelector('.lab-show-all').addEventListener('click',()=>{flow=null;selected=null;clearResult();render();});
  section.querySelectorAll('[data-scenario]').forEach(button=>button.addEventListener('click',()=>{
    scenario=button.dataset.scenario;packets=scenario==='dns'?dnsPackets:timingPackets;
    playing=false;time=started?75:0;flow=null;selected=null;stopTraces();clearResult();
    section.querySelectorAll('[data-scenario]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    preview();render();syncTimer();
  }));
  section.querySelector('.lab-flag').addEventListener('click',()=>{
    playing=false; syncTimer(); render();
    const feedback=section.querySelector('.lab-feedback');
    const target=scenario==='dns'?'dns':'external';
    const observed=packets.filter(packet=>packet.flow===target&&packet.time<=time&&(scenario!=='dns'||packet.size>150)).length;
    const success=flow===target&&observed>=4;
    const result=section.querySelector('.lab-result');result.hidden=false;result.classList.toggle('is-success',success);
    if(flow!==target)feedback.textContent='Compare another connection. Look at the spacing between its packets and whether their sizes repeat.';
    else if(observed<4)feedback.textContent='Keep this connection selected and move further into the capture to compare more packets.';
    else if(scenario==='dns')feedback.textContent='Pattern found: repeated long, encoded-looking DNS queries to one parent domain. Investigate the originating process and resolver logs.';
    else feedback.textContent='Pattern found: four 96-byte connections, each 20 seconds apart. Check the originating process and destination to explain the regular traffic.';
  });
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncTimer();if(!visible)stopTraces();},{threshold:.05}).observe(section);
  document.addEventListener('visibilitychange',()=>{syncTimer();if(document.hidden)stopTraces();});
  preview();
}
