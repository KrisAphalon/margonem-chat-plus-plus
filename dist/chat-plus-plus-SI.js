!function(){"use strict";var t={d:function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}};t.d({},{y:function(){return Mt},t:function(){return Tt}});const e={multiMsg:!0,justifyChat:!1,mergeMessages:!0,messageTimeout:2e3};function n(){localStorage.setItem("chatPlusPlus",JSON.stringify(e))}let o,i,a,r,c;function s(t){t.target===t.currentTarget&&(window.g.lock.add("cpp-dragging"),(t=t||window.event).preventDefault(),a=t.clientX,r=t.clientY,c=t.target,document.addEventListener("mousemove",p),document.addEventListener("mouseup",d))}function l(t){t.addEventListener("mousedown",s,!1)}function p(t){(t=t||window.event).preventDefault(),o=a-t.clientX,i=r-t.clientY,a=t.clientX,r=t.clientY,c.style.top=c.offsetTop-i+"px",c.style.left=c.offsetLeft-o+"px"}function d(){window.g.lock.remove("cpp-dragging"),document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",d)}const u=[],m={};function h(t,n,o,i){const a=e[t]?" checked":"",r='<label class="setting-label"> <span class="setting-label-text" tip="'.concat(o,'">').concat(n,'</span> <input class="setting-checkbox" id="cpp-setting-').concat(t,'" name="').concat(t,'" type="checkbox" ').concat(a,'> <span class="checkbox-outline"> <span class="checkmark"> <div class="checkmark-stem"></div> <div class="checkmark-kick"></div> </span> </span></label>');u.push(r),m[t]=i}function b(t){if(t.preventDefault(),document.getElementById("cpp-panel"))return;const n=document.createElement("div");l(n),n.id="cpp-panel",n.className="cpp-panel",n.innerHTML='<div class="header-label-positioner"> <div class="header-label"> <div class="left-decor"></div> <div class="right-decor"></div> <span class="panel-name">Chat Plus Plus</span> </div></div><div class="close-decor"> <button class="close-button" tip="Zamknij"/></div><div class="background"> <div class="settings-box"></div> <div class="bottom-box"> <button class="button text-button bottom-close">OK</button> <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a> </div></div>',n.querySelector(".settings-box").innerHTML=u.join("");const o=()=>document.body.removeChild(n);n.querySelector("#cpp-panel .close-button").addEventListener("click",o),n.querySelector(".bottom-close").addEventListener("click",o),n.querySelector(".bottom-close").addEventListener("click",(()=>message("Zapisano!")));for(const t in m){const o=n.querySelector("#cpp-setting-".concat(t));o.checked=e[t],o.addEventListener("input",m[t])}document.body.appendChild(n)}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}const y=/[ąćęłńóśźż@]/gi;let x;function v(t){if(!["/","@","*"].includes(t[0]))return t;let e=t.split(" ");return"*"===t[0]&&e[0].includes("dial")&&(e=t.split(",")),e.shift(),"@"===t[0]?v(e.join(" ")):e.join(" ")}function w(t){const e=t.match(y);return e?t.length+e.length:t.length}function k(t){t.preventDefault();const e=document.getElementById("inpchat");let n="";const o=Mt.sendArr.length;if(0===o)return!1;if(o>=1&&(window.message("Przywracanie wiadomości..."),n=Mt.sendArr[0].trim()),o>1)for(let t=1;t<o;t++)n+=" "+v(Mt.sendArr[t]).trim();return console.log(n),e.value=n,!1}function j(t,e){return"*"!==t[e][0]&&(t[e]="*"+t[e].substr(1)),t[e].startsWith("*dial")||t[e].startsWith("*lang")?t.slice(e).join(" ").split(",")[0]+", ":t[e]+" "}function z(t,e,n){const o=function(t,e,n){const o=t.substring(n||0).search(/[!?.] /);return o>=0?o+(n||0):o}(t,0,Math.floor(n/2));if(o>=0)return o+2;const i=t.lastIndexOf(" ");return i>=0?i+1:e}function E(t,e){let n=0;for(let o=0;o<e&&(n++,!(n>=t.length));o++)t[n].match(y)&&o++;return n}function S(t,e,n){if(""===t)return;const o=function(t,e,n){n-=w(e);const o=[];for(;t.length>0;){const i=E(t,n),a=t.substring(0,i),r=w(t)>n?z(a,i,n):t.length;o.push(e+a.substring(0,r).trim()),t=t.slice(r)}return o}(t=t.substring(e.length),e,n);console.log(o);var i,a=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return r=t.done,t},e:function(t){c=!0,a=t},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw a}}}}(o);try{for(a.s();!(i=a.n()).done;){let t=i.value;Mt.sendArr.push(t)}}catch(t){a.e(t)}finally{a.f()}}function L(){setTimeout((function(){document.getElementById("inpchat").focus(),document.getElementById("inpchat").blur()}),100)}function I(t){if(t=(t=t.replace(/ /g," ")).replace(/[«»]/g,""),e.multiMsg&&""!==t)return function(t){const n=function(t){const e=t.split(" ");if(e.length<=1)return"";let n="";return(t.startsWith("@")||["/k","/g"].includes(e[0]))&&(n=e[0]+" "),(t.startsWith("*")||t.startsWith("/me"))&&(n=j(e,0)),n&&!n.startsWith("*")&&e[1].startsWith("*")&&(n+=j(e,1)),n}(t=t.trim());if(Mt.sendArr.splice(0),w(t)<=197)return x(t),void L();S(t,n,197),t.startsWith("/me")&&(Mt.sendArr[0]=Mt.sendArr[0].replace(/^.{3}/,"/me")),Mt.sendArr.length>0&&(x(Mt.sendArr[0]),Mt.sendTimeout=setTimeout(Tt,3*e.messageTimeout)),document.getElementById("inpchat").blur(),L()}(t);x(t),L()}function A(){return e.multiMsg=!e.multiMsg,n(),!1}const T={},M=["nar","nar2","nar3","sys_comm","me"],C=/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;function B(t){return{tab:t.k,nick:""===t.n?t.nick:t.n,text:t.t,time:t.ts,command:t.s}}function O(t,n){const o=B(n),i=o.tab,a=o.nick,r=o.text,c=o.time,s=o.command;if(t.innerHTML!==T[a][2])return!1;const l=/(.*)<\/span>$/g.exec(T[a][2]);if(!l)return!1;const p=l[1]+" "+r+"</span>";return t.innerHTML=p,T[a]=[i,s,p,c],log(function(t){const e=document.createElement("div");return e.innerText=t,e.innerHTML}("[".concat(i,"] ").concat(a," -> ").concat(r))),window.clearTimeout(Mt.sendTimeout),void 0!==Mt.sendArr[0]&&Mt.sendArr.shift(),Mt.sendArr.length>0&&setTimeout((function(){Mt.sendArr[0].match(C).length>0&&window.chatSendMsg(Mt.sendArr[0])}),e.messageTimeout),Mt.sendArr.length>1&&(Mt.sendTimeout=setTimeout(Tt,3*e.messageTimeout)),!0}function N(t){const n=B(t),o=n.tab,i=n.nick,a=n.text,r=n.time,c=n.command;if(!e.mergeMessages)return!1;if(!M.includes(c))return!1;if(function(t){if(!function(t){const e=B(t),n=e.tab,o=e.nick,i=e.time,a=e.command;return void 0!==T[o]&&T[o][0]===n&&T[o][1]===a&&!(i-T[o][3]>5)}(t))return!1;const e=document.getElementById("chattxt");for(let n=e.children.length-1;n>=0;n--)if(O(e.children[n],t))return!0}(t))return!0;const s='<span></span><span class="chatmsg">'.concat(a,"</span>");return T[i]=[o,c,s,r],!1}function P(){return e.mergeMessages=!e.mergeMessages,n(),!1}const W=$('<style id="chat-plus-plus-styles">').appendTo("head"),_={};function q(t,e){_[t]||(W.append(e),_[t]=e)}function H(t){if(_[t]){const e=W.text().split(_[t]).join("");W.text(e),delete _[t]}}let J,Z;const D={priv:"#fc0",clant:"#ffa500",team:"#b554ff",sys_comm:"#f33"},X=["priv","sys_comm","clant","team"];function K(){const t=document.createElement("div");t.id="chattxt",t.style.display="none";const e=document.createElement("div");t.appendChild(e);const n=document.createElement("span");n.className="chatmsg",e.appendChild(n),document.body.appendChild(t);for(let t=0;t<X.length;t++)e.className=X[t],D[X[t]]=window.getComputedStyle(n).color;document.body.removeChild(t),q("inputClasses","#inpchat.priv { color: ".concat(D.priv,"; }#inpchat.clant { color: ").concat(D.clant,"; }#inpchat.team { color: ").concat(D.team,"; }#inpchat.sys_comm { color: ").concat(D.sys_comm,"; } "))}function U(){localStorage.setItem("lastInputtedMsg",J.value)}function Y(){const t=document.getElementById("inpchat");let n=J;return n.value=n.value.replace(/\r?\n/gi,""),e.multiMsg?n.removeAttribute("maxLength"):function(t){t.value.length>199&&(t.value=t.value.substr(0,199));const e=/[ąćęłńóśźż*@,. _]/gi;let n=0;for(let o=0;o<t.value.length;o++)t.value[o].match(e)&&(n++,t.value=t.value.substr(0,199-n));t.maxLength=199-n}(J),Q(),e.multiMsg||n===t||(t.value=J.value),n.value}const G={"/g":"team","/k":"clant","*me":"me","/me":"me","*nar":"nar","*nar1":"nar","/nar":"nar","*nar2":"nar2","*nar3":"nar3","*dial":"dial1","*dial1":"dial1","*dial2":"dial2","*dial3":"dial3","*dial666":"dial666","*lang":"lang"},F=["*sys","*map","*light","*addGraf","*delGraf","*hide","*weather"];function Q(){const t=J.value.trim().split(" ")[0];J.classList.contains("unfolded")?J.className="unfolded":J.className="",J.style.color="","@"!==t[0]?F.includes(t)?J.style.color=D.sys_comm:G[t]&&J.classList.add(G[t]):J.style.color=D.priv}function R(){J=document.createElement("textarea"),J.id="inpchat",e.multiMsg||(J.maxLength=199),function(){{const t=document.getElementById("bottombar"),e=document.getElementById("inpchat");e.parentNode.removeChild(e),Z=document.createElement("div"),Z.id="textarea-background",t.appendChild(Z),t.appendChild(J),J.addEventListener("click",(t=>t.stopPropagation()),!0),J.addEventListener("mousedown",(t=>t.stopPropagation()),!0)}}(),navigator.userAgent.endsWith("Firefox/52.0")&&(J.style.overflowX="hidden"),J.addEventListener("input",Y,!1),J.addEventListener("input",U,!1),K(),function(){const t=localStorage.getItem("lastInputtedMsg");t&&(J.value=t,document.getElementById("bottxt").style.display="block",J.style.opacity="0"),Q()}(),J.addEventListener("focusout",(function(){const t=document.getElementById("inpchat");""===t.value&&(document.getElementById("bottxt").style.display="block",t.style.opacity="0")}),!1),J.addEventListener("focusin",(function(){document.getElementById("bottxt").style.display="none",document.getElementById("inpchat").style.opacity="1"}),!1),function(){const t=function(){K(),Q(),function(t){const e=document.createElement("div");e.id="chat",e.className="left",e.style.display="none",document.body.appendChild(e);const n=window.getComputedStyle(e).backgroundImage;document.body.removeChild(e),t.style.backgroundImage!==n&&(t.style.backgroundImage=n)}(Z)};if(setTimeout(t,1e3),setTimeout(t,2e3),"function"!=typeof window.shairModuleLoader&&!document.getElementById("loading"))return;const e=document.getElementById("loading");'url("https://i.imgur.com/1en4JTp.png")'===window.getComputedStyle(e,null).backgroundImage&&(document.getElementById("textarea-background").style.left="146px",document.getElementById("inpchat").style.left="65px",setTimeout(t,3e3),setTimeout(t,5e3),setTimeout(t,2e4))}()}const V=document.getElementById("chatscrollbar");let tt;function et(){clearTimeout(tt),V.style.opacity=1,V.classList.add("moving"),tt=setTimeout((function(){V.style.opacity=0,V.classList.remove("moving")}),1e3)}const nt="#chat.left #chatTxtContainer #chattxt { width: 253px; padding-left: 4px; text-align: justify;}#chatscrollbar { -webkit-transition: opacity 0.5s ease-out; -moz-transition: opacity 0.5s ease-out; transition: opacity 0.5s ease-out;}#chatscrollbar.moving { -webkit-transition: opacity 0.15s ease-out; -moz-transition: opacity 0.15s ease-out; transition: opacity 0.15s ease-out;}#chatscrollbar:hover { opacity: 1 !important; -webkit-transition: opacity 0.15s ease-out; -moz-transition: opacity 0.15s ease-out; transition: opacity 0.15s ease-out;}";function ot(){return e.justifyChat=!e.justifyChat,e.justifyChat?(q("justify",nt),document.getElementById("chattxt").addEventListener("scroll",et),V.style.opacity="0"):(H("justify"),document.getElementById("chattxt").removeEventListener("scroll",et),V.style.opacity="1"),n(),!1}let it=!1;const at={toHide:[],toHide2:[],toNotHide:[]};function rt(t){return at.toNotHide.some((e=>t.classList.contains(e)))}function ct(t){return at.toHide.includes(t.className)}function st(){const t=it?"":"none";!function(t,e){for(let n=0;n<t.length;n++){const o=t[n];!rt(o)&&ct(o)&&(o.style.display=e)}}(document.getElementById("chattxt").children,t),it=!it}var lt=JSON.parse('["daj cos","zje by","zje b","zje. b","zje, b","ch. uja"]'),pt=JSON.parse('["kurw","gowno","pedal","cwel","dziwk","pierdo","huj","hoj","zjeb","jeb","fuck","kutas","cip","walkonia","pizd","suko","dupek","gnoju","ciul","korwa","cioto","ciota","sukinsyn","spierd","debil","chodzi. w każdym","poszła po te ciuchy. ja","pierda"]'),dt=JSON.parse('["ci pó","rękach. u jed","rękach, u jed","ć ip","ć i p","pedał gaz","rower ma pedał"]'),ut=JSON.parse('["osci p","hojn","luchanie","przesluchuj","przysluchuj","nasluchuj","ci poszlo","gow nowa","migow no","ci poz","ci pot","ci pi","ci pr","ci par","ci pom","ci pop","ci pod","ci. pod","ci, pod","ci po p","ci pok","ci pal","ci pr","ci pas","ci. pal","je b","je. b","je, b","ho ja","ec welp",":p","cip cip cip cip","cip cip cip","cip cip","wymachuj","je bo","ci, pi","ci pos","ach u jeg","ci pd","ci pow","ci pon","ci poc","ci pam","dzi w kr","jak","podsluchuje","ci pan","sc i przet","c i po","ek urwal","uzje. barw","uzje, barw","uzje barw","ch uja","ch, uja","ci pou","ach u jed","chu jego","ci pl","chu je","ahoj","eciu le","udziw ka","ci pac","bo ci pa","o ci p","oc i p","ci pol","go w nos","eci p","sci i p","tes u kora"]');function mt(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return gt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?gt(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return r=t.done,t},e:function(t){c=!0,a=t},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw a}}}}function gt(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}let ht;function bt(t,e,n){if(document.getElementById("cpp-automute-panel"))return;const o=n?'Twoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br><span style="color:red">Zawiera ona zwrot "ahoj", który poprzedzony jest przezdowolną literę "a". Tak, w ten sposób automute sprawdza czy jest to "przekleństwo".Jeżeli chcesz wysłać tak czy siak, droga wolna.Wiedz jednak, że akurat w tym przypadku nie ma pomyłek.</span>':'Twoja wiadomość prawdopodobnie byłaby wyłapana przez automute, ale masz szczęście ;) <br>Poniżej wiadomość, jaką widzi automute:<hr><span class="cpp-mute-text" style="word-wrap: break-word; text-align: left;"></span><hr>Czy mimo tego chcesz ją wysłać? Jeżeli wiadomość przejdzie bezgwiazdkowania wyślij wyjątek do Kris Aphalon#3484 na discordzie bądź na skrzynkę pocztową',i=document.createElement("div");l(i),i.id="cpp-automute-panel",i.className="cpp-panel",i.innerHTML='<div class="header-label-positioner"> <div class="header-label"> <div class="left-decor"></div> <div class="right-decor"></div> <span class="panel-name">Automute Catcher</span> </div></div><div class="close-decor"> <button class="close-button" tip="Zamknij"/></div><div class="background"> <div class="top-box"> </div> <div class="bottom-box"> <button class="button text-button bottom-test">Przetestuj</button> <button class="button text-button bottom-send">Wyślij</button> <button class="button text-button bottom-close">Nie wysyłaj</button> <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a> </div></div>',i.querySelector(".bottom-test").setAttribute("tip","Wysyła podejrzaną część wiadomości do samego siebie.Jeżeli wiadomość zostanie zagwiazdkowana <b>lub nie pojawi się dwa razy</b> prawdopodobnie nie należy jej wysyłać.Testuje tylko pierwsze zaczerwienione słowo w wiadomości."),i.querySelector(".top-box").innerHTML=o,n||(i.querySelector(".cpp-mute-text").innerHTML=e);const a=function(){document.body.removeChild(i),document.getElementById("inpchat").focus()};i.querySelector("#cpp-automute-panel .close-button").addEventListener("click",a),i.querySelector(".bottom-close").addEventListener("click",a),i.querySelector(".bottom-send").addEventListener("click",a),i.querySelector(".bottom-send").addEventListener("click",(()=>ht(t))),i.querySelector(".bottom-test").addEventListener("click",(()=>function(t,e){const n=document.querySelector("#inpchat"),o=n.value;let i=t;"@"===i[0]&&(i=i.slice(i.indexOf(" ")));const a=e.match(/<span style='color: red; font-weight: bold'>(.*)<\/span>/);if(!a||!a[1])return message("Coś poszło nie tak przy testowaniu. Wyślij wiadomość którą próbowałeś przetestować do Kris Aphalon na Discordzie");const r=a[1],c=Math.max(i.indexOf(r)-20,0),s=Math.min(i.indexOf(r)+r.length+20,i.length),l=i.substring(c,s);ht("@"+hero.nick.split(" ").join("_")+" "+l),n.value=o,setTimeout((()=>n.value=o),501)}(t,e))),document.body.appendChild(i)}function ft(t,e){let n=!0;var o,i=mt(e);try{for(i.s();!(o=i.n()).done;){const e=o.value;t.includes(e)&&(console.log("Wykryto zwrot który jest niemiły: "+e),t=t.split(e).join("<span style='color: red; font-weight: bold'>"+e+"</span>"),n=!1)}}catch(t){i.e(t)}finally{i.f()}return!n&&t}function yt(t,e){var n,o=mt(e);try{for(o.s();!(n=o.n()).done;){const e=n.value;t=t.split(e).join("X")}}catch(t){o.e(t)}finally{o.f()}return t}function xt(t){let e=t.toLowerCase();if("@"===e[0]&&(e=e.slice(e.indexOf(" "))),e=yt(e,dt),e=e.replace(/[^a-zńąćśźżóęł ]/g,"").replace(/ą/g,"a").replace(/ę/g,"e").replace(/ł/g,"l").replace(/[żź]/g,"z").replace(/ó/g,"o").replace(/ń/g,"n").replace(/ć/g,"c").replace(/ś/g,"s"),/a(?=(?:.)*ahoj)(?!hoj.*ahoj)/g.test(e))return bt(t,"",!0);let n=ft(e,lt);return n?bt(t,n):(e=yt(e,ut),e=e.replace(/ /g,""),e=function(t){if(0===t.length)return"";let e=t[0],n=t[0];for(let o=1;o<t.length;o++)t[o]!==n&&(e+=t[o]),n=t[o];return e}(e),n=ft(e,pt),n?bt(t,n):void ht(t))}function vt(){{const t=document.getElementById("textarea-background");J.classList.remove("unfolded"),t.classList.remove("unfolded")}q("hideInputScrollbar","#input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}")}function wt(){3===Number(g.chat.state)&&(J.value.length>30?function(){if(""!==J.value){{const t=document.getElementById("textarea-background");J.classList.add("unfolded"),t.classList.add("unfolded")}H("hideInputScrollbar")}else vt()}():vt())}function kt(t){t.addEventListener("focusout",vt,!1),t.addEventListener("focusin",wt,!1)}function jt(t){t.removeEventListener("focusout",vt,!1),t.removeEventListener("focusin",wt,!1)}function zt(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}const Et=/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;let St;function Lt(t){let e=(t=t.trim()).split(" "),n=!1,o="";if("/"===t[0]||"*"===t[0]){let i=t.split(" ",1)[0];switch(i){case"/me":i=hero.nick;break;case"/g":case"/k":n=!0;case"/nar":case"*me":case"*nar":case"*nar1":case"*nar2":case"*nar3":case"*sys":i="";break;case"*dial":case"*dial1":case"*dial2":case"*dial3":case"*dial666":{const n=t.split(","),o=n[0].split(" ");n.shift(),e=n.join(",").split(" "),e.unshift(""),o.shift(),i="«"+o.join(" ")+"»";break}case"*lang":{const n=t.split(",");n.shift(),e=n.join(",").split(" "),i="",o="*";break}}e.shift(),""!==i&&e.unshift(i)}else"@"===t[0]&&(n=!0,e.shift());t="";const i=e.length;for(let n=0;n<i;n++)""!==e[n]&&(t+=e[n]+" ");return t=t.trim(),o&&(t="".concat(o).concat(t).concat(o)),n?Lt(t):t}function It(t){const n=t.children[1].innerText.trim();if(void 0!==Mt.sendArr[0]&&n===Lt(Mt.sendArr[0])){if(clearTimeout(Mt.sendTimeout),Mt.sendArr.shift(),0===Mt.sendArr.length)return;setTimeout((function(){Mt.sendArr[0].match(Et).length>0&&St(Mt.sendArr[0])}),e.messageTimeout),Mt.sendTimeout=setTimeout(Tt,3*e.messageTimeout)}}function At(t){var e,n=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return zt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?zt(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return r=t.done,t},e:function(t){c=!0,a=t},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw a}}}}(t);try{for(n.s();!(e=n.n()).done;){const t=e.value;for(let e=0;e<t.addedNodes.length;e++)It(t.addedNodes[e])}}catch(t){n.e(t)}finally{n.f()}}function Tt(){0!==Mt.sendArr.length&&(sessionStorage.noAnwserMsgDisplayed||(window.message("Coś poszło nie tak i twoja wiadomość nie została wysłana na chat. Kliknij PPM na koordynaty by przywrócić resztę niewysłanej wiadomości.\n Jeżeli wiadomość widnieje na chacie, zignoruj ten komunikat."),sessionStorage.noAnwserMsgDisplayed=!0))}const Mt={sendArr:[],sendTimeout:0,blockTextareaChanging:!1};function Ct(){var t;!function(){const t=localStorage.getItem("chatPlusPlus");if(t){const i=JSON.parse(t);for(var n=0,o=Object.keys(i);n<o.length;n++){const t=o[n];e[t]=i[t]}}localStorage.setItem("chatPlusPlus",JSON.stringify(e))}(),q("basic",'#inpchat{background-image:unset;background-position-y:-8px;background-repeat:repeat-y;bottom:0;display:inline;font-size:12px;height:17px;left:90px;line-height:17px;margin:0;overflow-x:scroll;padding:0;position:absolute;resize:none;scrollbar-width:none;top:unset !important;white-space:nowrap;width:312px}#lastmsg{pointer-events:none}#inpchat.unfolded{background-position-y:0;height:150px;line-height:25.6px;overflow-x:hidden;scrollbar-width:thin;white-space:pre-wrap}#inpchat::-webkit-scrollbar{display:none}#inpchat.unfolded::-webkit-scrollbar{display:block}#bottombar{overflow:visible;z-index:362}#textarea-background{background-position-y:-98px;bottom:-84px;display:none;height:318px;left:171px;position:absolute;-moz-transform:rotate(90deg);-ms-transform:rotate(90deg);-o-transform:rotate(90deg);-webkit-transform:rotate(90deg);transform:rotate(90deg);width:150px}#textarea-background.unfolded{display:block}#lagmeter,#botloc,#bchat,#pvpmode{z-index:363}.cpp-panel{animation:fade .5s;border-image:url(http://cronus.margonem.com/img/gui/tmp/window-frame.png) 32 20 repeat;border-style:solid;border-width:34px 13px 10px 13px;color:#000;left:calc(50% - 204px);pointer-events:auto;position:fixed;top:calc(50% - 150px);transition:opacity .35s ease-in-out;width:380px;z-index:499}.cpp-panel>.background{background-color:#f1deaa;background-image:url(http://cronus.margonem.com/img/gui/content-redleather.jpg)}.cpp-panel>.header-label-positioner{left:10px;pointer-events:none;position:absolute;right:10px;text-align:center;top:-35px}.cpp-panel .header-label{background:url(http://cronus.margonem.com/img/gui/dialogue/dialogi-naglowek.png);display:inline-block;height:28px;margin:0 auto;position:relative}.cpp-panel .header-label>.right-decor,.cpp-panel .header-label>.left-decor{background:url(http://cronus.margonem.com/img/gui/dialogue/dialogi.png) -38px -2px;height:28px;left:-52px;position:absolute;top:0;width:52px}.cpp-panel .header-label>.right-decor{background-position:-91px -2px;left:auto;right:-52px}.cpp-panel .header-label>span{color:beige;line-height:28px;text-align:center}.cpp-panel .panel-name{transition:width .35s ease-in-out}.cpp-panel>.close-decor{background:url(http://cronus.margonem.com/img/gui/buttony.png?v=5) -380px -55px;height:52px;pointer-events:none;position:absolute;right:-15px;top:-35px;width:51px}.cpp-panel .close-button{background:url(http://cronus.margonem.com/img/gui/buttony.png?v=5) -263px -79px;border:0;cursor:pointer;height:22px;padding:0;pointer-events:auto;position:absolute;right:3px;top:3px;width:22px}.cpp-panel .close-button:hover{background-position:-286px -79px}.cpp-panel .settings-box{height:75px;display:grid;grid-template-columns:50% auto;grid-template-rows:50% auto;justify-items:center;align-items:center;padding-top:10px}.cpp-panel .setting-label{cursor:unset;height:24px;position:relative;width:155px;user-select:none}.cpp-panel .setting-label-text{cursor:pointer;left:25px;line-height:28px;position:relative}.cpp-panel .setting-checkbox{display:none}.cpp-panel .checkbox-outline{border:2px solid #6e644b;border-radius:2px;box-sizing:border-box;cursor:pointer;display:inline-block;height:18px;left:0;margin:0;overflow:hidden;position:absolute;top:3px;width:18px;z-index:2}.checkmark{display:none;height:22px;left:-4px;pointer-events:none;position:relative;top:-2px;transform:rotate(45deg);width:22px}.checkmark-stem{background-color:#f1dfa8;height:13px;left:10px;position:absolute;top:2px;width:2px}.checkmark-kick{background-color:#f1dfa8;height:2px;left:5px;position:absolute;top:13px;width:6px}.cpp-panel .setting-checkbox:checked+.checkbox-outline{background-color:#6e644b}.cpp-panel .setting-checkbox:checked+.checkbox-outline .checkmark{display:inline-block}.cpp-panel .save-button{margin-right:30px}.cpp-panel .cancel-button{margin-left:30px}.cpp-panel .cancel-button:not(:hover){background-image:linear-gradient(to top, #310b0b, #831f1f)}.cpp-panel .cancel-button:not(:hover)::before{box-shadow:inset 0 0 1px 1px rgba(218,97,97,.6509803922)}.cpp-panel .hidden{display:none}.cpp-panel .button{background-image:linear-gradient(to top, #12210d, #396b29);border:1px solid #0c0d0d;border-radius:4px;box-shadow:inset 0 0 1px 1px #cecece,inset 0 0 0 3px #0c0d0d;box-sizing:border-box;color:#e6d6bf;cursor:pointer;display:inline-block;height:42px;line-height:34px;position:relative;width:42px}.cpp-panel.button.blue{background-image:linear-gradient(to top, #081522, #1d4873)}.cpp-panel .button.blue:not(:hover)::before{box-shadow:inset 0 0 1px 1px rgba(85,148,212,.6509803922)}.cpp-panel .button:before{backface-visibility:hidden;border-radius:4px;bottom:3px;box-shadow:inset 0 0 1px 1px rgba(126,197,104,.6509803922);content:"";left:3px;position:absolute;right:3px;top:3px;transform:translateZ(0)}.cpp-panel .button:after{border-radius:3px;bottom:0;box-shadow:0 1px 0 1px #0c0d0d;content:"";left:0;position:absolute;right:0;top:0}.cpp-panel .button:hover:before{box-shadow:inset 0 0 1px 1px rgba(144,144,144,.6509803922)}.cpp-panel .button:hover{background-image:linear-gradient(to top, #101010, #434343)}.cpp-panel .bottom-box{display:flex;height:50px;justify-content:center}#cpp-automute-panel .bottom-box{justify-content:space-evenly}#cpp-automute-panel .text-button{justify-content:space-evenly}.cpp-panel .text-button{border-radius:6px;height:28px;line-height:24px;margin-top:10px;text-align:center;width:90px}.cpp-panel .text-button::before,.cpp-panel .text-button::after{content:unset}.cpp-panel .donate-button{background-image:linear-gradient(to top, #58310b, #daa520);bottom:6px;box-shadow:inset 0 0 1px 1px #cecece,inset 0 0 0 3px #0c0d0d;height:35px;padding:2px 0 0 0;position:absolute;right:5px;width:35px;font-size:25px;color:#000}.cpp-panel .donate-button span{top:-2px;position:relative}.cpp-panel .donate-button:hover{color:pink}.cpp-panel .donate-button::before{content:"";position:absolute;left:3px;top:3px;bottom:3px;right:3px;box-shadow:inset 0 0 1px 1px rgba(237,177,117,.65);border-radius:4px;transform:translateZ(0);backface-visibility:hidden}#cpp-test-button{position:absolute;left:20px;bottom:20px;width:77px}#cpp-automute-panel .top-box{text-align:center}#cpp-automute-panel .donate-button{right:0;bottom:3px}'),R(),function(){J.addEventListener("input",wt,!1);{const t=window.g.chat.state;3===t||"3"===t?kt(J):(vt(),jt(J)),window.g.chat.__state=window.g.chat.state,Object.defineProperty(window.g.chat,"state",{set(t){3===t||"3"===t?kt(J):jt(J),this.__state=t},get(){return this.__state}})}}(),function(){{at.toHide=["clant","syst","priv","priv2","sys_info","team"],q("chatCleaner","#msghider-button{position:'absolute';width:17px;height:21px;textAlign:center;cursor:cell}");const t=document.createElement("div");t.id="msghider-button",t.addEventListener("click",st),document.getElementById("lagmeter").appendChild(t)}}(),St=window.chatSendMsg,function(){const t=document.getElementById("chattxt");new MutationObserver(At).observe(t,{attributes:!1,childList:!0,subtree:!1})}(),h("multiMsg","MultiMsg","Wysyłaj wiadomości dłuższe niż 200 znaków dzięki wykorzystaniu najnowszych nowinek technologi.",A),x=window.chatSendMsg,window.chatSendMsg=I,document.getElementById("botloc").addEventListener("contextmenu",k),t=window.chatSendMsg,ht=t,window.chatSendMsg=xt,g.chat.parsers.push(N),h("mergeMessages","Scalaj wiadomości","Scala wizualnie wiadomości typu *me czy *nar jeżeli są one wysyłane z bardzo krótkim opóźnieniem.",P),e.justifyChat&&(q("justify",nt),document.getElementById("chattxt").addEventListener("scroll",et)),h("justifyChat","Justowanie czatu","Inny wygląd rozszerzonego czatu. Znikający scrollbar oraz wyjustowany text.",ot),document.getElementById("bchat").addEventListener("contextmenu",b)}"complete"===document.readyState?Ct():window.addEventListener("load",Ct)}();