import{d as b,_ as C,k as w,c as y,w as t,r as a,b as _,f as s,i as o,g as M,e as m,t as f,l as B}from"./index-BUzbyXu2.js";const S=b("chat",{state:()=>({messages:[],currentCharacter:"系统"}),actions:{sendMessage(c){this.messages.push(c)}}}),N={class:"character-name text-pink-darken-1"},V={class:"dialog-text typing-effect"},K={__name:"ChatRoom",setup(c){const r=S(),n=w(""),d=()=>{n.value.trim()&&(r.sendMessage({character:r.currentCharacter,content:n.value.trim()}),n.value="")};return(l,e)=>{const i=a("el-icon"),u=a("el-card-title"),p=a("el-card-text"),g=a("el-text-field"),h=a("el-btn"),k=a("el-card-actions"),v=a("el-card"),x=a("el-container");return _(),y(x,{class:"chat-container"},{default:t(()=>[s(v,{class:"glass-card chat-window rounded-xl",elevation:"12"},{default:t(()=>[s(u,{class:"bg-pink-darken-1"},{default:t(()=>[s(i,{left:""},{default:t(()=>e[0]||(e[0]=[o("mdi-forum")])),_:1}),e[1]||(e[1]=o(" 角色聊天室 "))]),_:1}),s(p,{class:"messages-box"},{default:t(()=>[(_(),M("div",{"el-for":"(msg, index) in messages",key:l.index,class:"message-item"},[m("div",N,f(l.msg.character),1),m("div",V,f(l.msg.content),1)]))]),_:1}),s(k,null,{default:t(()=>[s(g,{"el-model":"newMessage",label:"输入消息",variant:"outlined",onKeyup:B(d,["enter"]),"hide-details":""}),s(h,{color:"pink-darken-1",variant:"tonal",onClick:d,disabled:!n.value},{default:t(()=>[s(i,{right:""},{default:t(()=>e[2]||(e[2]=[o("mdi-send")])),_:1}),e[3]||(e[3]=o(" 发送 "))]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1})}}},D=C(K,[["__scopeId","data-v-f57f6ae8"]]);export{D as default};
