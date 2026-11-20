import { projects } from './project-metadata.js';

const positions = [[17,15],[50,11],[83,15],[17,38],[50,36],[83,38],[17,61],[50,63],[83,61],[32,86],[70,86]];
const categories = ['Python','JavaScript','TypeScript','SQL','Electron'];
const uses = (project,skill) => skill==='All' || project.skills.some(value=>value.toLowerCase()===skill.toLowerCase() || skill==='SQL'&&/^(sqlite|sql)$/i.test(value));

export function initProjectConstellation(enabled) {
  const rail = document.querySelector('#work [data-project-rail]');
  if (!rail) return;
  const section = rail.closest('section');
  const tools = document.createElement('div'); tools.className='project-explorer-tools';
  tools.innerHTML=`<div class="project-view-switch" role="group" aria-label="Project view"><button type="button" data-view="cards" aria-pressed="true">Cards</button><button type="button" data-view="map" aria-pressed="false">Map <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true"><path d="m4 5 11-2-5 12L4 5l12 7"/><circle cx="4" cy="5" r="2"/><circle cx="15" cy="3" r="2"/><circle cx="10" cy="15" r="2"/></svg></button></div><div class="project-skill-filters" role="group" aria-label="Highlight projects by skill">${['All',...categories].map(skill=>`<button type="button" data-skill="${skill}" aria-pressed="${skill==='All'}">${skill}</button>`).join('')}</div><span class="project-filter-status" role="status"></span>`;
  rail.before(tools);
  const map = document.createElement('div'); map.className='project-map';map.hidden=true;
  map.innerHTML='<p class="project-map-help">Shared skills connect the projects. Select a node to inspect it; use arrow keys to move between nodes.</p><div class="project-map-scroll" tabindex="0" role="region" aria-label="Project constellation. On small screens, scroll horizontally to explore the map."><div class="project-map-stage"><svg class="project-map-wires" viewBox="0 0 1000 440" preserveAspectRatio="none" aria-hidden="true"></svg></div></div><div class="project-map-preview" aria-live="polite"></div>';
  rail.after(map);
  const stage=map.querySelector('.project-map-stage'), wires=map.querySelector('svg');
  const preview=map.querySelector('.project-map-preview');
  let skill='All', view='cards', selected=projects[0].id;
  const nodes=new Map(), cards=[...rail.querySelectorAll('.project-card')];
  const edges=[];
  // Keep the diagram sparse: each project links to at most two later neighbours.
  projects.forEach((project,index)=>{
    let count=0;
    for(let next=index+1;next<projects.length&&count<2;next++) {
      const shared=categories.filter(category=>uses(project,category)&&uses(projects[next],category));
      if(shared.length){edges.push({from:project.id,to:projects[next].id,shared});count++;}
    }
    const button=document.createElement('button');button.type='button';button.className='project-map-node';
    button.dataset.mapProject=project.id;
    button.innerHTML=`<span class="map-node-pin" aria-hidden="true"></span><strong>${project.name}</strong><small>${project.skills.slice(0,2).join(' / ')}</small>`;
    button.setAttribute('aria-pressed',String(selected===project.id));
    stage.append(button);nodes.set(project.id,button);
    button.addEventListener('click',()=>{selected=project.id;showPreview(project);draw(false,true);});
    button.addEventListener('focus',()=>showPreview(project));
    button.addEventListener('pointerenter',()=>showPreview(project));
    button.addEventListener('keydown',event=>{
      const steps={ArrowRight:1,ArrowLeft:-1,ArrowDown:3,ArrowUp:-3,Home:-index,End:projects.length-1-index};
      if(!(event.key in steps))return;
      event.preventDefault();const target=Math.max(0,Math.min(projects.length-1,index+steps[event.key]));
      nodes.get(projects[target].id).focus();
    });
  });
  function showPreview(project) {
    preview.innerHTML=`<div><p class="interaction-label">Project details</p><h3>${project.name}</h3><p>${project.summary}</p></div><div class="map-preview-links"><span>${project.skills.slice(0,5).join(' · ')}</span><a href="${project.url}" class="text-link">Read documentation <span aria-hidden="true"><svg class="ui-arrow" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 15 15 5M5 5h10v10"/></svg></span></a></div>`;
  }
  function draw(rearrange=false,pulse=false) {
    const old=new Map();
    if(rearrange&&enabled()&&!map.hidden) nodes.forEach((node,id)=>{
      const current=node.getBoundingClientRect();
      node.getAnimations().forEach(animation=>animation.cancel());old.set(id,current);
    });
    const ordered=[...projects].sort((a,b)=>Number(uses(b,skill))-Number(uses(a,skill)));
    const coords=new Map();
    ordered.forEach((project,index)=>{
      const [x,y]=positions[index],node=nodes.get(project.id);coords.set(project.id,[x*10,y*4.4]);
      node.style.left=`calc(${x}% - 90px)`;node.style.top=`calc(${y}% - 31px)`;
      node.classList.toggle('is-skill-muted',!uses(project,skill));
      node.setAttribute('aria-pressed',String(selected===project.id));
    });
    // Read layout once after all nodes have moved, then run compositor-only FLIP.
    const moves=[];
    old.forEach((before,id)=>{const node=nodes.get(id),after=node.getBoundingClientRect();moves.push([node,before.left-after.left,before.top-after.top]);});
    moves.forEach(([node,x,y])=>{if(x||y)node.animate([{transform:`translate(${x}px,${y}px)`},{transform:'translate(0,0)'}],{duration:550,easing:'cubic-bezier(.16,1,.3,1)'});});
    wires.innerHTML=edges.map(edge=>{
      const a=coords.get(edge.from),b=coords.get(edge.to);
      const active=edge.from===selected||edge.to===selected;
      const dim=skill!=='All'&&!edge.shared.includes(skill);
      return `<path d="M${a[0]} ${a[1]} Q${(a[0]+b[0])/2+30} ${(a[1]+b[1])/2-25} ${b[0]} ${b[1]}" class="${active?'is-related ':''}${dim?'is-muted':''}"/>`;
    }).join('');
    if(pulse&&enabled())wires.querySelectorAll('.is-related').forEach(path=>path.animate([{strokeDasharray:'4 8',strokeDashoffset:100,opacity:1},{strokeDasharray:'4 8',strokeDashoffset:0,opacity:.7}],{duration:800,easing:'ease-out'}));
  }
  function setSkill(next) {
    skill=next;
    tools.querySelectorAll('[data-skill]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.skill===skill)));
    cards.forEach(card=>{
      const project=projects.find(project=>card.getAttribute('href')===project.url);
      card.classList.toggle('is-skill-muted',project&&!uses(project,skill));
    });
    const matching=projects.filter(project=>uses(project,skill));
    tools.querySelector('.project-filter-status').textContent=skill==='All'?'':`${matching.length} projects use ${skill}`;
    if(!matching.some(project=>project.id===selected))selected=matching[0].id;
    showPreview(projects.find(project=>project.id===selected));draw(true);
    if(view==='cards'&&skill!=='All') {
      const first=cards.find(card=>!card.classList.contains('is-skill-muted'));
      if(first)rail.scrollTo({left:first.offsetLeft-rail.offsetLeft,behavior:enabled()?'smooth':'instant'});
    }
  }
  tools.querySelectorAll('[data-skill]').forEach(button=>button.addEventListener('click',()=>setSkill(button.dataset.skill)));
  tools.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
    view=button.dataset.view;
    tools.querySelectorAll('[data-view]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    rail.hidden=view!=='cards';map.hidden=view!=='map';
    const scrubber=section.querySelector('.gallery-scrubber');if(scrubber)scrubber.hidden=view!=='cards';
    if(view==='map')draw();
  }));
  showPreview(projects[0]);draw();
}
