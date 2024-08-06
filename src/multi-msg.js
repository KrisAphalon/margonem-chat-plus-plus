import {
  CHANNEL,
  getPrunedMessage,
  getSiMessageFormat,
  sendMessage,
} from "./chat.js";
import { chatChecks } from "./input-textarea.js";
import { common, handleNoAnswer } from "./main.js";
import { addSettingToPanel } from "./panel.js";
import { saveSettings, settings } from "./settings.js";
import { regexIndexOf } from "./utility-functions.js";

const polishLetters = /[ąćęłńóśźż@]/gi; // @ is strange, can't really test it
function deconstructSendArrPart(part) {
  if (!["/", "@", "*"].includes(part[0])) return part;

  let split = part.split(" ");

  if (part[0] === "*" && split[0].includes("dial")) {
    split = part.split(",");
  }
  split.shift();
  if (part[0] === "@") return deconstructSendArrPart(split.join(" "));

  return split.join(" ");
}

/**
 * @param msg {string} Message in SI format
 */
function calcMargoLength(msg) {
  const prunedMsg = getPrunedMessage(msg);
  const match = prunedMsg.match(polishLetters);
  if (match) {
    return prunedMsg.length + match.length;
  }
  return prunedMsg.length;
}

function restoreMsg(e) {
  e.preventDefault();
  const inpchat = document.getElementById("inpchat");
  let newChatValue = "";
  const len = common.sendArr.length;
  if (len === 0) return false;
  else if (len >= 1) {
    window.message("Przywracanie wiadomości...");
    newChatValue = common.sendArr[0].trim();
  }
  if (len > 1)
    for (let i = 1; i < len; i++) {
      const part = deconstructSendArrPart(common.sendArr[i]).trim();
      newChatValue += " " + part;
    }
  console.log(newChatValue);
  inpchat.value = newChatValue;
  return false;
}

function calculateAddOnStartAsterix(arr, commandIndex) {
  if (arr[commandIndex].startsWith("/lm")) {
    arr[commandIndex] = "*me";
  }
  if (arr[commandIndex].startsWith("/ln")) {
    arr[commandIndex] = "*nar";
  }
  if (
    arr[commandIndex].startsWith("*dial") ||
    arr[commandIndex].startsWith("*lang")
  ) {
    const arrStartingAtCommand = arr.slice(commandIndex);
    return arrStartingAtCommand.join(" ").split(",")[0] + ", ";
  }
  return arr[commandIndex] + " ";
}

function calculateAddOnStart(msg) {
  const arr = msg.split(" ");
  if (arr.length <= 1) {
    return "";
  }

  let addOnStart = "";
  if (msg.startsWith("@") || Object.keys(CHANNEL).includes(arr[0] + " ")) {
    addOnStart = arr[0] + " ";
  }
  if (msg.startsWith("*") || msg.startsWith("/lm") || msg.startsWith("/ln")) {
    addOnStart = calculateAddOnStartAsterix(arr, 0);
  }

  if (addOnStart && !addOnStart.startsWith("*") && arr[1].startsWith("*")) {
    addOnStart += calculateAddOnStartAsterix(arr, 1);
  }

  return addOnStart;
}

function getSplitCandidate(str, idx, maxLength) {
  const dotPos = regexIndexOf(str, /[!?.] /, Math.floor(maxLength / 2));
  if (dotPos >= 0) return dotPos + 2;

  const spacePos = str.lastIndexOf(" ");
  if (spacePos >= 0) return spacePos + 1;

  return idx;
}

function getIdx(msg, maxLength) {
  let idx = 0;
  for (let i = 0; i < maxLength; i++) {
    idx++;
    if (idx >= msg.length) break;
    if (msg[idx].match(polishLetters)) i++;
  }
  return idx;
}

function splitAndFormatLines(msg, prefix, maxLength) {
  maxLength -= calcMargoLength(prefix);

  const ret = [];
  while (msg.length > 0) {
    const idx = getIdx(msg, maxLength);
    const substr = msg.substring(0, idx);
    const split =
      calcMargoLength(msg) > maxLength
        ? getSplitCandidate(substr, idx, maxLength)
        : msg.length;
    ret.push(prefix + substr.substring(0, split).trim());
    msg = msg.slice(split);
  }

  return ret;
}

function divideMessageToParts(msg, prefix, maxLength) {
  if (msg === "") return;

  // with *dial users can write the NPC message with or without the space
  // this fixes "eating" the first letter of NPC if they right after `,`
  const prefixLength = prefix.includes("*dial")
    ? prefix.length - 1
    : prefix.length;

  msg = msg.substring(prefixLength).trim();
  const arr = splitAndFormatLines(msg, prefix, maxLength);
  console.log(arr);
  for (let msg of arr) {
    common.sendArr.push(msg);
  }
}

function sendMultiMsg(msg) {
  const addOnStart = calculateAddOnStart(msg);
  // Delete old sendArr if there was some problem (e.g., lost group chat)
  common.sendArr.splice(0);

  const maxLen = 197;
  if (calcMargoLength(msg) <= maxLen) {
    return false;
  }
  divideMessageToParts(msg, addOnStart, maxLen);

  // replace the *me prefix back to /lm for the first part
  // if a message started with /lm
  if (msg.startsWith("/lm")) {
    common.sendArr[0] = common.sendArr[0].replace(/^.{3}/, "/lm");
  }
  if (msg.startsWith("/ln")) {
    common.sendArr[0] = common.sendArr[0].replace(/^.{3}/, "/nar");
  }

  if (common.sendArr.length > 0) {
    sendMessage(common.sendArr[0]);
    common.sendTimeout = setTimeout(
      handleNoAnswer,
      settings.sendMessageTimeout * 3,
    );
  }
  return true;
}

/**
 *
 * @param msg {string} Message in SI format
 */
function chatSendMsg(msg) {
  // replace hard spaces (alt + space) with normal one
  // eslint-disable-next-line no-irregular-whitespace
  msg = msg.replace(/ /g, " ");
  msg = msg.replace(/[«»]/g, "");
  msg = msg.trim();

  if (!settings.multiMsg || msg === "") {
    return false;
  }
  return sendMultiMsg(msg);
}

function chatCheck() {
  let chatInputValue;
  if (INTERFACE === "NI") {
    chatInputValue = document.querySelector(".magic-input").innerText;
  } else {
    chatInputValue = document.querySelector("#inpchat").value;
  }
  return chatSendMsg(getSiMessageFormat(chatInputValue));
}

function toggleMultiMsg() {
  settings.multiMsg = !settings.multiMsg;
  saveSettings();
  return false;
}

export function initMultiMsg() {
  addSettingToPanel(
    "multiMsg",
    "MultiMsg",
    "Wysyłaj wiadomości dłuższe niż 200 znaków dzięki wykorzystaniu najnowszych nowinek technologi.",
    toggleMultiMsg,
  );

  chatChecks.push(chatCheck);
}
