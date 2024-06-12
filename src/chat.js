export const CHANNELS = {
  "/o ": "GLOBAL",
  "/l ": "LOCAL",
  "/h ": "TRADE",
  "/g ": "GROUP",
  "/k ": "CLAN",
};

export const CHANNEL_MAPPINGS = {
  Globalny: "/o ",
  Lokalny: "/l ",
  Handlowy: "/h ",
  Grupowy: "/g ",
  Klanowy: "/k ",
};

export function getSiMessageFormat(message) {
  if (INTERFACE === "SI") {
    return message;
  }

  const channelName = document.querySelector(
    ".chat-input-wrapper .card-name",
  ).innerText;
  if (channelName === "Prywatny") {
    const receiverName = document
      .querySelector(".chat-input-wrapper .private-nick")
      .innerText.replaceAll(" ", "_");
    return `@${receiverName} ${message}`;
  }
  if (channelName === "Lokalny") {
    const modifier = document.querySelector(
      ".chat-input-wrapper .style-message",
    ).innerText;
    if (modifier === "me") {
      return `/lm ${message}`;
    }
    if (modifier === "nar") {
      return `/ln ${message}`;
    }
  }

  if (CHANNEL_MAPPINGS[channelName]) {
    return `${CHANNEL_MAPPINGS[channelName]}${message}`;
  }
  return message;
}

function getChannelSettingsFromMsg(msg) {
  let channel = { name: "LOCAL" };
  let privateReceiver;
  let messageStyle;
  if (msg.startsWith("/lm")) {
    messageStyle = "me";
  }
  if (msg.startsWith("/ln")) {
    messageStyle = "nar";
  }
  const channelStart = CHANNELS[msg.substring(0, 3)];
  if (channelStart) {
    channel.name = channelStart;
  }
  if (msg.startsWith("@")) {
    channel.name = "PRIVATE";
    privateReceiver = msg.split(" ")[0].substring(1);
  }

  return [channel, privateReceiver, messageStyle, true];
}

export function getPrunedMessage(msg) {
  if (["/lm ", "/ln "].includes(msg.substring(0, 4))) {
    return msg.substring(4).trim();
  }

  if (Object.keys(CHANNELS).includes(msg.substring(0, 3))) {
    return msg.substring(3).trim();
  }

  if (msg.startsWith("@")) {
    return msg.split(" ").toSpliced(0, 1).join(" ").trim();
  }

  return msg;
}

/**
 *
 * @param msg {string} Message in SI format
 */
export function sendMessage(msg) {
  if (INTERFACE === "NI") {
    const tempChannel = Engine.chatController
      .getChatInputWrapper()
      .getChannelName();
    const tempPrivateReceiver = Engine.chatController
      .getChatInputWrapper()
      .getPrivateReceiver();
    const tempMessageStyle = Engine.chatController
      .getChatInputWrapper()
      .getStyleMessage();

    Engine.chatController
      .getChatInputWrapper()
      .setChannel(...getChannelSettingsFromMsg(msg));
    Engine.chatController
      .getChatInputWrapper()
      .getDataAndSendRequest(getPrunedMessage(msg));

    Engine.chatController
      .getChatInputWrapper()
      .setChannel(
        { name: tempChannel },
        tempPrivateReceiver,
        tempMessageStyle,
        true,
      );
    Engine.chatController.getChatInputWrapper().clearInput();
    return;
  }

  if (msg.startsWith("@")) {
    const nick = msg.split(" ")[0].substring(1);
    msg = msg.split(" ");
    msg.shift();
    msg = msg.join(" ");
    window._g(`chat&channel=personal&receiver=${nick}`, false, { c: msg });
    return;
  }
  if (CHANNELS[msg.substring(0, 3)]) {
    window._g(`chat&channel=${CHANNELS[msg.substring(0, 3)]}`, false, {
      c: msg.substring(3),
    });
    return;
  }
  window._g("chat&channel=local", false, { c: msg });
}
