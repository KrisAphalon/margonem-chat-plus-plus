!function(){"use strict";var e={d:function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}};e.d({},{s:function(){return te},K:function(){return ee}});var t=JSON.parse('["daj cos","zje by","zje b","zje. b","zje, b","ch. uja","dasz cos"]'),n=JSON.parse('["kurw","gowno","pedal","cwel","dziwk","pierdo","huj","hoj","zjeb","jeb","fuck","kutas","cip","walkonia","pizd","suko","dupek","gnoju","ciul","korwa","cioto","ciota","cioty","sukinsyn","spierd","debil","chodzi. w każdym","poszła po te ciuchy. ja","pierda","kurew","fiut","qrw"]'),o=JSON.parse('["ci pó","rękach. u jed","rękach, u jed","ć ip","ć i p","pedał gaz","rower ma pedał"]'),a=JSON.parse('["osci p","hojn","luchanie","przesluchuj","przysluchuj","nasluchuj","ci poszlo","gow nowa","migow no","ci poz","ci pot","ci pi","ci pr","ci par","ci pom","ci pop","ci pod","ci. pod","ci, pod","ci po p","ci pok","ci pal","ci pr","ci pas","ci. pal","je b","je. b","je, b","ho ja","ec welp",":p","cip cip cip cip","cip cip cip","cip cip","wymachuj","je bo","ci, pi","ci pos","ach u jeg","ci pd","ci pow","ci pon","ci poc","ci pam","dzi w kr","jak","podsluchuje","ci pan","sc i przet","c i po","ek urwal","uzje. barw","uzje, barw","uzje barw","ch uja","ch, uja","ci pou","ach u jed","chu jego","ci pl","chu je","ahoj","eciu le","udziw ka","ci pac","bo ci pa","o ci p","oc i p","ci pol","go w nos","eci p","sci i p","tes u kora","ciu legi","yciu leg","yk urwan"]');const i={"/o ":"GLOBAL","/l ":"LOCAL","/h ":"TRADE","/g ":"GROUP","/k ":"CLAN"},s={GLOBAL:"GLOBAL",LOCAL:"LOCAL",TRADE:"TRADE",GROUP:"GROUP",CLAN:"CLAN",PRIVATE:"PRIVATE",SYSTEM:"SYSTEM"},r={Globalny:"/o ",Lokalny:"/l ",Handlowy:"/h ",Grupowy:"/g ",Klanowy:"/k "};function c(e){const t=document.querySelector(".chat-input-wrapper .card-name").innerText;if("Prywatny"===t)return`@${document.querySelector(".chat-input-wrapper .private-nick").innerText.replaceAll(" ","_")} ${e}`;if("Lokalny"===t){const t=document.querySelector(".chat-input-wrapper .style-message").innerText;if("me"===t)return`/lm ${e}`;if("nar"===t)return`/ln ${e}`}return r[t]?`${r[t]}${e}`:e}function p(e){return["/lm ","/ln "].includes(e.substring(0,4))?e.substring(4).trim():Object.keys(i).includes(e.substring(0,3))?e.substring(3).trim():e.startsWith("@")?e.split(" ").toSpliced(0,1).join(" ").trim():e}function l(e){let t;t=Engine.chatController.getChatInputWrapper();const n=t.getChannelName(),o=t.getPrivateReceiver(),a=t.getStyleMessage(),s=function(e){let t,n,o={name:"LOCAL"};e.startsWith("/lm")&&(n="me"),e.startsWith("/ln")&&(n="nar");const a=i[e.substring(0,3)];return a&&(o.name=a),e.startsWith("@")&&(o.name="PRIVATE",t=e.split(" ")[0].substring(1)),{channel:o,privateReceiver:t,messageStyle:n,ignoreCheckCardCanChoose:!0}}(e);var r;t.setChannel(...Object.values(s)),r=p(e),Engine.chatController.getChatInputWrapper().getDataAndSendRequest(r),t.setChannel({name:n},o,a,!0),t.clearInput()}let u,d,g,h,m;function b(e){e.target===e.currentTarget&&(window.Engine.lock.add("cpp-dragging"),(e=e||window.event).preventDefault(),g=e.clientX,h=e.clientY,m=e.target,document.addEventListener("mousemove",x),document.addEventListener("mouseup",w))}function x(e){(e=e||window.event).preventDefault(),u=g-e.clientX,d=h-e.clientY,g=e.clientX,h=e.clientY,m.style.top=m.offsetTop-d+"px",m.style.left=m.offsetLeft-u+"px"}function w(){window.Engine.lock.remove("cpp-dragging"),document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",w)}const f={"/g":"team","/k":"clant","*me":"special-style-2","/lm":"special-style-2","*nar":"special-style-nerthus-nar1","*nar1":"special-style-nerthus-nar1","/ln":"special-style-nerthus-nar1","*nar2":"special-style-nerthus-nar2","*nar3":"special-style-nerthus-nar3","*nar6":"special-style-nerthus-nar-rainbow","*dial":"wrapper-special-style-nerthus-dial1","*dial1":"wrapper-special-style-nerthus-dial1","*dial2":"wrapper-special-style-nerthus-dial2","*dial3":"wrapper-special-style-nerthus-dial3","*dial666":"wrapper-special-style-nerthus-dial666","*lang":"message-part special-style-nerthus-lang","*sys":"special-style-nerthus-sys","*map":"special-style-nerthus-sys","*light":"special-style-nerthus-sys","*addGraf":"special-style-nerthus-sys","*delGraf":"special-style-nerthus-sys","*hide":"special-style-nerthus-sys","*weather":"special-style-nerthus-sys"},y={CLAN:"CLAN",COMMERCIAL:"COMMERCIAL",GLOBAL:"GLOBAL",GROUP:"GROUP",LOCAL:"LOCAL",PRIVATE:"PRIVATE",SYSTEM:"SYSTEM",TRADE:"TRADE"},k=$('<style id="chat-plus-plus-styles">').appendTo("head"),v={};function z(e,t){v[e]||(k.append(t),v[e]=t)}const j={multiMsg:!0,justifyChat:!1,mergeMessages:!0,sendMessageTimeout:2500},L=[];function S(e){return Engine.chatController.getChatConfig().getChannelColor(e,!0)}function A(e){let t;t=e.innerText.trim().split(" ")[0],e.className="magic-input",e.style.color=document.querySelector(".new-chat-window .control-wrapper > .menu-card > .card-name").style.color;const n=function(){switch(document.querySelector(".new-chat-window .control-wrapper > .style-message").innerText){case"me":return f["/lm"];case"nar":return f["/ln"]}return""}();n?e.classList.add(n):t.startsWith("@")?e.classList.add("priv"):f[t]&&e.classList.add(...f[t].split(" "))}function T(e,t){if(""!==e.innerText)for(const e of L)if(e(t))return t.preventDefault(),t.stopImmediatePropagation(),void t.stopPropagation()}function C(){let e;(function(){const e={};for(const t in y)e[t]=S(t);const t=function(e){const t=document.createElement("div");t.style.display="none",t.innerHTML='<div class="one-message-wrapper"> <div class="new-chat-message"> <span class="information-part"> <span class="ts-section"></span> <span class="channel-section"></span> <span class="author-section click-able"></span> <span class="receiver-arrow-section">-&gt;</span> <span class="receiver-section"></span> </span> <span class="message-part"> <span class="message-section">message</span> </span> </div></div> ',document.body.appendChild(t);const n=t.querySelector(".one-message-wrapper"),o=t.querySelector(".new-chat-message"),a=t.querySelector(".message-section"),i=window.getComputedStyle(a).color,s=n.className,r=o.className,c={};for(const t in e){n.classList.add(`${t}-message-wrapper`),o.classList.add(`chat-${t}-message`);const e=window.getComputedStyle(a).color;e!==i&&(c[t]=e),n.className=s,o.className=r}return document.body.removeChild(t),c}(e);!function(e){z("inputClasses",`#inpchat.priv { color: ${e[s.PRIVATE]}; }#inpchat.clant { color: ${e[s.CLAN]}; }#inpchat.team { color: ${e[s.GROUP]}; }#inpchat.sys_comm { color: ${e[s.SYSTEM]}; } `)}({...e,...t})})(),e=".magic-input-wrapper > .magic-input";const t=document.querySelector(".magic-input-wrapper > .magic-input");let n;return t.addEventListener("keydown",(e=>{"Enter"===e.key&&T(t,e)}),!0),n=t,document.querySelector(".send-mobile-message-wrapper > .button")?.addEventListener("click",(e=>T(n,e)),!0),n.addEventListener("input",(()=>{return e=n,j.multiMsg||function(e){e.value.length>199&&(e.value=e.value.substr(0,199));const t=/[ąćęłńóśźż*@,. _]/gi;let n=0;for(const o of e.value)o.match(t)&&(n++,e.value=e.value.substr(0,199-n));e.maxLength=199-n}(e),void A(e);var e}),!1),n.addEventListener("input",(()=>{return e=n,void localStorage.setItem("lastInputtedMsg",c(e.innerText));var e}),!1),function(e){const t=localStorage.getItem("lastInputtedMsg");if(t){{document.querySelector(".magic-input-placeholder").style.display="none",document.querySelector(".clear-cross").style.display="block",e.innerText=t;const n=document.createRange(),o=window.getSelection();n.setStart(e.childNodes[0],t.length-1),n.collapse(!0),o.removeAllRanges(),o.addRange(n)}A(e)}}(n),n}function E(e){if(e.startsWith("@")){const t=e.split(" ")[0].substring(1);return(e=e.split(" ")).shift(),e=e.join(" "),void window._g(`chat&channel=personal&receiver=${t}`,!1,{c:e})}i[e.substring(0,3)]?window._g(`chat&channel=${i[e.substring(0,3)]}`,!1,{c:e.substring(3)}):window._g("chat&channel=local",!1,{c:e})}const O="Wysyła podejrzaną część wiadomości na chat grupowy.Jeżeli wiadomość zostanie zagwiazdkowana, to nie należy jej wysyłać.Testuje tylko pierwsze zaczerwienione słowo w wiadomości.",M='<div class="header-label-positioner"> <div class="header-label"> <div class="left-decor"></div> <div class="right-decor"></div> <span class="panel-name">Automute Catcher</span> </div></div><div class="close-decor"> <button class="close-button" tip="Zamknij"/></div><div class="background"> <div class="top-box"> </div> <div class="bottom-box"> <button class="button text-button bottom-test">Przetestuj</button> <button class="button text-button bottom-send">Wyślij</button> <button class="button text-button bottom-close">Nie wysyłaj</button> <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a> </div></div>',P='Twoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br><span style="color:red">Zawiera ona zwrot "ahoj", który poprzedzony jest przezdowolną literę "a". Tak, w ten sposób automute sprawdza, czy jest to "przekleństwo".Jeżeli chcesz wysłać tak czy siak, droga wolna.Wiedz jednak, że akurat w tym przypadku nie ma pomyłek.</span>',q='Twoja wiadomość prawdopodobnie byłaby wyłapana przez automute, ale masz szczęście ;) <br>Poniżej wiadomość, jaką widzi automute:<hr><span class="cpp-mute-text" style="word-wrap: break-word; text-align: left;"></span><hr>Czy mimo tego chcesz ją wysłać? Jeżeli wiadomość przejdzie bezgwiazdkowania wyślij wyjątek do Kris Aphalon na Discordzie bądź na skrzynkę pocztową';function W(e,t,n){if(document.getElementById("cpp-automute-panel"))return;const o=n?P:q,a=document.createElement("div");a.addEventListener("mousedown",b,!1),a.id="cpp-automute-panel",a.className="cpp-panel",a.innerHTML=M;const s=O;a.querySelector(".bottom-test").setAttribute("tip",s),a.querySelector(".top-box").innerHTML=o,n||(a.querySelector(".cpp-mute-text").innerHTML=t);const r=function(){document.body.removeChild(a),document.getElementById("inpchat").focus()};a.querySelector("#cpp-automute-panel .close-button").addEventListener("click",r),a.querySelector(".bottom-close").addEventListener("click",r),a.querySelector(".bottom-send").addEventListener("click",r),a.querySelector(".bottom-send").addEventListener("click",(()=>{E(e),document.querySelector(".magic-input").innerText="",document.querySelector(".magic-input-placeholder").style.display="block"})),a.querySelector(".bottom-test").addEventListener("click",(()=>function(e,t){let n=e;"@"===n[0]&&(n=n.slice(n.indexOf(" ")));const o=t.match(/<span style='color: red; font-weight: bold'>(.*)<\/span>/);if(!o?.[1])return message("Coś poszło nie tak przy testowaniu. Wyślij wiadomość którą próbowałeś przetestować do Kris Aphalon na Discordzie");const a=o[1],s=Math.max(n.indexOf(a)-20,0),r=Math.min(n.indexOf(a)+a.length+20,n.length);let c=n.substring(s,r);i[c.substring(0,3)]&&(c=c.substring(3));let p="";p=Engine.hero.d.nick,E("@"+p.split(" ").join("_")+" "+c)}(e,t))),document.body.appendChild(a),$("[tip]",$(a)).each((function(){const e=$(this);e.tip(e.attr("tip"))}))}function R(e,t){let n=!0;for(const o of t)e.includes(o)&&(console.log("Wykryto zwrot który jest niemiły: "+o),e=e.split(o).join("<span style='color: red; font-weight: bold'>"+o+"</span>"),n=!1);return!n&&e}function I(e,t){for(const n of t)e=e.split(n).join("X");return e}function N(){let e;return e=document.querySelector(".magic-input").innerText,function(e){let i=e.toLowerCase();if("@"===i[0]&&(i=i.slice(i.indexOf(" "))),i=I(i,o),i=i.replace(/[^a-zńąćśźżóęł ]/g,"").replace(/ą/g,"a").replace(/ę/g,"e").replace(/ł/g,"l").replace(/[żź]/g,"z").replace(/ó/g,"o").replace(/ń/g,"n").replace(/ć/g,"c").replace(/ś/g,"s"),/a(?=.*ahoj)(?!hoj.*ahoj)/g.test(i))return W(c(e),"",!0),!0;let s=R(i,t);return s?(W(c(e),s),!0):(i=I(i,a),i=i.replace(/ /g,""),i=function(e){if(0===e.length)return"";let t=e[0],n=e[0];for(let o=1;o<e.length;o++)e[o]!==n&&(t+=e[o]),n=e[o];return t}(i),s=R(i,n),!!s&&(W(c(e),s),!0))}(e)}const G=/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;function D(e){let t=(e=e.trim()).split(" "),n=!1,o="";if("/"===e[0]||"*"===e[0]){let a=e.split(" ",1)[0];switch(a){case"/lm":a=Engine.hero.nick;break;case"/l":case"/o":case"/h":case"/g":case"/k":n=!0;case"/ln":case"*me":case"*nar":case"*nar1":case"*nar2":case"*nar3":case"*nar6":case"*sys":a="";break;case"*dial":case"*dial1":case"*dial2":case"*dial3":case"*dial666":{const n=e.split(",");n.shift(),t=n.join(",").split(" "),a="";break}case"*lang":{const n=e.split(",");n.shift(),t=n.join(",").split(" "),a="",o="*";break}}t.shift(),""!==a&&t.unshift(a)}else"@"===e[0]&&(n=!0,t.shift());e="";const a=t.length;for(let n=0;n<a;n++)""!==t[n]&&(e+=t[n]+" ");return e=e.trim(),o&&(e=`${o}${e}${o}`),n?D(e):e}function J(e){const t=e.children[1].innerText.trim();if(void 0!==te.sendArr[0]&&t===D(te.sendArr[0])){if(clearTimeout(te.sendTimeout),te.sendArr.shift(),0===te.sendArr.length)return;setTimeout((function(){te.sendArr[0].match(G).length>0&&l(te.sendArr[0])}),j.sendMessageTimeout),te.sendTimeout=setTimeout(ee,3*j.sendMessageTimeout)}}function Y(e){for(const t of e)for(const e of t.addedNodes)J(e)}const _=[],B={},U=/[ąćęłńóśźż@]/gi;function V(e){const t=p(e),n=t.match(U);return n?t.length+n.length:t.length}function H(e,t){return e[t].startsWith("/lm")&&(e[t]="*me"),e[t].startsWith("/ln")&&(e[t]="*nar"),e[t].startsWith("*dial")||e[t].startsWith("*lang")?e.slice(t).join(" ").split(",")[0]+", ":e[t]+" "}function K(e,t,n){const o=function(e,t,n){const o=e.substring(n||0).search(/[!?.] /);return o>=0?o+(n||0):o}(e,0,Math.floor(n/2));if(o>=0)return o+2;const a=e.lastIndexOf(" ");return a>=0?a+1:t}function Z(e,t){let n=0;for(let o=0;o<t&&(n++,!(n>=e.length));o++)e[n].match(U)&&o++;return n}function X(e){const t=function(e){const t=e.split(" ");if(t.length<=1)return"";let n="";return(e.startsWith("@")||Object.keys(i).includes(t[0]+" "))&&(n=t[0]+" "),(e.startsWith("*")||e.startsWith("/lm")||e.startsWith("/ln"))&&(n=H(t,0)),n&&!n.startsWith("*")&&t[1].startsWith("*")&&(n+=H(t,1)),n}(e);return te.sendArr.splice(0),!(V(e)<=197||(function(e,t,n){if(""===e)return;const o=function(e,t,n){n-=V(t);const o=[];for(;e.length>0;){const a=Z(e,n),i=e.substring(0,a),s=V(e)>n?K(i,a,n):e.length;o.push(t+i.substring(0,s).trim()),e=e.slice(s)}return o}(e=e.substring(t.length),t,n);console.log(o);for(let e of o)te.sendArr.push(e)}(e,t,197),e.startsWith("/lm")&&(te.sendArr[0]=te.sendArr[0].replace(/^.{3}/,"/lm")),e.startsWith("/ln")&&(te.sendArr[0]=te.sendArr[0].replace(/^.{3}/,"/nar")),te.sendArr.length>0&&(l(te.sendArr[0]),te.sendTimeout=setTimeout(ee,3*j.sendMessageTimeout)),0))}function F(){let e;return e=document.querySelector(".magic-input").innerText,t=(t=(t=(t=c(e)).replace(/ /g," ")).replace(/[«»]/g,"")).trim(),!(!j.multiMsg||""===t)&&X(t);var t}function Q(){return j.multiMsg=!j.multiMsg,localStorage.setItem("chatPlusPlus",JSON.stringify(j)),!1}function ee(){0!==te.sendArr.length&&(sessionStorage.noAnwserMsgDisplayed||(window.message("Coś poszło nie tak i twoja wiadomość nie została wysłana na chat.\nKliknij PPM na koordynaty, by przywrócić resztę niewysłanej wiadomości.\nJeżeli wiadomość widnieje na chacie, zignoruj ten komunikat."),sessionStorage.noAnwserMsgDisplayed=!0))}const te={sendArr:[],sendTimeout:0,blockTextareaChanging:!1};function ne(){!function(){const e=localStorage.getItem("chatPlusPlus");if(e){const t=JSON.parse(e);for(const e of Object.keys(t))j[e]=t[e]}localStorage.setItem("chatPlusPlus",JSON.stringify(j))}(),z("basic",'#inpchat{background:0 0;border:0;bottom:2px;color:#fff;height:19px;left:-94px;margin:0;outline:0;overflow-x:scroll;padding:0;position:absolute;resize:none;scrollbar-width:none;white-space:nowrap;width:205px}#inpchat.unfolded{height:124px;line-height:25.6px;overflow-x:hidden;scrollbar-width:thin;white-space:pre-wrap;margin-top:5px;padding:0 4px 4px;z-index:100}#textarea-background{background-color:#233316;border-image:url(/img/gui/chat-srodek-powtarzalny.png) 0 111 0 104 round round;border-style:solid;border-width:0 111px 0 104px;bottom:18px;height:50px;left:-104px;pointer-events:none;position:absolute;z-index:50}#textarea-background-up{border-image:url(/img/gui/chat-up.png) 14 111 0 104 fill repeat round;border-style:solid;border-width:14px 111px 0 104px;bottom:60px;height:60px;left:-104px;pointer-events:none;position:absolute;z-index:60}.chat-size-1 #textarea-background,.chat-size-1 #textarea-background-up{width:33px}.chat-size-2 #textarea-background,.chat-size-2 #textarea-background-up{width:290px}.chat-size-1 #inpchat{width:211px}.chat-size-2 #inpchat{width:463px}.section.chat-tpl .send-btn.right{z-index:201}.input-unfolded{height:calc(100% - 105px) !important}.cpp-panel{animation:fade .5s;border-image:url(https://cronus.margonem.com/img/gui/tmp/window-frame.png) 32 20 repeat;border-style:solid;border-width:34px 13px 10px 13px;color:#000;cursor:url(https://nerthus.margonem.pl/img/gui/cursor/1.png),url(https://nerthus.margonem.pl/img/gui/cursor/1.cur),auto;left:calc(50% - 204px);pointer-events:auto;position:fixed;top:calc(50% - 150px);transition:opacity .35s ease-in-out;width:380px;z-index:499}.cpp-panel>.background{background-color:#f1deaa;background-image:url(https://cronus.margonem.com/img/gui/content-redleather.jpg)}.cpp-panel>.header-label-positioner{left:10px;pointer-events:none;position:absolute;right:10px;text-align:center;top:-35px}.cpp-panel .header-label{background:url(https://cronus.margonem.com/img/gui/dialogue/dialogi-naglowek.png);display:inline-block;height:28px;margin:0 auto;position:relative}.cpp-panel .header-label>.right-decor,.cpp-panel .header-label>.left-decor{background:url(https://cronus.margonem.com/img/gui/dialogue/dialogi.png) -38px -2px;height:28px;left:-52px;position:absolute;top:0;width:52px}.cpp-panel .header-label>.right-decor{background-position:-91px -2px;left:auto;right:-52px}.cpp-panel .header-label>span{color:beige;line-height:28px;text-align:center}.cpp-panel .panel-name{transition:width .35s ease-in-out}.cpp-panel>.close-decor{background:url(https://cronus.margonem.com/img/gui/buttony.png?v=5) -380px -55px;height:52px;pointer-events:none;position:absolute;right:-15px;top:-35px;width:51px}.cpp-panel .close-button{background:url(https://cronus.margonem.com/img/gui/buttony.png?v=5) -263px -79px;border:0;cursor:url(https://nerthus.margonem.pl/img/gui/cursor/5.png),url(https://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;height:22px;padding:0;pointer-events:auto;position:absolute;right:3px;top:3px;width:22px}.cpp-panel .close-button:hover{background-position:-286px -79px}.cpp-panel .settings-box{height:75px;display:grid;grid-template-columns:50% auto;grid-template-rows:50% auto;justify-items:center;align-items:center;padding-top:10px}.cpp-panel .setting-label{cursor:unset;height:24px;position:relative;width:155px;user-select:none}.cpp-panel .setting-label-text{cursor:url(https://nerthus.margonem.pl/img/gui/cursor/5.png),url(https://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;left:25px;line-height:28px;position:relative}.cpp-panel .setting-checkbox{display:none}.cpp-panel .checkbox-outline{border:2px solid #6e644b;border-radius:2px;box-sizing:border-box;cursor:url(https://nerthus.margonem.pl/img/gui/cursor/5.png),url(https://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;display:inline-block;height:18px;left:0;margin:0;overflow:hidden;position:absolute;top:3px;width:18px;z-index:2}.checkmark{display:none;height:22px;left:-4px;pointer-events:none;position:relative;top:-2px;transform:rotate(45deg);width:22px}.checkmark-stem{background-color:#f1dfa8;height:13px;left:10px;position:absolute;top:2px;width:2px}.checkmark-kick{background-color:#f1dfa8;height:2px;left:5px;position:absolute;top:13px;width:6px}.cpp-panel .setting-checkbox:checked+.checkbox-outline{background-color:#6e644b}.cpp-panel .setting-checkbox:checked+.checkbox-outline .checkmark{display:inline-block}.cpp-panel .save-button{margin-right:30px}.cpp-panel .cancel-button{margin-left:30px}.cpp-panel .cancel-button:not(:hover){background-image:linear-gradient(to top, #310b0b, #831f1f)}.cpp-panel .cancel-button:not(:hover)::before{box-shadow:inset 0 0 1px 1px rgba(218,97,97,.6509803922)}.cpp-panel .hidden{display:none}.cpp-panel .button{background-image:linear-gradient(to top, #12210d, #396b29);border:1px solid #0c0d0d;border-radius:4px;box-shadow:inset 0 0 1px 1px #cecece,inset 0 0 0 3px #0c0d0d;box-sizing:border-box;color:#e6d6bf;cursor:url(https://nerthus.margonem.pl/img/gui/cursor/5.png),url(https://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;display:inline-block;height:42px;line-height:34px;position:relative;width:42px}.cpp-panel.button.blue{background-image:linear-gradient(to top, #081522, #1d4873)}.cpp-panel .button.blue:not(:hover)::before{box-shadow:inset 0 0 1px 1px rgba(85,148,212,.6509803922)}.cpp-panel .button:before{backface-visibility:hidden;border-radius:4px;bottom:3px;box-shadow:inset 0 0 1px 1px rgba(126,197,104,.6509803922);content:"";left:3px;position:absolute;right:3px;top:3px;transform:translateZ(0)}.cpp-panel .button:after{border-radius:3px;bottom:0;box-shadow:0 1px 0 1px #0c0d0d;content:"";left:0;position:absolute;right:0;top:0}.cpp-panel .button:hover:before{box-shadow:inset 0 0 1px 1px rgba(144,144,144,.6509803922)}.cpp-panel .button:hover{background-image:linear-gradient(to top, #101010, #434343)}.cpp-panel .bottom-box{display:flex;height:50px;justify-content:center}#cpp-automute-panel .bottom-box{justify-content:space-evenly}#cpp-automute-panel .text-button{justify-content:space-evenly}.cpp-panel .text-button{border-radius:6px;height:28px;line-height:24px;margin-top:10px;text-align:center;width:90px}.cpp-panel .text-button::before,.cpp-panel .text-button::after{content:unset}.cpp-panel .donate-button{background-image:linear-gradient(to top, #58310b, #daa520);bottom:6px;box-shadow:inset 0 0 1px 1px #cecece,inset 0 0 0 3px #0c0d0d;height:35px;padding:2px 0 0 0;position:absolute;right:5px;width:35px;font-size:25px;color:#000}.cpp-panel .donate-button span{top:-2px;position:relative}.cpp-panel .donate-button:hover{color:pink}.cpp-panel .donate-button::before{content:"";position:absolute;left:3px;top:3px;bottom:3px;right:3px;box-shadow:inset 0 0 1px 1px rgba(237,177,117,.65);border-radius:4px;transform:translateZ(0);backface-visibility:hidden}#cpp-test-button{position:absolute;left:20px;bottom:20px;width:77px}#cpp-automute-panel .top-box{text-align:center}#cpp-automute-panel .donate-button{right:0;bottom:3px}'),C(),function(){const e=document.querySelector(".new-chat-window .chat-message-wrapper .scroll-pane");new MutationObserver(Y).observe(e,{attributes:!1,childList:!0,subtree:!0})}(),L.push(N),function(e,t,n,o){const a=`<label class="setting-label"> <span class="setting-label-text" tip="Wysyłaj wiadomości dłuższe niż 200 znaków dzięki wykorzystaniu najnowszych nowinek technologi.">MultiMsg</span> <input class="setting-checkbox" id="cpp-setting-${e}" name="${e}" type="checkbox" ${j[e]?" checked":""}> <span class="checkbox-outline"> <span class="checkmark"> <div class="checkmark-stem"></div> <div class="checkmark-kick"></div> </span> </span></label>`;_.push(a),B[e]=o}("multiMsg",0,0,Q),L.push(F)}if(Engine?.allInit)ne();else{let e,t=!1;Object.defineProperty(Engine,"allInit",{set(n){e=n,!0!==n||t||(ne(),t=!0)},get(){return e}})}}();