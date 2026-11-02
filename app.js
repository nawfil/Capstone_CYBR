(function(){
"use strict";

/* ---------- icons ---------- */
var P={
 home:'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',
 tag:'M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8zM7.5 7.5h.01',
 doc:'M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5M9 13h6M9 17h6',
 spark:'M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2zM19 3v4M21 5h-4',
 gear:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
 search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
 plus:'M12 5v14M5 12h14',
 edit:'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
 trash:'M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6M10 11v6M14 11v6',
 ext:'M14 3h7v7M21 3l-9 9M19 14v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6',
 x:'M6 6l12 12M18 6L6 18',
 lock:'M6 11V8a6 6 0 1 1 12 0v3M5 11h14v10H5z'
};
function ic(n){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+P[n]+'"/></svg>'}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

/* ---------- seed data (from the CYBR taxonomy and wireframes) ---------- */
function seedCats(){return [
 {id:'topic',name:'Topic',multi:true,tags:['Phishing','Ransomware','Passwords','MFA','Privacy','Data breaches','AI','Scams','Incident response','Social engineering']},
 {id:'industry',name:'Industry',multi:true,tags:['Healthcare','Professional services','Retail','Real estate','Education','Not-for-profit','Small business']},
 {id:'audience',name:'Audience',multi:true,tags:['Business owners','Employees','Managers','Students','Technical staff','Non-technical staff']},
 {id:'delivery',name:'Delivery Mode',multi:true,tags:['In person','Online','Hybrid']},
 {id:'length',name:'Session Length',multi:false,tags:['30 mins','60 mins','90 mins','2 hours','Half day']},
 {id:'group',name:'Group Size',multi:false,tags:['Small (<10)','Medium (10-20)','Large (>20)']},
 {id:'level',name:'Knowledge Level',multi:false,tags:['Beginner','Intermediate','Advanced']},
 {id:'maturity',name:'Cyber Maturity',multi:false,tags:['Low','Developing','Established']},
 {id:'rtype',name:'Resource Type',multi:true,tags:['Presentation','Exercise','Worksheet','Case study','Discussion question','Facilitator notes']},
 {id:'equip',name:'Equipment',multi:true,tags:['Projector','Internet access','Participant devices','Breakout space','No equipment required']},
 {id:'juris',name:'Jurisdiction',multi:true,tags:['SA','Australia','International']},
 {id:'recency',name:'Recency',multi:false,tags:['Current','Needs review','Archived']}
];}
var S='Small (<10)',M='Medium (10-20)',L='Large (>20)';
function seedItems(){
 var n=0;
 function m(title,desc,t,i,a,d,len,g,lv,mat,rt,eq,j,rc){
  n++;
  return {id:'m'+n,title:title,desc:desc,link:'sample:'+n,
   tags:{topic:t,industry:i,audience:a,delivery:d,length:[len],group:[g],level:[lv],maturity:[mat],rtype:rt,equip:eq,juris:j,recency:[rc]}};
 }
 return [
 m('Spot the Phish: Healthcare Staff Workshop','Slides and a live inbox exercise using realistic clinic emails. Facilitator guide included.',['Phishing'],['Healthcare'],['Employees','Non-technical staff'],['In person'],'60 mins',L,'Beginner','Low',['Presentation','Exercise'],['Projector','Participant devices'],['SA','Australia'],'Current'),
 m('Phishing Inbox Simulation Worksheet','Printable worksheet where small groups mark up suspicious emails.',['Phishing','Scams'],['Professional services','Small business'],['Employees'],['In person','Hybrid'],'30 mins',S,'Beginner','Developing',['Worksheet'],['No equipment required'],['Australia'],'Current'),
 m('Ransomware Tabletop for Managers','Scenario-based tabletop exercise that walks managers through the first 24 hours of an attack.',['Ransomware','Incident response'],['Professional services','Real estate'],['Managers'],['In person'],'Half day',M,'Intermediate','Developing',['Exercise','Facilitator notes'],['Breakout space','Projector'],['SA','Australia'],'Current'),
 m('Password and MFA Basics (Online)','Short online session on password managers and turning on MFA.',['Passwords','MFA'],['Retail','Small business'],['Employees','Non-technical staff'],['Online'],'30 mins',L,'Beginner','Low',['Presentation'],['Internet access'],['Australia'],'Current'),
 m('Board Briefing: Cyber Risk in Plain English','Executive briefing deck with discussion questions on breach duties and privacy.',['Data breaches','Privacy'],['Not-for-profit','Professional services'],['Business owners','Managers'],['In person','Hybrid'],'60 mins',S,'Intermediate','Established',['Presentation','Discussion question'],['Projector'],['Australia'],'Needs review'),
 m('Scam Awareness Community Session','Plain-language talk on common scams with group discussion prompts.',['Scams','Phishing'],['Not-for-profit'],['Non-technical staff'],['In person'],'90 mins',M,'Beginner','Low',['Presentation','Discussion question'],['Projector'],['SA'],'Current'),
 m('AI Tools and Data Privacy at Work','What staff should and should not paste into AI tools, with two short case studies.',['AI','Privacy'],['Education','Professional services'],['Employees','Managers'],['Hybrid','Online'],'60 mins',M,'Intermediate','Developing',['Presentation','Case study'],['Projector','Internet access'],['Australia','International'],'Current'),
 m('Data Breach Case Study: Clinic Records','Detailed case study of a clinic breach, aimed at people who manage systems and data.',['Data breaches','Privacy'],['Healthcare'],['Managers','Technical staff'],['In person'],'2 hours',S,'Advanced','Established',['Case study'],['Projector','Breakout space'],['Australia'],'Current'),
 m('Social Engineering Role-Play Cards','Role-play cards for phone and in-person pretexting scenarios.',['Social engineering','Scams'],['Retail','Real estate'],['Employees'],['In person'],'60 mins',M,'Beginner','Developing',['Exercise'],['Breakout space'],['Australia'],'Current'),
 m('Student Online Safety Starter','Short assembly-style talk on privacy, scams and passwords.',['Privacy','Scams','Passwords'],['Education'],['Students'],['In person','Online'],'30 mins',L,'Beginner','Low',['Presentation'],['Projector'],['SA','Australia'],'Current'),
 m('Incident Response Runbook Walkthrough','Hands-on walkthrough of a runbook for technical responders.',['Incident response'],['Professional services'],['Technical staff'],['Hybrid'],'Half day',S,'Advanced','Established',['Exercise','Facilitator notes'],['Participant devices','Internet access'],['International'],'Needs review'),
 m('Real Estate Wire Fraud Awareness','Case studies of payment redirection fraud in property settlements.',['Phishing','Scams'],['Real estate'],['Employees','Business owners'],['In person','Online'],'60 mins',M,'Intermediate','Developing',['Presentation','Case study'],['Projector'],['Australia'],'Current'),
 m('MFA Rollout Facilitator Pack','Everything a facilitator needs to help a small business switch on MFA.',['MFA','Passwords'],['Small business'],['Business owners','Managers'],['Hybrid'],'90 mins',S,'Beginner','Low',['Facilitator notes','Presentation'],['Projector'],['Australia'],'Current'),
 m('Phishing Basics 2021 Deck','Original phishing deck. Replaced by newer healthcare and retail material.',['Phishing'],['Retail'],['Employees'],['In person'],'60 mins',L,'Beginner','Low',['Presentation'],['Projector'],['Australia'],'Archived'),
 m('Healthcare Privacy Discussion Prompts','Discussion prompts on patient privacy for a lunchtime session. No equipment needed.',['Privacy'],['Healthcare'],['Employees','Managers'],['In person','Hybrid'],'30 mins',M,'Intermediate','Established',['Discussion question'],['No equipment required'],['SA','Australia'],'Current'),
 m('Executive Ransomware Decision Game','Timed decision game where executives choose whether to pay, report or restore.',['Ransomware'],['Professional services','Healthcare'],['Managers','Business owners'],['In person'],'2 hours',S,'Advanced','Established',['Exercise','Case study'],['Projector','Breakout space'],['Australia'],'Current'),
 m('Small Business Cyber Essentials','Core session for owner-operators covering passwords, MFA, phishing and ransomware.',['Passwords','MFA','Phishing','Ransomware'],['Small business'],['Business owners'],['Online'],'60 mins',S,'Beginner','Low',['Presentation','Worksheet'],['Internet access'],['Australia'],'Current'),
 m('Healthcare Phishing Quiz Cards','Quick quiz cards for a ward or front-desk huddle.',['Phishing'],['Healthcare'],['Non-technical staff'],['In person'],'30 mins',L,'Beginner','Low',['Exercise'],['No equipment required'],['SA'],'Current')
 ];
}

/* ---------- state ---------- */
var KEY='cybr-prototype-v1';
var st={cats:null,items:null,role:'admin',view:'library',filters:{},q:'',page:1,
 rec:{topic:['Phishing'],industry:['Healthcare'],audience:['Non-technical staff'],delivery:['In person'],length:['60 mins'],group:[L],level:['Beginner']},
 recArchived:false,confirmDel:null,modal:null};
var PER=6;
function load(){
 try{var r=localStorage.getItem(KEY);if(r){var d=JSON.parse(r);if(d&&d.cats&&d.items){st.cats=d.cats;st.items=d.items;return}}}catch(e){}
 st.cats=seedCats();st.items=seedItems();
}
function save(){try{localStorage.setItem(KEY,JSON.stringify({cats:st.cats,items:st.items}))}catch(e){}}
function cat(id){return st.cats.filter(function(c){return c.id===id})[0]}
function isAdmin(){return st.role==='admin'}
function toast(msg){
 var t=document.getElementById('toast');t.innerHTML='<div class="toast">'+esc(msg)+'</div>';
 clearTimeout(toast.t);toast.t=setTimeout(function(){t.innerHTML=''},2600);
}

/* ---------- filtering ---------- */
function activeFilters(){
 var out=[];
 st.cats.forEach(function(c){(st.filters[c.id]||[]).forEach(function(t){out.push({c:c,t:t})})});
 return out;
}
function matches(it){
 var q=st.q.trim().toLowerCase();
 if(q){
  var hay=(it.title+' '+it.desc+' '+Object.keys(it.tags).map(function(k){return it.tags[k].join(' ')}).join(' ')).toLowerCase();
  if(!q.split(/\s+/).every(function(w){return hay.indexOf(w)>-1}))return false;
 }
 return st.cats.every(function(c){
  var f=st.filters[c.id];if(!f||!f.length)return true;
  var have=it.tags[c.id]||[];
  return f.some(function(t){return have.indexOf(t)>-1});
 });
}
function tagCount(cid,t){return st.items.filter(function(it){return (it.tags[cid]||[]).indexOf(t)>-1}).length}

/* ---------- views ---------- */
var NAV=[['dashboard','Dashboard','home'],['library','Training Materials','doc'],['recommend','Find for a Session','spark'],['tags','Tags & Categories','tag'],['settings','Settings','gear']];
function renderNav(){
 document.getElementById('nav').innerHTML=NAV.map(function(n){
  return '<button data-act="view" data-v="'+n[0]+'"'+(st.view===n[0]?' aria-current="page"':'')+'>'+ic(n[2])+n[1]+'</button>';
 }).join('');
}

function cardHtml(it){
 var order=['topic','level','rtype','delivery','length','industry','audience','group'];
 var chips=[];
 order.forEach(function(k){(it.tags[k]||[]).forEach(function(t){chips.push(t)})});
 var rc=(it.tags.recency||[])[0];
 var shown=chips.slice(0,6),more=chips.length-shown.length;
 var h='<article class="card"><h3>'+esc(it.title)+'</h3><p>'+esc(it.desc)+'</p><div class="chips">';
 if(rc==='Needs review')h+='<span class="chip warn">Needs review</span>';
 if(rc==='Archived')h+='<span class="chip muted">Archived</span>';
 h+=shown.map(function(t){return '<span class="chip">'+esc(t)+'</span>'}).join('');
 if(more>0)h+='<span class="chip more">+'+more+'</span>';
 h+='</div><div class="foot"><a href="'+(it.link.indexOf('sample:')===0?'#':esc(it.link))+'" '+(it.link.indexOf('sample:')===0?'data-act="sample"':'target="_blank" rel="noopener"')+'>Open in Drive '+ic('ext')+'</a>';
 if(isAdmin())h+='<button class="btn sm" data-act="editmat" data-id="'+it.id+'">'+ic('edit')+'Edit</button>';
 return h+'</div></article>';
}

function viewLibrary(){
 var af=activeFilters();
 var list=st.items.filter(matches);
 var pages=Math.max(1,Math.ceil(list.length/PER));
 if(st.page>pages)st.page=pages;
 var slice=list.slice((st.page-1)*PER,st.page*PER);
 var h='<div class="pagehead"><div><h1>Training Materials</h1><p>Search by keyword or narrow by tag. Files stay in CYBR\'s Google Drive; this library stores the link and the tags.</p></div>';
 if(isAdmin())h+='<button class="btn primary" data-act="addmat">'+ic('plus')+'Add material</button>';
 h+='</div><div class="lib"><details class="panel filters" id="fdet" open><summary><h2>Filters</h2><span class="tog btn sm">Show / hide</span></summary><div class="fbody">';
 st.cats.forEach(function(c){
  h+='<div class="fgroup"><h3>'+esc(c.name)+'</h3><div class="opts">';
  c.tags.forEach(function(t){
   var on=(st.filters[c.id]||[]).indexOf(t)>-1;
   h+='<button class="opt" aria-pressed="'+on+'" data-act="ftoggle" data-c="'+c.id+'" data-t="'+esc(t)+'"><span>'+esc(t)+'</span><i>'+tagCount(c.id,t)+'</i></button>';
  });
  h+='</div></div>';
 });
 h+='</div></details><div><div class="searchrow"><label class="search" for="q">'+ic('search')+'<span class="sr">Search materials</span><input id="q" type="search" placeholder="Search titles, descriptions and tags" value="'+esc(st.q)+'" autocomplete="off"></label></div>';
 h+='<div class="active"><b>Active filters</b>';
 if(!af.length&&!st.q)h+='<span class="tagline">None. Showing every material.</span>';
 af.forEach(function(f){h+='<span class="fchip">'+esc(f.c.name)+': '+esc(f.t)+'<button data-act="ftoggle" data-c="'+f.c.id+'" data-t="'+esc(f.t)+'" aria-label="Remove '+esc(f.t)+'">'+ic('x').replace('<svg','<svg width="12" height="12"')+'</button></span>'});
 if(af.length||st.q)h+='<button class="btn danger sm" data-act="clear" style="margin-left:auto">Remove filters</button>';
 h+='</div><p class="count">'+list.length+' of '+st.items.length+' materials</p>';
 if(!slice.length)h+='<div class="empty">No materials match these filters. Remove a filter or search for fewer words.</div>';
 else h+='<div class="grid">'+slice.map(cardHtml).join('')+'</div>';
 if(pages>1){
  h+='<div class="pager"><button data-act="page" data-p="'+(st.page-1)+'"'+(st.page===1?' disabled':'')+' aria-label="Previous page">&lt;</button>';
  for(var p=1;p<=pages;p++)h+='<button data-act="page" data-p="'+p+'"'+(p===st.page?' aria-current="page"':'')+'>'+p+'</button>';
  h+='<button data-act="page" data-p="'+(st.page+1)+'"'+(st.page===pages?' disabled':'')+' aria-label="Next page">&gt;</button></div>';
 }
 return h+'</div></div>';
}

/* recommender */
var NO_REC={rtype:1,recency:1};
var WT={topic:3,audience:2,industry:2,level:2,length:2,delivery:2,group:1,maturity:1,equip:1,juris:.5};
var ORD={length:1,group:1,level:1,maturity:1};
function scoreItem(it){
 var tot=0,got=0,why=[];
 st.cats.forEach(function(c){
  if(NO_REC[c.id])return;
  var want=st.rec[c.id]||[];if(!want.length)return;
  var have=it.tags[c.id]||[],w=WT[c.id]||1,s,kind,label;
  tot+=w;
  if(!have.length){s=.5;kind='nt';label=c.name+': not tagged'}
  else if(c.id==='equip'){
   var miss=have.filter(function(t){return want.indexOf(t)<0&&t!=='No equipment required'});
   s=miss.length?0:1;kind=s?'ok':'miss';label=s?'Equipment OK':'Needs '+miss.join(', ');
  }else if(!c.multi){
   var wt=want[0],ht=have[0];
   if(wt===ht){s=1;kind='ok';label=ht}
   else if(ORD[c.id]&&Math.abs(c.tags.indexOf(wt)-c.tags.indexOf(ht))===1){s=.4;kind='part';label=c.name+': '+ht}
   else{s=0;kind='miss';label=c.name+': '+ht}
  }else{
   var inter=want.filter(function(t){return have.indexOf(t)>-1});
   s=inter.length/want.length;
   if(s===1){kind='ok';label=inter.join(', ')}
   else if(s>0){kind='part';label=inter.join(', ')+' (of '+want.length+')'}
   else{kind='miss';label=c.name+': '+have.join(', ')}
  }
  got+=w*s;why.push({k:kind,l:label});
 });
 return {it:it,score:tot?got/tot:0,why:why,tot:tot};
}
function viewRecommend(){
 var h='<div class="pagehead"><div><h1>Find for a Session</h1><p>Describe the upcoming session and get a ranked shortlist. Pick as many or as few details as you know.</p></div></div><div class="rec"><section class="panel recform" aria-label="Session details">';
 st.cats.forEach(function(c){
  if(NO_REC[c.id])return;
  var want=st.rec[c.id]||[];
  var lab=c.id==='equip'?'Equipment available':c.name;
  h+='<div class="fgroup"><h3>'+esc(lab)+' <span>'+(c.multi?'choose any':'choose one')+'</span></h3><div class="pillrow">';
  c.tags.forEach(function(t){h+='<button class="pill" aria-pressed="'+(want.indexOf(t)>-1)+'" data-act="rtoggle" data-c="'+c.id+'" data-t="'+esc(t)+'">'+esc(t)+'</button>'});
  h+='</div></div>';
 });
 h+='<div class="fgroup sel"><input type="checkbox" id="rarch"'+(st.recArchived?' checked':'')+'><label for="rarch">Include archived materials</label></div>';
 h+='<div class="mfoot"><button class="btn" data-act="rreset">Clear session details</button></div></section><section aria-label="Shortlist">';
 var res=st.items.filter(function(it){return st.recArchived||(it.tags.recency||[])[0]!=='Archived'}).map(scoreItem);
 var any=Object.keys(st.rec).some(function(k){return (st.rec[k]||[]).length&&!NO_REC[k]});
 h+='<div class="notice"><b>A starting point, not a decision.</b> Scores show how closely each material\'s tags fit the session. Untagged fields count as neutral so thinly tagged materials are not pushed out. Review each one before you use it.</div>';
 if(!any)h+='<div class="empty">Choose at least one session detail to see a shortlist.</div>';
 else{
  res.sort(function(a,b){return b.score-a.score||a.it.title.localeCompare(b.it.title)});
  res.slice(0,8).forEach(function(r){
   var pct=Math.round(r.score*100);
   var tier=pct>=80?'Strong match':pct>=55?'Partial match':'Weak match';
   var rc=(r.it.tags.recency||[])[0];
   h+='<article class="panel result"><header><div><h3>'+esc(r.it.title)+'</h3><span class="tagline">'+tier+(rc==='Needs review'?' · tagged "Needs review"':rc==='Archived'?' · archived':'')+'</span></div><span class="score">'+pct+'%</span></header>';
   h+='<div class="bar" role="img" aria-label="'+pct+' percent match"><i style="width:'+pct+'%"></i></div><div class="why">'+r.why.map(function(w){return '<span class="chip '+w.k+'">'+esc(w.l)+'</span>'}).join('')+'</div>';
   h+='<div class="foot"><a href="'+(r.it.link.indexOf('sample:')===0?'#':esc(r.it.link))+'" '+(r.it.link.indexOf('sample:')===0?'data-act="sample"':'target="_blank" rel="noopener"')+'>Open in Drive '+ic('ext')+'</a></div></article>';
  });
 }
 return h+'</section></div>';
}

/* tags & categories */
function viewTags(){
 var h='<div class="pagehead"><div><h1>Manage Tags &amp; Categories</h1><p>These categories and tags are what staff pick when adding a material and what the filters and shortlist use.</p></div>';
 if(isAdmin())h+='<button class="btn primary" data-act="addcat">'+ic('plus')+'Add category</button>';
 h+='</div>';
 if(!isAdmin())h+='<div class="lock">'+ic('lock').replace('<svg','<svg width="18" height="18"')+'Only administrators can change tags and categories. You can view them here.</div>';
 h+='<div class="tablewrap"><table><thead><tr><th>Category</th><th>Tags</th><th>Selection</th>'+(isAdmin()?'<th>Actions</th>':'')+'</tr></thead><tbody>';
 st.cats.forEach(function(c){
  var ex=c.tags.slice(0,4).join(', ')+(c.tags.length>4?' … ('+c.tags.length+')':'');
  h+='<tr><td><b>'+esc(c.name)+'</b></td><td class="tagline">'+esc(ex)+'</td><td class="kind">'+(c.multi?'Multi':'Single')+'</td>';
  if(isAdmin()){
   if(st.confirmDel===c.id)h+='<td class="act">Delete and untag? <button class="btn danger sm" data-act="delcat" data-id="'+c.id+'">Delete</button> <button class="btn sm" data-act="cancelcat">Cancel</button></td>';
   else h+='<td class="act"><button class="iconbtn" data-act="editcat" data-id="'+c.id+'" aria-label="Edit '+esc(c.name)+'">'+ic('edit')+'</button><button class="iconbtn" data-act="askdel" data-id="'+c.id+'" aria-label="Delete '+esc(c.name)+'">'+ic('trash')+'</button></td>';
  }
  h+='</tr>';
 });
 return h+'</tbody></table></div>';
}

/* dashboard */
function viewDashboard(){
 var cur=0,rev=[],arch=0;
 st.items.forEach(function(it){var r=(it.tags.recency||[])[0];if(r==='Needs review')rev.push(it);else if(r==='Archived')arch++;else cur++});
 var h='<div class="pagehead"><div><h1>Dashboard</h1><p>How well the library is tagged, and what needs attention.</p></div></div><div class="stats">';
 h+='<div class="panel stat"><b>'+st.items.length+'</b><span>Materials registered</span></div>';
 h+='<div class="panel stat"><b>'+cur+'</b><span>Current</span></div>';
 h+='<div class="panel stat flag"><b>'+rev.length+'</b><span>Needs review</span></div>';
 h+='<div class="panel stat"><b>'+arch+'</b><span>Archived</span></div></div>';
 h+='<h2 style="font-size:18px;margin-bottom:10px">Coverage by tag</h2><div class="cov">';
 ['topic','industry','audience'].forEach(function(id){
  var c=cat(id);if(!c)return;
  var counts=c.tags.map(function(t){return [t,tagCount(id,t)]});
  var mx=Math.max.apply(null,counts.map(function(x){return x[1]}).concat([1]));
  h+='<div class="panel"><h3>'+esc(c.name)+'</h3>';
  counts.forEach(function(x){h+='<div class="covrow'+(x[1]===0?' zero':'')+'"><span title="'+esc(x[0])+'">'+esc(x[0])+'</span><div class="bar"><i style="width:'+(x[1]/mx*100)+'%"></i></div><b>'+x[1]+'</b></div>'});
  h+='</div>';
 });
 h+='</div><h2 style="font-size:18px;margin-bottom:10px">Needs review</h2><div class="panel">';
 if(!rev.length)h+='<div class="listrow">Nothing is waiting for review.</div>';
 rev.forEach(function(it){h+='<div class="listrow"><span>'+esc(it.title)+'</span>'+(isAdmin()?'<button class="btn sm" data-act="editmat" data-id="'+it.id+'">'+ic('edit')+'Edit</button>':'')+'</div>'});
 return h+'</div>';
}

function viewSettings(){
 return '<div class="pagehead"><div><h1>Settings</h1><p>Prototype controls for evaluation.</p></div></div>'+
 '<div class="panel" style="padding:18px;display:grid;gap:14px;max-width:640px">'+
 '<div><h3 style="font-size:16px">Access control</h3><p class="tagline" style="margin:4px 0 0">The role selector in the header stands in for sign-in. Trainers can search, filter and get shortlists. Administrators can also add and edit materials and manage tags and categories.</p></div>'+
 '<div><h3 style="font-size:16px">Storage</h3><p class="tagline" style="margin:4px 0 0">Changes are saved in this browser only. The sample materials use placeholder Drive links. In the real system each material would link to its file in CYBR\'s Google Drive.</p></div>'+
 '<div><button class="btn danger" data-act="resetdata">Reset to sample data</button></div></div>';
}

/* ---------- render ---------- */
function render(){
 var a=document.activeElement,id=a&&a.id,ss=a&&a.selectionStart;
 renderNav();
 var v=st.view;
 if(v==='tags'&&false){}
 document.getElementById('main').innerHTML=
  v==='dashboard'?viewDashboard():v==='recommend'?viewRecommend():v==='tags'?viewTags():v==='settings'?viewSettings():viewLibrary();
 if(id){var e=document.getElementById(id);if(e&&e.focus){e.focus();try{if(ss!=null)e.setSelectionRange(ss,ss)}catch(x){}}}
 document.getElementById('role').value=st.role;
}

/* ---------- modals ---------- */
function openModal(html){document.getElementById('modal').innerHTML='<div class="scrim" data-act="scrim"><div class="modal" role="dialog" aria-modal="true">'+html+'</div></div>';var f=document.querySelector('#modal input,#modal select');if(f)f.focus()}
function closeModal(){document.getElementById('modal').innerHTML='';st.modal=null}

function matModal(id){
 var it=id?st.items.filter(function(x){return x.id===id})[0]:null;
 st.modal={type:'mat',id:id};
 var h='<h2>'+(it?'Edit training material':'Add training material')+'</h2><form id="matform" novalidate>';
 h+='<div class="field"><label for="f_title">Title</label><input class="in" id="f_title" value="'+esc(it?it.title:'')+'"></div>';
 h+='<div class="field"><label for="f_link">Google Drive link <small>(the file stays in Drive)</small></label><input class="in" id="f_link" placeholder="https://drive.google.com/…" value="'+esc(it&&it.link.indexOf('sample:')!==0?it.link:'')+'"></div>';
 h+='<div class="field"><label for="f_desc">Short description <small>(optional)</small></label><input class="in" id="f_desc" value="'+esc(it?it.desc:'')+'"></div><div class="two">';
 st.cats.forEach(function(c){
  var have=it?(it.tags[c.id]||[]):[];
  if(c.multi){
   h+='<div class="field"><span class="lab">'+esc(c.name)+' <small>(choose any)</small></span><div class="multi">';
   c.tags.forEach(function(t){h+='<button type="button" class="pill" aria-pressed="'+(have.indexOf(t)>-1)+'" data-act="mpill" data-c="'+c.id+'" data-t="'+esc(t)+'">'+esc(t)+'</button>'});
   h+='</div></div>';
  }else{
   h+='<div class="field"><label for="f_'+c.id+'">'+esc(c.name)+'</label><select class="in" id="f_'+c.id+'" data-single="'+c.id+'"><option value="">Not set</option>';
   c.tags.forEach(function(t){h+='<option'+(have[0]===t?' selected':'')+'>'+esc(t)+'</option>'});
   h+='</select></div>';
  }
 });
 h+='</div><p class="err" id="merr" hidden></p><div class="mfoot">';
 if(it)h+='<button type="button" class="btn danger" data-act="delmat" id="delmat" style="margin-right:auto">Delete material</button>';
 h+='<button type="button" class="btn" data-act="closemodal">Cancel</button><button type="submit" class="btn primary">Save material</button></div></form>';
 openModal(h);
}
function saveMat(){
 var title=document.getElementById('f_title').value.trim();
 var err=document.getElementById('merr');
 if(!title){err.textContent='Enter a title before saving.';err.hidden=false;document.getElementById('f_title').focus();return}
 var link=document.getElementById('f_link').value.trim();
 if(link&&!/^https?:\/\//i.test(link)){err.textContent='The link needs to start with https://';err.hidden=false;document.getElementById('f_link').focus();return}
 var id=st.modal.id,it=id?st.items.filter(function(x){return x.id===id})[0]:null;
 var tags={};
 st.cats.forEach(function(c){
  if(c.multi){
   tags[c.id]=[].map.call(document.querySelectorAll('#modal [data-act="mpill"][data-c="'+c.id+'"][aria-pressed="true"]'),function(b){return b.getAttribute('data-t')});
  }else{var v=document.getElementById('f_'+c.id).value;tags[c.id]=v?[v]:[]}
 });
 var desc=document.getElementById('f_desc').value.trim();
 if(it){it.title=title;it.desc=desc;it.tags=tags;if(link||it.link.indexOf('sample:')!==0)it.link=link||it.link}
 else st.items.unshift({id:'m'+Date.now(),title:title,desc:desc,link:link||'sample:new',tags:tags});
 save();closeModal();render();toast(it?'Material saved':'Material added');
}

var catDraft=null;
function catModal(id){
 var c=id?cat(id):null;
 st.modal={type:'cat',id:id};
 catDraft={name:c?c.name:'',multi:c?c.multi:true,rows:c?c.tags.map(function(t){return {orig:t,name:t}}):[{orig:'',name:''}]};
 drawCatModal();
}
function drawCatModal(err){
 var c=st.modal.id;
 var h='<h2>'+(c?'Edit category':'Add category')+'</h2><form id="catform" novalidate><div class="two"><div class="field"><label for="c_name">Category name</label><input class="in" id="c_name" value="'+esc(catDraft.name)+'"></div>';
 h+='<div class="field"><label for="c_multi">Selection</label><select class="in" id="c_multi"><option value="1"'+(catDraft.multi?' selected':'')+'>Multi: pick any number of tags</option><option value="0"'+(!catDraft.multi?' selected':'')+'>Single: pick one tag</option></select></div></div>';
 h+='<div class="field"><span class="lab">Tags</span>';
 catDraft.rows.forEach(function(r,i){
  h+='<div class="tagrow"><input class="in" data-row="'+i+'" aria-label="Tag '+(i+1)+'" value="'+esc(r.name)+'"><button type="button" class="iconbtn" data-act="rmrow" data-i="'+i+'" aria-label="Remove tag">'+ic('trash')+'</button></div>';
 });
 h+='<div><button type="button" class="btn sm" data-act="addrow">'+ic('plus')+'Add tag</button></div></div>';
 if(c)h+='<p class="tagline">Renaming a tag updates every material that uses it. Removing a tag removes it from those materials.</p>';
 h+='<p class="err" id="cerr"'+(err?'':' hidden')+'>'+esc(err||'')+'</p><div class="mfoot"><button type="button" class="btn" data-act="closemodal">Cancel</button><button type="submit" class="btn primary">Save category</button></div></form>';
 openModal(h);
 var rows=document.querySelectorAll('#modal [data-row]');
 if(rows.length&&!c&&catDraft.rows.length===1)document.getElementById('c_name').focus();
}
function readCatDraft(){
 var n=document.getElementById('c_name');if(!n)return;
 catDraft.name=n.value;catDraft.multi=document.getElementById('c_multi').value==='1';
 [].forEach.call(document.querySelectorAll('#modal [data-row]'),function(e){catDraft.rows[+e.getAttribute('data-row')].name=e.value});
}
function saveCat(){
 readCatDraft();
 var name=catDraft.name.trim();
 if(!name)return drawCatModal('Enter a category name.');
 var rows=catDraft.rows.map(function(r){return {orig:r.orig,name:r.name.trim()}}).filter(function(r){return r.name});
 var seen={},dup=false;rows.forEach(function(r){var k=r.name.toLowerCase();if(seen[k])dup=true;seen[k]=1});
 if(dup)return drawCatModal('Two tags have the same name. Rename or remove one.');
 if(!rows.length)return drawCatModal('Add at least one tag.');
 var id=st.modal.id,c=id?cat(id):null;
 if(!c){
  var base=name.toLowerCase().replace(/[^a-z0-9]+/g,'-')||'cat',nid=base,k=1;
  while(cat(nid))nid=base+'-'+(++k);
  st.cats.push({id:nid,name:name,multi:catDraft.multi,tags:rows.map(function(r){return r.name})});
 }else{
  var map={};rows.forEach(function(r){if(r.orig)map[r.orig]=r.name});
  st.items.forEach(function(it){
   var have=it.tags[c.id]||[];
   it.tags[c.id]=have.filter(function(t){return map[t]!==undefined}).map(function(t){return map[t]});
   if(!catDraft.multi&&it.tags[c.id].length>1)it.tags[c.id]=[it.tags[c.id][0]];
  });
  if(st.filters[c.id])st.filters[c.id]=st.filters[c.id].filter(function(t){return map[t]!==undefined}).map(function(t){return map[t]});
  if(st.rec[c.id])st.rec[c.id]=st.rec[c.id].filter(function(t){return map[t]!==undefined}).map(function(t){return map[t]});
  c.name=name;c.multi=catDraft.multi;c.tags=rows.map(function(r){return r.name});
 }
 save();closeModal();render();toast('Category saved');
}

/* ---------- events ---------- */
function toggleIn(map,cid,t,multi){
 var a=map[cid]||[];
 var i=a.indexOf(t);
 if(i>-1)a=a.filter(function(x){return x!==t});
 else a=multi?a.concat([t]):[t];
 map[cid]=a;
}
document.addEventListener('click',function(e){
 var el=e.target.closest('[data-act]');
 if(!el){return}
 var act=el.getAttribute('data-act');
 var c=el.getAttribute('data-c'),t=el.getAttribute('data-t'),id=el.getAttribute('data-id');
 if(act==='scrim'){if(e.target===el)closeModal();return}
 if(act==='sample'){e.preventDefault();toast('Sample link. Real materials open their file in Google Drive.');return}
 switch(act){
  case 'view':st.view=el.getAttribute('data-v');st.confirmDel=null;render();window.scrollTo(0,0);break;
  case 'ftoggle':toggleIn(st.filters,c,t,true);st.page=1;render();break;
  case 'clear':st.filters={};st.q='';st.page=1;render();break;
  case 'page':st.page=+el.getAttribute('data-p');render();window.scrollTo(0,0);break;
  case 'rtoggle':var cc=cat(c);toggleIn(st.rec,c,t,cc.multi);render();break;
  case 'rreset':st.rec={};render();break;
  case 'addmat':matModal(null);break;
  case 'editmat':matModal(id);break;
  case 'mpill':el.setAttribute('aria-pressed',el.getAttribute('aria-pressed')==='true'?'false':'true');break;
  case 'delmat':
   if(el.getAttribute('data-sure')){st.items=st.items.filter(function(x){return x.id!==st.modal.id});save();closeModal();render();toast('Material deleted')}
   else{el.setAttribute('data-sure','1');el.textContent='Click again to delete'}
   break;
  case 'closemodal':closeModal();break;
  case 'addcat':catModal(null);break;
  case 'editcat':catModal(id);break;
  case 'askdel':st.confirmDel=id;render();break;
  case 'cancelcat':st.confirmDel=null;render();break;
  case 'delcat':
   st.cats=st.cats.filter(function(x){return x.id!==id});
   st.items.forEach(function(it){delete it.tags[id]});delete st.filters[id];delete st.rec[id];
   st.confirmDel=null;save();render();toast('Category deleted');break;
  case 'addrow':readCatDraft();catDraft.rows.push({orig:'',name:''});drawCatModal();var rs=document.querySelectorAll('#modal [data-row]');rs[rs.length-1].focus();break;
  case 'rmrow':readCatDraft();catDraft.rows.splice(+el.getAttribute('data-i'),1);drawCatModal();break;
  case 'resetdata':st.cats=seedCats();st.items=seedItems();st.filters={};st.q='';save();render();toast('Sample data restored');break;
 }
});
document.addEventListener('input',function(e){
 if(e.target.id==='q'){st.q=e.target.value;st.page=1;render()}
});
document.addEventListener('change',function(e){
 if(e.target.id==='rarch'){st.recArchived=e.target.checked;render()}
 if(e.target.id==='role'){st.role=e.target.value;st.confirmDel=null;render()}
});
document.addEventListener('submit',function(e){
 e.preventDefault();
 if(e.target.id==='matform')saveMat();
 if(e.target.id==='catform')saveCat();
});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&st.modal)closeModal()});

load();render();
})();
