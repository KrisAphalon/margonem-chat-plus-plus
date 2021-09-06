!function(){"use strict";var e={d:function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}};!function(e,t,n){n.d(t,{y:function(){return fe},t:function(){return be}});const o={multiMsg:!0,justifyChat:!1,mergeMessages:!0,messageTimeout:2e3};let i,a,r,s,c;function l(e){e.target===e.currentTarget&&(window.Engine.lock.add("cpp-dragging"),(e=e||window.event).preventDefault(),r=e.clientX,s=e.clientY,c=e.target,document.addEventListener("mousemove",u),document.addEventListener("mouseup",d))}function p(e){e.addEventListener("mousedown",l,!1)}function u(e){(e=e||window.event).preventDefault(),i=r-e.clientX,a=s-e.clientY,r=e.clientX,s=e.clientY,c.style.top=c.offsetTop-a+"px",c.style.left=c.offsetLeft-i+"px"}function d(){window.Engine.lock.remove("cpp-dragging"),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",d)}function m(e){$("[tip]",$(e)).each((function(){const e=$(this);e.tip(e.attr("tip"))}))}const g=[],h={};function b(e){if(e.preventDefault(),document.getElementById("cpp-panel"))return;const t=document.createElement("div");p(t),t.id="cpp-panel",t.className="cpp-panel",t.innerHTML='<div class=header-label-positioner><div class=header-label><div class=left-decor></div><div class=right-decor></div><span class=panel-name>Chat Plus Plus</span></div></div><div class=close-decor><button class=close-button tip=Zamknij></button></div><div class=background><div class=settings-box></div><div class=bottom-box><button class="button text-button bottom-close">OK</button> <a href=https://www.buymeacoffee.com/krisaphalon target=_blank><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a></div></div>',t.querySelector(".settings-box").innerHTML=g.join("");const n=()=>document.body.removeChild(t);t.querySelector("#cpp-panel .close-button").addEventListener("click",n),t.querySelector(".bottom-close").addEventListener("click",n),t.querySelector(".bottom-close").addEventListener("click",(()=>message("Zapisano!")));for(const e in h){const n=t.querySelector(`#cpp-setting-${e}`);n.checked=o[e],n.addEventListener("input",h[e])}document.body.appendChild(t),m(t)}let f;function y(e){if(!["/","@","*"].includes(e[0]))return e;let t=e.split(" ");return"*"===e[0]&&t[0].includes("dial")&&(t=e.split(",")),t.shift(),"@"===e[0]?y(t.join(" ")):t.join(" ")}function x(e){let t=0;const n=e.length;for(let o=0;o<n;o++)e[o].match(w)?t+=2:t++;return t}function v(e){e.preventDefault();const t=document.getElementById("inpchat");let n="";const o=fe.sendArr.length;if(0===o)return!1;if(o>=1&&(window.message("Przywracanie wiadomości..."),n=fe.sendArr[0].trim()),o>1)for(let e=1;e<o;e++)n+=" "+y(fe.sendArr[e]).trim();return console.log(n),t.value=n,!1}const w=/[ąćęłńóśźż*@,. _]/gi;function k(e,t){return"*"!==e[t][0]&&(e[t]="*"+e[t].substr(1)),e[t].startsWith("*dial")?e.slice(t).join(" ").split(",")[0]+", ":e[t]+" "}function z(){setTimeout((function(){document.getElementById("inpchat").focus(),document.getElementById("inpchat").blur()}),100)}function j(e){{const t=document.getElementById("inpchat");e=t.value,t.value=""}if(e=(e=e.replace(/ /g," ")).replace(/[«»]/g,""),o.multiMsg&&""!==e)return function(e){const t=function(e){const t=e.split(" ");if(t.length<=1)return"";let n="";return(e.startsWith("@")||["/k","/g"].includes(t[0]))&&(n=t[0]+" "),(e.startsWith("*")||e.startsWith("/me"))&&(n=k(t,0)),n&&!n.startsWith("*")&&t[1].startsWith("*")&&(n+=k(t,1)),n}(e=e.trim());fe.sendArr.splice(0);const n=195-x(t);if(x(e)<=n)return f(e),void z();!function(e,t,n){if(""===e)return;let o=0,i=0,a=0,r=0,s=0,c=0;for(let l=0;l<e.length;l++)if(e[l].match(w)?(c+=2,s+=2,i+=2):(c++,s++,i++)," "===e[l]?(a=l,s=0):"."===e[l]&&(r=l,c=0),a+30<l&&(a=l,s=0),!(i<n)){if(r+100<l)0===o?fe.sendArr.push(e.slice(0,a)):fe.sendArr.push(t+e.slice(o,a).trim()),o=a,i=s;else{let n=0;for(let t=0;t<5&&("."===e[r+t]||" "===e[r+t]);t++)n++;0===o?fe.sendArr.push(e.slice(0,r+n)):fe.sendArr.push(t+e.slice(o,r+n).trim()),o=r+n,i=c}console.log(fe.sendArr)}0===o?fe.sendArr.push(e):""!==e.slice(o)&&fe.sendArr.push(t+e.slice(o).trim())}(e,t,n),fe.sendArr.length>0&&(f(fe.sendArr[0]),fe.sendTimeout=setTimeout(be,3*o.messageTimeout)),document.getElementById("inpchat").blur(),z()}(e);f(e),z()}function E(){return o.multiMsg=!o.multiMsg,localStorage.setItem("chatPlusPlus",JSON.stringify(o)),!1}const S=$('<style id="chat-plus-plus-styles">').appendTo("head"),L={};function A(e,t){L[e]||(S.append(t),L[e]=t)}let M,T;const I={priv:"#fc0",clant:"#ffa500",team:"#b554ff",sys_comm:"#f33"},C=["priv","sys_comm","clant","team"],N=["priv-in-general","chat-message sys_red","clan-message","group-message"];function O(){localStorage.setItem("lastInputtedMsg",M.value)}function B(){const e=document.getElementById("inpchat");let t=e;return t.value=t.value.replace(/\r?\n/gi,""),o.multiMsg?t.removeAttribute("maxLength"):function(e){e.value.length>199&&(e.value=e.value.substr(0,199));const t=/[ąćęłńóśźż*@,. _]/gi;let n=0;for(let o=0;o<e.value.length;o++)e.value[o].match(t)&&(n++,e.value=e.value.substr(0,199-n));e.maxLength=199-n}(M),P(),o.multiMsg||t===e||(e.value=M.value),t.value}const q={"/g":"team","/k":"clant","*me":"me","/me":"me","*nar":"nar","*nar1":"nar","/nar":"nar","*nar2":"nar2","*nar3":"nar3","*dial":"dial1","*dial1":"dial1","*dial2":"dial2","*dial3":"dial3","*dial666":"dial666"},H=["*sys","*map","*light","*addGraf","*delGraf","*hide","*weather"];function P(){const e=M.value.trim().split(" ")[0];M.classList.contains("unfolded")?M.className="unfolded":M.className="",M.style.color="","@"!==e[0]?H.includes(e)?M.style.color=I.sys_comm:q[e]&&M.classList.add(q[e]):M.style.color=I.priv}function _(){M=document.createElement("textarea"),M.id="inpchat",o.multiMsg||(M.maxLength=199),function(){{M.placeholder="Naciśnij Enter, aby porozmawiać";const e=document.getElementsByClassName("chat-tpl")[0].children[5];e.style.zIndex="200";const t=e.children[0];t.style.opacity="0",t.style.pointerEvents="none",M.addEventListener("keypress",(function(e){"Enter"===e.key&&(M.blur(),""!==M.value&&Engine.chat.sendMessage(M.value))}),!0),t.addEventListener("focusin",(()=>M.focus()));const n=document.createElement("div");n.id="textarea-background-up",e.prepend(n),T=document.createElement("div"),T.id="textarea-background",e.prepend(T),e.prepend(M),function(){const e=document.querySelector(".chat-tpl > .input-wrapper > input"),t=e.value;Object.defineProperty(e,"value",{set(t){this.__value=t,M.value===e.value||fe.blockTextareaChanging||(M.value=e.value,P())},get(){return void 0===this.__value?t:this.__value}})}(),B()}}(),navigator.userAgent.endsWith("Firefox/52.0")&&(M.style.overflowX="hidden"),M.addEventListener("input",B,!1),M.addEventListener("input",O,!1),function(){const e=document.createElement("div");e.className="chat-message",e.style.display="none";const t=document.createElement("div");e.appendChild(t);const n=document.createElement("span");n.className="chatmsg",t.appendChild(n),document.body.appendChild(e);for(let e=0;e<C.length;e++)t.className=N[e],I[C[e]]=window.getComputedStyle(n).color;document.body.removeChild(e),A("inputClasses",`\n#inpchat.priv { color: ${I.priv}; }\n#inpchat.clant { color: ${I.clant}; }\n#inpchat.team { color: ${I.team}; }\n#inpchat.sys_comm { color: ${I.sys_comm}; }\n        `.trim())}(),function(){const e=localStorage.getItem("lastInputtedMsg");e&&(M.value=e),P()}()}document.getElementById("chatscrollbar");let W=!1;const J={toHide:[],toHide2:[],toNotHide:[]};function D(e){return J.toNotHide.some((t=>e.classList.contains(t)))}function Z(e){if(J.toHide.includes(e.classList[1]))return!0;for(let t=0;t<e.children.length;t++){const n=e.children[t];if(J.toHide2.some((e=>n.classList.contains(e))))return!0}return!1}function X(){const e=W?"":"none";{const t=document.getElementsByClassName("section chat-tpl")[0].children[4].children[1];if(!document.getElementsByClassName("tabs-wrapper connectedSortable ui-sortable")[0].children[0].classList.contains("active"))return;!function(e,t){for(let n=0;n<e.length;n++){const o=e[n];!D(o)&&Z(o)&&(o.style.display=t)}}(t.children,e)}W=!W}var K=JSON.parse('["daj cos","zje by","zje b","zje. b","zje, b","ch. uja"]'),Y=JSON.parse('["kurw","gowno","pedal","cwel","dziwk","pierdo","huj","hoj","zjeb","jeb","fuck","kutas","cip","walkonia","pizd","suko","dupek","gnoju","ciul","korwa","cioto","ciota","sukinsyn","spierd","debil","chodzi. w każdym","poszła po te ciuchy. ja"]'),F=JSON.parse('["ci pó","rękach. u jed","rękach, u jed","ć ip","ć i p"]'),G=JSON.parse('["osci p","hojn","luchanie","przesluchuj","przysluchuj","nasluchuj","ci poszlo","gow nowa","migow no","ci poz","ci pot","ci pi","ci pr","ci par","ci pom","ci pop","ci pod","ci. pod","ci, pod","ci po p","ci pok","ci pal","ci pr","ci. pal","je b","je. b","je, b","ho ja","ec welp",":p","cip cip cip cip","cip cip cip","cip cip","wymachuj","je bo","ci, pi","ci pos","ach u jeg","ci pd","ci pow","ci pon","ci poc","ci pam","dzi w kr","jak","podsluchuje","ci pan","sc i przet","c i po","ek urwal","uzje. barw","uzje, barw","uzje barw","ch uja","ch, uja","ci pou","ach u jed","chu jego","ci pl","chu je","ahoj","eciu le","udziw ka","ci pac","bo ci pa","o ci p","oc i p","ci pol","go w nos","eci p","sci i p","tes u kora"]');function U(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return Q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Q(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,i=function(){};return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){s=!0,a=e},f:function(){try{r||null==n.return||n.return()}finally{if(s)throw a}}}}function Q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}let R;const V="\nWysyła podejrzaną część wiadomości na chat grupowy.\nJeżeli wiadomość zostanie zagwiazdkowana, to nie należy jej wysyłać.\nTestuje tylko pierwsze zaczerwienione słowo w wiadomości.\n".trim(),ee=("\nWysyła podejrzaną część wiadomości do samego siebie.\nJeżeli wiadomość zostanie zagwiazdkowana <b>lub nie pojawi się dwa razy</b> prawdopodobnie nie należy jej wysyłać.\nTestuje tylko pierwsze zaczerwienione słowo w wiadomości.\n".trim(),'\n<div class="header-label-positioner">\n    <div class="header-label">\n        <div class="left-decor"></div>\n        <div class="right-decor"></div>\n        <span class="panel-name">Automute Catcher</span>\n    </div>\n</div>\n<div class="close-decor">\n    <button class="close-button" tip="Zamknij"/>\n</div>\n<div class="background">\n    <div class="top-box">\n    </div>\n    <div class="bottom-box">\n        <button class="button text-button bottom-test">Przetestuj</button>\n        <button class="button text-button bottom-send">Wyślij</button>\n        <button class="button text-button bottom-close">Nie wysyłaj</button>\n        <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a>\n    </div>\n</div>\n'.trim()),te='\nTwoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br>\n<span style="color:red">Zawiera ona zwrot "ahoj", który poprzedzony jest przez\ndowolną literę "a". Tak, w ten sposób automute sprawdza czy jest to "przekleństwo".\nJeżeli chcesz wysłać tak czy siak, droga wolna.\nWiedz jednak, że akurat w tym przypadku nie ma pomyłek.</span>\n'.trim(),ne='\nTwoja wiadomość prawdopodobnie byłaby wyłapana przez automute, ale masz szczęście ;) <br>\nPoniżej wiadomość, jaką widzi automute:<hr><span class="cpp-mute-text" style="word-wrap: break-word; text-align: left;">\n\n</span><hr>Czy mimo tego chcesz ją wysłać? Jeżeli wiadomość przejdzie bez\ngwiazdkowania wyślij wyjątek do Kris Aphalon#3484 na discordzie bądź na skrzynkę pocztową\n'.trim();function oe(e,t,n){if(document.getElementById("cpp-automute-panel"))return;const o=n?te:ne,i=document.createElement("div");p(i),i.id="cpp-automute-panel",i.className="cpp-panel",i.innerHTML=ee;const a=V;i.querySelector(".bottom-test").setAttribute("tip",a),i.querySelector(".top-box").innerHTML=o,n||(i.querySelector(".cpp-mute-text").innerHTML=t);const r=function(){document.body.removeChild(i),document.getElementById("inpchat").focus()};i.querySelector("#cpp-automute-panel .close-button").addEventListener("click",r),i.querySelector(".bottom-close").addEventListener("click",r),i.querySelector(".bottom-send").addEventListener("click",r),i.querySelector(".bottom-send").addEventListener("click",(()=>R(e))),i.querySelector(".bottom-test").addEventListener("click",(()=>function(e,t){const n=document.querySelector("#inpchat"),o=n.value;let i=e;"@"===i[0]&&(i=i.slice(i.indexOf(" ")));const a=t.match(/<span style='color: red; font-weight: bold'>(.*)<\/span>/);if(!a||!a[1])return message("Coś poszło nie tak przy testowaniu. Wyślij wiadomość którą próbowałeś przetestować do Kris Aphalon na Discordzie");const r=a[1],s=Math.max(i.indexOf(r)-20,0),c=Math.min(i.indexOf(r)+r.length+20,i.length-1),l=i.substring(s,c);n.value="/g "+l,R(),n.value=o,setTimeout((()=>n.value=o),501)}(e,t))),document.body.appendChild(i),m(i)}function ie(e,t){let n=!0;var o,i=U(t);try{for(i.s();!(o=i.n()).done;){const t=o.value;e.includes(t)&&(console.log("Wykryto zwrot który jest niemiły: "+t),e=e.split(t).join("<span style='color: red; font-weight: bold'>"+t+"</span>"),n=!1)}}catch(e){i.e(e)}finally{i.f()}return!n&&e}function ae(e,t){var n,o=U(t);try{for(o.s();!(n=o.n()).done;){const t=n.value;e=e.split(t).join("X")}}catch(e){o.e(e)}finally{o.f()}return e}function re(e){let t=e.toLowerCase();if("@"===t[0]&&(t=t.slice(t.indexOf(" "))),t=ae(t,F),t=t.replace(/[^a-zńąćśźżóęł ]/g,"").replace(/ą/g,"a").replace(/ę/g,"e").replace(/ł/g,"l").replace(/[żź]/g,"z").replace(/ó/g,"o").replace(/ń/g,"n").replace(/ć/g,"c").replace(/ś/g,"s"),/a(?=(?:.)*ahoj)(?!hoj.*ahoj)/g.test(t))return oe(e,"",!0);let n=ie(t,K);return n?oe(e,n):(t=ae(t,G),t=t.replace(/ /g,""),t=function(e){if(0===e.length)return"";let t=e[0],n=e[0];for(let o=1;o<e.length;o++)e[o]!==n&&(t+=e[o]),n=e[o];return t}(t),n=ie(t,Y),n?oe(e,n):void R(e))}function se(e){R=e,Engine.chat.sendMessage=re.bind(Engine.chat)}function ce(){document.getElementById("textarea-background").style.display="none",document.getElementById("textarea-background-up").style.display="none",M.classList.remove("unfolded"),document.querySelector(".messages-wrapper > .scroll-pane").classList.remove("input-unfolded"),A("hideInputScrollbar","#input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}")}function le(){M.value.length>("466px"===M.style.width?45:20)?function(){if(""!==M.value){{const e=document.querySelector(".messages-wrapper > .scroll-pane");document.getElementById("textarea-background").style.display="block",document.getElementById("textarea-background-up").style.display="block",M.classList.add("unfolded"),e.scrollTop===e.scrollHeight-e.clientHeight&&(e.scrollTop=e.scrollHeight),e.classList.add("input-unfolded")}!function(e){if(L[e]){const t=S.text().split(L[e]).join("");S.text(t),delete L[e]}}("hideInputScrollbar")}else ce()}():ce()}function pe(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}const ue=/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;let de;function me(e){let t=(e=e.trim()).split(" "),n=!1;if("/"===e[0]||"*"===e[0]){let o=e.split(" ",1)[0];switch(o){case"/me":o=Engine.hero.nick;break;case"/g":case"/k":n=!0;case"/nar":case"*me":case"*nar":case"*nar1":case"*nar2":case"*nar3":case"*sys":o="";break;case"*dial":case"*dial1":case"*dial2":case"*dial3":case"*dial666":{const n=e.split(","),i=n[0].split(" ");n.shift(),t=n.join(",").split(" "),t.unshift(""),i.shift(),o="«"+i.join(" ")+"»";break}}t.shift(),""!==o&&t.unshift(o)}else"@"===e[0]&&(n=!0,t.shift());e="";const o=t.length;for(let n=0;n<o;n++)""!==t[n]&&(e+=t[n]+" ");return e=e.trim(),n?me(e):e}function ge(e){const t=e.children[2].innerText.trim();if(void 0!==fe.sendArr[0]&&t===me(fe.sendArr[0])){if(clearTimeout(fe.sendTimeout),fe.sendArr.shift(),0===fe.sendArr.length)return;setTimeout((function(){fe.sendArr[0].match(ue).length>0&&de(fe.sendArr[0])}),o.messageTimeout),fe.sendTimeout=setTimeout(be,3*o.messageTimeout)}}function he(e){var t,n=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return pe(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?pe(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,i=function(){};return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){s=!0,a=e},f:function(){try{r||null==n.return||n.return()}finally{if(s)throw a}}}}(e);try{for(n.s();!(t=n.n()).done;){const e=t.value;for(let t=0;t<e.addedNodes.length;t++)ge(e.addedNodes[t])}}catch(e){n.e(e)}finally{n.f()}}function be(){0!==fe.sendArr.length&&(sessionStorage.noAnwserMsgDisplayed||(window.message("Coś poszło nie tak i twoja wiadomość nie została wysłana na chat. Kliknij PPM na koordynaty by przywrócić resztę niewysłanej wiadomości.\n Jeżeli wiadomość widnieje na chacie, zignoruj ten komunikat."),sessionStorage.noAnwserMsgDisplayed=!0))}const fe={sendArr:[],sendTimeout:0,blockTextareaChanging:!1};function ye(){var e;!function(){const e=localStorage.getItem("chatPlusPlus");if(e){const i=JSON.parse(e);for(var t=0,n=Object.keys(i);t<n.length;t++){const e=n[t];o[e]=i[e]}}localStorage.setItem("chatPlusPlus",JSON.stringify(o))}(),A("basic","#inpchat{background:0 0;border:0;bottom:2px;color:#fff;height:19px;left:-94px;margin:0;outline:0;overflow-x:scroll;padding:0;position:absolute;resize:none;scrollbar-width:none;white-space:nowrap;width:205px}#inpchat.unfolded{height:124px;line-height:25.6px;overflow-x:hidden;scrollbar-width:thin;white-space:pre-wrap;margin-top:5px;padding:0 4px 4px;z-index:100}#textarea-background{background-color:#233316;border-image:url(/img/gui/chat-srodek-powtarzalny.png) 0 111 0 104 round round;border-style:solid;border-width:0 111px 0 104px;bottom:18px;height:50px;left:-104px;pointer-events:none;position:absolute;z-index:50}#textarea-background-up{border-image:url(/img/gui/chat-up.png) 14 111 0 104 fill repeat round;border-style:solid;border-width:14px 111px 0 104px;bottom:60px;height:60px;left:-104px;pointer-events:none;position:absolute;z-index:60}.chat-size-1 #textarea-background,.chat-size-1 #textarea-background-up{width:33px}.chat-size-2 #textarea-background,.chat-size-2 #textarea-background-up{width:290px}.chat-size-1 #inpchat{width:211px}.chat-size-2 #inpchat{width:463px}.section.chat-tpl .send-btn.right{z-index:201}.input-unfolded{height:calc(100% - 105px) !important}.cpp-panel{animation:fade 0.5s;border-image:url(http://cronus.margonem.com/img/gui/tmp/window-frame.png) 32 20 repeat;border-style:solid;border-width:34px 13px 10px 13px;color:#000;cursor:url(http://nerthus.margonem.pl/img/gui/cursor/1.png),url(http://nerthus.margonem.pl/img/gui/cursor/1.cur),auto;left:calc(50% - 204px);pointer-events:auto;position:fixed;top:calc(50% - 150px);transition:opacity 0.35s ease-in-out;width:380px;z-index:499}.cpp-panel>.background{background-color:#f1deaa;background-image:url(http://cronus.margonem.com/img/gui/content-redleather.jpg)}.cpp-panel>.header-label-positioner{left:10px;pointer-events:none;position:absolute;right:10px;text-align:center;top:-35px}.cpp-panel .header-label{background:url(http://cronus.margonem.com/img/gui/dialogue/dialogi-naglowek.png);display:inline-block;height:28px;margin:0 auto;position:relative}.cpp-panel .header-label>.right-decor,.cpp-panel .header-label>.left-decor{background:url(http://cronus.margonem.com/img/gui/dialogue/dialogi.png) -38px -2px;height:28px;left:-52px;position:absolute;top:0;width:52px}.cpp-panel .header-label>.right-decor{background-position:-91px -2px;left:auto;right:-52px}.cpp-panel .header-label>span{color:#f5f5dc;line-height:28px;text-align:center}.cpp-panel .panel-name{transition:width 0.35s ease-in-out}.cpp-panel>.close-decor{background:url(http://cronus.margonem.com/img/gui/buttony.png?v=5) -380px -55px;height:52px;pointer-events:none;position:absolute;right:-15px;top:-35px;width:51px}.cpp-panel .close-button{background:url(http://cronus.margonem.com/img/gui/buttony.png?v=5) -263px -79px;border:0;cursor:url(http://nerthus.margonem.pl/img/gui/cursor/5.png),url(http://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;height:22px;padding:0;pointer-events:auto;position:absolute;right:3px;top:3px;width:22px}.cpp-panel .close-button:hover{background-position:-286px -79px}.cpp-panel .settings-box{height:75px;display:grid;grid-template-columns:50% auto;grid-template-rows:50% auto;justify-items:center;align-items:center;padding-top:10px}.cpp-panel .setting-label{cursor:unset;height:24px;position:relative;width:155px;user-select:none}.cpp-panel .setting-label-text{cursor:url(http://nerthus.margonem.pl/img/gui/cursor/5.png),url(http://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;left:25px;line-height:28px;position:relative}.cpp-panel .setting-checkbox{display:none}.cpp-panel .checkbox-outline{border:2px solid #6e644b;border-radius:2px;box-sizing:border-box;cursor:url(http://nerthus.margonem.pl/img/gui/cursor/5.png),url(http://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;display:inline-block;height:18px;left:0;margin:0;overflow:hidden;position:absolute;top:3px;width:18px;z-index:2}.checkmark{display:none;height:22px;left:-4px;pointer-events:none;position:relative;top:-2px;transform:rotate(45deg);width:22px}.checkmark-stem{background-color:#f1dfa8;height:13px;left:10px;position:absolute;top:2px;width:2px}.checkmark-kick{background-color:#f1dfa8;height:2px;left:5px;position:absolute;top:13px;width:6px}.cpp-panel .setting-checkbox:checked+.checkbox-outline{background-color:#6e644b}.cpp-panel .setting-checkbox:checked+.checkbox-outline .checkmark{display:inline-block}.cpp-panel .save-button{margin-right:30px}.cpp-panel .cancel-button{margin-left:30px}.cpp-panel .cancel-button:not(:hover){background-image:linear-gradient(to top, #310b0b, #831f1f)}.cpp-panel .cancel-button:not(:hover)::before{box-shadow:inset 0 0 1px 1px #da6161a6}.cpp-panel .hidden{display:none}.cpp-panel .button{background-image:linear-gradient(to top, #12210d, #396b29);border:1px solid #0c0d0d;border-radius:4px;box-shadow:inset 0 0 1px 1px #cecece, inset 0 0 0 3px #0c0d0d;box-sizing:border-box;color:#E6D6BF;cursor:url(http://nerthus.margonem.pl/img/gui/cursor/5.png),url(http://nerthus.margonem.pl/img/gui/cursor/5.cur),pointer;display:inline-block;height:42px;line-height:34px;position:relative;width:42px}.cpp-panel.button.blue{background-image:linear-gradient(to top, #081522, #1d4873)}.cpp-panel .button.blue:not(:hover)::before{box-shadow:inset 0 0 1px 1px #5594d4a6}.cpp-panel .button:before{backface-visibility:hidden;border-radius:4px;bottom:3px;box-shadow:inset 0 0 1px 1px #7ec568a6;content:'';left:3px;position:absolute;right:3px;top:3px;transform:translateZ(0)}.cpp-panel .button:after{border-radius:3px;bottom:0;box-shadow:0 1px 0 1px #0c0d0d;content:'';left:0;position:absolute;right:0;top:0}.cpp-panel .button:hover:before{box-shadow:inset 0 0 1px 1px #909090a6}.cpp-panel .button:hover{background-image:linear-gradient(to top, #101010, #434343)}.cpp-panel .bottom-box{display:flex;height:50px;justify-content:center}#cpp-automute-panel .bottom-box{justify-content:space-evenly}#cpp-automute-panel .text-button{justify-content:space-evenly}.cpp-panel .text-button{border-radius:6px;height:28px;line-height:24px;margin-top:10px;text-align:center;width:90px}.cpp-panel .text-button::before,.cpp-panel .text-button::after{content:unset}.cpp-panel .donate-button{background-image:linear-gradient(to top, #58310b, #daa520);bottom:6px;box-shadow:inset 0 0 1px 1px #cecece, inset 0 0 0 3px #0c0d0d;height:35px;padding:2px 0 0 0;position:absolute;right:5px;width:35px;font-size:25px;color:black}.cpp-panel .donate-button span{top:-2px;position:relative}.cpp-panel .donate-button:hover{color:pink}.cpp-panel .donate-button::before{content:'';position:absolute;left:3px;top:3px;bottom:3px;right:3px;box-shadow:inset 0 0 1px 1px rgba(237,177,117,0.65);border-radius:4px;transform:translateZ(0);backface-visibility:hidden}#cpp-test-button{position:absolute;left:20px;bottom:20px;width:77px}#cpp-automute-panel .top-box{text-align:center}#cpp-automute-panel .donate-button{right:0;bottom:3px}\n"),_(),M.addEventListener("input",le,!1),(e=M).addEventListener("focusout",ce,!1),e.addEventListener("focusin",le,!1),ce(),function(){{J.toHide=["sys_info"],J.toHide2=["priv-in-general","group-in-general","clan-in-general","system-in-general"],J.toNotHide=["me","nar","nar2","nar3","dial1","dial2","dial3","dial666"];const e=document.getElementsByClassName("lagmeter")[0];e.addEventListener("click",X),e.style.cursor="cell"}}(),de=Engine.chat.sendMessage.bind(Engine.chat),function(){const e=document.querySelector(".chat-tpl .messages-wrapper .scroll-pane");new MutationObserver(he).observe(e,{attributes:!1,childList:!0,subtree:!1})}(),se((function(e,t,n,i){const a=`<label class=setting-label><span class=setting-label-text tip=Wysyłaj wiadomości dłuższe niż 200 znaków dzięki wykorzystaniu najnowszych nowinek technologi.>MultiMsg</span> <input class=setting-checkbox id=cpp-setting-multiMsg name=multiMsg type=checkbox ${o.multiMsg?" checked":""}> <span class=checkbox-outline><span class=checkmark><div class=checkmark-stem></div><div class=checkmark-kick></div></span></span></label>`;g.push(a),h.multiMsg=i}(0,0,0,E),f=Engine.chat.sendMessage.bind(Engine.chat),Engine.chat.sendMessage=j.bind(Engine.chat),document.querySelector(".chat-tpl .send-btn").addEventListener("contextmenu",v),Engine.chat.sendMessage)),document.getElementsByClassName("lag")[0].addEventListener("contextmenu",b)}if(Engine&&Engine.allInit)ye();else{let e,t=!1;Object.defineProperty(Engine,"allInit",{set(n){e=n,!0!==n||t||(ye(),t=!0)},get:()=>e})}}(0,{},e)}();