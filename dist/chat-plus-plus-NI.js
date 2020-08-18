(()=>{"use strict";var e={347:(e,t,n)=>{n.d(t,{t:()=>R,y:()=>V});const o={multiMsg:!0,justifyChat:!1,mergeMessages:!0,messageTimeout:2e3};function a(){localStorage.setItem("chatPlusPlus",JSON.stringify(o))}var i=n(529);let r,s,c,l,p;function d(e){e.target===e.currentTarget&&(window.Engine.lock.add("cpp-dragging"),(e=e||window.event).preventDefault(),c=e.clientX,l=e.clientY,p=e.target,document.addEventListener("mousemove",u),document.addEventListener("mouseup",g))}function u(e){(e=e||window.event).preventDefault(),r=c-e.clientX,s=l-e.clientY,c=e.clientX,l=e.clientY,p.style.top=p.offsetTop-s+"px",p.style.left=p.offsetLeft-r+"px"}function g(){window.Engine.lock.remove("cpp-dragging"),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",g)}const h=[],m={};function b(e){if(e.preventDefault(),!document.getElementById("cpp-panel")){const e=document.createElement("div");e.addEventListener("mousedown",d,!1),e.id="cpp-panel",e.innerHTML=`\n<div class="header-label-positioner">\n    <div class="header-label">\n        <div class="left-decor"></div>\n        <div class="right-decor"></div>\n        <span class="panel-name">Chat Plus Plus</span>\n    </div>\n</div>\n<div class="close-decor">\n    <button class="close-button" tip="Zamknij"/>\n</div>\n<div class="background">\n    <div class="settings-box">\n    ${h.join("")}\n    </div>\n    <div class="bottom-box">\n        <button class="button text-button bottom-close">OK</button>\n        <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Donate Me"><span>♥</span></button></a>\n    </div>\n</div>\n`;const t=function(){document.body.removeChild(e)};e.querySelector("#cpp-panel .close-button").addEventListener("click",t),e.querySelector(".bottom-close").addEventListener("click",t),e.querySelector(".bottom-close").addEventListener("click",(function(){message("Zapisano!")}));for(const t in m){const n=e.querySelector("#cpp-setting-"+t);n.checked=o[t],n.addEventListener("input",(function(){m[t]()}))}document.body.appendChild(e),$("[tip]",$(e)).each((function(){const e=$(this);e.tip(e.attr("tip"))}))}}function f(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return x(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return x(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,r=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return r=e.done,e},e:function(e){s=!0,i=e},f:function(){try{r||null==n.return||n.return()}finally{if(s)throw i}}}}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}let y;function v(e){if(["/","@","*"].includes(e[0])){if("*"!==e[0]){const t=e.split(" ");return t.shift(),"@"===e[0]?v(t.join(" ")):t.join(" ")}{const t=e.split(" ");switch(t[0]){case"*me":case"*nar":case"*nar1":case"*nar2":case"*nar3":case"*sys":return t.shift(),t.join(" ");case"*dial":case"*dial1":case"*dial2":case"*dial3":case"*dial666":{const t=e.split(",");return t.shift(),t.join(",")}}}}return e}function k(e){let t=0;const n=e.length;for(let o=0;o<n;o++)e[o].match(z)?t+=2:t++;return t}function w(e){e.preventDefault();const t=document.getElementById("inpchat");let n="";const o=V.sendArr.length;if(0===o)return!1;if(o>=1&&(window.message("Przywracanie wiadomości..."),n=V.sendArr[0].trim()),o>1)for(let e=1;e<o;e++){n+=" "+v(V.sendArr[e]).trim()}return console.log(n),t.value=n,!1}function j(e){let t=(e=e.trim()).split(" "),n=!1;if("/"===e[0]||"*"===e[0]){let o=e.split(" ",1)[0];switch(o){case"/me":o=Engine.hero.nick;break;case"/g":case"/k":n=!0;case"/nar":case"*me":case"*nar":case"*nar1":case"*nar2":case"*nar3":case"*sys":o="";break;case"*dial":case"*dial1":case"*dial2":case"*dial3":case"*dial666":{const n=e.split(","),a=n[0].split(" ");n.shift(),t=n.join(",").split(" "),t.unshift(""),a.shift();o="«"+a.join(" ")+"»";break}}t.shift(),""!==o&&t.unshift(o)}else"@"===e[0]&&(n=!0,t.shift());e="";const o=t.length;for(let n=0;n<o;n++)""!==t[n]&&(e+=t[n]+" ");return e=e.trim(),n?j(e):e}const z=/[ąćęłńóśźż*@,. _]/gi;function E(e){if(e=(e=(e=document.getElementById("inpchat").value).replace(/ /g," ")).replace(/[«»]/g,""),o.multiMsg&&""!==e){const t=function(e){let t="";const n=e.split(" ");if(n.length>1){if("*"===n[0][0]||"/"===n[0][0]){t="k"!==n[0][1]&&"g"!==n[0][1]||void 0!==n[0][2]?"*":"/";const o=n[0].slice(1);t+=o+" ",o.startsWith("dial")&&(t=e.split(",")[0]+", ")}else"@"===n[0][0]&&(t=e.split(" ")[0]+" ");if("*"===n[1][0]&&(n[0].startsWith("/k")||n[0].startsWith("/g")||n[0].startsWith("@"))){const o=n[1].slice(1);t+="*"+o+" ",o.startsWith("dial")&&(t=e.split(",")[0]+", ")}}return t}(e=e.trim());V.sendArr.splice(0);const n=e.length;let a=0,i=0,r=0,s=0,c=0,l=0;const p=195-k(t);if(console.log({maxLen:p,msg:e,len:n}),k(e)>p){for(let o=0;o<n;o++)if(e[o].match(z)?(l+=2,c+=2,i+=2):(l++,c++,i++)," "===e[o]?(r=o,c=0):"."===e[o]&&(s=o,l=0),r+30<o&&(r=o,c=0),i>=p){if(s+100<o)0===a?V.sendArr.push(e.slice(0,r)):V.sendArr.push(t+e.slice(a,r).trim()),a=r,i=c;else{let n=0;for(let t=0;t<5&&("."===e[s+t]||" "===e[s+t]);t++)n++;0===a?V.sendArr.push(e.slice(0,s+n)):V.sendArr.push(t+e.slice(a,s+n).trim()),a=s+n,i=l}console.log(V.sendArr)}""!==e&&(0===a?V.sendArr.push(e):""!==e.slice(a)&&V.sendArr.push(t+e.slice(a).trim()));const d=/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;let u;u=document.querySelector(".chat-tpl .messages-wrapper .scroll-pane");const g={attributes:!1,childList:!0,subtree:!1};new MutationObserver((function(e){var t,n=f(e);try{for(n.s();!(t=n.n()).done;){const e=t.value,n=e.addedNodes.length;for(let t=0;t<n;t++){let n;n=e.addedNodes[t].children[2].innerText.trim(),void 0!==V.sendArr[0]&&(console.log([n.trim(),j(V.sendArr[0]),n.trim()===j(V.sendArr[0])]),n.trim()===j(V.sendArr[0])&&(clearTimeout(V.sendTimeout),V.sendArr.shift(),V.sendArr.length>0&&(setTimeout((function(){V.sendArr[0].match(d).length>0&&y(V.sendArr[0])}),o.messageTimeout),V.sendArr.length>1&&(V.sendTimeout=setTimeout(R,3*o.messageTimeout)))))}}}catch(e){n.e(e)}finally{n.f()}})).observe(u,g),V.sendArr.length>0&&(y(V.sendArr[0]),V.sendTimeout=setTimeout(R,3*o.messageTimeout)),document.getElementById("inpchat").blur(),setTimeout((function(){document.getElementById("inpchat").focus(),document.getElementById("inpchat").blur()}),100)}else y(e),setTimeout((function(){document.getElementById("inpchat").focus(),document.getElementById("inpchat").blur()}),100)}else y(e),setTimeout((function(){document.getElementById("inpchat").focus(),document.getElementById("inpchat").blur()}),100);document.getElementById("inpchat").value=""}function L(){return o.multiMsg=!o.multiMsg,a(),!1}function A(){return function(e,t,n,a){const i=`\n<label class="setting-label">\n    <span class="setting-label-text" tip="${n}">${t}</span>\n    <input class="setting-checkbox" id="cpp-setting-${e}" name="${e}" type="checkbox" ${o[e]?" checked":""}>\n    <span class="checkbox-outline">\n        <span class="checkmark">\n        <div class="checkmark-stem"></div>\n        <div class="checkmark-kick"></div>\n    </span>\n    </span>\n</label>\n`;h.push(i),m[e]=a}("multiMsg","MultiMsg","Wysyłaj wiadomości dłuższe niż 200 znaków dzięki wykorzystaniu najnowszych nowinek technologi.",L),y=Engine.chat.sendMessage.bind(Engine.chat),Engine.chat.sendMessage=E.bind(Engine.chat),document.querySelector(".chat-tpl .send-btn").addEventListener("contextmenu",w),Engine.chat.sendMessage}var S=n(160);var I=n(780);const T=$('<style id="chat-plus-plus-styles">').appendTo("head"),B={};function M(e,t){B[e]||(T.append(t),B[e]=t)}function O(e){if(B[e]){const t=T.text().split(B[e]).join("");T.text(t),delete B[e]}}let C,N;const P={priv:"#fc0",clant:"#ffa500",team:"#b554ff",sys_comm:"#f33"};function _(){localStorage.setItem("lastInputtedMsg",C.value)}function W(){const e=document.getElementById("inpchat");{const t=C.value.length;return C.value=C.value.replace(/\r?\n/gi,""),o.multiMsg?C.removeAttribute("maxLength"):function(e){e.value.length>199&&(e.value=e.value.substr(0,199));const t=/[ąćęłńóśźż*@,. _]/gi;let n=0;for(let o=0;o<e.value.length;o++)e.value[o].match(t)&&(n++,e.value=e.value.substr(0,199-n));e.maxLength=199-n}(C),J(),t>("466px"===C.style.width?45:20)?function(){if(""===C.value)q();else{{const e=document.querySelector(":not([data-template=chat-tpl]) > .messages-wrapper > .scroll-pane"),t=document.getElementById("textarea-background"),n=document.getElementById("textarea-background-up");C.classList.add("unfolded"),t.style.display="block",n.style.display="block";let o=!1;e.scrollTop===e.scrollHeight-e.clientHeight&&(o=!0),e.classList.add("input-unfolded"),o&&(e.scrollTop=e.scrollHeight)}O("hideInputScrollbar")}}():q(),o.multiMsg||(e.value=C.value),C.value}}function J(){const e=C.value.trim().split(" ")[0];if(C.classList.contains("unfolded")?C.className="unfolded":C.className="",C.style.color="","@"===e[0])C.style.color=P.priv;else switch(e){case"/g":C.style.color=P.team;break;case"/k":C.style.color=P.clant;break;case"*me":case"/me":C.classList.add("me");break;case"*nar":case"*nar1":case"/nar":C.classList.add("nar");break;case"*nar2":C.classList.add("nar2");break;case"*nar3":C.classList.add("nar3");break;case"*dial":case"*dial1":C.classList.add("dial1");break;case"*dial2":C.classList.add("dial2");break;case"*dial3":C.classList.add("dial3");break;case"*dial666":C.classList.add("dial666");break;case"*sys":case"*map":case"*light":case"*addGraf":case"*delGraf":case"*hide":case"*weather":C.style.color=P.sys_comm}}function q(){{const e=document.querySelector(":not([data-template=chat-tpl]) > .messages-wrapper > .scroll-pane"),t=document.getElementById("textarea-background"),n=document.getElementById("textarea-background-up");C.classList.remove("unfolded"),t.style.display="none",n.style.display="none",e.classList.remove("input-unfolded")}M("hideInputScrollbar","#input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}")}function D(){{const t=document.getElementsByClassName("chat-tpl")[0].children[5];t.style.zIndex="200";const n=t.children[0];n.style.opacity="0",n.style.pointerEvents="none",C=document.createElement("textarea"),C.id="inpchat",C.placeholder="Naciśnij Enter, aby porozmawiać",o.multiMsg||(C.maxLength=199),C.addEventListener("keypress",(function(e){"Enter"===e.key&&(C.blur(),""!==C.value&&Engine.chat.sendMessage(C.value))}),!0),n.addEventListener("focusin",(function(){C.focus()})),t.prepend(C),N=document.createElement("div"),N.id="textarea-background",t.insertBefore(N,C);const a=document.createElement("div");a.id="textarea-background-up",t.insertBefore(a,N),(e=C).addEventListener("focusout",q,!1),e.addEventListener("focusin",W,!1);const i=n.value;Object.defineProperty(n,"value",{set(e){this.__value=e,C.value===n.value||V.blockTextareaChanging||(C.value=n.value)},get(){return void 0===this.__value?i:this.__value}}),W()}var e;navigator.userAgent.endsWith("Firefox/52.0")&&(C.style.overflowX="hidden"),C.addEventListener("input",W,!1),C.addEventListener("input",_,!1),function(){const e=document.createElement("div");e.className="chat-message",e.style.display="none";const t=document.createElement("div");e.appendChild(t);const n=["priv","sys_comm","clant","team"].length;{document.body.appendChild(e);const o=["priv-in-general","chat-message sys_red","clan-message","group-message"];for(let e=0;e<n;e++){const n=o[e];t.className=n,P[n]=window.getComputedStyle(t).color}}document.body.removeChild(e)}();const t=localStorage.getItem("lastInputtedMsg");t&&(C.value=t),J()}var X=n(78);document.getElementById("chatscrollbar");let Z,H=!1;function K(){{const e=document.getElementsByClassName("section chat-tpl")[0].children[4].children[1],t=["sys_info"],n=["priv-in-general","group-in-general","clan-in-general","system-in-general"],o=n.length,a=["me","nar","nar2","nar3","dial1","dial2","dial3","dial666"];if(document.getElementsByClassName("tabs-wrapper connectedSortable ui-sortable")[0].children[0].classList.contains("active")){const i=H?"":"none",r=e.children.length;for(let s=0;s<r;s++)if(a.indexOf(e.children[s].classList[1])<0&&a.indexOf(e.children[s].classList[2])<0&&a.indexOf(e.children[s].classList[3])<0)if(t.indexOf(e.children[s].classList[1])>=0)e.children[s].style.display=i;else{const t=e.children[s].children.length;for(let a=0;a<t;a++)for(let t=0;t<o;t++)if(e.children[s].children[a].classList.contains(n[t])){e.children[s].style.display=i;break}}H=!H}}}function Y(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return F(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return F(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,r=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return r=e.done,e},e:function(e){s=!0,i=e},f:function(){try{r||null==n.return||n.return()}finally{if(s)throw i}}}}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function G(e,t,n){mAlert(n?'\nTwoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br>\n<span style="color:red">Zawiera ona zwrot "ahoj", który poprzedzony jest przez\ndowolną literę "a". Tak, w ten sposób automute sprawdza czy jest to "przekleństwo".\nJeżeli chcesz wysłać tak czy siak, droga wolna.\nWiedz jednak, że akurat w tym przypadku nie ma pomyłek.</span>\n':`\nTwoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br>\nPoniżej wiadomość, jaką widzi automute:<hr><span style="word-wrap: break-word">\n${t}</span><hr>Czy mimo tego chcesz ją wysłać? Jeżeli wiadomość przejdzie bez\ngwiazdkowania wyślij wyjątek do Kris Aphalon#3484 na discordzie bądź na skrzynkę pocztową\n`,[{txt:"Wyślij",callback:function(){return Z(e),!0}},{txt:"Nie wysyłaj",callback:function(){return document.getElementById("inpchat").focus(),!0}}])}function U(e){let t=e;"@"===t[0]&&(t=t.slice(t.indexOf(" "))),t=t.toLowerCase();let n=!0;var o,a=Y(I);try{for(a.s();!(o=a.n()).done;){const e=o.value;t=t.split(e).join("X")}}catch(e){a.e(e)}finally{a.f()}t=t.replace(/[^a-zńąćśźżóęł ]/g,"").replace(/ą/g,"a").replace(/ę/g,"e").replace(/ł/g,"l").replace(/[żź]/g,"z").replace(/ó/g,"o").replace(/ń/g,"n").replace(/ć/g,"c").replace(/ś/g,"s");if(/a(?=(?:.)*ahoj)(?!hoj.*ahoj)/g.test(t))G(e,"",!0);else{var r,s=Y(S);try{for(s.s();!(r=s.n()).done;){const e=r.value;if(t.includes(e)){console.log("Wykryto zwrot który jest niemiły: "+e),t=t.split(e).join("<span style='color: red; font-weight: bold'>"+e+"</span>"),n=!1;break}}}catch(e){s.e(e)}finally{s.f()}if(n){var c,l=Y(X);try{for(l.s();!(c=l.n()).done;){const e=c.value;t=t.split(e).join("X")}}catch(e){l.e(e)}finally{l.f()}t=t.replace(/ /g,""),t=function(e){const t=e.length;if(0!==t){let n=e[0],o=e[0];for(let a=1;a<t;a++)e[a]!==o&&(n+=e[a]),o=e[a];return n}return""}(t);var p,d=Y(i);try{for(d.s();!(p=d.n()).done;){const e=p.value;if(t.includes(e)){console.log("Wykryto zwrot który jest niemiły: "+e),t=t.split(e).join("<span style='color: red; font-weight: bold'>"+e+"</span>"),n=!1;break}}}catch(e){d.e(e)}finally{d.f()}n?Z(e):G(e,t)}else G(e,t)}}function Q(e){Z=e,Engine.chat.sendMessage=U.bind(Engine.chat)}function R(){sessionStorage.noAnwserMsgDisplayed||(window.message("Coś poszło nie tak i twoja wiadomość nie została wysłana na chat. Kliknij PPM na koordynaty by przywrócić resztę niewysłanej wiadomości.\n Jeżeli wiadomość widnieje na chacie, zignoruj ten komunikat."),sessionStorage.noAnwserMsgDisplayed=!0)}const V={sendArr:[],sendTimeout:0,blockTextareaChanging:!1};function ee(){!function(){const e=localStorage.getItem("chatPlusPlus");if(e){const t=JSON.parse(e);for(const e in t)Object.prototype.hasOwnProperty.call(t,e)&&(o[e]=t[e])}localStorage.setItem("chatPlusPlus",JSON.stringify(o))}(),M("basic","#inpchat{background:0 0;border:0;bottom:2px;color:#fff;height:19px;left:-94px;margin:0;outline:0;overflow-x:scroll;padding:0;position:absolute;resize:none;scrollbar-width:none;white-space:nowrap;width:205px}#inpchat.unfolded{height:124px;line-height:25.6px;overflow-x:hidden;padding:4px;scrollbar-width:thin;white-space:pre-wrap}#textarea-background{background-color:#233316;border-image:url(/img/gui/chat-srodek-powtarzalny.png) 0 111 0 104 round round;border-style:solid;border-width:0 111px 0 104px;bottom:18px;height:50px;left:-104px;pointer-events:none;position:absolute}#textarea-background-up{border-image:url(/img/gui/chat-up.png) 14 111 0 104 fill repeat round;border-style:solid;border-width:14px 111px 0 104px;bottom:60px;height:60px;left:-104px;pointer-events:none;position:absolute}.chat-size-1 #textarea-background,.chat-size-1 #textarea-background-up{width:33px}.chat-size-2 #textarea-background,.chat-size-2 #textarea-background-up{width:290px}.chat-size-1 #inpchat{width:211px}.chat-size-2 #inpchat{width:463px}.section.chat-tpl .send-btn.right{z-index:201}.input-unfolded{height:calc(100% - 105px) !important}#cpp-panel{animation:fade 0.5s;border-image:url(http://cronus.margonem.com/img/gui/tmp/window-frame.png) 32 20 repeat;border-style:solid;border-width:34px 13px 10px 13px;color:#000;cursor:url(http://nerthus.margonem.pl/img/gui/cursor/1.png),url(http://nerthus.margonem.pl/img/gui/cursor/1.cur),auto;left:calc(50% - 204px);pointer-events:auto;position:fixed;top:calc(50% - 150px);transition:opacity 0.35s ease-in-out;width:380px;z-index:499}#cpp-panel>.background{background-color:#f1deaa;background-image:url(http://cronus.margonem.com/img/gui/content-redleather.jpg)}#cpp-panel>.header-label-positioner{left:10px;pointer-events:none;position:absolute;right:10px;text-align:center;top:-35px}#cpp-panel .header-label{background:url(http://cronus.margonem.com/img/gui/dialogue/dialogi-naglowek.png);display:inline-block;height:28px;margin:0 auto;position:relative}#cpp-panel .header-label>.right-decor,#cpp-panel .header-label>.left-decor{background:url(http://cronus.margonem.com/img/gui/dialogue/dialogi.png) -38px -2px;height:28px;left:-52px;position:absolute;top:0;width:52px}#cpp-panel .header-label>.right-decor{background-position:-91px -2px;left:auto;right:-52px}#cpp-panel .header-label>span{color:#f5f5dc;line-height:28px;text-align:center}#cpp-panel .panel-name{transition:width 0.35s ease-in-out}#cpp-panel>.close-decor{background:url(http://cronus.margonem.com/img/gui/buttony.png?v=5) -380px -55px;height:52px;pointer-events:none;position:absolute;right:-15px;top:-35px;width:51px}#cpp-panel .close-button{background:url(http://cronus.margonem.com/img/gui/buttony.png?v=5) -263px -79px;border:0;cursor:url(http://nerthus.margonem.pl/img/gui/cursor/5.png),url(http://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;height:22px;padding:0;pointer-events:auto;position:absolute;right:3px;top:3px;width:22px}#cpp-panel .close-button:hover{background-position:-286px -79px}#cpp-panel .settings-box{height:75px;display:grid;grid-template-columns:50% auto;grid-template-rows:50% auto;justify-items:center;align-items:center;padding-top:10px}#cpp-panel .setting-label{cursor:unset;height:24px;position:relative;width:155px;user-select:none}#cpp-panel .setting-label-text{cursor:url(http://nerthus.margonem.pl/img/gui/cursor/5.png),url(http://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;left:25px;line-height:28px;position:relative}#cpp-panel .setting-checkbox{display:none}#cpp-panel .checkbox-outline{border:2px solid #6e644b;border-radius:2px;box-sizing:border-box;cursor:url(http://nerthus.margonem.pl/img/gui/cursor/5.png),url(http://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;display:inline-block;height:18px;left:0;margin:0;overflow:hidden;position:absolute;top:3px;width:18px;z-index:2}.checkmark{display:none;height:22px;left:-4px;pointer-events:none;position:relative;top:-2px;transform:rotate(45deg);width:22px}.checkmark-stem{background-color:#f1dfa8;height:13px;left:10px;position:absolute;top:2px;width:2px}.checkmark-kick{background-color:#f1dfa8;height:2px;left:5px;position:absolute;top:13px;width:6px}#cpp-panel .setting-checkbox:checked+.checkbox-outline{background-color:#6e644b}#cpp-panel .setting-checkbox:checked+.checkbox-outline .checkmark{display:inline-block}#cpp-panel .save-button{margin-right:30px}#cpp-panel .cancel-button{margin-left:30px}#cpp-panel .cancel-button:not(:hover){background-image:linear-gradient(to top, #310b0b, #831f1f)}#cpp-panel .cancel-button:not(:hover)::before{box-shadow:inset 0 0 1px 1px #da6161a6}#cpp-panel .hidden{display:none}#cpp-panel .button{background-image:linear-gradient(to top, #12210d, #396b29);border:1px solid #0c0d0d;border-radius:4px;box-shadow:inset 0 0 1px 1px #cecece, inset 0 0 0 3px #0c0d0d;box-sizing:border-box;color:#E6D6BF;cursor:url(http://nerthus.margonem.pl/img/gui/cursor/5.png),url(http://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;display:inline-block;height:42px;line-height:34px;position:relative;width:42px}#cpp-panel.button.blue{background-image:linear-gradient(to top, #081522, #1d4873)}#cpp-panel .button.blue:not(:hover)::before{box-shadow:inset 0 0 1px 1px #5594d4a6}#cpp-panel .button:before{backface-visibility:hidden;border-radius:4px;bottom:3px;box-shadow:inset 0 0 1px 1px #7ec568a6;content:'';left:3px;position:absolute;right:3px;top:3px;transform:translateZ(0)}#cpp-panel .button:after{border-radius:3px;bottom:0;box-shadow:0 1px 0 1px #0c0d0d;content:'';left:0;position:absolute;right:0;top:0}#cpp-panel .button:hover:before{box-shadow:inset 0 0 1px 1px #909090a6}#cpp-panel .button:hover{background-image:linear-gradient(to top, #101010, #434343)}#cpp-panel .bottom-box{display:flex;height:50px;justify-content:center}#cpp-panel .text-button{border-radius:6px;height:28px;line-height:24px;margin-top:10px;text-align:center;width:74px}#cpp-panel .text-button::before,#cpp-panel .text-button::after{content:unset}#cpp-panel .donate-button{background-image:linear-gradient(to top, #58310b, #daa520);bottom:6px;box-shadow:inset 0 0 1px 1px #cecece, inset 0 0 0 3px #0c0d0d;height:35px;padding:2px 0 0 0;position:absolute;right:5px;width:35px;font-size:25px;color:black}#cpp-panel .donate-button span{top:-2px;position:relative}#cpp-panel .donate-button:hover{color:pink}#cpp-panel .donate-button::before{content:'';position:absolute;left:3px;top:3px;bottom:3px;right:3px;box-shadow:inset 0 0 1px 1px rgba(237,177,117,0.65);border-radius:4px;transform:translateZ(0);backface-visibility:hidden}\n"),D(),function(){{const e=document.getElementsByClassName("lagmeter")[0];e.addEventListener("click",K),e.style.cursor="cell"}}();Q(A()),document.getElementsByClassName("lag")[0].addEventListener("contextmenu",b)}if(Engine&&Engine.allInit)ee();else{let e,t=!1;Object.defineProperty(Engine,"allInit",{set(n){e=n,!0!==n||t||(ee(),t=!0)},get:()=>e})}},160:e=>{e.exports=JSON.parse('["daj cos","zje by","zje b","zje. b","zje, b","ch. uja"]')},529:e=>{e.exports=JSON.parse('["kurw","gowno","pedal","cwel","dziwk","pierdo","huj","hoj","zjeb","jeb","fuck","kutas","cip","walkonia","pizd","suko","dupek","gnoju","ciul","korwa","cioto","ciota","sukinsyn","spierd","chodzi. w każdym","poszła po te ciuchy. ja"]')},780:e=>{e.exports=JSON.parse('["ci pó","rękach. u jed","rękach, u jed","ć ip","ć i p"]')},78:e=>{e.exports=JSON.parse('["osci p","hojn","luchanie","przesluchuj","nasluchuj","ci poszlo","gow nowa","migow no","ci poz","ci pot","ci pi","ci pr","ci par","ci pom","ci pop","ci pod","ci. pod","ci, pod","ci po p","ci pok","ci pal","ci pr","ci. pal","je b","je. b","je, b","ho ja","ec welp",":p","cip cip cip cip","cip cip cip","cip cip","wymachuj","je bo","ci, pi","ci pos","ach u jeg","ci pd","ci pow","ci pon","ci poc","ci pam","dzi w kr","jak","podsluchuje","ci pan","sc i przet","c i po","ek urwal","uzje. barw","uzje, barw","uzje barw","ch uja","ch, uja","ci pou","ach u jed","chu jego","ci pl","chu je","ahoj","eciu le","udziw ka","ci pac","bo ci pa","o ci p"]')}},t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n(347)})();