import { addCustomStyle, removeCustomStyle } from "./css-manager.js";

const MAX_SMALL_INPUT_LENGTH = 30;

/**
 * Folds textarea hiding big message edit window
 */
function foldTextarea(inputElement) {
  const bg = document.getElementById("textarea-background");
  inputElement.classList.remove("unfolded");
  bg.classList.remove("unfolded");

  addCustomStyle(
    "hideInputScrollbar",
    "#input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}",
  );
}

/**
 * Unfolds textarea showing a big message edit window
 */
function unfoldTextarea(inputElement) {
  const bg = document.getElementById("textarea-background");
  inputElement.classList.add("unfolded");
  bg.classList.add("unfolded");
  removeCustomStyle("hideInputScrollbar");
}

function checkToUnfold(inputElement) {
  if (inputElement.value.length > MAX_SMALL_INPUT_LENGTH) {
    unfoldTextarea(inputElement);
    return;
  }
  foldTextarea(inputElement);
}

function makeChatScalable(inputElement) {
  inputElement.addEventListener("focusout", () => foldTextarea(inputElement), false);
  inputElement.addEventListener(
    "focusin",
    () => checkToUnfold(inputElement),
    false,
  );
}

function revokeChatScalable(inputElement) {
  foldTextarea(inputElement);
  inputElement.removeEventListener("focusout", () => foldTextarea(inputElement), false);
  inputElement.removeEventListener(
    "focusin",
    () => checkToUnfold(inputElement),
    false,
  );
}

function initChatScalableChange(inputElement) {
  const chat = document.getElementById("chat");
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.classList.contains("left")) {
        makeChatScalable(inputElement);
        return;
      }
      foldTextarea(inputElement);
      revokeChatScalable(inputElement);
    });
  });
  observer.observe(chat, { attributeFilter: ["class"] });
}

export function initInputFolding(inputElement) {
  if (INTERFACE === "NI") {
    // NI has its own native text folding, we don't need to add it
    return;
  }

  inputElement.addEventListener(
    "input",
    () => checkToUnfold(inputElement),
    false,
  );
  const state = g.chatController.getChatWindow().getChatSize();
  if (state === 2) {
    makeChatScalable(inputElement);
  } else {
    revokeChatScalable(inputElement);
  }
  initChatScalableChange(inputElement);
}
