"use strict";(self["webpackChunkrocf_eval"]=self["webpackChunkrocf_eval"]||[]).push([[679],{4984:(e,a,t)=>{t.d(a,{Z:()=>r});const n={getDiagnosisFromScore:e=>e<15?"Dementia":e>=15&&e<30?"MCI":e>=30?"Normal":"",getLabelFromScore(e){let a="unknown";switch(e){case 0:a="omitted";break;case 1:a="distorted";break;case 2:a="misplaced";break;case 3:a="correct";break;default:a="unknown"}return a},hasHistory(){return window.history.length>2},sum(e){let a=0;if(!e.length)return a;for(let t=e.length;t--;)a+=e[t];return a}},r=n},8679:(e,a,t)=>{t.r(a),t.d(a,{default:()=>g});var n=t(3673);function r(e,a,t,r,o,s){const c=(0,n.up)("secondary-header"),u=(0,n.up)("router-view"),d=(0,n.up)("q-page-container"),l=(0,n.up)("q-layout");return(0,n.wg)(),(0,n.j4)(l,{view:"lHh Lpr lFf"},{default:(0,n.w5)((()=>[(0,n.Wm)(c),(0,n.Wm)(d,{ref:"pageC"},{default:(0,n.w5)((()=>[(0,n.Wm)(u)])),_:1},512)])),_:1})}t(71);var o=t(8880);(0,n.dD)("data-v-6ae51720");const s=(0,n._)("span",{class:"back-label"},"Back",-1);function c(e,a,t,r,c,u){const d=(0,n.up)("q-icon"),l=(0,n.up)("q-header");return(0,n.wg)(),(0,n.j4)(l,{class:"secondary-header"},{default:(0,n.w5)((()=>[(0,n._)("div",{class:"back-button",onClick:a[0]||(a[0]=(0,o.iM)(((...e)=>u.handleBackButton&&u.handleBackButton(...e)),["stop"]))},[(0,n.Wm)(d,{name:"arrow_back_ios",class:"back-icon"}),s])])),_:1})}(0,n.Cn)();var u=t(4984);const d={methods:{handleBackButton(){u.Z.hasHistory()?this.$router.go(-1):this.$router.push("/")}}};var l=t(3812),i=t(4554),h=t(7518),p=t.n(h);d.render=c,d.__scopeId="data-v-6ae51720";const k=d;p()(d,"components",{QHeader:l.Z,QIcon:i.Z});const f={data(){return{results:null,info:"",rocfs:[]}},components:{SecondaryHeader:k}};var m=t(3066),w=t(2652),b=t(4379);f.render=r,f.__scopeId="data-v-4158c9ea";const g=f;p()(f,"components",{QLayout:m.Z,QPageContainer:w.Z,QPage:b.Z})}}]);