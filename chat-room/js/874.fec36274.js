"use strict";(self["webpackChunkchatroom"]=self["webpackChunkchatroom"]||[]).push([[874],{7874:(t,e,a)=>{a.r(e),a.d(e,{default:()=>k});var r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"mobile-container"},[e("header",{staticClass:"app-header"},[e("div",{staticClass:"header-left"},[e("el-icon",{staticClass:"nav-icon",attrs:{name:"menu"},nativeOn:{click:function(e){t.showShare=!0}}})],1),e("h1",{staticClass:"app-title"}),e("div",{staticClass:"header-right"},[e("Weather")],1)]),e("main",{staticClass:"content-area"},[e("HotWords"),e("router-view")],1),e("nav",{staticClass:"bottom-tab"},t._l(t.tabs,(function(a,r){return e("div",{key:r,staticClass:"tab-item",class:{active:t.activeTab===r},on:{click:function(e){return t.switchTab(r)}}},[e("el-icon",{staticClass:"tab-icon",attrs:{name:a.icon}}),e("span",{staticClass:"tab-label"},[t._v(t._s(a.label))])],1)})),0),e("van-share-sheet",{attrs:{title:"立即分享给好友",options:t.options},on:{select:t.onSelect},model:{value:t.showShare,callback:function(e){t.showShare=e},expression:"showShare"}})],1)},o=[],s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"weather-container"},[t.weather?e("div",{staticClass:"weather-info"},[e("span",{staticClass:"weather-icon"},[t._v(t._s(t.weatherIcon))]),e("span",{staticClass:"weather-temp"},[t._v(t._s(t.weather.temp)+"°C")]),e("span",{staticClass:"weather-description"},[t._v(t._s(t.weather.description))])]):e("div",{staticClass:"weather-loading"},[t._v("加载天气中...")])])},n=[];const i={data(){return{weather:null}},computed:{weatherIcon(){if(!this.weather)return"";const t={clear:"☀️",clouds:"☁️",rain:"🌧️",snow:"❄️",thunderstorm:"⛈️",mist:"🌫️"};return t[this.weather.main.toLowerCase()]||"🌤️"}},created(){this.generateRandomWeather(),setInterval((()=>{this.generateRandomWeather()}),6e4)},methods:{generateRandomWeather(){const t=[{main:"clear",description:"晴天",temp:this.getRandomTemp(20,35)},{main:"clouds",description:"多云",temp:this.getRandomTemp(15,30)},{main:"rain",description:"雨天",temp:this.getRandomTemp(10,25)},{main:"snow",description:"下雪",temp:this.getRandomTemp(-5,5)},{main:"thunderstorm",description:"雷阵雨",temp:this.getRandomTemp(15,25)},{main:"mist",description:"雾天",temp:this.getRandomTemp(5,15)}];this.weather=t[Math.floor(Math.random()*t.length)]},getRandomTemp(t,e){return Math.floor(Math.random()*(e-t+1))+t}}},c=i;var h=a(1656),d=(0,h.A)(c,s,n,!1,null,"20a04d2b",null);const l=d.exports;var m=function(){var t=this,e=t._self._c;return e("div",{staticClass:"hotwords-container"},[e("van-notice-bar",{attrs:{"left-icon":"volume-o",text:t.currentHotWord}})],1)},w=[];const u=["破防了","YYDS","绝绝子","躺平","内卷","元宇宙","社死","emo","夺笋","蚌埠住了","芭比Q了","栓Q","显眼包","泰裤辣","尊嘟假嘟","哈基米","多巴胺穿搭","i人/e人","特种兵旅游","公主请上车","电子榨菜","挖呀挖","遥遥领先","退退退","老六","真香定律","PUA","社交牛X症","雪糕刺客","嘴替","服了你个老六","CPU/KTV/PPT/ICU","鼠鼠我啊","电子木鱼","林黛玉文学","九转大肠","挖野菜","早C晚A","电子宠物","脆皮大学生","全职儿女","gap day","公主请下单","美拉德风","爱因斯坦的脑子","泼天富贵","无痛当妈","孔乙己文学","发疯文学","互联网体检","city walk","轻断食","搭子社交","情绪价值","电子杨伟","职场水母","小土豆","广西科目三","尔滨现象","村超","村BA","村VA","搭子社交","特种兵式旅游","多巴胺穿搭","显眼包","命运的齿轮","质疑理解成为","纯爱战士","鼠鼠文学","momo大军","发疯营销","公主请上班","班味十足","职场鬼火","班味穿搭","班味文学","轻舟已过万重山","我有一计","遥遥领先","恐龙抗狼","蓝色妖姬","科目三","KTV","PPT","CPU","尊嘟假嘟","泰裤辣","哈基米","小趴菜","老默我想吃鱼","注意看","这是通知不是商量","小飞棍来喽","你人还怪好嘞","命运的齿轮开始转动","哪李贵了","这届年轻人","命运的齿轮","遥遥领先","抱一丝啊","小孩哥","小孩姐","王妈文学","公主请下单","公主请上班","公主请下班"],p=["家人们谁懂啊，${word}真的太绝了！","关于${word}这件事，我直接一个暴风哭泣！","不是${word}买不起，而是更有性价比！","谁还没体验过${word}？我真的会谢！","咱就是说，${word}一整个爱住了！","不会还有人不知道${word}吧？这波血赚！","🤯${word}是什么神仙操作？！这也太顶了～","这也太${word}了吧！救命怎么会这么好笑！","关于${word}这件事，九敏谁懂啊家人们！","🥺求求了！没有${word}我可怎么活啊！","不会吧不会吧？${word}居然还能这么玩！","谁懂啊！${word}这操作简直绝绝子～","刚进群就看到${word}，这波操作我直接破防！","🤔有没有课代表解释下这个${word}？","这个${word}我能笑一年，哈哈哈哈哈哈哈","📢全体注意！${word}名场面来了！","💥前方高能！${word}名场面预警！","这是什么神仙${word}！我直接一整个大震惊！","🤣${word}！这波操作我给满分，直接笑不活了～","救命！这个${word}我能用到天荒地老！","家人们快看！这个${word}也太会整活了吧！","谁发明的${word}？出来挨夸！","👂听说有人不懂${word}？速来围观！","不会只有我现在才知道${word}吧？","这个${word}我能玩一整天，太上头了！"];function v(){return u[Math.floor(Math.random()*u.length)]}function f(){const t=p[Math.floor(Math.random()*p.length)];return t.replace("${word}",v())}const b={data(){return{currentHotWord:"",refreshTimer:null}},mounted(){this.generateHotWord(),this.refreshTimer=setInterval((()=>{this.generateHotWord()}),5e3)},beforeDestroy(){clearInterval(this.refreshTimer)},methods:{generateHotWord(){this.currentHotWord=f()},copyHotWord(){this.currentHotWord&&navigator.clipboard.writeText(this.currentHotWord).then((()=>this.$toast.success("复制成功"))).catch((()=>this.$toast.fail("复制失败")))}}},$=b;var C=(0,h.A)($,m,w,!1,null,"1f09837a",null);const g=C.exports;var T=a(8393);const W={components:{Weather:l,HotWords:g},data(){return{activeTab:0,tabs:[{icon:"setting",label:"主页",path:"/home"},{icon:"chat-round",label:"AI",path:"/AIChat"},{icon:"chat-round",label:"图片",path:"/ImageGallery"}],options:[[{name:"微信",icon:"wechat"},{name:"朋友圈",icon:"wechat-moments"},{name:"微博",icon:"weibo"},{name:"QQ",icon:"qq"}],[{name:"复制链接",icon:"link"},{name:"分享海报",icon:"poster"},{name:"二维码",icon:"qrcode"},{name:"小程序码",icon:"weapp-qrcode"}]],showShare:!1}},methods:{onSelect(t){switch(t.name){case"微信":case"朋友圈":T.A.success("分享功能准备中");break;case"复制链接":navigator.clipboard.writeText(window.location.href).then((()=>T.A.success("链接已复制"))).catch((()=>T.A.fail("复制失败")));break;default:(0,T.A)("暂不支持该分享方式")}this.showShare=!1},switchTab(t){this.$route.path!==this.tabs[t].path&&(this.activeTab=t,this.$router.push(this.tabs[t].path).catch((t=>{})))}}},_=W;var A=(0,h.A)(_,r,o,!1,null,"325e9a85",null);const k=A.exports}}]);
//# sourceMappingURL=874.fec36274.js.map