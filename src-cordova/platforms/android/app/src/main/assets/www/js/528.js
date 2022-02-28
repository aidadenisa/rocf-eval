(self["webpackChunkrocf_eval"]=self["webpackChunkrocf_eval"]||[]).push([[528],{7734:(t,i,e)=>{"use strict";e.d(i,{Z:()=>o});const n="https://api.rocf.aida.blog",s={post:async(t,i)=>{const e=localStorage.getItem("token")||"";let s=await fetch(n+t,{method:"POST",headers:{"Content-Type":"application/json","x-access-token":e},body:JSON.stringify(i)}).then((t=>t.json()));return s},get:async t=>{const i=localStorage.getItem("token")||"";let e=await fetch(n+t,{method:"GET",crossDomain:!0,headers:{"x-access-token":i}}).then((t=>t.json()));return e},put:async(t,i)=>{const e=localStorage.getItem("token")||"";let s=await fetch(n+t,{method:"PUT",headers:{"Content-Type":"application/json","x-access-token":e},crossDomain:!0,body:JSON.stringify(i)}).then((t=>t.json()));return s},getImage:async t=>{const i=localStorage.getItem("token")||"";let e=await fetch(n+t,{method:"GET",crossDomain:!0,headers:{"x-access-token":i}}),s=await e.blob();return s}},o=s},1390:(t,i,e)=>{"use strict";e.d(i,{Z:()=>c});var n=e(3673),s=e(2323);function o(t,i,e,o,a,r){const h=(0,n.up)("q-icon");return(0,n.wg)(),(0,n.iD)("button",{class:(0,s.C_)(["rocf-button",`variant-${e.variant}`,{"display-block":e.block},`size-${e.size}`])},["left"==e.iconPosition?((0,n.wg)(),(0,n.j4)(h,{key:0,name:e.icon},null,8,["name"])):(0,n.kq)("",!0),(0,n._)("span",null,[(0,n.WI)(t.$slots,"default",{},void 0,!0)]),"right"==e.iconPosition?((0,n.wg)(),(0,n.j4)(h,{key:1,name:e.icon},null,8,["name"])):(0,n.kq)("",!0)],2)}const a={props:{icon:{type:String},iconPosition:{type:String},variant:{type:String,default:"primary"},block:{type:Boolean,default:!0},size:{type:String,default:"large"}}};var r=e(4554),h=e(7518),l=e.n(h);a.render=o,a.__scopeId="data-v-4ab461c7";const c=a;l()(a,"components",{QIcon:r.Z})},3715:(t,i,e)=>{"use strict";e.d(i,{Z:()=>b});e(71);var n=e(3673),s=e(2323);(0,n.dD)("data-v-2a4a6adb");const o={class:"subtitle"},a={class:"title"},r={key:0,class:"info-icon"},h=(0,n.Uk)("Close"),l=["innerHTML"];function c(t,i,e,c,g,d){const u=(0,n.up)("q-icon"),m=(0,n.up)("q-space"),p=(0,n.up)("q-tooltip"),w=(0,n.up)("q-btn"),f=(0,n.up)("q-bar"),v=(0,n.up)("q-card-section"),P=(0,n.up)("q-card"),y=(0,n.up)("q-dialog"),x=(0,n.Q2)("close-popup");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",{class:"subpage-heading",onClick:i[0]||(i[0]=(...t)=>d.openInfoDialog&&d.openInfoDialog(...t))},[(0,n._)("div",o,(0,s.zw)(e.subtitle),1),(0,n._)("h2",a,[(0,n.Uk)((0,s.zw)(e.title)+" ",1),e.info?((0,n.wg)(),(0,n.iD)("span",r,[(0,n.Wm)(u,{name:"info"})])):(0,n.kq)("",!0)])]),(0,n.Wm)(y,{modelValue:g.showInfoDialog,"onUpdate:modelValue":i[1]||(i[1]=t=>g.showInfoDialog=t),persistent:""},{default:(0,n.w5)((()=>[(0,n.Wm)(P,null,{default:(0,n.w5)((()=>[(0,n.Wm)(f,null,{default:(0,n.w5)((()=>[(0,n._)("div",null,(0,s.zw)(d.titleTxt),1),(0,n.Wm)(m),(0,n.wy)((0,n.Wm)(w,{dense:"",flat:"",icon:"close"},{default:(0,n.w5)((()=>[(0,n.Wm)(p,{class:"bg-white text-primary"},{default:(0,n.w5)((()=>[h])),_:1})])),_:1},512),[[x]])])),_:1}),(0,n.Wm)(v,null,{default:(0,n.w5)((()=>[(0,n._)("div",{innerHTML:e.info},null,8,l)])),_:1})])),_:1})])),_:1},8,["modelValue"])],64)}(0,n.Cn)();const g={props:{subtitle:{type:String},title:{type:String},info:{type:String}},data(){return{showInfoDialog:!1}},methods:{openInfoDialog(){this.info&&(this.showInfoDialog=!0)}},computed:{titleTxt(){return this.$t("subpageHeading_dialogTitle")}}};var d=e(4554),u=e(9815),m=e(151),p=e(846),w=e(2025),f=e(9400),v=e(5528),P=e(5589),y=e(677),x=e(7518),I=e.n(x);g.render=c,g.__scopeId="data-v-2a4a6adb";const b=g;I()(g,"components",{QIcon:d.Z,QDialog:u.Z,QCard:m.Z,QBar:p.Z,QSpace:w.Z,QBtn:f.Z,QTooltip:v.Z,QCardSection:P.Z}),I()(g,"directives",{ClosePopup:y.Z})},7334:(t,i,e)=>{"use strict";e.r(i),e.d(i,{default:()=>W});e(71);var n=e(3673),s=e(8880),o=e(2323),a=e(4850),r=e.n(a);(0,n.dD)("data-v-76d0d176");const h={class:"points-button-bar flex row justify-end"},l=(0,n._)("img",{src:r()},null,-1),c=[l],g=(0,n._)("canvas",{id:"overlay"},null,-1),d=[g],u=(0,n._)("div",null,"Order of Points",-1),m=(0,n.Uk)("Close"),p=(0,n._)("img",{src:r()},null,-1),w={class:"save-points-btn"};function f(t,i,e,a,r,l){const g=(0,n.up)("subpage-heading"),f=(0,n.up)("rocf-button"),v=(0,n.up)("q-space"),P=(0,n.up)("q-tooltip"),y=(0,n.up)("q-btn"),x=(0,n.up)("q-bar"),I=(0,n.up)("q-card-section"),b=(0,n.up)("q-card"),_=(0,n.up)("q-dialog"),k=(0,n.up)("q-page"),S=(0,n.Q2)("close-popup");return(0,n.wg)(),(0,n.j4)(k,{class:"flex column justify-between",onClick:i[3]||(i[3]=(0,s.iM)((()=>{}),["prevent"]))},{default:(0,n.w5)((()=>[(0,n.Wm)(g,{title:l.titleTxt,info:l.infoTxt},null,8,["title","info"]),(0,n._)("div",h,[(0,n._)("div",{class:"example-points col-4",onClick:i[0]||(i[0]=(...t)=>l.zoomPointsImage&&l.zoomPointsImage(...t))},c),(0,n.Wm)(f,{variant:"secondary",class:"reset-points-btn col-4",onClick:l.resetPoints,block:!1},{default:(0,n.w5)((()=>[(0,n.Uk)((0,o.zw)(l.resetTxt),1)])),_:1},8,["onClick"]),(0,n.Wm)(f,{variant:"accent",class:"col-4",icon:"undo",iconPosition:"left",onClick:l.undoPoint,block:!1},{default:(0,n.w5)((()=>[(0,n.Uk)((0,o.zw)(l.undoTxt),1)])),_:1},8,["onClick"])]),(0,n._)("div",{class:"canvas-container",onClick:i[1]||(i[1]=(0,s.iM)((()=>{}),["prevent"]))},d),(0,n.Wm)(_,{modelValue:r.showImageDialog,"onUpdate:modelValue":i[2]||(i[2]=t=>r.showImageDialog=t),persistent:""},{default:(0,n.w5)((()=>[(0,n.Wm)(b,null,{default:(0,n.w5)((()=>[(0,n.Wm)(x,null,{default:(0,n.w5)((()=>[u,(0,n.Wm)(v),(0,n.wy)((0,n.Wm)(y,{dense:"",flat:"",icon:"close"},{default:(0,n.w5)((()=>[(0,n.Wm)(P,{class:"bg-white text-primary"},{default:(0,n.w5)((()=>[m])),_:1})])),_:1},512),[[S]])])),_:1}),(0,n.Wm)(I,null,{default:(0,n.w5)((()=>[p])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,n._)("div",w,[(0,n.Wm)(f,{icon:"chevron_right","icon-position":"right",onClick:l.savePoints},{default:(0,n.w5)((()=>[(0,n.Uk)((0,o.zw)(l.extractTxt),1)])),_:1},8,["onClick"])])])),_:1})}(0,n.Cn)();e(7768);var v=e(7734),P=e(3715),y=e(1390);const x={name:"Camera",components:{SubpageHeading:P.Z,RocfButton:y.Z},data(){return{info:"",cameraOptionsBarHeight:120,imageSrc:"",aspectRatio:1,cropper:{},preview:"",showPoints:!1,zoom:1,canvas:{},baseImage:{},currentPointInOrigin:{},moveStartingPoint:{},dragging:!1,context:{},distance:0,dimensions:{width:0,height:0},radius:20,points:[],result:"",showImageDialog:!1}},beforeMount(){this.imageSrc=this.$store.state.image},mounted(){this.setupCanvas()},methods:{setupCanvas(){this.canvas=document.getElementById("overlay"),this.context=this.canvas.getContext("2d"),this.context.imageSmoothingEnabled=!1,this.baseImage=new Image,this.baseImage.src=this.imageSrc,this.canvas.width=window.screen.width*window.devicePixelRatio,this.canvas.height=.6*window.screen.height*window.devicePixelRatio,console.log("canvas dim: ",this.canvas.width,this.canvas.height),this.aspectRatio=this.canvas.width/this.canvas.height,this.currentPointInOrigin={x:-this.canvas.width/4,y:0},this.canvas.addEventListener("touchstart",this.touchStartHandler),this.canvas.addEventListener("touchmove",this.moveHandler),this.canvas.addEventListener("touchend",this.touchEndHandler),this.baseImage.onload=()=>{this.dimensions={width:1500,height:1e3},this.drawImage()}},touchStartHandler(t){t.preventDefault(),t=t.originalEvent||t,1==t.touches.length?(this.dragging=!0,this.settingPoint=!0,this.zooming=!1,console.log("drag"),this.moveStartingPoint={layerX:t.layerX,layerY:t.layerY}):2==t.touches.length&&(this.zooming=!0,this.dragging=!1,console.log("zoom"),console.log(t),this.distance=this.distanceBetween2Touches(t.touches[0],t.touches[0]))},moveHandler(t){t.preventDefault(),this.settingPoint=!1,console.log("move"),1==t.touches.length&&this.dragging&&this.handleDrag(t),2==t.touches.length&&this.zooming&&this.handleZoom(t),this.drawImage()},touchEndHandler(t){t.preventDefault(),this.zooming=!1,this.dragging=!1,this.settingPoint&&this.setPoint(t)},handleDrag(t){this.currentPointInOrigin.x=this.currentPointInOrigin.x-(this.moveStartingPoint.layerX-t.layerX),this.currentPointInOrigin.y=this.currentPointInOrigin.y-(this.moveStartingPoint.layerY-t.layerY),this.currentPointInOrigin.x=this.currentPointInOrigin.x>0?0:this.currentPointInOrigin.x,this.currentPointInOrigin.x=-this.currentPointInOrigin.x+this.canvas.width>this.dimensions.width?-(this.dimensions.width-this.canvas.width):this.currentPointInOrigin.x,this.currentPointInOrigin.y=this.currentPointInOrigin.y>0?0:this.currentPointInOrigin.y,this.currentPointInOrigin.y=-this.currentPointInOrigin.y+this.canvas.height>this.dimensions.height?-(this.dimensions.height-this.canvas.height):this.currentPointInOrigin.y,this.info=[-this.currentPointInOrigin.x,-this.currentPointInOrigin.y],this.moveStartingPoint={layerX:t.layerX,layerY:t.layerY}},handleZoom(t){let i=this.distanceBetween2Touches(t.touches[0],t.touches[1]);const e=.1;i>this.distance?(console.log("zoom in"),this.zoom+=e):(console.log("zoom out"),this.zoom-=e),this.zoom<1&&(this.zoom=1),this.zoom>4&&(this.zoom=4),this.dimensions={width:1500*this.zoom,height:1e3*this.zoom},this.distance=i},setPoint(t){console.log(t);let i=this.canvas.width/this.canvas.clientWidth;if(alert(`${t.layerX*i}, ${t.layerY*i} `),this.points.length>=5)return void alert(this.manyPointsTxt);let e={x:t.layerX*i,y:t.layerY*i};this.context.beginPath(),this.context.arc(e.x,e.y,this.radius*this.zoom,0,2*Math.PI),this.context.fillStyle="blue",this.context.fill();let n={x:(this.canvas.width*(t.layerX/this.canvas.clientWidth)-this.currentPointInOrigin.x)/this.zoom,y:(this.canvas.height*(t.layerY/this.canvas.clientHeight)-this.currentPointInOrigin.y)/this.zoom};this.info=[n.x,n.y],console.log(n),this.points.push(n)},drawImage(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.drawImage(this.baseImage,this.currentPointInOrigin.x,this.currentPointInOrigin.y,this.dimensions.width,this.dimensions.height),this.drawPoints()},drawPoints(){if(this.points.length)for(let t=0;t<this.points.length;t++){let i={x:this.points[t].x*this.zoom+this.currentPointInOrigin.x,y:this.points[t].y*this.zoom+this.currentPointInOrigin.y};this.context.beginPath(),this.context.arc(i.x,i.y,this.radius*this.zoom,0,2*Math.PI),this.context.fillStyle="blue",this.context.fill()}},resetPoints(){this.points=[],this.drawImage()},distanceBetween2Touches(t,i){return Math.sqrt(Math.pow(t.clientX-i.clientX,2)+Math.pow(t.clientY-i.clientY,2))},savePoints(){5===this.points.length?(this.info="I call this",this.getHomography()):alert(`${this.fewPoints1Txt} ${this.points.length} ${this.fewPoints2Txt}`)},async getHomography(){this.info="this got called";let t={points:[]};for(let s=0;s<this.points.length;s++)t.points.push([this.points[s].x,this.points[s].y]);const i=this.imageSrc.indexOf("data:image/png;base64,");t.imageb64=i>-1?this.imageSrc.slice("data:image/png;base64,".length):this.imageSrc,t.gamma=.7;let e=await v.Z.post("/preprocessing",t);const n=e.image.replaceAll("'","").slice(1);this.result=`data:image/png;base64,${n}`,this.$store.dispatch("fetchPoints",t.points),this.$store.dispatch("fetchGammaImage",this.result),this.$router.push("/evaluate/threshold")},undoPoint(){this.points.pop(),this.drawImage()},zoomPointsImage(){this.showImageDialog=!0}},computed:{titleTxt(){return this.$t("setPoints_title")},infoTxt(){return this.$t("setPoints_info")},resetTxt(){return this.$t("setPoints_reset")},undoTxt(){return this.$t("setPoints_undo")},extractTxt(){return this.$t("setPoints_extract")},fewPoints1Txt(){return this.$t("setPoints_fewPoints1")},fewPoints2Txt(){return this.$t("setPoints_fewPoints2")},manyPointsTxt(){return this.$t("setPoints_manyPoints")}}};var I=e(4379),b=e(9815),_=e(151),k=e(846),S=e(2025),z=e(9400),O=e(5528),T=e(5589),C=e(677),Z=e(7518),D=e.n(Z);x.render=f,x.__scopeId="data-v-76d0d176";const W=x;D()(x,"components",{QPage:I.Z,QDialog:b.Z,QCard:_.Z,QBar:k.Z,QSpace:S.Z,QBtn:z.Z,QTooltip:O.Z,QCardSection:T.Z}),D()(x,"directives",{ClosePopup:C.Z})},4850:(t,i,e)=>{t.exports=e.p+"img/example-points.png"}}]);