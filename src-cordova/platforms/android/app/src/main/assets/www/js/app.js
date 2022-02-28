(()=>{"use strict";var e={5605:(e,o,t)=>{t(5363),t(71);var n=t(8880),a=t(6866),r=t(3673);function i(e,o,t,n,a,i){const s=(0,r.up)("router-view");return(0,r.wg)(),(0,r.j4)(s)}var s=t(51);const l=(0,r.aZ)({name:"App",beforeMount(){this.getLoggedInUserInfo()},methods:{getLoggedInUserInfo(){const e=localStorage.getItem("token");if(e){const o=(0,s.Z)(e);this.$store.dispatch("fetchNewUserInfo",o)}}}});l.render=i;const c=l;var d=t(4584),u=t(7083),g=t(9582);const h=[{path:"/",component:()=>Promise.all([t.e(736),t.e(543)]).then(t.bind(t,4543)),children:[{path:"",component:()=>Promise.all([t.e(736),t.e(762)]).then(t.bind(t,2762)),meta:{requireAuth:!0}},{path:"/register",component:()=>Promise.all([t.e(736),t.e(644)]).then(t.bind(t,6644))},{path:"/login",name:"Login",component:()=>Promise.all([t.e(736),t.e(288)]).then(t.bind(t,7288))}]},{path:"/evaluate",component:()=>Promise.all([t.e(736),t.e(679)]).then(t.bind(t,8679)),children:[{path:"patient",component:()=>Promise.all([t.e(736),t.e(691)]).then(t.bind(t,5691))},{path:"camera",component:()=>Promise.all([t.e(736),t.e(424)]).then(t.bind(t,5424))},{path:"adjust-photo",component:()=>Promise.all([t.e(736),t.e(147)]).then(t.bind(t,9147))},{path:"set-points",component:()=>Promise.all([t.e(736),t.e(528)]).then(t.bind(t,7334))},{path:"threshold",component:()=>Promise.all([t.e(736),t.e(0)]).then(t.bind(t,4e3))},{path:"rocf/:id",component:()=>Promise.all([t.e(736),t.e(15)]).then(t.bind(t,2015))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([t.e(736),t.e(193)]).then(t.bind(t,2193))}],f=h,m=(0,u.BC)((function(){const e=g.r5,o=(0,g.p7)({scrollBehavior:()=>({left:0,top:0}),routes:f,history:e("")});return o.beforeEach(((e,o,t)=>{let n=localStorage.getItem("token");e.meta.requireAuth&&!n?t({name:"Login",query:{next:e.fullPath}}):t()})),o}));async function p(e,o){const n="function"===typeof d["default"]?await(0,d["default"])({}):d["default"],{storeKey:r}=await Promise.resolve().then(t.bind(t,4584)),i="function"===typeof m?await m({store:n}):m;n.$router=i;const s=e(c);return s.use(a.Z,o),{app:s,store:n,storeKey:r,router:i}}const _={config:{}},v="";async function b({app:e,router:o,store:t,storeKey:n},a){let r=!1;const i=e=>{r=!0;const t=Object(e)===e?o.resolve(e).fullPath:e;window.location.href=t},s=window.location.href.replace(window.location.origin,"");for(let c=0;!1===r&&c<a.length;c++)try{await a[c]({app:e,router:o,store:t,ssrContext:null,redirect:i,urlPath:s,publicPath:v})}catch(l){return l&&l.url?void(window.location.href=l.url):void console.error("[Quasar] boot error:",l)}!0!==r&&(e.use(o),e.use(t,n),document.addEventListener("deviceready",(()=>{e.config.globalProperties.$q.cordova=window.cordova,e.mount("#q-app")}),!1))}p(n.ri,_).then((e=>Promise.all([Promise.resolve().then(t.bind(t,9719))]).then((o=>{const t=o.map((e=>e.default)).filter((e=>"function"===typeof e));b(e,t)}))))},9719:(e,o,t)=>{t.r(o),t.d(o,{default:()=>s});var n=t(5175);const a={login_registerLink:"You don't have an account? Register here!",login_loginBtn:"Login",login_fieldEmptyAlert:"Please fill both email and password. Thank you!",login_errorAlert:"There has been an error logging you in. Please try again!",register_name:"Name",register_loginLink:"You already have an account? Login here!",register_registerBtn:"Create new account",register_passMismatchAlert:"The passwords do not match. Please insert them again!",register_missingInfoAlert:"Please fill in all the data needed. Thank you!",register_errorAlert:"There has been an error creating your account. Please try again!",dashboard_greeting:"Good Day",dashboard_doctorTitle:"Dr.",dashboard_previousROCF:"Previous ROCF Evaluations",dashboard_noROCF:"There are no ROCFs evaluations yet.",dashboard_rocfInProgressAlert:"We are analysing a ROCF... It should be ready in a few minutes!",dashboard_rocfReady1Alert:"The ROCF for patient",dashboard_rocfReady2Alert:"is ready!",newRocf_evaluate:"Evaluate new ROCF",newRocf_takePhoto:"Take a photo of the drawing",rocfCard_patient:"Patient",patientCode_subtitle:"New ROCF Evaluation",patientCode_title:"Please provide the patient's code",patientCode_scanButton:"Scan Image",camera_title:"Take a photo of the patient’s drawing",camera_subtitle:"New ROCF Evaluation",camera_info:"Take a picture with the drawing of the patient in the center of the camera preview. You don't need to photograph also the Rey-Osterrieth model.",camera_takePictureBtn:"Take a picture",adjustImage_subtitle:"Adjust photo by zooming or dragging",adjustImage_title:"Do you want to use this photo?",adjustImage_takePhotoBtn:" Yes, use this photo",setPoints_title:"Set the 5 reference points",setPoints_info:"You need to indicate on the drawing which are the 5 external points, starting with the corner of the outer rectangle on the top left, then moving clockwise to the corner of the rectangle on the top right, following with the top corner of the rhomb, then the bottom right corner of the outer rectangle, and then the bottom left corner of the outer rectangle. The points are also represened in the model present in the page.",setPoints_reset:"Reset points",setPoints_undo:"Undo",setPoints_extract:"Extract Drawing",setPoints_fewPoints1:"There are only",setPoints_fewPoints2:"points set. You should set 5 points!",setPoints_manyPoints:"You should set only 5 points!",threshold_subtitle:"New ROCF Evaluation",threshold_title:"Move the threshold to better extract the drawing",threshold_info:"The algorithm needs to use a pure black and white drawing in order to identify and score the patterns. You can move the thresholds to see how the drawing changes and choose the best version. The more clear the lines, the better. <br><br> If you do not see your drawing anymore, you probably set the points in a wrong order. Go back to set the 5 reference points again.",threshold_lessDetails:"Less details",threshold_moreDetails:"More details",threshold_darker:"Darker",threshold_lighter:"Lighter",threshold_analyseBtn:"Analyse the drawing",rocfResult_title:"ROCF Patterns evaluation",rocfResult_patientCode:"Patient Code",rocfResult_score:"Score",rocfResult_diagnosis:"Diagnosis",rocfResult_prediction:"Prediction",rocfResult_changeDiagBtn:"Change Diagnosis",rocfResult_chooseDiagBtn:"Choose diagnosis",rocfResult_normal:"Normal",rocfResult_mci:"MCI",rocfResult_dementia:"Dementia",rocfResult_backToPredBtn:"Back to predictions",rocfResult_patterns:"Patterns",rocfResult_saveRevisionBtn:"Save revision",rocfResult_adjustRegion:"Adjust pattern region",rocfResult_changeRegion:"Change region of pattern",rocfResult_saveRegion:"Save new region",rocfResult_saved:"The ROCF evaluation was saved successfully!",rocfResult_newROI:"Add new area",rocfPattern_pattern:"Pattern",rocfPattern_patternIs:"The pattern is",rocfPattern_score:"Score",subpageHeading_dialogTitle:"More information",mainLayout_about:"About the app",mainLayout_logout:"Logout",langSwitch_change:"Passa a"},r={login_registerLink:"Non hai un account? Registrati qui!",login_loginBtn:"Login",login_fieldEmptyAlert:"Inserisci la tua email e password. Grazie!",login_errorAlert:"Abbiamo riscontrato un errore durante il login. Prova di nuovo.",register_name:"Nome e Cognome",register_loginLink:"Hai già un account? Accedi qui!",register_registerBtn:"Crea nuovo account",register_passMismatchAlert:"Le password non corrispondono. Prova a inserirle di nuovo.",register_missingInfoAlert:"Assicurati di aver inserito tutti i dati richiesti. Grazie!",register_errorAlert:"Abbiamo riscontrato un errore durante la creazione dell'account. Prova di nuovo.",dashboard_greeting:"Buongiorno",dashboard_doctorTitle:"Dott.",dashboard_previousROCF:"Valutazioni ROCF precedenti",dashboard_noROCF:"Non sono presenti ancora valutazioni ROCF.",dashboard_rocfInProgressAlert:"Stiamo analizzando la ROCF... Potrebbe richiedere alcuni minuti.",dashboard_rocfReady1Alert:"La ROCF per il paziente",dashboard_rocfReady2Alert:"è pronta.",newRocf_evaluate:"Valuta una nuova ROCF",newRocf_takePhoto:"Fai una foto al disegno",rocfCard_patient:"Paziente",patientCode_subtitle:"Nuova valutazione ROCF",patientCode_title:"Prego inserire il codice del paziente",patientCode_scanButton:"Fai la foto",camera_title:"Fai una foto al disegno del paziente",camera_subtitle:"Nuova valutazione ROCF",camera_info:"Fai una foto al disegno del paziente, posizionandolo al centro. Non è necessario fotografare anche il modello Rey-Osterrieth.",camera_takePictureBtn:"Fai la foto",adjustImage_subtitle:"Regola la foto spostando e zommando con le dita",adjustImage_title:"Vuoi usare questa foto?",adjustImage_takePhotoBtn:"Si, usa questa foto",setPoints_title:"Tocca i 5 punti di riferimento sulla foto",setPoints_info:"Devi indicare sul disegno quali sono i 5 punti esterni, partendo dall'angolo in alto a sinistra del rettangolo esterno e poi procedendo in senso orario all'angolo in alto a destra, poi sul vertice superiore del rombo, poi l'angolo destro del rettangolo esterno e infine l'angolo sinistro. I punti sono anche riportati nel modello presente nella pagina.",setPoints_reset:"Ripristina",setPoints_undo:"Undo",setPoints_extract:"Estrai disegno",setPoints_fewPoints1:"Ci sono solo",setPoints_fewPoints2:"punti impostati. Sono necessari 5 punti.",setPoints_manyPoints:"Devi impostare solo 5 punti.",threshold_subtitle:"Nuova valutazione ROCF",threshold_title:"Modifica gli indicatori per migliorare l'estrazione del disegno",threshold_info:"L'algoritmo necessita di un disegno in bianco e nero per identificare il punteggio e i pattern. Puoi muovere gli indicatori per migliorare l'estrazione del disegno. Più le linee sono definite meglio è. <br><br> Se non vedi più il disegno, probabilmente i punti di riferimento non sono stati inseriti nell'ordine corretto. Torna indietro per inserire nuovamente i 5 punti di riferimento.",threshold_lessDetails:"Meno dettagli",threshold_moreDetails:"Più dettagli",threshold_darker:"Più scuro",threshold_lighter:"Più chiaro",threshold_analyseBtn:"Analizza il disegno",rocfResult_title:"Valutazione dei pattern del ROCF",rocfResult_patientCode:"Codice Paziente",rocfResult_score:"Punteggio",rocfResult_diagnosis:"Diagnosi",rocfResult_prediction:"Predizione",rocfResult_changeDiagBtn:"Modifica la diagnosi",rocfResult_chooseDiagBtn:"Seleziona la diagnosi",rocfResult_normal:"Normale",rocfResult_mci:"MCI",rocfResult_dementia:"Demenza",rocfResult_backToPredBtn:"Torna alle predizioni",rocfResult_patterns:"Pattern",rocfResult_saveRevisionBtn:"Salva revisione",rocfResult_adjustRegion:"Correggi l'area del pattern",rocfResult_changeRegion:"Cambia l'area",rocfResult_saveRegion:"Salva la nuova area",rocfResult_saved:"La valutazione ROCF è stata salvata correttamente.",rocfResult_newROI:"Definisci nuova area",rocfPattern_pattern:"Pattern",rocfPattern_patternIs:"Il pattern è",rocfPattern_score:"Punteggio",subpageHeading_dialogTitle:"Più informazioni",mainLayout_about:"Info sull'app",mainLayout_logout:"Logout",langSwitch_change:"Go to"},i={"en-US":a,it:r},s=({app:e})=>{const o=(0,n.o)({locale:"en-US",messages:i});e.use(o)}},4584:(e,o,t)=>{t.r(o),t.d(o,{default:()=>a});var n=t(3617);async function a(){const e=(0,n.MT)({state:{image:"",points:[],patientCode:"",rocfEvaluations:[],gammaImage:"",user:{}},getters:{getROCF:e=>o=>e.rocfEvaluations.find((e=>e._id===o))},mutations:{newImage(e,o){e.image=o},newGammaImage(e,o){e.gammaImage=o},newPoints(e,o){e.points=o},newPatientCode(e,o){e.patientCode=o},newRocfEvaluations(e,o){e.rocfEvaluations=o},newRocfToArray(e,o){const t=e.rocfEvaluations.map((e=>e._id)).indexOf(o._id);e.rocfEvaluations[t]=o},newUser(e,o){e.user=o}},actions:{fetchImage({commit:e},o){console.log("i received a new image"),o?(console.log("good, commit"),e("newImage",o)):(console.log("not good, delete"),e("newImage",""))},fetchGammaImage({commit:e},o){console.log("i received a new gamma image"),o?(console.log("good, commit"),e("newGammaImage",o)):(console.log("not good, delete"),e("newGammaImage",""))},fetchPoints({commit:e},o){console.log("i received new points"),o?(console.log("good, commit"),e("newPoints",o)):(console.log("not good, delete"),e("newPoints",[]))},fetchPatientCode({commit:e},o){console.log("i received code"),o?(console.log("good, commit"),e("newPatientCode",o)):(console.log("not good, delete"),e("newPatientCode",""))},fetchNewRocfEvaluations({commit:e},o){console.log("i received rocfs"),o?(console.log("good, commit"),e("newRocfEvaluations",o)):(console.log("not good, delete"),e("newRocfEvaluations",[]))},fetchNewRocfToArray({commit:e},o){console.log("i received rocf"),o?(console.log("good, commit"),e("newRocfToArray",o)):console.log("not good, delete")},fetchNewUserInfo({commit:e},o){console.log("i received userInfo"),o?(console.log("good, commit"),e("newUser",o)):(console.log("not good, delete"),e("newUser",{}))}}});return e}}},o={};function t(n){var a=o[n];if(void 0!==a)return a.exports;var r=o[n]={exports:{}};return e[n].call(r.exports,r,r.exports,t),r.exports}t.m=e,(()=>{var e=[];t.O=(o,n,a,r)=>{if(!n){var i=1/0;for(d=0;d<e.length;d++){for(var[n,a,r]=e[d],s=!0,l=0;l<n.length;l++)(!1&r||i>=r)&&Object.keys(t.O).every((e=>t.O[e](n[l])))?n.splice(l--,1):(s=!1,r<i&&(i=r));if(s){e.splice(d--,1);var c=a();void 0!==c&&(o=c)}}return o}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[n,a,r]}})(),(()=>{t.n=e=>{var o=e&&e.__esModule?()=>e["default"]:()=>e;return t.d(o,{a:o}),o}})(),(()=>{t.d=(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})}})(),(()=>{t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce(((o,n)=>(t.f[n](e,o),o)),[]))})(),(()=>{t.u=e=>"js/"+e+".js"})(),(()=>{t.miniCssF=e=>"css/"+({143:"app",736:"vendor"}[e]||e)+".css"})(),(()=>{t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{t.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o)})(),(()=>{var e={},o="rocf-eval:";t.l=(n,a,r,i)=>{if(e[n])e[n].push(a);else{var s,l;if(void 0!==r)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==n||u.getAttribute("data-webpack")==o+r){s=u;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,t.nc&&s.setAttribute("nonce",t.nc),s.setAttribute("data-webpack",o+r),s.src=n),e[n]=[a];var g=(o,t)=>{s.onerror=s.onload=null,clearTimeout(h);var a=e[n];if(delete e[n],s.parentNode&&s.parentNode.removeChild(s),a&&a.forEach((e=>e(t))),o)return o(t)},h=setTimeout(g.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=g.bind(null,s.onerror),s.onload=g.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),(()=>{t.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{t.p=""})(),(()=>{var e=(e,o,t,n)=>{var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var r=r=>{if(a.onerror=a.onload=null,"load"===r.type)t();else{var i=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.href||o,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=s,a.parentNode.removeChild(a),n(l)}};return a.onerror=a.onload=r,a.href=o,document.head.appendChild(a),a},o=(e,o)=>{for(var t=document.getElementsByTagName("link"),n=0;n<t.length;n++){var a=t[n],r=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(r===e||r===o))return a}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){a=i[n],r=a.getAttribute("data-href");if(r===e||r===o)return a}},n=n=>new Promise(((a,r)=>{var i=t.miniCssF(n),s=t.p+i;if(o(i,s))return a();e(n,s,a,r)})),a={143:0};t.f.miniCss=(e,o)=>{var t={0:1,15:1,147:1,288:1,424:1,528:1,543:1,644:1,679:1,691:1,762:1};a[e]?o.push(a[e]):0!==a[e]&&t[e]&&o.push(a[e]=n(e).then((()=>{a[e]=0}),(o=>{throw delete a[e],o})))}})(),(()=>{var e={143:0};t.f.j=(o,n)=>{var a=t.o(e,o)?e[o]:void 0;if(0!==a)if(a)n.push(a[2]);else{var r=new Promise(((t,n)=>a=e[o]=[t,n]));n.push(a[2]=r);var i=t.p+t.u(o),s=new Error,l=n=>{if(t.o(e,o)&&(a=e[o],0!==a&&(e[o]=void 0),a)){var r=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;s.message="Loading chunk "+o+" failed.\n("+r+": "+i+")",s.name="ChunkLoadError",s.type=r,s.request=i,a[1](s)}};t.l(i,l,"chunk-"+o,o)}},t.O.j=o=>0===e[o];var o=(o,n)=>{var a,r,[i,s,l]=n,c=0;if(i.some((o=>0!==e[o]))){for(a in s)t.o(s,a)&&(t.m[a]=s[a]);if(l)var d=l(t)}for(o&&o(n);c<i.length;c++)r=i[c],t.o(e,r)&&e[r]&&e[r][0](),e[i[c]]=0;return t.O(d)},n=self["webpackChunkrocf_eval"]=self["webpackChunkrocf_eval"]||[];n.forEach(o.bind(null,0)),n.push=o.bind(null,n.push.bind(n))})();var n=t.O(void 0,[736],(()=>t(5605)));n=t.O(n)})();