/**
 * @file
 * Interfaces that the Margonem game uses.
 *
 * It might not be a 1:1 match with the actual game,
 * since the source code is not available,
 * but it should be enough for our purposes.
 *
 * The addon mostly uses interfaces from this file to type-hint the
 * used methods from the game's code.
 * Without this file, the same structures would need to be used,
 * just without any type-hinting.
 *
 * The interfaces are purposefully not complete,
 * as only the parts used in the addon are described.
 */

declare const INTERFACE: "NI" | "SI";

/**
 * Chat input wrapper shared between the new and old interface.
 */
type ChatInputWrapper = {
  init(): void;
  clearInput(): void;
  getChannelName(): string;
  getPrivateReceiver(): string | null;
  getStyleMessage(): string | null;
  setChannel(
    channelData: unknown,
    privateReceiver?: string | null,
    messageStyle?: string | null,
    ignoreChannelCheck?: boolean,
  ): void;
};

/**
 * Engine global variable available in the new interface.
 */
declare const Engine: {
  chatController: {
    getChatConfig: () => {
      getChannelColor(name: string, isHeroMessage: boolean): unknown;
    };
    getChatInputWrapper(): ChatInputWrapper & {
      /**
       * NI specifically also exports this method we use.
       * SI doesn't export it.
       */
      getDataAndSendRequest(value: unknown): void;
    };
    getChatMessageWrapper(): {
      setScrollOnBottom(): void;
    };
    getChatWindow(): {
      getChatSize(): 0 | 1;
    };
  };
  hero: {
    nick: string;
  };
  lock: {
    add(key: string): void;
    remove(key: string): void;
  };
};

/**
 * Engine global variable available in the old interface.
 */
declare const g: {
  chatController: {
    getChatConfig(): {
      getChannelColor(name: string, isHeroMessage: boolean): unknown;
    };
    getChatWindow(): { getChatSize(): 0 | 1 | 2 };
    getChatInputWrapper(): ChatInputWrapper;
  };
  lock: {
    add(key: string): void;
    remove(key: string): void;
  };
};

/**
 * Hero global variable available in the old interface.
 */
declare const hero: {
  nick: string;
};

/**
 * Message function available on both interfaces.
 */
declare const message: (message: string) => void;
