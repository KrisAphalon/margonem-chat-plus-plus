!function(){"use strict";var e={d:function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}};e.d({},{y:function(){return Me},t:function(){return Ie}});var t,n,o,a,i,r={multiMsg:!0,justifyChat:!1,mergeMessages:!0,messageTimeout:2e3};function c(){localStorage.setItem("chatPlusPlus",JSON.stringify(r))}function s(e){e.target===e.currentTarget&&(window.g.lock.add("cpp-dragging"),(e=e||window.event).preventDefault(),o=e.clientX,a=e.clientY,i=e.target,document.addEventListener("mousemove",p),document.addEventListener("mouseup",u))}function l(e){e.addEventListener("mousedown",s,!1)}function p(e){(e=e||window.event).preventDefault(),t=o-e.clientX,n=a-e.clientY,o=e.clientX,a=e.clientY,i.style.top=i.offsetTop-n+"px",i.style.left=i.offsetLeft-t+"px"}function u(){window.g.lock.remove("cpp-dragging"),document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",u)}var d=[],m={};function h(e,t,n,o){var a=`<label class="setting-label"> <span class="setting-label-text" tip="${n}">${t}</span> <input class="setting-checkbox" id="cpp-setting-${e}" name="${e}" type="checkbox" ${r[e]?" checked":""}> <span class="checkbox-outline"> <span class="checkmark"> <div class="checkmark-stem"></div> <div class="checkmark-kick"></div> </span> </span></label>`;d.push(a),m[e]=o}var b='<div class="header-label-positioner"> <div class="header-label"> <div class="left-decor"></div> <div class="right-decor"></div> <span class="panel-name">Chat Plus Plus</span> </div></div><div class="close-decor"> <button class="close-button" tip="Zamknij"/></div><div class="background"> <div class="settings-box"></div> <div class="bottom-box"> <button class="button text-button bottom-close">OK</button> <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a> </div></div>';function f(e){if(e.preventDefault(),!document.getElementById("cpp-panel")){var t=document.createElement("div");l(t),t.id="cpp-panel",t.className="cpp-panel",t.innerHTML=b,t.querySelector(".settings-box").innerHTML=d.join("");var n=()=>document.body.removeChild(t);for(var o in t.querySelector("#cpp-panel .close-button").addEventListener("click",n),t.querySelector(".bottom-close").addEventListener("click",n),t.querySelector(".bottom-close").addEventListener("click",(()=>message("Zapisano!"))),m){var a=t.querySelector(`#cpp-setting-${o}`);a.checked=r[o],a.addEventListener("input",m[o])}document.body.appendChild(t)}}function y(e){if(e.startsWith("@")){var t=e.split(" ")[0].substring(1);return(e=e.split(" ")).shift(),e=e.join(" "),void window._g(`chat&channel=personal&receiver=${t}`,!1,{c:e})}window._g("chat&channel=local",!1,{c:e})}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var x,w=/[ąćęłńóśźż@]/gi;function k(e){if(!["/","@","*"].includes(e[0]))return e;var t=e.split(" ");return"*"===e[0]&&t[0].includes("dial")&&(t=e.split(",")),t.shift(),"@"===e[0]?k(t.join(" ")):t.join(" ")}function j(e){var t=e.match(w);return t?e.length+t.length:e.length}function z(e){e.preventDefault();var t=document.getElementById("inpchat"),n="",o=Me.sendArr.length;if(0===o)return!1;if(o>=1&&(window.message("Przywracanie wiadomości..."),n=Me.sendArr[0].trim()),o>1)for(var a=1;a<o;a++)n+=" "+k(Me.sendArr[a]).trim();return console.log(n),t.value=n,!1}function S(e,t){return"*"!==e[t][0]&&(e[t]="*"+e[t].substr(1)),e[t].startsWith("*dial")||e[t].startsWith("*lang")?e.slice(t).join(" ").split(",")[0]+", ":e[t]+" "}function E(e,t,n){var o,a,i,r,c=(o=e,a=/[!?.] /,i=Math.floor(n/2),(r=o.substring(i||0).search(a))>=0?r+(i||0):r);if(c>=0)return c+2;var s=e.lastIndexOf(" ");return s>=0?s+1:t}function A(e,t){for(var n=0,o=0;o<t&&!(++n>=e.length);o++)e[n].match(w)&&o++;return n}function T(e,t,n){if(""!==e){var o=function(e,t,n){n-=j(t);for(var o=[];e.length>0;){var a=A(e,n),i=e.substring(0,a),r=j(e)>n?E(i,a,n):e.length;o.push(t+i.substring(0,r).trim()),e=e.slice(r)}return o}(e=e.substring(t.length),t,n);console.log(o);var a,i=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,r=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){c=!0,i=e},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw i}}}}(o);try{for(i.s();!(a=i.n()).done;){var r=a.value;Me.sendArr.push(r)}}catch(e){i.e(e)}finally{i.f()}}}function L(){setTimeout((function(){document.getElementById("inpchat").focus(),document.getElementById("inpchat").blur()}),100)}function I(e){if(e=(e=e.replace(/ /g," ")).replace(/[«»]/g,""),r.multiMsg&&""!==e)return function(e){var t=function(e){var t=e.split(" ");if(t.length<=1)return"";var n="";return(e.startsWith("@")||["/k","/g"].includes(t[0]))&&(n=t[0]+" "),(e.startsWith("*")||e.startsWith("/me"))&&(n=S(t,0)),n&&!n.startsWith("*")&&t[1].startsWith("*")&&(n+=S(t,1)),n}(e=e.trim());if(Me.sendArr.splice(0),j(e)<=197)return x(e),void L();T(e,t,197),e.startsWith("/me")&&(Me.sendArr[0]=Me.sendArr[0].replace(/^.{3}/,"/me")),Me.sendArr.length>0&&(x(Me.sendArr[0]),Me.sendTimeout=setTimeout(Ie,3*r.messageTimeout)),document.getElementById("inpchat").blur(),L()}(e);x(e),L()}function M(){return r.multiMsg=!r.multiMsg,c(),!1}var C={},O=["nar","nar2","nar3","sys_comm","me"],P=/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;function B(e){return{tab:e.k,nick:""===e.n?e.nick:e.n,text:e.t,time:e.ts,command:e.s}}function N(e,t){var n=B(t),o=n.tab,a=n.nick,i=n.text,c=n.time,s=n.command;if(e.innerHTML!==C[a][2])return!1;var l=/(.*)<\/span>$/g.exec(C[a][2]);if(!l)return!1;var p=l[1]+" "+i+"</span>";return e.innerHTML=p,C[a]=[o,s,p,c],log(function(e){var t=document.createElement("div");return t.innerText=e,t.innerHTML}(`[${o}] ${a} -> ${i}`)),window.clearTimeout(Me.sendTimeout),void 0!==Me.sendArr[0]&&Me.sendArr.shift(),Me.sendArr.length>0&&setTimeout((function(){Me.sendArr[0].match(P).length>0&&window.chatSendMsg(Me.sendArr[0])}),r.messageTimeout),Me.sendArr.length>1&&(Me.sendTimeout=setTimeout(Ie,3*r.messageTimeout)),!0}function q(e){var t=B(e),n=t.tab,o=t.nick,a=t.text,i=t.time,c=t.command;if(!r.mergeMessages)return!1;if(!O.includes(c))return!1;if(function(e){if(!function(e){var t=B(e),n=t.tab,o=t.nick,a=t.time,i=t.command;return void 0!==C[o]&&C[o][0]===n&&C[o][1]===i&&!(a-C[o][3]>5)}(e))return!1;for(var t=document.getElementById("chattxt"),n=t.children.length-1;n>=0;n--)if(N(t.children[n],e))return!0}(e))return!0;var s=`<span></span><span class="chatmsg">${a}</span>`;return C[o]=[n,c,s,i],!1}function W(){return r.mergeMessages=!r.mergeMessages,c(),!1}var _=$('<style id="chat-plus-plus-styles">').appendTo("head"),H={};function J(e,t){H[e]||(_.append(t),H[e]=t)}function D(e){if(H[e]){var t=_.text().split(H[e]).join("");_.text(t),delete H[e]}}function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var K,U=[],X={priv:"#fc0",clant:"#ffa500",team:"#b554ff",sys_comm:"#f33"},Y=["priv","sys_comm","clant","team"];function F(){(function(){var e=document.createElement("div");e.id="chattxt",e.style.display="none";var t=document.createElement("div");e.appendChild(t);var n=document.createElement("span");n.className="chatmsg",t.appendChild(n),document.body.appendChild(e);for(var o=0;o<Y.length;o++)t.className=Y[o],X[Y[o]]=window.getComputedStyle(n).color;document.body.removeChild(e),J("inputClasses",`#inpchat.priv { color: ${X.priv}; }#inpchat.clant { color: ${X.clant}; }#inpchat.team { color: ${X.team}; }#inpchat.sys_comm { color: ${X.sys_comm}; } `)})(),document.querySelector("#bottombar").addEventListener("keyup",(e=>{"Enter"===e.key&&function(e){console.log(U);var t,n=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return Z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Z(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,r=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){c=!0,i=e},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw i}}}}(U);try{for(n.s();!(t=n.n()).done;)if((0,t.value)(e))return console.log("STOPPPP"),e.preventDefault(),e.stopImmediatePropagation(),void e.stopPropagation()}catch(e){n.e(e)}finally{n.f()}}(e)}),!0)}var G,Q=document.getElementById("chatscrollbar");function R(){clearTimeout(G),Q.style.opacity=1,Q.classList.add("moving"),G=setTimeout((function(){Q.style.opacity=0,Q.classList.remove("moving")}),1e3)}var V="#chat.left #chatTxtContainer #chattxt { width: 253px; padding-left: 4px; text-align: justify;}#chatscrollbar { -webkit-transition: opacity 0.5s ease-out; -moz-transition: opacity 0.5s ease-out; transition: opacity 0.5s ease-out;}#chatscrollbar.moving { -webkit-transition: opacity 0.15s ease-out; -moz-transition: opacity 0.15s ease-out; transition: opacity 0.15s ease-out;}#chatscrollbar:hover { opacity: 1 !important; -webkit-transition: opacity 0.15s ease-out; -moz-transition: opacity 0.15s ease-out; transition: opacity 0.15s ease-out;}";function ee(){return r.justifyChat=!r.justifyChat,r.justifyChat?(J("justify",V),document.getElementById("chattxt").addEventListener("scroll",R),Q.style.opacity="0"):(D("justify"),document.getElementById("chattxt").removeEventListener("scroll",R),Q.style.opacity="1"),c(),!1}var te=!1,ne={toHide:[],toHide2:[],toNotHide:[]};function oe(e){return ne.toNotHide.some((t=>e.classList.contains(t)))}function ae(e){return ne.toHide.includes(e.className)}function ie(){var e=te?"":"none";!function(e,t){for(var n=0;n<e.length;n++){var o=e[n];!oe(o)&&ae(o)&&(o.style.display=t)}}(document.getElementById("chattxt").children,e),te=!te}var re=JSON.parse('["daj cos","zje by","zje b","zje. b","zje, b","ch. uja","dasz cos"]'),ce=JSON.parse('["kurw","gowno","pedal","cwel","dziwk","pierdo","huj","hoj","zjeb","jeb","fuck","kutas","cip","walkonia","pizd","suko","dupek","gnoju","ciul","korwa","cioto","ciota","cioty","sukinsyn","spierd","debil","chodzi. w każdym","poszła po te ciuchy. ja","pierda","kurew","fiut","qrw"]'),se=JSON.parse('["ci pó","rękach. u jed","rękach, u jed","ć ip","ć i p","pedał gaz","rower ma pedał"]'),le=JSON.parse('["osci p","hojn","luchanie","przesluchuj","przysluchuj","nasluchuj","ci poszlo","gow nowa","migow no","ci poz","ci pot","ci pi","ci pr","ci par","ci pom","ci pop","ci pod","ci. pod","ci, pod","ci po p","ci pok","ci pal","ci pr","ci pas","ci. pal","je b","je. b","je, b","ho ja","ec welp",":p","cip cip cip cip","cip cip cip","cip cip","wymachuj","je bo","ci, pi","ci pos","ach u jeg","ci pd","ci pow","ci pon","ci poc","ci pam","dzi w kr","jak","podsluchuje","ci pan","sc i przet","c i po","ek urwal","uzje. barw","uzje, barw","uzje barw","ch uja","ch, uja","ci pou","ach u jed","chu jego","ci pl","chu je","ahoj","eciu le","udziw ka","ci pac","bo ci pa","o ci p","oc i p","ci pol","go w nos","eci p","sci i p","tes u kora","ciu legi","yciu leg","yk urwan"]');function pe(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return ue(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ue(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,r=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){c=!0,i=e},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw i}}}}function ue(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var de="Wysyła podejrzaną część wiadomości do samego siebie.Jeżeli wiadomość zostanie zagwiazdkowana <b>lub nie pojawi się dwa razy</b>, prawdopodobnie nie należy jej wysyłać.Testuje tylko pierwsze zaczerwienione słowo w wiadomości.",me='<div class="header-label-positioner"> <div class="header-label"> <div class="left-decor"></div> <div class="right-decor"></div> <span class="panel-name">Automute Catcher</span> </div></div><div class="close-decor"> <button class="close-button" tip="Zamknij"/></div><div class="background"> <div class="top-box"> </div> <div class="bottom-box"> <button class="button text-button bottom-test">Przetestuj</button> <button class="button text-button bottom-send">Wyślij</button> <button class="button text-button bottom-close">Nie wysyłaj</button> <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a> </div></div>',he='Twoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br><span style="color:red">Zawiera ona zwrot "ahoj", który poprzedzony jest przezdowolną literę "a". Tak, w ten sposób automute sprawdza, czy jest to "przekleństwo".Jeżeli chcesz wysłać tak czy siak, droga wolna.Wiedz jednak, że akurat w tym przypadku nie ma pomyłek.</span>',ge='Twoja wiadomość prawdopodobnie byłaby wyłapana przez automute, ale masz szczęście ;) <br>Poniżej wiadomość, jaką widzi automute:<hr><span class="cpp-mute-text" style="word-wrap: break-word; text-align: left;"></span><hr>Czy mimo tego chcesz ją wysłać? Jeżeli wiadomość przejdzie bezgwiazdkowania wyślij wyjątek do Kris Aphalon na Discordzie bądź na skrzynkę pocztową';function be(e,t,n){if(!document.getElementById("cpp-automute-panel")){var o=n?he:ge,a=document.createElement("div");l(a),a.id="cpp-automute-panel",a.className="cpp-panel",a.innerHTML=me;var i=de;a.querySelector(".bottom-test").setAttribute("tip",i),a.querySelector(".top-box").innerHTML=o,n||(a.querySelector(".cpp-mute-text").innerHTML=t);var r=function(){document.body.removeChild(a),document.getElementById("inpchat").focus()};a.querySelector("#cpp-automute-panel .close-button").addEventListener("click",r),a.querySelector(".bottom-close").addEventListener("click",r),a.querySelector(".bottom-send").addEventListener("click",r),a.querySelector(".bottom-send").addEventListener("click",(()=>y(e))),a.querySelector(".bottom-test").addEventListener("click",(()=>function(e,t){var n=document.querySelector("#inpchat"),o=n.value,a=e;"@"===a[0]&&(a=a.slice(a.indexOf(" ")));var i=t.match(/<span style='color: red; font-weight: bold'>(.*)<\/span>/);if(null==i||!i[1])return message("Coś poszło nie tak przy testowaniu. Wyślij wiadomość którą próbowałeś przetestować do Kris Aphalon na Discordzie");var r=i[1],c=Math.max(a.indexOf(r)-20,0),s=Math.min(a.indexOf(r)+r.length+20,a.length),l=a.substring(c,s);y("@"+hero.nick.split(" ").join("_")+" "+l),n.value=o,setTimeout((()=>n.value=o),501)}(e,t))),document.body.appendChild(a)}}function fe(e,t){var n,o=!0,a=pe(t);try{for(a.s();!(n=a.n()).done;){var i=n.value;e.includes(i)&&(console.log("Wykryto zwrot który jest niemiły: "+i),e=e.split(i).join("<span style='color: red; font-weight: bold'>"+i+"</span>"),o=!1)}}catch(e){a.e(e)}finally{a.f()}return!o&&e}function ye(e,t){var n,o=pe(t);try{for(o.s();!(n=o.n()).done;){var a=n.value;e=e.split(a).join("X")}}catch(e){o.e(e)}finally{o.f()}return e}function ve(){return function(e){var t=e.toLowerCase();if("@"===t[0]&&(t=t.slice(t.indexOf(" "))),t=(t=ye(t,se)).replace(/[^a-zńąćśźżóęł ]/g,"").replace(/ą/g,"a").replace(/ę/g,"e").replace(/ł/g,"l").replace(/[żź]/g,"z").replace(/ó/g,"o").replace(/ń/g,"n").replace(/ć/g,"c").replace(/ś/g,"s"),/a(?=.*ahoj)(?!hoj.*ahoj)/g.test(t))return be(e,"",!0),!0;var n=fe(t,re);return n?(be(e,n),!0):(t=function(e){if(0===e.length)return"";for(var t=e[0],n=e[0],o=1;o<e.length;o++)e[o]!==n&&(t+=e[o]),n=e[o];return t}(t=(t=ye(t,le)).replace(/ /g,"")),!!(n=fe(t,ce))&&(be(e,n),!0))}(document.querySelector("#inpchat").value)}function xe(){var e=document.getElementById("textarea-background");K.classList.remove("unfolded"),e.classList.remove("unfolded"),J("hideInputScrollbar","#input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}")}function we(){3===Number(g.chat.state)&&(K.value.length>30?function(){if(""!==K.value){var e=document.getElementById("textarea-background");K.classList.add("unfolded"),e.classList.add("unfolded"),D("hideInputScrollbar")}else xe()}():xe())}function ke(e){e.addEventListener("focusout",xe,!1),e.addEventListener("focusin",we,!1)}function je(e){e.removeEventListener("focusout",xe,!1),e.removeEventListener("focusin",we,!1)}function ze(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var Se,Ee=/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;function Ae(e){var t=(e=e.trim()).split(" "),n=!1,o="";if("/"===e[0]||"*"===e[0]){var a=e.split(" ",1)[0];switch(a){case"/me":a=hero.nick;break;case"/g":case"/k":n=!0;case"/nar":case"*me":case"*nar":case"*nar1":case"*nar2":case"*nar3":case"*sys":a="";break;case"*dial":case"*dial1":case"*dial2":case"*dial3":case"*dial666":var i=e.split(","),r=i[0].split(" ");i.shift(),(t=i.join(",").split(" ")).unshift(""),r.shift(),a="«"+r.join(" ")+"»";break;case"*lang":var c=e.split(",");c.shift(),t=c.join(",").split(" "),a="",o="*"}t.shift(),""!==a&&t.unshift(a)}else"@"===e[0]&&(n=!0,t.shift());e="";for(var s=t.length,l=0;l<s;l++)""!==t[l]&&(e+=t[l]+" ");return e=e.trim(),o&&(e=`${o}${e}${o}`),n?Ae(e):e}function Te(e){var t=e.children[1].innerText.trim();if(void 0!==Me.sendArr[0]&&t===Ae(Me.sendArr[0])){if(clearTimeout(Me.sendTimeout),Me.sendArr.shift(),0===Me.sendArr.length)return;setTimeout((function(){Me.sendArr[0].match(Ee).length>0&&Se(Me.sendArr[0])}),r.messageTimeout),Me.sendTimeout=setTimeout(Ie,3*r.messageTimeout)}}function Le(e){var t,n=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return ze(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ze(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,r=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){c=!0,i=e},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw i}}}}(e);try{for(n.s();!(t=n.n()).done;)for(var o=t.value,a=0;a<o.addedNodes.length;a++)Te(o.addedNodes[a])}catch(e){n.e(e)}finally{n.f()}}function Ie(){0!==Me.sendArr.length&&(sessionStorage.noAnwserMsgDisplayed||(window.message("Coś poszło nie tak i twoja wiadomość nie została wysłana na chat. Kliknij PPM na koordynaty by przywrócić resztę niewysłanej wiadomości.\n Jeżeli wiadomość widnieje na chacie, zignoruj ten komunikat."),sessionStorage.noAnwserMsgDisplayed=!0))}var Me={sendArr:[],sendTimeout:0,blockTextareaChanging:!1};function Ce(){var e;!function(){var e=localStorage.getItem("chatPlusPlus");if(e)for(var t=JSON.parse(e),n=0,o=Object.keys(t);n<o.length;n++){var a=o[n];r[a]=t[a]}localStorage.setItem("chatPlusPlus",JSON.stringify(r))}(),J("basic",'#inpchat{background-image:unset;background-position-y:-8px;background-repeat:repeat-y;bottom:0;display:inline;font-size:12px;height:17px;left:90px;line-height:17px;margin:0;overflow-x:scroll;padding:0;position:absolute;resize:none;scrollbar-width:none;top:unset !important;white-space:nowrap;width:312px}#lastmsg{pointer-events:none}#inpchat.unfolded{background-position-y:0;height:150px;line-height:25.6px;overflow-x:hidden;scrollbar-width:thin;white-space:pre-wrap}#inpchat::-webkit-scrollbar{display:none}#inpchat.unfolded::-webkit-scrollbar{display:block}#bottombar{overflow:visible;z-index:362}#textarea-background{background-position-y:-98px;bottom:-84px;display:none;height:318px;left:171px;position:absolute;-moz-transform:rotate(90deg);-ms-transform:rotate(90deg);-o-transform:rotate(90deg);-webkit-transform:rotate(90deg);transform:rotate(90deg);width:150px}#textarea-background.unfolded{display:block}#lagmeter,#botloc,#bchat,#pvpmode{z-index:363}.cpp-panel{animation:fade .5s;border-image:url(http://cronus.margonem.com/img/gui/tmp/window-frame.png) 32 20 repeat;border-style:solid;border-width:34px 13px 10px 13px;color:#000;left:calc(50% - 204px);pointer-events:auto;position:fixed;top:calc(50% - 150px);transition:opacity .35s ease-in-out;width:380px;z-index:499}.cpp-panel>.background{background-color:#f1deaa;background-image:url(http://cronus.margonem.com/img/gui/content-redleather.jpg)}.cpp-panel>.header-label-positioner{left:10px;pointer-events:none;position:absolute;right:10px;text-align:center;top:-35px}.cpp-panel .header-label{background:url(http://cronus.margonem.com/img/gui/dialogue/dialogi-naglowek.png);display:inline-block;height:28px;margin:0 auto;position:relative}.cpp-panel .header-label>.right-decor,.cpp-panel .header-label>.left-decor{background:url(http://cronus.margonem.com/img/gui/dialogue/dialogi.png) -38px -2px;height:28px;left:-52px;position:absolute;top:0;width:52px}.cpp-panel .header-label>.right-decor{background-position:-91px -2px;left:auto;right:-52px}.cpp-panel .header-label>span{color:beige;line-height:28px;text-align:center}.cpp-panel .panel-name{transition:width .35s ease-in-out}.cpp-panel>.close-decor{background:url(http://cronus.margonem.com/img/gui/buttony.png?v=5) -380px -55px;height:52px;pointer-events:none;position:absolute;right:-15px;top:-35px;width:51px}.cpp-panel .close-button{background:url(http://cronus.margonem.com/img/gui/buttony.png?v=5) -263px -79px;border:0;cursor:pointer;height:22px;padding:0;pointer-events:auto;position:absolute;right:3px;top:3px;width:22px}.cpp-panel .close-button:hover{background-position:-286px -79px}.cpp-panel .settings-box{height:75px;display:grid;grid-template-columns:50% auto;grid-template-rows:50% auto;justify-items:center;align-items:center;padding-top:10px}.cpp-panel .setting-label{cursor:unset;height:24px;position:relative;width:155px;user-select:none}.cpp-panel .setting-label-text{cursor:pointer;left:25px;line-height:28px;position:relative}.cpp-panel .setting-checkbox{display:none}.cpp-panel .checkbox-outline{border:2px solid #6e644b;border-radius:2px;box-sizing:border-box;cursor:pointer;display:inline-block;height:18px;left:0;margin:0;overflow:hidden;position:absolute;top:3px;width:18px;z-index:2}.checkmark{display:none;height:22px;left:-4px;pointer-events:none;position:relative;top:-2px;transform:rotate(45deg);width:22px}.checkmark-stem{background-color:#f1dfa8;height:13px;left:10px;position:absolute;top:2px;width:2px}.checkmark-kick{background-color:#f1dfa8;height:2px;left:5px;position:absolute;top:13px;width:6px}.cpp-panel .setting-checkbox:checked+.checkbox-outline{background-color:#6e644b}.cpp-panel .setting-checkbox:checked+.checkbox-outline .checkmark{display:inline-block}.cpp-panel .save-button{margin-right:30px}.cpp-panel .cancel-button{margin-left:30px}.cpp-panel .cancel-button:not(:hover){background-image:linear-gradient(to top, #310b0b, #831f1f)}.cpp-panel .cancel-button:not(:hover)::before{box-shadow:inset 0 0 1px 1px rgba(218,97,97,.6509803922)}.cpp-panel .hidden{display:none}.cpp-panel .button{background-image:linear-gradient(to top, #12210d, #396b29);border:1px solid #0c0d0d;border-radius:4px;box-shadow:inset 0 0 1px 1px #cecece,inset 0 0 0 3px #0c0d0d;box-sizing:border-box;color:#e6d6bf;cursor:pointer;display:inline-block;height:42px;line-height:34px;position:relative;width:42px}.cpp-panel.button.blue{background-image:linear-gradient(to top, #081522, #1d4873)}.cpp-panel .button.blue:not(:hover)::before{box-shadow:inset 0 0 1px 1px rgba(85,148,212,.6509803922)}.cpp-panel .button:before{backface-visibility:hidden;border-radius:4px;bottom:3px;box-shadow:inset 0 0 1px 1px rgba(126,197,104,.6509803922);content:"";left:3px;position:absolute;right:3px;top:3px;transform:translateZ(0)}.cpp-panel .button:after{border-radius:3px;bottom:0;box-shadow:0 1px 0 1px #0c0d0d;content:"";left:0;position:absolute;right:0;top:0}.cpp-panel .button:hover:before{box-shadow:inset 0 0 1px 1px rgba(144,144,144,.6509803922)}.cpp-panel .button:hover{background-image:linear-gradient(to top, #101010, #434343)}.cpp-panel .bottom-box{display:flex;height:50px;justify-content:center}#cpp-automute-panel .bottom-box{justify-content:space-evenly}#cpp-automute-panel .text-button{justify-content:space-evenly}.cpp-panel .text-button{border-radius:6px;height:28px;line-height:24px;margin-top:10px;text-align:center;width:90px}.cpp-panel .text-button::before,.cpp-panel .text-button::after{content:unset}.cpp-panel .donate-button{background-image:linear-gradient(to top, #58310b, #daa520);bottom:6px;box-shadow:inset 0 0 1px 1px #cecece,inset 0 0 0 3px #0c0d0d;height:35px;padding:2px 0 0 0;position:absolute;right:5px;width:35px;font-size:25px;color:#000}.cpp-panel .donate-button span{top:-2px;position:relative}.cpp-panel .donate-button:hover{color:pink}.cpp-panel .donate-button::before{content:"";position:absolute;left:3px;top:3px;bottom:3px;right:3px;box-shadow:inset 0 0 1px 1px rgba(237,177,117,.65);border-radius:4px;transform:translateZ(0);backface-visibility:hidden}#cpp-test-button{position:absolute;left:20px;bottom:20px;width:77px}#cpp-automute-panel .top-box{text-align:center}#cpp-automute-panel .donate-button{right:0;bottom:3px}'),F(),function(){K.addEventListener("input",we,!1);var e=window.g.chat.state;3===e||"3"===e?ke(K):(xe(),je(K)),window.g.chat.__state=window.g.chat.state,Object.defineProperty(window.g.chat,"state",{set(e){3===e||"3"===e?ke(K):je(K),this.__state=e},get(){return this.__state}})}(),function(){ne.toHide=["clant","syst","priv","priv2","sys_info","team"],J("chatCleaner","#msghider-button{position:'absolute';width:17px;height:21px;textAlign:center;cursor:cell}");var e=document.createElement("div");e.id="msghider-button",e.addEventListener("click",ie),document.getElementById("lagmeter").appendChild(e)}(),Se=window.chatSendMsg,e=document.getElementById("chattxt"),new MutationObserver(Le).observe(e,{attributes:!1,childList:!0,subtree:!1}),h("multiMsg","MultiMsg","Wysyłaj wiadomości dłuższe niż 200 znaków dzięki wykorzystaniu najnowszych nowinek technologi.",M),x=window.chatSendMsg,window.chatSendMsg=I,document.getElementById("botloc").addEventListener("contextmenu",z),window.chatSendMsg,U.push(ve),g.chat.parsers.push(q),h("mergeMessages","Scalaj wiadomości","Scala wizualnie wiadomości typu *me czy *nar jeżeli są one wysyłane z bardzo krótkim opóźnieniem.",W),r.justifyChat&&(J("justify",V),document.getElementById("chattxt").addEventListener("scroll",R)),h("justifyChat","Justowanie czatu","Inny wygląd rozszerzonego czatu. Znikający scrollbar oraz wyjustowany text.",ee),document.getElementById("bchat").addEventListener("contextmenu",f)}"complete"===document.readyState?Ce():window.addEventListener("load",Ce)}();