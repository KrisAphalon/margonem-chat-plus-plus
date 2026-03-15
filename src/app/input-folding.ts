import { addCustomStyle, removeCustomStyle } from "./css-manager.js";

const MAX_SMALL_INPUT_LENGTH = 30;

/**
 * Folds textarea hiding big message edit window
 */
function foldTextarea(
  inputElement: HTMLInputElement | HTMLTextAreaElement,
): void {
  const bg = document.getElementById("textarea-background");
  if (!bg) {
    return;
  }
  bg.classList.remove("unfolded");
  inputElement.classList.remove("unfolded");

  addCustomStyle(
    "hideInputScrollbar",
    "#input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}",
  );
}

/**
 * Unfolds textarea showing a big message edit window
 */
function unfoldTextarea(
  inputElement: HTMLInputElement | HTMLTextAreaElement,
): void {
  const bg = document.getElementById("textarea-background");
  if (!bg) {
    return;
  }
  bg.classList.add("unfolded");
  inputElement.classList.add("unfolded");
  removeCustomStyle("hideInputScrollbar");
}

function checkToFold(this: HTMLInputElement | HTMLTextAreaElement): void {
  foldTextarea(this);
}

function checkToUnfold(this: HTMLInputElement | HTMLTextAreaElement): void {
  if (this.value.length > MAX_SMALL_INPUT_LENGTH) {
    unfoldTextarea(this);
    return;
  }
  foldTextarea(this);
}

function makeChatScalable(
  inputElement: HTMLInputElement | HTMLTextAreaElement,
): void {
  inputElement.addEventListener("focusout", checkToFold, false);
  inputElement.addEventListener("focusin", checkToUnfold, false);
}

function revokeChatScalable(
  inputElement: HTMLInputElement | HTMLTextAreaElement,
): void {
  foldTextarea(inputElement);
  inputElement.removeEventListener("focusout", checkToFold, false);
  inputElement.removeEventListener("focusin", checkToUnfold, false);
}

function initChatScalableChange(
  inputElement: HTMLInputElement | HTMLTextAreaElement,
): void {
  const chat = document.getElementById("chat");
  if (!chat) {
    return;
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.target instanceof HTMLElement &&
        mutation.target.classList.contains("left")
      ) {
        makeChatScalable(inputElement);
        return;
      }
      foldTextarea(inputElement);
      revokeChatScalable(inputElement);
    });
  });
  observer.observe(chat, { attributeFilter: ["class"] });
}

export function initInputFolding(
  inputElement: HTMLInputElement | HTMLTextAreaElement,
): void {
  if (INTERFACE === "NI") {
    // NI has its own native text folding, we don't need to add it
    return;
  }

  inputElement.addEventListener("input", checkToUnfold, false);
  const state = g.chatController.getChatWindow().getChatSize();
  if (state === 2) {
    makeChatScalable(inputElement);
  } else {
    revokeChatScalable(inputElement);
  }
  initChatScalableChange(inputElement);
}
