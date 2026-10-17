export const CHANNEL = {
  "/o ": "GLOBAL",
  "/l ": "LOCAL",
  "/h ": "TRADE",
  "/g ": "GROUP",
  "/k ": "CLAN",
} as const;

export const CHANNEL_NAME = {
  GLOBAL: "GLOBAL",
  LOCAL: "LOCAL",
  TRADE: "TRADE",
  GROUP: "GROUP",
  CLAN: "CLAN",
  PRIVATE: "PRIVATE",
  SYSTEM: "SYSTEM",
} as const;

export const CHANNEL_MAPPINGS = {
  Globalny: "/o ",
  Lokalny: "/l ",
  Handlowy: "/h ",
  Grupowy: "/g ",
  Klanowy: "/k ",
} as const;

export const CHANNEL_COMMAND_NAME = {
  CLAN: "clan",
  COMMERCIAL: "commercial",
  GLOBAL: "global",
  GROUP: "party",
  LOCAL: "local",
  PRIVATE: "personal",
  SYSTEM: "system",
  TRADE: "trade",
} as const;

function isChannelPrefix(prefix: string): prefix is keyof typeof CHANNEL {
  return Object.hasOwn(CHANNEL, prefix);
}

function isChannelMapping(name: string): name is keyof typeof CHANNEL_MAPPINGS {
  return Object.hasOwn(CHANNEL_MAPPINGS, name);
}

type Channel = (typeof CHANNEL_NAME)[keyof typeof CHANNEL_NAME];

interface ChannelSettings {
  channel: { name: Channel };
  privateReceiver: string | undefined;
  messageStyle: string | undefined;
  ignoreCheckCardCanChoose: boolean;
}

export function getSiMessageFormat(message: string): string {
  if (INTERFACE === "SI") {
    return message;
  }

  const channelName = document.querySelector<HTMLElement>(
    ".chat-input-wrapper .card-name",
  )?.textContent;
  if (channelName === "Prywatny") {
    const receiverName = document
      .querySelector<HTMLElement>(".chat-input-wrapper .private-nick")
      ?.textContent.replaceAll(" ", "_");
    return `@${receiverName ?? ""} ${message}`;
  }
  if (channelName === "Lokalny") {
    const modifier = document.querySelector<HTMLElement>(
      ".chat-input-wrapper .style-message",
    )?.textContent;
    if (modifier === "me") {
      return `/lm ${message}`;
    }
    if (modifier === "nar") {
      return `/ln ${message}`;
    }
  }

  if (channelName && isChannelMapping(channelName)) {
    return `${CHANNEL_MAPPINGS[channelName]}${message}`;
  }
  return message;
}

function getChannelSettingsFromMsg(msg: string): ChannelSettings {
  const channel: { name: Channel } = { name: CHANNEL_NAME.LOCAL };
  let privateReceiver: string | undefined;
  let messageStyle: string | undefined;
  if (msg.startsWith("/lm")) {
    messageStyle = "me";
  }
  if (msg.startsWith("/ln")) {
    messageStyle = "nar";
  }

  const prefix = msg.slice(0, 3);
  if (isChannelPrefix(prefix)) {
    channel.name = CHANNEL[prefix];
  }
  if (msg.startsWith("@")) {
    channel.name = CHANNEL_NAME.PRIVATE;
    privateReceiver = msg.split(" ")[0]?.slice(1);
  }

  return {
    channel,
    privateReceiver,
    messageStyle,
    ignoreCheckCardCanChoose: true,
  };
}

export function getPrunedMessage(msg: string): string {
  if (["/lm ", "/ln "].includes(msg.slice(0, 4))) {
    return msg.slice(4).trim();
  }

  if (isChannelPrefix(msg.slice(0, 3))) {
    return msg.slice(3).trim();
  }

  if (msg.startsWith("@")) {
    return msg.split(" ").toSpliced(0, 1).join(" ").trim();
  }

  return msg;
}

/**
 * @param msg Message in SI format
 */
export function sendMessage(msg: string): void {
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
  chatInputWrapper.setChannel(
    channelSettings.channel,
    channelSettings.privateReceiver,
    channelSettings.messageStyle,
    channelSettings.ignoreCheckCardCanChoose,
  );
  sendMessageRequest(getPrunedMessage(msg), channelSettings);

  chatInputWrapper.setChannel(
    { name: tempChannel },
    tempPrivateReceiver,
    tempMessageStyle,
    true,
  );
  chatInputWrapper.clearInput();
}

function sendMessageRequest(
  prunedMessage: string,
  settings: ChannelSettings,
): void {
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
