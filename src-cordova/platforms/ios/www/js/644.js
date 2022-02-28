"use strict";(self["webpackChunkrocf_eval"]=self["webpackChunkrocf_eval"]||[]).push([[644],{7734:(e,t,a)=>{a.d(t,{Z:()=>i});const s="http://142.93.166.62:5001",n={post:async(e,t)=>{const a=localStorage.getItem("token")||"";let n=await fetch(s+e,{method:"POST",headers:{"Content-Type":"application/json","x-access-token":a},body:JSON.stringify(t)}).then((e=>e.json()));return n},get:async e=>{const t=localStorage.getItem("token")||"";let a=await fetch(s+e,{method:"GET",crossDomain:!0,headers:{"x-access-token":t}}).then((e=>e.json()));return a},put:async(e,t)=>{const a=localStorage.getItem("token")||"";let n=await fetch(s+e,{method:"PUT",headers:{"Content-Type":"application/json","x-access-token":a},crossDomain:!0,body:JSON.stringify(t)}).then((e=>e.json()));return n},getImage:async e=>{const t=localStorage.getItem("token")||"";let a=await fetch(s+e,{method:"GET",crossDomain:!0,headers:{"x-access-token":t}}),n=await a.blob();return n}},i=n},7649:(e,t,a)=>{a.d(t,{Z:()=>o});a(71);var s=a(3673),n=a(2323);function i(e,t,a,i,r,o){return(0,s.wg)(),(0,s.iD)("div",{class:"lang",onClick:t[0]||(t[0]=(...e)=>o.switchLanguage&&o.switchLanguage(...e))},(0,n.zw)(o.changeTxt)+" "+(0,n.zw)(r.otherLang.label),1)}const r={data(){return{languages:[{value:"en-US",label:"English"},{value:"it",label:"Italian"}],currentLang:"it",otherLang:{value:"en",label:"English"}}},methods:{switchLanguage(){this.languages[0].value==this.currentLang?(this.otherLang=this.languages[0],this.currentLang=this.languages[1].value):(this.otherLang=this.languages[1],this.currentLang=this.languages[0].value),this.$i18n.locale=this.currentLang}},beforeMount(){this.$i18n.locale=this.currentLang},computed:{changeTxt(){return this.$t("langSwitch_change")}}};r.render=i,r.__scopeId="data-v-09634304";const o=r},1390:(e,t,a)=>{a.d(t,{Z:()=>u});var s=a(3673),n=a(2323);function i(e,t,a,i,r,o){const l=(0,s.up)("q-icon");return(0,s.wg)(),(0,s.iD)("button",{class:(0,n.C_)(["rocf-button",`variant-${a.variant}`,{"display-block":a.block},`size-${a.size}`])},["left"==a.iconPosition?((0,s.wg)(),(0,s.j4)(l,{key:0,name:a.icon},null,8,["name"])):(0,s.kq)("",!0),(0,s._)("span",null,[(0,s.WI)(e.$slots,"default",{},void 0,!0)]),"right"==a.iconPosition?((0,s.wg)(),(0,s.j4)(l,{key:1,name:a.icon},null,8,["name"])):(0,s.kq)("",!0)],2)}const r={props:{icon:{type:String},iconPosition:{type:String},variant:{type:String,default:"primary"},block:{type:Boolean,default:!0},size:{type:String,default:"large"}}};var o=a(4554),l=a(7518),c=a.n(l);r.render=i,r.__scopeId="data-v-4ab461c7";const u=r;c()(r,"components",{QIcon:o.Z})},6644:(e,t,a)=>{a.r(t),a.d(t,{default:()=>S});var s=a(3673),n=a(8880),i=a(2323);(0,s.dD)("data-v-250c1436");const r=(0,s._)("div",{class:"logo"},[(0,s._)("h3",null," Evaluator "),(0,s._)("h2",null," ROCF ")],-1),o={class:"register-form flex column"},l={class:"field flex column"},c={class:"input-wrapper"},u={class:"field flex column"},g={class:"input-wrapper"},p=["placeholder"],d={class:"field flex column"},h={class:"input-wrapper"},m={class:"field flex column"},f={class:"input-wrapper"},w={class:"register-link"},v={class:"language"};function _(e,t,a,_,k,y){const x=(0,s.up)("router-link"),b=(0,s.up)("rocf-button"),T=(0,s.up)("lang-switch"),L=(0,s.up)("q-page");return(0,s.wg)(),(0,s.j4)(L,{class:"register-page flex column justify-center"},{default:(0,s.w5)((()=>[r,(0,s._)("div",o,[(0,s._)("div",l,[(0,s._)("div",c,[(0,s.wy)((0,s._)("input",{type:"email",id:"email","onUpdate:modelValue":t[0]||(t[0]=e=>k.email=e),placeholder:"Email",required:""},null,512),[[n.nr,k.email]])])]),(0,s._)("div",u,[(0,s._)("div",g,[(0,s.wy)((0,s._)("input",{id:"name","onUpdate:modelValue":t[1]||(t[1]=e=>k.name=e),placeholder:y.nameTxt,required:""},null,8,p),[[n.nr,k.name]])])]),(0,s._)("div",d,[(0,s._)("div",h,[(0,s.wy)((0,s._)("input",{type:"password",id:"pass1","onUpdate:modelValue":t[2]||(t[2]=e=>k.pass1=e),placeholder:"Password",required:""},null,512),[[n.nr,k.pass1]])])]),(0,s._)("div",m,[(0,s._)("div",f,[(0,s.wy)((0,s._)("input",{type:"password",id:"pass2","onUpdate:modelValue":t[3]||(t[3]=e=>k.pass2=e),placeholder:"Repeat password",required:""},null,512),[[n.nr,k.pass2]])])]),(0,s._)("div",w,[(0,s.Wm)(x,{to:"/login"},{default:(0,s.w5)((()=>[(0,s.Uk)((0,i.zw)(y.loginLinkTxt),1)])),_:1})]),(0,s.Wm)(b,{class:"submit-button",onClick:y.registerNewAccount},{default:(0,s.w5)((()=>[(0,s.Uk)((0,i.zw)(y.registerTxt),1)])),_:1},8,["onClick"])]),(0,s._)("div",v,[(0,s.Wm)(T)])])),_:1})}(0,s.Cn)();var k=a(1390),y=a(7649),x=a(7734);const b={data(){return{email:"",name:"",pass1:"",pass2:""}},components:{RocfButton:k.Z,LangSwitch:y.Z},methods:{async registerNewAccount(){if(this.pass1!==this.pass2)return alert(this.passMismatchTxt),this.pass1="",void(this.pass2="");if(""===this.email||""===this.name)return void alert(this.missingInfoTxt);let e=await x.Z.post("/register",{email:this.email,name:this.name,password:this.pass1}).catch((()=>{alert(this.errorTxt)}));e&&e.token&&(localStorage.setItem("token",e.token),this.$store.dispatch("fetchNewUserInfo",e),this.$router.push("/"))}},computed:{nameTxt(){return this.$t("register_name")},loginLinkTxt(){return this.$t("register_loginLink")},registerTxt(){return this.$t("register_registerBtn")},passMismatchTxt(){return this.$t("register_passMismatchAlert")},missingInfoTxt(){return this.$t("register_missingInfoAlert")},errorTxt(){return this.$t("register_errorAlert")}}};var T=a(4379),L=a(7518),I=a.n(L);b.render=_,b.__scopeId="data-v-250c1436";const S=b;I()(b,"components",{QPage:T.Z})}}]);