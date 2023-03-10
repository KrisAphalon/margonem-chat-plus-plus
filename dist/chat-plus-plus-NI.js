!function(){"use strict";var e={d:function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}};e.d({},{y:function(){return he},t:function(){return me}});const t={multiMsg:!0,justifyChat:!1,mergeMessages:!0,messageTimeout:2e3};let n,o,i,a,r;function c(e){e.target===e.currentTarget&&(window.Engine.lock.add("cpp-dragging"),(e=e||window.event).preventDefault(),i=e.clientX,a=e.clientY,r=e.target,document.addEventListener("mousemove",l),document.addEventListener("mouseup",p))}function s(e){e.addEventListener("mousedown",c,!1)}function l(e){(e=e||window.event).preventDefault(),n=i-e.clientX,o=a-e.clientY,i=e.clientX,a=e.clientY,r.style.top=r.offsetTop-o+"px",r.style.left=r.offsetLeft-n+"px"}function p(){window.Engine.lock.remove("cpp-dragging"),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",p)}function u(e){$("[tip]",$(e)).each((function(){const e=$(this);e.tip(e.attr("tip"))}))}const d=[],g={};function m(e){if(e.preventDefault(),document.getElementById("cpp-panel"))return;const n=document.createElement("div");s(n),n.id="cpp-panel",n.className="cpp-panel",n.innerHTML='<div class="header-label-positioner"> <div class="header-label"> <div class="left-decor"></div> <div class="right-decor"></div> <span class="panel-name">Chat Plus Plus</span> </div></div><div class="close-decor"> <button class="close-button" tip="Zamknij"/></div><div class="background"> <div class="settings-box"></div> <div class="bottom-box"> <button class="button text-button bottom-close">OK</button> <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a> </div></div>',n.querySelector(".settings-box").innerHTML=d.join("");const o=()=>document.body.removeChild(n);n.querySelector("#cpp-panel .close-button").addEventListener("click",o),n.querySelector(".bottom-close").addEventListener("click",o),n.querySelector(".bottom-close").addEventListener("click",(()=>message("Zapisano!")));for(const e in g){const o=n.querySelector(`#cpp-setting-${e}`);o.checked=t[e],o.addEventListener("input",g[e])}document.body.appendChild(n),u(n)}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}const b=/[ąćęłńóśźż@]/gi;let f;function y(e){if(!["/","@","*"].includes(e[0]))return e;let t=e.split(" ");return"*"===e[0]&&t[0].includes("dial")&&(t=e.split(",")),t.shift(),"@"===e[0]?y(t.join(" ")):t.join(" ")}function x(e){const t=e.match(b);return t?e.length+t.length:e.length}function v(e){e.preventDefault();const t=document.getElementById("inpchat");let n="";const o=he.sendArr.length;if(0===o)return!1;if(o>=1&&(window.message("Przywracanie wiadomości..."),n=he.sendArr[0].trim()),o>1)for(let e=1;e<o;e++)n+=" "+y(he.sendArr[e]).trim();return console.log(n),t.value=n,!1}function w(e,t){return"*"!==e[t][0]&&(e[t]="*"+e[t].substr(1)),e[t].startsWith("*dial")||e[t].startsWith("*lang")?e.slice(t).join(" ").split(",")[0]+", ":e[t]+" "}function k(e,t,n){const o=function(e,t,n){const o=e.substring(n||0).search(/[!?.] /);return o>=0?o+(n||0):o}(e,0,Math.floor(n/2));if(o>=0)return o+2;const i=e.lastIndexOf(" ");return i>=0?i+1:t}function j(e,t){let n=0;for(let o=0;o<t&&(n++,!(n>=e.length));o++)e[n].match(b)&&o++;return n}function z(e,t,n){if(""===e)return;const o=function(e,t,n){n-=x(t);const o=[];for(;e.length>0;){const i=j(e,n),a=e.substring(0,i),r=x(e)>n?k(a,i,n):e.length;o.push(t+a.substring(0,r).trim()),e=e.slice(r)}return o}(e=e.substring(t.length),t,n);console.log(o);var i,a=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,i=function(){};return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){c=!0,a=e},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw a}}}}(o);try{for(a.s();!(i=a.n()).done;){let e=i.value;he.sendArr.push(e)}}catch(e){a.e(e)}finally{a.f()}}function E(){setTimeout((function(){document.getElementById("inpchat").focus(),document.getElementById("inpchat").blur()}),100)}function S(e){{const t=document.getElementById("inpchat");e=t.value,t.value=""}if(e=(e=e.replace(/ /g," ")).replace(/[«»]/g,""),t.multiMsg&&""!==e)return function(e){const n=function(e){const t=e.split(" ");if(t.length<=1)return"";let n="";return(e.startsWith("@")||["/k","/g"].includes(t[0]))&&(n=t[0]+" "),(e.startsWith("*")||e.startsWith("/me"))&&(n=w(t,0)),n&&!n.startsWith("*")&&t[1].startsWith("*")&&(n+=w(t,1)),n}(e=e.trim());if(he.sendArr.splice(0),x(e)<=197)return f(e),void E();z(e,n,197),e.startsWith("/me")&&(he.sendArr[0]=he.sendArr[0].replace(/^.{3}/,"/me")),he.sendArr.length>0&&(f(he.sendArr[0]),he.sendTimeout=setTimeout(me,3*t.messageTimeout)),document.getElementById("inpchat").blur(),E()}(e);f(e),E()}function L(){return t.multiMsg=!t.multiMsg,localStorage.setItem("chatPlusPlus",JSON.stringify(t)),!1}const A=$('<style id="chat-plus-plus-styles">').appendTo("head"),M={};function I(e,t){M[e]||(A.append(t),M[e]=t)}let T,C;const N={priv:"#fc0",clant:"#ffa500",team:"#b554ff",sys_comm:"#f33"},O=["priv","sys_comm","clant","team"],q=["priv-in-general","chat-message sys_red","clan-message","group-message"];function B(){localStorage.setItem("lastInputtedMsg",T.value)}function H(){const e=document.getElementById("inpchat");let n=e;return n.value=n.value.replace(/\r?\n/gi,""),t.multiMsg?n.removeAttribute("maxLength"):function(e){e.value.length>199&&(e.value=e.value.substr(0,199));const t=/[ąćęłńóśźż*@,. _]/gi;let n=0;for(let o=0;o<e.value.length;o++)e.value[o].match(t)&&(n++,e.value=e.value.substr(0,199-n));e.maxLength=199-n}(T),_(),t.multiMsg||n===e||(e.value=T.value),n.value}const P={"/g":"team","/k":"clant","*me":"me","/me":"me","*nar":"nar","*nar1":"nar","/nar":"nar","*nar2":"nar2","*nar3":"nar3","*dial":"dial1","*dial1":"dial1","*dial2":"dial2","*dial3":"dial3","*dial666":"dial666","*lang":"lang"},W=["*sys","*map","*light","*addGraf","*delGraf","*hide","*weather"];function _(){const e=T.value.trim().split(" ")[0];T.classList.contains("unfolded")?T.className="unfolded":T.className="",T.style.color="","@"!==e[0]?W.includes(e)?T.style.color=N.sys_comm:P[e]&&T.classList.add(P[e]):T.style.color=N.priv}function J(){T=document.createElement("textarea"),T.id="inpchat",t.multiMsg||(T.maxLength=199),function(){{T.placeholder="Naciśnij Enter, aby porozmawiać";const e=document.getElementsByClassName("chat-tpl")[0].children[5];e.style.zIndex="200";const t=e.children[0];t.style.opacity="0",t.style.pointerEvents="none",T.addEventListener("keypress",(function(e){"Enter"===e.key&&(T.blur(),""!==T.value&&Engine.chat.sendMessage(T.value))}),!0),t.addEventListener("focusin",(()=>T.focus()));const n=document.createElement("div");n.id="textarea-background-up",e.prepend(n),C=document.createElement("div"),C.id="textarea-background",e.prepend(C),e.prepend(T),function(){const e=document.querySelector(".chat-tpl > .input-wrapper > input"),t=e.value;Object.defineProperty(e,"value",{set(t){this.__value=t,T.value===e.value||he.blockTextareaChanging||(T.value=e.value,_())},get(){return void 0===this.__value?t:this.__value}})}(),H()}}(),navigator.userAgent.endsWith("Firefox/52.0")&&(T.style.overflowX="hidden"),T.addEventListener("input",H,!1),T.addEventListener("input",B,!1),function(){const e=document.createElement("div");e.className="chat-message",e.style.display="none";const t=document.createElement("div");e.appendChild(t);const n=document.createElement("span");n.className="chatmsg",t.appendChild(n),document.body.appendChild(e);for(let e=0;e<O.length;e++)t.className=q[e],N[O[e]]=window.getComputedStyle(n).color;document.body.removeChild(e),I("inputClasses",`#inpchat.priv { color: ${N.priv}; }#inpchat.clant { color: ${N.clant}; }#inpchat.team { color: ${N.team}; }#inpchat.sys_comm { color: ${N.sys_comm}; } `)}(),function(){const e=localStorage.getItem("lastInputtedMsg");e&&(T.value=e),_()}()}document.getElementById("chatscrollbar");let D=!1;const Z={toHide:[],toHide2:[],toNotHide:[]};function X(e){return Z.toNotHide.some((t=>e.classList.contains(t)))}function K(e){if(Z.toHide.includes(e.classList[1]))return!0;for(let t=0;t<e.children.length;t++){const n=e.children[t];if(Z.toHide2.some((e=>n.classList.contains(e))))return!0}return!1}function U(){const e=D?"":"none";{const t=document.getElementsByClassName("section chat-tpl")[0].children[4].children[1];if(!document.getElementsByClassName("tabs-wrapper connectedSortable ui-sortable")[0].children[0].classList.contains("active"))return;!function(e,t){for(let n=0;n<e.length;n++){const o=e[n];!X(o)&&K(o)&&(o.style.display=t)}}(t.children,e)}D=!D}var Y=JSON.parse('["daj cos","zje by","zje b","zje. b","zje, b","ch. uja","dasz cos"]'),G=JSON.parse('["kurw","gowno","pedal","cwel","dziwk","pierdo","huj","hoj","zjeb","jeb","fuck","kutas","cip","walkonia","pizd","suko","dupek","gnoju","ciul","korwa","cioto","ciota","cioty","sukinsyn","spierd","debil","chodzi. w każdym","poszła po te ciuchy. ja","pierda","kurew","fiut"]'),F=JSON.parse('["ci pó","rękach. u jed","rękach, u jed","ć ip","ć i p","pedał gaz","rower ma pedał"]'),Q=JSON.parse('["osci p","hojn","luchanie","przesluchuj","przysluchuj","nasluchuj","ci poszlo","gow nowa","migow no","ci poz","ci pot","ci pi","ci pr","ci par","ci pom","ci pop","ci pod","ci. pod","ci, pod","ci po p","ci pok","ci pal","ci pr","ci pas","ci. pal","je b","je. b","je, b","ho ja","ec welp",":p","cip cip cip cip","cip cip cip","cip cip","wymachuj","je bo","ci, pi","ci pos","ach u jeg","ci pd","ci pow","ci pon","ci poc","ci pam","dzi w kr","jak","podsluchuje","ci pan","sc i przet","c i po","ek urwal","uzje. barw","uzje, barw","uzje barw","ch uja","ch, uja","ci pou","ach u jed","chu jego","ci pl","chu je","ahoj","eciu le","udziw ka","ci pac","bo ci pa","o ci p","oc i p","ci pol","go w nos","eci p","sci i p","tes u kora","ciu legi","yciu leg","yk urwan"]');function R(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return V(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?V(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,i=function(){};return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){c=!0,a=e},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw a}}}}function V(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}let ee;function te(e,t,n){if(document.getElementById("cpp-automute-panel"))return;const o=n?'Twoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br><span style="color:red">Zawiera ona zwrot "ahoj", który poprzedzony jest przezdowolną literę "a". Tak, w ten sposób automute sprawdza czy jest to "przekleństwo".Jeżeli chcesz wysłać tak czy siak, droga wolna.Wiedz jednak, że akurat w tym przypadku nie ma pomyłek.</span>':'Twoja wiadomość prawdopodobnie byłaby wyłapana przez automute, ale masz szczęście ;) <br>Poniżej wiadomość, jaką widzi automute:<hr><span class="cpp-mute-text" style="word-wrap: break-word; text-align: left;"></span><hr>Czy mimo tego chcesz ją wysłać? Jeżeli wiadomość przejdzie bezgwiazdkowania wyślij wyjątek do Kris Aphalon#3484 na discordzie bądź na skrzynkę pocztową',i=document.createElement("div");s(i),i.id="cpp-automute-panel",i.className="cpp-panel",i.innerHTML='<div class="header-label-positioner"> <div class="header-label"> <div class="left-decor"></div> <div class="right-decor"></div> <span class="panel-name">Automute Catcher</span> </div></div><div class="close-decor"> <button class="close-button" tip="Zamknij"/></div><div class="background"> <div class="top-box"> </div> <div class="bottom-box"> <button class="button text-button bottom-test">Przetestuj</button> <button class="button text-button bottom-send">Wyślij</button> <button class="button text-button bottom-close">Nie wysyłaj</button> <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a> </div></div>',i.querySelector(".bottom-test").setAttribute("tip","Wysyła podejrzaną część wiadomości na chat grupowy.Jeżeli wiadomość zostanie zagwiazdkowana, to nie należy jej wysyłać.Testuje tylko pierwsze zaczerwienione słowo w wiadomości."),i.querySelector(".top-box").innerHTML=o,n||(i.querySelector(".cpp-mute-text").innerHTML=t);const a=function(){document.body.removeChild(i),document.getElementById("inpchat").focus()};i.querySelector("#cpp-automute-panel .close-button").addEventListener("click",a),i.querySelector(".bottom-close").addEventListener("click",a),i.querySelector(".bottom-send").addEventListener("click",a),i.querySelector(".bottom-send").addEventListener("click",(()=>ee(e))),i.querySelector(".bottom-test").addEventListener("click",(()=>function(e,t){const n=document.querySelector("#inpchat"),o=n.value;let i=e;"@"===i[0]&&(i=i.slice(i.indexOf(" ")));const a=t.match(/<span style='color: red; font-weight: bold'>(.*)<\/span>/);if(!a||!a[1])return message("Coś poszło nie tak przy testowaniu. Wyślij wiadomość którą próbowałeś przetestować do Kris Aphalon na Discordzie");const r=a[1],c=Math.max(i.indexOf(r)-20,0),s=Math.min(i.indexOf(r)+r.length+20,i.length),l=i.substring(c,s);n.value="/g "+l,ee(),n.value=o,setTimeout((()=>n.value=o),501)}(e,t))),document.body.appendChild(i),u(i)}function ne(e,t){let n=!0;var o,i=R(t);try{for(i.s();!(o=i.n()).done;){const t=o.value;e.includes(t)&&(console.log("Wykryto zwrot który jest niemiły: "+t),e=e.split(t).join("<span style='color: red; font-weight: bold'>"+t+"</span>"),n=!1)}}catch(e){i.e(e)}finally{i.f()}return!n&&e}function oe(e,t){var n,o=R(t);try{for(o.s();!(n=o.n()).done;){const t=n.value;e=e.split(t).join("X")}}catch(e){o.e(e)}finally{o.f()}return e}function ie(e){let t=e.toLowerCase();if("@"===t[0]&&(t=t.slice(t.indexOf(" "))),t=oe(t,F),t=t.replace(/[^a-zńąćśźżóęł ]/g,"").replace(/ą/g,"a").replace(/ę/g,"e").replace(/ł/g,"l").replace(/[żź]/g,"z").replace(/ó/g,"o").replace(/ń/g,"n").replace(/ć/g,"c").replace(/ś/g,"s"),/a(?=(?:.)*ahoj)(?!hoj.*ahoj)/g.test(t))return te(e,"",!0);let n=ne(t,Y);return n?te(e,n):(t=oe(t,Q),t=t.replace(/ /g,""),t=function(e){if(0===e.length)return"";let t=e[0],n=e[0];for(let o=1;o<e.length;o++)e[o]!==n&&(t+=e[o]),n=e[o];return t}(t),n=ne(t,G),n?te(e,n):void ee(e))}function ae(e){ee=e,Engine.chat.sendMessage=ie.bind(Engine.chat)}function re(){document.getElementById("textarea-background").style.display="none",document.getElementById("textarea-background-up").style.display="none",T.classList.remove("unfolded"),document.querySelector(".messages-wrapper > .scroll-pane").classList.remove("input-unfolded"),I("hideInputScrollbar","#input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}")}function ce(){T.value.length>("466px"===T.style.width?45:20)?function(){if(""!==T.value){{const e=document.querySelector(".messages-wrapper > .scroll-pane");document.getElementById("textarea-background").style.display="block",document.getElementById("textarea-background-up").style.display="block",T.classList.add("unfolded"),e.scrollTop===e.scrollHeight-e.clientHeight&&(e.scrollTop=e.scrollHeight),e.classList.add("input-unfolded")}!function(e){if(M[e]){const t=A.text().split(M[e]).join("");A.text(t),delete M[e]}}("hideInputScrollbar")}else re()}():re()}function se(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}const le=/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;let pe;function ue(e){let t=(e=e.trim()).split(" "),n=!1,o="";if("/"===e[0]||"*"===e[0]){let i=e.split(" ",1)[0];switch(i){case"/me":i=Engine.hero.nick;break;case"/g":case"/k":n=!0;case"/nar":case"*me":case"*nar":case"*nar1":case"*nar2":case"*nar3":case"*sys":i="";break;case"*dial":case"*dial1":case"*dial2":case"*dial3":case"*dial666":{const n=e.split(","),o=n[0].split(" ");n.shift(),t=n.join(",").split(" "),t.unshift(""),o.shift(),i="«"+o.join(" ")+"»";break}case"*lang":{const n=e.split(",");n.shift(),t=n.join(",").split(" "),i="",o="*";break}}t.shift(),""!==i&&t.unshift(i)}else"@"===e[0]&&(n=!0,t.shift());e="";const i=t.length;for(let n=0;n<i;n++)""!==t[n]&&(e+=t[n]+" ");return e=e.trim(),o&&(e=`${o}${e}${o}`),n?ue(e):e}function de(e){const n=e.children[2].innerText.trim();if(void 0!==he.sendArr[0]&&n===ue(he.sendArr[0])){if(clearTimeout(he.sendTimeout),he.sendArr.shift(),0===he.sendArr.length)return;setTimeout((function(){he.sendArr[0].match(le).length>0&&pe(he.sendArr[0])}),t.messageTimeout),he.sendTimeout=setTimeout(me,3*t.messageTimeout)}}function ge(e){var t,n=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return se(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?se(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,i=function(){};return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){c=!0,a=e},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw a}}}}(e);try{for(n.s();!(t=n.n()).done;){const e=t.value;for(let t=0;t<e.addedNodes.length;t++)de(e.addedNodes[t])}}catch(e){n.e(e)}finally{n.f()}}function me(){0!==he.sendArr.length&&(sessionStorage.noAnwserMsgDisplayed||(window.message("Coś poszło nie tak i twoja wiadomość nie została wysłana na chat. Kliknij PPM na koordynaty by przywrócić resztę niewysłanej wiadomości.\n Jeżeli wiadomość widnieje na chacie, zignoruj ten komunikat."),sessionStorage.noAnwserMsgDisplayed=!0))}const he={sendArr:[],sendTimeout:0,blockTextareaChanging:!1};function be(){var e;!function(){const e=localStorage.getItem("chatPlusPlus");if(e){const i=JSON.parse(e);for(var n=0,o=Object.keys(i);n<o.length;n++){const e=o[n];t[e]=i[e]}}localStorage.setItem("chatPlusPlus",JSON.stringify(t))}(),I("basic",'#inpchat{background:0 0;border:0;bottom:2px;color:#fff;height:19px;left:-94px;margin:0;outline:0;overflow-x:scroll;padding:0;position:absolute;resize:none;scrollbar-width:none;white-space:nowrap;width:205px}#inpchat.unfolded{height:124px;line-height:25.6px;overflow-x:hidden;scrollbar-width:thin;white-space:pre-wrap;margin-top:5px;padding:0 4px 4px;z-index:100}#textarea-background{background-color:#233316;border-image:url(/img/gui/chat-srodek-powtarzalny.png) 0 111 0 104 round round;border-style:solid;border-width:0 111px 0 104px;bottom:18px;height:50px;left:-104px;pointer-events:none;position:absolute;z-index:50}#textarea-background-up{border-image:url(/img/gui/chat-up.png) 14 111 0 104 fill repeat round;border-style:solid;border-width:14px 111px 0 104px;bottom:60px;height:60px;left:-104px;pointer-events:none;position:absolute;z-index:60}.chat-size-1 #textarea-background,.chat-size-1 #textarea-background-up{width:33px}.chat-size-2 #textarea-background,.chat-size-2 #textarea-background-up{width:290px}.chat-size-1 #inpchat{width:211px}.chat-size-2 #inpchat{width:463px}.section.chat-tpl .send-btn.right{z-index:201}.input-unfolded{height:calc(100% - 105px) !important}.cpp-panel{animation:fade .5s;border-image:url(http://cronus.margonem.com/img/gui/tmp/window-frame.png) 32 20 repeat;border-style:solid;border-width:34px 13px 10px 13px;color:#000;cursor:url(http://nerthus.margonem.pl/img/gui/cursor/1.png),url(http://nerthus.margonem.pl/img/gui/cursor/1.cur),auto;left:calc(50% - 204px);pointer-events:auto;position:fixed;top:calc(50% - 150px);transition:opacity .35s ease-in-out;width:380px;z-index:499}.cpp-panel>.background{background-color:#f1deaa;background-image:url(http://cronus.margonem.com/img/gui/content-redleather.jpg)}.cpp-panel>.header-label-positioner{left:10px;pointer-events:none;position:absolute;right:10px;text-align:center;top:-35px}.cpp-panel .header-label{background:url(http://cronus.margonem.com/img/gui/dialogue/dialogi-naglowek.png);display:inline-block;height:28px;margin:0 auto;position:relative}.cpp-panel .header-label>.right-decor,.cpp-panel .header-label>.left-decor{background:url(http://cronus.margonem.com/img/gui/dialogue/dialogi.png) -38px -2px;height:28px;left:-52px;position:absolute;top:0;width:52px}.cpp-panel .header-label>.right-decor{background-position:-91px -2px;left:auto;right:-52px}.cpp-panel .header-label>span{color:beige;line-height:28px;text-align:center}.cpp-panel .panel-name{transition:width .35s ease-in-out}.cpp-panel>.close-decor{background:url(http://cronus.margonem.com/img/gui/buttony.png?v=5) -380px -55px;height:52px;pointer-events:none;position:absolute;right:-15px;top:-35px;width:51px}.cpp-panel .close-button{background:url(http://cronus.margonem.com/img/gui/buttony.png?v=5) -263px -79px;border:0;cursor:url(http://nerthus.margonem.pl/img/gui/cursor/5.png),url(http://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;height:22px;padding:0;pointer-events:auto;position:absolute;right:3px;top:3px;width:22px}.cpp-panel .close-button:hover{background-position:-286px -79px}.cpp-panel .settings-box{height:75px;display:grid;grid-template-columns:50% auto;grid-template-rows:50% auto;justify-items:center;align-items:center;padding-top:10px}.cpp-panel .setting-label{cursor:unset;height:24px;position:relative;width:155px;user-select:none}.cpp-panel .setting-label-text{cursor:url(http://nerthus.margonem.pl/img/gui/cursor/5.png),url(http://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;left:25px;line-height:28px;position:relative}.cpp-panel .setting-checkbox{display:none}.cpp-panel .checkbox-outline{border:2px solid #6e644b;border-radius:2px;box-sizing:border-box;cursor:url(http://nerthus.margonem.pl/img/gui/cursor/5.png),url(http://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;display:inline-block;height:18px;left:0;margin:0;overflow:hidden;position:absolute;top:3px;width:18px;z-index:2}.checkmark{display:none;height:22px;left:-4px;pointer-events:none;position:relative;top:-2px;transform:rotate(45deg);width:22px}.checkmark-stem{background-color:#f1dfa8;height:13px;left:10px;position:absolute;top:2px;width:2px}.checkmark-kick{background-color:#f1dfa8;height:2px;left:5px;position:absolute;top:13px;width:6px}.cpp-panel .setting-checkbox:checked+.checkbox-outline{background-color:#6e644b}.cpp-panel .setting-checkbox:checked+.checkbox-outline .checkmark{display:inline-block}.cpp-panel .save-button{margin-right:30px}.cpp-panel .cancel-button{margin-left:30px}.cpp-panel .cancel-button:not(:hover){background-image:linear-gradient(to top, #310b0b, #831f1f)}.cpp-panel .cancel-button:not(:hover)::before{box-shadow:inset 0 0 1px 1px rgba(218,97,97,.6509803922)}.cpp-panel .hidden{display:none}.cpp-panel .button{background-image:linear-gradient(to top, #12210d, #396b29);border:1px solid #0c0d0d;border-radius:4px;box-shadow:inset 0 0 1px 1px #cecece,inset 0 0 0 3px #0c0d0d;box-sizing:border-box;color:#e6d6bf;cursor:url(http://nerthus.margonem.pl/img/gui/cursor/5.png),url(http://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;display:inline-block;height:42px;line-height:34px;position:relative;width:42px}.cpp-panel.button.blue{background-image:linear-gradient(to top, #081522, #1d4873)}.cpp-panel .button.blue:not(:hover)::before{box-shadow:inset 0 0 1px 1px rgba(85,148,212,.6509803922)}.cpp-panel .button:before{backface-visibility:hidden;border-radius:4px;bottom:3px;box-shadow:inset 0 0 1px 1px rgba(126,197,104,.6509803922);content:"";left:3px;position:absolute;right:3px;top:3px;transform:translateZ(0)}.cpp-panel .button:after{border-radius:3px;bottom:0;box-shadow:0 1px 0 1px #0c0d0d;content:"";left:0;position:absolute;right:0;top:0}.cpp-panel .button:hover:before{box-shadow:inset 0 0 1px 1px rgba(144,144,144,.6509803922)}.cpp-panel .button:hover{background-image:linear-gradient(to top, #101010, #434343)}.cpp-panel .bottom-box{display:flex;height:50px;justify-content:center}#cpp-automute-panel .bottom-box{justify-content:space-evenly}#cpp-automute-panel .text-button{justify-content:space-evenly}.cpp-panel .text-button{border-radius:6px;height:28px;line-height:24px;margin-top:10px;text-align:center;width:90px}.cpp-panel .text-button::before,.cpp-panel .text-button::after{content:unset}.cpp-panel .donate-button{background-image:linear-gradient(to top, #58310b, #daa520);bottom:6px;box-shadow:inset 0 0 1px 1px #cecece,inset 0 0 0 3px #0c0d0d;height:35px;padding:2px 0 0 0;position:absolute;right:5px;width:35px;font-size:25px;color:#000}.cpp-panel .donate-button span{top:-2px;position:relative}.cpp-panel .donate-button:hover{color:pink}.cpp-panel .donate-button::before{content:"";position:absolute;left:3px;top:3px;bottom:3px;right:3px;box-shadow:inset 0 0 1px 1px rgba(237,177,117,.65);border-radius:4px;transform:translateZ(0);backface-visibility:hidden}#cpp-test-button{position:absolute;left:20px;bottom:20px;width:77px}#cpp-automute-panel .top-box{text-align:center}#cpp-automute-panel .donate-button{right:0;bottom:3px}'),J(),T.addEventListener("input",ce,!1),(e=T).addEventListener("focusout",re,!1),e.addEventListener("focusin",ce,!1),re(),function(){{Z.toHide=["sys_info"],Z.toHide2=["priv-in-general","group-in-general","clan-in-general","system-in-general"],Z.toNotHide=["me","nar","nar2","nar3","dial1","dial2","dial3","dial666"];const e=document.getElementsByClassName("lagmeter")[0];e.addEventListener("click",U),e.style.cursor="cell"}}(),pe=Engine.chat.sendMessage.bind(Engine.chat),function(){const e=document.querySelector(".chat-tpl .messages-wrapper .scroll-pane");new MutationObserver(ge).observe(e,{attributes:!1,childList:!0,subtree:!1})}(),ae((function(e,n,o,i){const a=`<label class="setting-label"> <span class="setting-label-text" tip="Wysyłaj wiadomości dłuższe niż 200 znaków dzięki wykorzystaniu najnowszych nowinek technologi.">MultiMsg</span> <input class="setting-checkbox" id="cpp-setting-multiMsg" name="multiMsg" type="checkbox" ${t.multiMsg?" checked":""}> <span class="checkbox-outline"> <span class="checkmark"> <div class="checkmark-stem"></div> <div class="checkmark-kick"></div> </span> </span></label>`;d.push(a),g.multiMsg=i}(0,0,0,L),f=Engine.chat.sendMessage.bind(Engine.chat),Engine.chat.sendMessage=S.bind(Engine.chat),document.querySelector(".chat-tpl .send-btn").addEventListener("contextmenu",v),Engine.chat.sendMessage)),document.getElementsByClassName("lag")[0].addEventListener("contextmenu",m)}if(Engine&&Engine.allInit)be();else{let e,t=!1;Object.defineProperty(Engine,"allInit",{set(n){e=n,!0!==n||t||(be(),t=!0)},get:()=>e})}}();