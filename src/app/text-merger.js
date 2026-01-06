import { common, handleNoAnswer } from "../main.js";
import { addSettingToPanel } from "./panel.js";
import { saveSettings, settings } from "./settings.js";
import { sanitizeText } from "./utility-functions.js";

const messages = {};
const ALLOWED_COMMANDS = new Set([
  "nar",
  "nar2",
  "nar3",
  "nar6",
  "sys_comm",
  "me",
]);
const NOT_ONLY_DOTS = /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;

function destructureMessage(ch) {
  return {
    tab: ch.k,
    nick: ch.n === "" ? ch.nick : ch.n, // Handle Nerthus Addon
    text: ch.t,
    time: ch.ts,
    command: ch.s,
  };
}

function parseSingleMsgOnChat(elm, ch) {
  const { tab, nick, text, time, command } = destructureMessage(ch);

  if (elm.innerHTML !== messages[nick][2]) return false;
  const html_regexp = /(.*)<\/span>$/g;
  const html_match = html_regexp.exec(messages[nick][2]);
  if (!html_match) return false;

  const new_text = html_match[1] + " " + text + "</span>";
  elm.innerHTML = new_text;
  messages[nick] = [tab, command, new_text, time];
  log(sanitizeText(`[${tab}] ${nick} -> ${text}`));

  window.clearTimeout(common.sendTimeout);
  if (typeof common.sendArr[0] !== "undefined") common.sendArr.shift();
  if (common.sendArr.length > 0)
    setTimeout(function () {
      if (common.sendArr[0]?.match(NOT_ONLY_DOTS).length > 0)
        window.chatSendMsg(common.sendArr[0]);
    }, settings.sendMessageTimeout);
  if (common.sendArr.length > 1)
    common.sendTimeout = setTimeout(
      handleNoAnswer,
      settings.sendMessageTimeout * 3,
    );

  return true;
}

function isMessageParseable(ch) {
  const { tab, nick, time, command } = destructureMessage(ch);

  if (typeof messages[nick] === "undefined") return false;
  if (messages[nick][0] !== tab || messages[nick][1] !== command) return false;
  if (time - messages[nick][3] > 5) return false;
  return true;
}

function parseMessage(ch) {
  if (!isMessageParseable(ch)) return false;

  const chattxt = document.getElementById("chattxt");
  // count down so it should be faster
  for (let i = chattxt.children.length - 1; i >= 0; i--) {
    if (parseSingleMsgOnChat(chattxt.children[i], ch)) return true;
  }
}

function parser(ch) {
  const { tab, nick, text, time, command } = destructureMessage(ch);

  if (!settings.mergeMessages) return false;
  if (!ALLOWED_COMMANDS.has(command)) return false;

  const wasParsed = parseMessage(ch);
  if (wasParsed) return true;

  const html_text = `<span></span><span class="chatmsg">${text}</span>`;
  messages[nick] = [tab, command, html_text, time];
  return false;
  /*
    // when user uses /me command, response doesn't contain nick of user who wrote command
    // you can't distinguish between user "Kris Aphalon" and user "Kris" who wrote "Aphalon" as 1st word
    // therefore I won't be trying to fix this
    if (ch.s === "me")
    {
        const nick_regexp = /^((?:.)+?) {2}/g
        const nick_match = nick_regexp.exec(text)
        const new_nick = nick_match[1]
        const html_text = "<span></span><span class=\"chatmsg\">" + text + "</span>"
        console.error(html_text)
        messages[new_nick] = [tab, "me", html_text, time]
        console.warn(new_nick)
        return false
    }
    else
    */
}

function toggleMergeMessages() {
  settings.mergeMessages = !settings.mergeMessages;
  saveSettings();
  return false;
}

export function initTextMerger() {
  if (INTERFACE === "SI") {
    g.chat.parsers.push(parser);

    addSettingToPanel(
      "mergeMessages",
      "Scalaj wiadomości",
      "Scala wizualnie wiadomości typu *me czy *nar jeżeli są one wysyłane z bardzo krótkim opóźnieniem.",
      toggleMergeMessages,
    );
  }
}
