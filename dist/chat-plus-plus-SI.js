!function(){"use strict";var e={d:function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}};e.d({},{s:function(){return ce},K:function(){return re}});var t=JSON.parse('["daj cos","zje by","zje b","zje. b","zje, b","ch. uja","dasz cos"]'),n=JSON.parse('["kurw","gowno","pedal","cwel","dziwk","pierdo","huj","hoj","zjeb","jeb","fuck","kutas","cip","walkonia","pizd","suko","dupek","gnoju","ciul","korwa","cioto","ciota","cioty","sukinsyn","spierd","debil","chodzi. w każdym","poszła po te ciuchy. ja","pierda","kurew","fiut","qrw"]'),o=JSON.parse('["ci pó","rękach. u jed","rękach, u jed","ć ip","ć i p","pedał gaz","rower ma pedał"]'),a=JSON.parse('["osci p","hojn","luchanie","przesluchuj","przysluchuj","nasluchuj","ci poszlo","gow nowa","migow no","ci poz","ci pot","ci pi","ci pr","ci par","ci pom","ci pop","ci pod","ci. pod","ci, pod","ci po p","ci pok","ci pal","ci pr","ci pas","ci. pal","je b","je. b","je, b","ho ja","ec welp",":p","cip cip cip cip","cip cip cip","cip cip","wymachuj","je bo","ci, pi","ci pos","ach u jeg","ci pd","ci pow","ci pon","ci poc","ci pam","dzi w kr","jak","podsluchuje","ci pan","sc i przet","c i po","ek urwal","uzje. barw","uzje, barw","uzje barw","ch uja","ch, uja","ci pou","ach u jed","chu jego","ci pl","chu je","ahoj","eciu le","udziw ka","ci pac","bo ci pa","o ci p","oc i p","ci pol","go w nos","eci p","sci i p","tes u kora","ciu legi","yciu leg","yk urwan"]');const i={"/o ":"GLOBAL","/l ":"LOCAL","/h ":"TRADE","/g ":"GROUP","/k ":"CLAN"},s={GLOBAL:"GLOBAL",LOCAL:"LOCAL",TRADE:"TRADE",GROUP:"GROUP",CLAN:"CLAN",PRIVATE:"PRIVATE",SYSTEM:"SYSTEM"},r={CLAN:"clan",COMMERCIAL:"commercial",GLOBAL:"global",GROUP:"party",LOCAL:"local",PRIVATE:"personal",SYSTEM:"system",TRADE:"trade"};function c(e){return["/lm ","/ln "].includes(e.substring(0,4))?e.substring(4).trim():Object.keys(i).includes(e.substring(0,3))?e.substring(3).trim():e.startsWith("@")?e.split(" ").toSpliced(0,1).join(" ").trim():e}function l(e){let t;t=g.chatController.getChatInputWrapper();const n=t.getChannelName(),o=t.getPrivateReceiver(),a=t.getStyleMessage(),s=function(e){let t,n,o={name:"LOCAL"};e.startsWith("/lm")&&(n="me"),e.startsWith("/ln")&&(n="nar");const a=i[e.substring(0,3)];return a&&(o.name=a),e.startsWith("@")&&(o.name="PRIVATE",t=e.split(" ")[0].substring(1)),{channel:o,privateReceiver:t,messageStyle:n,ignoreCheckCardCanChoose:!0}}(e);t.setChannel(...Object.values(s)),function(e,t){{const n=r[t.channel.name],o=t.privateReceiver?t.privateReceiver.replaceAll(" ","_"):"",a=t.messageStyle??"";_g(`chat&channel=${n}`+(o?`&receiver=${o}`:"")+(a?`&style=${a}`:""),!1,{c:e})}}(c(e),s),t.setChannel({name:n},o,a,!0),t.clearInput()}let p,d,u,h,m;function b(e){e.target===e.currentTarget&&(window.g.lock.add("cpp-dragging"),(e=e||window.event).preventDefault(),u=e.clientX,h=e.clientY,m=e.target,document.addEventListener("mousemove",f),document.addEventListener("mouseup",x))}function f(e){(e=e||window.event).preventDefault(),p=u-e.clientX,d=h-e.clientY,u=e.clientX,h=e.clientY,m.style.top=m.offsetTop-d+"px",m.style.left=m.offsetLeft-p+"px"}function x(){window.g.lock.remove("cpp-dragging"),document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",x)}const y={"/g":"team","/k":"clant","*me":"special-style-2","/lm":"special-style-2","*nar":"special-style-nerthus-nar1","*nar1":"special-style-nerthus-nar1","/ln":"special-style-nerthus-nar1","*nar2":"special-style-nerthus-nar2","*nar3":"special-style-nerthus-nar3","*nar6":"special-style-nerthus-nar-rainbow","*dial":"wrapper-special-style-nerthus-dial1","*dial1":"wrapper-special-style-nerthus-dial1","*dial2":"wrapper-special-style-nerthus-dial2","*dial3":"wrapper-special-style-nerthus-dial3","*dial666":"wrapper-special-style-nerthus-dial666","*lang":"message-part special-style-nerthus-lang","*sys":"special-style-nerthus-sys","*map":"special-style-nerthus-sys","*light":"special-style-nerthus-sys","*addGraf":"special-style-nerthus-sys","*delGraf":"special-style-nerthus-sys","*hide":"special-style-nerthus-sys","*weather":"special-style-nerthus-sys"},w={CLAN:"CLAN",COMMERCIAL:"COMMERCIAL",GLOBAL:"GLOBAL",GROUP:"GROUP",LOCAL:"LOCAL",PRIVATE:"PRIVATE",SYSTEM:"SYSTEM",TRADE:"TRADE"},k=$('<style id="chat-plus-plus-styles">').appendTo("head"),v={};function z(e,t){v[e]||(k.append(t),v[e]=t)}const j={multiMsg:!0,justifyChat:!1,mergeMessages:!0,sendMessageTimeout:2500},L=[];let E;function A(e){return g.chatController.getChatConfig().getChannelColor(e,!0)}function C(){const e={};for(const t in w)e[t]=A(t);const t=function(e){const t=document.createElement("div");t.style.display="none",t.innerHTML='<div class="one-message-wrapper"> <div class="new-chat-message"> <span class="information-part"> <span class="ts-section"></span> <span class="channel-section"></span> <span class="author-section click-able"></span> <span class="receiver-arrow-section">-&gt;</span> <span class="receiver-section"></span> </span> <span class="message-part"> <span class="message-section">message</span> </span> </div></div> ',document.body.appendChild(t);const n=t.querySelector(".one-message-wrapper"),o=t.querySelector(".new-chat-message"),a=t.querySelector(".message-section"),i=window.getComputedStyle(a).color,s=n.className,r=o.className,c={};for(const t in e){n.classList.add(`${t}-message-wrapper`),o.classList.add(`chat-${t}-message`);const e=window.getComputedStyle(a).color;e!==i&&(c[t]=e),n.className=s,o.className=r}return document.body.removeChild(t),c}(e);!function(e){z("inputClasses",`#inpchat.priv { color: ${e[s.PRIVATE]}; }#inpchat.clant { color: ${e[s.CLAN]}; }#inpchat.team { color: ${e[s.GROUP]}; }#inpchat.sys_comm { color: ${e[s.SYSTEM]}; } `)}({...e,...t})}function S(e){let t;t=e.value.trim().split(" ")[0],e.style.color="",e.className=e.classList.contains("unfolded")?"unfolded":"",e.style.color="",t.startsWith("@")?e.classList.add("priv"):y[t]&&e.classList.add(...y[t].split(" "))}function T(){const e=document.createElement("textarea");e.id="inpchat";const t=document.getElementById("bottombar");return document.getElementById("inpchat").remove(),E=document.createElement("div"),E.id="textarea-background",t.appendChild(E),t.appendChild(e),$("#bchat").off("click"),g.chatController.getChatInputWrapper().init(),e.addEventListener("mousedown",(e=>e.stopPropagation()),!0),{textarea:e,background:E}}function O(){let e,t;C(),e="#bottombar",document.querySelector("#bottombar").addEventListener("keyup",(e=>{"Enter"===e.key&&function(e){for(const t of L)if(t(e))return e.preventDefault(),e.stopImmediatePropagation(),void e.stopPropagation()}(e)}),!0);{const{textarea:e,background:n}=T();(function(e,t){const n=function(){C(),S(e),function(e){const t=document.createElement("div");t.id="chat",t.className="left",t.style.display="none",document.body.appendChild(t);const n=window.getComputedStyle(t).backgroundImage;document.body.removeChild(t),e.style.backgroundImage!==n&&(e.style.backgroundImage=n)}(t)};if(setTimeout(n,1e3),setTimeout(n,2e3),"function"!=typeof window.shairModuleLoader&&!document.getElementById("loading"))return;const o=document.getElementById("loading");'url("https://i.imgur.com/1en4JTp.png")'===window.getComputedStyle(o,null).backgroundImage&&(document.getElementById("textarea-background").style.left="146px",document.getElementById("inpchat").style.left="65px",setTimeout(n,3e3),setTimeout(n,5e3),setTimeout(n,2e4))})(e,n),t=e,j.multiMsg||(t.maxLength=199)}return t.addEventListener("input",(()=>{return e=t,j.multiMsg||function(e){e.value.length>199&&(e.value=e.value.substr(0,199));const t=/[ąćęłńóśźż*@,. _]/gi;let n=0;for(const o of e.value)o.match(t)&&(n++,e.value=e.value.substr(0,199-n));e.maxLength=199-n}(e),void S(e);var e}),!1),t.addEventListener("input",(()=>{return e=t,void localStorage.setItem("lastInputtedMsg",e.value);var e}),!1),function(e){const t=localStorage.getItem("lastInputtedMsg");t&&(e.value=t,document.getElementById("bottxt").style.display="none",S(e))}(t),t}function M(e){if(e.startsWith("@")){const t=e.split(" ")[0].substring(1);return(e=e.split(" ")).shift(),e=e.join(" "),void window._g(`chat&channel=personal&receiver=${t}`,!1,{c:e})}i[e.substring(0,3)]?window._g(`chat&channel=${i[e.substring(0,3)]}`,!1,{c:e.substring(3)}):window._g("chat&channel=local",!1,{c:e})}const I="Wysyła podejrzaną część wiadomości do samego siebie.Jeżeli wiadomość zostanie zagwiazdkowana <b>lub nie pojawi się dwa razy</b>, prawdopodobnie nie należy jej wysyłać.Testuje tylko pierwsze zaczerwienione słowo w wiadomości.",P='<div class="header-label-positioner"> <div class="header-label"> <div class="left-decor"></div> <div class="right-decor"></div> <span class="panel-name">Automute Catcher</span> </div></div><div class="close-decor"> <button class="close-button" tip="Zamknij"/></div><div class="background"> <div class="top-box"> </div> <div class="bottom-box"> <button class="button text-button bottom-test">Przetestuj</button> <button class="button text-button bottom-send">Wyślij</button> <button class="button text-button bottom-close">Nie wysyłaj</button> <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a> </div></div>',W='Twoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br><span style="color:red">Zawiera ona zwrot "ahoj", który poprzedzony jest przezdowolną literę "a". Tak, w ten sposób automute sprawdza, czy jest to "przekleństwo".Jeżeli chcesz wysłać tak czy siak, droga wolna.Wiedz jednak, że akurat w tym przypadku nie ma pomyłek.</span>',R='Twoja wiadomość prawdopodobnie byłaby wyłapana przez automute, ale masz szczęście ;) <br>Poniżej wiadomość, jaką widzi automute:<hr><span class="cpp-mute-text" style="word-wrap: break-word; text-align: left;"></span><hr>Czy mimo tego chcesz ją wysłać? Jeżeli wiadomość przejdzie bezgwiazdkowania wyślij wyjątek do Kris Aphalon na Discordzie bądź na skrzynkę pocztową';function N(e,t,n){if(document.getElementById("cpp-automute-panel"))return;const o=n?W:R,a=document.createElement("div");a.addEventListener("mousedown",b,!1),a.id="cpp-automute-panel",a.className="cpp-panel",a.innerHTML=P;const s=I;a.querySelector(".bottom-test").setAttribute("tip",s),a.querySelector(".top-box").innerHTML=o,n||(a.querySelector(".cpp-mute-text").innerHTML=t);const r=function(){document.body.removeChild(a),document.getElementById("inpchat").focus()};a.querySelector("#cpp-automute-panel .close-button").addEventListener("click",r),a.querySelector(".bottom-close").addEventListener("click",r),a.querySelector(".bottom-send").addEventListener("click",r),a.querySelector(".bottom-send").addEventListener("click",(()=>{M(e),document.querySelector("#inpchat").value=""})),a.querySelector(".bottom-test").addEventListener("click",(()=>function(e,t){let n=e;"@"===n[0]&&(n=n.slice(n.indexOf(" ")));const o=t.match(/<span style='color: red; font-weight: bold'>(.*)<\/span>/);if(!o?.[1])return message("Coś poszło nie tak przy testowaniu. Wyślij wiadomość którą próbowałeś przetestować do Kris Aphalon na Discordzie");const a=o[1],s=Math.max(n.indexOf(a)-20,0),r=Math.min(n.indexOf(a)+a.length+20,n.length);let c=n.substring(s,r);i[c.substring(0,3)]&&(c=c.substring(3));let l="";l=hero.nick,M("@"+l.split(" ").join("_")+" "+c)}(e,t))),document.body.appendChild(a)}function B(e,t){let n=!0;for(const o of t)e.includes(o)&&(console.log("Wykryto zwrot który jest niemiły: "+o),e=e.split(o).join("<span style='color: red; font-weight: bold'>"+o+"</span>"),n=!1);return!n&&e}function q(e,t){for(const n of t)e=e.split(n).join("X");return e}function G(){let e;return e=document.querySelector("#inpchat").value,function(e){let i=e.toLowerCase();if("@"===i[0]&&(i=i.slice(i.indexOf(" "))),i=q(i,o),i=i.replace(/[^a-zńąćśźżóęł ]/g,"").replace(/ą/g,"a").replace(/ę/g,"e").replace(/ł/g,"l").replace(/[żź]/g,"z").replace(/ó/g,"o").replace(/ń/g,"n").replace(/ć/g,"c").replace(/ś/g,"s"),/a(?=.*ahoj)(?!hoj.*ahoj)/g.test(i))return N(e,"",!0),!0;let s=B(i,t);return s?(N(e,s),!0):(i=q(i,a),i=i.replace(/ /g,""),i=function(e){if(0===e.length)return"";let t=e[0],n=e[0];for(let o=1;o<e.length;o++)e[o]!==n&&(t+=e[o]),n=e[o];return t}(i),s=B(i,n),!!s&&(N(e,s),!0))}(e)}const D=30;function J(e){const t=document.getElementById("textarea-background");e.classList.remove("unfolded"),t.classList.remove("unfolded"),z("hideInputScrollbar","#input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}")}function Y(e){e.value.length>D?function(e){const t=document.getElementById("textarea-background");e.classList.add("unfolded"),t.classList.add("unfolded"),function(e){if(v[e]){const t=k.text().split(v[e]).join("");k.text(t),delete v[e]}}("hideInputScrollbar")}(e):J(e)}function _(e){e.addEventListener("focusout",J,!1),e.addEventListener("focusin",(()=>Y(e)),!1)}function U(e){J(e),e.removeEventListener("focusout",J,!1),e.removeEventListener("focusin",(()=>Y(e)),!1)}const V=/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;function Z(e){let t=(e=e.trim()).split(" "),n=!1,o="";if("/"===e[0]||"*"===e[0]){let a=e.split(" ",1)[0];switch(a){case"/lm":a=hero.nick;break;case"/l":case"/o":case"/h":case"/g":case"/k":n=!0;case"/ln":case"*me":case"*nar":case"*nar1":case"*nar2":case"*nar3":case"*nar6":case"*sys":a="";break;case"*dial":case"*dial1":case"*dial2":case"*dial3":case"*dial666":{const n=e.split(",");n.shift(),t=n.join(",").split(" "),a="";break}case"*lang":{const n=e.split(",");n.shift(),t=n.join(",").split(" "),a="",o="*";break}}t.shift(),""!==a&&t.unshift(a)}else"@"===e[0]&&(n=!0,t.shift());e="";const a=t.length;for(let n=0;n<a;n++)""!==t[n]&&(e+=t[n]+" ");return e=e.trim(),o&&(e=`${o}${e}${o}`),n?Z(e):e}function H(e){const t=e.children[1].innerText.trim();if(void 0!==ce.sendArr[0]&&t===Z(ce.sendArr[0])){if(clearTimeout(ce.sendTimeout),ce.sendArr.shift(),0===ce.sendArr.length)return;setTimeout((function(){ce.sendArr[0].match(V).length>0&&l(ce.sendArr[0])}),j.sendMessageTimeout),ce.sendTimeout=setTimeout(re,3*j.sendMessageTimeout)}}function K(e){for(const t of e)for(const e of t.addedNodes)H(e)}const X=[],F={},Q=/[ąćęłńóśźż@]/gi;function ee(e){const t=c(e),n=t.match(Q);return n?t.length+n.length:t.length}function te(e,t){return e[t].startsWith("/lm")&&(e[t]="*me"),e[t].startsWith("/ln")&&(e[t]="*nar"),e[t].startsWith("*dial")||e[t].startsWith("*lang")?e.slice(t).join(" ").split(",")[0]+", ":e[t]+" "}function ne(e,t,n){const o=function(e,t,n){const o=e.substring(n||0).search(/[!?.] /);return o>=0?o+(n||0):o}(e,0,Math.floor(n/2));if(o>=0)return o+2;const a=e.lastIndexOf(" ");return a>=0?a+1:t}function oe(e,t){let n=0;for(let o=0;o<t&&(n++,!(n>=e.length));o++)e[n].match(Q)&&o++;return n}function ae(e){const t=function(e){const t=e.split(" ");if(t.length<=1)return"";let n="";return(e.startsWith("@")||Object.keys(i).includes(t[0]+" "))&&(n=t[0]+" "),(e.startsWith("*")||e.startsWith("/lm")||e.startsWith("/ln"))&&(n=te(t,0)),n&&!n.startsWith("*")&&t[1].startsWith("*")&&(n+=te(t,1)),n}(e);return ce.sendArr.splice(0),!(ee(e)<=197||(function(e,t,n){if(""===e)return;const o=function(e,t,n){n-=ee(t);const o=[];for(;e.length>0;){const a=oe(e,n),i=e.substring(0,a),s=ee(e)>n?ne(i,a,n):e.length;o.push(t+i.substring(0,s).trim()),e=e.slice(s)}return o}(e=e.substring(t.length),t,n);console.log(o);for(let e of o)ce.sendArr.push(e)}(e,t,197),e.startsWith("/lm")&&(ce.sendArr[0]=ce.sendArr[0].replace(/^.{3}/,"/lm")),e.startsWith("/ln")&&(ce.sendArr[0]=ce.sendArr[0].replace(/^.{3}/,"/nar")),ce.sendArr.length>0&&(l(ce.sendArr[0]),ce.sendTimeout=setTimeout(re,3*j.sendMessageTimeout)),0))}function ie(){let e;return e=document.querySelector("#inpchat").value,t=(t=(t=(t=e).replace(/ /g," ")).replace(/[«»]/g,"")).trim(),!(!j.multiMsg||""===t)&&ae(t);var t}function se(){return j.multiMsg=!j.multiMsg,localStorage.setItem("chatPlusPlus",JSON.stringify(j)),!1}function re(){0!==ce.sendArr.length&&(sessionStorage.noAnwserMsgDisplayed||(window.message("Coś poszło nie tak i twoja wiadomość nie została wysłana na chat.\nKliknij PPM na koordynaty, by przywrócić resztę niewysłanej wiadomości.\nJeżeli wiadomość widnieje na chacie, zignoruj ten komunikat."),sessionStorage.noAnwserMsgDisplayed=!0))}const ce={sendArr:[],sendTimeout:0,blockTextareaChanging:!1};function le(){var e;!function(){const e=localStorage.getItem("chatPlusPlus");if(e){const t=JSON.parse(e);for(const e of Object.keys(t))j[e]=t[e]}localStorage.setItem("chatPlusPlus",JSON.stringify(j))}(),z("basic",'#inpchat{background-image:unset;background-position-y:-8px;background-repeat:repeat-y;bottom:0;display:inline;font-size:12px;height:17px;left:90px;line-height:17px;margin:0;overflow-x:scroll;padding:0;position:absolute;resize:none;scrollbar-width:none;top:unset !important;white-space:nowrap;width:312px}#lastmsg{pointer-events:none}#inpchat.unfolded{background-position-y:0;height:150px;line-height:25.6px;overflow-x:hidden;scrollbar-width:thin;white-space:pre-wrap}#inpchat::-webkit-scrollbar{display:none}#inpchat.unfolded::-webkit-scrollbar{display:block}#bottombar{overflow:visible;z-index:362}#textarea-background{background-position-y:-98px;bottom:-84px;display:none;height:318px;left:171px;position:absolute;-moz-transform:rotate(90deg);-ms-transform:rotate(90deg);-o-transform:rotate(90deg);-webkit-transform:rotate(90deg);transform:rotate(90deg);width:150px}#textarea-background.unfolded{display:block}#lagmeter,#botloc,#bchat,#pvpmode{z-index:363}.cpp-panel{animation:fade .5s;border-image:url(https://cronus.margonem.com/img/gui/tmp/window-frame.png) 32 20 repeat;border-style:solid;border-width:34px 13px 10px 13px;color:#000;left:calc(50% - 204px);pointer-events:auto;position:fixed;top:calc(50% - 150px);transition:opacity .35s ease-in-out;width:380px;z-index:499}.cpp-panel>.background{background-color:#f1deaa;background-image:url(https://cronus.margonem.com/img/gui/content-redleather.jpg)}.cpp-panel>.header-label-positioner{left:10px;pointer-events:none;position:absolute;right:10px;text-align:center;top:-35px}.cpp-panel .header-label{background:url(https://cronus.margonem.com/img/gui/dialogue/dialogi-naglowek.png);display:inline-block;height:28px;margin:0 auto;position:relative}.cpp-panel .header-label>.right-decor,.cpp-panel .header-label>.left-decor{background:url(https://cronus.margonem.com/img/gui/dialogue/dialogi.png) -38px -2px;height:28px;left:-52px;position:absolute;top:0;width:52px}.cpp-panel .header-label>.right-decor{background-position:-91px -2px;left:auto;right:-52px}.cpp-panel .header-label>span{color:beige;line-height:28px;text-align:center}.cpp-panel .panel-name{transition:width .35s ease-in-out}.cpp-panel>.close-decor{background:url(https://cronus.margonem.com/img/gui/buttony.png?v=5) -380px -55px;height:52px;pointer-events:none;position:absolute;right:-15px;top:-35px;width:51px}.cpp-panel .close-button{background:url(https://cronus.margonem.com/img/gui/buttony.png?v=5) -263px -79px;border:0;cursor:pointer;height:22px;padding:0;pointer-events:auto;position:absolute;right:3px;top:3px;width:22px}.cpp-panel .close-button:hover{background-position:-286px -79px}.cpp-panel .settings-box{height:75px;display:grid;grid-template-columns:50% auto;grid-template-rows:50% auto;justify-items:center;align-items:center;padding-top:10px}.cpp-panel .setting-label{cursor:unset;height:24px;position:relative;width:155px;user-select:none}.cpp-panel .setting-label-text{cursor:pointer;left:25px;line-height:28px;position:relative}.cpp-panel .setting-checkbox{display:none}.cpp-panel .checkbox-outline{border:2px solid #6e644b;border-radius:2px;box-sizing:border-box;cursor:pointer;display:inline-block;height:18px;left:0;margin:0;overflow:hidden;position:absolute;top:3px;width:18px;z-index:2}.checkmark{display:none;height:22px;left:-4px;pointer-events:none;position:relative;top:-2px;transform:rotate(45deg);width:22px}.checkmark-stem{background-color:#f1dfa8;height:13px;left:10px;position:absolute;top:2px;width:2px}.checkmark-kick{background-color:#f1dfa8;height:2px;left:5px;position:absolute;top:13px;width:6px}.cpp-panel .setting-checkbox:checked+.checkbox-outline{background-color:#6e644b}.cpp-panel .setting-checkbox:checked+.checkbox-outline .checkmark{display:inline-block}.cpp-panel .save-button{margin-right:30px}.cpp-panel .cancel-button{margin-left:30px}.cpp-panel .cancel-button:not(:hover){background-image:linear-gradient(to top, #310b0b, #831f1f)}.cpp-panel .cancel-button:not(:hover)::before{box-shadow:inset 0 0 1px 1px rgba(218,97,97,.6509803922)}.cpp-panel .hidden{display:none}.cpp-panel .button{background-image:linear-gradient(to top, #12210d, #396b29);border:1px solid #0c0d0d;border-radius:4px;box-shadow:inset 0 0 1px 1px #cecece,inset 0 0 0 3px #0c0d0d;box-sizing:border-box;color:#e6d6bf;cursor:pointer;display:inline-block;height:42px;line-height:34px;position:relative;width:42px}.cpp-panel.button.blue{background-image:linear-gradient(to top, #081522, #1d4873)}.cpp-panel .button.blue:not(:hover)::before{box-shadow:inset 0 0 1px 1px rgba(85,148,212,.6509803922)}.cpp-panel .button:before{backface-visibility:hidden;border-radius:4px;bottom:3px;box-shadow:inset 0 0 1px 1px rgba(126,197,104,.6509803922);content:"";left:3px;position:absolute;right:3px;top:3px;transform:translateZ(0)}.cpp-panel .button:after{border-radius:3px;bottom:0;box-shadow:0 1px 0 1px #0c0d0d;content:"";left:0;position:absolute;right:0;top:0}.cpp-panel .button:hover:before{box-shadow:inset 0 0 1px 1px rgba(144,144,144,.6509803922)}.cpp-panel .button:hover{background-image:linear-gradient(to top, #101010, #434343)}.cpp-panel .bottom-box{display:flex;height:50px;justify-content:center}#cpp-automute-panel .bottom-box{justify-content:space-evenly}#cpp-automute-panel .text-button{justify-content:space-evenly}.cpp-panel .text-button{border-radius:6px;height:28px;line-height:24px;margin-top:10px;text-align:center;width:90px}.cpp-panel .text-button::before,.cpp-panel .text-button::after{content:unset}.cpp-panel .donate-button{background-image:linear-gradient(to top, #58310b, #daa520);bottom:6px;box-shadow:inset 0 0 1px 1px #cecece,inset 0 0 0 3px #0c0d0d;height:35px;padding:2px 0 0 0;position:absolute;right:5px;width:35px;font-size:25px;color:#000}.cpp-panel .donate-button span{top:-2px;position:relative}.cpp-panel .donate-button:hover{color:pink}.cpp-panel .donate-button::before{content:"";position:absolute;left:3px;top:3px;bottom:3px;right:3px;box-shadow:inset 0 0 1px 1px rgba(237,177,117,.65);border-radius:4px;transform:translateZ(0);backface-visibility:hidden}#cpp-test-button{position:absolute;left:20px;bottom:20px;width:77px}#cpp-automute-panel .top-box{text-align:center}#cpp-automute-panel .donate-button{right:0;bottom:3px}'),(e=O()).addEventListener("input",(()=>Y(e)),!1),2===g.chatController.getChatWindow().getChatSize()?_(e):U(e),function(e){const t=document.getElementById("chat");new MutationObserver((t=>{t.forEach((t=>{t.target.classList.contains("left")?_(e):(J(),U(e))}))})).observe(t,{attributeFilter:["class"]})}(e),function(){const e=document.getElementById("chattxt");new MutationObserver(K).observe(e,{attributes:!1,childList:!0,subtree:!0})}(),L.push(G),function(e,t,n,o){const a=`<label class="setting-label"> <span class="setting-label-text" tip="Wysyłaj wiadomości dłuższe niż 200 znaków dzięki wykorzystaniu najnowszych nowinek technologi.">MultiMsg</span> <input class="setting-checkbox" id="cpp-setting-${e}" name="${e}" type="checkbox" ${j[e]?" checked":""}> <span class="checkbox-outline"> <span class="checkmark"> <div class="checkmark-stem"></div> <div class="checkmark-kick"></div> </span> </span></label>`;X.push(a),F[e]=o}("multiMsg",0,0,se),L.push(ie)}"complete"===document.readyState?le():window.addEventListener("load",le)}();