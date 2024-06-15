export const CHANNEL = {
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

export const CHANNEL_COMMAND_NAME = {
  CLAN: "clan",
  COMMERCIAL: "commercial",
  GLOBAL: "global",
  GROUP: "party",
  LOCAL: "local",
  PRIVATE: "personal",
  SYSTEM: "system",
  TRADE: "trade",
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
  const channelStart = CHANNEL[msg.substring(0, 3)];
  if (channelStart) {
    channel.name = channelStart;
  }
  if (msg.startsWith("@")) {
    channel.name = "PRIVATE";
    privateReceiver = msg.split(" ")[0].substring(1);
  }

  return {
    channel,
    privateReceiver,
    messageStyle,
    ignoreCheckCardCanChoose: true,
  };
}

export function getPrunedMessage(msg) {
  if (["/lm ", "/ln "].includes(msg.substring(0, 4))) {
    return msg.substring(4).trim();
  }

  if (Object.keys(CHANNEL).includes(msg.substring(0, 3))) {
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
  let chatInputWrapper;
  if (INTERFACE === "NI") {
    chatInputWrapper = Engine.chatController.getChatInputWrapper();
  } else {
    chatInputWrapper = g.chatController.getChatInputWrapper();
  }

  const tempChannel = chatInputWrapper.getChannelName();
  const tempPrivateReceiver = chatInputWrapper.getPrivateReceiver();
  const tempMessageStyle = chatInputWrapper.getStyleMessage();

  const channelSettings = getChannelSettingsFromMsg(msg);
  chatInputWrapper.setChannel(...Object.values(channelSettings));
  sendMessageRequest(getPrunedMessage(msg), channelSettings);

  chatInputWrapper.setChannel(
    { name: tempChannel },
    tempPrivateReceiver,
    tempMessageStyle,
    true,
  );
  chatInputWrapper.clearInput();
}

function sendMessageRequest(prunedMessage, settings) {
  if (INTERFACE === "NI") {
    Engine.chatController
      .getChatInputWrapper()
      .getDataAndSendRequest(prunedMessage);
  } else {
    // SI doesn't have `getDataAndSendRequest` method as public,
    // So we need to re-implement it ourselves.
    const channel = CHANNEL_COMMAND_NAME[settings.channel.name];
    const receiver = settings.privateReceiver
      ? settings.privateReceiver.replaceAll(" ", "_")
      : "";
    const style = settings.messageStyle ?? "";

    _g(
      "chat" +
        `&channel=${channel}` +
        (receiver ? `&receiver=${receiver}` : "") +
        (style ? `&style=${style}` : ""),
      false,
      {
        c: prunedMessage,
      },
    );
  }
}
