import { addCustomStyle, removeCustomStyle } from "./css-manager.js";
import { textarea } from "./input-textarea.js";

const MAX_SMALL_INPUT_LENGTH = 30;

/**
 * Folds textarea hiding big message edit window
 */
function foldTextarea() {
  const bg = document.getElementById("textarea-background");
  textarea.classList.remove("unfolded");
  bg.classList.remove("unfolded");

  addCustomStyle(
    "hideInputScrollbar",
    "#input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}",
  );
}

/**
 * Unfolds textarea showing a big message edit window
 */
function unfoldTextarea() {
  const bg = document.getElementById("textarea-background");
  textarea.classList.add("unfolded");
  bg.classList.add("unfolded");
  removeCustomStyle("hideInputScrollbar");
}

function checkToUnfold() {
  if (textarea.value.length > MAX_SMALL_INPUT_LENGTH) {
    unfoldTextarea();
    return;
  }
  foldTextarea();
}

function makeChatScalable(textarea) {
  textarea.addEventListener("focusout", foldTextarea, false);
  textarea.addEventListener("focusin", checkToUnfold, false);
}

function revokeChatScalable(textarea) {
  foldTextarea();
  textarea.removeEventListener("focusout", foldTextarea, false);
  textarea.removeEventListener("focusin", checkToUnfold, false);
}

function initChatScalableChange() {
  const chat = document.getElementById("chat");
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.classList.contains("left")) {
        makeChatScalable(textarea);
        return;
      }
      foldTextarea();
      revokeChatScalable(textarea);
    });
  });
  observer.observe(chat, { attributeFilter: ["class"] });
}

export function initInputFolding() {
  if (INTERFACE === "NI") {
    // NI has its own native text folding, we don't need to add it
    return;
  }

  textarea.addEventListener("input", checkToUnfold, false);
  const state = g.chatController.getChatWindow().getChatSize();
  if (state === 2) {
    makeChatScalable(textarea);
  } else {
    revokeChatScalable(textarea);
  }
  initChatScalableChange();
}
