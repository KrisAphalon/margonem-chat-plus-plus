import { initAutomuteCatcher } from "./app/automute-catcher.js";
import { initInputFolding } from "./app/input-folding.js";
import { initInputTextarea } from "./app/input-textarea.js";
import { initMultiMsgSender } from "./app/multi-msg-sender.js";
import { initMultiMsg } from "./app/multi-msg.js";
import {
  initRestoreMessage,
  loadLastSavedMessage,
} from "./app/restore-message.js";
import { loadSettings } from "./app/settings.js";

import "../res/style.scss";

function start() {
  loadSettings();

  const inputElement = initInputTextarea();
  loadLastSavedMessage(inputElement);
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
