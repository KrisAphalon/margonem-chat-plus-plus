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
function unfoldTextarea(
  inputElement: HTMLInputElement | HTMLTextAreaElement,
): void {
  const bg = document.getElementById("textarea-background");
  if (!bg) {
    return;
  }
  inputElement.classList.add("unfolded");
  bg.classList.add("unfolded");
  removeCustomStyle("hideInputScrollbar");
}

function checkToUnfold(
  inputElement: HTMLInputElement | HTMLTextAreaElement,
): void {
  if (inputElement.value.length > MAX_SMALL_INPUT_LENGTH) {
    unfoldTextarea(inputElement);
    return;
  }
  foldTextarea(inputElement);
}

function makeChatScalable(
  inputElement: HTMLInputElement | HTMLTextAreaElement,
): void {
  inputElement.addEventListener(
    "focusout",
    () => foldTextarea(inputElement),
    false,
  );
  inputElement.addEventListener(
    "focusin",
    () => checkToUnfold(inputElement),
    false,
  );
}

function revokeChatScalable(
  inputElement: HTMLInputElement | HTMLTextAreaElement,
): void {
  foldTextarea(inputElement);
  inputElement.removeEventListener(
    "focusout",
    () => foldTextarea(inputElement),
    false,
  );
  inputElement.removeEventListener(
    "focusin",
    () => checkToUnfold(inputElement),
    false,
  );
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
