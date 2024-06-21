import { CHANNELS, CHAT_COMMAND_CLASSES } from "./chat-enums.js";
import { CHANNEL_NAME, getSiMessageFormat } from "./chat.js";
import { addCustomStyle } from "./css-manager.js";
import { settings } from "./settings.js";

export const chatChecks = [];
let background;

function addCommandsColorStyles(chatColors) {
  // TODO use CHANNELS enum
  addCustomStyle(
    "inputClasses",
    `
#inpchat.priv { color: ${chatColors[CHANNEL_NAME.PRIVATE]}; }
#inpchat.clant { color: ${chatColors[CHANNEL_NAME.CLAN]}; }
#inpchat.team { color: ${chatColors[CHANNEL_NAME.GROUP]}; }
#inpchat.sys_comm { color: ${chatColors[CHANNEL_NAME.SYSTEM]}; }
        `,
  );
}

function getChannelColor(channelName) {
  if (INTERFACE === "NI") {
    return Engine.chatController
      .getChatConfig()
      .getChannelColor(channelName, true);
  }
  return g.chatController.getChatConfig().getChannelColor(channelName, true);
}

/**
 *  Changes chatColors object to have accurate colors as seen in chat
 */
function updateCommandsColors() {
  const chatColors = {};
  for (const channelName in CHANNELS) {
    chatColors[channelName] = getChannelColor(channelName);
  }

  const customChatColors = getCustomChatColors(chatColors);
  addCommandsColorStyles({ ...chatColors, ...customChatColors });
}

/**
 *  Returns chatColors with changes made from custom user CSS
 */
function getCustomChatColors(chatColors) {
  const chat = document.createElement("div");
  chat.style.display = "none";
  chat.innerHTML = `
<div class="one-message-wrapper">
  <div class="new-chat-message">
    <span class="information-part">
      <span class="ts-section"></span>
      <span class="channel-section"></span>
      <span class="author-section click-able"></span>
      <span class="receiver-arrow-section">-&gt;</span>
      <span class="receiver-section"></span>
    </span>
    <span class="message-part">
      <span class="message-section">message</span>
    </span>
  </div>
</div>
    `;
  document.body.appendChild(chat);

  const wrapper = chat.querySelector(".one-message-wrapper");
  const message = chat.querySelector(".new-chat-message");
  const messageSection = chat.querySelector(".message-section");

  // If the message has the same color as baseline,
  // it means the theme did not change the color.
  const baseColor = window.getComputedStyle(messageSection).color;

  const baseWrapperClasses = wrapper.className;
  const baseMessageClasses = message.className;
  const customChatColors = {};
  for (const channelName in chatColors) {
    wrapper.classList.add(`${channelName}-message-wrapper`);
    message.classList.add(`chat-${channelName}-message`);
    const color = window.getComputedStyle(messageSection).color;
    if (color !== baseColor) {
      customChatColors[channelName] = color;
    }

    wrapper.className = baseWrapperClasses;
    message.className = baseMessageClasses;
  }
  document.body.removeChild(chat);

  return customChatColors;
}

/**
 * Takes part of image that is used for chat and creates image for the background.
 * With this function, a textarea background should look nice on all user themes.
 */
function applyCustomBackground(backgroundElm) {
  const chat = document.createElement("div");
  chat.id = "chat";
  chat.className = "left";
  chat.style.display = "none";
  document.body.appendChild(chat);
  const newImg = window.getComputedStyle(chat).backgroundImage;
  document.body.removeChild(chat);
  if (backgroundElm.style.backgroundImage !== newImg) {
    backgroundElm.style.backgroundImage = newImg;
  }
}

/**
 * Saves last input msg
 */
function saveInputMsg(inputElement) {
  if (INTERFACE === "NI") {
    localStorage.setItem(
      "lastInputtedMsg",
      getSiMessageFormat(inputElement.innerText),
    );
  } else {
    localStorage.setItem("lastInputtedMsg", inputElement.value);
  }
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

function checkInputMsg(inputElement) {
  // check maxLength
  if (!settings.multiMsg) {
    checkMaxLength(inputElement);
  }

  // check colors
  recolorTextarea(inputElement);
}

function getCurrentDefaultTextareaColor() {
  if (INTERFACE === "NI") {
    return document.querySelector(
      ".new-chat-window .control-wrapper > .menu-card > .card-name",
    ).style.color;
  }
  return "";
}

function getCurrentStyleTextareaClass() {
  if (INTERFACE === "NI") {
    const messageStyle = document.querySelector(
      ".new-chat-window .control-wrapper > .style-message",
    ).innerText;
    switch (messageStyle) {
      case "me":
        return CHAT_COMMAND_CLASSES["/lm"];
      case "nar":
        return CHAT_COMMAND_CLASSES["/ln"];
    }
  }
  return "";
}

/**
 * Recolors textarea's text color according to message inside of it
 */
function recolorTextarea(inputElement) {
  let command;
  if (INTERFACE === "NI") {
    command = inputElement.innerText.trim().split(" ")[0];
    inputElement.className = INTERFACE === "NI" ? "magic-input" : "";
  } else {
    command = inputElement.value.trim().split(" ")[0];
    inputElement.style.color = "";
    inputElement.className = inputElement.classList.contains("unfolded")
      ? "unfolded"
      : "";
  }
  inputElement.style.color = getCurrentDefaultTextareaColor();

  const styleClass = getCurrentStyleTextareaClass();
  if (styleClass) {
    inputElement.classList.add(styleClass);
    return;
  }
  if (command.startsWith("@")) {
    inputElement.classList.add("priv");
    return;
  }
  if (CHAT_COMMAND_CLASSES[command]) {
    inputElement.classList.add(...CHAT_COMMAND_CLASSES[command].split(" "));
  }
}

function loadAndApplyUserTheme(textarea, background) {
  const check = function () {
    updateCommandsColors();
    recolorTextarea(textarea);
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

function replaceChatInput() {
  const textarea = document.createElement("textarea");
  textarea.id = "inpchat";
  const bottomBar = document.getElementById("bottombar");
  document.getElementById("inpchat").remove();

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

  return {
    textarea,
    background,
  };
}

function loadLastSavedMessage(inputElement) {
  const savedMessage = localStorage.getItem("lastInputtedMsg");
  if (!savedMessage) {
    return;
  }

  if (INTERFACE === "NI") {
    document.querySelector(".magic-input-placeholder").style.display = "none";
    document.querySelector(".clear-cross").style.display = "block";
    inputElement.innerText = savedMessage;

    // Set the caret at the end
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(inputElement.childNodes[0], savedMessage.length - 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  } else {
    inputElement.value = savedMessage;
    document.getElementById("bottxt").style.display = "none";
  }

  recolorTextarea(inputElement);
}

function handleChatSendAttempt(event) {
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

  const chatInputEventHolder = document.querySelector(selector);
  chatInputEventHolder.addEventListener(
    "keyup",
    (event) => {
      if (event.key === "Enter") {
        handleChatSendAttempt(event);
      }
    },
    true,
  );

  let chatInput;
  if (INTERFACE === "NI") {
    chatInput = chatInputEventHolder;
    // Handle mobile "send message" button
    document
      .querySelector(".send-mobile-message-wrapper > .button")
      ?.addEventListener(
        "click",
        (event) => handleChatSendAttempt(event),
        true,
      );
  }
  if (INTERFACE === "SI") {
    const { textarea, background } = replaceChatInput();
    loadAndApplyUserTheme(textarea, background);
    chatInput = textarea;
    if (!settings.multiMsg) {
      chatInput.maxLength = 199;
    }
  }
  chatInput.addEventListener("input", () => checkInputMsg(chatInput), false);
  chatInput.addEventListener("input", () => saveInputMsg(chatInput), false);

  loadLastSavedMessage(chatInput);
  return chatInput;
}
