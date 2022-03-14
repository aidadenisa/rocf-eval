"use strict";(self["webpackChunkrocf_eval"]=self["webpackChunkrocf_eval"]||[]).push([[443],{7734:(e,t,a)=>{a.d(t,{Z:()=>i});const s="https://api.rocf2.aida.blog",n={post:async(e,t)=>{const a=localStorage.getItem("token")||"";let n=await fetch(s+e,{method:"POST",headers:{"Content-Type":"application/json","x-access-token":a},body:JSON.stringify(t)}).then((e=>e.json()));return n},get:async e=>{const t=localStorage.getItem("token")||"";let a=await fetch(s+e,{method:"GET",crossDomain:!0,headers:{"x-access-token":t}}).then((e=>e.json()));return a},put:async(e,t)=>{const a=localStorage.getItem("token")||"";let n=await fetch(s+e,{method:"PUT",headers:{"Content-Type":"application/json","x-access-token":a},crossDomain:!0,body:JSON.stringify(t)}).then((e=>e.json()));return n},getImage:async e=>{const t=localStorage.getItem("token")||"";let a=await fetch(s+e,{method:"GET",crossDomain:!0,headers:{"x-access-token":t}}),n=await a.blob();return n}},i=n},7649:(e,t,a)=>{a.d(t,{Z:()=>l});a(71);var s=a(3673),n=a(2323);function i(e,t,a,i,r,l){return(0,s.wg)(),(0,s.iD)("div",{class:"lang",onClick:t[0]||(t[0]=(...e)=>l.switchLanguage&&l.switchLanguage(...e))},(0,n.zw)(l.changeTxt)+" "+(0,n.zw)(r.otherLang.label),1)}const r={data(){return{languages:[{value:"en-US",label:"English"},{value:"it",label:"Italian"}],currentLang:"it",otherLang:{value:"en",label:"English"}}},methods:{switchLanguage(){this.languages[0].value==this.currentLang?(this.otherLang=this.languages[0],this.currentLang=this.languages[1].value):(this.otherLang=this.languages[1],this.currentLang=this.languages[0].value),this.$i18n.locale=this.currentLang}},beforeMount(){this.$i18n.locale=this.currentLang},computed:{changeTxt(){return this.$t("langSwitch_change")}}};r.render=i,r.__scopeId="data-v-09634304";const l=r},8461:(e,t,a)=>{a.d(t,{Z:()=>u});var s=a(3673),n=a(2323);(0,s.dD)("data-v-38937d58");const i=["disabled"];function r(e,t,a,r,l,o){const c=(0,s.up)("q-icon");return(0,s.wg)(),(0,s.iD)("button",{class:(0,n.C_)(["rocf-button",`variant-${a.variant}`,{"display-block":a.block},`size-${a.size}`]),disabled:a.disabled},["left"==a.iconPosition?((0,s.wg)(),(0,s.j4)(c,{key:0,name:a.icon},null,8,["name"])):(0,s.kq)("",!0),(0,s._)("span",null,[(0,s.WI)(e.$slots,"default",{},void 0,!0)]),"right"==a.iconPosition?((0,s.wg)(),(0,s.j4)(c,{key:1,name:a.icon},null,8,["name"])):(0,s.kq)("",!0)],10,i)}(0,s.Cn)();const l={props:{icon:{type:String},iconPosition:{type:String},variant:{type:String,default:"primary"},block:{type:Boolean,default:!0},size:{type:String,default:"large"},disabled:{type:Boolean,default:!1}}};var o=a(4554),c=a(7518),d=a.n(c);l.render=r,l.__scopeId="data-v-38937d58";const u=l;d()(l,"components",{QIcon:o.Z})},8443:(e,t,a)=>{a.r(t),a.d(t,{default:()=>S});var s=a(3673),n=a(8880),i=a(2323);(0,s.dD)("data-v-a6696266");const r=(0,s._)("div",{class:"logo"},[(0,s._)("h3",null," Evaluator "),(0,s._)("h2",null," ROCF ")],-1),l={class:"register-form flex column"},o={class:"field flex column"},c={class:"input-wrapper"},d={class:"field flex column"},u={class:"input-wrapper"},g=["placeholder"],p={class:"field flex column"},h={class:"input-wrapper"},m={class:"field flex column"},f={class:"input-wrapper"},w={class:"register-link"},v={class:"language"};function _(e,t,a,_,k,y){const b=(0,s.up)("router-link"),x=(0,s.up)("rocf-button"),T=(0,s.up)("lang-switch"),L=(0,s.up)("q-page");return(0,s.wg)(),(0,s.j4)(L,{class:"register-page flex column justify-center"},{default:(0,s.w5)((()=>[r,(0,s._)("div",l,[(0,s._)("div",o,[(0,s._)("div",c,[(0,s.wy)((0,s._)("input",{type:"email",id:"email","onUpdate:modelValue":t[0]||(t[0]=e=>k.email=e),placeholder:"Email",required:""},null,512),[[n.nr,k.email]])])]),(0,s._)("div",d,[(0,s._)("div",u,[(0,s.wy)((0,s._)("input",{id:"name","onUpdate:modelValue":t[1]||(t[1]=e=>k.name=e),placeholder:y.nameTxt,required:""},null,8,g),[[n.nr,k.name]])])]),(0,s._)("div",p,[(0,s._)("div",h,[(0,s.wy)((0,s._)("input",{type:"password",id:"pass1","onUpdate:modelValue":t[2]||(t[2]=e=>k.pass1=e),placeholder:"Password",required:""},null,512),[[n.nr,k.pass1]])])]),(0,s._)("div",m,[(0,s._)("div",f,[(0,s.wy)((0,s._)("input",{type:"password",id:"pass2","onUpdate:modelValue":t[3]||(t[3]=e=>k.pass2=e),placeholder:"Repeat password",required:""},null,512),[[n.nr,k.pass2]])])]),(0,s._)("div",w,[(0,s.Wm)(b,{to:"/login"},{default:(0,s.w5)((()=>[(0,s.Uk)((0,i.zw)(y.loginLinkTxt),1)])),_:1})]),(0,s.Wm)(x,{class:"submit-button",disabled:k.loading,onClick:y.registerNewAccount},{default:(0,s.w5)((()=>[(0,s.Uk)((0,i.zw)(y.registerTxt),1)])),_:1},8,["disabled","onClick"])]),(0,s._)("div",v,[(0,s.Wm)(T)])])),_:1})}(0,s.Cn)();var k=a(8461),y=a(7649),b=a(7734);const x={data(){return{email:"",name:"",pass1:"",pass2:"",loading:!1}},components:{RocfButton:k.Z,LangSwitch:y.Z},methods:{async registerNewAccount(){if(this.pass1!==this.pass2)return alert(this.passMismatchTxt),this.pass1="",void(this.pass2="");if(""===this.email||""===this.name)return void alert(this.missingInfoTxt);this.loading=!0;let e=await b.Z.post("/register",{email:this.email,name:this.name,password:this.pass1}).catch((()=>{alert(this.errorTxt),this.loading=!1}));e.error&&alert(e.error),this.loading=!1,e&&e.token&&(localStorage.setItem("token",e.token),this.$store.dispatch("fetchNewUserInfo",e),this.$router.push("/"))}},computed:{nameTxt(){return this.$t("register_name")},loginLinkTxt(){return this.$t("register_loginLink")},registerTxt(){return this.$t("register_registerBtn")},passMismatchTxt(){return this.$t("register_passMismatchAlert")},missingInfoTxt(){return this.$t("register_missingInfoAlert")},errorTxt(){return this.$t("register_errorAlert")}}};var T=a(4379),L=a(7518),I=a.n(L);x.render=_,x.__scopeId="data-v-a6696266";const S=x;I()(x,"components",{QPage:T.Z})}}]);