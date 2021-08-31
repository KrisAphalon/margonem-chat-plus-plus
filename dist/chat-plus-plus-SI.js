!function(){"use strict";var e={d:function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}};!function(e,t,n){n.d(t,{y:function(){return Be},t:function(){return Ce}});const o={multiMsg:!0,justifyChat:!1,mergeMessages:!0,messageTimeout:2e3};function i(){localStorage.setItem("chatPlusPlus",JSON.stringify(o))}let a,r,c,s,l;function p(e){e.target===e.currentTarget&&(window.g.lock.add("cpp-dragging"),(e=e||window.event).preventDefault(),c=e.clientX,s=e.clientY,l=e.target,document.addEventListener("mousemove",u),document.addEventListener("mouseup",m))}function d(e){e.addEventListener("mousedown",p,!1)}function u(e){(e=e||window.event).preventDefault(),a=c-e.clientX,r=s-e.clientY,c=e.clientX,s=e.clientY,l.style.top=l.offsetTop-r+"px",l.style.left=l.offsetLeft-a+"px"}function m(){window.g.lock.remove("cpp-dragging"),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",m)}const h=[],b={};function f(e,t,n,i){const a=`<label class=setting-label><span class=setting-label-text tip=${n}>${t}</span> <input class=setting-checkbox id=cpp-setting-${e} name=${e} type=checkbox ${o[e]?" checked":""}> <span class=checkbox-outline><span class=checkmark><div class=checkmark-stem></div><div class=checkmark-kick></div></span></span></label>`;h.push(a),b[e]=i}function y(e){if(e.preventDefault(),document.getElementById("cpp-panel"))return;const t=document.createElement("div");d(t),t.id="cpp-panel",t.className="cpp-panel",t.innerHTML='<div class=header-label-positioner><div class=header-label><div class=left-decor></div><div class=right-decor></div><span class=panel-name>Chat Plus Plus</span></div></div><div class=close-decor><button class=close-button tip=Zamknij></button></div><div class=background><div class=settings-box></div><div class=bottom-box><button class="button text-button bottom-close">OK</button> <a href=https://www.buymeacoffee.com/krisaphalon target=_blank><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a></div></div>',t.querySelector(".settings-box").innerHTML=h.join("");const n=()=>document.body.removeChild(t);t.querySelector("#cpp-panel .close-button").addEventListener("click",n),t.querySelector(".bottom-close").addEventListener("click",n),t.querySelector(".bottom-close").addEventListener("click",(()=>message("Zapisano!")));for(const e in b){const n=t.querySelector(`#cpp-setting-${e}`);n.checked=o[e],n.addEventListener("input",b[e])}document.body.appendChild(t)}let x;function w(e){if(!["/","@","*"].includes(e[0]))return e;let t=e.split(" ");return"*"===e[0]&&t[0].includes("dial")&&(t=e.split(",")),t.shift(),"@"===e[0]?w(t.join(" ")):t.join(" ")}function v(e){let t=0;const n=e.length;for(let o=0;o<n;o++)e[o].match(j)?t+=2:t++;return t}function k(e){e.preventDefault();const t=document.getElementById("inpchat");let n="";const o=Be.sendArr.length;if(0===o)return!1;if(o>=1&&(window.message("Przywracanie wiadomości..."),n=Be.sendArr[0].trim()),o>1)for(let e=1;e<o;e++)n+=" "+w(Be.sendArr[e]).trim();return console.log(n),t.value=n,!1}const j=/[ąćęłńóśźż*@,. _]/gi;function z(e,t){return e[t].startsWith("*dial")?e.slice(t).join(" ").split(",")[0]+", ":e[t]+" "}function E(){setTimeout((function(){document.getElementById("inpchat").focus(),document.getElementById("inpchat").blur()}),100)}function L(e){if(e=(e=e.replace(/ /g," ")).replace(/[«»]/g,""),o.multiMsg&&""!==e)return function(e){const t=function(e){const t=e.split(" ");if(t.length<=1)return"";let n="";return(e.startsWith("@")||["/k","/g"].includes(t[0]))&&(n=t[0]+" "),e.startsWith("*")&&(n=z(t,0)),n&&!n.startsWith("*")&&t[1].startsWith("*")&&(n+=z(t,1)),n}(e=e.trim());Be.sendArr.splice(0);const n=195-v(t);if(v(e)<=n)return x(e),void E();!function(e,t,n){if(""===e)return;let o=0,i=0,a=0,r=0,c=0,s=0;for(let l=0;l<e.length;l++)if(e[l].match(j)?(s+=2,c+=2,i+=2):(s++,c++,i++)," "===e[l]?(a=l,c=0):"."===e[l]&&(r=l,s=0),a+30<l&&(a=l,c=0),!(i<n)){if(r+100<l)0===o?Be.sendArr.push(e.slice(0,a)):Be.sendArr.push(t+e.slice(o,a).trim()),o=a,i=c;else{let n=0;for(let t=0;t<5&&("."===e[r+t]||" "===e[r+t]);t++)n++;0===o?Be.sendArr.push(e.slice(0,r+n)):Be.sendArr.push(t+e.slice(o,r+n).trim()),o=r+n,i=s}console.log(Be.sendArr)}0===o?Be.sendArr.push(e):""!==e.slice(o)&&Be.sendArr.push(t+e.slice(o).trim())}(e,t,n),Be.sendArr.length>0&&(x(Be.sendArr[0]),Be.sendTimeout=setTimeout(Ce,3*o.messageTimeout)),document.getElementById("inpchat").blur(),E()}(e);x(e),E()}function S(){return o.multiMsg=!o.multiMsg,i(),!1}const I={},A=["nar","nar2","nar3","sys_comm","me"],T=/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;function M(e){return{tab:e.k,nick:""===e.n?e.nick:e.n,text:e.t,time:e.ts,command:e.s}}function C(e,t){const n=M(t),i=n.tab,a=n.nick,r=n.text,c=n.time,s=n.command;if(e.innerHTML!==I[a][2])return!1;const l=/(.*)<\/span>$/g.exec(I[a][2]);if(!l)return!1;const p=l[1]+" "+r+"</span>";return e.innerHTML=p,I[a]=[i,s,p,c],log("["+i+"] "+a+" -> "+r),window.clearTimeout(Be.sendTimeout),void 0!==Be.sendArr[0]&&Be.sendArr.shift(),Be.sendArr.length>0&&setTimeout((function(){Be.sendArr[0].match(T).length>0&&window.chatSendMsg(Be.sendArr[0])}),o.messageTimeout),Be.sendArr.length>1&&(Be.sendTimeout=setTimeout(Ce,3*o.messageTimeout)),!0}function B(e){const t=M(e),n=t.tab,i=t.nick,a=t.text,r=t.time,c=t.command;if(!o.mergeMessages)return!1;if(!A.includes(c))return!1;if(function(e){if(!function(e){const t=M(e),n=t.tab,o=t.nick,i=t.time,a=t.command;return void 0!==I[o]&&I[o][0]===n&&I[o][1]===a&&!(i-I[o][3]>5)}(e))return!1;const t=document.getElementById("chattxt");for(let n=t.children.length-1;n>=0;n--)if(C(t.children[n],e))return!0}(e))return!0;const s=`<span></span><span class="chatmsg">${a}</span>`;return I[i]=[n,c,s,r],!1}function N(){return o.mergeMessages=!o.mergeMessages,i(),!1}const O=$('<style id="chat-plus-plus-styles">').appendTo("head"),P={};function _(e,t){P[e]||(O.append(t),P[e]=t)}function W(e){if(P[e]){const t=O.text().split(P[e]).join("");O.text(t),delete P[e]}}let q,J;const H={priv:"#fc0",clant:"#ffa500",team:"#b554ff",sys_comm:"#f33"},Z=["priv","sys_comm","clant","team"];function D(){const e=document.createElement("div");e.id="chattxt",e.style.display="none";const t=document.createElement("div");e.appendChild(t);const n=document.createElement("span");n.className="chatmsg",t.appendChild(n),document.body.appendChild(e);for(let e=0;e<Z.length;e++)t.className=Z[e],H[Z[e]]=window.getComputedStyle(n).color;document.body.removeChild(e),_("inputClasses",`\n#inpchat.priv { color: ${H.priv}; }\n#inpchat.clant { color: ${H.clant}; }\n#inpchat.team { color: ${H.team}; }\n#inpchat.sys_comm { color: ${H.sys_comm}; }\n        `.trim())}function X(){localStorage.setItem("lastInputtedMsg",q.value)}function K(){const e=document.getElementById("inpchat");let t=q;return t.value=t.value.replace(/\r?\n/gi,""),o.multiMsg?t.removeAttribute("maxLength"):function(e){e.value.length>199&&(e.value=e.value.substr(0,199));const t=/[ąćęłńóśźż*@,. _]/gi;let n=0;for(let o=0;o<e.value.length;o++)e.value[o].match(t)&&(n++,e.value=e.value.substr(0,199-n));e.maxLength=199-n}(q),G(),o.multiMsg||t===e||(e.value=q.value),t.value}const Y={"/g":"team","/k":"clant","*me":"me","/me":"me","*nar":"nar","*nar1":"nar","/nar":"nar","*nar2":"nar2","*nar3":"nar3","*dial":"dial1","*dial1":"dial1","*dial2":"dial2","*dial3":"dial3","*dial666":"dial666"},F=["*sys","*map","*light","*addGraf","*delGraf","*hide","*weather"];function G(){const e=q.value.trim().split(" ")[0];q.classList.contains("unfolded")?q.className="unfolded":q.className="",q.style.color="","@"!==e[0]?F.includes(e)?q.style.color=H.sys_comm:Y[e]&&q.classList.add(Y[e]):q.style.color=H.priv}function U(){q=document.createElement("textarea"),q.id="inpchat",o.multiMsg||(q.maxLength=199),function(){{const e=document.getElementById("bottombar"),t=document.getElementById("inpchat");t.parentNode.removeChild(t),J=document.createElement("div"),J.id="textarea-background",e.appendChild(J),e.appendChild(q),q.addEventListener("click",(e=>e.stopPropagation()),!0),q.addEventListener("mousedown",(e=>e.stopPropagation()),!0)}}(),navigator.userAgent.endsWith("Firefox/52.0")&&(q.style.overflowX="hidden"),q.addEventListener("input",K,!1),q.addEventListener("input",X,!1),D(),function(){const e=localStorage.getItem("lastInputtedMsg");e&&(q.value=e,document.getElementById("bottxt").style.display="block",q.style.opacity="0"),G()}(),q.addEventListener("focusout",(function(){const e=document.getElementById("inpchat");""===e.value&&(document.getElementById("bottxt").style.display="block",e.style.opacity="0")}),!1),q.addEventListener("focusin",(function(){document.getElementById("bottxt").style.display="none",document.getElementById("inpchat").style.opacity="1"}),!1),function(){const e=function(){D(),G(),function(e){const t=document.createElement("div");t.id="chat",t.className="left",t.style.display="none",document.body.appendChild(t);const n=window.getComputedStyle(t).backgroundImage;document.body.removeChild(t),e.style.backgroundImage!==n&&(e.style.backgroundImage=n)}(J)};if(setTimeout(e,1e3),setTimeout(e,2e3),"function"!=typeof window.shairModuleLoader&&!document.getElementById("loading"))return;const t=document.getElementById("loading");'url("https://i.imgur.com/1en4JTp.png")'===window.getComputedStyle(t,null).backgroundImage&&(document.getElementById("textarea-background").style.left="146px",document.getElementById("inpchat").style.left="65px",setTimeout(e,3e3),setTimeout(e,5e3),setTimeout(e,2e4))}()}const Q=document.getElementById("chatscrollbar");let R;function V(){clearTimeout(R),Q.style.opacity=1,Q.classList.add("moving"),R=setTimeout((function(){Q.style.opacity=0,Q.classList.remove("moving")}),1e3)}const ee="\n#chat.left #chatTxtContainer #chattxt {\n    width: 253px;\n    padding-left: 4px;\n    text-align: justify;\n}\n\n#chatscrollbar {\n    -webkit-transition: opacity 0.5s ease-out;\n    -moz-transition: opacity 0.5s ease-out;\n    transition: opacity 0.5s ease-out;\n}\n#chatscrollbar.moving {\n    -webkit-transition: opacity 0.15s ease-out;\n    -moz-transition: opacity 0.15s ease-out;\n    transition: opacity 0.15s ease-out;\n}\n#chatscrollbar:hover {\n    opacity: 1 !important;\n    -webkit-transition: opacity 0.15s ease-out;\n    -moz-transition: opacity 0.15s ease-out;\n    transition: opacity 0.15s ease-out;\n}\n";function te(){return o.justifyChat=!o.justifyChat,o.justifyChat?(_("justify",ee),document.getElementById("chattxt").addEventListener("scroll",V),Q.style.opacity="0"):(W("justify"),document.getElementById("chattxt").removeEventListener("scroll",V),Q.style.opacity="1"),i(),!1}let ne=!1;const oe={toHide:[],toHide2:[],toNotHide:[]};function ie(e){return oe.toNotHide.some((t=>e.classList.contains(t)))}function ae(e){return oe.toHide.includes(e.className)}function re(){const e=ne?"":"none";!function(e,t){for(let n=0;n<e.length;n++){const o=e[n];!ie(o)&&ae(o)&&(o.style.display=t)}}(document.getElementById("chattxt").children,e),ne=!ne}var ce=JSON.parse('["daj cos","zje by","zje b","zje. b","zje, b","ch. uja"]'),se=JSON.parse('["kurw","gowno","pedal","cwel","dziwk","pierdo","huj","hoj","zjeb","jeb","fuck","kutas","cip","walkonia","pizd","suko","dupek","gnoju","ciul","korwa","cioto","ciota","sukinsyn","spierd","debil","chodzi. w każdym","poszła po te ciuchy. ja"]'),le=JSON.parse('["ci pó","rękach. u jed","rękach, u jed","ć ip","ć i p"]'),pe=JSON.parse('["osci p","hojn","luchanie","przesluchuj","przysluchuj","nasluchuj","ci poszlo","gow nowa","migow no","ci poz","ci pot","ci pi","ci pr","ci par","ci pom","ci pop","ci pod","ci. pod","ci, pod","ci po p","ci pok","ci pal","ci pr","ci. pal","je b","je. b","je, b","ho ja","ec welp",":p","cip cip cip cip","cip cip cip","cip cip","wymachuj","je bo","ci, pi","ci pos","ach u jeg","ci pd","ci pow","ci pon","ci poc","ci pam","dzi w kr","jak","podsluchuje","ci pan","sc i przet","c i po","ek urwal","uzje. barw","uzje, barw","uzje barw","ch uja","ch, uja","ci pou","ach u jed","chu jego","ci pl","chu je","ahoj","eciu le","udziw ka","ci pac","bo ci pa","o ci p","oc i p","ci pol","go w nos","eci p","sci i p","tes u kora"]');function de(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return ue(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ue(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,i=function(){};return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){c=!0,a=e},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw a}}}}function ue(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}let me;"\nWysyła podejrzaną część wiadomości na chat grupowy.\nJeżeli wiadomość zostanie zagwiazdkowana, to nie należy jej wysyłać.\nTestuje tylko pierwsze zaczerwienione słowo w wiadomości.\n".trim();const ge="\nWysyła podejrzaną część wiadomości do samego siebie.\nJeżeli wiadomość zostanie zagwiazdkowana <b>lub nie pojawi się dwa razy</b> prawdopodobnie nie należy jej wysyłać.\nTestuje tylko pierwsze zaczerwienione słowo w wiadomości.\n".trim(),he='\n<div class="header-label-positioner">\n    <div class="header-label">\n        <div class="left-decor"></div>\n        <div class="right-decor"></div>\n        <span class="panel-name">Automute Catcher</span>\n    </div>\n</div>\n<div class="close-decor">\n    <button class="close-button" tip="Zamknij"/>\n</div>\n<div class="background">\n    <div class="top-box">\n    </div>\n    <div class="bottom-box">\n        <button class="button text-button bottom-test">Przetestuj</button>\n        <button class="button text-button bottom-send">Wyślij</button>\n        <button class="button text-button bottom-close">Nie wysyłaj</button>\n        <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a>\n    </div>\n</div>\n'.trim(),be='\nTwoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br>\n<span style="color:red">Zawiera ona zwrot "ahoj", który poprzedzony jest przez\ndowolną literę "a". Tak, w ten sposób automute sprawdza czy jest to "przekleństwo".\nJeżeli chcesz wysłać tak czy siak, droga wolna.\nWiedz jednak, że akurat w tym przypadku nie ma pomyłek.</span>\n'.trim(),fe='\nTwoja wiadomość prawdopodobnie byłaby wyłapana przez automute, ale masz szczęście ;) <br>\nPoniżej wiadomość, jaką widzi automute:<hr><span class="cpp-mute-text" style="word-wrap: break-word; text-align: left;">\n\n</span><hr>Czy mimo tego chcesz ją wysłać? Jeżeli wiadomość przejdzie bez\ngwiazdkowania wyślij wyjątek do Kris Aphalon#3484 na discordzie bądź na skrzynkę pocztową\n'.trim();function ye(e,t,n){if(document.getElementById("cpp-automute-panel"))return;const o=n?be:fe,i=document.createElement("div");d(i),i.id="cpp-automute-panel",i.className="cpp-panel",i.innerHTML=he;const a=ge;i.querySelector(".bottom-test").setAttribute("tip",a),i.querySelector(".top-box").innerHTML=o,n||(i.querySelector(".cpp-mute-text").innerHTML=t);const r=function(){document.body.removeChild(i),document.getElementById("inpchat").focus()};i.querySelector("#cpp-automute-panel .close-button").addEventListener("click",r),i.querySelector(".bottom-close").addEventListener("click",r),i.querySelector(".bottom-send").addEventListener("click",r),i.querySelector(".bottom-send").addEventListener("click",(()=>me(e))),i.querySelector(".bottom-test").addEventListener("click",(()=>function(e,t){const n=document.querySelector("#inpchat"),o=n.value;let i=e;"@"===i[0]&&(i=i.slice(i.indexOf(" ")));const a=t.match(/<span style='color: red; font-weight: bold'>(.*)<\/span>/);if(!a||!a[1])return message("Coś poszło nie tak przy testowaniu. Wyślij wiadomość którą próbowałeś przetestować do Kris Aphalon na Discordzie");const r=a[1],c=Math.max(i.indexOf(r)-20,0),s=Math.min(i.indexOf(r)+r.length+20,i.length-1),l=i.substring(c,s);me("@"+hero.nick.split(" ").join("_")+" "+l),n.value=o,setTimeout((()=>n.value=o),501)}(e,t))),document.body.appendChild(i)}function xe(e,t){let n=!0;var o,i=de(t);try{for(i.s();!(o=i.n()).done;){const t=o.value;e.includes(t)&&(console.log("Wykryto zwrot który jest niemiły: "+t),e=e.split(t).join("<span style='color: red; font-weight: bold'>"+t+"</span>"),n=!1)}}catch(e){i.e(e)}finally{i.f()}return!n&&e}function we(e,t){var n,o=de(t);try{for(o.s();!(n=o.n()).done;){const t=n.value;e=e.split(t).join("X")}}catch(e){o.e(e)}finally{o.f()}return e}function ve(e){let t=e.toLowerCase();if("@"===t[0]&&(t=t.slice(t.indexOf(" "))),t=we(t,le),t=t.replace(/[^a-zńąćśźżóęł ]/g,"").replace(/ą/g,"a").replace(/ę/g,"e").replace(/ł/g,"l").replace(/[żź]/g,"z").replace(/ó/g,"o").replace(/ń/g,"n").replace(/ć/g,"c").replace(/ś/g,"s"),/a(?=(?:.)*ahoj)(?!hoj.*ahoj)/g.test(t))return ye(e,"",!0);let n=xe(t,ce);return n?ye(e,n):(t=we(t,pe),t=t.replace(/ /g,""),t=function(e){if(0===e.length)return"";let t=e[0],n=e[0];for(let o=1;o<e.length;o++)e[o]!==n&&(t+=e[o]),n=e[o];return t}(t),n=xe(t,se),n?ye(e,n):void me(e))}function ke(){{const e=document.getElementById("textarea-background");q.classList.remove("unfolded"),e.classList.remove("unfolded")}_("hideInputScrollbar","#input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}")}function je(){3===Number(g.chat.state)&&(q.value.length>30?function(){if(""!==q.value){{const e=document.getElementById("textarea-background");q.classList.add("unfolded"),e.classList.add("unfolded")}W("hideInputScrollbar")}else ke()}():ke())}function ze(e){e.addEventListener("focusout",ke,!1),e.addEventListener("focusin",je,!1)}function Ee(e){e.removeEventListener("focusout",ke,!1),e.removeEventListener("focusin",je,!1)}function Le(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}const Se=/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;let Ie;function Ae(e){let t=(e=e.trim()).split(" "),n=!1;if("/"===e[0]||"*"===e[0]){let o=e.split(" ",1)[0];switch(o){case"/me":o=hero.nick;break;case"/g":case"/k":n=!0;case"/nar":case"*me":case"*nar":case"*nar1":case"*nar2":case"*nar3":case"*sys":o="";break;case"*dial":case"*dial1":case"*dial2":case"*dial3":case"*dial666":{const n=e.split(","),i=n[0].split(" ");n.shift(),t=n.join(",").split(" "),t.unshift(""),i.shift(),o="«"+i.join(" ")+"»";break}}t.shift(),""!==o&&t.unshift(o)}else"@"===e[0]&&(n=!0,t.shift());e="";const o=t.length;for(let n=0;n<o;n++)""!==t[n]&&(e+=t[n]+" ");return e=e.trim(),n?Ae(e):e}function Te(e){const t=e.children[1].innerText.trim();if(void 0!==Be.sendArr[0]&&t===Ae(Be.sendArr[0])){if(clearTimeout(Be.sendTimeout),Be.sendArr.shift(),0===Be.sendArr.length)return;setTimeout((function(){Be.sendArr[0].match(Se).length>0&&Ie(Be.sendArr[0])}),o.messageTimeout),Be.sendTimeout=setTimeout(Ce,3*o.messageTimeout)}}function Me(e){var t,n=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return Le(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Le(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,i=function(){};return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){c=!0,a=e},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw a}}}}(e);try{for(n.s();!(t=n.n()).done;){const e=t.value;for(let t=0;t<e.addedNodes.length;t++)Te(e.addedNodes[t])}}catch(e){n.e(e)}finally{n.f()}}function Ce(){0!==Be.sendArr.length&&(sessionStorage.noAnwserMsgDisplayed||(window.message("Coś poszło nie tak i twoja wiadomość nie została wysłana na chat. Kliknij PPM na koordynaty by przywrócić resztę niewysłanej wiadomości.\n Jeżeli wiadomość widnieje na chacie, zignoruj ten komunikat."),sessionStorage.noAnwserMsgDisplayed=!0))}const Be={sendArr:[],sendTimeout:0,blockTextareaChanging:!1};function Ne(){var e;!function(){const e=localStorage.getItem("chatPlusPlus");if(e){const i=JSON.parse(e);for(var t=0,n=Object.keys(i);t<n.length;t++){const e=n[t];o[e]=i[e]}}localStorage.setItem("chatPlusPlus",JSON.stringify(o))}(),_("basic","#inpchat{background-image:unset;background-position-y:-8px;background-repeat:repeat-y;bottom:0;display:inline;font-size:12px;height:17px;left:90px;line-height:17px;margin:0;overflow-x:scroll;padding:0;position:absolute;resize:none;scrollbar-width:none;top:unset !important;white-space:nowrap;width:312px}#lastmsg{pointer-events:none}#inpchat.unfolded{background-position-y:0;height:150px;line-height:25.6px;overflow-x:hidden;scrollbar-width:thin;white-space:pre-wrap}#inpchat::-webkit-scrollbar{display:none}#inpchat.unfolded::-webkit-scrollbar{display:block}#bottombar{overflow:visible;z-index:362}#textarea-background{background-position-y:-98px;bottom:-84px;display:none;height:318px;left:171px;position:absolute;-moz-transform:rotate(90deg);-ms-transform:rotate(90deg);-o-transform:rotate(90deg);-webkit-transform:rotate(90deg);transform:rotate(90deg);width:150px}#textarea-background.unfolded{display:block}#lagmeter,#botloc,#bchat,#pvpmode{z-index:363}.cpp-panel{animation:fade 0.5s;border-image:url(http://cronus.margonem.com/img/gui/tmp/window-frame.png) 32 20 repeat;border-style:solid;border-width:34px 13px 10px 13px;color:#000;left:calc(50% - 204px);pointer-events:auto;position:fixed;top:calc(50% - 150px);transition:opacity 0.35s ease-in-out;width:380px;z-index:499}.cpp-panel>.background{background-color:#f1deaa;background-image:url(http://cronus.margonem.com/img/gui/content-redleather.jpg)}.cpp-panel>.header-label-positioner{left:10px;pointer-events:none;position:absolute;right:10px;text-align:center;top:-35px}.cpp-panel .header-label{background:url(http://cronus.margonem.com/img/gui/dialogue/dialogi-naglowek.png);display:inline-block;height:28px;margin:0 auto;position:relative}.cpp-panel .header-label>.right-decor,.cpp-panel .header-label>.left-decor{background:url(http://cronus.margonem.com/img/gui/dialogue/dialogi.png) -38px -2px;height:28px;left:-52px;position:absolute;top:0;width:52px}.cpp-panel .header-label>.right-decor{background-position:-91px -2px;left:auto;right:-52px}.cpp-panel .header-label>span{color:#f5f5dc;line-height:28px;text-align:center}.cpp-panel .panel-name{transition:width 0.35s ease-in-out}.cpp-panel>.close-decor{background:url(http://cronus.margonem.com/img/gui/buttony.png?v=5) -380px -55px;height:52px;pointer-events:none;position:absolute;right:-15px;top:-35px;width:51px}.cpp-panel .close-button{background:url(http://cronus.margonem.com/img/gui/buttony.png?v=5) -263px -79px;border:0;cursor:pointer;height:22px;padding:0;pointer-events:auto;position:absolute;right:3px;top:3px;width:22px}.cpp-panel .close-button:hover{background-position:-286px -79px}.cpp-panel .settings-box{height:75px;display:grid;grid-template-columns:50% auto;grid-template-rows:50% auto;justify-items:center;align-items:center;padding-top:10px}.cpp-panel .setting-label{cursor:unset;height:24px;position:relative;width:155px;user-select:none}.cpp-panel .setting-label-text{cursor:pointer;left:25px;line-height:28px;position:relative}.cpp-panel .setting-checkbox{display:none}.cpp-panel .checkbox-outline{border:2px solid #6e644b;border-radius:2px;box-sizing:border-box;cursor:pointer;display:inline-block;height:18px;left:0;margin:0;overflow:hidden;position:absolute;top:3px;width:18px;z-index:2}.checkmark{display:none;height:22px;left:-4px;pointer-events:none;position:relative;top:-2px;transform:rotate(45deg);width:22px}.checkmark-stem{background-color:#f1dfa8;height:13px;left:10px;position:absolute;top:2px;width:2px}.checkmark-kick{background-color:#f1dfa8;height:2px;left:5px;position:absolute;top:13px;width:6px}.cpp-panel .setting-checkbox:checked+.checkbox-outline{background-color:#6e644b}.cpp-panel .setting-checkbox:checked+.checkbox-outline .checkmark{display:inline-block}.cpp-panel .save-button{margin-right:30px}.cpp-panel .cancel-button{margin-left:30px}.cpp-panel .cancel-button:not(:hover){background-image:linear-gradient(to top, #310b0b, #831f1f)}.cpp-panel .cancel-button:not(:hover)::before{box-shadow:inset 0 0 1px 1px #da6161a6}.cpp-panel .hidden{display:none}.cpp-panel .button{background-image:linear-gradient(to top, #12210d, #396b29);border:1px solid #0c0d0d;border-radius:4px;box-shadow:inset 0 0 1px 1px #cecece, inset 0 0 0 3px #0c0d0d;box-sizing:border-box;color:#E6D6BF;cursor:pointer;display:inline-block;height:42px;line-height:34px;position:relative;width:42px}.cpp-panel.button.blue{background-image:linear-gradient(to top, #081522, #1d4873)}.cpp-panel .button.blue:not(:hover)::before{box-shadow:inset 0 0 1px 1px #5594d4a6}.cpp-panel .button:before{backface-visibility:hidden;border-radius:4px;bottom:3px;box-shadow:inset 0 0 1px 1px #7ec568a6;content:'';left:3px;position:absolute;right:3px;top:3px;transform:translateZ(0)}.cpp-panel .button:after{border-radius:3px;bottom:0;box-shadow:0 1px 0 1px #0c0d0d;content:'';left:0;position:absolute;right:0;top:0}.cpp-panel .button:hover:before{box-shadow:inset 0 0 1px 1px #909090a6}.cpp-panel .button:hover{background-image:linear-gradient(to top, #101010, #434343)}.cpp-panel .bottom-box{display:flex;height:50px;justify-content:center}#cpp-automute-panel .bottom-box{justify-content:space-evenly}#cpp-automute-panel .text-button{justify-content:space-evenly}.cpp-panel .text-button{border-radius:6px;height:28px;line-height:24px;margin-top:10px;text-align:center;width:90px}.cpp-panel .text-button::before,.cpp-panel .text-button::after{content:unset}.cpp-panel .donate-button{background-image:linear-gradient(to top, #58310b, #daa520);bottom:6px;box-shadow:inset 0 0 1px 1px #cecece, inset 0 0 0 3px #0c0d0d;height:35px;padding:2px 0 0 0;position:absolute;right:5px;width:35px;font-size:25px;color:black}.cpp-panel .donate-button span{top:-2px;position:relative}.cpp-panel .donate-button:hover{color:pink}.cpp-panel .donate-button::before{content:'';position:absolute;left:3px;top:3px;bottom:3px;right:3px;box-shadow:inset 0 0 1px 1px rgba(237,177,117,0.65);border-radius:4px;transform:translateZ(0);backface-visibility:hidden}#cpp-test-button{position:absolute;left:20px;bottom:20px;width:77px}#cpp-automute-panel .top-box{text-align:center}#cpp-automute-panel .donate-button{right:0;bottom:3px}\n"),U(),function(){q.addEventListener("input",je,!1);{const e=window.g.chat.state;3===e||"3"===e?ze(q):(ke(),Ee(q)),window.g.chat.__state=window.g.chat.state,Object.defineProperty(window.g.chat,"state",{set(e){3===e||"3"===e?ze(q):Ee(q),this.__state=e},get(){return this.__state}})}}(),function(){{oe.toHide=["clant","syst","priv","priv2","sys_info","team"],_("chatCleaner","#msghider-button{position:'absolute';width:17px;height:21px;textAlign:center;cursor:cell}");const e=document.createElement("div");e.id="msghider-button",e.addEventListener("click",re),document.getElementById("lagmeter").appendChild(e)}}(),Ie=window.chatSendMsg,function(){const e=document.getElementById("chattxt");new MutationObserver(Me).observe(e,{attributes:!1,childList:!0,subtree:!1})}(),f("multiMsg","MultiMsg","Wysyłaj wiadomości dłuższe niż 200 znaków dzięki wykorzystaniu najnowszych nowinek technologi.",S),x=window.chatSendMsg,window.chatSendMsg=L,document.getElementById("botloc").addEventListener("contextmenu",k),e=window.chatSendMsg,me=e,window.chatSendMsg=ve,g.chat.parsers.push(B),f("mergeMessages","Scalaj wiadomości","Scala wizualnie wiadomości typu *me czy *nar jeżeli są one wysyłane z bardzo krótkim opóźnieniem.",N),o.justifyChat&&(_("justify",ee),document.getElementById("chattxt").addEventListener("scroll",V)),f("justifyChat","Justowanie czatu","Inny wygląd rozszerzonego czatu. Znikający scrollbar oraz wyjustowany text.",te),document.getElementById("bchat").addEventListener("contextmenu",y)}"complete"===document.readyState?Ne():window.addEventListener("load",Ne)}(0,{},e)}();