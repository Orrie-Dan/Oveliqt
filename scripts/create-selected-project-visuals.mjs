import { mkdir,writeFile } from 'node:fs/promises';
const T=(x,y,size,txt,color='#243d36',weight=400,extra='')=>`<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" ${extra}>${txt.replaceAll('&','&amp;')}</text>`;
const R=(x,y,w,h,fill,rx=16,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;
const defs=`<defs><filter id="shadow" x="-40%" y="-40%" width="180%" height="200%"><feDropShadow dx="0" dy="22" stdDeviation="20" flood-color="#142e29" flood-opacity=".15"/></filter><linearGradient id="paper" x2="1" y2="1"><stop stop-color="#e4eee7"/><stop offset="1" stop-color="#c3d8cc"/></linearGradient><linearGradient id="road" x2="1" y2="1"><stop stop-color="#26383c"/><stop offset="1" stop-color="#142729"/></linearGradient><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#50736a" stroke-opacity=".08"/></pattern></defs>`;
const wrap=(body,bg)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">${defs}${R(0,0,1600,1100,bg,0)}${body}</svg>`;
const check=(x,y,on=true)=>`${R(x,y,27,27,on?'#e1eee5':'#f7f8f3',8,'stroke="#b6cbbd"')}${on?`<path d="m${x+7} ${y+14} 5 5 9-11" fill="none" stroke="#39735a" stroke-width="2" stroke-linecap="round"/>`:''}`;
const education=wrap(`
${R(0,0,1600,1100,'url(#paper)',0)}<circle cx="1450" cy="980" r="520" fill="#b8d1c2" opacity=".45"/>${R(0,0,1600,1100,'url(#grid)',0)}
${T(85,90,17,'OVELIQT / EDUCATION OPERATIONS','#446a5a',600,'letter-spacing="3"')}${T(85,171,56,'Capture locally. Understand together.','#1e493a',500)}
${T(88,218,22,'A shared record across registration, attendance and follow-up.','#58786a')}
<path d="M570 620h170q50 0 50-50v-75q0-50 50-50h110M690 793h100q50 0 50-50v-85h100" stroke="#679580" stroke-width="2" stroke-dasharray="7 8" fill="none"/>
<g filter="url(#shadow)" transform="translate(105 300) rotate(-4 245 310)">
${R(0,0,520,655,'#fefefb',26)}${R(0,0,520,70,'#274f40',26)}${R(0,42,520,28,'#274f40',0)}
${T(27,44,18,'Centre workspace','#f2f6ee',600)}${T(28,115,14,'DAILY ATTENDANCE','#698374',400,'letter-spacing="2"')}${T(28,160,31,'A simple start to the day.','#264b3b',500)}
${T(28,199,16,'Illustrative learner records','#788b7d')}
${[0,1,2,3,4].map(i=>`<path d="M28 ${230+i*66}h462" stroke="#e1e8de"/>${R(29,243+i*66,35,35,['#dce7d4','#e9dec9','#dbe6e8'][i%3],12)}${T(81,267+i*66,18,`Learner ${String(i+1).padStart(2,'0')}`,'#3c5546')}${check(382,246+i*66,i!==3)}${check(436,246+i*66,i===3)}`).join('')}
${R(25,587,470,42,'#edf3e8',12)}<circle cx="45" cy="608" r="5" fill="#588660"/>${T(61,614,14,'Saved on this device · ready to synchronise','#4a6c50')}
</g>
<g filter="url(#shadow)" transform="translate(770 300) rotate(3 338 240)">
${R(0,0,715,365,'#fcfdf9',22)}${T(30,47,13,'THE SHARED RECORD','#648270',600,'letter-spacing="2"')}${T(30,98,32,'One learner. Connected context.','#294b3c',500)}
${R(30,128,190,48,'#e5eddf',24)}${T(52,158,16,'Profile & registration','#426347',500)}${R(235,128,164,48,'#f1e8d9',24)}${T(255,158,16,'Assessments','#866947',500)}${R(414,128,157,48,'#e1eaec',24)}${T(434,158,16,'Follow-up','#4b7178',500)}
<path d="M32 213h650M32 276h650" stroke="#e2e8dd"/>${T(32,249,19,'Attendance history','#4b6352')}${T(655,249,20,'↗','#7a997f')}${T(32,315,19,'Observations and next actions','#4b6352')}${T(655,315,20,'↗','#7a997f')}
</g>
<g filter="url(#shadow)" transform="translate(825 730) rotate(-2 310 130)">
${R(0,0,615,227,'#254d3f',22)}${T(28,43,13,'MANAGEMENT VIEW','#adccb7',600,'letter-spacing="2"')}${T(28,91,29,'The same information. A wider view.','#f4f6ee',500)}
${['Record completeness','Attendance patterns','Follow-up needs'].map((s,i)=>`${R(28+i*192,123,176,64,'#355f4d',12)}${T(40+i*192,161,15,s,'#dbeadb')}`).join('')}
</g>
${T(87,1040,15,'ANONYMISED PRODUCT VISUALISATION / ILLUSTRATIVE RECORDS / NOT A PRODUCT SCREENSHOT','#527361',400,'letter-spacing="1"')}
`,'#d7e6db');
const crosswalk=wrap(`
${R(0,0,1600,1100,'#0d1d22',0)}<circle cx="1380" cy="370" r="470" fill="#123139"/>
${T(80,90,16,'OVELIQT / CROSSWALK INTELLIGENCE','#88acb5',600,'letter-spacing="3"')}${T(80,170,55,'From moving objects to meaningful events.','#f1efe5',500)}
${T(82,218,22,'Crossing geometry. Trajectories over time. Evidence for human review.','#9ab5b8')}
<g transform="translate(80 290)">
${R(0,0,1000,635,'url(#road)',24)}<path d="M0 150h1000M0 500h1000" stroke="#a7b9af" stroke-width="3"/><path d="M0 321h1000" stroke="#cad1bd" stroke-width="3" stroke-dasharray="32 27"/>
${R(0,0,1000,148,'#314944',24)}${R(0,500,1000,135,'#314944',24)}
${[0,1,2,3,4,5,6].map(i=>R(532,156+i*48,112,27,'#e6e4c8',2)).join('')}
<path d="M502 145h171v358H502z" fill="#e5bc5933" stroke="#e5bc59" stroke-width="2" stroke-dasharray="8 8"/>
<path d="M90 251h620" stroke="#fa9e63" stroke-width="4" stroke-dasharray="6 10" fill="none"/><path d="m698 239 17 12-17 12" stroke="#fa9e63" stroke-width="3" fill="none"/>
${[100,175,250,325,400].map((x,i)=>`<circle cx="${x}" cy="251" r="${3+i}" fill="#fa9e63" opacity="${.3+i*.14}"/>`).join('')}
<g transform="translate(339 213)">${R(0,0,137,76,'#d8e2d7',20)}${R(38,9,60,58,'#6e8b86',12)}<path d="M36 0v76M100 0v76" stroke="#b0c4b7"/></g>
<path d="M592 65v470" stroke="#65c8c5" stroke-width="4" stroke-dasharray="6 10" fill="none"/><circle cx="591" cy="190" r="12" fill="#95dbcf"/><circle cx="591" cy="190" r="23" fill="none" stroke="#95dbcf" stroke-width="2"/>
${R(707,45,240,50,'#13272be6',10)}${T(725,76,16,'Crossing zone','#e7d6a5',500)}<path d="M707 70h-40l-30 80" stroke="#d6be77" fill="none"/>
${R(47,527,386,62,'#182c30',12)}<circle cx="72" cy="558" r="5" fill="#fa9e63"/>${T(88,565,16,'Vehicle trajectory','#d8e5df')}
<circle cx="252" cy="558" r="5" fill="#65c8c5"/>${T(269,565,16,'Pedestrian','#d8e5df')}
${T(28,40,12,'CONCEPTUAL SCENE · NOT RECORDED FOOTAGE','#b8ccc2',400,'letter-spacing="1"')}
</g>
<g transform="translate(1115 290)">
${R(0,0,405,635,'#e9eee7',24)}${T(28,45,12,'EVENT REVIEW','#5e7d72',600,'letter-spacing="2"')}${T(28,104,29,'Inspect the interaction.','#264b40',500)}
${T(28,148,17,'What happened at the crossing?','#637e71')}
${R(28,191,349,157,'#d5e0d4',14)}<path d="M48 265h308" stroke="#819c90" stroke-width="2"/><path d="m58 273 65-28 71 36 71-47 75 26" stroke="#c27c4f" stroke-width="3" fill="none"/>
${T(47,225,13,'EVIDENCE WINDOW','#577566')}${T(47,320,13,'Tracks stay connected across frames.','#577566')}
${[['01','Define the crossing'],['02','Follow objects over time'],['03','Review event candidates']].map((s,i)=>`${T(29,403+i*72,13,s[0],'#b77c54',600)}${T(65,403+i*72,17,s[1],'#3f5e50')}<path d="M28 ${424+i*72}h349" stroke="#cbd8c9"/>`).join('')}
</g>
${T(82,1002,17,'A temporal analysis problem, not simply a detection demo.','#b7ceca')}${T(82,1050,14,'CONCEPTUAL PRODUCT VISUALISATION / NO MEASURED RESULTS SHOWN / NOT A PRODUCT SCREENSHOT','#7f9da5',400,'letter-spacing="1"')}
`,'#0d1d22');
for(const [slug,svg] of [['education-operations',education],['crosswalk-intelligence',crosswalk]]){
 const root=`public/assets/work/${slug}`;await mkdir(root,{recursive:true});await writeFile(`${root}/product-visual.svg`,svg);
}
console.log('Created two distinct product visualisations: education record/sync views and crossing trajectory/event review.');
