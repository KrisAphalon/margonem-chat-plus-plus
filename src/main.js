import { initAutomuteCatcher } from "./app/automute-catcher.js";
import { loadBasicStyles } from "./app/css-manager.js";
import { initInputFolding } from "./app/input-folding.js";
import { initInputTextarea } from "./app/input-textarea.js";
import { initMultiMsgSender } from "./app/multi-msg-sender.js";
import { initMultiMsg } from "./app/multi-msg.js";
import { initRestoreMessage } from "./app/restore-message.js";
import { loadSettings } from "./app/settings.js";

export function handleNoAnswer() {
  if (common.sendArr.length === 0) return;

  if (!sessionStorage.noAnwserMsgDisplayed) {
    window.message(
      "Coś poszło nie tak i twoja wiadomość nie została wysłana na chat.\nMożesz przywrócić ją klikając w białą strzałkę niedaleko pola do wpisywania wiadomości.\nJeżeli wiadomość widnieje na chacie, zignoruj ten komunikat.",
    );
    sessionStorage.noAnwserMsgDisplayed = true;
  }
}

//TODO naming
export const common = {
  sendArr: [],
  sendTimeout: 0,
  blockTextareaChanging: false,
};

function start() {
  loadSettings();
  loadBasicStyles();

  const inputElement = initInputTextarea();
  initInputFolding(inputElement);
  //initChatCleaner()

  initMultiMsgSender();
  // Order of loading these two modules is crucial, do not reverse it.
  initAutomuteCatcher();
  initMultiMsg();

  if (INTERFACE === "SI") {
    //initTextMerger()
    //initTextJustify()
  }

  initRestoreMessage();

  //initPanel()
}

if (INTERFACE === "NI") {
  if (Engine?.allInit) {
    start();
  } else {
    let started = false;
    let _;
    Object.defineProperty(Engine, "allInit", {
      set(val) {
        _ = val;
        if (val === true && !started) {
          start();
          started = true;
        }
      },
      get() {
        return _;
      },
    });
  }
} else {
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start);
}
