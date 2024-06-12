// Recolors textarea to match it's color with color of command it starts with
import { addCustomStyle } from "./css-manager.js";
// If textarea doesn't start with any valid command, then it resets color to default
import { common } from "./main.js";
import { settings } from "./settings.js";

export const chatChecks = [];
export let textarea;
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
  // For now it just checks stuff that it requires in one and two seconds after start
  setTimeout(check, 1000);
  setTimeout(check, 2000);

  // "Shair" theme is known for loading really long, so I added extra checks
  if (
    typeof window.shairModuleLoader !== "function" &&
    !document.getElementById("loading")
  )
    return;

  const loading = document.getElementById("loading");
  if (
    window.getComputedStyle(loading, null).backgroundImage ===
    'url("https://i.imgur.com/1en4JTp.png")'
  ) {
    document.getElementById("textarea-background").style.left = "146px";
    document.getElementById("inpchat").style.left = "65px";
    setTimeout(check, 3000);
    setTimeout(check, 5000);
    setTimeout(check, 20000);
  }
}

function replaceChatInput() {
  if (INTERFACE === "NI") {
    textarea.placeholder = "Naciśnij Enter, aby porozmawiać";

    const inputWrapper =
      document.getElementsByClassName("chat-tpl")[0].children[5];
    inputWrapper.style.zIndex = "200";
    const inpchat = inputWrapper.children[0];
    inpchat.style.opacity = "0";
    inpchat.style.pointerEvents = "none";

    textarea.addEventListener(
      "keypress",
      function (e) {
        if (e.key !== "Enter") return;

        //TODO validate if it was really sent
        textarea.blur();
        if (textarea.value !== "")
          //initSendButton
          Engine.chat.sendMessage(textarea.value);
      },
      true,
    );

    //move focus to our textarea
    inpchat.addEventListener("focusin", () => textarea.focus());

    const backgroundUp = document.createElement("div");
    backgroundUp.id = "textarea-background-up";
    inputWrapper.prepend(backgroundUp);

    background = document.createElement("div");
    background.id = "textarea-background";
    inputWrapper.prepend(background);

    inputWrapper.prepend(textarea);

    addInputToTextareaConvertor();
    checkInputMsg();
  } else {
    const bottombar = document.getElementById("bottombar");
    const inpchat = document.getElementById("inpchat");
    // inpchat.parentNode.removeChild(inpchat)

    background = document.createElement("div");
    background.id = "textarea-background";
    bottombar.appendChild(background);
    bottombar.appendChild(textarea);

    // This listener makes sure that unfolded textarea does not close immediately when clicked on.
    textarea.addEventListener("click", (e) => e.stopPropagation(), true);
    // This listener makes sure that user's char doesn't walk when selecting text on unfolded textarea.
    textarea.addEventListener("mousedown", (e) => e.stopPropagation(), true);
  }
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
      console.log("STOPPPP");
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
    selector = ".magic-input-wrapper";
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

  // textarea = document.createElement('textarea')
  // textarea.id = 'inpchat2'
  // if (!settings.multiMsg) textarea.maxLength = 199
  // replaceChatInput()
  //
  // // Fix for last available version of Firefox on Windows XP.
  // // This fix is one of a kind, this script is not designed to work on older web browsers
  // // It's only implemented because it's quick, easy and fixes massive problem.
  // // (scrollbar that makes writing impossible)
  // if (navigator.userAgent.endsWith('Firefox/52.0'))
  //     textarea.style.overflowX = 'hidden'
  //
  //
  // textarea.addEventListener('input', checkInputMsg, false)
  // textarea.addEventListener('input', saveInputMsg, false)
  //
  // updateCommandsColors()
  // loadLastSavedMessage()
  //
  // if (INTERFACE === 'SI')
  // {
  //     textarea.addEventListener('focusout', function ()
  //     {
  //         const inpchat = document.getElementById('inpchat')
  //         if (inpchat.value === '')
  //         {
  //             document.getElementById('bottxt').style.display = 'block'
  //             inpchat.style.opacity = '0'
  //         }
  //     }, false)
  //     textarea.addEventListener('focusin', function ()
  //     {
  //         document.getElementById('bottxt').style.display = 'none'
  //         document.getElementById('inpchat').style.opacity = '1'
  //     }, false)
  //
  //     loadAndApplyUserTheme()
  // }
}
