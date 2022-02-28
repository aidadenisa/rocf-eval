"use strict";(self["webpackChunkrocf_eval"]=self["webpackChunkrocf_eval"]||[]).push([[424],{1390:(e,t,i)=>{i.d(t,{Z:()=>u});var a=i(3673),n=i(2323);function o(e,t,i,o,r,s){const l=(0,a.up)("q-icon");return(0,a.wg)(),(0,a.iD)("button",{class:(0,n.C_)(["rocf-button",`variant-${i.variant}`,{"display-block":i.block},`size-${i.size}`])},["left"==i.iconPosition?((0,a.wg)(),(0,a.j4)(l,{key:0,name:i.icon},null,8,["name"])):(0,a.kq)("",!0),(0,a._)("span",null,[(0,a.WI)(e.$slots,"default",{},void 0,!0)]),"right"==i.iconPosition?((0,a.wg)(),(0,a.j4)(l,{key:1,name:i.icon},null,8,["name"])):(0,a.kq)("",!0)],2)}const r={props:{icon:{type:String},iconPosition:{type:String},variant:{type:String,default:"primary"},block:{type:Boolean,default:!0},size:{type:String,default:"large"}}};var s=i(4554),l=i(7518),c=i.n(l);r.render=o,r.__scopeId="data-v-4ab461c7";const u=r;c()(r,"components",{QIcon:s.Z})},3715:(e,t,i)=>{i.d(t,{Z:()=>P});i(71);var a=i(3673),n=i(2323);(0,a.dD)("data-v-2a4a6adb");const o={class:"subtitle"},r={class:"title"},s={key:0,class:"info-icon"},l=(0,a.Uk)("Close"),c=["innerHTML"];function u(e,t,i,u,p,d){const h=(0,a.up)("q-icon"),g=(0,a.up)("q-space"),m=(0,a.up)("q-tooltip"),w=(0,a.up)("q-btn"),f=(0,a.up)("q-bar"),v=(0,a.up)("q-card-section"),b=(0,a.up)("q-card"),_=(0,a.up)("q-dialog"),k=(0,a.Q2)("close-popup");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("div",{class:"subpage-heading",onClick:t[0]||(t[0]=(...e)=>d.openInfoDialog&&d.openInfoDialog(...e))},[(0,a._)("div",o,(0,n.zw)(i.subtitle),1),(0,a._)("h2",r,[(0,a.Uk)((0,n.zw)(i.title)+" ",1),i.info?((0,a.wg)(),(0,a.iD)("span",s,[(0,a.Wm)(h,{name:"info"})])):(0,a.kq)("",!0)])]),(0,a.Wm)(_,{modelValue:p.showInfoDialog,"onUpdate:modelValue":t[1]||(t[1]=e=>p.showInfoDialog=e),persistent:""},{default:(0,a.w5)((()=>[(0,a.Wm)(b,null,{default:(0,a.w5)((()=>[(0,a.Wm)(f,null,{default:(0,a.w5)((()=>[(0,a._)("div",null,(0,n.zw)(d.titleTxt),1),(0,a.Wm)(g),(0,a.wy)((0,a.Wm)(w,{dense:"",flat:"",icon:"close"},{default:(0,a.w5)((()=>[(0,a.Wm)(m,{class:"bg-white text-primary"},{default:(0,a.w5)((()=>[l])),_:1})])),_:1},512),[[k]])])),_:1}),(0,a.Wm)(v,null,{default:(0,a.w5)((()=>[(0,a._)("div",{innerHTML:i.info},null,8,c)])),_:1})])),_:1})])),_:1},8,["modelValue"])],64)}(0,a.Cn)();const p={props:{subtitle:{type:String},title:{type:String},info:{type:String}},data(){return{showInfoDialog:!1}},methods:{openInfoDialog(){this.info&&(this.showInfoDialog=!0)}},computed:{titleTxt(){return this.$t("subpageHeading_dialogTitle")}}};var d=i(4554),h=i(9815),g=i(151),m=i(846),w=i(2025),f=i(9400),v=i(5528),b=i(5589),_=i(677),k=i(7518),C=i.n(k);p.render=u,p.__scopeId="data-v-2a4a6adb";const P=p;C()(p,"components",{QIcon:d.Z,QDialog:h.Z,QCard:g.Z,QBar:m.Z,QSpace:w.Z,QBtn:f.Z,QTooltip:v.Z,QCardSection:b.Z}),C()(p,"directives",{ClosePopup:_.Z})},5424:(e,t,i)=>{i.r(t),i.d(t,{default:()=>h});var a=i(3673),n=i(2323);const o={class:"take-picture-btn"};function r(e,t,i,r,s,l){const c=(0,a.up)("subpage-heading"),u=(0,a.up)("rocf-button"),p=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(p,{class:"camera-page flex column justify-between"},{default:(0,a.w5)((()=>[(0,a.Wm)(c,{subtitle:l.subtitleTxt,title:l.titleTxt},null,8,["subtitle","title"]),(0,a._)("div",o,[(0,a.Wm)(u,{icon:"chevron_right","icon-position":"right",onClick:l.takePicture},{default:(0,a.w5)((()=>[(0,a.Uk)((0,n.zw)(l.takePictureTxt),1)])),_:1},8,["onClick"])])])),_:1})}var s=i(3715),l=i(1390);const c={components:{SubpageHeading:s.Z,RocfButton:l.Z},name:"Camera",data(){return{imageSrc:null,info:"",cameraOptionsBarHeight:120,paperRatio:148.5/210}},beforeMount(){let e={x:0,y:.5*window.screen.height-this.cameraOptionsBarHeight,width:window.screen.width,height:parseInt(window.screen.width*this.paperRatio),camera:CameraPreview.CAMERA_DIRECTION.BACK,toBack:!1,tapPhoto:!0,tapFocus:!1,previewDrag:!1,storeToFile:!1,disableExifHeaderStripping:!1};CameraPreview.setPreviewSize({width:window.screen.width,height:parseInt(window.screen.width*this.paperRatio)}),CameraPreview.startCamera(e),CameraPreview.show()},methods:{hide(){CameraPreview.hide()},takePicture(){CameraPreview.takePicture({quality:100,width:2016,height:1512},(e=>{this.imageSrc=`data:image/png;base64,${e}`,this.$store.dispatch("fetchImage",this.imageSrc),this.$router.push("adjust-photo")})),CameraPreview.hide()},getImageDimensions(e){var t=new Image;t.onload=function(){console.log(t.width+", "+t.height)},t.src=e}},beforeUnmount(){CameraPreview.stopCamera()},computed:{titleTxt(){return this.$t("camera_title")},subtitleTxt(){return this.$t("camera_subtitle")},infoTxt(){return this.$t("camera_info")},takePictureTxt(){return this.$t("camera_takePictureBtn")}}};var u=i(4379),p=i(7518),d=i.n(p);c.render=r;const h=c;d()(c,"components",{QPage:u.Z})}}]);