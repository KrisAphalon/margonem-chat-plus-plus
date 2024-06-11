const $style = $('<style id="chat-plus-plus-styles">').appendTo("head");
const styles = {};

export function addCustomStyle(styleName, styleContent) {
  if (!styles[styleName]) {
    $style.append(styleContent);

    styles[styleName] = styleContent;
  }
}

export function changeCustomStyle(styleName, styleContent) {
  if (styles[styleName]) removeCustomStyle(styleName);
  addCustomStyle(styleName, styleContent);
}

export function removeCustomStyle(styleName) {
  if (styles[styleName]) {
    const newStyleText = $style.text().split(styles[styleName]).join("");
    $style.text(newStyleText);

    delete styles[styleName];
  }
}

export function toggleCustomStyle(styleName, styleContent) {
  if (styles[styleName]) removeCustomStyle(styleName);
  else addCustomStyle(styleName, styleContent);
}

export function loadBasicStyles() {
  addCustomStyle("basic", BASIC_CSS);
}
