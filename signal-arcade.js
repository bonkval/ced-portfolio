import { timingPackets, dnsPackets, flows } from './lab-captures.js';
const diamond='<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m20 3 17 17-17 17L3 20Z"/><path d="M14 16h3m6 0h3m-12 9 6-3 6 3"/></svg>';
const friendly='<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="20" cy="20" r="15"/><path d="M13 23q7 8 14 0M13 15h3m8 0h3"/></svg>';
const trophy='<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M19 9h26v18c0 11-7 17-13 17s-13-6-13-17V9Zm0 6H9v8c0 8 5 13 13 13m23-21h10v8c0 8-5 13-13 13M32 44v10m-12 3h24M32 15l3 6 6 1-5 5 1 6-5-3-5 3 1-6-5-5 6-1Z"/></svg>';

export function initSecurityLab(enabled){
  const anchor=document.querySelector('#skills');if(!anchor)return;
  const section=document.createElement('section');section.id='security-lab';section.className='security-lab signal-arcade page-width';section.setAttribute('aria-labelledby','signal-arcade-title');
  section.innerHTML=`<header class="arcade-heading"><div><h2 id="signal-arcade-title">Signal Chase</h2><p>Catch the diamonds, dodge the decoys, and keep your streak alive.</p></div><div class="arcade-scoreboard"><span><small>Score</small><strong data-arcade-score>0</strong></span><span><small>Best</small><strong data-arcade-best>0</strong></span><span class="arcade-combo"><small>Combo</small><strong data-arcade-combo>×1</strong></span></div></header>
    <div class="arcade-shell"><div class="arcade-toolbar"><span class="arcade-round">Round <strong data-arcade-round>1 / 2</strong></span><div class="arcade-catch-meter" role="img" aria-label="0 of 6 signals caught">${Array.from({length:6},()=>'<i></i>').join('')}</div><button type="button" class="arcade-motion" aria-pressed="${enabled()}" title="Switch between moving signals and pop-up targets">${enabled()?'Flow mode':'Pop-up mode'}</button><button type="button" class="arcade-pause" disabled>Pause</button></div>
    <div class="arcade-field" tabindex="0" role="group" aria-label="Signal field. Catch diamonds and leave circles. Up and down choose a lane; Space catches a rogue signal in that lane."><div class="arcade-grid" aria-hidden="true"></div>${[0,1,2].map(row=>`<div class="arcade-lane" data-arcade-lane="${row}"><span class="arcade-lane-label">0${row+1}</span><span class="arcade-lane-wire" aria-hidden="true"></span><span class="arcade-lane-end" aria-hidden="true">⊕</span></div>`).join('')}<div class="arcade-tokens"></div><div class="arcade-fx" aria-hidden="true"></div><div class="arcade-overlay"></div></div>
    <footer class="arcade-footer"><div class="arcade-legend"><span>${diamond}Catch</span><span>${friendly}Leave alone</span></div><span class="arcade-controls-help">Tap targets · ↑ ↓ + Space</span><span class="arcade-status sr-only" role="status"></span></footer></div>
    <details class="arcade-behind"><summary>Behind the signals <span>Packet examples</span><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m5 8 5 5 5-5"/></svg></summary><div class="arcade-behind-content"><p>Explore the network patterns that inspired the game.</p><div class="arcade-samples" role="group" aria-label="Packet examples"><button type="button" data-arcade-sample="timing" aria-pressed="true">Repeating connections</button><button type="button" data-arcade-sample="dns" aria-pressed="false">Long DNS queries</button></div><div class="arcade-sample-note"></div><div class="arcade-sample-scroll"><table><caption class="sr-only">Browser-only sample packet records</caption><thead><tr><th scope="col">Time</th><th scope="col">Destination</th><th scope="col">Protocol</th><th scope="col">Bytes</th></tr></thead><tbody></tbody></table></div></div></details>`;
  anchor.before(section);
  const field=section.querySelector('.arcade-field'),overlay=section.querySelector('.arcade-overlay'),tokensLayer=section.querySelector('.arcade-tokens'),fx=section.querySelector('.arcade-fx');
  const pause=section.querySelector('.arcade-pause'),motionButton=section.querySelector('.arcade-motion'),status=section.querySelector('.arcade-status');
  let phase='ready',round=0,caught=0,score=0,streak=0,bestStreak=0,mistakes=0,lane=1,flowMode=enabled(),visible=false;
  let spawnTimer,serial=0,best=0,keyboardMode=false;
  const tokens=new Map(),effects=new Set();
  try{best=Math.max(0,Math.min(1000000,Number(localStorage.getItem('portfolio-signal-best'))||0));}catch{}
  function saveBest(){if(score>best){best=score;try{localStorage.setItem('portfolio-signal-best',String(best));}catch{}}}
  function stopSpawning(){clearInterval(spawnTimer);spawnTimer=undefined;}
  function clearTokens(){tokens.forEach(token=>{token.animation?.cancel();token.node.remove();});tokens.clear();}
  function clearEffects(){effects.forEach(animation=>animation.cancel());effects.clear();fx.replaceChildren();}
  function updateHUD(){
    section.querySelector('[data-arcade-score]').textContent=String(score);section.querySelector('[data-arcade-best]').textContent=String(best);section.querySelector('[data-arcade-combo]').textContent=`×${Math.min(3,1+Math.floor(streak/3))}`;
    section.querySelector('.arcade-combo').classList.toggle('is-hot',streak>=3);section.querySelector('[data-arcade-round]').textContent=`${round+1} / 2`;
    section.querySelectorAll('.arcade-catch-meter i').forEach((pip,index)=>pip.classList.toggle('is-caught',index<caught));section.querySelector('.arcade-catch-meter').setAttribute('aria-label',`${caught} of 6 signals caught`);
    section.querySelectorAll('[data-arcade-lane]').forEach(node=>node.classList.toggle('is-keyboard-lane',keyboardMode&&Number(node.dataset.arcadeLane)===lane&&field===document.activeElement));
    pause.disabled=phase!=='playing'&&phase!=='paused';pause.textContent=phase==='paused'?'Resume':'Pause';motionButton.setAttribute('aria-pressed',String(flowMode));motionButton.textContent=flowMode?'Flow mode':'Pop-up mode';section.classList.toggle('is-playing',phase==='playing');
  }
  function showOverlay(){
    overlay.hidden=phase==='playing';if(phase==='playing')return;
    if(phase==='ready')overlay.innerHTML=`<div class="arcade-intro-icons" aria-hidden="true">${diamond}<span>vs</span>${friendly}</div><h3>Catch me if you can.</h3><p>Catch 6 diamonds to clear a round.<br>Circles are your friends. Let them through.</p><button type="button" class="arcade-primary" data-arcade-start>Let's play <span aria-hidden="true">↗</span></button><small>No countdown. Find your rhythm.</small>`;
    else if(phase==='paused')overlay.innerHTML='<span class="arcade-pause-symbol" aria-hidden="true">Ⅱ</span><h3>Taking a breather?</h3><button type="button" class="arcade-primary" data-arcade-resume>Jump back in <span aria-hidden="true">→</span></button>';
    else{const complete=phase==='complete';overlay.innerHTML=`<button type="button" class="arcade-trophy" data-arcade-confetti aria-label="Celebrate again">${trophy}</button><span class="arcade-round-clear">${complete?'Both rounds cleared':'Round 1 cleared'}</span><h3>${complete?(mistakes===0?'Clean sweep!':'Nicely caught!'):'Ghosts caught!'}</h3><div class="arcade-result-stats"><span><strong>${score}</strong>points</span><span><strong>${bestStreak}</strong>best streak</span></div><button type="button" class="arcade-primary" ${complete?'data-arcade-restart':'data-arcade-next'}>${complete?'One more run':'Bring on the swarm'} <span aria-hidden="true">→</span></button>${complete&&score===best?'<small>Personal best. That one is yours.</small>':!complete?'<small>Next up: two rogues at once.</small>':''}`;}
  }
  function particleBurst(x,y,confetti=false){
    if(document.hidden||!visible)return;const full=enabled(),count=confetti?42:8;
    for(let i=0;i<count;i++){
      const piece=document.createElement('i');piece.className=confetti?'arcade-confetti':'arcade-spark';piece.style.left=`${x}px`;piece.style.top=`${y}px`;piece.style.background=confetti?['#f2c75c','#9d8df1','#67cdb6','var(--ink)'][i%4]:'var(--ink)';fx.append(piece);
      const dx=(Math.random()-.5)*(confetti?Math.min(550,field.clientWidth):90),dy=confetti?50+Math.random()*210:(Math.random()-.5)*90;
      if(!full){piece.style.left=`${x+dx}px`;piece.style.top=`${Math.max(12,y+dy)}px`;}
      const frames=full?[{opacity:0,transform:'translate(0,0) rotate(0deg)'},{opacity:1,offset:.15},{opacity:0,transform:`translate(${dx}px,${dy}px) rotate(${i*37}deg)`}]:[{opacity:0},{opacity:1,offset:.25},{opacity:0}];
      const animation=piece.animate(frames,{duration:confetti?(full?1350:650):420,easing:'ease-out'});effects.add(animation);animation.finished.then(()=>{piece.remove();effects.delete(animation);},()=>piece.remove());
    }
  }
  function toast(text,x,y){
    const label=document.createElement('span');label.className='arcade-pop-score';label.textContent=text;label.style.left=`${Math.max(25,Math.min(field.clientWidth-75,x))}px`;label.style.top=`${Math.max(10,y-30)}px`;fx.append(label);
    const animation=label.animate(enabled()?[{opacity:1,translate:'0 0'},{opacity:0,translate:'0 -28px'}]:[{opacity:1},{opacity:0}],{duration:700,easing:'ease-out'});effects.add(animation);animation.finished.then(()=>{label.remove();effects.delete(animation);},()=>label.remove());
  }
  function removeToken(token){if(!tokens.has(token.id))return;tokens.delete(token.id);token.animation?.cancel();token.node.remove();}
  function keepRogues(){if(phase!=='playing')return;const wanted=round===0?1:2;for(let i=[...tokens.values()].filter(token=>token.rogue).length;i<wanted;i++)spawn(true);}
  function spawn(rogue){
    if(phase!=='playing'||tokens.size>=8)return;
    const id=++serial,node=document.createElement('button'),existing=[...tokens.values()];
    const loads=[0,1,2].map(row=>existing.filter(token=>token.row===row).length);
    const candidates=[0,1,2].filter(row=>rogue?!existing.some(token=>token.rogue&&token.row===row):loads[row]===Math.min(...loads));
    const row=candidates[(serial+round)%candidates.length];node.type='button';node.className=`arcade-token ${rogue?'is-rogue':'is-friendly'}`;node.dataset.arcadeToken=String(id);node.innerHTML=rogue?diamond:friendly;node.setAttribute('aria-label',`${rogue?'Catch rogue':'Leave friendly'} signal in lane ${row+1}`);
    const h=field.clientHeight,rowHeight=h/3,width=field.clientWidth,token={id,node,rogue,row,animation:null};tokens.set(id,token);tokensLayer.append(node);node.style.top=`${row*rowHeight+rowHeight/2-25}px`;
    if(flowMode){node.style.left='-55px';token.animation=node.animate([{transform:'translateX(0)'},{transform:`translateX(${width+110}px)`}],{duration:rogue?(round===0?6500:5500):7500,easing:'linear',fill:'forwards'});}
    else{const occupied=[...tokens.values()].filter(other=>other!==token&&other.row===row).map(other=>parseFloat(other.node.style.left)),options=[.2,.42,.65,.82].map(value=>Math.max(28,width*value-25)),x=options.find(x=>occupied.every(other=>Math.abs(x-other)>52))??options[0];node.style.left=`${x}px`;token.animation=node.animate([{opacity:0},{opacity:1,offset:.08},{opacity:1,offset:.87},{opacity:0}],{duration:rogue?7000:5500,fill:'forwards'});}
    token.animation.finished.then(()=>{if(!tokens.has(id))return;tokens.delete(id);node.remove();if(rogue){streak=0;updateHUD();status.textContent='One slipped by. Another is on its way.';}keepRogues();},()=>{});
  }
  function syncSpawning(){stopSpawning();if(phase!=='playing')return;spawnTimer=setInterval(()=>{if(tokens.size<7)spawn(false);keepRogues();},1200);}
  function seedField(){keepRogues();for(let i=0;i<3;i++)spawn(false);}
  function beginRound(){stopSpawning();clearTokens();clearEffects();caught=0;phase='playing';showOverlay();updateHUD();seedField();syncSpawning();field.focus({preventScroll:true});status.textContent=`Round ${round+1}. Catch diamonds and leave circles.`;}
  function finishRound(){phase=round===0?'round-clear':'complete';stopSpawning();clearTokens();saveBest();updateHUD();showOverlay();particleBurst(field.clientWidth/2,65,true);overlay.querySelector('.arcade-primary')?.focus({preventScroll:true});status.textContent=`${round===0?'Round one cleared':'Both rounds cleared'}. ${score} points.`;}
  function hit(token){
    if(phase!=='playing'||!token)return;const rect=token.node.getBoundingClientRect(),bounds=field.getBoundingClientRect(),x=rect.x+rect.width/2-bounds.x,y=rect.y+rect.height/2-bounds.y,quick=Number(token.animation?.currentTime)<1500,hadFocus=document.activeElement===token.node;removeToken(token);
    if(token.rogue){streak++;bestStreak=Math.max(bestStreak,streak);const points=10*Math.min(3,1+Math.floor(streak/3))+(quick?5:0);score+=points;caught++;particleBurst(x,y);toast(`+${points}${quick?' quick':''}${streak>1?' · '+streak+' streak':''}`,x,y);status.textContent=`Caught. ${caught} of 6. ${score} points.`;if(caught===6){finishRound();return;}keepRogues();}
    else{mistakes++;streak=0;score=Math.max(0,score-5);toast('Friendly! −5',x,y);status.textContent='That was a friendly circle. Go for a diamond.';}
    updateHUD();if(hadFocus)field.focus({preventScroll:true});
  }
  function setPaused(){if(phase!=='playing')return;phase='paused';stopSpawning();tokens.forEach(token=>{token.animation?.pause();token.node.disabled=true;});clearEffects();showOverlay();updateHUD();}
  function resume(){if(phase!=='paused'||document.hidden)return;phase='playing';const empty=tokens.size===0;tokens.forEach(token=>{token.node.disabled=false;token.animation?.play();});showOverlay();updateHUD();if(empty)seedField();else keepRogues();syncSpawning();field.focus({preventScroll:true});}
  function renderSamples(sample='timing'){
    const packets=sample==='dns'?dnsPackets:timingPackets;section.querySelector('.arcade-sample-note').textContent=sample==='dns'?'Repeated long queries under the same parent domain.':'Four 96-byte connections, spaced 20 seconds apart.';section.querySelectorAll('[data-arcade-sample]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.arcadeSample===sample)));section.querySelector('tbody').innerHTML=packets.map(packet=>`<tr><td>${packet.time}s</td><td>${flows[packet.flow].destination}</td><td>${flows[packet.flow].protocol}</td><td>${packet.size}</td></tr>`).join('');
  }
  section.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button.hasAttribute('data-arcade-start')||button.hasAttribute('data-arcade-restart')){round=0;score=0;streak=0;bestStreak=0;mistakes=0;beginRound();}
    else if(button.dataset.arcadeToken)hit(tokens.get(Number(button.dataset.arcadeToken)));
    else if(button.hasAttribute('data-arcade-next')){round=1;beginRound();}
    else if(button.hasAttribute('data-arcade-resume'))resume();
    else if(button.matches('.arcade-pause')){if(phase==='playing')setPaused();else resume();}
    else if(button.matches('.arcade-motion')){flowMode=!flowMode;const active=phase==='playing';clearTokens();updateHUD();if(active){seedField();field.focus({preventScroll:true});}}
    else if(button.hasAttribute('data-arcade-confetti'))particleBurst(field.clientWidth/2,65,true);
    else if(button.dataset.arcadeSample)renderSamples(button.dataset.arcadeSample);
  });
  field.addEventListener('keydown',event=>{
    if(phase==='playing'&&event.key==='Escape'){event.preventDefault();setPaused();overlay.querySelector('button')?.focus();return;}
    if(event.target!==field||phase!=='playing')return;
    keyboardMode=true;
    if(event.key==='ArrowUp'||event.key==='ArrowDown'){event.preventDefault();lane=(lane+(event.key==='ArrowDown'?1:2))%3;updateHUD();}
    else if(event.key===' '||event.key==='Enter'){event.preventDefault();const bounds=field.getBoundingClientRect();const target=[...tokens.values()].find(token=>{if(!token.rogue||token.row!==lane)return false;const rect=token.node.getBoundingClientRect();return rect.right>bounds.left+15&&rect.left<bounds.right-15&&Number(getComputedStyle(token.node).opacity)>.1;});if(target)hit(target);else toast('Try another lane',field.clientWidth/2,field.clientHeight/2);}
  });
  section.querySelector('.arcade-behind').addEventListener('toggle',event=>{if(event.currentTarget.open)setPaused();});
  field.addEventListener('pointerdown',()=>{keyboardMode=false;updateHUD();});
  field.addEventListener('focus',updateHUD);field.addEventListener('blur',updateHUD);
  new ResizeObserver(()=>{if(phase==='playing')setPaused();if(phase==='paused')clearTokens();}).observe(field);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible){setPaused();clearEffects();}},{threshold:.1}).observe(field);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)setPaused();});
  addEventListener('pagehide',()=>{saveBest();setPaused();stopSpawning();clearTokens();clearEffects();});
  renderSamples();showOverlay();updateHUD();
}
