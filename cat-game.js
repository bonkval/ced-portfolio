const paw = '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><ellipse cx="16" cy="22" rx="8" ry="6"/><ellipse cx="7" cy="13" rx="3" ry="4" transform="rotate(-25 7 13)"/><ellipse cx="14" cy="8" rx="3" ry="4"/><ellipse cx="22" cy="9" rx="3" ry="4"/><ellipse cx="27" cy="15" rx="3" ry="4" transform="rotate(25 27 15)"/></svg>';
const boxArt = '<svg class="cat-box-art" viewBox="0 0 200 160" fill="none" aria-hidden="true"><path class="cat-box-shadow" d="M25 143q75-14 150 0-75 20-150 0"/><g class="cat-box-body"><path d="m30 70 70-22 70 22v61l-70 23-70-23Z"/><path d="m30 70 70 23 70-23M100 93v61"/><path class="cat-box-tape" d="m82 55 35 11v24l-17 5-18-6V55Z"/><path d="m44 108 18 6m-18 5 12 4"/></g><g class="cat-box-lid"><path d="m30 70 70-23 70 23-70 24Z"/><path d="m30 70-15-21 69-21 16 19m0 0 17-19 68 21-15 21"/><path d="m84 28 33 0"/></g></svg>';

export function initCatInvestigation(enabled) {
  const portrait=document.querySelector('.hero .profile-wrap'),row=document.querySelector('.hero .about-copy');
  if(!portrait||!row)return;
  portrait.tabIndex=0;portrait.setAttribute('role','button');portrait.setAttribute('aria-label','Play hide and seek with the hidden cat');
  const hint=document.createElement('button');hint.type='button';hint.className='cat-hint';
  hint.innerHTML=`${paw}<span>Hide N Seek</span>`;portrait.after(hint);
  const game=document.createElement('section');game.className='cat-game';game.id='cat-game';game.hidden=true;
  game.setAttribute('aria-labelledby','cat-game-title');
  hint.setAttribute('aria-controls',game.id);hint.setAttribute('aria-expanded','false');
  game.innerHTML=`<header class="cat-game-header"><div><h2 id="cat-game-title">Hide N Seek</h2><p>Kitty's hiding. Think you can keep up?</p></div><div class="cat-game-score" role="img" aria-label="0 of 3 rounds complete">${[0,1,2].map(i=>`<span data-cat-score="${i}">${paw}</span>`).join('')}</div><button type="button" class="cat-game-close" aria-label="Close cat game"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg></button></header><div class="cat-game-board" role="group" aria-label="Three hiding boxes">${[0,1,2].map(id=>`<button type="button" class="cat-box" data-cat-box="${id}"><span class="cat-box-head" aria-hidden="true"><img src="/public/assets/profile/profile2.webp" alt="" draggable="false"></span>${boxArt}<span class="cat-box-empty" aria-hidden="true">${paw}</span></button>`).join('')}</div><footer class="cat-game-footer"><p class="cat-game-status" role="status"></p><button type="button" class="cat-game-action">Let's hide! <span aria-hidden="true">↝</span></button></footer>`;
  row.after(game);
  const boxes=[...game.querySelectorAll('.cat-box')],action=game.querySelector('.cat-game-action'),status=game.querySelector('.cat-game-status');
  let phase='closed',round=0,cat=0,slots=[0,1,2],timers=[];
  const motions=new Set();
  function stopMotions(){motions.forEach(animation=>animation.cancel());motions.clear();}
  const schedule=(fn,delay)=>{const timer=setTimeout(fn,delay);timers.push(timer);};
  function cancel(){timers.forEach(clearTimeout);timers=[];}
  function position(){boxes.forEach((box,id)=>{box.style.setProperty('--cat-slot',slots[id]);box.setAttribute('aria-label',`Open the ${['left','middle','right'][slots[id]]} box`);});}
  function progress(){game.querySelectorAll('[data-cat-score]').forEach((node,i)=>node.classList.toggle('is-earned',i<round));game.querySelector('.cat-game-score').setAttribute('aria-label',`${round} of 3 rounds complete`);}
  function prepare(){
    cancel();stopMotions();phase='preview';cat=Math.floor(Math.random()*3);slots=[0,1,2];
    game.classList.remove('is-complete');
    boxes.forEach((box,id)=>{box.disabled=false;box.classList.remove('is-open','is-correct','is-empty');box.classList.toggle('is-peeking',id===cat);});
    position();progress();action.hidden=false;action.innerHTML="Let's hide! <span aria-hidden=\"true\">↝</span>";
    status.textContent=`Round ${round+1} of 3. Ready or not…`;
  }
  function open(){
    if(!game.hidden){game.querySelector('.cat-game-close').focus({preventScroll:true});return;}
    game.hidden=false;hint.setAttribute('aria-expanded','true');round=0;prepare();
    game.scrollIntoView({block:'nearest',behavior:enabled()?'smooth':'instant'});action.focus({preventScroll:true});
  }
  function shuffle(){
    cancel();phase='hiding';action.hidden=true;boxes.forEach(box=>box.classList.remove('is-peeking'));
    status.textContent='Shhh… hiding!';
    // Movement is part of this explicitly started game. Reduced motion gets
    // shorter straight swaps, without the decorative arc or victory burst.
    const fullMotion=enabled(),duration=fullMotion?520:360,spacing=duration+100;
    const hideDelay=fullMotion?560:180;
    const moves=3+round;
    for(let i=0;i<moves;i++)schedule(()=>{
      phase='shuffle';status.textContent='Keep your eyes on the boxes…';
      const before=boxes.map(box=>box.getBoundingClientRect());
      stopMotions();
      const first=Math.floor(Math.random()*3),second=(first+1+Math.floor(Math.random()*2))%3;
      [slots[first],slots[second]]=[slots[second],slots[first]];position();
      const after=boxes.map(box=>box.getBoundingClientRect());
      [first,second].forEach(id=>{
        const dx=before[id].left-after[id].left,arc=fullMotion?(id===first?-18:18):0;
        const frames=fullMotion?[
          {transform:`translate(${dx}px,0)`},
          {transform:`translate(${dx/2}px,${arc}px)`,offset:.5},
          {transform:'translate(0,0)'}
        ]:[{transform:`translate(${dx}px,0)`},{transform:'translate(0,0)'}];
        const animation=boxes[id].animate(frames,{duration,easing:'cubic-bezier(.4,0,.2,1)'});
        motions.add(animation);animation.finished.then(()=>motions.delete(animation),()=>motions.delete(animation));
      });
    },hideDelay+i*spacing);
    schedule(()=>{phase='pick';status.textContent='Pick a box. No peeking!';},hideDelay+moves*spacing);
  }
  function celebrate(){
    if(!enabled())return;
    const board=game.querySelector('.cat-game-board');
    for(let i=0;i<9;i++){
      const print=document.createElement('span');print.className='cat-win-paw';print.innerHTML=paw;board.append(print);
      print.animate([{opacity:0,transform:'translate(0,0) scale(.5)'},{opacity:.6,offset:.2},{opacity:0,transform:`translate(${(i-4)*35}px,${-60-Math.sin(i)*35}px) scale(1)`}],{duration:950,delay:i*35,easing:'ease-out'}).finished.finally(()=>print.remove());
    }
  }
  function pick(id){
    if(phase==='preview'){shuffle();return;}
    if(phase!=='pick'&&phase!=='shuffle')return;
    cancel();phase='pick';boxes[id].classList.add('is-open');
    if(id!==cat){boxes[id].classList.add('is-empty');boxes[id].disabled=true;status.textContent="Nope! Kitty's not in there.";boxes.find(box=>!box.disabled)?.focus({preventScroll:true});return;}
    phase='found';boxes[id].classList.add('is-correct');boxes.forEach(box=>box.disabled=true);round++;progress();celebrate();
    action.hidden=false;
    if(round===3){phase='complete';game.classList.add('is-complete');status.textContent='You found me three times!';action.textContent='Play again';}
    else{status.textContent='Peekaboo! You found me.';action.innerHTML='Next round <span aria-hidden="true">→</span>';}
    action.focus({preventScroll:true});
  }
  action.addEventListener('click',()=>{
    if(phase==='preview')shuffle();
    else if(phase==='found'){prepare();}
    else if(phase==='complete'){round=0;prepare();}
  });
  boxes.forEach((box,id)=>{
    box.addEventListener('click',()=>pick(id));
    box.addEventListener('keydown',event=>{
      if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;
      event.preventDefault();const candidates=boxes.filter(box=>!box.disabled).sort((a,b)=>slots[Number(a.dataset.catBox)]-slots[Number(b.dataset.catBox)]);
      const next=candidates[(candidates.indexOf(box)+(event.key==='ArrowRight'?1:candidates.length-1))%candidates.length];next?.focus();
    });
  });
  function close(){cancel();stopMotions();phase='closed';game.hidden=true;hint.setAttribute('aria-expanded','false');hint.focus({preventScroll:true});}
  game.querySelector('.cat-game-close').addEventListener('click',close);
  game.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close();}});
  hint.addEventListener('click',open);
  portrait.addEventListener('click',event=>{
    if(event.pointerType==='touch'&&!portrait.classList.contains('cat-peek')){portrait.classList.add('cat-peek');return;}
    open();
  });
  portrait.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();portrait.classList.add('cat-peek');open();}});
  function pauseShuffle(){if(phase==='shuffle'||phase==='hiding'){cancel();stopMotions();phase='pick';status.textContent='Pick a box. No peeking!';}}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseShuffle();});
  new IntersectionObserver(entries=>{
    if(!entries[0].isIntersecting)pauseShuffle();
  },{threshold:.05}).observe(game);
}
