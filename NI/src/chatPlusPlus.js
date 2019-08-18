!function ()
{
    function start()
    {
        window.chatPlusPlus = {
            options: {
                multiMsg: true,
                justifyChat: false,
                messageTimeout: 1600
            },
            sendArr: [],
            blockTextareaChanging: false,
            sendTimeout: {}
        }

        //options
        !function ()
        {
            const rawData = localStorage.getItem("chatPlusPlus")
            if (rawData)
            {
                const data = JSON.parse(rawData)
                for (const prop in data)
                    if (data.hasOwnProperty(prop))
                        window.chatPlusPlus.options[prop] = data[prop]
            }
            localStorage.setItem("chatPlusPlus", JSON.stringify(window.chatPlusPlus.options))

            document.getElementsByClassName("lag")[0].oncontextmenu = function ()
            {
                window.chatPlusPlus.options.multiMsg = !window.chatPlusPlus.options.multiMsg
                localStorage.setItem("chatPlusPlus", JSON.stringify(window.chatPlusPlus.options))
                message("Przełączono tryb dodawania wiadomości na: " +
                    (window.chatPlusPlus.options.multiMsg ? "multiMsg" : "standardowy"))
                return false
            }

        }()

        // Hiding unrelevant text
        !function ()
        {
            const chat = document.getElementsByClassName("section chat-tpl")[0]
            console.log(chat)
            const scroll_pane = chat.children[4].children[1]

            const classesToHide = ["sys_info"]
            const classesToHide2 = ["priv-in-general", "group-in-general", "clan-in-general", "system-in-general"]
            const classes2Length = classesToHide2.length
            const classesToNotHide = ["me", "nar", "nar2", "nar3", "dial1", "dial2", "dial3", "dial666"]
            let textHide = false

            function toggleHide()
            {
                const allchat_button = document.getElementsByClassName("tabs-wrapper connectedSortable ui-sortable")[0].children[0]
                if (allchat_button.classList.contains("active"))
                {
                    const display = textHide ? "" : "none"

                    const len = scroll_pane.children.length
                    for (let i = 0; i < len; i++)
                    {
                        if (classesToNotHide.indexOf(scroll_pane.children[i].classList[1]) < 0
                            && classesToNotHide.indexOf(scroll_pane.children[i].classList[2]) < 0
                            && classesToNotHide.indexOf(scroll_pane.children[i].classList[3]) < 0
                        )
                        {
                            if (classesToHide.indexOf(scroll_pane.children[i].classList[1]) >= 0)
                                scroll_pane.children[i].style.display = display
                            else
                            {
                                const len2 = scroll_pane.children[i].children.length
                                for (let j = 0; j < len2; j++)
                                {
                                    for (let k = 0; k < classes2Length; k++)
                                    {
                                        if (scroll_pane.children[i].children[j].classList.contains(classesToHide2[k]))
                                        {
                                            scroll_pane.children[i].style.display = display
                                            break
                                        }
                                    }

                                }
                            }
                        }
                    }

                    textHide = !textHide
                }
            }

            const lagmeter = document.getElementsByClassName("lagmeter")[0]
            lagmeter.addEventListener("click", toggleHide)
            lagmeter.style.cursor = "cell"
        }()


        // Multiple msgs
        !function ()
        {


            function deconstructSendArrPart(part)
            {
                if (part[0] === "/" || part[0] === "@" || part[0] === "*")
                {
                    if (part[0] === "/" || part[0] === "@")
                    {
                        const split = part.split(" ")
                        split.shift()
                        if (part[0] === "@")
                            return deconstructSendArrPart(split.join(" "))
                        else
                            return split.join(" ")
                    }
                    else
                    {
                        const split = part.split(" ")
                        switch (split[0])
                        {
                            case "*me":
                            case "*nar":
                            case "*nar1":
                            case "*nar2":
                            case "*nar3":
                            case "*sys":
                                split.shift()
                                return split.join(" ")
                            case "*dial":
                            case "*dial1":
                            case "*dial2":
                            case "*dial3":
                            case "*dial666":
                                const npcSplit = part.split(",")
                                npcSplit.shift()
                                return npcSplit.join(",")
                        }
                    }


                }
                return part
            }

            document.querySelector(".chat-tpl .send-btn").addEventListener("contextmenu", function (e)
            {
                e.preventDefault()
                const inpchat = document.getElementById("inpchat")
                const sendArr = window.chatPlusPlus.sendArr
                let newChatValue = ""
                const len = sendArr.length
                if (len === 0)
                    return false
                else if (len >= 1)
                {
                    window.message("Przywracanie wiadomości...")
                    newChatValue = sendArr[0].trim()
                }
                if (len > 1)
                    for (let i = 1; i < len; i++)
                    {
                        const part = deconstructSendArrPart(sendArr[i]).trim()
                        newChatValue += " " + part
                    }
                console.log(newChatValue)
                inpchat.value = newChatValue
                return false
            })

            function handleNoAnwser()
            {
                window.message("Coś poszło nie tak i twoja wiadomość nie została wysłana na chat. Kliknij PPM na strzałkę wysyłania wiadomości by przywrócić resztę niewysłanej wiadomości.<br> Jeżeli wiadomość widnieje na chacie, zignoruj ten komunikat.")
            }

            const polishLetters = /[ąćęłńóśźż*@,. _]/gi

            function calculateAddOnStart(msg)
            {
                let addOnStart = ""
                const arr = msg.split(" ")
                if (arr[0][0] === "*" || arr[0][0] === "/")
                {
                    if ((arr[0][1] === "k" || arr[0][1] === "g") && arr[0][2] === undefined)
                        addOnStart = "/"
                    else
                        addOnStart = "*"
                    const command = arr[0].slice(1)
                    console.log(command)
                    addOnStart += command + " "
                    if (command.startsWith("dial"))
                        addOnStart = msg.split(",")[0] + ", "
                    //no bullshit with e.g. *le*n*n*gt*h

                }
                else if (arr[0][0] === "@")
                    addOnStart = msg.split(" ")[0] + " "

                //if it's command on specific channel or priv
                if ((arr[0][0] === "/" &&
                    (arr[0][1] === "k" || arr[0][1] === "g") ||
                    arr[0][0] === "@") &&
                    arr[1][0] === "*")
                {
                    const command = arr[1].slice(1)
                    addOnStart += "*" + command + " "
                    if (command.startsWith("dial"))
                        addOnStart = msg.split(",")[0] + ", "
                }
                return addOnStart
            }

            function calcMargoLength(string)
            {
                let margoLength = 0
                const len = string.length
                for (let i = 0; i < len; i++)
                    if (string[i].match(polishLetters))
                        margoLength += 2
                    else
                        margoLength++
                return margoLength
            }

            const start = function ()
            {
                const sendButton = document.querySelector(".section.chat-tpl .send-btn.right")
                const initSendButton = $._data(sendButton, "events").click[0].handler
                const oldSendMsg = function (message)
                {
                    const inputWrapper = document.getElementsByClassName("chat-tpl")[0].children[5]
                    const inpchat = inputWrapper.children[3]
                    console.log(inpchat)
                    console.log(message)
                    window.chatPlusPlus.blockTextareaChanging = true
                    inpchat.value = message
                    console.log(inpchat.value)
                    initSendButton()
                    console.log(inpchat.value)
                    inpchat.value = ""
                    window.chatPlusPlus.blockTextareaChanging = false
                }


                $._data(sendButton, "events").click[0].handler = function ()
                {
                    let msg = document.getElementById("inpchat").value
                    console.log("sending msg")
                    console.log(msg)
                    if (window.chatPlusPlus.options.multiMsg && msg !== "")
                    {
                        msg = msg.trim()

                        const addOnStart = calculateAddOnStart(msg)

                        //delete old sendArr if there was some problem (e.g. lost group chat)
                        window.chatPlusPlus.sendArr = []
                        const sendArr = window.chatPlusPlus.sendArr
                        const len = msg.length
                        let last_slice = 0
                        let current = 0
                        let last_space = 0
                        let last_dot = 0

                        //these two are needed to properly calculate char count when slicing message
                        let chars_from_last_space = 0
                        let chars_from_last_dot = 0

                        console.log(addOnStart)

                        const maxLen = 195 - calcMargoLength(addOnStart)
                        console.log(maxLen)
                        console.log(msg)
                        console.log(len)
                        if (calcMargoLength(msg) > maxLen)
                            for (let i = 0; i < len; i++)
                            {
                                if (msg[i].match(polishLetters))
                                {
                                    chars_from_last_dot += 2
                                    chars_from_last_space += 2
                                    current += 2
                                }
                                else
                                {
                                    chars_from_last_dot++
                                    chars_from_last_space++
                                    current++
                                }

                                if (msg[i] === " ")
                                {
                                    last_space = i
                                    chars_from_last_space = 0
                                }
                                else if (msg[i] === ".")
                                {
                                    last_dot = i
                                    chars_from_last_dot = 0
                                }

                                //hard break any word that has more than 30 letters in it
                                if (last_space + 30 < i)
                                {
                                    last_space = i
                                    chars_from_last_space = 0
                                }
                                if (current >= maxLen)
                                {
                                    if (last_dot + 100 < i) // || msg[last_dot + 1] === undefined
                                    {
                                        if (last_slice === 0)
                                            sendArr.push(msg.slice(0, last_space))
                                        else
                                            sendArr.push(addOnStart + msg.slice(last_slice, last_space))
                                        last_slice = last_space
                                        current = chars_from_last_space
                                    }
                                    else
                                    {
                                        let additional_shift = 0
                                        for (let j = 0; j < 5; j++)
                                            if (msg[last_dot + j] === "." || msg[last_dot + j] === " ")
                                                additional_shift++
                                            else
                                                break
                                        if (last_slice === 0)
                                            sendArr.push(msg.slice(0, last_dot + additional_shift))
                                        else
                                            sendArr.push(addOnStart + msg.slice(last_slice, last_dot + additional_shift))
                                        last_slice = last_dot + additional_shift
                                        current = chars_from_last_dot
                                    }
                                    console.log(sendArr)
                                }
                            }
                        if (msg !== "")
                            if (last_slice === 0)
                                sendArr.push(msg)
                            else if (msg.slice(last_slice) !== "")
                                sendArr.push(addOnStart + msg.slice(last_slice))

                        console.log(sendArr)
                        console.log(sendArr.length)


                        function parseMessageToChatfrom(message)
                        {

                            message = message.trim()
                            let split = message.split(" ")

                            let retry = false
                            if (message[0] === "/" || message[0] === "*")
                            {
                                console.log(split)
                                let command = message.split(" ", 1)[0]
                                switch (command)
                                {
                                    case "/me":
                                        command = Engine.hero.nick
                                        break
                                    case "/g":
                                    case "/k":
                                        retry = true
                                    case "/nar":
                                    case "*me":
                                    case "*nar":
                                    case "*nar1":
                                    case "*nar2":
                                    case "*nar3":
                                    case "*sys":
                                        command = ""
                                        break
                                    case "*dial":
                                    case "*dial1":
                                    case "*dial2":
                                    case "*dial3":
                                    case "*dial666":
                                        const npcNameSplit = message.split(",")
                                        const npcNameSplitSpace = npcNameSplit[0].split(" ")
                                        npcNameSplit.shift()
                                        const newSplit = npcNameSplit.join(",").split(" ")
                                        split = newSplit
                                        split.unshift("")
                                        npcNameSplitSpace.shift()
                                        const npcName = npcNameSplitSpace.join(" ")
                                        console.log("NPC name: " + npcName)
                                        command = "«" + npcName + "»"
                                        break
                                }
                                split.shift()
                                if (command !== "")
                                    split.unshift(command)


                            }
                            else if (message[0] === "@")
                            {
                                retry = true
                                split.shift()
                            }
                            message = ""
                            //.join would sometimes produce multiple spaces in a row when messages can have only 1
                            const len = split.length
                            console.log(split)
                            for (let i = 0; i < len; i++)
                                if (split[i] !== "")
                                    message += split[i] + " "
                            message = message.trim()

                            if (retry)
                                return parseMessageToChatfrom(message)
                            else
                                return message
                        }


                        const not_only_dots = /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g

                        const chattxt = document.querySelector(".chat-tpl .messages-wrapper .scroll-pane")
                        const mutation_config = {attributes: false, childList: true, subtree: false}
                        const callback = function (mutationsList, observer)
                        {
                            for (const mutation of mutationsList)
                            {
                                const len = mutation.addedNodes.length
                                for (let i = 0; i < len; i++)
                                {
                                    const message = mutation.addedNodes[i].children[2].innerText.trim()
                                    if (typeof window.chatPlusPlus.sendArr[0] !== "undefined")
                                        if (message.trim() === parseMessageToChatfrom(window.chatPlusPlus.sendArr[0]))
                                        {
                                            clearTimeout(window.chatPlusPlus.sendTimeout)
                                            window.chatPlusPlus.sendArr.shift()
                                            if (window.chatPlusPlus.sendArr.length > 0)
                                            {
                                                setTimeout(function ()
                                                {
                                                    if (window.chatPlusPlus.sendArr[0].match(not_only_dots).length > 0)
                                                        oldSendMsg(window.chatPlusPlus.sendArr[0])
                                                }, window.chatPlusPlus.options.messageTimeout)
                                                if (window.chatPlusPlus.sendArr.length > 1)
                                                    window.chatPlusPlus.sendTimeout = setTimeout(handleNoAnwser, window.chatPlusPlus.options.messageTimeout * 2)
                                            }

                                        }


                                }
                            }
                        }
                        const observer = new MutationObserver(callback)
                        observer.observe(chattxt, mutation_config)

                        if (sendArr.length > 0)
                        {
                            oldSendMsg(sendArr[0])
                            window.chatPlusPlus.sendTimeout = setTimeout(handleNoAnwser, window.chatPlusPlus.options.messageTimeout * 2)
                        }
                        document.getElementById("inpchat").blur()

                        //fix to not folding textarea
                        setTimeout(function ()
                        {
                            document.getElementById("inpchat").focus()
                            document.getElementById("inpchat").blur()
                        }, 100)


                    }
                    else
                    {
                        oldSendMsg(msg)
                        //fix to not folding textarea
                        setTimeout(function ()
                        {
                            document.getElementById("inpchat").focus()
                            document.getElementById("inpchat").blur()
                        }, 100)
                    }
                }

            }
            start()
        }()


        //autoMute catcher
        !function ()
        {
            const sendButton = document.querySelector(".section.chat-tpl .send-btn.right")
            const initSendButton = $._data(sendButton, "events").click[0].handler
            const oldSendMsg = function (message)
            {
                const inputWrapper = document.getElementsByClassName("chat-tpl")[0].children[5]
                const inpchat = inputWrapper.children[3]
                console.log(inpchat)
                console.log(message)
                inpchat.value = message
                console.log(inpchat.value)
                initSendButton()
                console.log(inpchat.value)
                inpchat.value = ""
            }

            const badWords = [
                "suscipit",
                "kurw",
                "gówno",
                "pedał",
                "cwel",
                "dziwk",
                "pierdo",
                "huj",
                "hój",
                "zjeb",
                "jeb",
                "fuck",
                "kutas",
                "cip",      //alert, 'cip cip' is ok
                "hoj",      //alert, 'ahoj' is ok
                "walkonia",
                "wałkonia",
                "pizd",
                "suko",
                "dupek",
                "dupęk",
                "gnoju",
                "ciul"
            ]
            const badWordsSpaceOnly = [
                "daj coś",
                "daj cos",
                "zje by",
                "zje, by",
                "zje. by",
                "zje b",
                "zje. b",
                "zje, b",
                "ch. ują"
            ]
            const innocentWords = [ //TODO zrób no z tego regexpy ;v
                "ości p",
                "hojn",
                "łuchanie",
                "przesłuchuj",
                "nasłuchuj",
                "ci poszło",
                "ahoj",
                "gów nowa",
                "migów no",
                "ci poz",
                "ci pot",
                "ci pi",
                "ci pr",
                "ci par",
                "ci pom",
                "ci pop",
                "ci pod",
                "ci. pod",
                "ci, pod",
                "ci po p",
                "ci pok",
                "ci pal",
                "ci pr",
                "ci. pal",
                "je b",
                "je. b",
                "je, b",
                "ho ja",
                "ęc welp",
                ":p",
                "cip cip cip cip",
                "cip cip cip",
                "cip cip",
                "wymachuj",
                "je bo",
                //"c w elen", //it is bad word
                "ci pó",
                "ci, pi",
                "ci pos",
                "ach u jeg",
                "ci pd",
                "ci pow",
                "ci pon",
                "ci poc",
                "ci pam",
                "dzi w kr",
                "jak",
                "podsłuchuje",
                "ci pan",
                "sc i przet",
                "c i po",
                "ęk urwał",
                "uzje. barw",
                "uzje, barw",
                "uzje barw",
                "ch ują",
                "ch, ują"
            ]


            //removes duplicate letters from message
            //"teeeeeets" changes to "tests"
            const removeDuplicates = function (msg)
            {
                const len = msg.length
                if (len !== 0)
                {
                    let copy = msg[0]
                    let lastLetter = msg[0]
                    for (let i = 1; i < len; i++)
                    {
                        if (msg[i] !== lastLetter)
                            copy = copy + msg[i]
                        lastLetter = msg[i]
                    }
                    return copy
                }
                return ""
            }

            const start = function ()
            {
                const alertUser = function (originalMsg, caughtMsg)
                {
                    window.mAlert("Twoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;D <br> " +
                        "Poniżej wiadomość, jaką widzi automute:<hr><span style='word-wrap: break-word'>" +
                        caughtMsg + "</span><hr>Czy mimo tego chcesz ją wysłać? Jeżeli wiadomość przejdzie bez " +
                        "gwiazdkowania wyślij wyjątek do Kris Aphalon#3484 na discordzie bądź na skrzynkę pocztową",
                        [
                            {
                                txt: "Wyślij",
                                callback: function ()
                                {
                                    oldSendMsg(originalMsg)
                                    return true
                                }
                            },
                            {
                                txt: "Nie wysyłaj",
                                callback: function ()
                                {
                                    document.getElementById("inpchat").focus()
                                    return true
                                }
                            }

                        ])
                }

                $._data(sendButton, "events").click[0].handler = function ()
                {
                    let msg = document.getElementById("inpchat").value
                    let copy = msg

                    //don't parse nick
                    if (copy[0] === "@")
                        copy = copy.slice(copy.indexOf(" "))

                    copy = copy.toLowerCase()


                    let innocent = true

                    //check for known phrases that get flagged as swear words
                    for (const e of badWordsSpaceOnly)
                    {
                        if (copy.includes(e))
                        {
                            console.log("Wykryto zwrot który jest niemiły: " + e)
                            copy = copy.split(e).join("<span style='color: red; font-weight: bold'>" + e + "</span>")
                            innocent = false
                            break
                        }
                    }
                    if (innocent)
                    {
                        //delete innocent phrases
                        for (const e of innocentWords)
                            copy = copy.split(e).join("X")

                        //delete characters that aren't used to create words
                        copy = copy.replace(/[^a-zńąćśźżóęł]/g, "")
                        copy = removeDuplicates(copy)

                        for (const e of badWords)
                            if (copy.includes(e))
                            {
                                console.log("Wykryto zwrot który jest niemiły: " + e)
                                copy = copy.split(e).join("<span style='color: red; font-weight: bold'>" + e + "</span>")
                                innocent = false
                                break
                            }
                        if (innocent)
                            oldSendMsg(msg)
                        else
                            alertUser(msg, copy)
                    }
                    else
                        alertUser(msg, copy)
                }
            }
            start()
        }()

        // Correct amount of max letters in message && better chat
        !function ()
        {
            const inputWrapper = document.getElementsByClassName("chat-tpl")[0].children[5]
            inputWrapper.style.zIndex = "200"
            const inpchat = inputWrapper.children[0]
            inpchat.style.opacity = "0"
            inpchat.style.pointerEvents = "none"

            const textarea = document.createElement("textarea")
            textarea.id = "inpchat"
            textarea.placeholder = "Naciśnij Enter, aby porozmawiać"
            if (!window.chatPlusPlus.options.multiMsg)
                textarea.maxLength = 199

            const sendButton = document.querySelector(".section.chat-tpl .send-btn.right")
            const initSendButton = $._data(sendButton, "events").click[0].handler
            textarea.addEventListener("keypress", function (e)
            {
                if (e.key === "Enter")
                {
                    //TODO validate if it was really sent
                    textarea.blur()
                    if (textarea.value !== "")
                        initSendButton()
                }
            }, true)


            //move focus to our textarea
            inpchat.addEventListener("focusin", function ()
            {
                textarea.focus()
            })

            inputWrapper.prepend(textarea)


            const background = document.createElement("div")
            background.id = "textarea-background"
            inputWrapper.insertBefore(background, textarea)

            const backgroundUp = document.createElement("div")
            backgroundUp.id = "textarea-background-up"
            inputWrapper.insertBefore(backgroundUp, background)

            if (navigator.userAgent.endsWith("Firefox/52.0"))
                textarea.style.overflowX = "hidden"
            const css = `
                #inpchat {
                    position: absolute;
                    left: -94px;
                    color: #fff;
                    background: 0 0;
                    border: 0;
                    width: 205px;
                    outline: 0;
                    height: 19px;
                    resize: none;
                    padding: 0;
                    margin: 0;
                    white-space: nowrap;
                    overflow-x: scroll;
                    scrollbar-width: none;
                    bottom: 2px;
                }

                #inpchat.unfolded {
                    height: 124px;
                    line-height: 25.6px;
                    overflow-x: hidden;
                    white-space: pre-wrap;
                    scrollbar-width: thin;
                    padding: 4px;
                  }

                #textarea-background {
                    border-image: url(/img/gui/chat-srodek-powtarzalny.png) 0 111 0 104 round round;
                    border-style: solid;
                    border-width: 0 111px 0 104px;
                    background-color: #233316;
                    left: -104px;
                    position: absolute;
                    bottom: 18px;
                    height: 50px;
                    pointer-events: none;
                }
                #textarea-background-up {
                    border-image: url(/img/gui/chat-up.png) 14 111 0 104 fill repeat round;
                    border-style: solid;
                    border-width: 14px 111px 0 104px;
                    height: 60px;
                    position: absolute;
                    left: -104px;
                    bottom: 60px;
                    pointer-events: none;
                }
                
                .chat-size-1 #textarea-background, .chat-size-1 #textarea-background-up{
                    width: 33px;
                }
                .chat-size-2 #textarea-background, .chat-size-2 #textarea-background-up{
                    width: 290px;
                }
                
                .chat-size-1 #inpchat{
                    width: 211px;
                }
                .chat-size-2 #inpchat{
                    width: 463px;
                }


                .section.chat-tpl .send-btn.right {
                    z-index: 201;
                    }

            `

            const style = document.createElement("style")
            style.appendChild(document.createTextNode(css))
            document.head.appendChild(style)


            function checkColors()
            {
                const value = textarea.value.trim()

                const arr = value.split(" ")

                if (textarea.classList.contains("unfolded"))
                    textarea.className = "unfolded"
                else
                    textarea.className = ""
                textarea.style.color = ""
                if (arr[0][0] === "@")
                    textarea.style.color = realColors.priv
                else switch (arr[0])
                {
                    case "/g":
                    {
                        textarea.style.color = realColors.team
                        break
                    }
                    case "/k":
                    {
                        textarea.style.color = realColors.clant
                        break
                    }
                    case "*me":
                    case "/me":
                    {
                        textarea.classList.add("me")
                        break
                    }
                    case "*nar":
                    case "*nar1":
                    case "/nar":
                    {
                        textarea.classList.add("nar")
                        break
                    }
                    case "*nar2":
                    {
                        textarea.classList.add("nar2")
                        break
                    }
                    case "*nar3":
                    {
                        textarea.classList.add("nar3")
                        break
                    }
                    case "*dial":
                    case "*dial1":
                    {
                        textarea.classList.add("dial1")
                        break
                    }
                    case "*dial2":
                    {
                        textarea.classList.add("dial2")
                        break
                    }
                    case "*dial3":
                    {
                        textarea.classList.add("dial3")
                        break
                    }
                    case "*dial666":
                    {
                        textarea.classList.add("dial666")
                        break
                    }
                    case "*sys":
                    case "*map":
                    case "*light":
                    case "*addGraf":
                    case "*delGraf":
                    case "*hide":
                    case "*weather":
                    {
                        textarea.style.color = realColors.sys_comm
                        break
                    }
                }
            }


            const realColors = {
                priv: "#fc0",
                clant: "#ffa500",
                team: "#b554ff",
                sys_comm: "#f33"
            }

            function getRealCollors()
            {
                const chat = document.createElement("div")
                chat.className = "chat-message"
                chat.style.display = "none"
                const msg = document.createElement("div")
                chat.appendChild(msg)

                document.body.appendChild(chat)

                msg.className = "priv-in-general"
                realColors.priv = window.getComputedStyle(msg, null).color
                msg.className = "chat-message sys_red"
                realColors.sys_comm = window.getComputedStyle(msg, null).color
                msg.className = "clan-message"
                realColors.clant = window.getComputedStyle(msg, null).color
                msg.className = "group-message"
                realColors.team = window.getComputedStyle(msg, null).color
                document.body.removeChild(chat)
            }

            const style2 = document.createElement("style")
            document.head.appendChild(style2)

            function foldTextarea()
            {
                // const bg = document.getElementById("textarea-background")
                textarea.classList.remove("unfolded")
                background.style.display = "none"
                backgroundUp.style.display = "none"
                // bg.classList.remove("unfolded")

                style2.innerText = " #input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}"

                //fix to last supported version of firefox on Windows XP
                if (navigator.userAgent.endsWith("Firefox/52.0"))
                    textarea.style.overflowX = "hidden"
            }

            function unfoldTextarea()
            {

                //fix for strange bug that doesn't fold when it should
                if (textarea.value === "")
                    foldTextarea()
                else
                {
                    // const bg = document.getElementById("textarea-background")
                    textarea.classList.add("unfolded")
                    background.style.display = "block"
                    backgroundUp.style.display = "block"
                    // bg.classList.add("unfolded")

                    style2.innerText = ""
                }
            }

            function checkMaxLength()
            {
                if (textarea.value.length > 199)
                    textarea.value = textarea.value.substr(0, 199)
                const polishLetters = /[ąćęłńóśźż*@,. _]/gi
                let polishLettersCount = 0

                //calculate length every time, because we can change it inside
                for (let i = 0; i < textarea.value.length; i++)
                    if (textarea.value[i].match(polishLetters))
                    {
                        polishLettersCount++
                        textarea.value = textarea.value.substr(0, 199 - polishLettersCount)
                    }
                textarea.maxLength = 199 - polishLettersCount
            }

            function checkInputMsg()
            {
                const len = textarea.value.length

                //fixes bug when clicking enter to start chatting
                textarea.value = textarea.value.replace(/\r?\n/gi, "")

                //check maxLength
                if (!window.chatPlusPlus.options.multiMsg)
                    checkMaxLength()
                else
                    textarea.removeAttribute("maxLength")
                //check colors
                checkColors()
                //check length
                if (len > (textarea.style.width === "466px" ? 45 : 20))
                    unfoldTextarea()
                else
                    foldTextarea()
                if (!window.chatPlusPlus.options.multiMsg)
                    inpchat.value = textarea.value
                return textarea.value
            }


            function makeChatScalable()
            {
                textarea.addEventListener("focusout", foldTextarea, false)
                textarea.addEventListener("focusin", checkInputMsg, false)
            }

            makeChatScalable()

            function revokeChatScalable()
            {
                textarea.removeEventListener("focusout", foldTextarea, false)
                textarea.removeEventListener("focusin", checkInputMsg, false)
            }

            function saveInputMsg()
            {
                //save
                localStorage.setItem("lastInputedMsg", textarea.value)

            }

            //Change value of textarea when something changes value of input
            const inpchat_value = inpchat.value
            Object.defineProperty(inpchat, "value", {
                set(val)
                {
                    this.__value = val
                    if (textarea.value !== inpchat.value && !window.chatPlusPlus.blockTextareaChanging)
                        textarea.value = inpchat.value
                    return val
                },
                get()
                {
                    if (typeof this.__value === "undefined")
                        return inpchat_value
                    return this.__value
                }
            })


            //load saved message
            const savedMessage = localStorage.getItem("lastInputedMsg")
            if (savedMessage)
            {
                textarea.value = savedMessage
                //checkInputMsg()
            }


            getRealCollors()
            checkColors()

            textarea.addEventListener("input", checkInputMsg, false)
            textarea.addEventListener("input", saveInputMsg, false)
            checkInputMsg()

        }()


    }

    if (document.readyState === "complete")
        start()
    else
        window.addEventListener("load", start)
}()
