import { common, handleNoAnswer } from "./main.js";
import { settings } from "./settings.js";

const NOT_ONLY_DOTS = /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;

let oldSendMsg;

function parseMessageToChatForm(message) {
  message = message.trim();
  // replace characters
  // message = message.replace(/[«»]/g, '')

  let split = message.split(" ");

  let retry = false;
  let surroundCharacter = "";
  if (message[0] === "/" || message[0] === "*") {
    let command = message.split(" ", 1)[0];
    switch (command) {
      case "/me":
        if (INTERFACE === "NI") {
          command = Engine.hero.nick;
        } else {
          command = hero.nick;
        }
        break;
      case "/g":
      case "/k":
        retry = true;
      // falls through
      case "/nar":
      case "*me":
      case "*nar":
      case "*nar1":
      case "*nar2":
      case "*nar3":
      case "*sys":
        command = "";
        break;
      case "*dial":
      case "*dial1":
      case "*dial2":
      case "*dial3":
      case "*dial666": {
        const npcNameSplit = message.split(",");
        const npcNameSplitSpace = npcNameSplit[0].split(" ");
        npcNameSplit.shift();
        split = npcNameSplit.join(",").split(" ");
        split.unshift("");
        npcNameSplitSpace.shift();
        const npcName = npcNameSplitSpace.join(" ");
        command = "«" + npcName + "»";
        break;
      }
      case "*lang": {
        const languageSplit = message.split(",");
        languageSplit.shift();
        split = languageSplit.join(",").split(" ");
        command = "";
        surroundCharacter = "*";
        break;
      }
    }
    split.shift();
    if (command !== "") split.unshift(command);
  } else if (message[0] === "@") {
    retry = true;
    split.shift();
  }
  message = "";
  //.join would sometimes produce multiple spaces in a row when messages can have only 1
  const len = split.length;
  for (let i = 0; i < len; i++) if (split[i] !== "") message += split[i] + " ";
  message = message.trim();

  if (surroundCharacter)
    message = `${surroundCharacter}${message}${surroundCharacter}`;

  if (retry) return parseMessageToChatForm(message);
  else return message;
}

function handleAddedNode(node) {
  const message =
    INTERFACE === "NI"
      ? node.children[2].innerText.trim()
      : node.children[1].innerText.trim();

  if (typeof common.sendArr[0] === "undefined") return;

  if (message === parseMessageToChatForm(common.sendArr[0])) {
    clearTimeout(common.sendTimeout);
    common.sendArr.shift();
    if (common.sendArr.length === 0) return;

    setTimeout(function () {
      if (common.sendArr[0].match(NOT_ONLY_DOTS).length > 0)
        oldSendMsg(common.sendArr[0]);
    }, settings.messageTimeout);

    common.sendTimeout = setTimeout(
      handleNoAnswer,
      settings.messageTimeout * 3,
    );
  }
}

function mutationCallback(mutationsList) {
  for (const mutation of mutationsList) {
    for (let i = 0; i < mutation.addedNodes.length; i++) {
      handleAddedNode(mutation.addedNodes[i]);
    }
  }
}

function createMutationObserver() {
  const chattxt =
    INTERFACE === "NI"
      ? document.querySelector(".chat-tpl .messages-wrapper .scroll-pane")
      : document.getElementById("chattxt");

  const mutation_config = {
    attributes: false,
    childList: true,
    subtree: false,
  };
  const observer = new MutationObserver(mutationCallback);
  observer.observe(chattxt, mutation_config);
}

export function initMultiMsgSender() {
  if (INTERFACE === "NI") {
    oldSendMsg = Engine.chat.sendMessage.bind(Engine.chat);
  } else {
    oldSendMsg = window.chatSendMsg;
  }
  createMutationObserver();
}
