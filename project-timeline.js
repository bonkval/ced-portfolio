import { projectHistory } from './project-history.js';

export function initProjectTimeline(enabled) {
  const layout=document.querySelector('.compact-case-layout');
  if(!layout)return;
  const slug=location.pathname.split('/').filter(Boolean)[1];
  const history=projectHistory[slug];if(!history)return;
  const count=history.stages.length;
  const timeline=document.createElement('details');timeline.className='project-timeline';timeline.open=true;
  const coords=[[85,35],[235,35],[235,105],[85,105]];
  timeline.innerHTML=`<summary><span class="timeline-title">Development timeline</span><span class="timeline-mode">${history.mode}</span><span class="timeline-chevron" aria-hidden="true">⌄</span></summary><div class="timeline-body"><div class="timeline-stage-row"><article class="timeline-stage" aria-live="polite" aria-atomic="true"></article><figure class="timeline-diagram"><figcaption>Current project workflow</figcaption><svg viewBox="0 0 320 140" role="img" aria-label="${history.pipeline.join(' to ')}"><path class="timeline-flow-path" d="M145 35h30 M235 60v20 M175 105h-30"/>${history.pipeline.map((label,index)=>`<g data-flow-step="${index}"><rect x="${coords[index][0]-60}" y="${coords[index][1]-21}" width="120" height="42" rx="6"/><text x="${coords[index][0]}" y="${coords[index][1]+4}" text-anchor="middle">${label}</text></g>`).join('')}</svg></figure></div><label class="timeline-range-label" for="project-time">Drag through the stages <output></output></label><input id="project-time" class="timeline-range" type="range" min="0" max="1000" step="1" value="0" aria-label="Project development stage"><div class="timeline-milestones" role="group" aria-label="Development milestones">${history.stages.map((stage,index)=>`<button type="button" data-stage="${index}" aria-pressed="${index===0}"><span aria-hidden="true">${String(index+1).padStart(2,'0')}</span>${stage.title}</button>`).join('')}</div></div>`;
  layout.after(timeline);
  const range=timeline.querySelector('input'),article=timeline.querySelector('article');
  let current=-1,animation;
  function render(index,snap=true) {
    if(snap)range.value=String(index/(count-1)*1000);
    timeline.style.setProperty('--timeline-progress',`${Number(range.value)/10}%`);
    const stage=history.stages[index];
    range.setAttribute('aria-valuetext',`Stage ${index+1} of ${count}: ${stage.title}`);
    timeline.querySelector('output').textContent=`${String(index+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;
    timeline.querySelectorAll('[data-stage]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.stage)===index)));
    if(index===current)return;
    current=index;
    const date=stage.date ? ` · ${new Date(stage.date+'T00:00:00Z').toLocaleDateString('en',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})}`:'';
    article.innerHTML=`<p class="interaction-label">${stage.kind}${date}</p><h3>${stage.title}</h3><p>${stage.text}</p><a class="timeline-source" href="${stage.source}" target="_blank" rel="noopener noreferrer">${stage.kind==='Public commit'?'View commit':'Source snapshot'} <code>${stage.sha}</code> <span aria-hidden="true">↗</span></a>`;
    timeline.querySelectorAll('[data-flow-step]').forEach(node=>node.classList.toggle('is-active',stage.flowStep!==null&&Number(node.dataset.flowStep)===stage.flowStep));
    animation?.cancel();
    const bounds=timeline.getBoundingClientRect();
    if(enabled()&&timeline.open&&!document.hidden&&bounds.top<innerHeight&&bounds.bottom>0) animation=article.animate([{opacity:.45},{opacity:1}],{duration:220,easing:'ease-out'});
  }
  range.addEventListener('input',()=>render(Math.round(Number(range.value)/1000*(count-1)),false));
  range.addEventListener('change',()=>render(current));
  range.addEventListener('keydown',event=>{
    const step={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1};
    if(event.key in step){event.preventDefault();render(Math.max(0,Math.min(count-1,current+step[event.key])));}
    else if(event.key==='Home'||event.key==='End'){event.preventDefault();render(event.key==='Home'?0:count-1);}
  });
  timeline.querySelectorAll('[data-stage]').forEach(button=>{
    button.addEventListener('click',()=>render(Number(button.dataset.stage)));
    button.addEventListener('keydown',event=>{
      if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;
      event.preventDefault();const next=Math.max(0,Math.min(count-1,Number(button.dataset.stage)+(event.key==='ArrowRight'?1:-1)));
      render(next);timeline.querySelector(`[data-stage="${next}"]`).focus({preventScroll:true});
    });
  });
  timeline.addEventListener('toggle',()=>{if(!timeline.open)animation?.cancel();});
  render(0);
}
