import { initAutomuteCatcher } from "./automute-catcher.js";
import { loadBasicStyles } from "./css-manager.js";
import { initInputFolding } from "./input-folding.js";
import { initInputTextarea } from "./input-textarea.js";
import { initMultiMsgSender } from "./multi-msg-sender.js";
import { initMultiMsg } from "./multi-msg.js";
import { loadSettings } from "./settings.js";

export function handleNoAnswer() {
  if (common.sendArr.length === 0) return;

  if (!sessionStorage.noAnwserMsgDisplayed) {
    window.message(
      "Coś poszło nie tak i twoja wiadomość nie została wysłana na chat.\nKliknij PPM na koordynaty, by przywrócić resztę niewysłanej wiadomości.\nJeżeli wiadomość widnieje na chacie, zignoruj ten komunikat.",
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
