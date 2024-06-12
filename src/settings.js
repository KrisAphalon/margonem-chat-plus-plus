export const settings = {
  multiMsg: true,
  justifyChat: false,
  mergeMessages: true,
  sendMessageTimeout: 2_500,
};

export function loadSettings() {
  const rawData = localStorage.getItem("chatPlusPlus");
  if (rawData) {
    const data = JSON.parse(rawData);
    for (const prop of Object.keys(data)) settings[prop] = data[prop];
  }
  localStorage.setItem("chatPlusPlus", JSON.stringify(settings));
}

export function saveSettings() {
  localStorage.setItem("chatPlusPlus", JSON.stringify(settings));
}
