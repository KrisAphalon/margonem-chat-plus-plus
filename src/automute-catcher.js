import { default as badWordsWithSpace } from "../res/automute/bad-words-with-space.json";
import { default as badWords } from "../res/automute/bad-words.json";
import { default as falsePositivesWithPolishLetters } from "../res/automute/false-positives-with-polish-letters.json";
import { default as falsePositives } from "../res/automute/false-positives.json";
import { CHANNELS, getSiMessageFormat } from "./chat.js";
import { setDraggable } from "./dragging.js";
import { chatChecks } from "./input-textarea.js";
import { sendMessage, setNITipsInsideOf } from "./utility-functions.js";

// removes duplicate letters from message
// "teeeeeests" changes to "tests"
function removeDuplicates(msg) {
  if (msg.length === 0) return "";

  let copy = msg[0];
  let lastLetter = msg[0];
  for (let i = 1; i < msg.length; i++) {
    if (msg[i] !== lastLetter) copy = copy + msg[i];
    lastLetter = msg[i];
  }
  return copy;
}

function testMessage(originalMsg, caughtMsg) {
  let copy = originalMsg;
  if (copy[0] === "@") copy = copy.slice(copy.indexOf(" "));

  const arr = caughtMsg.match(
    /<span style='color: red; font-weight: bold'>(.*)<\/span>/,
  );
  if (!arr?.[1])
    return message(
      "Coś poszło nie tak przy testowaniu. Wyślij wiadomość którą próbowałeś przetestować do Kris Aphalon na Discordzie",
    );

  const match = arr[1];
  const start = Math.max(copy.indexOf(match) - 20, 0);
  const end = Math.min(copy.indexOf(match) + match.length + 20, copy.length);
  let subMsg = copy.substring(start, end);

  if (CHANNELS[subMsg.substring(0, 3)]) {
    subMsg = subMsg.substring(3);
  }

  let heroNick = "";
  if (INTERFACE === "NI") {
    heroNick = Engine.hero.d.nick;
  } else {
    heroNick = hero.nick;
  }
  sendMessage("@" + heroNick.split(" ").join("_") + " " + subMsg);
}

const TIP_SEND_NI = `
Wysyła podejrzaną część wiadomości na chat grupowy.
Jeżeli wiadomość zostanie zagwiazdkowana, to nie należy jej wysyłać.
Testuje tylko pierwsze zaczerwienione słowo w wiadomości.
`;

const TIP_SEND_SI = `
Wysyła podejrzaną część wiadomości do samego siebie.
Jeżeli wiadomość zostanie zagwiazdkowana <b>lub nie pojawi się dwa razy</b>, prawdopodobnie nie należy jej wysyłać.
Testuje tylko pierwsze zaczerwienione słowo w wiadomości.
`;

const PANEL_HTML = `
<div class="header-label-positioner">
    <div class="header-label">
        <div class="left-decor"></div>
        <div class="right-decor"></div>
        <span class="panel-name">Automute Catcher</span>
    </div>
</div>
<div class="close-decor">
    <button class="close-button" tip="Zamknij"/>
</div>
<div class="background">
    <div class="top-box">
    </div>
    <div class="bottom-box">
        <button class="button text-button bottom-test">Przetestuj</button>
        <button class="button text-button bottom-send">Wyślij</button>
        <button class="button text-button bottom-close">Nie wysyłaj</button>
        <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a>
    </div>
</div>
`;

const AHOJ_ALERT = `
Twoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br>
<span style="color:red">Zawiera ona zwrot "ahoj", który poprzedzony jest przez
dowolną literę "a". Tak, w ten sposób automute sprawdza, czy jest to "przekleństwo".
Jeżeli chcesz wysłać tak czy siak, droga wolna.
Wiedz jednak, że akurat w tym przypadku nie ma pomyłek.</span>
`;

const NORMAL_ALERT = `
Twoja wiadomość prawdopodobnie byłaby wyłapana przez automute, ale masz szczęście ;) <br>
Poniżej wiadomość, jaką widzi automute:<hr><span class="cpp-mute-text" style="word-wrap: break-word; text-align: left;">

</span><hr>Czy mimo tego chcesz ją wysłać? Jeżeli wiadomość przejdzie bez
gwiazdkowania wyślij wyjątek do Kris Aphalon na Discordzie bądź na skrzynkę pocztową
`;

function alertUser(originalMsg, caughtMsg, ahoj) {
  if (document.getElementById("cpp-automute-panel")) return;

  const alertMsg = ahoj ? AHOJ_ALERT : NORMAL_ALERT;

  const panel = document.createElement("div");
  setDraggable(panel);
  panel.id = "cpp-automute-panel";
  panel.className = "cpp-panel";
  panel.innerHTML = PANEL_HTML;

  const whereToSend = INTERFACE === "NI" ? TIP_SEND_NI : TIP_SEND_SI;
  panel.querySelector(".bottom-test").setAttribute("tip", whereToSend);
  panel.querySelector(".top-box").innerHTML = alertMsg;
  if (!ahoj) panel.querySelector(".cpp-mute-text").innerHTML = caughtMsg;
  const deletePanel = function () {
    document.body.removeChild(panel);
    document.getElementById("inpchat").focus();
  };
  panel
    .querySelector("#cpp-automute-panel .close-button")
    .addEventListener("click", deletePanel);
  panel.querySelector(".bottom-close").addEventListener("click", deletePanel);
  panel.querySelector(".bottom-send").addEventListener("click", deletePanel);
  panel.querySelector(".bottom-send").addEventListener("click", () => {
    sendMessage(originalMsg);
    if (INTERFACE === "NI") {
      document.querySelector(".magic-input").innerText = "";
      document.querySelector(".magic-input-placeholder").style.display =
        "block";
    } else {
      document.querySelector("#inpchat").value = "";
    }
  });
  panel
    .querySelector(".bottom-test")
    .addEventListener("click", () => testMessage(originalMsg, caughtMsg));

  document.body.appendChild(panel);
  if (INTERFACE === "NI") setNITipsInsideOf(panel);
}

/**
 * @param {string} msg
 * @param {array} badWords
 * @returns {boolean|string} false or prepared HTML text with red matches
 */
function checkMessageForBadWords(msg, badWords) {
  let innocent = true;
  for (const e of badWords) {
    if (!msg.includes(e)) continue;

    console.log("Wykryto zwrot który jest niemiły: " + e);
    msg = msg
      .split(e)
      .join("<span style='color: red; font-weight: bold'>" + e + "</span>");
    innocent = false;
  }
  if (innocent) return false;
  return msg;
}

function normalizeString(str) {
  return str
    .replace(/[^a-zńąćśźżóęł ]/g, "")
    .replace(/ą/g, "a")
    .replace(/ę/g, "e")
    .replace(/ł/g, "l")
    .replace(/[żź]/g, "z")
    .replace(/ó/g, "o")
    .replace(/ń/g, "n")
    .replace(/ć/g, "c")
    .replace(/ś/g, "s");
}

function removePhrases(str, phrasesToRemove) {
  for (const e of phrasesToRemove) str = str.split(e).join("X");
  return str;
}

function messageContainsBadWords(msg) {
  let copy = msg.toLowerCase();

  //don't parse nick
  if (copy[0] === "@") {
    copy = copy.slice(copy.indexOf(" "));
  }

  copy = removePhrases(copy, falsePositivesWithPolishLetters);

  //delete characters that aren't used to create words
  copy = normalizeString(copy);

  //check weird 'ahoj'
  const ahojRegex = /a(?=.*ahoj)(?!hoj.*ahoj)/g;
  if (ahojRegex.test(copy)) {
    alertUser(getSiMessageFormat(msg), "", true);
    return true;
  }

  //check for known phrases that get flagged as swear words
  let alertMsg = checkMessageForBadWords(copy, badWordsWithSpace);
  if (alertMsg) {
    alertUser(getSiMessageFormat(msg), alertMsg);
    return true;
  }

  copy = removePhrases(copy, falsePositives);

  copy = copy.replace(/ /g, "");
  copy = removeDuplicates(copy);

  alertMsg = checkMessageForBadWords(copy, badWords);
  if (alertMsg) {
    alertUser(getSiMessageFormat(msg), alertMsg);
    return true;
  }

  return false;
}

function chatCheck() {
  let chatInputValue;
  if (INTERFACE === "NI") {
    chatInputValue = document.querySelector(".magic-input").innerText;
  } else {
    chatInputValue = document.querySelector("#inpchat").value;
  }
  return messageContainsBadWords(chatInputValue);
}

export function initAutomuteCatcher() {
  chatChecks.push(chatCheck);
}
