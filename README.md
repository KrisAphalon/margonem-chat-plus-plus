[![Maintainability](https://api.codeclimate.com/v1/badges/0045b2e38640fbd10184/maintainability)](https://codeclimate.com/github/KrisAphalon/margonem-chat-plus-plus/maintainability)

Chat Plus Plus
======
Addon/extension for online MMORPG game: [Margonem](https://www.margonem.pl/), adding extended chat capabilities.


Features
------

##### Auto mute catcher

- Addon catches any words or phrazes that would result in automatic mute from server, and displays warning before
  allowing to send them.

##### 'Message too long' warning remover

- Block sending single message that would exceed maximum allowed limit.
- Maximum message length is 200, but every non ASCII character counts as 2. It is not accounted for in base game, so
  warnings from server are common occurrence. This addon fixes it by recalculating max-length of message in real time,
  even when pasting it.

##### Sending really long messages

- Addon allows sending messages that exceed 200 characters.
- It achieves it by intelligently dividing long message to parts and sending parts one after another.
- It tries to divide messages first by sentences, then by words. It only divides words in half when it sees no choice.

##### Extended chat window

- Since writing really long messages with simple input element would be quite hard, this addon changes it to dynamically
  adjustable textarea that pops up when text would start to cramp up.

##### Auto coloring messages when writing

- Addon automatically colors messages based on what's being currently written.
- For example it can color commands on red and priv messages on blue.
- It contains commands from base game, as well as [Nerthus addon](https://github.com/akrzyz/nerthusaddon)

##### Supports both interfaces

- Margonem has two significantly different interfaces: old one and new one. This addon works on both of them without any
  difficulties.

##### Private and clan chat hider

- Addon can toggle between showing private and clan messages, and not showing them on the main chat. Base game doesn't
  have this capability.

##### Custom theme integration

- Addon nicely integrates with most of the custom themes you might have on an old interface.
- It reuses visible assets after loading itself, so custom theme graphics or CSS are nicely integrated, without any need
  for changes from theme author.

Installation
------

- Install [Tampermonkey](https://www.tampermonkey.net/) or similar browser extension that allows for external scripts.
- Head to [install page](https://krisaphalon.github.io/margonem-chatPlusPlus/chatPlusPlus.user.js) and click install.
- Installation should work regardless of interface type.
