/* ═══════════════════════════════════════════════════
   BUDGET PRO - Application JavaScript
   ═══════════════════════════════════════════════════ */

/* ── Constants ── */
var FREQ={'365':{label:'Par jour',mult:365},'52':{label:'Par semaine',mult:52},'26':{label:'Aux 2 semaines',mult:26},'12':{label:'Par mois',mult:12},'2':{label:'Aux 6 mois',mult:2},'1':{label:'Par annee',mult:1}};
var NEEDS_GROUPS=['Logement','Transport','Assurances','Services','Sante','Dettes'];
var WANTS_GROUPS=['Alimentation','Loisirs','Vetements','Education','Divers'];

var DEF_EXP=[
{id:'e1',name:'Loyer / Hypotheque',desc:'',group:'Logement',amount:0,isPercent:false,frequency:'12'},
{id:'e2',name:'Taxes municipales',desc:'',group:'Logement',amount:0,isPercent:false,frequency:'12'},
{id:'e3',name:'Assurance habitation',desc:'',group:'Logement',amount:0,isPercent:false,frequency:'12'},
{id:'e4',name:'Entretien / Reparations',desc:'',group:'Logement',amount:0,isPercent:false,frequency:'12'},
{id:'e5',name:'Epicerie',desc:'',group:'Alimentation',amount:0,isPercent:false,frequency:'12'},
{id:'e6',name:'Restaurants / Livraison',desc:'',group:'Alimentation',amount:0,isPercent:false,frequency:'12'},
{id:'e7',name:'Paiement auto / Location',desc:'',group:'Transport',amount:0,isPercent:false,frequency:'12'},
{id:'e8',name:'Essence',desc:'',group:'Transport',amount:0,isPercent:false,frequency:'12'},
{id:'e9',name:'Assurance auto',desc:'',group:'Transport',amount:0,isPercent:false,frequency:'12'},
{id:'e10',name:'Entretien vehicule',desc:'',group:'Transport',amount:0,isPercent:false,frequency:'12'},
{id:'e11',name:'Transport en commun',desc:'',group:'Transport',amount:0,isPercent:false,frequency:'12'},
{id:'e12',name:'Stationnement',desc:'',group:'Transport',amount:0,isPercent:false,frequency:'12'},
{id:'e13',name:'Assurance vie',desc:'',group:'Assurances',amount:0,isPercent:false,frequency:'12'},
{id:'e14',name:'Assurance invalidite',desc:'',group:'Assurances',amount:0,isPercent:false,frequency:'12'},
{id:'e15',name:'Assurance maladie',desc:'Complementaire',group:'Assurances',amount:0,isPercent:false,frequency:'12'},
{id:'e16',name:'Electricite / Chauffage',desc:'',group:'Services',amount:0,isPercent:false,frequency:'12'},
{id:'e17',name:'Internet',desc:'',group:'Services',amount:0,isPercent:false,frequency:'12'},
{id:'e18',name:'Telephone cellulaire',desc:'',group:'Services',amount:0,isPercent:false,frequency:'12'},
{id:'e19',name:'Abonnements',desc:'Streaming, apps',group:'Services',amount:0,isPercent:false,frequency:'12'},
{id:'e20',name:'Medicaments',desc:'',group:'Sante',amount:0,isPercent:false,frequency:'12'},
{id:'e21',name:'Dentiste',desc:'',group:'Sante',amount:0,isPercent:false,frequency:'1'},
{id:'e22',name:'Optometriste',desc:'',group:'Sante',amount:0,isPercent:false,frequency:'1'},
{id:'e23',name:'Autres soins',desc:'Physio, psychologue',group:'Sante',amount:0,isPercent:false,frequency:'12'},
{id:'e24',name:'Sorties / Divertissement',desc:'',group:'Loisirs',amount:0,isPercent:false,frequency:'12'},
{id:'e25',name:'Voyages',desc:'',group:'Loisirs',amount:0,isPercent:false,frequency:'1'},
{id:'e26',name:'Sport / Gym',desc:'',group:'Loisirs',amount:0,isPercent:false,frequency:'12'},
{id:'e27',name:'Hobbies',desc:'',group:'Loisirs',amount:0,isPercent:false,frequency:'12'},
{id:'e28',name:'Vetements',desc:'',group:'Vetements',amount:0,isPercent:false,frequency:'12'},
{id:'e29',name:'Cours / Formations',desc:'',group:'Education',amount:0,isPercent:false,frequency:'1'},
{id:'e30',name:'Livres / Materiel',desc:'',group:'Education',amount:0,isPercent:false,frequency:'1'},
{id:'e31',name:'Carte de credit',desc:'Paiement minimum',group:'Dettes',amount:0,isPercent:false,frequency:'12'},
{id:'e32',name:'Pret personnel',desc:'',group:'Dettes',amount:0,isPercent:false,frequency:'12'},
{id:'e33',name:'Pret etudiant',desc:'',group:'Dettes',amount:0,isPercent:false,frequency:'12'},
{id:'e34',name:'Marge de credit',desc:'',group:'Dettes',amount:0,isPercent:false,frequency:'12'},
{id:'e35',name:'Cadeaux',desc:'',group:'Divers',amount:0,isPercent:false,frequency:'1'},
{id:'e36',name:'Dons',desc:'',group:'Divers',amount:0,isPercent:false,frequency:'12'},
{id:'e37',name:'Animaux',desc:'Nourriture, veto',group:'Divers',amount:0,isPercent:false,frequency:'12'},
{id:'e38',name:'Autres',desc:'',group:'Divers',amount:0,isPercent:false,frequency:'12'}
];

var DEF_INV=[
{id:'i1',name:'CELI',desc:"Libre d'impot",amount:0,isPercent:false,frequency:'12',rate:6,limit:7000,lifetimeLimit:0},
{id:'i2',name:'REER',desc:"Deductible d'impot",amount:0,isPercent:false,frequency:'12',rate:6,limit:31560,lifetimeLimit:0},
{id:'i3',name:'CELIAPP',desc:"1re propriete, max 40k$",amount:0,isPercent:false,frequency:'12',rate:5,limit:8000,lifetimeLimit:40000,maxYears:15},
{id:'i4',name:'REEE',desc:"Etudes, SCEE 20%",amount:0,isPercent:false,frequency:'12',rate:5,limit:2500,lifetimeLimit:50000},
{id:'i5',name:'Non enregistre',desc:'Taxable',amount:0,isPercent:false,frequency:'12',rate:7,limit:0,lifetimeLimit:0},
{id:'i6',name:'Epargne interet eleve',desc:'CEIE',amount:0,isPercent:false,frequency:'12',rate:3.5,limit:0,lifetimeLimit:0},
{id:'i7',name:'Crypto / Autres',desc:'Alternatifs',amount:0,isPercent:false,frequency:'12',rate:10,limit:0,lifetimeLimit:0}
];

/* Tax tables 2024 */
var TAX_FED=[{max:55867,rate:.15},{max:111733,rate:.205},{max:154906,rate:.26},{max:220000,rate:.2932},{max:Infinity,rate:.33}];
var TAX_PROV={
QC:[{max:51780,rate:.14},{max:103545,rate:.19},{max:126000,rate:.24},{max:Infinity,rate:.2575}],
ON:[{max:51446,rate:.0505},{max:102894,rate:.0915},{max:150000,rate:.1116},{max:220000,rate:.1216},{max:Infinity,rate:.1316}],
BC:[{max:45654,rate:.0506},{max:91310,rate:.077},{max:104835,rate:.105},{max:127299,rate:.1229},{max:172602,rate:.147},{max:Infinity,rate:.205}],
AB:[{max:148269,rate:.10},{max:177922,rate:.12},{max:237230,rate:.13},{max:355845,rate:.14},{max:Infinity,rate:.15}],
SK:[{max:52057,rate:.105},{max:148734,rate:.125},{max:Infinity,rate:.145}],
MB:[{max:47000,rate:.108},{max:100000,rate:.1275},{max:Infinity,rate:.174}]
};
var FED_BASIC=15705,QC_BASIC=17183;

/* ── State ── */
function defaultState(){return{
profile:{name:'',birthDate:'',situation:'celibataire',children:0,province:'QC',employment:'employe',housing:'locataire',mainGoal:'epargne',goals:['epargne'],experience:'debutant',incomeRange:'',setupComplete:false},
salaryNet:0,salaryFrequency:'12',province:'QC',extraIncomes:[],expenses:JSON.parse(JSON.stringify(DEF_EXP)),investments:JSON.parse(JSON.stringify(DEF_INV)),goals:[],emergencyFund:0,debts:[],netWorthAssets:[],netWorthLiabilities:[],netWorthHistory:[],transactions:[],debtStrategy:'avalanche',dashboardView:'mensuel',projYears:30,projInflation:2.0,projEvents:[],projBalances:{},theme:'light'};}
var state=defaultState();
var nextId=100,currentProfileId=null;
function gid(p){return p+'-'+(nextId++);}

/* Undo */
var undoStack=[],redoStack=[];
function pushUndo(){undoStack.push(JSON.stringify(state));if(undoStack.length>40)undoStack.shift();redoStack=[];}
function undo(){if(!undoStack.length)return;redoStack.push(JSON.stringify(state));state=JSON.parse(undoStack.pop());renderAll();}
function redo(){if(!redoStack.length)return;undoStack.push(JSON.stringify(state));state=JSON.parse(redoStack.pop());renderAll();}

/* ── Popup ── */
function popup(title,msg,buttons){var ov=document.getElementById('popup-overlay');document.getElementById('popup-title').textContent=title;document.getElementById('popup-message').textContent=msg;var acts=document.getElementById('popup-actions');acts.textContent='';for(var i=0;i<buttons.length;i++){(function(btn){var b=document.createElement('button');b.className='btn '+(btn.cls||'btn-outline');b.textContent=btn.label;b.onclick=function(){ov.classList.remove('active');if(btn.action)btn.action();};acts.appendChild(b);})(buttons[i]);}ov.classList.add('active');}
function popupAlert(t,m,cb){popup(t,m,[{label:'OK',cls:'btn-primary',action:cb}]);}
function popupConfirm(t,m,fn){popup(t,m,[{label:'Annuler',cls:'btn-outline'},{label:'Confirmer',cls:'btn-danger',action:fn}]);}

/* ── Profiles ── */
function getProfiles(){try{return JSON.parse(localStorage.getItem('budget-profiles'))||[];}catch(e){return[];}}
function saveProfiles(l){try{localStorage.setItem('budget-profiles',JSON.stringify(l));}catch(e){}}
function save(){if(!currentProfileId)return;try{localStorage.setItem('budget-data-'+currentProfileId,JSON.stringify(state));}catch(e){}var p=getProfiles();for(var i=0;i<p.length;i++)if(p[i].id===currentProfileId){p[i].lastModified=new Date().toISOString();break;}saveProfiles(p);}
function migrateInvestments(){var defMap={};DEF_INV.forEach(function(d){defMap[d.name]=d;});state.investments.forEach(function(inv){var def=defMap[inv.name];if(def){if(inv.lifetimeLimit===undefined||inv.lifetimeLimit===null)inv.lifetimeLimit=def.lifetimeLimit||0;if(inv.maxYears===undefined||inv.maxYears===null)inv.maxYears=def.maxYears||0;}});}
function loadProfile(id){try{var s=localStorage.getItem('budget-data-'+id);if(s)state=Object.assign(defaultState(),JSON.parse(s));}catch(e){}migrateInvestments();currentProfileId=id;localStorage.setItem('budget-current-profile',id);}
function renderProfileList(){var profiles=getProfiles(),list=document.getElementById('profile-list');list.textContent='';if(!profiles.length){var e=document.createElement('div');e.className='profile-empty-state';var ei=document.createElement('div');ei.className='profile-empty-icon';ei.textContent='\u263A';e.appendChild(ei);var et=document.createElement('div');et.className='profile-empty-title';et.textContent='Pret a commencer?';e.appendChild(et);var ed=document.createElement('div');ed.className='profile-empty-desc';ed.textContent='Creez votre premier profil pour acceder a tous les outils de gestion financiere.';e.appendChild(ed);list.appendChild(e);return;}profiles.sort(function(a,b){return(b.lastModified||'').localeCompare(a.lastModified||'');});profiles.forEach(function(prof){
var item=document.createElement('div');item.className='profile-item';
var left=document.createElement('div');left.style.cssText='flex:1;cursor:pointer;display:flex;align-items:center';left.onclick=function(){selectProfile(prof.id);};
/* Avatar */
var avatar=document.createElement('div');avatar.className='profile-avatar';avatar.textContent=prof.name?prof.name.charAt(0).toUpperCase():'?';left.appendChild(avatar);
var info=document.createElement('div');
var nm=document.createElement('div');nm.className='profile-item-name';nm.textContent=prof.name;info.appendChild(nm);
var dt=document.createElement('div');dt.className='profile-item-date';
var extra='';if(prof.age)extra=' | '+prof.age;if(prof.situation)extra+=' | '+prof.situation;
dt.textContent=(prof.lastModified?'Modifie: '+new Date(prof.lastModified).toLocaleDateString('fr-CA'):'Nouveau')+extra;
info.appendChild(dt);left.appendChild(info);item.appendChild(left);
var del=document.createElement('button');del.className='profile-delete';del.textContent='\u2715';del.onclick=function(e){e.stopPropagation();popupConfirm('Supprimer','Supprimer le budget de '+prof.name+'?',function(){deleteProfile(prof.id);});};item.appendChild(del);list.appendChild(item);});}

/* ══ Profile Wizard ══ */
var WIZARD_STEPS=[
{id:'name',title:'Comment vous appelez-vous?',desc:'Ce nom sera utilise pour personnaliser votre experience.',type:'input',field:'name',placeholder:'Votre prenom ou nom complet',required:true},
{id:'birth',title:'Quelle est votre date de naissance?',desc:'Permet de calculer votre age, vos droits CELI, et personnaliser les conseils de retraite.',type:'date',field:'birthDate'},
{id:'province',title:'Dans quelle province habitez-vous?',desc:'Adapte les calculs d\'impots et les programmes gouvernementaux.',type:'select',field:'province',options:[
{v:'QC',l:'Quebec'},{v:'ON',l:'Ontario'},{v:'BC',l:'Colombie-Britannique'},{v:'AB',l:'Alberta'},{v:'SK',l:'Saskatchewan'},{v:'MB',l:'Manitoba'},{v:'NB',l:'Nouveau-Brunswick'},{v:'NS',l:'Nouvelle-Ecosse'},{v:'PE',l:'Ile-du-Prince-Edouard'},{v:'NL',l:'Terre-Neuve'},{v:'YT',l:'Yukon'},{v:'NT',l:'T.N.-O.'},{v:'NU',l:'Nunavut'}]},
{id:'situation',title:'Quelle est votre situation?',desc:'Adapte les recommandations budgetaires et les outils affiches.',type:'options',field:'situation',options:[
{v:'celibataire',l:'Celibataire',icon:'👤',d:'Seul(e)'},
{v:'couple',l:'En couple',icon:'👫',d:'Avec conjoint(e)'},
{v:'famille',l:'Famille',icon:'👨‍👩‍👧',d:'Avec enfant(s)'},
{v:'monoparental',l:'Monoparental',icon:'👨‍👧',d:'Parent seul'}]},
{id:'children',title:'Combien d\'enfants avez-vous?',desc:'Active les outils REEE et ajuste les depenses familiales.',type:'number',field:'children',placeholder:'0',showIf:function(p){return p.situation!=='celibataire';}},
{id:'employment',title:'Quel est votre statut d\'emploi?',desc:'Adapte les deductions, cotisations et conseils fiscaux.',type:'options',field:'employment',options:[
{v:'employe',l:'Employe(e)',icon:'💼',d:'Salarie(e)'},
{v:'autonome',l:'Travailleur autonome',icon:'🏠',d:'Pigiste / entreprise'},
{v:'etudiant',l:'Etudiant(e)',icon:'🎓',d:'Aux etudes'},
{v:'retraite',l:'Retraite(e)',icon:'🌅',d:'A la retraite'}]},
{id:'housing',title:'Quelle est votre situation de logement?',desc:'Personnalise les categories de depenses et active les outils hypothecaires.',type:'options',field:'housing',options:[
{v:'locataire',l:'Locataire',icon:'🏢',d:'Loyer mensuel'},
{v:'proprietaire',l:'Proprietaire',icon:'🏠',d:'Avec hypotheque'},
{v:'proprio-libre',l:'Proprio sans hypotheque',icon:'🏡',d:'Propriete payee'},
{v:'chez-parents',l:'Loge gratuitement',icon:'🏡',d:'Chez parents, famille, etc.'}]},
{id:'goal',title:'Quels sont vos objectifs?',desc:'Selectionnez tout ce qui s\'applique. Adapte les outils et conseils affiches.',type:'multi',field:'goals',options:[
{v:'epargne',l:'Epargner plus',icon:'💰',d:'Augmenter mon epargne'},
{v:'dette',l:'Rembourser mes dettes',icon:'📉',d:'Me liberer des dettes'},
{v:'maison',l:'Acheter une propriete',icon:'🏠',d:'Mise de fonds'},
{v:'retraite',l:'Planifier ma retraite',icon:'🌅',d:'Securite a long terme'},
{v:'fire',l:'Independance financiere',icon:'🔥',d:'FIRE / liberte totale'},
{v:'investir',l:'Investir davantage',icon:'📈',d:'Faire fructifier mon argent'}]},
{id:'experience',title:'Quel est votre niveau en finances personnelles?',desc:'Adapte la complexite des explications et des outils affiches.',type:'options',field:'experience',options:[
{v:'debutant',l:'Debutant',icon:'🌱',d:'Je commence a budgeter'},
{v:'intermediaire',l:'Intermediaire',icon:'📊',d:'J\'ai deja un budget'},
{v:'avance',l:'Avance',icon:'🎯',d:'J\'optimise activement'}]},
{id:'income',title:'Dans quelle tranche se situe votre revenu annuel brut?',desc:'Permet de calibrer les recommandations. Cette info reste privee.',type:'options',field:'incomeRange',options:[
{v:'<30k',l:'Moins de 30 000$',icon:'',d:''},
{v:'30-50k',l:'30 000 - 50 000$',icon:'',d:''},
{v:'50-75k',l:'50 000 - 75 000$',icon:'',d:''},
{v:'75-100k',l:'75 000 - 100 000$',icon:'',d:''},
{v:'100-150k',l:'100 000 - 150 000$',icon:'',d:''},
{v:'>150k',l:'Plus de 150 000$',icon:'',d:''}]},
{id:'savings',title:'Epargnez-vous regulierement?',desc:'Aide a evaluer vos habitudes financieres actuelles.',type:'options',field:'savingsHabit',options:[
{v:'aucune',l:'Pas encore',icon:'😅',d:'Je commence'},
{v:'irregulier',l:'De temps en temps',icon:'🔄',d:'Pas chaque mois'},
{v:'regulier',l:'Chaque mois',icon:'✅',d:'Montant fixe'},
{v:'agressif',l:'Epargne agressive',icon:'🚀',d:'Je maximise'}]},
{id:'debt',title:'Avez-vous des dettes?',desc:'Permet d\'activer les outils de remboursement et simulateurs.',type:'options',field:'debtLevel',options:[
{v:'aucune',l:'Aucune dette',icon:'🎉',d:'Libre de dettes'},
{v:'faible',l:'Dettes legeres',icon:'📋',d:'Facilement gerees'},
{v:'moyenne',l:'Dettes moderees',icon:'⚠️',d:'A surveiller'},
{v:'elevee',l:'Dettes importantes',icon:'🔴',d:'Priorite remboursement'}]},
{id:'budgetExp',title:'Avez-vous deja fait un budget?',desc:'Adapte le niveau de detail et les explications.',type:'options',field:'budgetExperience',options:[
{v:'jamais',l:'Jamais',icon:'🆕',d:'C\'est ma premiere fois'},
{v:'essaye',l:'J\'ai essaye',icon:'🔄',d:'Sans vraiment continuer'},
{v:'tableur',l:'Avec un tableur',icon:'📊',d:'Excel ou Google Sheets'},
{v:'app',l:'Avec une app',icon:'📱',d:'Mint, YNAB, etc.'}]},
{id:'transport',title:'Quel est votre moyen de transport principal?',desc:'Adapte les categories de depenses de transport.',type:'options',field:'transportMode',options:[
{v:'auto',l:'Automobile',icon:'🚗',d:'Voiture personnelle'},
{v:'transport',l:'Transport en commun',icon:'🚌',d:'Bus, metro'},
{v:'velo',l:'Velo / marche',icon:'🚲',d:'Transport actif'},
{v:'mixte',l:'Mixte',icon:'🔄',d:'Plusieurs modes'}]}
];

var wizardData={};var wizardStep=0;

function saveWizardProgress(){try{localStorage.setItem('budget-wizard-progress',JSON.stringify({data:wizardData,step:wizardStep,version:WIZARD_VERSION}));}catch(e){}}
function clearWizardProgress(){try{localStorage.removeItem('budget-wizard-progress');}catch(e){}}
function loadWizardProgress(){try{var s=localStorage.getItem('budget-wizard-progress');if(s){var p=JSON.parse(s);return p;}return null;}catch(e){return null;}}

var WIZARD_VERSION=3;
function startProfileWizard(){
var defaults={name:'',birthDate:'',province:'QC',situation:'celibataire',children:0,employment:'employe',housing:'locataire',goals:['epargne'],experience:'debutant',incomeRange:'50-75k',savingsHabit:'irregulier',debtLevel:'aucune',budgetExperience:'jamais',transportMode:'auto'};
var saved=loadWizardProgress();
if(saved&&saved.data&&saved.data.name&&saved.version===WIZARD_VERSION){wizardData=Object.assign({},defaults,saved.data);wizardStep=saved.step||0;}
else{clearWizardProgress();wizardData=defaults;wizardStep=0;}
document.getElementById('profile-select-view').style.display='none';
document.getElementById('profile-wizard-view').style.display='';
renderWizardStep();
}

function getVisibleSteps(){return WIZARD_STEPS.filter(function(s){return !s.showIf||s.showIf(wizardData);});}

function renderWizardStep(){
var visible=getVisibleSteps();
if(wizardStep>=visible.length){finishWizard();return;}
var step=visible[wizardStep];
var c=document.getElementById('profile-wizard-view');c.textContent='';

/* Progress dots */
var prog=document.createElement('div');prog.className='wizard-progress';
for(var i=0;i<visible.length;i++){var dot=document.createElement('div');dot.className='wizard-dot'+(i<wizardStep?' done':'')+(i===wizardStep?' active':'');prog.appendChild(dot);}
c.appendChild(prog);

/* Step title */
var title=document.createElement('div');title.className='wizard-step-title';title.textContent=step.title;c.appendChild(title);
var desc=document.createElement('div');desc.className='wizard-step-desc';desc.textContent=step.desc;c.appendChild(desc);

/* Step content */
if(step.type==='input'){
var inp=document.createElement('input');inp.type='text';inp.placeholder=step.placeholder||'';inp.value=wizardData[step.field]||'';inp.style.cssText='width:100%;padding:14px 16px;border:2px solid var(--border);border-radius:var(--radius-lg);font-size:16px;background:var(--bg-primary);color:var(--text-primary);outline:none';
inp.id='wizard-input';inp.oninput=function(){wizardData[step.field]=this.value;saveWizardProgress();};
inp.onkeydown=function(e){if(e.key==='Enter')wizardNext();};
c.appendChild(inp);setTimeout(function(){inp.focus();},50);
}
else if(step.type==='date'){
var inp2=document.createElement('input');inp2.type='date';inp2.value=wizardData[step.field]||'';inp2.max=new Date().toISOString().slice(0,10);inp2.min='1930-01-01';
inp2.style.cssText='width:100%;padding:14px 16px;border:2px solid var(--border);border-radius:var(--radius-lg);font-size:16px;background:var(--bg-primary);color:var(--text-primary);outline:none';
inp2.onchange=function(){wizardData[step.field]=this.value;saveWizardProgress();};
c.appendChild(inp2);
}
else if(step.type==='number'){
var inp3=document.createElement('input');inp3.type='number';inp3.min='0';inp3.max='20';inp3.value=wizardData[step.field]||0;inp3.placeholder=step.placeholder||'0';
inp3.style.cssText='width:100%;padding:14px 16px;border:2px solid var(--border);border-radius:var(--radius-lg);font-size:16px;background:var(--bg-primary);color:var(--text-primary);outline:none';
inp3.oninput=function(){wizardData[step.field]=parseInt(this.value)||0;saveWizardProgress();};
inp3.onkeydown=function(e){if(e.key==='Enter')wizardNext();};
c.appendChild(inp3);
}
else if(step.type==='select'){
var sel=document.createElement('select');sel.style.cssText='width:100%;padding:14px 16px;border:2px solid var(--border);border-radius:var(--radius-lg);font-size:16px;background:var(--bg-primary);color:var(--text-primary);outline:none';
step.options.forEach(function(opt){var o=document.createElement('option');o.value=opt.v;o.textContent=opt.l;if(wizardData[step.field]===opt.v)o.selected=true;sel.appendChild(o);});
sel.onchange=function(){wizardData[step.field]=this.value;saveWizardProgress();};
c.appendChild(sel);
}
else if(step.type==='options'){
var grid=document.createElement('div');grid.className='wizard-options';
if(step.options.length>4)grid.style.gridTemplateColumns='1fr 1fr 1fr';
step.options.forEach(function(opt){
var div=document.createElement('div');div.className='wizard-option'+(wizardData[step.field]===opt.v?' selected':'');
if(opt.icon){var icon=document.createElement('span');icon.className='wizard-option-icon';icon.textContent=opt.icon;div.appendChild(icon);}
var lbl=document.createElement('div');lbl.textContent=opt.l;div.appendChild(lbl);
if(opt.d){var dd=document.createElement('div');dd.className='wizard-option-desc';dd.textContent=opt.d;div.appendChild(dd);}
div.onclick=function(){wizardData[step.field]=opt.v;saveWizardProgress();renderWizardStep();};
grid.appendChild(div);});
c.appendChild(grid);
}
else if(step.type==='multi'){
var arr=wizardData[step.field]||[];
var grid2=document.createElement('div');grid2.className='wizard-options';
if(step.options.length>4)grid2.style.gridTemplateColumns='1fr 1fr 1fr';
step.options.forEach(function(opt){
var isSelected=arr.indexOf(opt.v)!==-1;
var div=document.createElement('div');div.className='wizard-option'+(isSelected?' selected':'');
if(opt.icon){var icon=document.createElement('span');icon.className='wizard-option-icon';icon.textContent=opt.icon;div.appendChild(icon);}
var lbl=document.createElement('div');lbl.textContent=opt.l;div.appendChild(lbl);
if(opt.d){var dd=document.createElement('div');dd.className='wizard-option-desc';dd.textContent=opt.d;div.appendChild(dd);}
div.onclick=function(){var a=wizardData[step.field]||[];var idx=a.indexOf(opt.v);if(idx===-1){a.push(opt.v);}else{a.splice(idx,1);}wizardData[step.field]=a;saveWizardProgress();renderWizardStep();};
grid2.appendChild(div);});
c.appendChild(grid2);
var hint=document.createElement('div');hint.textContent='Plusieurs choix possibles';hint.style.cssText='text-align:center;font-size:12px;color:rgba(255,255,255,.3);margin-top:10px';
c.appendChild(hint);
}

/* Navigation */
var nav=document.createElement('div');nav.className='wizard-nav';
if(wizardStep>0){var backBtn=document.createElement('button');backBtn.className='btn btn-outline';backBtn.textContent='Precedent';backBtn.onclick=function(){wizardStep--;saveWizardProgress();renderWizardStep();};nav.appendChild(backBtn);}
else{var cancelBtn=document.createElement('button');cancelBtn.className='btn btn-outline';cancelBtn.textContent='Annuler';cancelBtn.onclick=function(){clearWizardProgress();document.getElementById('profile-wizard-view').style.display='none';document.getElementById('profile-select-view').style.display='';};nav.appendChild(cancelBtn);}
var nextBtn=document.createElement('button');nextBtn.className='btn btn-primary';nextBtn.textContent=wizardStep>=visible.length-1?'Terminer':'Suivant';nextBtn.onclick=wizardNext;
nav.appendChild(nextBtn);c.appendChild(nav);
}

function wizardNext(){
var visible=getVisibleSteps();
var step=visible[wizardStep];
/* Validate required */
if(step.required&&!wizardData[step.field]){
var inp=document.getElementById('wizard-input');
if(inp){inp.style.borderColor='var(--danger)';inp.focus();}
return;
}
wizardStep++;
saveWizardProgress();
renderWizardStep();
}

function finishWizard(){
clearWizardProgress();
var name=wizardData.name||'Mon budget';
var id='p-'+Date.now()+'-'+Math.random().toString(36).substr(2,6);
var p=getProfiles();
p.push({id:id,name:name,lastModified:new Date().toISOString(),age:getAgeFromBirth(wizardData.birthDate),situation:({celibataire:'Solo',couple:'Couple',famille:'Famille',monoparental:'Monoparental'})[wizardData.situation]||''});
saveProfiles(p);
state=defaultState();
/* Apply wizard data to state */
var goalsArr=wizardData.goals||['epargne'];
state.profile={name:wizardData.name,birthDate:wizardData.birthDate,situation:wizardData.situation,children:wizardData.children||0,province:wizardData.province,employment:wizardData.employment,housing:wizardData.housing,mainGoal:goalsArr[0]||'epargne',goals:goalsArr,experience:wizardData.experience,incomeRange:wizardData.incomeRange,setupComplete:true};
state.province=wizardData.province;
/* Apply adaptations based on profile */
applyProfileAdaptations();
currentProfileId=id;
localStorage.setItem('budget-current-profile',id);save();
document.getElementById('profile-wizard-view').style.display='none';
document.getElementById('profile-select-view').style.display='';
hideProfileScreen();updateProfileDisplay();buildMainContent();renderAll();
}

function getAgeFromBirth(birthDate){
if(!birthDate)return null;
var b=new Date(birthDate),now=new Date();
var age=now.getFullYear()-b.getFullYear();
if(now.getMonth()<b.getMonth()||(now.getMonth()===b.getMonth()&&now.getDate()<b.getDate()))age--;
return age;
}

function getProfileAge(){return getAgeFromBirth((state.profile||{}).birthDate);}

/* ── Dynamic Profile Adaptations ── */
/* ═══════════════════════════════════════════════════
   SMART PROFILE ADAPTATIONS
   Non-destructive: never overwrites amounts, only adds missing items
   ═══════════════════════════════════════════════════ */

/* Safely add an expense category if it doesn't exist yet */
function ensureExpense(name,desc,group,freq){
if(state.expenses.some(function(e){return e.name===name;}))return false;
state.expenses.push({id:gid('e'),name:name,desc:desc||'',group:group||'Divers',amount:0,isPercent:false,frequency:freq||'12'});return true;
}
/* Safely add an extra income source if it doesn't exist */
function ensureIncome(name){
if(state.extraIncomes.some(function(e){return e.name===name;}))return false;
state.extraIncomes.push({name:name,amount:0,frequency:'12'});return true;
}
/* Find an investment by name */
function findInv(name){return state.investments.find(function(i){return i.name===name;});}

/* Apply profile to state — called on first setup only */
function applyProfileAdaptations(){
var p=state.profile;if(!p||!p.setupComplete)return;
applyProfileToState(p,null); /* null = no old profile, first time */
}

/* The core smart adaptation engine — works for both creation and updates */
function applyProfileToState(p,oldP){
var age=getProfileAge();
var changes=[];
var isUpdate=!!oldP; /* true if editing existing profile */

/* ── HOUSING ── */
var housingChanged=!oldP||oldP.housing!==p.housing;
if(housingChanged){
var e0=state.expenses[0];
var oldAmount=e0.amount; /* preserve user's amount */
if(p.housing==='locataire'){e0.name='Loyer';e0.desc='Mensuel';changes.push('Logement: Loyer');}
else if(p.housing==='proprietaire'){e0.name='Hypotheque';e0.desc='Paiement mensuel';changes.push('Logement: Hypotheque');
ensureExpense('Taxes foncières','Scolaires et municipales','Logement','12');
ensureExpense('Assurance habitation','Proprietaire','Logement','12');
}
else if(p.housing==='chez-parents'){e0.name='Contribution logement';e0.desc='Optionnel';changes.push('Logement: Loge gratuitement');}
else{e0.name='Entretien propriete';e0.desc='Propriete payee';changes.push('Logement: Propriete payee');}
e0.amount=oldAmount; /* keep existing amount */
}

/* ── CHILDREN ── */
var childrenChanged=!oldP||oldP.children!==p.children;
if(p.children>0){
var reee=findInv('REEE');
if(reee){
reee.desc='Pour '+p.children+' enfant'+(p.children>1?'s':'')+', SCEE 20% (max 500$/an/enfant)';
reee.limit=2500*p.children;
reee.lifetimeLimit=50000*p.children;
}
if(ensureExpense('Garde / Garderie','','Divers','12'))changes.push('Ajout: Garde / Garderie');
if(ensureExpense('Activites enfants','Sport, musique, etc.','Divers','12'))changes.push('Ajout: Activites enfants');
if(p.children>=2){
if(ensureExpense('Vetements enfants','','Vetements','12'))changes.push('Ajout: Vetements enfants');
}
}

/* ── EMPLOYMENT ── */
var empChanged=!oldP||oldP.employment!==p.employment;
if(empChanged){
if(p.employment==='autonome'){
ensureIncome('Revenus travail autonome');
if(ensureExpense('Cotisations RRQ/RQAP','Travailleur autonome','Entreprise','12'))changes.push('Ajout: Cotisations RRQ');
if(ensureExpense('Acomptes provisionnels','Impots trimestriels','Entreprise','12'))changes.push('Ajout: Acomptes provisionnels');
if(ensureExpense('Fournitures / Outils','','Entreprise','12'))changes.push('Ajout: Fournitures entreprise');
changes.push('Emploi: Travailleur autonome');
}
else if(p.employment==='retraite'){
ensureIncome('Rente RRQ/RPC');ensureIncome('Pension SV/PSV');ensureIncome('Rente employeur');
changes.push('Emploi: Retraite — sources de revenus ajoutees');
}
else if(p.employment==='etudiant'){
ensureIncome('Pret etudiant');ensureIncome('Bourse');ensureIncome('Emploi temps partiel');
if(ensureExpense('Frais de scolarite','Par session','Education','2'))changes.push('Ajout: Frais de scolarite');
changes.push('Emploi: Etudiant');
}
else if(p.employment==='employe'){
changes.push('Emploi: Salarie');
}
}

/* ── PROVINCE ── */
if(!oldP||oldP.province!==p.province){
state.province=p.province;
changes.push('Province: '+p.province);
}

/* ── AGE & INVESTMENTS ── */
if(age){
/* Projection horizon — only set if not manually changed or first setup */
if(!isUpdate){
if(age<30)state.projYears=35;else if(age<40)state.projYears=30;
else if(age<50)state.projYears=20;else if(age<60)state.projYears=15;
else state.projYears=10;
}

/* CELI cumulative rights */
var celiStart=Math.max(2009,(p.birthDate?new Date(p.birthDate).getFullYear():2000)+18);
var celiYears=Math.max(new Date().getFullYear()-celiStart,0);
var celi=findInv('CELI');
if(celi&&celiYears>0)celi.desc='Droits cumules: ~'+fmtS(celiYears*6500)+' (depuis '+celiStart+')';

/* CELIAPP eligibility */
var celiapp=findInv('CELIAPP');
if(celiapp){
if(age>=71||p.housing==='proprietaire'||p.housing==='proprio-libre'){
celiapp.desc='Non admissible (proprietaire ou 71+)';
}else{
celiapp.desc='Achat 1re propriete, max 40k$ a vie, 15 ans';
}
}

/* REER — update desc with deadline info */
var reer=findInv('REER');
if(reer&&age>=65)reer.desc='Convertir en FERR avant 71 ans';
else if(reer&&age>=55)reer.desc='Planifiez la conversion FERR a 71 ans';
}

/* ── GOALS (first setup only — never overwrite existing goals on edit) ── */
var pGoals=p.goals||[p.mainGoal||'epargne'];
function hasGoal(g){return pGoals.indexOf(g)!==-1;}
if(!isUpdate&&state.goals.length===0){
if(hasGoal('maison')&&p.housing==='locataire'){
state.goals.push({id:gid('g'),type:'maison',name:'Mise de fonds',target:80000,current:0,contrib:500,freq:'12',rate:4,deadline:'',priority:'haute'});
changes.push('Objectif cree: Mise de fonds');
}
if(hasGoal('retraite')){
var retTarget=age?(Math.max(65-age,5))*12000:500000;
state.goals.push({id:gid('g'),type:'retraite',name:'Retraite',target:retTarget,current:0,contrib:400,freq:'12',rate:6,deadline:'',priority:'haute',retireAge:65,retireIncome:3000});
changes.push('Objectif cree: Retraite');
}
if(hasGoal('fire')){
state.goals.push({id:gid('g'),type:'autre',name:'Independance financiere (FIRE)',target:750000,current:0,contrib:1000,freq:'12',rate:7,deadline:'',priority:'haute'});
changes.push('Objectif cree: FIRE');
}
if(hasGoal('epargne')){
state.goals.push({id:gid('g'),type:'urgence',name:'Fonds d\'urgence 6 mois',target:15000,current:0,contrib:300,freq:'12',rate:0,deadline:'',priority:'haute'});
changes.push('Objectif cree: Fonds urgence');
}
if(hasGoal('dette')){
state.goals.push({id:gid('g'),type:'autre',name:'Eliminer mes dettes',target:0,current:0,contrib:500,freq:'12',rate:0,deadline:'',priority:'haute'});
changes.push('Objectif cree: Eliminer dettes');
}
if(hasGoal('investir')){
state.goals.push({id:gid('g'),type:'autre',name:'Portefeuille d\'investissement',target:100000,current:0,contrib:500,freq:'12',rate:7,deadline:'',priority:'moyenne'});
changes.push('Objectif cree: Investissement');
}
}

/* ── SITUATION (couple/famille) ── */
var sitChanged=!oldP||oldP.situation!==p.situation;
if(sitChanged&&(p.situation==='couple'||p.situation==='famille')){
if(ensureExpense('Sorties couple','Restaurants, activites','Loisirs','12'))changes.push('Ajout: Sorties couple');
}

return changes;
}

/* ── Refresh dynamic info that changes with time (age, CELI rights, etc.) ── */
function refreshProfileDynamicInfo(){
var p=state.profile;if(!p||!p.setupComplete)return;
var age=getProfileAge();if(!age)return;

/* Update CELI rights description */
var celiStart=Math.max(2009,(p.birthDate?new Date(p.birthDate).getFullYear():2000)+18);
var celiYears=Math.max(new Date().getFullYear()-celiStart,0);
var celi=findInv('CELI');
if(celi&&celiYears>0)celi.desc='Droits cumules: ~'+fmtS(celiYears*6500)+' ('+age+' ans, depuis '+celiStart+')';

/* Update CELIAPP eligibility */
var celiapp=findInv('CELIAPP');
if(celiapp){
if(age>=71||p.housing==='proprietaire'||p.housing==='proprio-libre')celiapp.desc='Non admissible';
}

/* Update REEE with children info */
if(p.children>0){var reee=findInv('REEE');if(reee){reee.desc='Pour '+p.children+' enfant'+(p.children>1?'s':'')+', SCEE 20%';reee.limit=2500*p.children;reee.lifetimeLimit=50000*p.children;}}

/* REER deadline */
var reer=findInv('REER');
if(reer){if(age>=71)reer.desc='Doit etre converti en FERR';else if(age>=65)reer.desc='Convertir en FERR avant 71 ans';else if(age>=55)reer.desc='Planifiez FERR a 71 ans';}

/* Update profile list entry with current age */
var profiles=getProfiles();var changed=false;
for(var i=0;i<profiles.length;i++){
if(profiles[i].id===currentProfileId){
var newAge=age;
if(profiles[i].age!==newAge){profiles[i].age=newAge;changed=true;}
break;
}}
if(changed)saveProfiles(profiles);
}

/* ── Profile Editor (smart — detects changes) ── */
function openProfileEditor(){
var p=state.profile||{};
var oldProfile=JSON.parse(JSON.stringify(p)); /* snapshot of current profile */
wizardData={name:p.name||'',birthDate:p.birthDate||'',province:p.province||'QC',situation:p.situation||'celibataire',children:p.children||0,employment:p.employment||'employe',housing:p.housing||'locataire',goals:p.goals||[p.mainGoal||'epargne'],experience:p.experience||'debutant',incomeRange:p.incomeRange||''};
wizardStep=0;
document.getElementById('profile-select-view').style.display='none';
document.getElementById('profile-wizard-view').style.display='';
showProfileScreen();
var origFinish=finishWizard;
finishWizard=function(){
pushUndo();
var goalsArr2=wizardData.goals||['epargne'];
var newProfile={name:wizardData.name,birthDate:wizardData.birthDate,situation:wizardData.situation,children:wizardData.children||0,province:wizardData.province,employment:wizardData.employment,housing:wizardData.housing,mainGoal:goalsArr2[0]||'epargne',goals:goalsArr2,experience:wizardData.experience,incomeRange:wizardData.incomeRange,setupComplete:true};
state.profile=newProfile;
/* Apply only the CHANGES between old and new profile */
var changes=applyProfileToState(newProfile,oldProfile);
/* Update profile list */
var profiles=getProfiles();
for(var i=0;i<profiles.length;i++){
if(profiles[i].id===currentProfileId){
profiles[i].name=wizardData.name;
profiles[i].age=getAgeFromBirth(wizardData.birthDate);
profiles[i].situation=({celibataire:'Solo',couple:'Couple',famille:'Famille',monoparental:'Monoparental'})[wizardData.situation]||'';
break;
}}
saveProfiles(profiles);
document.getElementById('profile-wizard-view').style.display='none';
document.getElementById('profile-select-view').style.display='';
hideProfileScreen();updateProfileDisplay();save();renderAll();
finishWizard=origFinish;
/* Show summary of changes */
if(changes.length>0){
popupAlert('Profil mis a jour',changes.length+' adaptation'+(changes.length>1?'s':'')+' appliquee'+(changes.length>1?'s':'')+':\n'+changes.join('\n'));
}else{
popupAlert('Profil mis a jour','Aucune adaptation necessaire — vos donnees sont intactes.');
}
};
renderWizardStep();
}

function createProfile(){startProfileWizard();}
function selectProfile(id){state=defaultState();loadProfile(id);hideProfileScreen();applyTheme();updateProfileDisplay();buildMainContent();renderAll();}
function deleteProfile(id){var p=getProfiles().filter(function(x){return x.id!==id;});saveProfiles(p);try{localStorage.removeItem('budget-data-'+id);}catch(e){}if(currentProfileId===id){currentProfileId=null;localStorage.removeItem('budget-current-profile');}renderProfileList();if(!p.length||!currentProfileId)showProfileScreen();}
function showProfileScreen(){renderProfileList();document.getElementById('profile-screen').classList.remove('hidden');}
function hideProfileScreen(){document.getElementById('profile-screen').classList.add('hidden');}
function updateProfileDisplay(){
var p=getProfiles(),name='--';for(var i=0;i<p.length;i++)if(p[i].id===currentProfileId){name=p[i].name;break;}
var prof=state.profile||{};
var age=getProfileAge();
var displayName=prof.name||name;
document.getElementById('sidebar-profile-name').textContent=displayName;
document.getElementById('mobile-profile-title').textContent='Budget de '+displayName;
document.title='Budget de '+displayName+' - Budget Pro';
/* Update sidebar profile section with more info */
var sp=document.getElementById('sidebar-profile');
if(sp&&prof.setupComplete){
sp.textContent='';
var nameDiv=document.createElement('div');nameDiv.className='sidebar-profile-name';nameDiv.textContent=displayName+(age?' ('+age+' ans)':'');sp.appendChild(nameDiv);
var infoDiv=document.createElement('div');infoDiv.style.cssText='font-size:11px;color:var(--text-muted);margin:2px 0 4px';
var infoParts=[];
if(prof.situation){var labels={celibataire:'Celibataire',couple:'En couple',famille:'Famille',monoparental:'Monoparental'};infoParts.push(labels[prof.situation]||prof.situation);}
if(prof.employment){var empLabels={employe:'Employe',autonome:'Autonome',etudiant:'Etudiant',retraite:'Retraite'};infoParts.push(empLabels[prof.employment]||prof.employment);}
if(prof.province)infoParts.push(prof.province);
infoDiv.textContent=infoParts.join(' | ');sp.appendChild(infoDiv);
var editLink=document.createElement('div');editLink.style.cssText='font-size:11px;color:var(--accent);cursor:pointer;text-decoration:underline;display:flex;gap:12px';
var switchLink=document.createElement('span');switchLink.textContent='Changer de profil';switchLink.onclick=showProfileScreen;editLink.appendChild(switchLink);
var editBtn=document.createElement('span');editBtn.textContent='Mon profil';editBtn.onclick=function(){showSection('profil');};editLink.appendChild(editBtn);
sp.appendChild(editLink);
}
/* Update dashboard title */
var dashTitle=document.getElementById('dashboard-title');if(dashTitle)dashTitle.textContent='Bonjour'+((prof.name)?' '+prof.name.split(' ')[0]:'')+'!';
var dashDesc=document.getElementById('dashboard-desc');
if(dashDesc&&prof.setupComplete){
var goalLabels={epargne:'epargne',dette:'remboursement dettes',maison:'achat propriete',retraite:'retraite',fire:'independance financiere',investir:'investissement'};
var gList=(prof.goals||[prof.mainGoal||'epargne']).map(function(g){return goalLabels[g]||g;}).join(', ');
dashDesc.textContent='Objectifs : '+(gList||'gerer votre budget')+' | '+(age?age+' ans':'')+(prof.province?' | '+prof.province:'');
}
}
function migrateOldData(){var old=localStorage.getItem('budget-v2');if(!old)return null;try{var id='p-migrated-'+Date.now();var p=getProfiles();p.push({id:id,name:'Mon budget',lastModified:new Date().toISOString()});saveProfiles(p);localStorage.setItem('budget-data-'+id,old);localStorage.removeItem('budget-v2');return id;}catch(e){return null;}}

/* ── Utilities ── */
function toAnnual(a,f){var m=FREQ[f];return a*(m?m.mult:12);}
function getAnnualNet(){var s=toAnnual(state.salaryNet,state.salaryFrequency);for(var i=0;i<state.extraIncomes.length;i++)s+=toAnnual(state.extraIncomes[i].amount||0,state.extraIncomes[i].frequency||'12');return s;}
function catAnnual(c){return c.isPercent?(c.amount/100)*getAnnualNet():toAnnual(c.amount,c.frequency);}
function totalExp(){var t=0;state.expenses.forEach(function(e){t+=catAnnual(e);});return t;}
function totalInv(){var t=0;state.investments.forEach(function(e){t+=catAnnual(e);});return t;}
function totalDebtBal(){var t=0;(state.debts||[]).forEach(function(d){t+=d.balance||0;});return t;}
function totalDebtPay(){var t=0;(state.debts||[]).forEach(function(d){t+=d.payment||0;});return t;}
function totalNWA(){var t=0;(state.netWorthAssets||[]).forEach(function(a){t+=a.value||0;});return t;}
function totalNWL(){var t=0;(state.netWorthLiabilities||[]).forEach(function(l){t+=l.value||0;});return t;}
function fmt(n){return n.toLocaleString('fr-CA',{minimumFractionDigits:2,maximumFractionDigits:2})+' $';}
function fmtS(n){var a=Math.abs(n);return a>=1e6?(n/1e6).toFixed(1)+' M$':a>=1e4?(n/1e3).toFixed(1)+' k$':fmt(n);}
function fmtP(n){return n.toFixed(1)+'%';}
function pct(p,t){return t>0?p/t*100:0;}
var _dt=null;function debouncedRecalc(){if(_dt)clearTimeout(_dt);_dt=setTimeout(function(){pushUndo();recalculate();},80);}

/* ── Build main content (DOM-based, no innerHTML) ── */
function buildMainContent(){
var main=document.getElementById('main-content');
main.textContent='';
/* We build all sections as HTML string then set via a safe method */
var sections=buildSectionsHTML();
var temp=document.createElement('div');
/* Using a temporary container to parse the trusted HTML structure */
temp.insertAdjacentHTML('beforeend',sections);
while(temp.firstChild)main.appendChild(temp.firstChild);
setupListeners();
}

function buildSectionsHTML(){
return [
buildDashboardHTML(),buildRevenusHTML(),buildDepensesHTML(),buildPlacementsHTML(),
buildObjectifsHTML(),buildValeurNetteHTML(),buildDettesHTML(),buildGraphiquesHTML(),
buildProjectionsHTML(),buildSimulateursHTML(),buildTransactionsHTML(),
buildCalculateursHTML(),buildProfilHTML(),buildParametresHTML()
].join('');
}

function buildDashboardHTML(){
return '<div class="section active" id="section-dashboard">'+
'<h2 class="section-title" id="dashboard-title">Tableau de bord</h2>'+
'<p class="section-desc" id="dashboard-desc">Vue d\'ensemble de votre situation financiere</p>'+
'<div id="alert-over-budget" class="alert alert-danger alert-hidden">Vos depenses depassent votre revenu!</div>'+
'<div id="alert-near-budget" class="alert alert-warning alert-hidden">Vous utilisez plus de 90% de votre revenu.</div>'+
'<div class="view-tabs"><button class="view-tab active" onclick="setDashboardView(\'mensuel\',this)">Mensuel</button><button class="view-tab" onclick="setDashboardView(\'annuel\',this)">Annuel</button></div>'+
'<div class="stats-grid">'+
'<div class="stat-card"><div class="stat-label">Revenu net</div><div class="stat-value accent" id="stat-revenu">0 $</div><div class="stat-sub" id="stat-revenu-sub">par mois</div></div>'+
'<div class="stat-card"><div class="stat-label">Depenses</div><div class="stat-value negative" id="stat-depenses">0 $</div><div class="stat-sub" id="stat-depenses-pct">0%</div></div>'+
'<div class="stat-card"><div class="stat-label">Placements</div><div class="stat-value accent" id="stat-placements">0 $</div><div class="stat-sub" id="stat-placements-pct">0%</div></div>'+
'<div class="stat-card"><div class="stat-label">Disponible</div><div class="stat-value positive" id="stat-reste">0 $</div><div class="stat-sub" id="stat-reste-pct">0%</div></div>'+
'</div>'+
'<div class="dashboard-top-grid">'+
'<div class="card" style="margin-bottom:0"><div class="card-title">Score financier</div><div class="health-score-container"><div class="health-score-ring" id="health-ring"><svg viewBox="0 0 120 120"><circle class="ring-bg" cx="60" cy="60" r="52"/><circle class="ring-fg" id="health-ring-fg" cx="60" cy="60" r="52" stroke-dasharray="326.73" stroke-dashoffset="326.73"/></svg><div class="health-score-center"><div class="health-score-value" id="health-score-val">--</div><div class="health-score-max">/100</div></div></div><div class="health-score-label" id="health-score-label">--</div><div class="health-score-desc" id="health-score-desc">Entrez vos donnees</div></div><div class="health-breakdown" id="health-breakdown"></div></div>'+
'<div class="card" style="margin-bottom:0"><div class="card-title">Indicateurs cles</div><div class="kpi-grid">'+
'<div class="kpi-item"><div class="stat-label">Valeur nette</div><div class="stat-value accent" id="stat-networth" style="font-size:22px">0 $</div><div class="stat-sub">Actifs - Passifs</div></div>'+
'<div class="kpi-item"><div class="stat-label">Taux epargne</div><div class="stat-value positive" id="stat-savings-rate" style="font-size:22px">0%</div><div class="stat-sub">Objectif: 20%+</div></div>'+
'<div class="kpi-item"><div class="stat-label">Ratio dettes</div><div class="stat-value" id="stat-debt-ratio" style="font-size:22px">0%</div><div class="stat-sub">Max: 36%</div></div>'+
'<div class="kpi-item"><div class="stat-label">Indep. financiere</div><div class="stat-value accent" id="stat-fire-pct" style="font-size:22px">0%</div><div class="stat-sub" id="stat-fire-sub">--</div></div>'+
'</div></div></div>'+
'<div class="card"><div class="card-title">Repartition du budget</div><div class="progress-container"><div class="progress-header"><span id="progress-used">0%</span><span id="progress-free">100%</span></div><div class="progress-bar"><div class="progress-segment progress-expenses" id="bar-expenses" style="width:0%"></div><div class="progress-segment progress-investments" id="bar-investments" style="width:0%"></div><div class="progress-segment progress-remaining" id="bar-remaining" style="width:100%"></div></div><div class="progress-legend"><span><span class="legend-dot" style="background:var(--danger)"></span> Depenses <span id="legend-exp-pct">0%</span></span><span><span class="legend-dot" style="background:var(--accent)"></span> Placements <span id="legend-inv-pct">0%</span></span><span><span class="legend-dot" style="background:var(--success)"></span> Disponible <span id="legend-rem-pct">100%</span></span></div></div></div>'+
'<div class="card"><div class="card-title">Regle 50/30/20 <span class="tooltip" data-tip="Besoins 50% max, Envies 30% max, Epargne 20% min">&#9432;</span></div><div class="rule-grid"><div class="rule-card" id="rule-besoins"><div class="rule-pct" id="rule-besoins-pct">0%</div><div class="rule-target">Cible: 50% max</div><div class="rule-label">Besoins</div><div class="rule-amount" id="rule-besoins-amt">--</div></div><div class="rule-card" id="rule-envies"><div class="rule-pct" id="rule-envies-pct">0%</div><div class="rule-target">Cible: 30% max</div><div class="rule-label">Envies</div><div class="rule-amount" id="rule-envies-amt">--</div></div><div class="rule-card" id="rule-epargne"><div class="rule-pct" id="rule-epargne-pct">0%</div><div class="rule-target">Cible: 20% min</div><div class="rule-label">Epargne</div><div class="rule-amount" id="rule-epargne-amt">--</div></div></div></div>'+
'<div class="card"><div class="card-title">Fonds d\'urgence <span class="tooltip" data-tip="3 a 6 mois recommandes">&#9432;</span></div><div class="form-row"><div class="form-group"><label>Montant actuel</label><input type="number" id="emergency-fund" placeholder="0" step="0.01" min="0"></div></div><div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap"><div class="emergency-card" id="emergency-card" style="flex:1;min-width:150px"><div class="emergency-months" id="emergency-months">0</div><div class="emergency-label">mois couverts</div></div><div style="flex:1;min-width:200px"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:8px"><strong>Depenses/mois:</strong> <span id="emergency-monthly-exp">0 $</span></div><div style="font-size:13px;color:var(--text-secondary);margin-bottom:8px"><strong>Objectif 3 mois:</strong> <span id="emergency-3m">0 $</span></div><div style="font-size:13px;color:var(--text-secondary)"><strong>Objectif 6 mois:</strong> <span id="emergency-6m">0 $</span></div></div></div></div>'+
'<div class="card"><div class="card-title">Analyse intelligente</div><div id="report-content"></div></div>'+
'<div class="charts-grid"><div class="card"><div class="card-title">Repartition</div><div class="chart-container"><canvas id="chart-pie"></canvas></div></div><div class="card"><div class="card-title">Depenses par categorie</div><div class="chart-container"><canvas id="chart-bar-expenses"></canvas></div></div></div>'+
'</div>';
}

function buildRevenusHTML(){
return '<div class="section" id="section-revenus"><h2 class="section-title">Revenus</h2><p class="section-desc">Salaire et autres sources de revenus</p>'+
'<div class="view-tabs"><button class="view-tab active" onclick="setRevenuMode(\'net\',this)">Salaire net</button><button class="view-tab" onclick="setRevenuMode(\'brut\',this)">Brut vers Net</button></div>'+
'<div id="revenu-net-section"><div class="card"><div class="card-title">Salaire net</div><div class="form-row"><div class="form-group"><label>Salaire net</label><input type="number" id="salary-net" placeholder="0" step="0.01" min="0"></div><div class="form-group"><label>Frequence</label><select id="salary-frequency"><option value="365">Par jour</option><option value="52">Par semaine</option><option value="26">Aux 2 semaines</option><option value="12" selected>Par mois</option><option value="2">Aux 6 mois</option><option value="1">Par annee</option></select></div><div class="form-group"><label>Province</label><select id="province"><option value="QC">Quebec</option><option value="ON">Ontario</option><option value="BC">Colombie-Britannique</option><option value="AB">Alberta</option><option value="SK">Saskatchewan</option><option value="MB">Manitoba</option></select></div></div><div class="form-row" style="margin-bottom:0"><div class="form-group"><label>Annuel net</label><div style="font-size:20px;font-weight:700;color:var(--success);padding:8px 0" id="annual-net">0 $</div></div><div class="form-group"><label>Mensuel net</label><div style="font-size:20px;font-weight:700;color:var(--accent);padding:8px 0" id="monthly-net">0 $</div></div><div class="form-group"><label>Hebdo net</label><div style="font-size:20px;font-weight:700;padding:8px 0" id="weekly-net">0 $</div></div></div></div></div>'+
'<div id="revenu-brut-section" style="display:none"><div class="card"><div class="card-title">Calculateur Brut vers Net</div><div class="form-row"><div class="form-group"><label>Salaire brut annuel</label><input type="number" id="gross-salary" placeholder="65000" step="100" min="0" oninput="calcBrutNet()"></div><div class="form-group"><label>Province</label><select id="gross-province" onchange="calcBrutNet()"><option value="QC">Quebec</option><option value="ON">Ontario</option><option value="BC">C.-B.</option><option value="AB">Alberta</option><option value="SK">Saskatchewan</option><option value="MB">Manitoba</option></select></div></div><div id="brut-net-results"></div><button class="btn btn-primary" style="margin-top:12px" onclick="applyBrutNet()">Utiliser ce salaire net</button></div></div>'+
'<div class="card"><div class="card-title">Autres revenus <button class="btn btn-sm btn-primary" onclick="addExtraIncome()">+ Ajouter</button></div><div class="extra-income-list" id="extra-income-list"></div><div style="margin-top:12px;font-size:14px;font-weight:600">Total autres (annuel): <span id="extra-income-total" style="color:var(--success)">0 $</span></div></div>'+
'<div class="card" style="background:var(--accent-light);border-color:var(--accent)"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px"><div><div style="font-size:12px;font-weight:700;color:var(--accent);text-transform:uppercase">Revenu total annuel</div><div style="font-size:32px;font-weight:800;color:var(--accent)" id="total-annual-income">0 $</div></div><div><div style="font-size:12px;font-weight:700;color:var(--accent);text-transform:uppercase">Par mois</div><div style="font-size:24px;font-weight:700;color:var(--accent)" id="total-monthly-income">0 $</div></div><div><div style="font-size:12px;font-weight:700;color:var(--accent);text-transform:uppercase">Taux horaire</div><div style="font-size:24px;font-weight:700;color:var(--accent)" id="total-hourly-income">0 $</div></div></div></div></div>';
}

function buildDepensesHTML(){
return '<div class="section" id="section-depenses"><h2 class="section-title">Depenses</h2><p class="section-desc">Montant fixe ($) ou pourcentage (%) du revenu net</p><div class="card"><div class="card-title">Categories <button class="btn btn-sm btn-primary" onclick="openModal(\'expense\')">+ Categorie</button></div><div class="category-list" id="expense-list"></div><div style="margin-top:16px;padding-top:16px;border-top:2px solid var(--border);display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px"><span style="font-size:15px;font-weight:700">Total annuel</span><span style="font-size:20px;font-weight:800;color:var(--danger)" id="total-expenses-annual">0 $</span></div><div style="display:flex;justify-content:space-between;margin-top:4px;flex-wrap:wrap;gap:8px"><span style="font-size:13px;color:var(--text-muted)">Total mensuel</span><span style="font-size:15px;font-weight:700;color:var(--danger)" id="total-expenses-monthly">0 $</span></div></div></div>';
}

function buildPlacementsHTML(){
return '<div class="section" id="section-placements"><h2 class="section-title">Placements</h2><p class="section-desc">Comptes enregistres et non enregistres</p><div class="card"><div class="card-title">Comptes <button class="btn btn-sm btn-primary" onclick="openModal(\'investment\')">+ Placement</button></div><div class="category-list" id="investment-list"></div><div style="margin-top:16px;padding-top:16px;border-top:2px solid var(--border);display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px"><span style="font-size:15px;font-weight:700">Total annuel</span><span style="font-size:20px;font-weight:800;color:var(--accent)" id="total-investments-annual">0 $</span></div><div style="display:flex;justify-content:space-between;margin-top:4px;flex-wrap:wrap;gap:8px"><span style="font-size:13px;color:var(--text-muted)">Total mensuel</span><span style="font-size:15px;font-weight:700;color:var(--accent)" id="total-investments-monthly">0 $</span></div></div></div>';
}

function buildObjectifsHTML(){
return '<div class="section" id="section-objectifs"><h2 class="section-title">Objectifs d\'epargne</h2><p class="section-desc">Suivez vos objectifs financiers</p><div class="stats-grid" id="goals-summary" style="display:none"><div class="stat-card"><div class="stat-label">Objectifs</div><div class="stat-value accent" id="goals-count">0</div></div><div class="stat-card"><div class="stat-label">Epargne</div><div class="stat-value positive" id="goals-total-saved">0 $</div></div><div class="stat-card"><div class="stat-label">Cible</div><div class="stat-value" id="goals-total-target">0 $</div></div><div class="stat-card"><div class="stat-label">Progression</div><div class="stat-value accent" id="goals-overall-pct">0%</div></div></div><div class="card"><div class="card-title">Mes objectifs <button class="btn btn-sm btn-primary" onclick="openGoalModal()">+ Objectif</button></div><div id="goals-list"></div><p id="goals-empty" style="color:var(--text-muted);font-size:13px;text-align:center;padding:30px 0">Aucun objectif. Cliquez + pour commencer.</p></div></div>';
}

function buildValeurNetteHTML(){
var h='<div class="section" id="section-valeur-nette"><h2 class="section-title">Valeur nette</h2><p class="section-desc">Actifs moins passifs</p>';
h+='<div class="alert alert-info" style="margin-bottom:18px;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6;background:var(--accent-bg,rgba(59,130,246,.08));border:1px solid var(--accent-border,rgba(59,130,246,.18));color:var(--text-primary)"><strong>Votre valeur nette = Actifs - Passifs.</strong> C\'est un indicateur cle de votre sante financiere. Ajoutez vos biens et dettes pour suivre votre progression.</div>';
h+='<div class="stats-grid"><div class="stat-card"><div class="stat-label">Actifs</div><div class="stat-value positive" id="nw-total-assets">0 $</div></div><div class="stat-card"><div class="stat-label">Passifs</div><div class="stat-value negative" id="nw-total-liabilities">0 $</div></div><div class="stat-card"><div class="stat-label">Valeur nette</div><div class="stat-value accent" id="nw-net-worth">0 $</div></div><div class="stat-card"><div class="stat-label">Ratio</div><div class="stat-value" id="nw-ratio">--</div></div></div>';
h+='<div class="nw-grid"><div class="card"><div class="card-title">Actifs <button class="btn btn-sm btn-success" onclick="addNWItem(\'asset\')">+ Actif</button></div><p style="color:var(--text-muted);font-size:12px;margin:0 0 10px 0">Ce que vous possedez (epargnes, propriete, vehicule, placements...)</p><div id="nw-assets-list"></div></div>';
h+='<div class="card"><div class="card-title">Passifs <button class="btn btn-sm btn-danger" onclick="addNWItem(\'liability\')">+ Passif</button></div><p style="color:var(--text-muted);font-size:12px;margin:0 0 10px 0">Ce que vous devez (hypotheque, prets, cartes de credit...)</p><div id="nw-liabilities-list"></div></div></div>';
h+='<div class="card"><div class="card-title">Evolution</div><div class="chart-container"><canvas id="chart-networth"></canvas></div></div></div>';
return h;
}

function buildDettesHTML(){
return '<div class="section" id="section-dettes"><h2 class="section-title">Gestion des dettes</h2><p class="section-desc">Strategiez votre remboursement et comparez avec l\'investissement</p><div class="stats-grid"><div class="stat-card"><div class="stat-label">Total dettes</div><div class="stat-value negative" id="debt-total">0 $</div></div><div class="stat-card"><div class="stat-label">Paiement/mois</div><div class="stat-value warning" id="debt-monthly">0 $</div></div><div class="stat-card"><div class="stat-label">Interet total</div><div class="stat-value negative" id="debt-total-interest">0 $</div></div><div class="stat-card"><div class="stat-label">Liberation</div><div class="stat-value positive" id="debt-free-date">--</div></div></div><div class="card"><div class="card-title">Mes dettes <button class="btn btn-sm btn-primary" onclick="openDebtModal()">+ Dette</button></div><div id="debts-list"></div><p id="debts-empty" style="color:var(--text-muted);font-size:13px;text-align:center;padding:30px 0">Aucune dette.</p></div>'+
'<div class="card"><div class="card-title">Analyse : Rembourser vs Investir <span class="tooltip" data-tip="Compare le cout de garder la dette vs investir le meme montant. Si le taux de la dette depasse le rendement espere, rembourser est mathematiquement optimal.">&#9432;</span></div><div class="form-row"><div class="form-group"><label>Rendement estime de vos placements (%)</label><input type="number" id="debt-invest-rate" value="7" min="0" max="20" step="0.5" onchange="renderDebtAnalysis()"></div><div class="form-group"><label>Montant supplementaire disponible ($/mois)</label><input type="number" id="debt-extra-amount" value="200" min="0" step="50" onchange="renderDebtAnalysis()"></div></div><div id="debt-vs-invest-analysis"></div></div>'+
'<div class="card"><div class="card-title">Strategie de remboursement</div><div class="view-tabs"><button class="view-tab active" onclick="setDebtStrategy(\'avalanche\',this)">Avalanche</button><button class="view-tab" onclick="setDebtStrategy(\'snowball\',this)">Boule de neige</button></div><div id="debt-strategy-result"></div></div><div class="card"><div class="card-title">Projection</div><div class="chart-container"><canvas id="chart-debt"></canvas></div></div></div>';
}

function buildGraphiquesHTML(){
return '<div class="section" id="section-graphiques"><h2 class="section-title">Graphiques</h2><p class="section-desc">Visualisations detaillees</p><div class="charts-grid"><div class="card"><div class="card-title">Repartition</div><div class="chart-container"><canvas id="chart-pie-full"></canvas></div></div><div class="card"><div class="card-title">Depenses</div><div class="chart-container"><canvas id="chart-bar-expenses-full"></canvas></div></div><div class="card"><div class="card-title">Placements</div><div class="chart-container"><canvas id="chart-bar-investments"></canvas></div></div><div class="card"><div class="card-title">Budget mensuel</div><div class="chart-container"><canvas id="chart-budget-overview"></canvas></div></div><div class="card"><div class="card-title">Par groupe</div><div class="chart-container"><canvas id="chart-expenses-group"></canvas></div></div><div class="card"><div class="card-title">Besoins/Envies/Epargne</div><div class="chart-container"><canvas id="chart-needs-wants"></canvas></div></div></div></div>';
}

function buildProjectionsHTML(){
return '<div class="section" id="section-projections"><h2 class="section-title">Projections</h2><p class="section-desc">Visualisez la croissance de vos placements avec des ajustements dans le temps</p>'+
'<div class="card"><div class="card-title">Parametres generaux</div><div class="form-row"><div class="form-group"><label>Horizon (ans)</label><input type="number" id="proj-years" value="30" min="1" max="50"></div><div class="form-group"><label>Inflation (%)</label><input type="number" id="proj-inflation" value="2.0" min="0" max="20" step="0.1"></div></div></div>'+
'<div class="card"><div class="card-title">Configuration par placement <span class="tooltip" data-tip="Ajustez le solde initial, le rendement, et ajoutez des changements de contribution a des annees precises">&#9432;</span></div><div id="proj-config"></div></div>'+
'<div class="card"><div class="card-title">Evenements planifies <button class="btn btn-sm btn-primary" onclick="addProjEvent()">+ Evenement</button> <span class="tooltip" data-tip="Augmentation de salaire, achat maison, enfant, retraite... tout ce qui change vos contributions">&#9432;</span></div><div id="proj-events-list"></div><p id="proj-events-empty" style="color:var(--text-muted);font-size:13px;padding:12px 0">Aucun evenement. Ajoutez des changements de contribution dans le temps (ex: augmenter CELI a 700$/mois a partir de 2028).</p></div>'+
'<div class="card"><div class="card-title">Croissance projetee</div><div class="chart-container" style="height:420px"><canvas id="chart-projection"></canvas></div></div>'+
'<div class="card"><div class="card-title">Detail annee par annee</div><p style="color:var(--text-muted);font-size:13px;margin-bottom:12px">Evolution de vos placements annee par annee, avec rendements composes et ajustement pour l\'inflation.</p><div style="overflow-x:auto"><table class="data-table" id="proj-detail-table"><thead><tr><th>Annee</th><th>Contributions cumulees</th><th>Rendements</th><th>Total</th><th>Valeur reelle (inflation)</th></tr></thead><tbody id="projection-tbody"></tbody></table></div></div></div>';
}

function buildSimulateursHTML(){
return '<div class="section" id="section-simulateurs"><h2 class="section-title">Simulateurs</h2><p class="section-desc">Planifiez votre avenir financier avec nos outils de simulation interactifs</p>'+
'<div class="view-tabs"><button class="view-tab active" onclick="showSimTab(\'retraite\',this)">Retraite</button><button class="view-tab" onclick="showSimTab(\'hypotheque\',this)">Hypotheque</button><button class="view-tab" onclick="showSimTab(\'fire\',this)">FIRE</button><button class="view-tab" onclick="showSimTab(\'epargne\',this)">Epargne</button></div>'+
'<div id="sim-retraite"><div class="card"><div class="card-title">Simulateur de retraite</div><p style="color:var(--text-muted);font-size:13px;margin-bottom:16px">Estimez le capital necessaire pour maintenir votre niveau de vie a la retraite, en tenant compte du RRQ, de la PSV et de l\'inflation. Les resultats se mettent a jour automatiquement.</p><div class="form-row"><div class="form-group"><label>Age actuel</label><input type="number" id="sim-ret-age" value="30" min="18" max="80" oninput="calcRetraite()"></div><div class="form-group"><label>Age souhaite de retraite</label><input type="number" id="sim-ret-retire" value="65" min="50" oninput="calcRetraite()"></div><div class="form-group"><label>Esperance de vie</label><input type="number" id="sim-ret-life" value="90" min="70" oninput="calcRetraite()"></div></div><div class="form-row"><div class="form-group"><label>Epargne deja accumulee ($)</label><input type="number" id="sim-ret-current" value="0" min="0" step="1000" oninput="calcRetraite()"></div><div class="form-group"><label>RRQ prevu/mois a 65 ans ($)</label><input type="number" id="sim-ret-rrq" value="900" oninput="calcRetraite()"></div><div class="form-group"><label>PSV prevu/mois a 65 ans ($)</label><input type="number" id="sim-ret-psv" value="700" oninput="calcRetraite()"></div></div><div class="form-row"><div class="form-group"><label>Depenses mensuelles a la retraite ($)</label><input type="number" id="sim-ret-exp" value="3000" oninput="calcRetraite()"></div><div class="form-group"><label>Rendement annuel estime (%)</label><input type="number" id="sim-ret-rate" value="6" step="0.5" oninput="calcRetraite()"></div><div class="form-group"><label>Inflation annuelle (%)</label><input type="number" id="sim-ret-infl" value="2" step="0.5" oninput="calcRetraite()"></div></div><div id="sim-ret-results" class="sim-result"></div></div></div>'+
'<div id="sim-hypotheque" style="display:none"><div class="card"><div class="card-title">Simulateur hypothecaire</div><p style="color:var(--text-muted);font-size:13px;margin-bottom:16px">Calculez vos paiements hypothecaires selon differents scenarios. Inclut le calcul de la prime SCHL si la mise de fonds est inferieure a 20%.</p><div class="form-row"><div class="form-group"><label>Prix de la propriete ($)</label><input type="number" id="sim-hyp-price" value="400000" step="5000" oninput="calcHyp()"></div><div class="form-group"><label>Mise de fonds ($)</label><input type="number" id="sim-hyp-down" value="80000" step="1000" oninput="calcHyp()"></div><div class="form-group"><label>Taux d\'interet (%)</label><input type="number" id="sim-hyp-rate" value="5.5" step="0.05" oninput="calcHyp()"></div></div><div class="form-row"><div class="form-group"><label>Amortissement</label><select id="sim-hyp-amort" onchange="calcHyp()"><option value="15">15 ans</option><option value="20">20 ans</option><option value="25" selected>25 ans</option><option value="30">30 ans</option></select></div><div class="form-group"><label>Frequence de paiement</label><select id="sim-hyp-freq" onchange="calcHyp()"><option value="12">Mensuel</option><option value="26">Aux 2 semaines</option><option value="52">Hebdomadaire</option></select></div><div class="form-group"><label>Taxes foncieres/an ($)</label><input type="number" id="sim-hyp-taxes" value="3000" oninput="calcHyp()"></div></div><div id="sim-hyp-results" class="sim-result"></div></div></div>'+
'<div id="sim-fire" style="display:none"><div class="card"><div class="card-title">Simulateur FIRE <span class="tooltip" data-tip="Financial Independence Retire Early">&#9432;</span></div><p style="color:var(--text-muted);font-size:13px;margin-bottom:16px">Le mouvement FIRE (Financial Independence, Retire Early) vise a accumuler suffisamment de capital pour vivre de vos placements. La regle du 4% suggere d\'accumuler 25x vos depenses annuelles.</p><div class="form-row"><div class="form-group"><label>Depenses annuelles ($)</label><input type="number" id="sim-fire-exp" value="36000" step="1000" oninput="calcFIRE()"></div><div class="form-group"><label>Epargne deja accumulee ($)</label><input type="number" id="sim-fire-current" value="0" step="1000" oninput="calcFIRE()"></div><div class="form-group"><label>Epargne annuelle prevue ($)</label><input type="number" id="sim-fire-annual" value="15000" step="1000" oninput="calcFIRE()"></div></div><div class="form-row"><div class="form-group"><label>Rendement annuel estime (%)</label><input type="number" id="sim-fire-rate" value="7" step="0.5" oninput="calcFIRE()"></div><div class="form-group"><label>Taux de retrait (%) <span style="font-weight:400;color:var(--text-muted)">(regle du 4%)</span></label><input type="number" id="sim-fire-wr" value="4" step="0.5" oninput="calcFIRE()"></div></div><div id="sim-fire-results" class="sim-result"></div></div></div>'+
'<div id="sim-epargne" style="display:none"><div class="card"><div class="card-title">Simulateur d\'epargne</div><p style="color:var(--text-muted);font-size:13px;margin-bottom:16px">Projetez la croissance de votre epargne dans le temps grace a l\'interet compose. Voyez l\'impact de contributions regulieres sur votre capital futur.</p><div class="form-row"><div class="form-group"><label>Capital initial ($)</label><input type="number" id="sim-sav-init" value="1000" step="100" oninput="calcEpargne()"></div><div class="form-group"><label>Contribution mensuelle ($)</label><input type="number" id="sim-sav-monthly" value="500" step="50" oninput="calcEpargne()"></div></div><div class="form-row"><div class="form-group"><label>Rendement annuel estime (%)</label><input type="number" id="sim-sav-rate" value="6" step="0.5" oninput="calcEpargne()"></div><div class="form-group"><label>Duree de placement (ans)</label><input type="number" id="sim-sav-years" value="20" min="1" oninput="calcEpargne()"></div></div><div id="sim-sav-results" class="sim-result"></div><div class="chart-container" style="margin-top:16px"><canvas id="chart-sim-savings"></canvas></div></div></div></div>';
}

function buildTransactionsHTML(){
return '<div class="section" id="section-transactions"><h2 class="section-title">Transactions</h2><p class="section-desc">Journal de vos depenses reelles vs votre budget prevu</p>'+
'<div class="card"><div class="card-title">Filtres <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-sm btn-primary" onclick="openTxModal()">+ Transaction</button><input type="file" id="csv-import-file" accept=".csv" style="display:none" onchange="importCSVTransactions(event)"><button class="btn btn-sm btn-outline" onclick="document.getElementById(\'csv-import-file\').click()">Importer CSV</button></div></div><div class="form-row"><div class="form-group"><label>Mois</label><input type="month" id="tx-filter-month" onchange="renderTransactions()"></div><div class="form-group"><label>Categorie</label><select id="tx-filter-cat" onchange="renderTransactions()"><option value="">Toutes</option></select></div></div></div>'+
'<div class="stats-grid"><div class="stat-card"><div class="stat-label">Revenus du mois</div><div class="stat-value positive" id="tx-month-income">0 $</div></div><div class="stat-card"><div class="stat-label">Depenses du mois</div><div class="stat-value negative" id="tx-month-expense">0 $</div></div><div class="stat-card"><div class="stat-label">Solde du mois</div><div class="stat-value accent" id="tx-month-balance">0 $</div></div><div class="stat-card"><div class="stat-label">Transactions</div><div class="stat-value" id="tx-month-count">0</div></div></div>'+
'<div class="card"><div class="card-title">Budget vs Reel <span class="tooltip" data-tip="Compare vos depenses reelles (transactions) avec votre budget prevu (categories de depenses)">&#9432;</span></div><div id="budget-vs-real"></div></div>'+
'<div class="card"><div class="card-title">Transactions</div><div id="tx-list"></div><p id="tx-empty" style="color:var(--text-muted);font-size:13px;text-align:center;padding:20px">Aucune transaction. Cliquez + pour ajouter vos depenses reelles et comparer avec votre budget.</p></div></div>';
}

function buildCalculateursHTML(){
return '<div class="section" id="section-calculateurs"><h2 class="section-title">Calculateurs</h2><p class="section-desc">Outils financiers rapides</p><div class="charts-grid">'+
'<div class="card"><div class="card-title">Cout reel d\'un achat</div><div class="calc-card"><div class="form-group"><label>Prix ($)</label><input type="number" id="calc-cost-price" placeholder="100" oninput="calcRealCost()"></div><div class="form-group" style="margin-top:8px"><label>Taux horaire ($/h)</label><input type="number" id="calc-cost-hourly" placeholder="25" oninput="calcRealCost()"></div><div class="calc-result" id="calc-cost-result" style="display:none"></div></div></div>'+
'<div class="card"><div class="card-title">Interet compose</div><div class="calc-card"><div class="form-group"><label>Capital ($)</label><input type="number" id="calc-ci-p" placeholder="10000" oninput="calcCI()"></div><div class="form-row" style="margin-top:8px"><div class="form-group"><label>Taux (%)</label><input type="number" id="calc-ci-r" placeholder="7" step="0.1" oninput="calcCI()"></div><div class="form-group"><label>Ans</label><input type="number" id="calc-ci-y" placeholder="10" oninput="calcCI()"></div></div><div class="form-group" style="margin-top:8px"><label>Contrib/mois ($)</label><input type="number" id="calc-ci-m" placeholder="500" oninput="calcCI()"></div><div class="calc-result" id="calc-ci-result" style="display:none"></div></div></div>'+
'<div class="card"><div class="card-title">Partage facture</div><div class="calc-card"><div class="form-group"><label>Total ($)</label><input type="number" id="calc-split-total" placeholder="150" oninput="calcSplit()"></div><div class="form-row" style="margin-top:8px"><div class="form-group"><label>Personnes</label><input type="number" id="calc-split-p" value="2" min="1" oninput="calcSplit()"></div><div class="form-group"><label>Pourboire (%)</label><input type="number" id="calc-split-tip" value="15" oninput="calcSplit()"></div></div><div class="calc-result" id="calc-split-result" style="display:none"></div></div></div>'+
'<div class="card"><div class="card-title">Regle du 72</div><div class="calc-card"><div class="form-group"><label>Taux (%)</label><input type="number" id="calc-72-r" placeholder="7" step="0.5" oninput="calcR72()"></div><div class="calc-result" id="calc-72-result" style="display:none"></div></div></div>'+
'</div></div>';
}

function buildProfilHTML(){
return '<div class="section" id="section-profil"><h2 class="section-title">Mon profil</h2><p class="section-desc">Vos informations personnelles — modifiez n\'importe quel champ, les adaptations se font automatiquement</p>'+
'<div id="profil-content"></div></div>';
}

function renderProfil(){
var c=document.getElementById('profil-content');if(!c)return;c.textContent='';
var p=state.profile||{};if(!p.setupComplete){
var box=document.createElement('div');box.className='card';box.style.textAlign='center';
var icon=document.createElement('div');icon.style.cssText='font-size:48px;margin-bottom:12px';icon.textContent='\u{1F464}';box.appendChild(icon);
var title=document.createElement('h3');title.style.cssText='font-size:18px;font-weight:700;margin-bottom:8px';title.textContent='Completez votre profil';box.appendChild(title);
var desc=document.createElement('p');desc.style.cssText='color:var(--text-muted);font-size:14px;margin-bottom:20px';desc.textContent='Repondez a quelques questions pour personnaliser l\'application a votre situation (age, emploi, objectifs, etc.)';box.appendChild(desc);
var btn=document.createElement('button');btn.className='btn btn-primary btn-lg';btn.textContent='Configurer mon profil';btn.onclick=function(){openProfileEditor();};box.appendChild(btn);
c.appendChild(box);return;}
var age=getProfileAge();

/* ── Summary card ── */
var summary=document.createElement('div');summary.className='card';summary.style.cssText='display:flex;align-items:center;gap:20px;flex-wrap:wrap';
var avatar=document.createElement('div');avatar.style.cssText='width:64px;height:64px;border-radius:50%;background:var(--accent);color:white;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;flex-shrink:0';
avatar.textContent=p.name?p.name.charAt(0).toUpperCase():'?';summary.appendChild(avatar);
var info=document.createElement('div');info.style.flex='1';
var nameEl=document.createElement('div');nameEl.style.cssText='font-size:22px;font-weight:800';nameEl.textContent=p.name||'--';info.appendChild(nameEl);
var details=document.createElement('div');details.style.cssText='font-size:13px;color:var(--text-muted);margin-top:4px';
var parts=[];
if(age)parts.push(age+' ans');
var sitLabels={celibataire:'Celibataire',couple:'En couple',famille:'Famille',monoparental:'Monoparental'};
if(p.situation)parts.push(sitLabels[p.situation]||p.situation);
if(p.children>0)parts.push(p.children+' enfant'+(p.children>1?'s':''));
var empLabels={employe:'Employe(e)',autonome:'Travailleur autonome',etudiant:'Etudiant(e)',retraite:'Retraite(e)'};
if(p.employment)parts.push(empLabels[p.employment]||p.employment);
if(p.province)parts.push(p.province);
details.textContent=parts.join(' | ');info.appendChild(details);
summary.appendChild(info);c.appendChild(summary);

/* ── Editable fields ── */
var fields=[
{key:'name',label:'Nom complet',type:'text',value:p.name||''},
{key:'birthDate',label:'Date de naissance',type:'date',value:p.birthDate||'',suffix:age?' ('+age+' ans — se met a jour automatiquement)':''},
{key:'province',label:'Province',type:'select',value:p.province||'QC',options:[
{v:'QC',l:'Quebec'},{v:'ON',l:'Ontario'},{v:'BC',l:'Colombie-Britannique'},{v:'AB',l:'Alberta'},{v:'SK',l:'Saskatchewan'},{v:'MB',l:'Manitoba'},{v:'NB',l:'Nouveau-Brunswick'},{v:'NS',l:'Nouvelle-Ecosse'},{v:'PE',l:'Ile-du-Prince-Edouard'},{v:'NL',l:'Terre-Neuve'},{v:'YT',l:'Yukon'},{v:'NT',l:'T.N.-O.'},{v:'NU',l:'Nunavut'}]},
{key:'situation',label:'Situation',type:'select',value:p.situation||'celibataire',options:[
{v:'celibataire',l:'Celibataire'},{v:'couple',l:'En couple'},{v:'famille',l:'Famille'},{v:'monoparental',l:'Monoparental'}]},
{key:'children',label:'Nombre d\'enfants',type:'number',value:p.children||0,min:0,max:20},
{key:'employment',label:'Statut d\'emploi',type:'select',value:p.employment||'employe',options:[
{v:'employe',l:'Employe(e)'},{v:'autonome',l:'Travailleur autonome'},{v:'etudiant',l:'Etudiant(e)'},{v:'retraite',l:'Retraite(e)'}]},
{key:'housing',label:'Logement',type:'select',value:p.housing||'locataire',options:[
{v:'locataire',l:'Locataire'},{v:'proprietaire',l:'Proprietaire (hypotheque)'},{v:'proprio-libre',l:'Proprietaire (payee)'}]},
{key:'mainGoal',label:'Objectif principal',type:'select',value:p.mainGoal||'epargne',options:[
{v:'epargne',l:'Epargner plus'},{v:'dette',l:'Rembourser mes dettes'},{v:'maison',l:'Acheter une propriete'},{v:'retraite',l:'Planifier ma retraite'},{v:'fire',l:'Independance financiere (FIRE)'},{v:'investir',l:'Investir davantage'}]},
{key:'experience',label:'Niveau en finances',type:'select',value:p.experience||'debutant',options:[
{v:'debutant',l:'Debutant'},{v:'intermediaire',l:'Intermediaire'},{v:'avance',l:'Avance'}]},
{key:'incomeRange',label:'Tranche de revenu brut',type:'select',value:p.incomeRange||'',options:[
{v:'<30k',l:'Moins de 30 000$'},{v:'30-50k',l:'30 000 - 50 000$'},{v:'50-75k',l:'50 000 - 75 000$'},{v:'75-100k',l:'75 000 - 100 000$'},{v:'100-150k',l:'100 000 - 150 000$'},{v:'>150k',l:'Plus de 150 000$'}]}
];

var card=document.createElement('div');card.className='card';
var title=document.createElement('div');title.className='card-title';title.textContent='Informations personnelles';card.appendChild(title);

fields.forEach(function(f){
var row=document.createElement('div');row.className='settings-row';
var left=document.createElement('div');left.className='settings-label';
var h4=document.createElement('h4');h4.textContent=f.label;left.appendChild(h4);
if(f.suffix){var sub=document.createElement('p');sub.textContent=f.suffix;left.appendChild(sub);}
row.appendChild(left);

var right=document.createElement('div');right.style.cssText='min-width:220px';
if(f.type==='text'){
var inp=document.createElement('input');inp.type='text';inp.value=f.value;inp.style.cssText='padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg-primary);color:var(--text-primary);font-size:14px;width:100%';
inp.onchange=function(){updateProfileField(f.key,this.value);};
right.appendChild(inp);
}else if(f.type==='date'){
var inp2=document.createElement('input');inp2.type='date';inp2.value=f.value;inp2.max=new Date().toISOString().slice(0,10);
inp2.style.cssText='padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg-primary);color:var(--text-primary);font-size:14px;width:100%';
inp2.onchange=function(){updateProfileField(f.key,this.value);};
right.appendChild(inp2);
}else if(f.type==='number'){
var inp3=document.createElement('input');inp3.type='number';inp3.value=f.value;inp3.min=f.min||0;inp3.max=f.max||99;
inp3.style.cssText='padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg-primary);color:var(--text-primary);font-size:14px;width:100px';
inp3.onchange=function(){updateProfileField(f.key,parseInt(this.value)||0);};
right.appendChild(inp3);
}else if(f.type==='select'){
var sel=document.createElement('select');sel.style.cssText='padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg-primary);color:var(--text-primary);font-size:14px;width:100%';
(f.options||[]).forEach(function(opt){var o=document.createElement('option');o.value=opt.v;o.textContent=opt.l;if(f.value===opt.v)o.selected=true;sel.appendChild(o);});
sel.onchange=function(){updateProfileField(f.key,this.value);};
right.appendChild(sel);
}
row.appendChild(right);card.appendChild(row);
});
c.appendChild(card);

/* ── What this profile affects ── */
var effectsCard=document.createElement('div');effectsCard.className='card';
var effectsTitle=document.createElement('div');effectsTitle.className='card-title';effectsTitle.textContent='Ce que votre profil adapte automatiquement';effectsCard.appendChild(effectsTitle);
var effects=document.createElement('div');effects.id='profil-effects';effectsCard.appendChild(effects);
c.appendChild(effectsCard);
renderProfilEffects();
}

function updateProfileField(key,value){
var oldProfile=JSON.parse(JSON.stringify(state.profile));
pushUndo();
state.profile[key]=value;
if(key==='province')state.province=value;
state.profile.setupComplete=true;
/* Apply smart changes */
var changes=applyProfileToState(state.profile,oldProfile);
/* Update profiles list */
var profiles=getProfiles();
for(var i=0;i<profiles.length;i++){
if(profiles[i].id===currentProfileId){
profiles[i].name=state.profile.name;
profiles[i].age=getAgeFromBirth(state.profile.birthDate);
profiles[i].situation=({celibataire:'Solo',couple:'Couple',famille:'Famille',monoparental:'Monoparental'})[state.profile.situation]||'';
break;
}}
saveProfiles(profiles);
updateProfileDisplay();save();
/* Re-render affected sections */
renderExpenses();renderInvestments();renderGoals();renderDashboard();
renderProfil(); /* refresh the profile page itself */
/* Show feedback if changes were applied */
if(changes.length>0){
popupAlert('Profil mis a jour',changes.join(', '));
}
}

function renderProfilEffects(){
var el=document.getElementById('profil-effects');if(!el)return;el.textContent='';
var p=state.profile||{};if(!p.setupComplete)return;
var age=getProfileAge();
var effects=[];

/* Describe what's adapted based on current profile */
if(p.housing==='locataire')effects.push({icon:'🏢',text:'Logement configure en mode locataire (loyer)'});
else if(p.housing==='proprietaire')effects.push({icon:'🏠',text:'Logement configure en mode proprietaire (hypotheque, taxes foncières)'});
else effects.push({icon:'🏡',text:'Propriete payee — pas d\'hypotheque'});

if(p.children>0){
effects.push({icon:'👶',text:'REEE configure pour '+p.children+' enfant'+(p.children>1?'s':'')+' (plafond '+fmt(2500*p.children)+'/an, SCEE max '+fmt(500*p.children)+'/an)'});
effects.push({icon:'🧒',text:'Categories garderie et activites enfants ajoutees'});
}else{effects.push({icon:'👤',text:'Pas d\'enfant — REEE disponible si besoin'});}

var empDescs={employe:'Salarie — categories standard',autonome:'Travailleur autonome — cotisations RRQ, acomptes provisionnels, fournitures',etudiant:'Etudiant — frais scolarite, bourses, prets etudiants',retraite:'Retraite — rentes RRQ, PSV, pension employeur'};
effects.push({icon:'💼',text:empDescs[p.employment]||'Emploi: '+p.employment});

if(age){
var celiStart=Math.max(2009,(p.birthDate?new Date(p.birthDate).getFullYear():2000)+18);
var celiYears=Math.max(new Date().getFullYear()-celiStart,0);
effects.push({icon:'📅',text:age+' ans — droits CELI estimes: ~'+fmtS(celiYears*6500)+' (cumules depuis '+celiStart+')'});
effects.push({icon:'📊',text:'Projections configurees sur '+state.projYears+' ans (jusqu\'a ~'+(age+state.projYears)+' ans)'});
if(age>=71||p.housing!=='locataire'){effects.push({icon:'🏠',text:'CELIAPP: non admissible'});}
else{effects.push({icon:'✅',text:'CELIAPP: admissible (max 8 000$/an, 40 000$ a vie)'});}
}

var goalDescs={epargne:'Epargner plus — focus fonds urgence et taux epargne',dette:'Rembourser les dettes — analyse Rembourser vs Investir mise en avant',maison:'Acheter une propriete — CELIAPP et simulateur hypothecaire recommandes',retraite:'Planifier la retraite — simulateur retraite et projections long terme',fire:'Independance financiere — suivi FIRE et taux epargne agressif',investir:'Optimiser les investissements — focus placements et projections'};
effects.push({icon:'🎯',text:'Objectif: '+(goalDescs[p.mainGoal]||p.mainGoal)});

effects.push({icon:'🗺️',text:'Province: '+p.province+' — impots et cotisations adaptes'});

effects.forEach(function(e){
var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);font-size:13px';
var icon=document.createElement('span');icon.style.fontSize='20px';icon.textContent=e.icon;row.appendChild(icon);
var text=document.createElement('span');text.textContent=e.text;row.appendChild(text);
el.appendChild(row);
});
}

function buildParametresHTML(){
return '<div class="section" id="section-parametres"><h2 class="section-title">Parametres</h2><p class="section-desc">Configuration</p><div class="card">'+
'<div class="settings-row"><div class="settings-label"><h4>Theme</h4><p>Clair ou sombre</p></div><button class="btn btn-outline" onclick="toggleTheme()" id="theme-btn">Theme sombre</button></div>'+
'<div class="settings-row"><div class="settings-label"><h4>Imprimer</h4><p>PDF</p></div><button class="btn btn-outline" onclick="window.print()">Imprimer</button></div>'+
'<div class="settings-row"><div class="settings-label"><h4>Transferer vers un autre appareil</h4><p>Generez un QR code pour transferer votre profil vers votre telephone ou un autre ordinateur</p></div><button class="btn btn-primary" onclick="showTransferQR()">QR Code</button></div>'+
'<div class="settings-row"><div class="settings-label"><h4>Recevoir un transfert</h4><p>Collez le code de transfert recu d\'un autre appareil</p></div><button class="btn btn-outline" onclick="showReceiveTransfer()">Recevoir</button></div>'+
'<div class="settings-row"><div class="settings-label"><h4>Exporter JSON</h4><p>Sauvegarde complete en fichier</p></div><button class="btn btn-success" onclick="exportData()">Exporter</button></div>'+
'<div class="settings-row"><div class="settings-label"><h4>Exporter CSV</h4><p>Tableur</p></div><button class="btn btn-success" onclick="exportCSV()">CSV</button></div>'+
'<div class="settings-row"><div class="settings-label"><h4>Importer</h4><p>Restaurer depuis un fichier JSON</p></div><div><input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(event)"><button class="btn btn-primary" onclick="document.getElementById(\'import-file\').click()">Importer</button></div></div>'+
'<div class="settings-row"><div class="settings-label"><h4>Reinitialiser</h4><p>Tout effacer</p></div><button class="btn btn-danger" onclick="resetAll()">Reset</button></div>'+
'</div><div class="card"><div class="card-title">Raccourcis</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;font-size:13px"><div><span class="kbd">Ctrl+K</span> Rechercher</div><div><span class="kbd">Ctrl+Z</span> Annuler</div><div><span class="kbd">Ctrl+Y</span> Retablir</div><div><span class="kbd">Ctrl+S</span> Sauvegarder</div><div><span class="kbd">Ctrl+E</span> Exporter</div><div><span class="kbd">1-9</span> Naviguer</div></div></div></div>';
}

/* We need modals too - add them once */
function addModals(){
/* Category modal */
var m1=document.createElement('div');m1.className='modal-overlay';m1.id='modal-overlay';
m1.insertAdjacentHTML('beforeend','<div class="modal"><h3 id="modal-title">Ajouter</h3><div class="form-group"><label>Nom</label><input type="text" id="modal-name" placeholder="Ex: Epicerie"></div><div class="form-group"><label>Description</label><input type="text" id="modal-desc" placeholder="Optionnel"></div><div class="form-group" id="modal-group-group"><label>Groupe</label><input type="text" id="modal-group" placeholder="Ex: Logement" list="group-suggestions"><datalist id="group-suggestions"></datalist></div><div class="form-group" id="modal-rate-group" style="display:none"><label>Rendement (%)</label><input type="number" id="modal-rate" value="5" step="0.1"></div><div class="form-group" id="modal-limit-group" style="display:none"><label>Plafond annuel ($)</label><input type="number" id="modal-limit" value="0"></div><div class="form-group" id="modal-lifelimit-group" style="display:none"><label>Plafond vie ($)</label><input type="number" id="modal-lifelimit" value="0"></div><div class="form-group" id="modal-maxyears-group" style="display:none"><label>Duree max (ans)</label><input type="number" id="modal-maxyears" value="0"></div><input type="hidden" id="modal-type" value="expense"><div class="modal-actions"><button class="btn btn-outline" onclick="closeModal()">Annuler</button><button class="btn btn-primary" onclick="confirmModal()">Ajouter</button></div></div>');
document.body.appendChild(m1);

/* Goal modal */
var m2=document.createElement('div');m2.className='modal-overlay';m2.id='goal-modal-overlay';
m2.insertAdjacentHTML('beforeend','<div class="modal" style="max-width:520px"><h3 id="goal-modal-title">Objectif</h3><div class="form-group"><label>Type</label><select id="goal-modal-type"><option value="maison">Maison</option><option value="auto">Vehicule</option><option value="voyage">Voyage</option><option value="urgence">Urgence</option><option value="retraite">Retraite</option><option value="education">Education</option><option value="dette">Dette</option><option value="autre">Autre</option></select></div><div class="form-group"><label>Nom</label><input type="text" id="goal-modal-name" placeholder="Ex: Condo"></div><div class="form-row"><div class="form-group"><label>Cible ($)</label><input type="number" id="goal-modal-target" min="0"></div><div class="form-group"><label>Epargne ($)</label><input type="number" id="goal-modal-current" min="0"></div></div><div class="form-row"><div class="form-group"><label>Contribution</label><input type="number" id="goal-modal-contrib" min="0"></div><div class="form-group"><label>Frequence</label><select id="goal-modal-freq"><option value="52">Semaine</option><option value="26">2 sem</option><option value="12" selected>Mois</option><option value="1">Annee</option></select></div></div><div class="form-row"><div class="form-group"><label>Rendement (%)</label><input type="number" id="goal-modal-rate" value="0" step="0.1"></div><div class="form-group"><label>Date cible</label><input type="date" id="goal-modal-deadline"></div></div><div class="form-group"><label>Priorite</label><select id="goal-modal-priority"><option value="haute">Haute</option><option value="moyenne" selected>Moyenne</option><option value="basse">Basse</option></select></div><input type="hidden" id="goal-modal-edit-idx" value="-1"><div class="modal-actions"><button class="btn btn-outline" onclick="closeGoalModal()">Annuler</button><button class="btn btn-primary" id="goal-modal-submit" onclick="confirmGoal()">Ajouter</button></div></div>');
document.body.appendChild(m2);

/* Debt modal */
var m3=document.createElement('div');m3.className='modal-overlay';m3.id='debt-modal-overlay';
m3.insertAdjacentHTML('beforeend','<div class="modal"><h3 id="debt-modal-title">Dette</h3><div class="form-group"><label>Nom</label><input type="text" id="debt-modal-name" placeholder="Ex: Visa"></div><div class="form-group"><label>Type</label><select id="debt-modal-type"><option value="credit">Carte credit</option><option value="pret">Pret personnel</option><option value="etudiant">Pret etudiant</option><option value="marge">Marge</option><option value="hypotheque">Hypotheque</option><option value="auto">Pret auto</option><option value="autre">Autre</option></select></div><div class="form-row"><div class="form-group"><label>Solde ($)</label><input type="number" id="debt-modal-balance" min="0"></div><div class="form-group"><label>Taux (%)</label><input type="number" id="debt-modal-rate" step="0.01"></div></div><div class="form-row"><div class="form-group"><label>Paiement min ($/mois)</label><input type="number" id="debt-modal-minpay" min="0"></div><div class="form-group"><label>Paiement actuel ($/mois)</label><input type="number" id="debt-modal-pay" min="0"></div></div><input type="hidden" id="debt-modal-edit-idx" value="-1"><div class="modal-actions"><button class="btn btn-outline" onclick="closeDebtModal()">Annuler</button><button class="btn btn-primary" onclick="confirmDebt()">Ajouter</button></div></div>');
document.body.appendChild(m3);

/* Transaction modal */
var m4=document.createElement('div');m4.className='modal-overlay';m4.id='tx-modal-overlay';
m4.insertAdjacentHTML('beforeend','<div class="modal"><h3>Transaction</h3><div class="form-group"><label>Date</label><input type="date" id="tx-modal-date"></div><div class="form-group"><label>Description</label><input type="text" id="tx-modal-desc" placeholder="Ex: IGA"></div><div class="form-row"><div class="form-group"><label>Montant ($)</label><input type="number" id="tx-modal-amount" step="0.01" min="0"></div><div class="form-group"><label>Type</label><select id="tx-modal-type"><option value="expense">Depense</option><option value="income">Revenu</option></select></div></div><div class="form-group"><label>Categorie</label><select id="tx-modal-cat"><option value="">--</option></select></div><div class="modal-actions"><button class="btn btn-outline" onclick="closeTxModal()">Annuler</button><button class="btn btn-primary" onclick="confirmTx()">Ajouter</button></div></div>');
document.body.appendChild(m4);

/* NW modal */
var m5=document.createElement('div');m5.className='modal-overlay';m5.id='nw-modal-overlay';
m5.insertAdjacentHTML('beforeend','<div class="modal"><h3 id="nw-modal-title">Actif</h3><div class="form-group"><label>Nom</label><input type="text" id="nw-modal-name" placeholder="ex: Compte epargne, Maison, Voiture, CELI..."></div><div class="form-group"><label>Valeur ($)</label><input type="number" id="nw-modal-value" min="0"></div><div class="form-group"><label>Categorie</label><select id="nw-modal-cat"><option value="epargne">Epargne</option><option value="immobilier">Immobilier</option><option value="vehicule">Vehicule</option><option value="placement">Placement (CELI, REER, CELIAPP)</option><option value="crypto">Crypto</option><option value="entreprise">Entreprise</option><option value="objets">Objets de valeur</option><option value="hypotheque">Hypotheque</option><option value="pret">Pret</option><option value="carte-credit">Carte de credit</option><option value="marge">Marge de credit</option><option value="autre">Autre</option></select></div><input type="hidden" id="nw-modal-type" value="asset"><input type="hidden" id="nw-modal-edit-idx" value="-1"><div class="modal-actions"><button class="btn btn-outline" onclick="closeNwModal()">Annuler</button><button class="btn btn-primary" onclick="confirmNwItem()">Ajouter</button></div></div>');
document.body.appendChild(m5);

/* Close on overlay click */
[m1,m2,m3,m4,m5].forEach(function(m){m.onclick=function(e){if(e.target===m)m.classList.remove('active');};});

/* Enter key to submit modals */
function addEnterSubmit(modalId,submitFn){
var modal=document.getElementById(modalId);
if(modal)modal.addEventListener('keydown',function(e){
if(e.key==='Enter'&&document.activeElement.tagName!=='SELECT'&&document.activeElement.tagName!=='TEXTAREA'){e.preventDefault();submitFn();}
});}
addEnterSubmit('modal-overlay',confirmModal);
addEnterSubmit('goal-modal-overlay',confirmGoal);
addEnterSubmit('debt-modal-overlay',confirmDebt);
addEnterSubmit('tx-modal-overlay',confirmTx);
addEnterSubmit('nw-modal-overlay',confirmNwItem);
}

/* ═══════════════════════════════════════════════════
   RENDER ALL
   ═══════════════════════════════════════════════════ */
function renderAll(){refreshProfileDynamicInfo();renderRevenu();renderExpenses();renderInvestments();renderGoals();renderDashboard();renderCharts();renderProjection();renderNetWorth();renderDebts();renderTransactions();renderProfil();renderSimulateurs();save();}
function renderSimulateurs(){try{calcRetraite();}catch(e){}try{calcHyp();}catch(e){}try{calcFIRE();}catch(e){}try{calcEpargne();}catch(e){}}
function recalculate(){updateRevenuDisplays();updateExpTotals();updateInvTotals();updateCatDisplays();renderDashboard();renderCharts();renderProjection();renderGoals();renderNetWorth();renderDebts();save();}

/* Revenue */
function renderRevenu(){var ne=document.getElementById('salary-net'),fe=document.getElementById('salary-frequency'),pe=document.getElementById('province');if(!ne)return;if(document.activeElement!==ne)ne.value=state.salaryNet||'';if(document.activeElement!==fe)fe.value=state.salaryFrequency;if(document.activeElement!==pe)pe.value=state.province||'QC';updateRevenuDisplays();renderExtraIncomes();}
function updateRevenuDisplays(){var an=toAnnual(state.salaryNet,state.salaryFrequency);var el=document.getElementById('annual-net');if(!el)return;el.textContent=fmt(an);document.getElementById('monthly-net').textContent=fmt(an/12);document.getElementById('weekly-net').textContent=fmt(an/52);var ta=getAnnualNet();document.getElementById('extra-income-total').textContent=fmt(ta-an);document.getElementById('total-annual-income').textContent=fmt(ta);document.getElementById('total-monthly-income').textContent=fmt(ta/12);document.getElementById('total-hourly-income').textContent=fmt(ta/2080);}
function renderExtraIncomes(){var list=document.getElementById('extra-income-list');if(!list)return;list.textContent='';state.extraIncomes.forEach(function(inc,i){var row=document.createElement('div');row.className='extra-income-row';var ni=document.createElement('input');ni.type='text';ni.value=inc.name;ni.placeholder='Description';ni.onchange=function(){inc.name=this.value;save();};var ai=document.createElement('input');ai.type='number';ai.value=inc.amount||'';ai.placeholder='Montant';ai.oninput=function(){inc.amount=parseFloat(this.value)||0;debouncedRecalc();};var fs=document.createElement('select');Object.keys(FREQ).forEach(function(k){var o=document.createElement('option');o.value=k;o.textContent=FREQ[k].label;if(inc.frequency===k)o.selected=true;fs.appendChild(o);});fs.onchange=function(){inc.frequency=this.value;debouncedRecalc();};var rb=document.createElement('button');rb.className='remove-btn';rb.textContent='\u2715';rb.onclick=function(){popupConfirm('Supprimer','Supprimer ce revenu?',function(){pushUndo();state.extraIncomes.splice(i,1);renderAll();});};row.appendChild(ni);row.appendChild(ai);row.appendChild(fs);row.appendChild(rb);list.appendChild(row);});}
function addExtraIncome(){pushUndo();state.extraIncomes.push({name:'',amount:0,frequency:'12'});renderAll();}
function setRevenuMode(m,btn){var tabs=btn.parentNode.children;for(var i=0;i<tabs.length;i++)tabs[i].classList.remove('active');btn.classList.add('active');document.getElementById('revenu-net-section').style.display=m==='net'?'':'none';document.getElementById('revenu-brut-section').style.display=m==='brut'?'':'none';}

/* Brut Net */
function calcTaxBrackets(gross,brackets){var tax=0,prev=0;for(var i=0;i<brackets.length;i++){var t=Math.min(gross,brackets[i].max)-prev;if(t>0)tax+=t*brackets[i].rate;prev=brackets[i].max;if(gross<=brackets[i].max)break;}return tax;}
function calcBrutNet(){var gross=parseFloat(document.getElementById('gross-salary').value)||0;var prov=document.getElementById('gross-province').value;var r=document.getElementById('brut-net-results');if(gross<=0){r.textContent='';return;}
var fedTax=calcTaxBrackets(Math.max(gross-FED_BASIC,0),TAX_FED);
var provB=TAX_PROV[prov]||TAX_PROV.QC;
var provTax=calcTaxBrackets(Math.max(gross-(prov==='QC'?QC_BASIC:FED_BASIC),0),provB);
var cpp=prov==='QC'?Math.min(Math.max(gross-3500,0)*0.064,4160):Math.min(Math.max(gross-3500,0)*0.0595,3867);
var ei=prov==='QC'?0:Math.min(gross*0.0166,1049);
var qpip=prov==='QC'?Math.min(gross*0.00494,449):0;
if(prov==='QC')fedTax*=0.835;
var deductions=fedTax+provTax+cpp+ei+qpip;
var net=gross-deductions;
r.textContent='';
var grid=document.createElement('div');grid.className='sim-result';
var items=[['Brut',fmt(gross),''],['Impot federal','-'+fmt(fedTax),'color:var(--danger)'],['Impot provincial','-'+fmt(provTax),'color:var(--danger)'],['Cotisations','-'+fmt(cpp+ei+qpip),'color:var(--warning)'],['Net annuel',fmt(net),'color:var(--success)'],['Net mensuel',fmt(net/12),'color:var(--success)'],['Taux effectif',fmtP(pct(deductions,gross)),'color:var(--accent)']];
var g=document.createElement('div');g.className='sim-result-grid';
items.forEach(function(item){var d=document.createElement('div');d.className='sim-result-item';var l=document.createElement('div');l.className='sim-result-label';l.textContent=item[0];var v=document.createElement('div');v.className='sim-result-value';v.textContent=item[1];if(item[2])v.style.cssText=item[2];d.appendChild(l);d.appendChild(v);g.appendChild(d);});
grid.appendChild(g);r.appendChild(grid);r.dataset.net=net;}
function applyBrutNet(){var r=document.getElementById('brut-net-results');var net=parseFloat(r.dataset.net)||0;if(net<=0)return;pushUndo();state.salaryNet=Math.round(net/12*100)/100;state.salaryFrequency='12';state.province=document.getElementById('gross-province').value;renderAll();popupAlert('Applique','Salaire net de '+fmt(net/12)+'/mois applique.');}

/* Categories */
function buildRow(cat,i,type){var a=catAnnual(cat),m=a/12;var row=document.createElement('div');row.className='category-row';
/* Drag & drop */
row.draggable=true;row.dataset.dragType=type;row.dataset.dragIdx=i;
row.addEventListener('dragstart',function(e){e.dataTransfer.setData('text/plain',type+':'+i);row.style.opacity='0.4';});
row.addEventListener('dragend',function(){row.style.opacity='1';});
row.addEventListener('dragover',function(e){e.preventDefault();row.style.borderTop='2px solid var(--accent)';});
row.addEventListener('dragleave',function(){row.style.borderTop='';});
row.addEventListener('drop',function(e){e.preventDefault();row.style.borderTop='';
var data=e.dataTransfer.getData('text/plain').split(':');var fromType=data[0],fromIdx=parseInt(data[1]);
if(fromType!==type)return;var toIdx=parseInt(row.dataset.dragIdx);if(fromIdx===toIdx)return;
pushUndo();var list=type==='expense'?state.expenses:state.investments;
var item=list.splice(fromIdx,1)[0];list.splice(toIdx>fromIdx?toIdx-1:toIdx,0,item);renderAll();
});
var nd=document.createElement('div');nd.className='category-name';nd.appendChild(document.createTextNode(cat.name));
if(cat.desc){var sm=document.createElement('small');sm.textContent=cat.desc;nd.appendChild(sm);}
if(type==='investment'){var info=document.createElement('div');info.className='placement-info';
if(cat.limit>0){var t=document.createElement('span');t.className='info-tag';t.textContent='Plafond: '+fmt(cat.limit)+'/an';info.appendChild(t);}
if(cat.lifetimeLimit>0){var t2=document.createElement('span');t2.className='info-tag';t2.textContent='Max vie: '+fmtS(cat.lifetimeLimit);info.appendChild(t2);}
if(cat.rate){var t3=document.createElement('span');t3.className='info-tag';t3.textContent='Rend: '+cat.rate+'%';info.appendChild(t3);}
if(cat.limit>0&&a>cat.limit){var t4=document.createElement('span');t4.className='info-tag';t4.style.cssText='background:var(--danger-light);color:var(--danger)';t4.textContent='Depasse!';info.appendChild(t4);}
if(cat.name==='REEE'&&a>0){var sc=document.createElement('span');sc.className='info-tag';sc.style.cssText='background:var(--success-light);color:var(--success)';sc.textContent='SCEE: +'+fmt(Math.min(Math.min(a,cat.limit||2500)*0.2,500))+'/an';info.appendChild(sc);}
nd.appendChild(info);}
row.appendChild(nd);
var iw=document.createElement('div');iw.className='input-with-toggle';
var ai=document.createElement('input');ai.type='number';ai.value=cat.amount||'';ai.placeholder='0';ai.step='0.01';ai.min='0';ai.dataset.type=type;ai.dataset.idx=i;ai.oninput=function(){var l=this.dataset.type==='expense'?state.expenses:state.investments;l[parseInt(this.dataset.idx)].amount=parseFloat(this.value)||0;debouncedRecalc();};
var tb=document.createElement('button');tb.className='toggle-btn'+(cat.isPercent?' is-percent':'');tb.textContent=cat.isPercent?'%':'$';tb.dataset.type=type;tb.dataset.idx=i;tb.onclick=function(){var l=this.dataset.type==='expense'?state.expenses:state.investments;var c=l[parseInt(this.dataset.idx)];pushUndo();c.isPercent=!c.isPercent;if(c.isPercent){c._pf=c.frequency;c.frequency='1';}else if(c._pf){c.frequency=c._pf;delete c._pf;}renderAll();};
iw.appendChild(ai);iw.appendChild(tb);row.appendChild(iw);
var fs=document.createElement('select');fs.dataset.type=type;fs.dataset.idx=i;if(cat.isPercent){fs.disabled=true;fs.style.opacity='0.4';}
Object.keys(FREQ).forEach(function(k){var o=document.createElement('option');o.value=k;o.textContent=FREQ[k].label;if(cat.frequency===k)o.selected=true;fs.appendChild(o);});
fs.onchange=function(){var l=this.dataset.type==='expense'?state.expenses:state.investments;l[parseInt(this.dataset.idx)].frequency=this.value;debouncedRecalc();};
row.appendChild(fs);
var ad=document.createElement('div');ad.className='category-annual';ad.appendChild(document.createTextNode(fmtS(a)+'/an'));ad.appendChild(document.createElement('br'));var ms=document.createElement('small');ms.textContent=fmtS(m)+'/mois';ad.appendChild(ms);
row.appendChild(ad);
var rb=document.createElement('button');rb.className='remove-btn';rb.textContent='\u2715';
(function(t2,i2,n){rb.onclick=function(){popupConfirm('Supprimer','Supprimer "'+n+'"?',function(){pushUndo();(t2==='expense'?state.expenses:state.investments).splice(i2,1);renderAll();});};})(type,i,cat.name);
row.appendChild(rb);return row;}

var openGroups={};
function toggleGroup(t,g){var k=t+':'+g;openGroups[k]=!openGroups[k];document.querySelectorAll('.category-group[data-group="'+g+'"][data-type="'+t+'"]').forEach(function(el){el.classList.toggle('collapsed',!openGroups[k]);});}
function renderCatList(items,cid,type){var c=document.getElementById(cid);if(!c)return;c.textContent='';var cg=null,gd=null;
items.forEach(function(cat,i){var gn=cat.group||'';if(gn&&gn!==cg){cg=gn;var isOpen=openGroups[type+':'+gn];var w=document.createElement('div');w.className='category-group'+(isOpen?'':' collapsed');w.dataset.group=gn;w.dataset.type=type;var h=document.createElement('div');h.className='category-group-header';(function(t,g){h.onclick=function(){toggleGroup(t,g);};})(type,gn);var arrow=document.createElement('span');arrow.className='group-arrow';arrow.textContent='\u25BC';var ht=document.createElement('span');ht.className='group-title';ht.appendChild(arrow);ht.appendChild(document.createTextNode(' '+gn));h.appendChild(ht);var gt=document.createElement('span');gt.className='group-total';gt.dataset.group=gn;gt.dataset.type=type;h.appendChild(gt);w.appendChild(h);gd=document.createElement('div');gd.className='category-group-items';w.appendChild(gd);c.appendChild(w);}
var row=buildRow(cat,i,type);if(gd&&gn)gd.appendChild(row);else{c.appendChild(row);gd=null;cg=null;}});
updateGroupTotals(items,type);}
function updateGroupTotals(items,type){var g={};items.forEach(function(c){var gn=c.group||'';if(gn){if(!g[gn])g[gn]=0;g[gn]+=catAnnual(c);}});document.querySelectorAll('.group-total[data-type="'+type+'"]').forEach(function(el){el.textContent=fmtS(g[el.dataset.group]||0)+'/an';});}
function renderExpenses(){renderCatList(state.expenses,'expense-list','expense');updateExpTotals();}
function renderInvestments(){renderCatList(state.investments,'investment-list','investment');updateInvTotals();}
function updateExpTotals(){var t=totalExp();var el=document.getElementById('total-expenses-annual');if(el){el.textContent=fmt(t);document.getElementById('total-expenses-monthly').textContent=fmt(t/12);}}
function updateInvTotals(){var t=totalInv();var el=document.getElementById('total-investments-annual');if(el){el.textContent=fmt(t);document.getElementById('total-investments-monthly').textContent=fmt(t/12);}}
function updateCatDisplays(){document.querySelectorAll('.category-row').forEach(function(row){var ad=row.querySelector('.category-annual'),inp=row.querySelector('input[type="number"]');if(!ad||!inp)return;var t=inp.dataset.type,i=parseInt(inp.dataset.idx);var l=t==='expense'?state.expenses:state.investments;if(!l[i])return;var a=catAnnual(l[i]);ad.textContent='';ad.appendChild(document.createTextNode(fmtS(a)+'/an'));ad.appendChild(document.createElement('br'));var s=document.createElement('small');s.textContent=fmtS(a/12)+'/mois';ad.appendChild(s);});updateGroupTotals(state.expenses,'expense');updateGroupTotals(state.investments,'investment');}

/* Dashboard */
function renderDashboard(){var el=document.getElementById('stat-revenu');if(!el)return;
var an=getAnnualNet(),ea=totalExp(),ia=totalInv(),ra=an-ea-ia;
var d=state.dashboardView==='mensuel'?12:1,sf=state.dashboardView==='mensuel'?'par mois':'par annee';
el.textContent=fmt(an/d);document.getElementById('stat-revenu-sub').textContent=sf;
document.getElementById('stat-depenses').textContent=fmt(ea/d);document.getElementById('stat-depenses-pct').textContent=fmtP(pct(ea,an))+' du revenu';
document.getElementById('stat-placements').textContent=fmt(ia/d);document.getElementById('stat-placements-pct').textContent=fmtP(pct(ia,an))+' du revenu';
document.getElementById('stat-reste').textContent=fmt(ra/d);document.getElementById('stat-reste').className='stat-value '+(ra>=0?'positive':'negative');
document.getElementById('stat-reste-pct').textContent=fmtP(pct(Math.abs(ra),an))+' du revenu';
var nw=totalNWA()-totalNWL();document.getElementById('stat-networth').textContent=fmtS(nw);
var sr=pct(ia,an);document.getElementById('stat-savings-rate').textContent=fmtP(sr);
/* Ratio dettes = paiements de la section Dettes + depenses du groupe "Dettes" */
var debtFromExpenses=0;state.expenses.forEach(function(e){if(e.group==='Dettes')debtFromExpenses+=catAnnual(e);});
var dr=pct(totalDebtPay()*12+debtFromExpenses,an);
document.getElementById('stat-debt-ratio').textContent=fmtP(dr);document.getElementById('stat-debt-ratio').className='stat-value '+(dr<=36?'positive':dr<=50?'warning':'negative');
var fireT=ea>0?ea/0.04:0;var fireP=fireT>0?pct(nw,fireT):0;
document.getElementById('stat-fire-pct').textContent=fmtP(Math.min(fireP,100));document.getElementById('stat-fire-sub').textContent=fireT>0?'Cible: '+fmtS(fireT):'--';
var ep=Math.min(pct(ea,an),100),ip=Math.min(pct(ia,an),100-ep),rp=Math.max(100-ep-ip,0);
document.getElementById('bar-expenses').style.width=ep+'%';document.getElementById('bar-investments').style.width=ip+'%';document.getElementById('bar-remaining').style.width=rp+'%';
document.getElementById('progress-used').textContent=fmtP(ep+ip)+' utilise';document.getElementById('progress-free').textContent=fmtP(rp)+' disponible';
document.getElementById('legend-exp-pct').textContent=fmtP(ep);document.getElementById('legend-inv-pct').textContent=fmtP(ip);document.getElementById('legend-rem-pct').textContent=fmtP(rp);
var tp=pct(ea+ia,an);setAlert('alert-over-budget',an>0&&tp>100);setAlert('alert-near-budget',an>0&&tp>90&&tp<=100);
var needs=0,wants=0;state.expenses.forEach(function(e){var v=catAnnual(e),g=e.group||'';if(NEEDS_GROUPS.indexOf(g)>=0)needs+=v;else wants+=v;});
var np=pct(needs,an),wp=pct(wants,an),sp=pct(ia,an);
document.getElementById('rule-besoins-pct').textContent=np.toFixed(0)+'%';document.getElementById('rule-envies-pct').textContent=wp.toFixed(0)+'%';document.getElementById('rule-epargne-pct').textContent=sp.toFixed(0)+'%';
document.getElementById('rule-besoins-amt').textContent=fmt(needs/12)+'/mois';document.getElementById('rule-envies-amt').textContent=fmt(wants/12)+'/mois';document.getElementById('rule-epargne-amt').textContent=fmt(ia/12)+'/mois';
setRuleClass('rule-besoins',np,50,true);setRuleClass('rule-envies',wp,30,true);setRuleClass('rule-epargne',sp,20,false);
var ef=document.getElementById('emergency-fund');if(document.activeElement!==ef)ef.value=state.emergencyFund||'';
var me=ea/12,months=me>0?state.emergencyFund/me:0;
document.getElementById('emergency-months').textContent=months.toFixed(1);document.getElementById('emergency-monthly-exp').textContent=fmt(me);
document.getElementById('emergency-3m').textContent=fmt(me*3);document.getElementById('emergency-6m').textContent=fmt(me*6);
document.getElementById('emergency-card').style.borderColor=months>=6?'var(--success)':months>=3?'var(--warning)':'var(--danger)';
renderHealthScore(an,ea,ia,ra,needs,wants,months,dr,sp);renderReport();}

function renderHealthScore(an,ea,ia,ra,needs,wants,efMo,dr,sr){
var scores=[{l:'Epargne',s:Math.min(sr/20*100,100),w:25},{l:'Fonds urgence',s:Math.min(efMo/6*100,100),w:20},{l:'Dettes',s:dr<=0?100:dr<=20?90:dr<=36?60:dr<=50?30:0,w:20},{l:'Budget eq.',s:((pct(needs,an)<=50?100:pct(needs,an)<=65?60:20)+(pct(wants,an)<=30?100:pct(wants,an)<=45?60:20))/2,w:15},{l:'Surplus',s:ra>=0?Math.min(pct(ra,an)/10*100,100):0,w:10},{l:'Patrimoine',s:totalNWA()-totalNWL()>0?100:50,w:10}];
var total=0;scores.forEach(function(s){total+=s.s*s.w/100;});
var fs=Math.round(an>0?total:0);
var color=fs>=80?'var(--success)':fs>=60?'var(--accent)':fs>=40?'var(--warning)':'var(--danger)';
/* Raw color for SVG stroke (CSS vars don't work in SVG stroke) */
var rawColor=fs>=80?'#059669':fs>=60?'#2563eb':fs>=40?'#d97706':'#dc2626';
if(document.documentElement.getAttribute('data-theme')==='dark')rawColor=fs>=80?'#10b981':fs>=60?'#3b82f6':fs>=40?'#f59e0b':'#ef4444';
/* SVG ring: circumference = 2 * PI * 52 = 326.73 */
var circumference=326.73;
var ringFg=document.getElementById('health-ring-fg');
if(ringFg){
var offset=circumference-(fs/100)*circumference;
ringFg.style.strokeDashoffset=an>0?offset:circumference;
ringFg.style.stroke=rawColor;
}
document.getElementById('health-score-val').textContent=an>0?fs:'--';document.getElementById('health-score-val').style.color=color;
document.getElementById('health-score-label').textContent=an>0?(fs>=80?'Excellent':fs>=60?'Bon':fs>=40?'A ameliorer':'Critique'):'--';
document.getElementById('health-score-desc').textContent=an>0?'Score de sante financiere':'Entrez vos donnees';
var bd=document.getElementById('health-breakdown');bd.textContent='';
scores.forEach(function(sc){var c=sc.s>=80?'var(--success)':sc.s>=60?'var(--accent)':sc.s>=40?'var(--warning)':'var(--danger)';
var d=document.createElement('div');d.className='health-item';
var l=document.createElement('div');l.className='health-item-label';l.textContent=sc.l;d.appendChild(l);
var bar=document.createElement('div');bar.className='health-item-bar';var fill=document.createElement('div');fill.className='health-item-fill';fill.style.width=sc.s+'%';fill.style.background=c;bar.appendChild(fill);d.appendChild(bar);
var sv=document.createElement('div');sv.className='health-item-score';sv.textContent=Math.round(sc.s)+'/100';sv.style.color=c;d.appendChild(sv);
bd.appendChild(d);});}

function renderReport(){var c=document.getElementById('report-content');if(!c)return;c.textContent='';
var an=getAnnualNet(),ea=totalExp(),ia=totalInv(),ra=an-ea-ia;
if(an<=0){addReport(c,'info','?','Entrez votre revenu','Section Revenus pour commencer.');return;}
var ipct=pct(ia,an),me=ea/12,mi=ia/12,mr=ra/12;
var groups={};state.expenses.forEach(function(e){var g=e.group||'Autre',v=catAnnual(e);if(!groups[g])groups[g]=0;groups[g]+=v;});
var needs=0,wants=0;for(var g in groups){if(NEEDS_GROUPS.indexOf(g)>=0)needs+=groups[g];else wants+=groups[g];}
if(ipct>=20)addReport(c,'positive','+','Excellent epargne ('+ipct.toFixed(0)+'%)','Au-dessus de 20% recommande.');
else if(ipct>=15)addReport(c,'positive','+','Bon epargne ('+ipct.toFixed(0)+'%)','Il manque '+fmt((an*0.2-ia)/12)+'/mois pour 20%.');
if(pct(needs,an)<=50&&needs>0)addReport(c,'positive','+','Besoins maitrises','Sous 50%.');
if(ra>0&&pct(ra,an)>=10)addReport(c,'positive','+','Bonne marge',fmt(mr)+'/mois disponible.');
var ef=state.emergencyFund||0;if(me>0&&ef>=me*6)addReport(c,'positive','+','Fonds urgence solide',(ef/me).toFixed(1)+' mois.');
if(ipct<20&&ipct>=5)addReport(c,'warning','!','Epargne sous cible','+'+ fmt((an*0.2-ia)/12)+'/mois pour 20%.');
if(me>0&&ef===0)addReport(c,'warning','!','Pas de fonds urgence','Visez '+fmt(me*3)+' a '+fmt(me*6)+'.');
if(groups['Logement']&&pct(groups['Logement'],an)>30)addReport(c,'warning','!','Logement eleve',pct(groups['Logement'],an).toFixed(0)+'% du revenu.');
if(ra<0)addReport(c,'negative','X','Budget deficitaire','Depassement de '+fmt(Math.abs(ra)/12)+'/mois.');
if(ipct<5&&an>0)addReport(c,'negative','X','Epargne critique','Moins de 5%.');
var sorted=[];for(var gk in groups)if(groups[gk]>0)sorted.push({n:gk,v:groups[gk]});sorted.sort(function(a,b){return b.v-a.v;});
if(sorted.length)addReport(c,'info','i','Top depense: '+sorted[0].n,fmt(sorted[0].v/12)+'/mois ('+pct(sorted[0].v,an).toFixed(0)+'%).');
if(ia>0){var t10=0;state.investments.forEach(function(inv){var a=catAnnual(inv),r=(inv.rate||0)/100,acc=0;for(var y=1;y<=10;y++)acc=acc*(1+r)+a;t10+=acc;});addReport(c,'info','i','Projection 10 ans','~'+fmtS(t10));}
/* ── Conseils personnalises selon le profil ── */
var prof=state.profile||{};
if(prof.setupComplete){
var age=getProfileAge();
/* Conseils selon l'objectif */
var pG2=prof.goals||[prof.mainGoal||'epargne'];function hasG(g){return pG2.indexOf(g)!==-1;}
if(hasG('maison')&&prof.housing==='locataire'){
var celiapp=0;state.investments.forEach(function(inv){if(inv.name==='CELIAPP')celiapp=catAnnual(inv);});
if(celiapp===0)addReport(c,'info','i','CELIAPP pour votre mise de fonds','Vous visez l\'achat d\'une propriete. Le CELIAPP offre une deduction fiscale ET des retraits non imposes pour l\'achat. Max 8 000$/an, 40 000$ a vie.');
else addReport(c,'positive','+','CELIAPP actif','Excellente decision pour votre objectif immobilier.');
}
if(hasG('dette')&&totalDebtBal()>0){
addReport(c,'info','i','Focus dette',totalDebtBal()>0?'Consultez la section Dettes pour voir l\'analyse Rembourser vs Investir. Priorisez les dettes a taux eleve.':'Aucune dette enregistree — ajoutez vos dettes dans la section dediee.');
}
if(hasG('retraite')&&age){
var yrsToRetire=65-age;
if(yrsToRetire>0){addReport(c,'info','i','Retraite dans '+yrsToRetire+' ans','Consultez le simulateur Retraite pour verifier si vous etes en bonne voie. A '+age+' ans, chaque annee d\'epargne compte enormement grace a l\'interet compose.');}
}
if(hasG('fire')){
var fireNum=ea>0?ea/0.04:0;var fireP=fireNum>0?pct(totalNWA()-totalNWL(),fireNum):0;
addReport(c,'info','i','Chemin FIRE: '+fmtP(Math.min(fireP,100)),'Cible: '+fmtS(fireNum)+' (25x depenses annuelles). Maximisez votre taux d\'epargne — c\'est le facteur #1.');
}
/* Conseils selon l'age */
if(age&&age<25){addReport(c,'info','i','Avantage jeunesse','A '+age+' ans, l\'interet compose est votre meilleur ami. Meme 100$/mois investi a 7% = '+fmtS(100*12*((Math.pow(1.07,40)-1)/0.07))+' a 65 ans.');}
if(age&&age>=50&&age<65){addReport(c,'info','i','Derniere ligne droite','A '+age+' ans, maximisez REER pour reduire l\'impot et CELI pour les retraits non imposes. Verifiez votre admissibilite a la RRQ des 60 ans.');}
/* Conseils selon la situation */
if(prof.situation==='famille'&&prof.children>0){
var reee=0;state.investments.forEach(function(inv){if(inv.name==='REEE')reee=catAnnual(inv);});
if(reee===0)addReport(c,'warning','!','REEE non active','Vous avez '+prof.children+' enfant(s). Le REEE offre 20% de subvention gouvernementale (SCEE). C\'est de l\'argent gratuit — max 500$/an/enfant.');
}
/* Conseils selon l'emploi */
if(prof.employment==='autonome'&&ipct<25){
addReport(c,'warning','!','Epargne autonome','En tant que travailleur autonome, visez 25-30% d\'epargne (pas de fonds de pension employeur). Pensez aux acomptes provisionnels.');
}
if(prof.employment==='etudiant'){
addReport(c,'info','i','Conseil etudiant','Meme un petit montant epargne maintenant a un impact enorme. Priorite: fonds urgence 1-2 mois, puis rembourser les dettes a taux eleve apres les etudes.');
}
}
}
function addReport(c,type,icon,title,text){var d=document.createElement('div');d.className='report-item report-'+type;var ic=document.createElement('div');ic.className='report-icon';ic.textContent=icon;d.appendChild(ic);var tx=document.createElement('div');tx.className='report-text';var t=document.createElement('strong');t.textContent=title;tx.appendChild(t);tx.appendChild(document.createTextNode(' '+text));d.appendChild(tx);c.appendChild(d);}
function setAlert(id,show){var el=document.getElementById(id);if(el){if(show)el.classList.remove('alert-hidden');else el.classList.add('alert-hidden');}}
function setRuleClass(id,val,target,lower){var el=document.getElementById(id);if(!el)return;var ok=lower?val<=target:val>=target;var warn=lower?val<=target*1.2:val>=target*0.7;el.className='rule-card '+(ok?'good':warn?'warn':'bad');}
function setDashboardView(v,btn){state.dashboardView=v;var tabs=document.querySelectorAll('#section-dashboard .view-tab');tabs.forEach(function(t){t.classList.remove('active');});btn.classList.add('active');renderDashboard();save();}

/* Goals */
var GOAL_TYPES={maison:{l:'Maison'},auto:{l:'Vehicule'},voyage:{l:'Voyage'},urgence:{l:'Urgence'},retraite:{l:'Retraite'},education:{l:'Education'},dette:{l:'Dette'},autre:{l:'Autre'}};
function renderGoals(){var c=document.getElementById('goals-list');if(!c)return;c.textContent='';
document.getElementById('goals-empty').style.display=state.goals.length?'none':'block';document.getElementById('goals-summary').style.display=state.goals.length?'':'none';
var tS=0,tT=0;state.goals.forEach(function(g){tS+=g.current||0;tT+=g.target||0;});
document.getElementById('goals-count').textContent=state.goals.length;document.getElementById('goals-total-saved').textContent=fmt(tS);document.getElementById('goals-total-target').textContent=fmt(tT);document.getElementById('goals-overall-pct').textContent=(tT>0?(tS/tT*100).toFixed(1):0)+'%';
state.goals.forEach(function(g,i){var pD=g.target>0?Math.min(g.current/g.target*100,100):0;var rem=Math.max(g.target-g.current,0);var mC=toAnnual(g.contrib||0,g.freq||'12')/12;var rate=(g.rate||0)/100;var color=pD>=100?'var(--success)':pD>=50?'var(--accent)':'var(--warning)';
var mL=0;if(rem>0&&mC>0){if(rate>0){var mr=rate/12,cur=g.current;for(var m=1;m<=600;m++){cur=cur*(1+mr)+mC;if(cur>=g.target){mL=m;break;}}if(!mL)mL=999;}else mL=Math.ceil(rem/mC);}
var projDate='';if(mL>0&&mL<999){var pd=new Date();pd.setMonth(pd.getMonth()+mL);projDate=pd.toLocaleDateString('fr-CA',{month:'long',year:'numeric'});}
var gt=GOAL_TYPES[g.type]||GOAL_TYPES.autre;
var row=document.createElement('div');row.className='goal-row';
/* Header */
var hd=document.createElement('div');hd.className='goal-header';
var left=document.createElement('div');left.style.cssText='display:flex;align-items:center;gap:8px;flex-wrap:wrap';
var badge=document.createElement('span');badge.className='goal-type-badge goal-priority-'+g.priority;badge.textContent=gt.l;left.appendChild(badge);
var nm=document.createElement('span');nm.className='goal-name';nm.textContent=g.name||gt.l;left.appendChild(nm);hd.appendChild(left);
var acts=document.createElement('div');acts.style.cssText='display:flex;gap:4px';
var eb=document.createElement('button');eb.className='goal-edit-btn';eb.textContent='\u270E';(function(idx){eb.onclick=function(){openGoalModal(idx);};})(i);acts.appendChild(eb);
var del=document.createElement('button');del.className='remove-btn';del.style.cssText='width:28px;height:28px;font-size:12px';del.textContent='\u2715';(function(idx){del.onclick=function(){popupConfirm('Supprimer','Supprimer?',function(){pushUndo();state.goals.splice(idx,1);renderAll();});};})(i);acts.appendChild(del);hd.appendChild(acts);row.appendChild(hd);
/* Progress */
var pv=document.createElement('div');pv.style.cssText='display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin:8px 0 4px';
var pvl=document.createElement('span');pvl.textContent=fmt(g.current);pvl.style.color=color;pv.appendChild(pvl);
var pvr=document.createElement('span');pvr.textContent=fmt(g.target);pvr.style.color='var(--text-muted)';pv.appendChild(pvr);row.appendChild(pv);
var bar=document.createElement('div');bar.className='goal-bar';var fill=document.createElement('div');fill.className='goal-fill';fill.style.width=pD+'%';fill.style.background=color;bar.appendChild(fill);row.appendChild(bar);
var ft=document.createElement('div');ft.className='goal-footer';
var fl=document.createElement('span');fl.style.fontWeight='600';fl.textContent=pD.toFixed(1)+'% atteint';ft.appendChild(fl);
var fr=document.createElement('span');fr.textContent=pD>=100?'Atteint!':fmt(rem)+' restant';ft.appendChild(fr);row.appendChild(ft);
/* Details */
var det=document.createElement('div');det.className='goal-details';
addDetail(det,'Contribution',fmt(mC)+'/mois');
if(g.rate>0)addDetail(det,'Rendement',g.rate+'%');
if(mL>0&&mL<999)addDetail(det,'Temps',Math.floor(mL/12)+'a '+mL%12+'m');
if(projDate)addDetail(det,'Atteint',projDate);
/* Extra detail cards: Total projete & Interet gagne */
if(mL>0&&mL<999&&mC>0){var mr2=rate/12;var totalProj=g.current;for(var mm=0;mm<mL;mm++){totalProj=totalProj*(1+mr2)+mC;}var interetGagne=totalProj-g.current-(mC*mL);addDetail(det,'Total projete',fmtS(totalProj));addDetail(det,'Interet gagne',fmtS(interetGagne),'var(--success)');}
row.appendChild(det);
/* Retirement-specific panel */
if(g.type==='retraite'){(function(idx){
var rp=document.createElement('div');rp.className='goal-retire-panel';rp.style.cssText='background:var(--bg-tertiary);border-radius:var(--radius);padding:16px;margin-top:12px';
var rpTitle=document.createElement('div');rpTitle.style.cssText='font-weight:700;font-size:14px;margin-bottom:12px';rpTitle.textContent='Planification retraite';rp.appendChild(rpTitle);
var rpGrid=document.createElement('div');rpGrid.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:13px';
/* Editable: Age de retraite */
var raDiv=document.createElement('div');var raLbl=document.createElement('div');raLbl.style.cssText='color:var(--text-muted);margin-bottom:4px';raLbl.textContent='Age de retraite';raDiv.appendChild(raLbl);
var raInp=document.createElement('input');raInp.type='number';raInp.value=state.goals[idx].retireAge||65;raInp.min='50';raInp.max='80';raInp.style.cssText='padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg-primary);color:var(--text-primary);font-size:13px;width:80px;font-weight:600';
raInp.oninput=function(){state.goals[idx].retireAge=parseInt(this.value)||65;debouncedRecalc();};raDiv.appendChild(raInp);rpGrid.appendChild(raDiv);
/* Editable: Revenu mensuel souhaite */
var riDiv=document.createElement('div');var riLbl=document.createElement('div');riLbl.style.cssText='color:var(--text-muted);margin-bottom:4px';riLbl.textContent='Revenu mensuel souhaite';riDiv.appendChild(riLbl);
var riInp=document.createElement('input');riInp.type='number';riInp.value=state.goals[idx].retireIncome||3000;riInp.step='100';riInp.min='0';riInp.style.cssText='padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg-primary);color:var(--text-primary);font-size:13px;width:120px;font-weight:600';
riInp.oninput=function(){state.goals[idx].retireIncome=parseFloat(this.value)||3000;debouncedRecalc();};riDiv.appendChild(riInp);riDiv.appendChild(document.createTextNode(' $/mois'));rpGrid.appendChild(riDiv);
/* Calculated retirement values */
var retireAge=state.goals[idx].retireAge||65;var retireIncome=state.goals[idx].retireIncome||3000;
var capitalNeeded=retireIncome*12/0.04;var manque=Math.max(capitalNeeded-g.current,0);
var curAge=getProfileAge()||30;var anneesRest=Math.max(retireAge-curAge,1);
var moisRest=anneesRest*12;var mrRet=rate/12;var contribReq=0;
if(mrRet>0){contribReq=(capitalNeeded-g.current*Math.pow(1+mrRet,moisRest))*mrRet/(Math.pow(1+mrRet,moisRest)-1);}else{contribReq=manque/moisRest;}
if(contribReq<0)contribReq=0;
var calcItems=[['Capital necessaire',fmt(capitalNeeded)],['Manque',fmt(manque)],['Contribution requise',fmt(Math.ceil(contribReq))+'/mois'],['Annees restantes',anneesRest+' ans']];
calcItems.forEach(function(item){var cd=document.createElement('div');var cl=document.createElement('div');cl.style.cssText='color:var(--text-muted);margin-bottom:4px';cl.textContent=item[0];cd.appendChild(cl);var cv=document.createElement('div');cv.style.cssText='font-weight:600';cv.textContent=item[1];cd.appendChild(cv);rpGrid.appendChild(cd);});
rp.appendChild(rpGrid);row.appendChild(rp);
})(i);}
/* FIRE-specific panel */
if(g.name&&g.name.toUpperCase().indexOf('FIRE')!==-1){(function(idx){
var fp=document.createElement('div');fp.className='goal-fire-panel';fp.style.cssText='background:var(--bg-tertiary);border-radius:var(--radius);padding:16px;margin-top:12px';
var fpTitle=document.createElement('div');fpTitle.style.cssText='font-weight:700;font-size:14px;margin-bottom:12px';fpTitle.textContent='Indicateurs FIRE';fp.appendChild(fpTitle);
var fpGrid=document.createElement('div');fpGrid.style.cssText='display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;font-size:13px';
var annualExpenses=0;if(state.expenses){state.expenses.forEach(function(e){annualExpenses+=toAnnual(e.amount||0,e.freq||'12');});}
var fireNumber=annualExpenses>0?annualExpenses/0.04:0;
var fireItems=[];
fireItems.push(['Nombre FIRE',fireNumber>0?fmtS(fireNumber):'--']);
var annualIncome=0;if(state.incomes){state.incomes.forEach(function(inc){annualIncome+=toAnnual(inc.amount||0,inc.freq||'12');});}
var tauxEpargne=annualIncome>0?((annualIncome-annualExpenses)/annualIncome*100).toFixed(1)+'%':'--';
fireItems.push(['Taux d\'epargne',tauxEpargne]);
var fireProg=fireNumber>0?(g.current/fireNumber*100).toFixed(1)+'%':'--';
fireItems.push(['Progression',fireProg]);
fireItems.forEach(function(item){var fd=document.createElement('div');var fl2=document.createElement('div');fl2.style.cssText='color:var(--text-muted);margin-bottom:4px';fl2.textContent=item[0];fd.appendChild(fl2);var fv=document.createElement('div');fv.style.cssText='font-weight:600';fv.textContent=item[1];fd.appendChild(fv);fpGrid.appendChild(fd);});
fp.appendChild(fpGrid);row.appendChild(fp);
})(i);}
/* Editable amount */
var ed=document.createElement('div');ed.style.cssText='display:flex;gap:10px;margin-top:12px;align-items:center;font-size:12px;padding-top:10px;border-top:1px solid var(--border)';
var lb=document.createElement('span');lb.textContent='Deja accumule:';lb.style.cssText='color:var(--text-muted)';ed.appendChild(lb);
var ci=document.createElement('input');ci.type='number';ci.value=g.current||'';ci.step='100';ci.min='0';ci.style.cssText='padding:8px;border:1px solid var(--border);border-radius:6px;background:var(--bg-primary);color:var(--text-primary);font-size:14px;width:140px;font-weight:700';
(function(idx){ci.oninput=function(){state.goals[idx].current=parseFloat(this.value)||0;debouncedRecalc();};})(i);
ed.appendChild(ci);ed.appendChild(document.createTextNode(' $'));row.appendChild(ed);
c.appendChild(row);});}
function addDetail(c,l,v,col){var d=document.createElement('div');d.className='goal-detail';var lb=document.createElement('div');lb.className='goal-detail-label';lb.textContent=l;d.appendChild(lb);var vl=document.createElement('div');vl.className='goal-detail-value';vl.textContent=v;if(col)vl.style.color=col;d.appendChild(vl);c.appendChild(d);}
function openGoalModal(idx){var isEdit=typeof idx==='number'&&idx>=0;document.getElementById('goal-modal-title').textContent=isEdit?'Modifier':'Objectif';document.getElementById('goal-modal-submit').textContent=isEdit?'Sauver':'Ajouter';document.getElementById('goal-modal-edit-idx').value=isEdit?idx:-1;
if(isEdit){var g=state.goals[idx];document.getElementById('goal-modal-type').value=g.type||'autre';document.getElementById('goal-modal-name').value=g.name||'';document.getElementById('goal-modal-target').value=g.target||'';document.getElementById('goal-modal-current').value=g.current||'';document.getElementById('goal-modal-contrib').value=g.contrib||'';document.getElementById('goal-modal-freq').value=g.freq||'12';document.getElementById('goal-modal-rate').value=g.rate||0;document.getElementById('goal-modal-deadline').value=g.deadline||'';document.getElementById('goal-modal-priority').value=g.priority||'moyenne';}else{['goal-modal-name','goal-modal-target','goal-modal-current','goal-modal-contrib','goal-modal-deadline'].forEach(function(id){document.getElementById(id).value='';});document.getElementById('goal-modal-rate').value='0';document.getElementById('goal-modal-priority').value='moyenne';}
document.getElementById('goal-modal-overlay').classList.add('active');document.getElementById('goal-modal-name').focus();}
function closeGoalModal(){document.getElementById('goal-modal-overlay').classList.remove('active');}
function confirmGoal(){pushUndo();var type=document.getElementById('goal-modal-type').value;var obj={id:gid('g'),type:type,name:document.getElementById('goal-modal-name').value.trim()||(GOAL_TYPES[type]||{l:'Autre'}).l,target:parseFloat(document.getElementById('goal-modal-target').value)||0,current:parseFloat(document.getElementById('goal-modal-current').value)||0,contrib:parseFloat(document.getElementById('goal-modal-contrib').value)||0,freq:document.getElementById('goal-modal-freq').value,rate:parseFloat(document.getElementById('goal-modal-rate').value)||0,deadline:document.getElementById('goal-modal-deadline').value||'',priority:document.getElementById('goal-modal-priority').value};var idx=parseInt(document.getElementById('goal-modal-edit-idx').value);if(idx>=0&&state.goals[idx]){obj.id=state.goals[idx].id;if(state.goals[idx].retireAge)obj.retireAge=state.goals[idx].retireAge;if(state.goals[idx].retireIncome)obj.retireIncome=state.goals[idx].retireIncome;state.goals[idx]=obj;}else state.goals.push(obj);closeGoalModal();renderAll();}

/* Net Worth */
function renderNetWorth(){var al=document.getElementById('nw-assets-list'),ll=document.getElementById('nw-liabilities-list');if(!al)return;al.textContent='';ll.textContent='';
state.netWorthAssets=state.netWorthAssets||[];state.netWorthLiabilities=state.netWorthLiabilities||[];
/* Auto items from other sections */
function renderAutoItem(container,name,cat,value,colorCls){
var d=document.createElement('div');d.className='nw-item';d.style.opacity='0.85';
var left=document.createElement('div');var n=document.createElement('div');n.className='nw-item-name';n.textContent=name;left.appendChild(n);
var c2=document.createElement('div');c2.style.cssText='font-size:11px;color:var(--text-muted)';c2.textContent=cat+' (auto)';left.appendChild(c2);d.appendChild(left);
var right=document.createElement('div');right.style.cssText='display:flex;align-items:center;gap:8px';
var val=document.createElement('span');val.style.cssText='font-weight:700;font-size:14px;color:'+(colorCls||'var(--text-primary)');val.textContent=fmt(value);right.appendChild(val);
d.appendChild(right);container.appendChild(d);}
/* Auto assets: placements with current balance from goals */
var autoAssets=0,autoLiabs=0;
state.goals.forEach(function(g){if((g.current||0)>0){renderAutoItem(al,g.name,'Objectifs',g.current,'var(--accent)');autoAssets+=g.current;}});
state.investments.forEach(function(inv){var bal=state.projBalances&&state.projBalances[inv.id]?state.projBalances[inv.id]:0;if(!bal&&(inv.amount||0)>0)bal=catAnnual(inv);if(bal>0){renderAutoItem(al,inv.name,'Placements',bal,'var(--accent)');autoAssets+=bal;}});
if(state.emergencyFund>0){renderAutoItem(al,'Fonds d\'urgence','Epargne',state.emergencyFund,'var(--accent)');autoAssets+=state.emergencyFund;}
/* Auto liabilities: debts */
(state.debts||[]).forEach(function(d){if((d.balance||0)>0){renderAutoItem(ll,d.name,'Dettes',d.balance,'var(--danger)');autoLiabs+=d.balance;}});
/* Manual items */
function renderList(items,container,type){items.forEach(function(item,i){var d=document.createElement('div');d.className='nw-item';
var left=document.createElement('div');var n=document.createElement('div');n.className='nw-item-name';n.textContent=item.name;left.appendChild(n);
if(item.category){var cat=document.createElement('div');cat.style.cssText='font-size:11px;color:var(--text-muted)';cat.textContent=item.category;left.appendChild(cat);}d.appendChild(left);
var right=document.createElement('div');right.style.cssText='display:flex;align-items:center;gap:8px';
var inp=document.createElement('input');inp.type='number';inp.value=item.value||'';inp.style.cssText='width:130px;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg-primary);color:var(--text-primary);font-weight:700;text-align:right;font-size:14px';
inp.oninput=function(){item.value=parseFloat(this.value)||0;debouncedRecalc();};right.appendChild(inp);right.appendChild(document.createTextNode(' $'));
var del=document.createElement('button');del.className='remove-btn';del.textContent='\u2715';(function(idx,tp){del.onclick=function(){popupConfirm('Supprimer','Supprimer?',function(){pushUndo();(tp==='asset'?state.netWorthAssets:state.netWorthLiabilities).splice(idx,1);renderAll();});};})(i,type);right.appendChild(del);
d.appendChild(right);container.appendChild(d);});}
renderList(state.netWorthAssets,al,'asset');renderList(state.netWorthLiabilities,ll,'liability');
var ta=totalNWA()+autoAssets,tl=totalNWL()+autoLiabs,nw=ta-tl;
document.getElementById('nw-total-assets').textContent=fmt(ta);document.getElementById('nw-total-liabilities').textContent=fmt(tl);
document.getElementById('nw-net-worth').textContent=fmt(nw);document.getElementById('nw-net-worth').className='stat-value '+(nw>=0?'positive':'negative');
document.getElementById('nw-ratio').textContent=tl>0?(ta/tl).toFixed(2)+'x':'--';
/* Auto-record net worth history monthly */
state.netWorthHistory=state.netWorthHistory||[];
var now=new Date().toISOString().slice(0,7);
var lastEntry=state.netWorthHistory.length?state.netWorthHistory[state.netWorthHistory.length-1]:null;
if(!lastEntry||lastEntry.date!==now){
state.netWorthHistory.push({date:now,value:nw});
if(state.netWorthHistory.length>120)state.netWorthHistory.shift(); /* keep 10 years max */
}else{lastEntry.value=nw;} /* update current month */
/* Chart */
var labels=[],data=[];state.netWorthHistory.forEach(function(h){labels.push(h.date);data.push(h.value);});
mkChart('chart-networth',{type:'line',data:{labels:labels,datasets:[{label:'Valeur nette',data:data,borderColor:'#3b82f6',backgroundColor:'rgba(59,130,246,.1)',fill:true,tension:.3,pointRadius:4,borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{callback:function(v){return fmtS(v)}}},x:{grid:{display:false}}}}});}
function addNWItem(type){document.getElementById('nw-modal-title').textContent=type==='asset'?'Actif':'Passif';document.getElementById('nw-modal-type').value=type;document.getElementById('nw-modal-name').value='';document.getElementById('nw-modal-name').placeholder=type==='asset'?'ex: Compte epargne, Maison, Voiture, CELI...':'ex: Hypotheque, Pret auto, Carte de credit...';document.getElementById('nw-modal-value').value='';document.getElementById('nw-modal-edit-idx').value='-1';var catSel=document.getElementById('nw-modal-cat');var opts=catSel.options;var i;for(i=0;i<opts.length;i++){opts[i].style.display='';};var assetCats=['epargne','immobilier','vehicule','placement','crypto','entreprise','objets','autre'];var liabCats=['hypotheque','pret','carte-credit','marge','autre'];var showCats=type==='asset'?assetCats:liabCats;for(i=0;i<opts.length;i++){if(showCats.indexOf(opts[i].value)===-1)opts[i].style.display='none';};catSel.value=showCats[0];document.getElementById('nw-modal-overlay').classList.add('active');document.getElementById('nw-modal-name').focus();}
function closeNwModal(){document.getElementById('nw-modal-overlay').classList.remove('active');}
function confirmNwItem(){pushUndo();var type=document.getElementById('nw-modal-type').value;var name=document.getElementById('nw-modal-name').value.trim();if(!name)return;var item={id:gid('nw'),name:name,value:parseFloat(document.getElementById('nw-modal-value').value)||0,category:document.getElementById('nw-modal-cat').value};if(type==='asset')state.netWorthAssets.push(item);else state.netWorthLiabilities.push(item);closeNwModal();renderAll();}

/* Debts */
function renderDebts(){var c=document.getElementById('debts-list');if(!c)return;c.textContent='';state.debts=state.debts||[];
document.getElementById('debts-empty').style.display=state.debts.length?'none':'block';
var tBal=0,tPay=0,tInt=0,maxM=0;
state.debts.forEach(function(d,i){tBal+=d.balance||0;tPay+=d.payment||0;
var card=document.createElement('div');card.className='debt-card';
var hd=document.createElement('div');hd.className='debt-header';
var nm=document.createElement('div');nm.className='debt-name';nm.textContent=d.name;hd.appendChild(nm);
var acts=document.createElement('div');acts.style.cssText='display:flex;gap:4px';
var eb=document.createElement('button');eb.className='goal-edit-btn';eb.textContent='\u270E';(function(idx){eb.onclick=function(){openDebtModal(idx);};})(i);acts.appendChild(eb);
var del=document.createElement('button');del.className='remove-btn';del.style.cssText='width:28px;height:28px;font-size:12px';del.textContent='\u2715';(function(idx){del.onclick=function(){popupConfirm('Supprimer','Supprimer?',function(){pushUndo();state.debts.splice(idx,1);renderAll();});};})(i);acts.appendChild(del);
hd.appendChild(acts);card.appendChild(hd);
var det=document.createElement('div');det.className='debt-details';
[['Solde',fmt(d.balance),'color:var(--danger)'],['Taux',d.rate+'%',''],['Min/mois',fmt(d.minPayment),''],['Paiement',fmt(d.payment),'color:var(--success)']].forEach(function(item){var dd=document.createElement('div');var dl=document.createElement('div');dl.className='debt-detail-label';dl.textContent=item[0];dd.appendChild(dl);var dv=document.createElement('div');dv.className='debt-detail-value';dv.textContent=item[1];if(item[2])dv.style.cssText=item[2];dd.appendChild(dv);det.appendChild(dd);});
card.appendChild(det);
var months=debtPayoff(d.balance,d.rate,d.payment);var interest=debtInterest(d.balance,d.rate,d.payment);tInt+=interest;if(months>maxM&&months<999)maxM=months;
if(months>0&&months<999){var info=document.createElement('div');info.style.cssText='margin-top:8px;font-size:12px;color:var(--text-muted)';info.textContent='Rembourse dans '+Math.ceil(months/12)+' an(s) | Interet: '+fmt(interest);card.appendChild(info);}
c.appendChild(card);});
document.getElementById('debt-total').textContent=fmt(tBal);document.getElementById('debt-monthly').textContent=fmt(tPay);document.getElementById('debt-total-interest').textContent=fmt(tInt);
if(maxM>0&&maxM<999){var fd=new Date();fd.setMonth(fd.getMonth()+maxM);document.getElementById('debt-free-date').textContent=fd.toLocaleDateString('fr-CA',{month:'short',year:'numeric'});}else document.getElementById('debt-free-date').textContent='--';
renderDebtStrategy();renderDebtAnalysis();renderDebtChart();}
function debtPayoff(bal,rate,pay){if(bal<=0||pay<=0)return 0;var mr=rate/100/12;if(mr===0)return Math.ceil(bal/pay);if(pay<=bal*mr)return 999;return Math.ceil(Math.log(pay/(pay-bal*mr))/Math.log(1+mr));}
function debtInterest(bal,rate,pay){if(bal<=0||pay<=0)return 0;var mr=rate/100/12,total=0,b=bal;for(var i=0;i<600&&b>0;i++){var interest=b*mr;total+=interest;b=Math.max(b+interest-pay,0);}return total;}
function openDebtModal(idx){var isEdit=typeof idx==='number'&&idx>=0;document.getElementById('debt-modal-title').textContent=isEdit?'Modifier':'Ajouter';document.getElementById('debt-modal-edit-idx').value=isEdit?idx:-1;
if(isEdit){var d=state.debts[idx];document.getElementById('debt-modal-name').value=d.name;document.getElementById('debt-modal-type').value=d.type||'credit';document.getElementById('debt-modal-balance').value=d.balance;document.getElementById('debt-modal-rate').value=d.rate;document.getElementById('debt-modal-minpay').value=d.minPayment;document.getElementById('debt-modal-pay').value=d.payment;}else{['debt-modal-name','debt-modal-balance','debt-modal-rate','debt-modal-minpay','debt-modal-pay'].forEach(function(id){document.getElementById(id).value='';});}
document.getElementById('debt-modal-overlay').classList.add('active');document.getElementById('debt-modal-name').focus();}
function closeDebtModal(){document.getElementById('debt-modal-overlay').classList.remove('active');}
function confirmDebt(){pushUndo();var d={id:gid('d'),name:document.getElementById('debt-modal-name').value.trim()||'Dette',type:document.getElementById('debt-modal-type').value,balance:parseFloat(document.getElementById('debt-modal-balance').value)||0,rate:parseFloat(document.getElementById('debt-modal-rate').value)||0,minPayment:parseFloat(document.getElementById('debt-modal-minpay').value)||0,payment:parseFloat(document.getElementById('debt-modal-pay').value)||0};var idx=parseInt(document.getElementById('debt-modal-edit-idx').value);if(idx>=0&&state.debts[idx]){d.id=state.debts[idx].id;state.debts[idx]=d;}else state.debts.push(d);closeDebtModal();renderAll();}
function setDebtStrategy(s,btn){state.debtStrategy=s;var tabs=btn.parentNode.children;for(var i=0;i<tabs.length;i++)tabs[i].classList.remove('active');btn.classList.add('active');renderDebtStrategy();save();}
function renderDebtStrategy(){var c=document.getElementById('debt-strategy-result');if(!c)return;c.textContent='';if(!state.debts||!state.debts.length){c.textContent='Ajoutez des dettes.';return;}
var sorted=state.debts.filter(function(d){return d.balance>0;}).slice();
if(state.debtStrategy==='avalanche')sorted.sort(function(a,b){return b.rate-a.rate;});else sorted.sort(function(a,b){return a.balance-b.balance;});
var title=document.createElement('div');title.style.cssText='font-size:13px;font-weight:700;margin-bottom:8px';title.textContent='Ordre ('+(state.debtStrategy==='avalanche'?'taux le + eleve':'solde le + bas')+'):';c.appendChild(title);
var ol=document.createElement('ol');ol.style.cssText='margin:0 0 0 20px;font-size:13px';
sorted.forEach(function(d){var li=document.createElement('li');li.style.marginBottom='4px';li.textContent=d.name+' - '+fmt(d.balance)+' a '+d.rate+'%';ol.appendChild(li);});c.appendChild(ol);
var tip=document.createElement('div');tip.className='alert alert-info';tip.style.marginTop='12px';tip.textContent=state.debtStrategy==='avalanche'?'Minimise les interets totaux.':'Victoires rapides pour la motivation.';c.appendChild(tip);}

/* ── Analyse Rembourser vs Investir ── */
function renderDebtAnalysis(){
var c=document.getElementById('debt-vs-invest-analysis');if(!c)return;c.textContent='';
if(!state.debts||!state.debts.length){var p=document.createElement('p');p.style.cssText='color:var(--text-muted);font-size:13px';p.textContent='Ajoutez des dettes pour voir l\'analyse.';c.appendChild(p);return;}
var investRate=(parseFloat(document.getElementById('debt-invest-rate').value)||7)/100;
var extraMonth=parseFloat(document.getElementById('debt-extra-amount').value)||200;

state.debts.forEach(function(d){
if(d.balance<=0)return;
var debtRate=d.rate/100;
var debtMR=debtRate/12;
var investMR=investRate/12;
var months=debtPayoff(d.balance,d.rate,d.payment+extraMonth);
if(months<=0||months>=999)months=60; /* fallback horizon */

/* Scenario A: Rembourser la dette plus vite (paiement normal + extra) */
var balA=d.balance,totalPaidA=0,interestPaidA=0;
for(var m=0;m<months;m++){
var int=balA*debtMR;
interestPaidA+=int;
var pay=Math.min(d.payment+extraMonth,balA+int);
balA=Math.max(balA+int-pay,0);
totalPaidA+=pay;
}
var interestSavedA=debtInterest(d.balance,d.rate,d.payment)-interestPaidA;

/* Scenario B: Paiement min seulement + investir l'extra */
var balB=d.balance,investB=0,interestPaidB=0;
for(var m2=0;m2<months;m2++){
var intB=balB*debtMR;
interestPaidB+=intB;
var payB=Math.min(d.payment,balB+intB);
balB=Math.max(balB+intB-payB,0);
investB=investB*(1+investMR)+extraMonth;
}
var investGainB=investB-extraMonth*months;
var netB=investGainB-interestPaidB;

/* Scenario A net: interest saved (vs paying minimum) */
var netA=interestSavedA;

/* Verdict */
var remb=interestSavedA;
var inv=investGainB-(interestPaidB-interestPaidA); /* net advantage of investing */
var shouldRepay=debtRate>investRate;
/* More precise: compare total cost */
var advantageRepay=remb-investGainB; /* positive = rembourser is better */

/* Build card */
var card=document.createElement('div');card.style.cssText='padding:16px;border:1px solid var(--border);border-radius:8px;background:var(--bg-primary);margin-bottom:12px';

/* Header */
var hd=document.createElement('div');hd.style.cssText='display:flex;justify-content:space-between;align-items:center;margin-bottom:12px';
var nm=document.createElement('div');nm.style.cssText='font-weight:700;font-size:15px';nm.textContent=d.name;hd.appendChild(nm);
var badge=document.createElement('span');badge.className='tag '+(shouldRepay?'tag-danger':'tag-success');
badge.textContent=shouldRepay?'Rembourser d\'abord':'Investir d\'abord';
hd.appendChild(badge);card.appendChild(hd);

/* Comparison grid */
var grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px';

/* Left: Rembourser */
var leftBox=document.createElement('div');leftBox.style.cssText='padding:12px;border-radius:8px;border:2px solid '+(shouldRepay?'var(--success)':'var(--border)');
var leftTitle=document.createElement('div');leftTitle.style.cssText='font-size:12px;font-weight:700;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px';leftTitle.textContent='Rembourser (+'+fmt(extraMonth)+'/mois)';leftBox.appendChild(leftTitle);
var leftItems=[
['Dette a',d.rate+'% (cout garanti)',''],
['Interets economises',fmt(interestSavedA),'color:var(--success)'],
['Rembourse en',months+' mois au lieu de '+debtPayoff(d.balance,d.rate,d.payment)+' mois',''],
['Libre de dette',months<12?months+' mois':Math.ceil(months/12)+' an(s)','color:var(--success)']
];
leftItems.forEach(function(item){
var row=document.createElement('div');row.style.cssText='display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px';
var label=document.createElement('span');label.style.color='var(--text-muted)';label.textContent=item[0];row.appendChild(label);
var val=document.createElement('span');val.style.cssText='font-weight:700;'+(item[2]||'');val.textContent=item[1];row.appendChild(val);
leftBox.appendChild(row);});
grid.appendChild(leftBox);

/* Right: Investir */
var rightBox=document.createElement('div');rightBox.style.cssText='padding:12px;border-radius:8px;border:2px solid '+(!shouldRepay?'var(--success)':'var(--border)');
var rightTitle=document.createElement('div');rightTitle.style.cssText='font-size:12px;font-weight:700;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px';rightTitle.textContent='Investir (+'+fmt(extraMonth)+'/mois)';rightBox.appendChild(rightTitle);
var rightItems=[
['Rendement estime',(investRate*100).toFixed(1)+'% (non garanti)',''],
['Gains de placement',fmt(investGainB),'color:var(--accent)'],
['Mais interets payes',fmt(interestPaidB),'color:var(--danger)'],
['Gain net',fmt(investGainB-interestPaidB+interestPaidA),'color:var(--accent)']
];
rightItems.forEach(function(item){
var row=document.createElement('div');row.style.cssText='display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px';
var label=document.createElement('span');label.style.color='var(--text-muted)';label.textContent=item[0];row.appendChild(label);
var val=document.createElement('span');val.style.cssText='font-weight:700;'+(item[2]||'');val.textContent=item[1];row.appendChild(val);
rightBox.appendChild(row);});
grid.appendChild(rightBox);
card.appendChild(grid);

/* Verdict */
var verdict=document.createElement('div');verdict.className='alert '+(shouldRepay?'alert-warning':'alert-info');verdict.style.margin='0';
var diff=Math.abs(debtRate-investRate)*100;
if(shouldRepay){
verdict.textContent='Votre dette a '+d.rate+'% coute plus que le rendement espere de '+(investRate*100).toFixed(1)+'%. Ecart de '+diff.toFixed(1)+'% en votre defaveur. Rembourser cette dette = rendement garanti de '+d.rate+'% sans risque. Priorisez le remboursement.';
}else if(debtRate===investRate){
verdict.textContent='Le taux de la dette ('+d.rate+'%) egale le rendement espere. Rembourser est plus prudent car le rendement n\'est pas garanti.';
}else{
verdict.textContent='Votre dette a '+d.rate+'% coute moins que le rendement espere de '+(investRate*100).toFixed(1)+'%. Ecart de '+diff.toFixed(1)+'% en votre faveur. Payez le minimum et investissez le surplus. Attention: le rendement n\'est pas garanti.';
if(diff<3){
verdict.textContent+=' L\'ecart est faible — si vous preferez la certitude, rembourser reste un choix solide.';
}
}
card.appendChild(verdict);
c.appendChild(card);
});

/* Summary recommendation */
var highRateDebts=state.debts.filter(function(d){return d.balance>0&&d.rate/100>investRate;});
var lowRateDebts=state.debts.filter(function(d){return d.balance>0&&d.rate/100<=investRate;});
if(highRateDebts.length>0||lowRateDebts.length>0){
var summary=document.createElement('div');summary.style.cssText='padding:16px;border-radius:8px;background:var(--bg-tertiary);margin-top:4px';
var sTitle=document.createElement('div');sTitle.style.cssText='font-weight:700;font-size:14px;margin-bottom:8px';sTitle.textContent='Recommandation optimale';summary.appendChild(sTitle);
var steps=document.createElement('ol');steps.style.cssText='margin:0 0 0 20px;font-size:13px;line-height:1.8';
if(highRateDebts.length>0){
var li1=document.createElement('li');
li1.textContent='Rembourser en priorite : '+highRateDebts.map(function(d){return d.name+' ('+d.rate+'%)';}).join(', ')+' — ces taux depassent votre rendement espere';
li1.style.cssText='color:var(--danger);font-weight:600';steps.appendChild(li1);
}
if(lowRateDebts.length>0){
var li2=document.createElement('li');
li2.textContent='Paiement minimum sur : '+lowRateDebts.map(function(d){return d.name+' ('+d.rate+'%)';}).join(', ')+' — investir le surplus est mathematiquement avantageux';
li2.style.cssText='color:var(--success);font-weight:600';steps.appendChild(li2);
}
var li3=document.createElement('li');
li3.textContent='Toujours garder un fonds d\'urgence avant de rembourser agressivement';
li3.style.color='var(--text-secondary)';steps.appendChild(li3);
summary.appendChild(steps);c.appendChild(summary);
}
}

function renderDebtChart(){if(!state.debts||!state.debts.length){if(charts['chart-debt']){charts['chart-debt'].destroy();delete charts['chart-debt'];}return;}
var maxM=0;state.debts.forEach(function(d){var m=debtPayoff(d.balance,d.rate,d.payment);if(m>maxM&&m<999)maxM=m;});
if(!maxM)return;maxM=Math.min(maxM+6,360);
var labels=[];for(var i=0;i<=maxM;i++)labels.push(i);
var colors=['#ef4444','#f97316','#f59e0b','#3b82f6','#6366f1','#a855f7'];
var datasets=[];
state.debts.forEach(function(d,j){var bal=d.balance,mr=d.rate/100/12,pay=d.payment,data=[bal];
for(var k=1;k<=maxM;k++){bal=Math.max(bal+bal*mr-pay,0);data.push(bal);}
datasets.push({label:d.name,data:data,borderColor:colors[j%colors.length],borderWidth:2,fill:false,tension:.2,pointRadius:0});});
mkChart('chart-debt',{type:'line',data:{labels:labels,datasets:datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{ticks:{callback:function(v){return fmtS(v)}}},x:{title:{display:true,text:'Mois'},ticks:{maxTicksLimit:12}}}}});}

/* Transactions */
function renderTransactions(){state.transactions=state.transactions||[];var el=document.getElementById('tx-list');if(!el)return;
var month=document.getElementById('tx-filter-month').value;var catF=document.getElementById('tx-filter-cat').value;
var catSel=document.getElementById('tx-filter-cat');catSel.textContent='';var opt0=document.createElement('option');opt0.value='';opt0.textContent='Toutes';catSel.appendChild(opt0);
var cats=[];state.expenses.forEach(function(e){if(cats.indexOf(e.name)<0)cats.push(e.name);});cats.sort();
cats.forEach(function(c){var o=document.createElement('option');o.value=c;o.textContent=c;catSel.appendChild(o);});catSel.value=catF;
var txCat=document.getElementById('tx-modal-cat');txCat.textContent='';var o0=document.createElement('option');o0.value='';o0.textContent='--';txCat.appendChild(o0);
cats.forEach(function(c){var o=document.createElement('option');o.value=c;o.textContent=c;txCat.appendChild(o);});
var filtered=state.transactions.filter(function(t){return(!month||!t.date||t.date.startsWith(month))&&(!catF||t.category===catF);}).sort(function(a,b){return(b.date||'').localeCompare(a.date||'');});
var inc=0,exp=0;filtered.forEach(function(t){if(t.type==='income')inc+=t.amount||0;else exp+=t.amount||0;});
document.getElementById('tx-month-income').textContent=fmt(inc);document.getElementById('tx-month-expense').textContent=fmt(exp);
document.getElementById('tx-month-balance').textContent=fmt(inc-exp);document.getElementById('tx-month-balance').className='stat-value '+(inc-exp>=0?'positive':'negative');
document.getElementById('tx-month-count').textContent=filtered.length;
el.textContent='';document.getElementById('tx-empty').style.display=filtered.length?'none':'block';
filtered.forEach(function(tx){var row=document.createElement('div');row.className='tx-row';
var d1=document.createElement('div');d1.textContent=tx.date;row.appendChild(d1);
var d2=document.createElement('div');d2.textContent=tx.description;if(tx.category){var sm=document.createElement('small');sm.style.cssText='display:block;color:var(--text-muted)';sm.textContent=tx.category;d2.appendChild(sm);}row.appendChild(d2);
var d3=document.createElement('div');d3.className=tx.type==='income'?'tx-amount-pos':'tx-amount-neg';d3.textContent=(tx.type==='income'?'+':'-')+fmt(tx.amount);row.appendChild(d3);
var d4=document.createElement('div');var tag=document.createElement('span');tag.className='tag '+(tx.type==='income'?'tag-success':'tag-danger');tag.textContent=tx.type==='income'?'Revenu':'Depense';d4.appendChild(tag);row.appendChild(d4);
var d5=document.createElement('div');var del=document.createElement('button');del.className='remove-btn';del.style.cssText='width:24px;height:24px;font-size:12px';del.textContent='\u2715';(function(t){del.onclick=function(){var ri=state.transactions.indexOf(t);if(ri>=0)popupConfirm('Supprimer','Supprimer?',function(){pushUndo();state.transactions.splice(ri,1);renderTransactions();save();});};})(tx);d5.appendChild(del);row.appendChild(d5);
el.appendChild(row);});
renderBudgetVsReal(month);}

/* Budget vs Reel comparison */
function renderBudgetVsReal(month){
var c=document.getElementById('budget-vs-real');if(!c)return;c.textContent='';
/* Group real spending by category for the selected month */
var realByCategory={};
(state.transactions||[]).forEach(function(t){
if(t.type!=='expense')return;
if(month&&t.date&&!t.date.startsWith(month))return;
var cat=t.category||'Non categorise';
if(!realByCategory[cat])realByCategory[cat]=0;
realByCategory[cat]+=t.amount||0;
});
/* Get budgeted amounts (monthly) */
var budgetByCategory={};
state.expenses.forEach(function(e){
var a=catAnnual(e)/12;
if(a>0)budgetByCategory[e.name]=a;
});
/* Merge all category names */
var allCats={};
for(var k in budgetByCategory)allCats[k]=true;
for(var k2 in realByCategory)allCats[k2]=true;
var catList=Object.keys(allCats).sort();

if(!catList.length){
var msg=document.createElement('p');msg.style.cssText='color:var(--text-muted);font-size:13px;text-align:center;padding:16px';
msg.textContent='Ajoutez des depenses dans votre budget et enregistrez des transactions pour voir la comparaison.';
c.appendChild(msg);return;
}

/* Header */
var header=document.createElement('div');header.style.cssText='display:grid;grid-template-columns:1fr 100px 100px 100px 80px;gap:8px;padding:8px 12px;font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-muted);border-bottom:2px solid var(--border)';
['Categorie','Budget','Reel','Ecart','Statut'].forEach(function(h){var d=document.createElement('div');d.textContent=h;if(h!=='Categorie')d.style.textAlign='right';header.appendChild(d);});
c.appendChild(header);

var totalBudget=0,totalReal=0;
catList.forEach(function(cat){
var budget=budgetByCategory[cat]||0;
var real=realByCategory[cat]||0;
var diff=budget-real;
totalBudget+=budget;totalReal+=real;

var row=document.createElement('div');
row.style.cssText='display:grid;grid-template-columns:1fr 100px 100px 100px 80px;gap:8px;padding:8px 12px;font-size:13px;border-bottom:1px solid var(--border);align-items:center';

var nameDiv=document.createElement('div');nameDiv.style.fontWeight='600';nameDiv.textContent=cat;row.appendChild(nameDiv);

var budgetDiv=document.createElement('div');budgetDiv.style.cssText='text-align:right;color:var(--text-muted)';budgetDiv.textContent=budget>0?fmt(budget):'--';row.appendChild(budgetDiv);

var realDiv=document.createElement('div');realDiv.style.cssText='text-align:right;font-weight:700';realDiv.textContent=real>0?fmt(real):'--';row.appendChild(realDiv);

var diffDiv=document.createElement('div');diffDiv.style.cssText='text-align:right;font-weight:700';
if(real>0&&budget>0){
diffDiv.textContent=(diff>=0?'+':'')+fmt(diff);
diffDiv.style.color=diff>=0?'var(--success)':'var(--danger)';
}else{diffDiv.textContent='--';diffDiv.style.color='var(--text-muted)';}
row.appendChild(diffDiv);

var statusDiv=document.createElement('div');statusDiv.style.textAlign='right';
if(real>0&&budget>0){
var pctUsed=real/budget*100;
var tag=document.createElement('span');
tag.className='tag '+(pctUsed<=80?'tag-success':pctUsed<=100?'tag-warning':'tag-danger');
tag.textContent=pctUsed<=100?Math.round(pctUsed)+'%':'Depasse';
statusDiv.appendChild(tag);
}else if(real>0&&budget===0){
var tag2=document.createElement('span');tag2.className='tag tag-info';tag2.textContent='Non prevu';statusDiv.appendChild(tag2);
}
row.appendChild(statusDiv);
c.appendChild(row);
});

/* Total row */
var totalDiff=totalBudget-totalReal;
var totalRow=document.createElement('div');
totalRow.style.cssText='display:grid;grid-template-columns:1fr 100px 100px 100px 80px;gap:8px;padding:10px 12px;font-size:14px;font-weight:700;border-top:2px solid var(--border);margin-top:4px';
var items=[
{t:'TOTAL',s:''},
{t:fmt(totalBudget),s:'text-align:right;color:var(--text-muted)'},
{t:fmt(totalReal),s:'text-align:right'},
{t:(totalDiff>=0?'+':'')+fmt(totalDiff),s:'text-align:right;color:'+(totalDiff>=0?'var(--success)':'var(--danger)')},
{t:totalBudget>0?Math.round(totalReal/totalBudget*100)+'%':'--',s:'text-align:right'}
];
items.forEach(function(item){var d=document.createElement('div');d.textContent=item.t;d.style.cssText=item.s;totalRow.appendChild(d);});
c.appendChild(totalRow);
}

function openTxModal(){document.getElementById('tx-modal-date').value=new Date().toISOString().slice(0,10);document.getElementById('tx-modal-desc').value='';document.getElementById('tx-modal-amount').value='';document.getElementById('tx-modal-type').value='expense';document.getElementById('tx-modal-overlay').classList.add('active');document.getElementById('tx-modal-desc').focus();}
function closeTxModal(){document.getElementById('tx-modal-overlay').classList.remove('active');}
function confirmTx(){pushUndo();state.transactions.push({id:gid('tx'),date:document.getElementById('tx-modal-date').value,description:document.getElementById('tx-modal-desc').value.trim(),amount:parseFloat(document.getElementById('tx-modal-amount').value)||0,type:document.getElementById('tx-modal-type').value,category:document.getElementById('tx-modal-cat').value});closeTxModal();renderTransactions();save();}

/* ── CSV Import ── */
function importCSVTransactions(ev){
var f=ev.target.files[0];if(!f)return;
var reader=new FileReader();
reader.onload=function(e){
var text=e.target.result;
var lines=text.split(/\r?\n/).filter(function(l){return l.trim();});
if(lines.length<2){popupAlert('Erreur','Le fichier CSV est vide ou n\'a qu\'un en-tete.');return;}
/* Parse header */
var header=parseCSVLine(lines[0]).map(function(h){return h.toLowerCase().trim();});
/* Try to detect columns */
var dateCol=findCol(header,['date','date de transaction','transaction date','posted date']);
var descCol=findCol(header,['description','libelle','memo','details','nom','merchant','payee']);
var amountCol=findCol(header,['montant','amount','debit','withdrawal','somme']);
var creditCol=findCol(header,['credit','deposit','depot']);

if(dateCol<0||descCol<0||(amountCol<0&&creditCol<0)){
popupAlert('Format CSV','Colonnes detectees: '+(dateCol>=0?'Date OK':'Date?')+', '+(descCol>=0?'Desc OK':'Desc?')+', '+(amountCol>=0?'Montant OK':'Montant?')+'\n\nLe CSV doit contenir au minimum: date, description, montant. Verifiez les en-tetes.');
ev.target.value='';return;
}

pushUndo();
var count=0;
for(var i=1;i<lines.length;i++){
var cols=parseCSVLine(lines[i]);
if(cols.length<2)continue;
var date=cols[dateCol]||'';
/* Normalize date format */
if(date.match(/^\d{2}\/\d{2}\/\d{4}$/))date=date.split('/')[2]+'-'+date.split('/')[1]+'-'+date.split('/')[0];
else if(date.match(/^\d{4}\/\d{2}\/\d{2}$/))date=date.replace(/\//g,'-');
var desc=(cols[descCol]||'').trim();
var amt=0,type='expense';
if(amountCol>=0){
amt=parseFloat((cols[amountCol]||'0').replace(/[^0-9.\-]/g,''))||0;
if(amt<0){amt=Math.abs(amt);type='expense';}
else if(amt>0){type=creditCol>=0?'expense':'income';}
}
if(creditCol>=0&&creditCol!==amountCol){
var credit=parseFloat((cols[creditCol]||'0').replace(/[^0-9.\-]/g,''))||0;
if(credit>0){amt=credit;type='income';}
}
if(amt>0&&desc){
state.transactions.push({id:gid('tx'),date:date,description:desc,amount:amt,type:type,category:''});
count++;
}
}
ev.target.value='';
renderTransactions();save();
popupAlert('Import reussi',count+' transaction'+(count>1?'s':'')+' importee'+(count>1?'s':'')+' depuis le CSV.');
};
reader.readAsText(f);
}

function parseCSVLine(line){
var result=[],current='',inQuotes=false;
for(var i=0;i<line.length;i++){
var ch=line[i];
if(inQuotes){if(ch==='"'&&line[i+1]==='"'){current+='"';i++;}else if(ch==='"')inQuotes=false;else current+=ch;}
else{if(ch==='"')inQuotes=true;else if(ch===','||ch===';'){result.push(current);current='';}else current+=ch;}
}
result.push(current);return result;
}

function findCol(headers,names){
for(var i=0;i<headers.length;i++){
for(var j=0;j<names.length;j++){
if(headers[i].indexOf(names[j])>=0)return i;
}}return -1;
}

/* ═══════════════════════════════════════════════════
   CHARTS
   ═══════════════════════════════════════════════════ */
var charts={};
function mkChart(id,cfg){if(charts[id])charts[id].destroy();var x=document.getElementById(id);if(!x)return null;charts[id]=new Chart(x,cfg);return charts[id];}
var COLORS=['#ef4444','#f97316','#f59e0b','#84cc16','#22c55e','#14b8a6','#06b6d4','#3b82f6','#6366f1','#a855f7','#ec4899','#f43f5e'];

function renderCharts(){var an=getAnnualNet(),ea=totalExp(),ia=totalInv(),ra=an-ea-ia;
var isDark=state.theme==='dark',tc=isDark?'#cbd5e1':'#4a4a6a',gc=isDark?'#334155':'#e8ecf1';
Chart.defaults.color=tc;Chart.defaults.borderColor=gc;
var pieD=ra>=0?[ea,ia,ra]:[ea,ia],pieL=ra>=0?['Depenses','Placements','Disponible']:['Depenses','Placements'],pieC=ra>=0?['#ef4444','#3b82f6','#22c55e']:['#ef4444','#3b82f6'];
['chart-pie','chart-pie-full'].forEach(function(id){mkChart(id,{type:'doughnut',data:{labels:pieL,datasets:[{data:pieD,backgroundColor:pieC,borderWidth:2,borderColor:isDark?'#1e293b':'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}}});});
var el=[],ev=[];state.expenses.forEach(function(e){var v=catAnnual(e);if(v>0){el.push(e.name);ev.push(v/12);}});
['chart-bar-expenses','chart-bar-expenses-full'].forEach(function(id){mkChart(id,{type:'bar',data:{labels:el,datasets:[{data:ev,backgroundColor:COLORS.slice(0,el.length),borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,indexAxis:'y',plugins:{legend:{display:false}},scales:{x:{ticks:{callback:function(v){return fmtS(v)}}},y:{grid:{display:false}}}}});});
var il=[],iv=[];state.investments.forEach(function(inv){var v=catAnnual(inv);if(v>0){il.push(inv.name);iv.push(v/12);}});
mkChart('chart-bar-investments',{type:'bar',data:{labels:il,datasets:[{data:iv,backgroundColor:['#3b82f6','#6366f1','#8b5cf6','#a855f7','#06b6d4','#14b8a6','#f59e0b'],borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,indexAxis:'y',plugins:{legend:{display:false}},scales:{x:{ticks:{callback:function(v){return fmtS(v)}}},y:{grid:{display:false}}}}});
mkChart('chart-budget-overview',{type:'bar',data:{labels:['Revenu','Depenses','Placements','Disponible'],datasets:[{data:[an/12,ea/12,ia/12,ra/12],backgroundColor:['#3b82f6','#ef4444','#6366f1',ra>=0?'#22c55e':'#dc2626'],borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{callback:function(v){return fmtS(v)}}},x:{grid:{display:false}}}}});
/* Group chart */
var grpD={},grpC={'Logement':'#ef4444','Alimentation':'#f97316','Transport':'#f59e0b','Assurances':'#84cc16','Services':'#22c55e','Sante':'#14b8a6','Loisirs':'#06b6d4','Vetements':'#3b82f6','Education':'#6366f1','Dettes':'#a855f7','Divers':'#ec4899'};
state.expenses.forEach(function(e){var g=e.group||'Autre',v=catAnnual(e);if(v>0){if(!grpD[g])grpD[g]=0;grpD[g]+=v;}});
var gl=[],gv=[],gc2=[];for(var gk in grpD){gl.push(gk);gv.push(grpD[gk]/12);gc2.push(grpC[gk]||'#94a3b8');}
mkChart('chart-expenses-group',{type:'doughnut',data:{labels:gl,datasets:[{data:gv,backgroundColor:gc2,borderWidth:2,borderColor:isDark?'#1e293b':'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right'}}}});
var needs=0,wants=0;state.expenses.forEach(function(e){var g=e.group||'';if(NEEDS_GROUPS.indexOf(g)>=0)needs+=catAnnual(e);else wants+=catAnnual(e);});
mkChart('chart-needs-wants',{type:'doughnut',data:{labels:['Besoins','Envies','Epargne','Disponible'],datasets:[{data:[needs/12,wants/12,ia/12,Math.max(ra/12,0)],backgroundColor:['#ef4444','#f59e0b','#3b82f6','#22c55e'],borderWidth:2,borderColor:isDark?'#1e293b':'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right'}}}});}

/* Projections */
function renderProjection(){
var configEl=document.getElementById('proj-config');if(!configEl)return;configEl.textContent='';
var years=state.projYears,infl=state.projInflation/100;
state.projEvents=state.projEvents||[];state.projBalances=state.projBalances||{};
var cy=new Date().getFullYear();

/* Get all investments (even with 0 amount — user might set balance or future events) */
var allInv=state.investments;
if(!allInv.length){configEl.textContent='Ajoutez des placements.';return;}

/* ── Config per investment: balance + rate + current contribution ── */
allInv.forEach(function(inv,idx){
var annual=catAnnual(inv);
var balKey='bal_'+inv.id;
var bal=state.projBalances[balKey]||0;

var row=document.createElement('div');row.style.cssText='display:grid;grid-template-columns:140px 1fr 1fr 1fr;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);font-size:13px';
var nameEl=document.createElement('div');nameEl.style.fontWeight='700';nameEl.textContent=inv.name;row.appendChild(nameEl);

/* Balance */
var bg=document.createElement('div');bg.className='form-group';
var bl=document.createElement('label');bl.textContent='Solde actuel ($)';bl.style.fontSize='11px';bg.appendChild(bl);
var bi=document.createElement('input');bi.type='number';bi.value=bal||'';bi.placeholder='0';bi.min='0';bi.style.cssText='padding:8px;font-size:13px';
(function(key){bi.oninput=function(){state.projBalances[key]=clampMin0(this.value);debouncedRecalc();};})(balKey);
bg.appendChild(bi);row.appendChild(bg);

/* Rate */
var rg=document.createElement('div');rg.className='form-group';
var rl=document.createElement('label');rl.textContent='Rendement (%)';rl.style.fontSize='11px';rg.appendChild(rl);
var ri=document.createElement('input');ri.type='number';ri.value=inv.rate||0;ri.min='0';ri.max='50';ri.step='0.1';ri.style.cssText='padding:8px;font-size:13px';
(function(i){ri.oninput=function(){state.investments[i].rate=parseFloat(this.value)||0;debouncedRecalc();};})(idx);
rg.appendChild(ri);row.appendChild(rg);

/* Current contribution display */
var cg=document.createElement('div');cg.className='form-group';
var cl=document.createElement('label');cl.textContent='Contribution actuelle';cl.style.fontSize='11px';cg.appendChild(cl);
var cv=document.createElement('div');cv.style.cssText='padding:8px;font-weight:700;color:var(--accent)';cv.textContent=annual>0?fmt(annual/12)+'/mois':'0 $';cg.appendChild(cv);
row.appendChild(cg);

configEl.appendChild(row);
});

/* ── Events list ── */
renderProjEvents();

/* ── Calculate projections with events ── */
var yLabels=[];for(var y=0;y<=years;y++)yLabels.push(cy+y);
var datasets=[],totals=new Array(years+1).fill(0),cumC=new Array(years+1).fill(0);
var ic=['#3b82f6','#6366f1','#8b5cf6','#a855f7','#06b6d4','#14b8a6','#f59e0b','#ef4444','#22c55e'];

allInv.forEach(function(item,ci){
var baseAnnual=catAnnual(item);
var rt=(item.rate||0)/100;
var cap=item.limit||0,lifeCap=item.lifetimeLimit||0,maxYrs=item.maxYears||0;
var isREEE=item.name==='REEE';
var balKey='bal_'+item.id;
var startBal=state.projBalances[balKey]||0;

/* Build a map of year → contribution override from events */
var overrides={};
state.projEvents.forEach(function(ev){
if(ev.investmentId===item.id||ev.investmentId==='all'){
overrides[ev.year]=ev.monthlyAmount*12;
}
});

var vals=[startBal],acc=startBal;
/* Track cumulative contributions; include startBal as prior contributions toward lifetimeLimit */
var tC=lifeCap>0?startBal:0;

for(var yr=1;yr<=years;yr++){
var yearNum=cy+yr;
/* Use override if exists, otherwise base */
var desired=overrides[yearNum]!==undefined?overrides[yearNum]:baseAnnual;
var contrib=desired;
if(cap>0&&contrib>cap)contrib=cap;
/* Stop contributions after maxYears */
if(maxYrs>0&&yr>maxYrs)contrib=0;
/* Stop contributions once lifetime limit is reached */
if(lifeCap>0&&tC+contrib>=lifeCap)contrib=Math.max(lifeCap-tC,0);
var scee=isREEE&&contrib>0?Math.min(contrib*0.2,500):0;
var interest=acc*rt;
acc=acc+interest+contrib+scee;
tC+=contrib;
vals.push(acc);
totals[yr]+=acc;
cumC[yr]+=tC;
}

if(baseAnnual>0||startBal>0){
var lbl=item.name;
if(lifeCap>0)lbl+=' (max '+fmtS(lifeCap)+')';
datasets.push({label:lbl,data:vals,borderColor:ic[ci%ic.length],backgroundColor:ic[ci%ic.length]+'15',fill:true,tension:.3,pointRadius:0,pointHitRadius:10,borderWidth:2});
}
});

datasets.push({label:'Total',data:totals,borderColor:'#f59e0b',borderWidth:3,borderDash:[6,3],fill:false,tension:.3,pointRadius:0,pointHitRadius:10});

/* ── Chart ── */
var isDark=state.theme==='dark',gc2=isDark?'#334155':'#e8ecf1';
mkChart('chart-projection',{type:'line',data:{labels:yLabels,datasets:datasets},
options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
plugins:{legend:{position:'bottom',labels:{padding:12,font:{size:12}}},tooltip:{callbacks:{label:function(c){return c.dataset.label+': '+fmt(c.parsed.y);}}}},
scales:{y:{grid:{color:gc2},ticks:{callback:function(v){return fmtS(v);}}},x:{grid:{color:gc2},ticks:{maxTicksLimit:15}}}}});

/* ── Detail table ── */
var tb2=document.getElementById('projection-tbody');tb2.textContent='';
for(var py=1;py<=years;py++){
var tr=document.createElement('tr');
var tdY=document.createElement('td');tdY.textContent=cy+py;tr.appendChild(tdY);
var tdC=document.createElement('td');tdC.textContent=fmt(cumC[py]);tr.appendChild(tdC);
var tdR=document.createElement('td');tdR.textContent=fmt(totals[py]-cumC[py]);tr.appendChild(tdR);
var tdT=document.createElement('td');tdT.textContent=fmt(totals[py]);tdT.style.fontWeight='700';tr.appendChild(tdT);
var tdV=document.createElement('td');tdV.textContent=fmt(totals[py]/Math.pow(1+infl,py));tdV.style.color='var(--text-muted)';tr.appendChild(tdV);
tb2.appendChild(tr);
}
}

/* ── Projection Events ── */
function renderProjEvents(){
var c=document.getElementById('proj-events-list');if(!c)return;c.textContent='';
var empty=document.getElementById('proj-events-empty');
if(empty)empty.style.display=state.projEvents.length?'none':'block';
var cy=new Date().getFullYear();

state.projEvents.forEach(function(ev,i){
var row=document.createElement('div');row.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg-primary);margin-bottom:8px';

var info=document.createElement('div');
var title=document.createElement('div');title.style.cssText='font-weight:700;font-size:14px';
var invName=ev.investmentId==='all'?'Tous les placements':state.investments.find(function(inv){return inv.id===ev.investmentId;})||{};
title.textContent=(invName.name||'Tous')+' → '+fmt(ev.monthlyAmount)+'/mois';
info.appendChild(title);
var sub=document.createElement('div');sub.style.cssText='font-size:12px;color:var(--text-muted)';
sub.textContent='A partir de '+ev.year+(ev.note?' — '+ev.note:'');
info.appendChild(sub);row.appendChild(info);

var del=document.createElement('button');del.className='remove-btn';del.textContent='\u2715';
(function(idx){del.onclick=function(){popupConfirm('Supprimer','Supprimer cet evenement?',function(){pushUndo();state.projEvents.splice(idx,1);renderAll();});};})(i);
row.appendChild(del);c.appendChild(row);
});
}

function addProjEvent(){
var cy=new Date().getFullYear();
/* Build a modal-like popup with the event form */
var ov=document.getElementById('popup-overlay');
var container=document.getElementById('popup-actions').parentNode;
document.getElementById('popup-title').textContent='Ajouter un evenement';
document.getElementById('popup-message').textContent='';

var form=document.createElement('div');form.style.cssText='text-align:left;margin-bottom:16px';

/* Investment select */
var fg1=document.createElement('div');fg1.className='form-group';fg1.style.marginBottom='12px';
var lb1=document.createElement('label');lb1.textContent='Placement concerne';fg1.appendChild(lb1);
var sel=document.createElement('select');sel.id='proj-ev-inv';sel.style.cssText='width:100%;padding:10px;border:1px solid var(--border);border-radius:8px;background:var(--bg-primary);color:var(--text-primary)';
state.investments.forEach(function(inv){var o=document.createElement('option');o.value=inv.id;o.textContent=inv.name;sel.appendChild(o);});
fg1.appendChild(sel);form.appendChild(fg1);

/* Year */
var fg2=document.createElement('div');fg2.className='form-group';fg2.style.marginBottom='12px';
var lb2=document.createElement('label');lb2.textContent='A partir de quelle annee';fg2.appendChild(lb2);
var inp2=document.createElement('input');inp2.type='number';inp2.id='proj-ev-year';inp2.value=cy+5;inp2.min=cy;inp2.max=cy+50;inp2.style.cssText='width:100%;padding:10px;border:1px solid var(--border);border-radius:8px;background:var(--bg-primary);color:var(--text-primary)';
fg2.appendChild(inp2);form.appendChild(fg2);

/* Monthly amount */
var fg3=document.createElement('div');fg3.className='form-group';fg3.style.marginBottom='12px';
var lb3=document.createElement('label');lb3.textContent='Nouveau montant mensuel ($)';fg3.appendChild(lb3);
var inp3=document.createElement('input');inp3.type='number';inp3.id='proj-ev-amount';inp3.placeholder='700';inp3.min='0';inp3.style.cssText='width:100%;padding:10px;border:1px solid var(--border);border-radius:8px;background:var(--bg-primary);color:var(--text-primary)';
fg3.appendChild(inp3);form.appendChild(fg3);

/* Note */
var fg4=document.createElement('div');fg4.className='form-group';
var lb4=document.createElement('label');lb4.textContent='Note (optionnel)';fg4.appendChild(lb4);
var inp4=document.createElement('input');inp4.type='text';inp4.id='proj-ev-note';inp4.placeholder='Ex: Augmentation salariale';inp4.style.cssText='width:100%;padding:10px;border:1px solid var(--border);border-radius:8px;background:var(--bg-primary);color:var(--text-primary)';
fg4.appendChild(inp4);form.appendChild(fg4);

document.getElementById('popup-message').textContent='';
document.getElementById('popup-message').appendChild(form);

var acts=document.getElementById('popup-actions');acts.textContent='';
var cancelBtn=document.createElement('button');cancelBtn.className='btn btn-outline';cancelBtn.textContent='Annuler';cancelBtn.onclick=function(){ov.classList.remove('active');};acts.appendChild(cancelBtn);
var addBtn=document.createElement('button');addBtn.className='btn btn-primary';addBtn.textContent='Ajouter';addBtn.onclick=function(){
pushUndo();
state.projEvents.push({
investmentId:document.getElementById('proj-ev-inv').value,
year:parseInt(document.getElementById('proj-ev-year').value)||cy+5,
monthlyAmount:clampMin0(document.getElementById('proj-ev-amount').value),
note:document.getElementById('proj-ev-note').value.trim()
});
state.projEvents.sort(function(a,b){return a.year-b.year;});
ov.classList.remove('active');renderAll();
};acts.appendChild(addBtn);
ov.classList.add('active');
}

/* Simulators */
function showSimTab(tab,btn){['retraite','hypotheque','fire','epargne'].forEach(function(t){var el=document.getElementById('sim-'+t);if(el)el.style.display=t===tab?'':'none';});var tabs=btn.parentNode.children;for(var i=0;i<tabs.length;i++)tabs[i].classList.remove('active');btn.classList.add('active');var calcMap={retraite:calcRetraite,hypotheque:calcHyp,fire:calcFIRE,epargne:calcEpargne};if(calcMap[tab])try{calcMap[tab]();}catch(e){}}
function calcRetraite(){var age=parseInt(document.getElementById('sim-ret-age').value)||30;var retAge=parseInt(document.getElementById('sim-ret-retire').value)||65;var life=parseInt(document.getElementById('sim-ret-life').value)||90;var current=parseFloat(document.getElementById('sim-ret-current').value)||0;var rrq=parseFloat(document.getElementById('sim-ret-rrq').value)||0;var psv=parseFloat(document.getElementById('sim-ret-psv').value)||0;var expenses=parseFloat(document.getElementById('sim-ret-exp').value)||0;var rate=(parseFloat(document.getElementById('sim-ret-rate').value)||6)/100;var infl=(parseFloat(document.getElementById('sim-ret-infl').value)||2)/100;
var yrs=Math.max(retAge-age,0),yrsRet=Math.max(life-retAge,0);var monthlyInv=totalInv()/12;
var accum=current;for(var y=0;y<yrs;y++)accum=accum*(1+rate)+monthlyInv*12;
var govInc=(rrq+psv)*12;var annualNeed=expenses*12*Math.pow(1+infl,yrs);var gap=annualNeed-govInc;var realR=rate-infl;
var needed=gap>0&&realR>0?gap*(1-Math.pow(1+realR,-yrsRet))/realR:gap*yrsRet;
var surplus=accum-needed;
var contribReq=0;if(needed>current&&yrs>0&&rate>0){var fvCurrent=current*Math.pow(1+rate,yrs);var shortfall=needed-fvCurrent;if(shortfall>0){contribReq=shortfall*rate/(Math.pow(1+rate,yrs)-1)/12;}}
var revenuMensuel=accum>0&&realR>0?accum*realR/(1-Math.pow(1+realR,-yrsRet))/12:accum/(yrsRet*12||1);
var r=document.getElementById('sim-ret-results');r.textContent='';
var g=document.createElement('div');g.className='sim-result-grid';
[['Capital projete a la retraite',fmtS(accum),'color:var(--accent)'],['Capital necessaire',fmtS(needed),''],[(surplus>=0?'Surplus':'Deficit'),fmtS(Math.abs(surplus)),surplus>=0?'color:var(--success)':'color:var(--danger)'],['Contribution mensuelle requise',fmt(contribReq),'color:var(--accent)'],['Age de retraite',retAge+' ans',''],['Duree de la retraite',yrsRet+' ans',''],['Revenu gouv./mois (RRQ+PSV)',fmt(rrq+psv),'color:var(--success)'],['Depenses mensuelles ajustees',fmt(annualNeed/12),''],['Revenu mensuel projete',fmt(revenuMensuel+rrq+psv),'color:var(--accent)']].forEach(function(item){var d=document.createElement('div');d.className='sim-result-item';var l=document.createElement('div');l.className='sim-result-label';l.textContent=item[0];var v=document.createElement('div');v.className='sim-result-value';v.textContent=item[1];if(item[2])v.style.cssText=item[2];d.appendChild(l);d.appendChild(v);g.appendChild(d);});
r.appendChild(g);
var msg=document.createElement('div');msg.className='alert '+(surplus>=0?'alert-success':'alert-danger');msg.style.marginTop='12px';msg.textContent=surplus>=0?'En bonne voie! Surplus projete de '+fmtS(surplus)+' a la retraite.':'Il manque '+fmtS(Math.abs(surplus))+'. Epargnez '+fmt(contribReq)+'/mois pour combler l\'ecart.';r.appendChild(msg);}
function calcHyp(){var price=parseFloat(document.getElementById('sim-hyp-price').value)||0;var down=parseFloat(document.getElementById('sim-hyp-down').value)||0;var rate=(parseFloat(document.getElementById('sim-hyp-rate').value)||5)/100;var amort=parseInt(document.getElementById('sim-hyp-amort').value)||25;var freq=parseInt(document.getElementById('sim-hyp-freq').value)||12;var taxes=parseFloat(document.getElementById('sim-hyp-taxes').value)||0;
var downPct=price>0?down/price*100:0;var mortgage=price-down;
var schl=0;if(downPct<20&&downPct>=5){schl=mortgage*(downPct<10?0.04:downPct<15?0.031:0.028);}
var total=mortgage+schl;var rpp=rate/freq;var n=amort*freq;
var pay=rpp>0?total*rpp/(1-Math.pow(1+rpp,-n)):total/n;
var totalPaid=pay*n;var totalInt=totalPaid-total;var monthly=pay*(freq/12)+taxes/12;
var r=document.getElementById('sim-hyp-results');r.textContent='';
var g=document.createElement('div');g.className='sim-result-grid';
[['Mise de fonds',fmtS(down)+' ('+fmtP(downPct)+')','color:var(--accent)'],['Hypotheque',fmtS(total),''],schl>0?['SCHL',fmtS(schl),'color:var(--warning)']:null,['Paiement',fmt(pay),'color:var(--danger)'],['Cout mensuel',fmt(monthly),'color:var(--danger)'],['Interet total',fmtS(totalInt),'color:var(--danger)']].forEach(function(item){if(!item)return;var d=document.createElement('div');d.className='sim-result-item';var l=document.createElement('div');l.className='sim-result-label';l.textContent=item[0];var v=document.createElement('div');v.className='sim-result-value';v.textContent=item[1];if(item[2])v.style.cssText=item[2];d.appendChild(l);d.appendChild(v);g.appendChild(d);});
r.appendChild(g);if(downPct<20){var w=document.createElement('div');w.className='alert alert-warning';w.style.marginTop='12px';w.textContent='Mise de fonds < 20%: SCHL de '+fmtS(schl)+' ajoutee.';r.appendChild(w);}}
function calcFIRE(){var expenses=parseFloat(document.getElementById('sim-fire-exp').value)||0;var current=parseFloat(document.getElementById('sim-fire-current').value)||0;var annual=parseFloat(document.getElementById('sim-fire-annual').value)||0;var rate=(parseFloat(document.getElementById('sim-fire-rate').value)||7)/100;var wr=(parseFloat(document.getElementById('sim-fire-wr').value)||4)/100;
var fireNum=wr>0?expenses/wr:0;var years=0;if(annual>0&&fireNum>current){var acc=current;for(var y=1;y<=100;y++){acc=acc*(1+rate)+annual;if(acc>=fireNum){years=y;break;}}}
var firePct=fireNum>0?Math.min(current/fireNum*100,100):0;
var profileAge=getProfileAge()||30;var ageFire=years>0?profileAge+years:0;
var revenuPassifAnnuel=current*wr;var revenuPassifMensuel=revenuPassifAnnuel/12;
var r=document.getElementById('sim-fire-results');r.textContent='';
var g=document.createElement('div');g.className='sim-result-grid';
[['Nombre FIRE (objectif)',fmtS(fireNum),'color:var(--accent)'],years>0?['Annees pour atteindre FIRE',years+' ans','color:var(--success)']:['Annees pour atteindre FIRE',firePct>=100?'Atteint!':'--','color:'+(firePct>=100?'var(--success)':'var(--text-muted)')],ageFire>0?['Age FIRE atteint',ageFire+' ans','color:var(--success)']:['Age FIRE atteint',firePct>=100?'Deja atteint!':'--','color:'+(firePct>=100?'var(--success)':'var(--text-muted)')],['Progression actuelle',fmtP(firePct),firePct>=100?'color:var(--success)':'color:var(--accent)'],['Revenu passif annuel potentiel',fmtS(revenuPassifAnnuel),'color:var(--success)'],['Revenu passif mensuel potentiel',fmt(revenuPassifMensuel),'color:var(--success)'],['Lean FIRE (60% depenses)',fmtS(expenses*0.6/(wr||0.04)),'color:var(--text-muted)'],['Fat FIRE (150% depenses)',fmtS(expenses*1.5/(wr||0.04)),'color:var(--text-muted)']].forEach(function(item){if(!item)return;var d=document.createElement('div');d.className='sim-result-item';var l=document.createElement('div');l.className='sim-result-label';l.textContent=item[0];var v=document.createElement('div');v.className='sim-result-value';v.textContent=item[1];if(item[2])v.style.cssText=item[2];d.appendChild(l);d.appendChild(v);g.appendChild(d);});
r.appendChild(g);
var bar=document.createElement('div');bar.className='progress-bar';bar.style.cssText='margin-top:16px;height:16px';var fill=document.createElement('div');fill.className='progress-segment';fill.style.cssText='width:'+firePct+'%;background:linear-gradient(90deg,var(--accent),var(--success))';bar.appendChild(fill);r.appendChild(bar);
var pctLabel=document.createElement('div');pctLabel.style.cssText='text-align:center;font-size:12px;color:var(--text-muted);margin-top:6px';pctLabel.textContent=fmtP(firePct)+' de l\'objectif FIRE atteint';r.appendChild(pctLabel);}
function calcEpargne(){var init=parseFloat(document.getElementById('sim-sav-init').value)||0;var monthly=parseFloat(document.getElementById('sim-sav-monthly').value)||0;var rate=(parseFloat(document.getElementById('sim-sav-rate').value)||6)/100;var years=parseInt(document.getElementById('sim-sav-years').value)||20;
var mr=rate/12,n=years*12;var fv=init*Math.pow(1+mr,n)+monthly*(mr>0?(Math.pow(1+mr,n)-1)/mr:n);var contrib=init+monthly*n;
var r=document.getElementById('sim-sav-results');r.textContent='';
var g=document.createElement('div');g.className='sim-result-grid';
var intPct=fv>0?(fv-contrib)/fv*100:0;
[['Valeur finale',fmtS(fv),'color:var(--success)'],['Contributions totales',fmtS(contrib),'color:var(--accent)'],['Interets gagnes',fmtS(fv-contrib),'color:var(--success)'],['Part des interets',fmtP(intPct),'color:var(--success)'],['Rendement total',fmtP(contrib>0?(fv-contrib)/contrib*100:0),'']].forEach(function(item){var d=document.createElement('div');d.className='sim-result-item';var l=document.createElement('div');l.className='sim-result-label';l.textContent=item[0];var v=document.createElement('div');v.className='sim-result-value';v.textContent=item[1];if(item[2])v.style.cssText=item[2];d.appendChild(l);d.appendChild(v);g.appendChild(d);});r.appendChild(g);
var labels=[],dC=[],dT=[];for(var y=0;y<=years;y++){labels.push(y);var ny=y*12;dT.push(init*Math.pow(1+mr,ny)+monthly*(mr>0?(Math.pow(1+mr,ny)-1)/mr:ny));dC.push(init+monthly*ny);}
mkChart('chart-sim-savings',{type:'line',data:{labels:labels,datasets:[{label:'Total',data:dT,borderColor:'#22c55e',backgroundColor:'rgba(34,197,94,.1)',fill:true,tension:.3,pointRadius:0},{label:'Contributions',data:dC,borderColor:'#3b82f6',borderDash:[5,5],fill:false,tension:0,pointRadius:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{ticks:{callback:function(v){return fmtS(v)}}},x:{title:{display:true,text:'Annees'}}}}});}

/* Calculators */
function calcRealCost(){var p=parseFloat(document.getElementById('calc-cost-price').value)||0;var h=parseFloat(document.getElementById('calc-cost-hourly').value)||0;var r=document.getElementById('calc-cost-result');if(p<=0||h<=0){r.style.display='none';return;}r.style.display='';r.textContent='';
var v=document.createElement('div');v.className='calc-result-value';v.textContent=(p/h).toFixed(1)+' heures';r.appendChild(v);
var l=document.createElement('div');l.className='calc-result-label';l.textContent='de travail ('+(p/h/8).toFixed(1)+' jours)';r.appendChild(l);}
function calcCI(){var p=parseFloat(document.getElementById('calc-ci-p').value)||0;var rate=(parseFloat(document.getElementById('calc-ci-r').value)||0)/100;var y=parseInt(document.getElementById('calc-ci-y').value)||0;var m=parseFloat(document.getElementById('calc-ci-m').value)||0;var r=document.getElementById('calc-ci-result');if(y<=0){r.style.display='none';return;}var mr=rate/12,n=y*12;var fv=p*Math.pow(1+mr,n)+m*(mr>0?(Math.pow(1+mr,n)-1)/mr:n);r.style.display='';r.textContent='';
var v=document.createElement('div');v.className='calc-result-value';v.textContent=fmtS(fv);r.appendChild(v);
var l=document.createElement('div');l.className='calc-result-label';l.textContent='dans '+y+' ans (interets: '+fmtS(fv-p-m*n)+')';r.appendChild(l);}
function calcSplit(){var t=parseFloat(document.getElementById('calc-split-total').value)||0;var p=parseInt(document.getElementById('calc-split-p').value)||1;var tip=(parseFloat(document.getElementById('calc-split-tip').value)||0)/100;var r=document.getElementById('calc-split-result');if(t<=0){r.style.display='none';return;}var total=t*(1+tip);r.style.display='';r.textContent='';
var v=document.createElement('div');v.className='calc-result-value';v.textContent=fmt(total/p);r.appendChild(v);
var l=document.createElement('div');l.className='calc-result-label';l.textContent='par personne (total: '+fmt(total)+')';r.appendChild(l);}
function calcR72(){var rate=parseFloat(document.getElementById('calc-72-r').value)||0;var r=document.getElementById('calc-72-result');if(rate<=0){r.style.display='none';return;}r.style.display='';r.textContent='';
var v=document.createElement('div');v.className='calc-result-value';v.textContent=(72/rate).toFixed(1)+' ans';r.appendChild(v);
var l=document.createElement('div');l.className='calc-result-label';l.textContent='pour doubler a '+rate+'%';r.appendChild(l);}

/* Modals */
function openModal(type){document.getElementById('modal-type').value=type;document.getElementById('modal-title').textContent=type==='expense'?'Depense':'Placement';document.getElementById('modal-name').value='';document.getElementById('modal-desc').value='';document.getElementById('modal-group').value='';document.getElementById('modal-rate').value='5';document.getElementById('modal-limit').value='0';document.getElementById('modal-lifelimit').value='0';document.getElementById('modal-maxyears').value='0';var isI=type==='investment';['modal-rate-group','modal-limit-group','modal-lifelimit-group','modal-maxyears-group'].forEach(function(id){document.getElementById(id).style.display=isI?'block':'none';});
var list=type==='expense'?state.expenses:state.investments;var gs=[];list.forEach(function(c){if(c.group&&gs.indexOf(c.group)<0)gs.push(c.group);});
var dl=document.getElementById('group-suggestions');dl.textContent='';gs.forEach(function(g){var o=document.createElement('option');o.value=g;dl.appendChild(o);});
document.getElementById('modal-overlay').classList.add('active');document.getElementById('modal-name').focus();}
function closeModal(){document.getElementById('modal-overlay').classList.remove('active');}
function confirmModal(){pushUndo();var type=document.getElementById('modal-type').value;var name=document.getElementById('modal-name').value.trim();if(!name)return;var item={id:gid(type==='expense'?'e':'i'),name:name,desc:document.getElementById('modal-desc').value.trim(),group:document.getElementById('modal-group').value.trim(),amount:0,isPercent:false,frequency:'12'};
if(type==='investment'){item.rate=parseFloat(document.getElementById('modal-rate').value)||5;item.limit=parseFloat(document.getElementById('modal-limit').value)||0;item.lifetimeLimit=parseFloat(document.getElementById('modal-lifelimit').value)||0;item.maxYears=parseFloat(document.getElementById('modal-maxyears').value)||0;}
var tl=type==='expense'?state.expenses:state.investments;var group=item.group,ii=-1;if(group)for(var g=tl.length-1;g>=0;g--)if(tl[g].group===group){ii=g+1;break;}
if(ii>=0)tl.splice(ii,0,item);else tl.push(item);closeModal();renderAll();}

/* Search */
function openSearch(){document.getElementById('search-overlay').classList.add('active');var inp=document.getElementById('search-input');inp.value='';inp.focus();doSearch('');}
function closeSearch(){document.getElementById('search-overlay').classList.remove('active');}
function doSearch(q){var c=document.getElementById('search-results');c.textContent='';q=q.toLowerCase().trim();
var items=[{l:'Tableau de bord',s:'dashboard'},{l:'Revenus',s:'revenus'},{l:'Depenses',s:'depenses'},{l:'Placements',s:'placements'},{l:'Objectifs',s:'objectifs'},{l:'Valeur nette',s:'valeur-nette'},{l:'Dettes',s:'dettes'},{l:'Graphiques',s:'graphiques'},{l:'Projections',s:'projections'},{l:'Simulateurs',s:'simulateurs'},{l:'Transactions',s:'transactions'},{l:'Calculateurs',s:'calculateurs'},{l:'Mon profil',s:'profil'},{l:'Parametres',s:'parametres'}];
state.expenses.forEach(function(e){items.push({l:e.name+(e.group?' ('+e.group+')':''),s:'depenses'});});
state.investments.forEach(function(inv){items.push({l:inv.name,s:'placements'});});
items.filter(function(it){return !q||it.l.toLowerCase().indexOf(q)>=0;}).slice(0,10).forEach(function(r){var d=document.createElement('div');d.className='search-result-item';d.textContent=r.l;d.onclick=function(){closeSearch();showSection(r.s);};c.appendChild(d);});}

/* Nav */
function showSection(n){document.querySelectorAll('.section').forEach(function(s){s.classList.remove('active');});document.querySelectorAll('.nav-item').forEach(function(s){s.classList.remove('active');});var s=document.getElementById('section-'+n);if(s)s.classList.add('active');var nv=document.querySelector('.nav-item[data-section="'+n+'"]');if(nv)nv.classList.add('active');document.getElementById('sidebar').classList.remove('open');document.getElementById('overlay').classList.remove('active');if(['graphiques','projections','dashboard'].indexOf(n)>=0)setTimeout(function(){renderCharts();renderProjection();},50);if(n==='dettes')setTimeout(renderDebtChart,50);if(n==='valeur-nette')setTimeout(renderNetWorth,50);if(n==='profil')setTimeout(renderProfil,50);}
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open');document.getElementById('overlay').classList.toggle('active');}
function toggleTheme(){state.theme=state.theme==='dark'?'light':'dark';applyTheme();renderCharts();renderProjection();save();}
function applyTheme(){document.documentElement.setAttribute('data-theme',state.theme);var b=document.getElementById('theme-btn');if(b)b.textContent=state.theme==='dark'?'Theme clair':'Theme sombre';}

function exportData(){var p=getProfiles(),pn='budget';p.forEach(function(pr){if(pr.id===currentProfileId)pn=pr.name.replace(/[^a-zA-Z0-9\u00C0-\u024F]/g,'-');});var b=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});var u=URL.createObjectURL(b);var a=document.createElement('a');a.href=u;a.download=pn+'-'+new Date().toISOString().slice(0,10)+'.json';a.click();URL.revokeObjectURL(u);}

/* ═══════════════════════════════════════════════════
   TRANSFER VIA QR CODE / CODE
   ═══════════════════════════════════════════════════ */

/* Compress state to a short transfer code */
function generateTransferCode(){
var data=JSON.stringify(state);
/* Base64 encode */
var encoded=btoa(unescape(encodeURIComponent(data)));
return encoded;
}

function applyTransferCode(code){
try{
var decoded=decodeURIComponent(escape(atob(code)));
var data=JSON.parse(decoded);
if(!data.expenses||!data.investments){popupAlert('Erreur','Code de transfert invalide.');return false;}
pushUndo();
state=Object.assign(defaultState(),data);
migrateInvestments();
applyTheme();
save();renderAll();updateProfileDisplay();
return true;
}catch(e){popupAlert('Erreur','Code de transfert invalide ou corrompu.');return false;}
}

/* QR Code generator (pure JS, no library) */
function generateQRCode(text,size){
/* We use a Google Charts API for simplicity — generates a QR image URL */
return 'https://api.qrserver.com/v1/create-qr-code/?size='+size+'x'+size+'&data='+encodeURIComponent(text);
}

function showTransferQR(){
if(!currentProfileId){popupAlert('Erreur','Aucun profil actif.');return;}
var code=generateTransferCode();

/* If data is too big for QR (>2000 chars URL), use code-only method */
var baseUrl=window.location.href.split('?')[0].split('#')[0];
var transferUrl=baseUrl+'?transfer='+encodeURIComponent(code);
var tooBigForQR=transferUrl.length>2500;

var ov=document.getElementById('popup-overlay');
document.getElementById('popup-title').textContent='Transferer vers un autre appareil';
var msg=document.getElementById('popup-message');
msg.textContent='';

if(!tooBigForQR){
/* Show QR code */
var desc=document.createElement('p');desc.style.cssText='font-size:13px;color:var(--text-secondary);margin-bottom:16px';
desc.textContent='Scannez ce QR code avec votre autre appareil pour transferer votre profil. Ou copiez le lien ci-dessous.';
msg.appendChild(desc);

var qrImg=document.createElement('img');
qrImg.src=generateQRCode(transferUrl,250);
qrImg.alt='QR Code de transfert';
qrImg.style.cssText='display:block;margin:0 auto 16px;border-radius:8px;background:white;padding:8px';
msg.appendChild(qrImg);

var linkBox=document.createElement('input');linkBox.type='text';linkBox.value=transferUrl;linkBox.readOnly=true;
linkBox.style.cssText='width:100%;padding:10px;border:1px solid var(--border);border-radius:8px;font-size:11px;background:var(--bg-primary);color:var(--text-primary);margin-bottom:8px';
linkBox.onclick=function(){this.select();};
msg.appendChild(linkBox);

var copyBtn=document.createElement('button');copyBtn.className='btn btn-sm btn-outline';copyBtn.textContent='Copier le lien';copyBtn.style.cssText='width:100%;justify-content:center';
copyBtn.onclick=function(){navigator.clipboard.writeText(transferUrl).then(function(){copyBtn.textContent='Copie!';setTimeout(function(){copyBtn.textContent='Copier le lien';},2000);});};
msg.appendChild(copyBtn);
}else{
/* Data too large for QR — use manual code copy */
var desc2=document.createElement('p');desc2.style.cssText='font-size:13px;color:var(--text-secondary);margin-bottom:12px';
desc2.textContent='Votre profil est trop volumineux pour un QR code. Copiez le code ci-dessous et collez-le sur votre autre appareil via "Recevoir un transfert".';
msg.appendChild(desc2);

var codeBox=document.createElement('textarea');codeBox.value=code;codeBox.readOnly=true;
codeBox.style.cssText='width:100%;height:80px;padding:10px;border:1px solid var(--border);border-radius:8px;font-size:10px;font-family:monospace;background:var(--bg-primary);color:var(--text-primary);resize:none;margin-bottom:8px';
codeBox.onclick=function(){this.select();};
msg.appendChild(codeBox);

var copyBtn2=document.createElement('button');copyBtn2.className='btn btn-sm btn-primary';copyBtn2.textContent='Copier le code';copyBtn2.style.cssText='width:100%;justify-content:center';
copyBtn2.onclick=function(){navigator.clipboard.writeText(code).then(function(){copyBtn2.textContent='Copie!';setTimeout(function(){copyBtn2.textContent='Copier le code';},2000);});};
msg.appendChild(copyBtn2);
}

var acts=document.getElementById('popup-actions');acts.textContent='';
var closeBtn=document.createElement('button');closeBtn.className='btn btn-outline';closeBtn.textContent='Fermer';closeBtn.onclick=function(){ov.classList.remove('active');};
acts.appendChild(closeBtn);
ov.classList.add('active');
}

function showReceiveTransfer(){
var ov=document.getElementById('popup-overlay');
document.getElementById('popup-title').textContent='Recevoir un transfert';
var msg=document.getElementById('popup-message');msg.textContent='';

var desc=document.createElement('p');desc.style.cssText='font-size:13px;color:var(--text-secondary);margin-bottom:12px';
desc.textContent='Collez le code de transfert que vous avez copie depuis votre autre appareil :';
msg.appendChild(desc);

var codeInput=document.createElement('textarea');codeInput.id='receive-transfer-code';
codeInput.placeholder='Collez le code ici...';
codeInput.style.cssText='width:100%;height:80px;padding:10px;border:1px solid var(--border);border-radius:8px;font-size:12px;font-family:monospace;background:var(--bg-primary);color:var(--text-primary);resize:none';
msg.appendChild(codeInput);

var acts=document.getElementById('popup-actions');acts.textContent='';
var cancelBtn=document.createElement('button');cancelBtn.className='btn btn-outline';cancelBtn.textContent='Annuler';cancelBtn.onclick=function(){ov.classList.remove('active');};acts.appendChild(cancelBtn);
var applyBtn=document.createElement('button');applyBtn.className='btn btn-primary';applyBtn.textContent='Importer le profil';applyBtn.onclick=function(){
var code=document.getElementById('receive-transfer-code').value.trim();
if(!code){return;}
ov.classList.remove('active');
if(applyTransferCode(code)){
popupAlert('Transfert reussi','Votre profil a ete importe avec succes!');
}
};acts.appendChild(applyBtn);
ov.classList.add('active');
setTimeout(function(){codeInput.focus();},100);
}

/* Check URL for transfer parameter on load */
function checkTransferURL(){
var params=new URLSearchParams(window.location.search);
var transfer=params.get('transfer');
if(transfer){
/* Remove the parameter from URL */
window.history.replaceState({},'',window.location.pathname);
/* Apply the transfer */
setTimeout(function(){
popupConfirm('Transfert de profil','Un profil a ete partage avec vous. Voulez-vous l\'importer?',function(){
applyTransferCode(decodeURIComponent(transfer));
});
},500);
}
}
function exportCSV(){var rows=[['Categorie','Groupe','Annuel','Mensuel','Type']];state.expenses.forEach(function(e){var a=catAnnual(e);if(a>0)rows.push([e.name,e.group,a.toFixed(2),(a/12).toFixed(2),'Depense']);});state.investments.forEach(function(inv){var a=catAnnual(inv);if(a>0)rows.push([inv.name,'Placement',a.toFixed(2),(a/12).toFixed(2),'Placement']);});var csv=rows.map(function(r){return r.map(function(c){return'"'+String(c).replace(/"/g,'""')+'"';}).join(',');}).join('\n');var b=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});var u=URL.createObjectURL(b);var a=document.createElement('a');a.href=u;a.download='budget-'+new Date().toISOString().slice(0,10)+'.csv';a.click();URL.revokeObjectURL(u);}
function importData(ev){var f=ev.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){try{var d=JSON.parse(e.target.result);if(!d.expenses||!d.investments){popupAlert('Erreur','Fichier invalide.');return;}pushUndo();state=Object.assign(defaultState(),d);migrateInvestments();applyTheme();renderAll();popupAlert('Succes','Importe.');}catch(err){popupAlert('Erreur','JSON invalide.');}};r.readAsText(f);ev.target.value='';}
function resetAll(){popupConfirm('Reinitialiser','Tout effacer?',function(){pushUndo();var t=state.theme;state=defaultState();state.theme=t;save();renderAll();});}

/* Force non-negative for number inputs */
function clampMin0(v){return Math.max(parseFloat(v)||0,0);}

/* Listeners */
function setupListeners(){
var sn=document.getElementById('salary-net');if(sn){sn.min='0';sn.oninput=function(){state.salaryNet=clampMin0(this.value);debouncedRecalc();};}
var sf=document.getElementById('salary-frequency');if(sf)sf.onchange=function(){state.salaryFrequency=this.value;debouncedRecalc();};
var pr=document.getElementById('province');if(pr)pr.onchange=function(){state.province=this.value;save();};
var py=document.getElementById('proj-years');if(py)py.oninput=function(){state.projYears=Math.max(parseInt(this.value)||1,1);debouncedRecalc();};
var pi=document.getElementById('proj-inflation');if(pi)pi.oninput=function(){state.projInflation=clampMin0(this.value);debouncedRecalc();};
var ef=document.getElementById('emergency-fund');if(ef){ef.min='0';ef.oninput=function(){state.emergencyFund=clampMin0(this.value);debouncedRecalc();};}
var tfm=document.getElementById('tx-filter-month');if(tfm)tfm.value=new Date().toISOString().slice(0,7);

/* Add min=0 to all number inputs in dynamic content */
document.querySelectorAll('input[type="number"]').forEach(function(inp){
if(!inp.hasAttribute('min'))inp.min='0';
});
}

/* Global keyboard */
document.addEventListener('keydown',function(e){
if(e.key==='Escape'){['modal-overlay','goal-modal-overlay','debt-modal-overlay','tx-modal-overlay','nw-modal-overlay'].forEach(function(id){var el=document.getElementById(id);if(el)el.classList.remove('active');});closeSearch();}
if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();openSearch();}
if((e.ctrlKey||e.metaKey)&&e.key==='z'&&!e.shiftKey){e.preventDefault();undo();}
if((e.ctrlKey||e.metaKey)&&(e.key==='y'||(e.key==='z'&&e.shiftKey))){e.preventDefault();redo();}
if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();save();popupAlert('OK','Sauvegarde!');}
if((e.ctrlKey||e.metaKey)&&e.key==='e'){e.preventDefault();exportData();}
var sections=['dashboard','revenus','depenses','placements','objectifs','valeur-nette','dettes','graphiques','projections','simulateurs','transactions','calculateurs','profil','parametres'];
if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&!['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName)){var num=parseInt(e.key);if(num>=1&&num<=9&&sections[num-1])showSection(sections[num-1]);}
});
/* Profile name input removed — wizard handles creation now */

/* ═══════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════ */
(function init(){
addModals();
var migratedId=migrateOldData();
applyTheme();
var savedId=migratedId||localStorage.getItem('budget-current-profile');
var profiles=getProfiles();
if(savedId&&profiles.some(function(p){return p.id===savedId;}))selectProfile(savedId);
else if(profiles.length===1)selectProfile(profiles[0].id);
else showProfileScreen();
/* Check for transfer via URL */
checkTransferURL();
/* Register service worker for PWA/offline */
if('serviceWorker' in navigator){
navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(function(reg){reg.update();}).catch(function(){});
navigator.serviceWorker.addEventListener('message',function(e){if(e.data&&e.data.type==='SW_UPDATED'){window.location.reload();}});
}
})();
