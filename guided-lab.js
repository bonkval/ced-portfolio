import { animate } from 'motion';
import { flows, timingPackets, dnsPackets } from './lab-captures.js';

const check='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m4 10 4 4 8-8"/></svg>';
const star='<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="32" cy="32" r="25"/><path d="m32 15 5 11 12 2-9 9 2 12-10-6-10 6 2-12-9-9 12-2Z"/><path d="M32 2v4m0 52v4M2 32h4m52 0h4M10 10l3 3m38 38 3 3M10 54l3-3m38-38 3-3"/></svg>';
const cases={
  timing:{name:'Connection timing',badge:'Pattern spotter',packets:timingPackets,target:'external',clue:6,
    lead:'One connection sends the same-sized packets at regular intervals. Select a destination on the map to compare its traffic.',
    inspect:'Nice find. Open the outlined packet to see what keeps repeating.',
    question:'What makes this connection stand out?',
    options:[
      {id:'encrypted',text:'The traffic is encrypted',feedback:'Encryption is common. Look for something unusual in the packet sizes and timing.'},
      {id:'rhythm',text:'Same size. Exactly 20 seconds apart.',correct:true},
      {id:'outside',text:'It reaches an external address',feedback:'External connections are common too. Compare the spacing between these four packets.'}
    ],
    takeaway:'Four 96-byte packets arrive 20 seconds apart. That repeating rhythm is a useful lead for checking the process behind the traffic.',
    wrong:{dns:'These short hostname lookups arrive at different intervals. Try another destination.',web:'This web traffic varies in size and timing. Try a connection with a steadier rhythm.'},
    hints:[['Compare the gaps between the packet dots. Which row has an even rhythm?','Try the External host. Its four dots are evenly spaced.'],['Open the outlined dot in the TLS row, or use Inspect clue.','The packet is 96 bytes. Compare it with the other three in that row.'],['Look at the size and the time stamps together.','All four packets are 96 bytes, with a 20-second gap each time.']]
  },
  dns:{name:'DNS queries',badge:'DNS detective',packets:dnsPackets,target:'dns',clue:3,
    lead:'This capture includes repeated, unusually long hostname lookups. Select a destination and compare its packet sizes.',
    inspect:'You found the DNS traffic. Open the outlined larger packet to read its query.',
    question:'Which clue deserves a closer look?',
    options:[
      {id:'uses-dns',text:'The computer uses DNS',feedback:'DNS normally translates names into addresses. Look at the actual names being requested.'},
      {id:'web-response',text:'The web server sends a reply',feedback:'A web reply is expected. Your saved clue is a DNS query—check its name.'},
      {id:'encoded',text:'Long, encoded-looking names keep repeating',correct:true}
    ],
    takeaway:'Five long queries use encoded-looking labels under telemetry.example.test. The next useful checks are the originating process and resolver logs.',
    wrong:{web:'These are ordinary web responses. Look for a destination receiving hostname queries.',external:'These two TLS responses differ in size and arrive 50 seconds apart. Compare the DNS traffic.'},
    hints:[['DNS turns names into addresses. Look for the resolver on the map.','Try the DNS resolver. Several of its packets are larger than the first one.'],['Select the outlined larger dot in the DNS row.','The first short query is routine. Inspect the longer query at 12 seconds.'],['Compare the query name with a short name such as assets.example.test.','The same parent domain is receiving repeated long, encoded-looking subdomains.']]
  }
};

export function initSecurityLab(enabled){
  const anchor=document.querySelector('#skills');if(!anchor)return;
  let solved=new Set();try{solved=new Set(JSON.parse(sessionStorage.getItem('portfolio-lab-cases')||'[]').filter(id=>id in cases));}catch{}
  let scenario=solved.has('timing')&&!solved.has('dns')?'dns':'timing',current=cases[scenario];
  let started=false,stage=0,flow=null,selected=null,clue=null,hint=0,feedback='',wrongAnswer='',newAward=false;
  let time=75,playing=false,visible=false,timer,guideSignature='';
  const routes=new Map(),celebrations=new Set();
  const section=document.createElement('section');section.className='security-lab page-width';section.id='security-lab';
  section.setAttribute('aria-labelledby','security-lab-title');
  section.innerHTML=`<header class="lab-heading"><div><h2 id="security-lab-title">Network traffic lab</h2><p>Two guided cases: follow a connection, inspect a clue, and solve the pattern.</p></div><div class="lab-session-progress" aria-live="polite">${star}<span><strong class="lab-xp">0 XP</strong><small class="lab-case-count">0 of 2 cases solved</small></span></div></header>
    <div class="lab-scenarios" role="group" aria-label="Practice cases">${Object.entries(cases).map(([id,data],i)=>`<button type="button" data-scenario="${id}" aria-pressed="${id===scenario}"><span class="lab-case-number">0${i+1}</span><span>${data.name}</span><span class="lab-case-check" aria-hidden="true">${check}</span></button>`).join('')}</div>
    <div class="lab-console"><div class="lab-visuals"><div class="lab-network" aria-label="Practice network connections"><svg class="lab-wires" viewBox="0 0 520 300" preserveAspectRatio="none" aria-hidden="true">${Object.entries(flows).map(([id,data])=>`<path data-flow-path="${id}" d="${data.path}"/>`).join('')}</svg><div class="lab-workstation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8m-4-5v5"/></svg><strong>Your computer</strong><small>10.10.0.12</small></div>${Object.entries(flows).map(([id,data])=>`<button type="button" class="lab-host lab-host-${id}" data-flow="${id}" aria-pressed="false"><span class="lab-node-dot" aria-hidden="true"></span><strong>${data.name}</strong><small>${data.destination}</small></button>`).join('')}<span class="lab-network-caption">Choose a case and follow the guide.</span></div><div class="lab-traffic" hidden><div class="lab-traffic-title"><strong>Connection timing</strong><span>0s <i aria-hidden="true">→</i> 75s</span></div><div class="lab-traffic-lanes"></div><p>Each dot is a packet—a small bundle of network data.</p></div></div>
    <div class="lab-guide"><ol class="lab-stepper" aria-label="Case progress">${['Trace','Inspect','Solve'].map((label,i)=>`<li data-guide-step="${i}"><span class="lab-step-icon">${check}<b>${i+1}</b></span><span>${label}</span></li>`).join('')}</ol><div class="lab-guide-content"></div><div class="lab-guide-feedback" role="status"></div><div class="lab-guide-help" hidden><button type="button" data-guide-hint>Need a hint?</button><button type="button" data-guide-show hidden>Show me where</button><p class="lab-hint-text" role="status"></p></div><div class="lab-confetti-layer" aria-hidden="true"></div></div></div>
    <div class="lab-earned-badges" aria-label="Case badges">${Object.entries(cases).map(([id,data])=>`<span data-earned-badge="${id}">${star}<span>${data.badge}</span>${check}</span>`).join('')}</div>
    <details class="lab-advanced"><summary>Explore the full packet capture <span>Optional tools</span><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m5 8 5 5 5-5"/></svg></summary><div class="lab-evidence"><div class="lab-playback"><button type="button" class="lab-play lab-button" aria-label="Play sample traffic">Replay</button><label for="lab-time">Capture time <output id="lab-time-value">75s / 75s</output></label><input id="lab-time" type="range" min="0" max="75" value="75" aria-label="Capture time in seconds"><button type="button" class="lab-show-all">All connections</button></div><div class="lab-metrics" aria-label="Connection statistics"></div><div class="lab-packet-scroll"><table class="lab-packets"><caption class="sr-only">Sample packets at the selected time</caption><thead><tr><th scope="col">Time</th><th scope="col">Destination</th><th scope="col">Protocol</th><th scope="col">Bytes</th><th scope="col"><span class="sr-only">Inspect</span></th></tr></thead><tbody></tbody></table></div><div class="lab-inspector" aria-live="polite"></div></div></details>`;
  anchor.before(section);
  const guide=section.querySelector('.lab-guide'),content=section.querySelector('.lab-guide-content');
  const advanced=section.querySelector('.lab-advanced'),slider=section.querySelector('#lab-time');
  const pad=value=>String(value).padStart(2,'0');
  function saveProgress(){try{sessionStorage.setItem('portfolio-lab-cases',JSON.stringify([...solved]));}catch{}}
  function stopTraces(){routes.forEach(animation=>animation.stop());routes.clear();section.querySelectorAll('.lab-travel-packet').forEach(dot=>dot.remove());}
  function trace(id){
    const path=section.querySelector(`[data-flow-path="${id}"]`);if(!path||!enabled()||!visible||document.hidden)return;
    routes.get(id)?.stop();section.querySelector(`.lab-travel-packet[data-route="${id}"]`)?.remove();
    const dot=document.createElementNS('http://www.w3.org/2000/svg','circle'),first=path.getPointAtLength(0),length=path.getTotalLength();
    dot.setAttribute('class','lab-travel-packet');dot.dataset.route=id;dot.setAttribute('r','4');dot.setAttribute('cx',first.x);dot.setAttribute('cy',first.y);path.after(dot);
    const animation=animate(0,1,{duration:.65,ease:'linear',onUpdate:progress=>{const point=path.getPointAtLength(progress*length);dot.setAttribute('cx',point.x);dot.setAttribute('cy',point.y);},onComplete:()=>{dot.remove();routes.delete(id);}});routes.set(id,animation);
  }
  function celebrate(){
    clearCelebration();
    const layer=section.querySelector('.lab-confetti-layer'),full=enabled();
    for(let i=0;i<44;i++){
      const piece=document.createElement('i');piece.className='lab-confetti';piece.style.background=['#f2c75c','#9d8df1','#67cdb6','var(--ink)'][i%4];
      const x=(Math.random()-.5)*Math.min(460,guide.clientWidth),y=70+Math.random()*260;
      piece.style.width=`${4+Math.random()*4}px`;piece.style.height=`${5+Math.random()*6}px`;
      layer.append(piece);
      if(!full){piece.style.left=`calc(50% + ${x}px)`;piece.style.top=`${y}px`;piece.style.rotate=`${i*31}deg`;}
      const frames=full?[{opacity:0,transform:'translate(0,0) rotate(0deg)'},{opacity:1,offset:.15},{opacity:0,transform:`translate(${x}px,${y}px) rotate(${i%2?580:-480}deg)`}]:[{opacity:0},{opacity:1,offset:.25},{opacity:0}];
      const animation=piece.animate(frames,{duration:full?1300+Math.random()*350:700,delay:i%7*18,easing:'cubic-bezier(.15,.6,.4,1)'});
      celebrations.add(animation);animation.finished.then(()=>{piece.remove();celebrations.delete(animation);},()=>piece.remove());
    }
  }
  function clearCelebration(){celebrations.forEach(animation=>animation.cancel());celebrations.clear();section.querySelectorAll('.lab-confetti').forEach(piece=>piece.remove());}
  function updateBadges(){
    section.querySelector('.lab-xp').textContent=`${solved.size*100} XP`;
    section.querySelector('.lab-case-count').textContent=`${solved.size} of 2 cases solved`;
    section.querySelectorAll('[data-earned-badge]').forEach(badge=>badge.classList.toggle('is-earned',solved.has(badge.dataset.earnedBadge)));
    section.querySelectorAll('[data-scenario]').forEach(button=>{const done=solved.has(button.dataset.scenario);button.classList.toggle('is-solved',done);button.setAttribute('aria-pressed',String(button.dataset.scenario===scenario));button.setAttribute('aria-label',`${cases[button.dataset.scenario].name}${done?', solved':''}`);});
  }
  function clueVisual(){
    return scenario==='timing'?'<div class="lab-rhythm" aria-label="Packets at 5, 25, 45 and 65 seconds, all 96 bytes">'+[5,25,45,65].map((value,i)=>`<span><b>${pad(value)}s</b><i aria-hidden="true"></i><small>96 B</small></span>${i<3?'<em>20s</em>':''}`).join('')+'</div>':'<div class="lab-query-clue"><span>Repeated query labels</span><code>a81f02c9b7d0… . c917fe0ad4b7…<br><strong>telemetry.example.test</strong></code></div>';
  }
  function renderGuide(){
    const signature=JSON.stringify([started,scenario,stage,flow,selected,clue,hint,feedback,wrongAnswer,solved.size]);if(signature===guideSignature)return;guideSignature=signature;
    section.querySelectorAll('[data-guide-step]').forEach(node=>{const index=Number(node.dataset.guideStep);node.classList.toggle('is-done',started&&stage>index);node.classList.toggle('is-current',started&&stage===index);if(started&&stage===index)node.setAttribute('aria-current','step');else node.removeAttribute('aria-current');});
    const help=section.querySelector('.lab-guide-help');help.hidden=!started||stage===3;
    section.querySelector('.lab-guide-feedback').textContent=feedback;
    const hintText=hint&&stage<3?current.hints[stage][Math.min(hint,2)-1]:'';
    section.querySelector('.lab-hint-text').textContent=hintText;
    section.querySelector('[data-guide-hint]').textContent=hint?'Another hint':'Need a hint?';
    section.querySelector('[data-guide-show]').hidden=hint<2||stage===2;
    if(!started){content.innerHTML=`<div class="lab-welcome-art" aria-hidden="true">${star}<span>01 → 02 → 03</span></div><h3 tabindex="-1">Your case starts here.</h3><p>Choose a connection, open one clue, and explain what you found. Hints are here whenever you need them.</p><button type="button" class="lab-start lab-primary">Start case <span aria-hidden="true">→</span></button>`;return;}
    if(stage===0)content.innerHTML=`<p class="lab-task-number">Step 1 of 3</p><h3 tabindex="-1">Choose a connection.</h3><p>${current.lead}</p><div class="lab-guide-nudge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M18 12H5m5-5-5 5 5 5"/></svg><span>Select a destination on the network map.</span></div>`;
    else if(stage===1)content.innerHTML=`<p class="lab-task-number">Step 2 of 3</p><h3 tabindex="-1">A clue worth opening.</h3><p>${current.inspect}</p><div class="lab-clue-ticket"><span class="lab-clue-dot" aria-hidden="true"></span><div><strong>${flows[current.target].name}</strong><small>${pad(current.packets[current.clue].time)}s · ${current.packets[current.clue].size} bytes</small></div><span aria-hidden="true">↗</span></div><button type="button" class="lab-primary" data-guide-inspect>Inspect clue <span aria-hidden="true">→</span></button>`;
    else if(stage===2)content.innerHTML=`<p class="lab-task-number">Step 3 of 3 · clue collected ${check}</p><h3 tabindex="-1">${current.question}</h3>${clueVisual()}<div class="lab-answer-options" role="group" aria-label="Choose an explanation">${current.options.map(option=>`<button type="button" data-answer="${option.id}" class="${wrongAnswer===option.id?'is-tried ':''}${hint>=2&&option.correct?'is-hinted':''}"><span class="lab-answer-ring" aria-hidden="true"></span><span>${option.text}</span><span aria-hidden="true">↗</span></button>`).join('')}</div>`;
    else content.innerHTML=`<div class="lab-reward"><button type="button" class="lab-award" data-celebrate aria-label="Celebrate your solved case" title="More confetti!">${star}</button><p class="lab-reward-earned">${solved.size===2?'Both cases solved':'Case solved'} · ${newAward?'+100 XP':'Badge earned'}</p><h3 tabindex="-1">${solved.size===2?'Traffic detective':'Case cracked!'}</h3><span class="lab-reward-badge">${check}${solved.size===2?'Traffic detective':current.badge} unlocked</span><p>${current.takeaway}</p><div class="lab-reward-actions"><button type="button" class="lab-primary" data-guide-next>${solved.size===2?'Try a case again':'Next case'} <span aria-hidden="true">→</span></button><button type="button" class="lab-retry" data-guide-replay>Replay this case</button></div></div>`;
  }
  function nudgeGuide(){
    content.querySelector('h3')?.focus({preventScroll:true});
    const bounds=guide.getBoundingClientRect();if(innerWidth<=900&&(bounds.top<70||bounds.bottom>innerHeight))guide.scrollIntoView({block:'nearest',behavior:enabled()?'smooth':'instant'});
  }
  function render(){
    section.classList.toggle('lab-has-started',started);section.classList.toggle('lab-case-solved',stage===3);
    section.querySelector('.lab-traffic').hidden=!started;
    section.querySelectorAll('[data-flow]').forEach(button=>{button.setAttribute('aria-pressed',String(button.dataset.flow===flow));button.classList.toggle('is-guide-target',started&&stage===0&&hint>=2&&button.dataset.flow===current.target);});
    section.querySelectorAll('[data-flow-path]').forEach(path=>path.classList.toggle('is-selected',path.dataset.flowPath===flow));
    section.querySelector('.lab-network-caption').textContent=!started?'Choose a case and follow the guide.':stage===0?'Tap a destination to compare its traffic.':stage===1?'The outlined packet is your next clue.':stage===2?'Clue collected. Choose an explanation.':'Case solved. You can keep exploring.';
    const available=current.packets.filter(packet=>packet.time<=time),shown=available.filter(packet=>!flow||packet.flow===flow);
    section.querySelector('.lab-traffic-lanes').innerHTML=Object.entries(flows).map(([id,connection])=>{
      const samples=available.filter(packet=>packet.flow===id);
      return `<div class="lab-traffic-lane ${flow&&flow!==id?'is-muted':''}"><button type="button" class="lab-lane-name" data-select-flow="${id}" aria-pressed="${flow===id}">${connection.protocol}</button><div class="lab-lane-track">${samples.map(packet=>`<button type="button" class="lab-packet-dot ${packet.id===selected?'is-selected ':''}${stage===1&&packet.id===current.clue?'is-guide-clue':''}" data-packet="${packet.id}" aria-label="Inspect ${connection.name} packet at ${packet.time} seconds, ${packet.size} bytes" title="${pad(packet.time)}s · ${packet.size} bytes" aria-pressed="${packet.id===selected}"></button>`).join('')}</div><span class="lab-lane-count">${samples.length}</span></div>`;
    }).join('');
    section.querySelectorAll('.lab-packet-dot').forEach(dot=>{const packet=current.packets[Number(dot.dataset.packet)];dot.style.left=`${packet.time/75*100}%`;dot.style.setProperty('--packet-dot-size',`${Math.min(16,6+Math.log2(Math.max(74,packet.size)/74)*3)}px`);});
    slider.value=String(time);section.querySelector('#lab-time-value').textContent=`${pad(time)}s / 75s`;
    const play=section.querySelector('.lab-play');play.textContent=playing?'Pause':time===75?'Replay':'Play';play.setAttribute('aria-label',playing?'Pause sample traffic':'Play sample traffic');
    const sizes=shown.map(packet=>packet.size),gaps=shown.slice(1).map((packet,index)=>packet.time-shown[index].time);
    const sizeLabel=sizes.length?Math.min(...sizes)===Math.max(...sizes)?`${sizes[0]} B`:`${Math.min(...sizes)}–${Math.max(...sizes)} B`:'—';
    section.querySelector('.lab-metrics').innerHTML=`<div><span>Packets</span><strong>${shown.length}</strong></div><div><span>${flow?'Intervals':'Destinations'}</span><strong>${flow?[...new Set(gaps)].join(' / ')+(gaps.length?' s':'—'):new Set(shown.map(packet=>packet.flow)).size}</strong></div><div><span>Packet size</span><strong>${sizeLabel}</strong></div>`;
    section.querySelector('tbody').innerHTML=shown.length?shown.map(packet=>`<tr class="${packet.id===selected?'is-selected':''}"><td>${pad(packet.time)}s</td><td>${flows[packet.flow].destination}</td><td>${flows[packet.flow].protocol}</td><td>${packet.size}</td><td><button type="button" data-packet="${packet.id}" aria-label="Inspect table packet at ${packet.time} seconds" aria-pressed="${packet.id===selected}">Inspect</button></td></tr>`).join(''):'<tr><td colspan="5">Move the capture slider forward to reveal more packets.</td></tr>';
    const packet=current.packets.find(packet=>packet.id===selected);
    section.querySelector('.lab-inspector').innerHTML=packet?`<strong>${flows[packet.flow].protocol} · ${packet.size} bytes · ${pad(packet.time)}s</strong><p>${packet.detail}</p>`:'<strong>Packet inspector</strong><p>Select a dot or an Inspect button to read a packet.</p>';
    renderGuide();updateBadges();
  }
  function syncTimer(){
    clearInterval(timer);timer=undefined;
    if(!playing||!visible||document.hidden||!advanced.open)return;
    timer=setInterval(()=>{const before=time;time=Math.min(75,time+5);current.packets.filter(packet=>packet.time>before&&packet.time<=time).forEach(packet=>trace(packet.flow));if(time===75)playing=false;render();if(!playing)syncTimer();},1000);
  }
  function start(){
    if(started)return;started=true;time=75;stage=solved.has(scenario)?3:0;render();
  }
  function chooseConnection(id){
    start();flow=id;selected=null;clue=null;hint=0;feedback='';wrongAnswer='';playing=false;time=75;syncTimer();
    if(stage!==3){stage=id===current.target?1:0;if(stage===0)feedback=current.wrong[id]||'Compare another connection.';}
    render();trace(id);if(stage!==3)nudgeGuide();
  }
  function inspectPacket(id,fromAdvanced=false){
    const packet=current.packets[id];if(!packet)return;
    start();flow=packet.flow;selected=id;time=Math.max(time,packet.time);playing=false;hint=0;feedback='';wrongAnswer='';syncTimer();
    if(stage!==3){
      if(flow!==current.target){stage=0;clue=null;feedback=current.wrong[flow]||'Compare another connection.';}
      else if(scenario==='dns'&&packet.size<=150){stage=1;clue=null;feedback='That short lookup looks routine. Try the outlined larger packet.';}
      else{stage=2;clue=id;}
    }
    render();trace(flow);
    if(fromAdvanced)section.querySelector(`.lab-packets [data-packet="${id}"]`)?.focus({preventScroll:true});
    else if(stage!==3)nudgeGuide();
    else section.querySelector(`.lab-traffic [data-packet="${id}"]`)?.focus({preventScroll:true});
  }
  function resetCase(){
    started=true;stage=0;flow=null;selected=null;clue=null;hint=0;feedback='';wrongAnswer='';newAward=false;playing=false;time=75;
    clearCelebration();stopTraces();syncTimer();render();nudgeGuide();
  }
  function switchCase(id,replay=false){
    if(!(id in cases))return;
    scenario=id;current=cases[id];flow=null;selected=null;clue=null;hint=0;feedback='';wrongAnswer='';newAward=false;playing=false;time=75;
    stage=solved.has(id)&&!replay?3:0;
    clearCelebration();stopTraces();syncTimer();render();
    if(started)nudgeGuide();
  }
  section.addEventListener('click',event=>{
    const target=event.target.closest('button');if(!target)return;
    if(target.matches('.lab-start')){start();nudgeGuide();}
    else if(target.dataset.flow)chooseConnection(target.dataset.flow);
    else if(target.dataset.selectFlow)chooseConnection(target.dataset.selectFlow);
    else if(target.dataset.packet!==undefined)inspectPacket(Number(target.dataset.packet),Boolean(target.closest('.lab-advanced')));
    else if(target.dataset.scenario)switchCase(target.dataset.scenario);
    else if(target.hasAttribute('data-guide-inspect'))inspectPacket(current.clue);
    else if(target.hasAttribute('data-guide-hint')){hint=Math.min(2,hint+1);render();section.querySelector('[data-guide-hint]').focus({preventScroll:true});}
    else if(target.hasAttribute('data-guide-show')){if(stage===0)chooseConnection(current.target);else if(stage===1)inspectPacket(current.clue);}
    else if(target.dataset.answer){
      if(stage!==2)return;
      const option=current.options.find(option=>option.id===target.dataset.answer);if(!option)return;
      if(!option.correct){wrongAnswer=option.id;feedback=option.feedback;render();section.querySelector(`[data-answer="${option.id}"]`)?.focus({preventScroll:true});}
      else{stage=3;feedback='';wrongAnswer='';hint=0;newAward=!solved.has(scenario);solved.add(scenario);saveProgress();render();nudgeGuide();celebrate();}
    }
    else if(target.hasAttribute('data-guide-next')){
      const next=Object.keys(cases).find(id=>!solved.has(id))||Object.keys(cases).find(id=>id!==scenario);switchCase(next,true);
    }
    else if(target.hasAttribute('data-guide-replay'))resetCase();
    else if(target.hasAttribute('data-celebrate'))celebrate();
    else if(target.matches('.lab-play')){if(time===75){time=0;selected=null;}playing=!playing;render();syncTimer();}
    else if(target.matches('.lab-show-all')){flow=null;selected=null;render();}
  });
  slider.addEventListener('input',()=>{time=Number(slider.value);playing=false;if(selected!==null&&current.packets[selected].time>time)selected=null;syncTimer();render();});
  advanced.addEventListener('toggle',()=>{if(advanced.open)start();else playing=false;syncTimer();render();});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncTimer();if(!visible){stopTraces();clearCelebration();}},{threshold:.05}).observe(section);
  document.addEventListener('visibilitychange',()=>{syncTimer();if(document.hidden){stopTraces();clearCelebration();}});
  render();
}
