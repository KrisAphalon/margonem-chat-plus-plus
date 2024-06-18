// Recolors textarea to match it's color with color of command it starts with
import { addCustomStyle } from "./css-manager.js";
// If textarea doesn't start with any valid command, then it resets color to default
import { common } from "./main.js";
import { settings } from "./settings.js";

export const chatChecks = [];
export const textarea = document.createElement("textarea");
let background;
const chatColors = {
  priv: "#fc0",
  clant: "#ffa500",
  team: "#b554ff",
  sys_comm: "#f33",
};
const classList = ["priv", "sys_comm", "clant", "team"];
const classListNI = [
  "priv-in-general",
  "chat-message sys_red",
  "clan-message",
  "group-message",
];

function addCommandsColorStyles() {
  addCustomStyle(
    "inputClasses",
    `
#inpchat.priv { color: ${chatColors.priv}; }
#inpchat.clant { color: ${chatColors.clant}; }
#inpchat.team { color: ${chatColors.team}; }
#inpchat.sys_comm { color: ${chatColors.sys_comm}; }
        `,
  );
}

/**
 * Changes chatColors object to have accurate colors as seen in chat
 */
function updateCommandsColors() {
  const chat = document.createElement("div");
  if (INTERFACE === "NI") {
    chat.className = "chat-message";
  } else {
    chat.id = "chattxt";
  }
  chat.style.display = "none";
  const msg = document.createElement("div");
  chat.appendChild(msg);
  const chatmsg = document.createElement("span");
  chatmsg.className = "chatmsg";
  msg.appendChild(chatmsg);
  document.body.appendChild(chat);

  for (let i = 0; i < classList.length; i++) {
    msg.className = INTERFACE === "NI" ? classListNI[i] : classList[i];
    chatColors[classList[i]] = window.getComputedStyle(chatmsg).color;
  }
  document.body.removeChild(chat);

  addCommandsColorStyles();
}

/**
 * Takes part of image that is used for chat and creates image for background.
 * With this function textarea's background should look nice on all user themes.
 */
function applyCustomBackground(backgroundElm) {
  const chat = document.createElement("div");
  chat.id = "chat";
  chat.className = "left";
  chat.style.display = "none";
  document.body.appendChild(chat);
  const newImg = window.getComputedStyle(chat).backgroundImage;
  document.body.removeChild(chat);
  if (backgroundElm.style.backgroundImage !== newImg)
    backgroundElm.style.backgroundImage = newImg;
}

/**
 * Saves last input msg
 */
function saveInputMsg() {
  localStorage.setItem("lastInputtedMsg", textarea.value);
}

function checkMaxLength(textarea) {
  //cut text when it was pasted
  if (textarea.value.length > 199)
    textarea.value = textarea.value.substr(0, 199);

  //letters and symbols that count as two when sending message to server
  const polishLetters = /[ąćęłńóśźż*@,. _]/gi;

  let polishLettersCount = 0;
  //calculate length every time, because we can change it inside for()
  for (const element of textarea.value)
    if (element.match(polishLetters)) {
      polishLettersCount++;
      textarea.value = textarea.value.substr(0, 199 - polishLettersCount);
    }
  textarea.maxLength = 199 - polishLettersCount;
}

function checkInputMsg() {
  const input = document.getElementById("inpchat");
  let trueInputElement = INTERFACE === "NI" ? input : textarea;

  //fixes bug when clicking enter to start chatting
  trueInputElement.value = trueInputElement.value.replace(/\r?\n/gi, "");

  //check maxLength
  if (settings.multiMsg) trueInputElement.removeAttribute("maxLength");
  else checkMaxLength(textarea);

  //check colors
  recolorTextarea();

  if (!settings.multiMsg && trueInputElement !== input)
    input.value = textarea.value;

  return trueInputElement.value;
}

const CHAT_COMMAND_CLASSES = {
  "/g": "team",
  "/k": "clant",
  "*me": "me",
  "/me": "me",
  "*nar": "nar",
  "*nar1": "nar",
  "/nar": "nar",
  "*nar2": "nar2",
  "*nar3": "nar3",
  "*nar6": "nar6",
  "*dial": "dial1",
  "*dial1": "dial1",
  "*dial2": "dial2",
  "*dial3": "dial3",
  "*dial666": "dial666",
  "*lang": "lang",
};

const SYS_COMMANDS = [
  "*sys",
  "*map",
  "*light",
  "*addGraf",
  "*delGraf",
  "*hide",
  "*weather",
];

/**
 * Recolors textarea's text color according to message inside of it
 */
function recolorTextarea() {
  const value = textarea.value.trim();
  const command = value.split(" ")[0];

  if (textarea.classList.contains("unfolded")) textarea.className = "unfolded";
  else textarea.className = "";
  textarea.style.color = "";
  if (command[0] === "@") {
    textarea.style.color = chatColors.priv;
    return;
  }
  if (SYS_COMMANDS.includes(command)) {
    textarea.style.color = chatColors.sys_comm;
    return;
  }
  if (CHAT_COMMAND_CLASSES[command])
    textarea.classList.add(CHAT_COMMAND_CLASSES[command]);
}

//Change value of textarea when something changes value of input
function addInputToTextareaConvertor() {
  const inpchat = document.querySelector(".chat-tpl > .input-wrapper > input");
  const inpchat_value = inpchat.value;
  Object.defineProperty(inpchat, "value", {
    set(val) {
      this.__value = val;
      if (textarea.value !== inpchat.value && !common.blockTextareaChanging) {
        textarea.value = inpchat.value;
        recolorTextarea();
      }
    },
    get() {
      if (typeof this.__value === "undefined") return inpchat_value;
      return this.__value;
    },
  });
}

function loadAndApplyUserTheme() {
  const check = function () {
    updateCommandsColors();
    recolorTextarea();
    applyCustomBackground(background);
  };
  // I haven't found a great way of knowing if user theme has loaded.
  // Right now it just checks stuff that it requires in one and two seconds after start
  setTimeout(check, 1_000);
  setTimeout(check, 2_000);

  // "Shair" theme is known for loading really long, so we add extra checks
  if (
    typeof window.shairModuleLoader !== "function" &&
    !document.getElementById("loading")
  ) {
    return;
  }

  const loading = document.getElementById("loading");
  if (
    window.getComputedStyle(loading, null).backgroundImage ===
    'url("https://i.imgur.com/1en4JTp.png")'
  ) {
    document.getElementById("textarea-background").style.left = "146px";
    document.getElementById("inpchat").style.left = "65px";
    setTimeout(check, 3_000);
    setTimeout(check, 5_000);
    setTimeout(check, 20_000);
  }
}

function replaceChatInput(textarea) {
  const bottomBar = document.getElementById("bottombar");
  document.getElementById("inpchat").remove();
  textarea.id = "inpchat";

  background = document.createElement("div");
  background.id = "textarea-background";
  bottomBar.appendChild(background);
  bottomBar.appendChild(textarea);

  // Disable jQuery "click" events since .init() adds them back,
  // and we would end up with 2 of the same events
  $("#bchat").off("click");
  g.chatController.getChatInputWrapper().init();

  // This listener makes sure that user's char doesn't walk when selecting text on unfolded textarea.
  textarea.addEventListener("mousedown", (e) => e.stopPropagation(), true);
}

function loadLastSavedMessage() {
  const savedMessage = localStorage.getItem("lastInputtedMsg");
  if (savedMessage) {
    textarea.value = savedMessage;
    if (INTERFACE === "SI") {
      document.getElementById("bottxt").style.display = "block";
      textarea.style.opacity = "0";
    }
  }
  recolorTextarea();
}

function handleChatSendAttempt(event) {
  console.log(chatChecks);
  for (const chatCheck of chatChecks) {
    const stop = chatCheck(event);
    if (stop) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      return;
    }
  }
}

export function initInputTextarea() {
  updateCommandsColors();
  let selector;
  if (INTERFACE === "NI") {
    selector = ".magic-input-wrapper > .magic-input";
  } else {
    selector = "#bottombar";
  }
  document.querySelector(selector).addEventListener(
    "keyup",
    (event) => {
      if (event.key === "Enter") {
        handleChatSendAttempt(event);
      }
    },
    true,
  );

  // Handle mobile "send message" button
  if (INTERFACE === "NI") {
    document
      .querySelector(".send-mobile-message-wrapper > .button")
      ?.addEventListener(
        "click",
        (event) => handleChatSendAttempt(event),
        true,
      );
  }

  if (INTERFACE === "SI") {
    if (!settings.multiMsg) {
      textarea.maxLength = 199;
    }
    replaceChatInput(textarea);

    textarea.addEventListener("input", checkInputMsg, false);
    textarea.addEventListener("input", saveInputMsg, false);
    loadAndApplyUserTheme();

    updateCommandsColors();
    //loadLastSavedMessage();
  }
}
