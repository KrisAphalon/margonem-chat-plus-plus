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
            sendTimeout: {}
        }

        // Options
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

            document.getElementById("bchat").oncontextmenu = function ()
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
            const chattxt = document.getElementById("chattxt")
            const classesToHide = ["clant", "syst", "priv", "priv2", "sys_info", "team"]

            let textHide = false

            function toggleHide()
            {
                const display = textHide ? "block" : "none"

                const len = chattxt.children.length
                for (let i = 0; i < len; i++)
                    if (classesToHide.indexOf(chattxt.children[i].className) >= 0)
                        chattxt.children[i].style.display = display

                textHide = !textHide
            }


            const style = document.createElement("style")
            style.innerText = "#msghider-button{position:'absolute';width:17px;height:21px;textAlign:center;cursor:cell}"
            document.head.appendChild(style)

            const hideButton = document.createElement("div")
            hideButton.id = "msghider-button"
            hideButton.addEventListener("click", toggleHide)
            document.getElementById("lagmeter").appendChild(hideButton)
        }()

        // Correct amount of max letters in message && better chat
        !function ()
        {
            const bottombar = document.getElementById("bottombar")
            const inpchat = document.getElementById("inpchat")
            inpchat.parentNode.removeChild(inpchat)


            const background = document.createElement("div")
            background.id = "textarea-background"
            bottombar.appendChild(background)

            const textarea = document.createElement("textarea")
            textarea.id = "inpchat"
            bottombar.appendChild(textarea)

            // This listener makes sure that unfolded textarea does not close immediately when clicked on.
            textarea.addEventListener("click", function (e)
            {
                e.stopPropagation()
            }, true)
            // This listener makes sure that user's char doesn't walk when selecting text on unfolded textarea.
            textarea.addEventListener("mousedown", function (e)
            {
                e.stopPropagation()
            }, true)


            // Fix for last available version of Firefox on Windows XP.
            // This fix is one of a kind, this script is not designed to work on older web browsers
            // It's only implemented because it's quick, easy and fixes massive problem.
            // (scrollbar that makes writing impossible)
            if (navigator.userAgent.endsWith("Firefox/52.0"))
                textarea.style.overflowX = "hidden"


            const css = `
            #inpchat {
                bottom: 0;
                height: 17px;
                width: 312px;
                position: absolute;
                top: unset !important;
                left: 90px;
                background-repeat: repeat-y;
                background-position-y: -8px;
                line-height: 17px;
                resize: none;
                display: inline;
                padding: 0;
                margin: 0;
                white-space: nowrap;
                overflow-x: scroll;
                scrollbar-width: none;
                background-image: unset;
                font-size: 12px;
            }
            #lastmsg {
                pointer-events: none;
            }
            #inpchat.unfolded {
                height: 150px;
                line-height: 25.6px;
                background-position-y: 0;
                overflow-x: hidden;
                white-space: pre-wrap;
                scrollbar-width: thin;
            }
            #inpchat::-webkit-scrollbar {
                display: none;
            }
            #inpchat.unfolded::-webkit-scrollbar {
                display: block;
            }

            #bottombar {
                overflow: visible;
                z-index: 362;
            }

            #textarea-background {
                -webkit-transform: rotate(90deg);
                -moz-transform: rotate(90deg);
                -o-transform: rotate(90deg);
                -ms-transform: rotate(90deg);
                transform: rotate(90deg);
                width: 150px;
                height: 318px;
                position: absolute;
                left: 171px;
                bottom: -84px;
                background-position-y: -98px;
                display: none;
            }

            #textarea-background.unfolded {
                display: block;
            }

            #lagmeter, #botloc, #bchat, #pvpmode{
                z-index: 363;
            }

        `
            const style = document.createElement("style")
            style.appendChild(document.createTextNode(css))
            document.head.appendChild(style)

            //todo change name
            let realColors = {
                priv: "#fc0",
                clant: "#ffa500",
                team: "#b554ff",
                sys_comm: "#f33"
            }
            // Recolors textarea to match it's color with color of command it starts with
            // If textarea doesn't start with any valid command, then it resets color to default
            function recolorTextarea()
            {
                const value = textarea.value.trim()

                const command = value.split(" ")[0]

                if (textarea.classList.contains("unfolded"))
                    textarea.className = "unfolded"
                else
                    textarea.className = ""
                textarea.style.color = ""
                if (command[0] === "@")
                    textarea.style.color = realColors.priv
                else switch (command)
                {
                    case "/g":
                        textarea.style.color = realColors.team
                        break
                    case "/k":
                        textarea.style.color = realColors.clant
                        break
                    case "*me":
                    case "/me":
                        textarea.classList.add("me")
                        break
                    case "*nar":
                    case "*nar1":
                    case "/nar":
                        textarea.classList.add("nar")
                        break
                    case "*nar2":
                        textarea.classList.add("nar2")
                        break
                    case "*nar3":
                        textarea.classList.add("nar3")
                        break
                    case "*dial":
                    case "*dial1":
                        textarea.classList.add("dial1")
                        break
                    case "*dial2":
                        textarea.classList.add("dial2")
                        break
                    case "*dial3":
                        textarea.classList.add("dial3")
                        break
                    case "*dial666":
                        textarea.classList.add("dial666")
                        break
                    case "*sys":
                    case "*map":
                    case "*light":
                    case "*addGraf":
                    case "*delGraf":
                    case "*hide":
                    case "*weather":
                        textarea.style.color = realColors.sys_comm
                        break
                }
            }


            const style2 = document.createElement("style")
            document.head.appendChild(style2)

            function foldTextarea()
            {
                const input = document.getElementById("inpchat")
                const bg = document.getElementById("textarea-background")
                input.classList.remove("unfolded")
                bg.classList.remove("unfolded")

                style2.innerText = " #input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}"

                //fix to last supported version of firefox on Windows XP
                if (navigator.userAgent.endsWith("Firefox/52.0"))
                    input.style.overflowX = "hidden"
            }

            function unfoldTextarea()
            {
                const input = document.getElementById("inpchat")

                //fix for strange bug that doesn't fold when it should
                if (input.value === "")
                    foldTextarea()
                else
                {
                    const bg = document.getElementById("textarea-background")
                    input.classList.add("unfolded")
                    bg.classList.add("unfolded")

                    style2.innerText = ""
                }
            }

            //todo rename
            function checkMaxLength()
            {
                //cut text when it was pasted
                if (textarea.value.length > 199)
                    textarea.value = textarea.value.substr(0, 199)

                //letters and symbols that count as two when sending message to server
                const polishLetters = /[ąćęłńóśźż*@,. _]/gi

                let polishLettersCount = 0
                //calculate length every time, because we can change it inside for()
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
                const input = document.getElementById("inpchat")
                const len = input.value.length

                //fixes bug when clicking enter to start chatting
                input.value = input.value.replace(/\r?\n/gi, "")

                //check maxLength
                if (!window.chatPlusPlus.options.multiMsg)
                    checkMaxLength()
                else
                    input.removeAttribute("maxLength")
                //check colors
                recolorTextarea()
                //check length
                if (g.chat.state === 3 || g.chat.state === "3")
                {
                    if (len > 30)
                        unfoldTextarea()
                    else
                        foldTextarea()
                }
                return input.value
            }


            function makeChatScalable()
            {
                textarea.addEventListener("focusout", foldTextarea, false)
                textarea.addEventListener("focusin", checkInputMsg, false)
            }

            function revokeChatScalable()
            {
                textarea.removeEventListener("focusout", foldTextarea, false)
                textarea.removeEventListener("focusin", checkInputMsg, false)
            }

            function saveInputMsg()
            {
                //save
                const input = document.getElementById("inpchat")
                localStorage.setItem("lastInputedMsg", input.value)

            }


            const state = window.g.chat.state
            Object.defineProperty(window.g.chat, "state", {
                set(val)
                {
                    if (val === 3 || val === "3")
                        makeChatScalable()
                    else
                        revokeChatScalable()

                    this.__state = val
                    return val
                },
                get()
                {
                    if (typeof this.__state === "undefined")
                        return state
                    return this.__state
                }
            })

            //load saved message
            const savedMessage = localStorage.getItem("lastInputedMsg")
            if (savedMessage)
            {
                textarea.value = savedMessage
                //checkInputMsg()
                document.getElementById("bottxt").style.display = "block"
                document.getElementById("inpchat").style.opacity = "0"
            }


            getCommandsColors()
            recolorTextarea()

            if (g.chat.state === 3 || g.chat.state === "3")
                makeChatScalable()
            else
            {
                foldTextarea()
                revokeChatScalable()
            }

            textarea.addEventListener("input", checkInputMsg, false)
            textarea.addEventListener("input", saveInputMsg, false)
            textarea.addEventListener("focusout", function ()
            {
                const inpchat = document.getElementById("inpchat")
                if (inpchat.value === "")
                {
                    document.getElementById("bottxt").style.display = "block"
                    inpchat.style.opacity = "0"
                }
            }, false)
            textarea.addEventListener("focusin", function ()
            {
                document.getElementById("bottxt").style.display = "none"
                document.getElementById("inpchat").style.opacity = "1"
            }, false)


            // Returns colors that are set for different commands.
            function getCommandsColors()
            {
                const chat = document.createElement("div")
                chat.id = "chattxt"
                chat.style.display = "none"
                const msg = document.createElement("div")
                chat.appendChild(msg)
                const chatmsg = document.createElement("span")
                chatmsg.className = "chatmsg"
                msg.appendChild(chatmsg)
                document.body.appendChild(chat)

                const messageColors = {}

                const classList = ["priv", "sys_comm", "clant", "team"]
                const classListLength = classList.length
                for (let i = 0; i < classListLength; i++)
                {
                    const className = classList[i]
                    msg.className = className
                    messageColors[className] = window.getComputedStyle(chatmsg, null).color
                }
                document.body.removeChild(chat)

                return messageColors
            }

            // Takes part of image that is used for chat and creates image for background.
            // With this function textarea's background should look nice on all user themes.
            function applyCustomTextareaBackground()
            {
                const chat = document.createElement("div")
                chat.id = "chat"
                chat.className = "left"
                chat.style.display = "none"
                document.body.appendChild(chat)
                const newImg = window.getComputedStyle(chat, null).backgroundImage
                document.body.removeChild(chat)
                if (background.style.backgroundImage !== newImg)
                    background.style.backgroundImage = newImg
            }


            if (!window.chatPlusPlus.options.multiMsg)
                textarea.maxLength = 199


            // I haven't found a great way of knowing if user theme has loaded.
            // For now it just checks stuff that it requires in one and two seconds after start
            setTimeout(function ()
            {
                realColors = getCommandsColors()
                recolorTextarea()
                applyCustomTextareaBackground()
            }, 1000)
            setTimeout(function ()
            {
                realColors = getCommandsColors()
                recolorTextarea()
                applyCustomTextareaBackground()
            }, 2000)

            // "Shair" theme is known for loading really long, so I added extra checks
            if (typeof window.shairModuleLoader === "function" || document.getElementById("loading"))
            {
                const loading = document.getElementById("loading")
                if (window.getComputedStyle(loading, null).backgroundImage === "url(\"https://i.imgur.com/1en4JTp.png\")")
                {

                    document.getElementById("textarea-background").style.left = "146px"
                    document.getElementById("inpchat").style.left = "65px"
                    setTimeout(function ()
                    {
                        realColors = getCommandsColors()
                        recolorTextarea()
                        applyCustomTextareaBackground()
                    }, 3000)
                    setTimeout(function ()
                    {
                        realColors = getCommandsColors()
                        recolorTextarea()
                        applyCustomTextareaBackground()
                    }, 5000)
                    setTimeout(function ()
                    {
                        realColors = getCommandsColors()
                        recolorTextarea()
                        applyCustomTextareaBackground()
                    }, 20000)
                }
            }

        }()

//multiple msgs
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

            document.getElementById("botloc").addEventListener("contextmenu", function (e)
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
                window.message("Coś poszło nie tak i twoja wiadomość nie została wysłana na chat. Kliknij PPM na koordynaty by przywrócić resztę niewysłanej wiadomości.")
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

                if (typeof (window.chatSendMsg) === "function" && typeof window.chatPlusPlus.sendArr === "object")
                {
                    const oldSendMsg = window.chatSendMsg


                    window.chatSendMsg = function (msg)
                    {
                        if (window.chatPlusPlus.options.multiMsg && msg !== "")
                        {
                            msg = msg.trim()

                            const addOnStart = calculateAddOnStart(msg)

                            //delete old sendArr if there was some problem (e.g. lost group chat)
                            window.chatPlusPlus.sendArr = []
                            const sendArr = window.chatPlusPlus.sendArr
                            console.log(sendArr)
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
                                    command = hero.nick
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
                        console.log(split)
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

                    const chattxt = document.getElementById("chattxt")
                    const mutation_config = {attributes: false, childList: true, subtree: false}

                    const callback = function (mutationsList, observer)
                    {
                        for (const mutation of mutationsList)
                        {
                            const len = mutation.addedNodes.length
                            for (let i = 0; i < len; i++)
                            {
                                const message = mutation.addedNodes[i].children[1].innerText.trim()
                                if (typeof window.chatPlusPlus.sendArr[0] !== "undefined")
                                {
                                    //console.log(parseMessageToChatfrom(window.chatPlusPlus.sendArr[0]))
                                    //console.log(message.trim())
                                    //console.log(message.trim() === parseMessageToChatfrom(window.chatPlusPlus.sendArr[0]))
                                    if (message.trim() === parseMessageToChatfrom(window.chatPlusPlus.sendArr[0]))
                                    {
                                        clearTimeout(window.chatPlusPlus.sendTimeout)
                                        window.chatPlusPlus.sendArr.shift()
                                        if (window.chatPlusPlus.sendArr.length > 0)
                                        {
                                            console.log("adding next")
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
                    }
                    const observer = new MutationObserver(callback)
                    observer.observe(chattxt, mutation_config)
                }
                else
                    setTimeout(start, 1000)
            }
            start()
        }()

//autoMute catcher
        !function ()
        {
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
                "gnoju"
            ]
            const badWordsSpaceOnly = [
                "daj coś",
                "zje by",
                "zje, by",
                "zje. by",
                "zje b",
                "zje. b",
                "zje, b"
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
                "ęk urwał"
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
                if (typeof (window.chatSendMsg) === "function")
                {
                    const oldSendMsg = window.chatSendMsg
                    const alertUser = function (originalMsg, caughtMsg)
                    {
                        window.mAlert("Twoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br> " +
                            "Poniżej wiadomość, jaką widzi automute:<hr><span style='word-wrap: break-word'>" +
                            caughtMsg + "</span><hr>Czy mimo tego chcesz ją wysłać? Jeżeli wiadomość przejdzie bez " +
                            "gwiazdkowania wyślij wyjątek do Kris Aphalon#3484 na discordzie bądź na skrzynkę pocztową",
                            2, [function ()
                            {
                                oldSendMsg(originalMsg)
                            }, function ()
                            {
                                document.getElementById("inpchat").focus()
                                return false
                            }])
                    }

                    window.chatSendMsg = function (msg)
                    {
                        let copy = msg

                        //don't parse nick
                        if (copy[0] === "@")
                            copy = copy.slice(copy.indexOf(" "))

                        copy = copy.toLowerCase()


                        let innocent = true

                        //delete innocent Words
                        for (const e of innocentWords)
                            copy = copy.split(e).join("X")

                        //check for naughty phrases that require space
                        for (const e of badWordsSpaceOnly)
                            if (copy.includes(e))
                            {
                                /*wykryj zwroty które wymagają spacji*/
                                copy = copy.split(e).join("<span style='color: red; font-weight: bold'>" + e + "</span>")
                                innocent = false
                            }


                        //delete characters that aren't used to create words
                        copy = copy.replace(/[^a-zńąćśźżóęł]/g, "")
                        copy = removeDuplicates(copy)

                        for (const e of badWords)
                            if (copy.includes(e))
                            {
                                copy = copy.split(e).join("<span style='color: red; font-weight: bold'>" + e + "</span>")
                                innocent = false
                            }

                        if (innocent)
                            oldSendMsg(msg)

                        else
                            alertUser(msg, copy)
                    }
                }
                else
                    setTimeout(start, 1000)
            }
            start()
        }()


        //justify text
        !function ()
        {
            const scrollbar = document.getElementById("chatscrollbar")
            let timeout

            function onChatScroll()
            {
                clearTimeout(timeout)
                scrollbar.style.opacity = 1
                scrollbar.classList.add("moving")
                timeout = setTimeout(function ()
                {
                    scrollbar.style.opacity = 0
                    scrollbar.classList.remove("moving")
                }, 1000)
            }

            const css = `
            #chat.left #chatTxtContainer #chattxt {
                width: 253px;
                padding-left: 4px;
                text-align: justify;
            }

            #chatscrollbar {
                -webkit-transition: opacity 0.5s ease-out;
                -moz-transition: opacity 0.5s ease-out;
                transition: opacity 0.5s ease-out;
            }
            #chatscrollbar.moving {
                -webkit-transition: opacity 0.15s ease-out;
                -moz-transition: opacity 0.15s ease-out;
                transition: opacity 0.15s ease-out;
            }
            #chatscrollbar:hover {
                opacity: 1 !important;
                -webkit-transition: opacity 0.15s ease-out;
                -moz-transition: opacity 0.15s ease-out;
                transition: opacity 0.15s ease-out;
            }
        `
            const style = document.createElement("style")
            document.head.appendChild(style)


            if (window.chatPlusPlus.options.justifyChat)
            {
                style.appendChild(document.createTextNode(css))
                document.getElementById("chattxt").addEventListener("scroll", onChatScroll)
            }
            else
                style.innerHTML = ""

            document.getElementById("msghider-button").oncontextmenu = function ()
            {
                window.chatPlusPlus.options.justifyChat = !window.chatPlusPlus.options.justifyChat

                if (window.chatPlusPlus.options.justifyChat)
                {
                    style.appendChild(document.createTextNode(css))
                    document.getElementById("chattxt").addEventListener("scroll", onChatScroll)
                    scrollbar.style.opacity = 0
                }
                else
                {
                    style.innerHTML = ""
                    document.getElementById("chattxt").removeEventListener("scroll", onChatScroll)
                    scrollbar.style.opacity = 1
                }

                localStorage.setItem("chatPlusPlus", JSON.stringify(window.chatPlusPlus.options))
                message("Przełączono tryb wyrównywania wiadomości na: " +
                    (window.chatPlusPlus.options.justifyChat ? "justowanie" : "standardowy"))
                return false
            }
        }()

        //merge text into one
        !function ()
        {

            const messages = {}

            function parser(ch)
            {
                //console.log(ch)
                const tab = ch.k
                const nick = ch.n
                const text = ch.t
                const time = ch.ts

                const regexp = /^(?:[*/])((?:.)*?) (.*)/g
                const match = regexp.exec(text)

                //
                // when user uses /me command, response doesn't contain nick of user who wrote command
                // you can't distinguish between user "Kris Aphalon" and user "Kris" who wrote "Aphalon" as 1st word
                // therefore I won't be trying to fix this
                //

                /*
                if (ch.s === "me")
                {
                    const nick_regexp = /^((?:.)+?) {2}/g
                    const nick_match = nick_regexp.exec(text)
                    const new_nick = nick_match[1]
                    const html_text = "<span></span><span class=\"chatmsg\">" + text + "</span>"
                    console.error(html_text)
                    messages[new_nick] = [tab, "me", html_text, time]
                    console.warn(new_nick)
                    return false
                }

                 else*/
                if (match)
                {
                    //console.log(ch)
                    //console.log(match)
                    //TODO me
                    // const allowed = ["me", "nar", "nar1", "nar2", "nar3", "sys"]
                    const allowed = ["nar", "nar1", "nar2", "nar3", "sys", "me"]
                    const not_only_dots = /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g

                    //if command is in allowed
                    if (allowed.indexOf(match[1]) > -1)
                    {
                        let command = match[1]
                        const text_without_command = match[2]
                        switch (command)
                        {
                            case "nar1":
                                command = "nar"
                                break
                            case "sys":
                                command = "sys_comm"
                        }

                        if (typeof messages[nick] !== "undefined")
                        {
                            //console.warn(messages[nick])
                            //console.warn(time - messages[nick][3])
                            if (messages[nick][0] === tab && messages[nick][1] === command && time - messages[nick][3] < 3)
                            {
                                const chattxt = document.getElementById("chattxt")

                                //count down so it should be faster
                                for (let i = chattxt.children.length - 1; i >= 0; i--)
                                {
                                    //console.log(i);
                                    //console.table([chattxt.children[i].innerHTML, messages[nick][2]])
                                    if (chattxt.children[i].innerHTML === messages[nick][2])
                                    {
                                        //console.log("identico")
                                        const html_regexp = /(.*)<\/span>$/g
                                        const html_match = html_regexp.exec(messages[nick][2])
                                        //console.log(html_match)
                                        if (html_match)
                                        {
                                            const new_text = html_match[1] + " " + text_without_command + "</span>"
                                            chattxt.children[i].innerHTML = new_text
                                            messages[nick] = [tab, command, new_text, time]
                                            if (typeof window.NerthusAddonUtils !== "undefined")
                                                NerthusAddonUtils.log("[" + tab + "] " + nick + " -> " + text)
                                            else
                                                log("[" + tab + "] " + nick + " -> " + text)

                                            console.log("adding next")
                                            if (typeof window.chatPlusPlus.sendArr[0] !== "undefined")
                                                window.chatPlusPlus.sendArr.shift()
                                            if (window.chatPlusPlus.sendArr.length > 0)
                                                setTimeout(function ()
                                                {
                                                    if (window.chatPlusPlus.sendArr[0].match(not_only_dots).length > 0)
                                                        window.chatSendMsg(window.chatPlusPlus.sendArr[0])
                                                }, window.chatPlusPlus.options.messageTimeout)


                                            return true
                                        }


                                    }
                                }
                            }
                        }

                        const html_text = "<span></span><span class=\"chatmsg\">" + text_without_command + "</span>"
                        messages[nick] = [tab, command, html_text, time]
                        return false
                    }
                    else
                        return false
                }

                return false
            }

            g.chat.parsers.unshift(parser)
        }()
    }

    if (document.readyState === "complete")
        start()
    else
        window.addEventListener("load", start)

}()
