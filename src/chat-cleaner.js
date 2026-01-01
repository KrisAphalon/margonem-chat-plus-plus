import { addCustomStyle } from "./css-manager.js";

let textHide = false;

const classes = {
  toHide: [],
  toHide2: [],
  toNotHide: [],
};

/**
 * Checks whether element shouldn't be considered when checking elements for being hidable
 * @param element
 * @returns {boolean}
 */
function elementIsNeverHidable(element) {
  return classes.toNotHide.some((cls) => element.classList.contains(cls));
}

/**
 * Checks whether element should be hidden (or revealed)
 * @param element
 * @returns {boolean}
 */
function elementIsHidable(element) {
  if (INTERFACE === "SI") return classes.toHide.includes(element.className);
  if (classes.toHide.includes(element.classList[1])) return true;

  for (const child of element.children) {
    if (classes.toHide2.some((hide) => child.classList.contains(hide))) {
      return true;
    }
  }
  return false;
}

function applyDisplayStyleIfHidable(elements, style) {
  for (const element of elements.length) {
    if (!elementIsNeverHidable(element) && elementIsHidable(element)) {
      element.style.display = style;
    }
  }
}

function toggleHide() {
  const style = textHide ? "" : "none";
  if (INTERFACE === "NI") {
    const chat = document.getElementsByClassName("section chat-tpl")[0];
    const scroll_pane = chat.children[4].children[1];
    const allchat_button = document.getElementsByClassName(
      "tabs-wrapper connectedSortable ui-sortable",
    )[0].children[0];
    if (!allchat_button.classList.contains("active")) return;

    applyDisplayStyleIfHidable(scroll_pane.children, style);
  } else {
    const chattxt = document.getElementById("chattxt");
    applyDisplayStyleIfHidable(chattxt.children, style);
  }
  textHide = !textHide;
}

export function initChatCleaner() {
  if (INTERFACE === "NI") {
    classes.toHide = ["sys_info"];
    classes.toHide2 = [
      "priv-in-general",
      "group-in-general",
      "clan-in-general",
      "system-in-general",
    ];
    classes.toNotHide = [
      "me",
      "nar",
      "nar2",
      "nar3",
      "nar6",
      "dial1",
      "dial2",
      "dial3",
      "dial666",
    ];

    const lagmeter = document.getElementsByClassName("lagmeter")[0];
    lagmeter.addEventListener("click", toggleHide);
    lagmeter.style.cursor = "cell";
  } else {
    classes.toHide = ["clant", "syst", "priv", "priv2", "sys_info", "team"];

    addCustomStyle(
      "chatCleaner",
      "#msghider-button{position:'absolute';width:17px;height:21px;textAlign:center;cursor:cell}",
    );

    const hideButton = document.createElement("div");
    hideButton.id = "msghider-button";
    hideButton.addEventListener("click", toggleHide);
    document.getElementById("lagmeter").appendChild(hideButton);
  }
}
