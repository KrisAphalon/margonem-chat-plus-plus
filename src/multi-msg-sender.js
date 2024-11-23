import { sendMessage } from "./chat.js";
import { common, handleNoAnswer } from "./main.js";
import { sendArrayChanged } from "./restore-message.js";
import { settings } from "./settings.js";

const NOT_ONLY_DOTS = /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;

function parseMessageToChatForm(message) {
  message = message.trim();

  let split = message.split(" ");

  let retry = false;
  let surroundCharacter = "";
  if (message[0] === "/" || message[0] === "*") {
    let command = message.split(" ", 1)[0];
    switch (command) {
      case "/lm":
        if (INTERFACE === "NI") {
          command = Engine.hero.nick;
        } else {
          command = hero.nick;
        }
        break;
      case "/l":
      case "/o":
      case "/h":
      case "/g":
      case "/k":
        retry = true;
      // falls through
      case "/ln":
      case "*me":
      case "*nar":
      case "*nar0":
      case "*nar1":
      case "*nar2":
      case "*nar3":
      case "*nar6":
      case "*sys":
        command = "";
        break;
      case "*dial":
      case "*dial0":
      case "*dial1":
      case "*dial2":
      case "*dial3":
      case "*dial666": {
        const npcNameSplit = message.split(",");
        npcNameSplit.shift();
        split = npcNameSplit.join(",").split(" ");
        command = "";
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
  const message = node.children[1].innerText.trim();

  if (typeof common.sendArr[0] === "undefined") return;

  if (message === parseMessageToChatForm(common.sendArr[0])) {
    clearTimeout(common.sendTimeout);
    common.sendArr.shift();
    sendArrayChanged();
    if (common.sendArr.length === 0) return;

    setTimeout(function () {
      if (common.sendArr[0]?.match(NOT_ONLY_DOTS).length > 0)
        sendMessage(common.sendArr[0]);
    }, settings.sendMessageTimeout);

    common.sendTimeout = setTimeout(
      handleNoAnswer,
      settings.sendMessageTimeout * 3,
    );
  }
}

function mutationCallback(mutationsList) {
  for (const mutation of mutationsList) {
    for (const addedNode of mutation.addedNodes) {
      handleAddedNode(addedNode);
    }
  }
}

function createMutationObserver() {
  const chattxt =
    INTERFACE === "NI"
      ? document.querySelector(
          ".new-chat-window .chat-message-wrapper .scroll-pane",
        )
      : document.getElementById("chattxt");

  const mutation_config = {
    attributes: false,
    childList: true,
    subtree: true,
  };
  const observer = new MutationObserver(mutationCallback);
  observer.observe(chattxt, mutation_config);
}

export function initMultiMsgSender() {
  createMutationObserver();
}
