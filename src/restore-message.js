import { recolorTextarea } from "./input-textarea.js";
import { common } from "./main.js";
import { setNITipsInsideOf } from "./utility-functions.js";

function deconstructSendArrPart(part) {
  part = part.replace(/^\/.? /, "");

  if (!["/", "@", "*"].includes(part[0])) {
    return part;
  }

  let split = part.split(" ");

  if (part[0] === "*" && split[0].includes("dial")) {
    split = part.split(",");
  }
  split.shift();
  if (part[0] === "@") {
    return deconstructSendArrPart(split.join(" "));
  }

  return split.join(" ");
}

function getFullPreviousMessage(sendArray) {
  const len = sendArray.length;
  if (len === 0) {
    return "";
  }

  let newChatValue = "";
  if (len >= 1) {
    newChatValue = sendArray[0].trim();
  }
  if (len > 1) {
    for (let i = 1; i < len; i++) {
      const part = deconstructSendArrPart(sendArray[i]).trim();
      newChatValue += " " + part;
    }
  }
  return newChatValue;
}

function restorePreviousMessage(event) {
  event.preventDefault();
  const newChatValue = getFullPreviousMessage(common.sendArr);
  if (!newChatValue) {
    return;
  }
  window.message("Przywracanie wiadomości...");
  restoreMessage(newChatValue);
  common.sendArr.splice(0);
  sendArrayChanged();
}

export function restoreMessage(message) {
  let inputElement;
  if (INTERFACE === "NI") {
    inputElement = document.querySelector(".magic-input");
    document.querySelector(".magic-input-placeholder").style.display = "none";
    document.querySelector(".clear-cross").style.display = "block";
    inputElement.innerText = message;
    const lastElement =
      inputElement.childNodes[inputElement.childNodes.length - 1];
    if (lastElement) {
      // Set the caret at the end
      const range = document.createRange();
      const sel = window.getSelection();
      range.setEndAfter(lastElement);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    const keyUp = new KeyboardEvent("keyup", {});
    inputElement.dispatchEvent(keyUp);
  } else {
    inputElement = document.querySelector("#inpchat");
    if (message.startsWith("/l /lm") || message.startsWith("/l /ln")) {
      message = message.slice(3);
    }

    inputElement.value = message;
    document.getElementById("bottxt").style.display = "none";
  }

  recolorTextarea(inputElement);
}

export function sendArrayChanged() {
  const restoreMessageButton = document.querySelector(
    ".restore-message-button",
  );
  restoreMessageButton.style.display =
    common.sendArr.length === 0 ? "none" : "block";
}

export function initRestoreMessage() {
  const wrapper = document.createElement("div");
  wrapper.className = "restore-message-button-wrapper";
  const button = document.createElement("button");
  button.className = "restore-message-button";
  button.style.display = "none";
  button.setAttribute(
    "tip",
    "Przerwij wysyłanie wiadomości i przywróć ją do pola wysyłania.",
  );
  button.addEventListener("click", restorePreviousMessage);
  wrapper.appendChild(button);

  if (INTERFACE === "NI") {
    setNITipsInsideOf(wrapper);
    document
      .querySelector(".chat-notification-wrapper")
      .insertAdjacentElement("beforebegin", wrapper);
  } else {
    document.querySelector("#bottombar").append(wrapper);
  }
}
