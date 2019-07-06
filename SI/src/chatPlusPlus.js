window.addEventListener("load", function ()
{

    //options
    !function ()
    {
        window.chatPlusPlus = {
            options: {
                multiMsg: true,
                justifyChat: false
            }
        }
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
            const display = textHide ? "unset" : "none"

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
        const inpchat = document.getElementById("inpchat")
        inpchat.parentNode.removeChild(inpchat)

        const textarea = document.createElement("textarea")
        textarea.id = "inpchat"
        if (!window.chatPlusPlus.options.multiMsg)
            textarea.maxLength = 199
        textarea.addEventListener("click", function (e)
        {
            e.stopPropagation()
            e.target.focus()
        }, true)
        textarea.addEventListener("mousedown", function (e)
        {
            e.stopPropagation()
            e.target.focus()
        }, true)
        document.getElementById("bottombar").appendChild(textarea)

        function createTextareaBackground()
        {

            let bg = document.getElementById("textarea-background")
            let insert = false
            if (!bg)
            {
                insert = true
                bg = document.createElement("div")
                bg.id = "textarea-background"
            }
            const chat = document.createElement("div")
            chat.id = "chat"
            chat.className = "left"
            chat.style.display = "none"
            document.body.appendChild(chat)
            const newImg = window.getComputedStyle(chat, null).backgroundImage
            document.body.removeChild(chat)
            if (bg.style.backgroundImage !== newImg)
                bg.style.backgroundImage = newImg
            if (insert)
                document.getElementById("bottombar").insertBefore(bg, document.getElementById("inpchat"))
        }

        createTextareaBackground()


        if (navigator.userAgent.endsWith("Firefox/52.0"))
            document.getElementById("inpchat").style.overflowX = "hidden"
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


        function checkColors()
        {
            const input = document.getElementById("inpchat")

            const value = input.value.trim()

            const arr = value.split(" ")

            if (input.classList.contains("unfolded"))
                input.className = "unfolded"
            else
                input.className = ""
            input.style.color = ""
            if (arr[0][0] === "@")
                input.style.color = realCollors.priv
            else switch (arr[0])
            {
                case "/g":
                {
                    input.style.color = realCollors.team
                    break
                }
                case "/k":
                {
                    input.style.color = realCollors.clant
                    break
                }
                case "*me":
                case "/me":
                {
                    input.classList.add("me")
                    break
                }
                case "*nar":
                case "*nar1":
                case "/nar":
                {
                    input.classList.add("nar")
                    break
                }
                case "*nar2":
                {
                    input.classList.add("nar2")
                    break
                }
                case "*nar3":
                {
                    input.classList.add("nar3")
                    break
                }
                case "*dial":
                case "*dial1":
                {
                    input.classList.add("dial1")
                    break
                }
                case "*dial2":
                {
                    input.classList.add("dial2")
                    break
                }
                case "*dial3":
                {
                    input.classList.add("dial3")
                    break
                }
                case "*dial666":
                {
                    input.classList.add("dial666")
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
                    input.style.color = realCollors.sys_comm
                    break
                }
            }
        }


        const realCollors = {
            priv: "#fc0",
            clant: "#ffa500",
            team: "#b554ff",
            sys_comm: "#f33"
        }

        function getRealCollors()
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

            msg.className = "priv"
            realCollors.priv = window.getComputedStyle(chatmsg, null).color
            msg.className = "sys_comm"
            realCollors.sys_comm = window.getComputedStyle(chatmsg, null).color
            msg.className = "clant"
            realCollors.clant = window.getComputedStyle(chatmsg, null).color
            msg.className = "team"
            realCollors.team = window.getComputedStyle(chatmsg, null).color
            document.body.removeChild(chat)
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

        function checkMaxLength()
        {
            const input = document.getElementById("inpchat")
            if (input.value.length > 199)
                input.value = input.value.substr(0, 199)
            const polishLetters = /[ąćęłńóśźż*@,. _]/gi
            let polishLettersCount = 0

            //calculate length every time, because we can change it inside
            for (let i = 0; i < input.value.length; i++)
                if (input.value[i].match(polishLetters))
                {
                    polishLettersCount++
                    input.value = input.value.substr(0, 199 - polishLettersCount)
                }
            input.maxLength = 199 - polishLettersCount
        }

        function checkInputMsg()
        {
            const input = document.getElementById("inpchat")
            const len = input.value.length

            //fixes bug when clicking enter to start chatting
            input.value = input.value.replace(/\r?\n/gi, '')

            //check maxLength
            if (!window.chatPlusPlus.options.multiMsg)
                checkMaxLength()
            else
                input.removeAttribute('maxLength')
            //check colors
            checkColors()
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


        getRealCollors()
        checkColors()

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


        //this whole shit because shair is dumb
        if (typeof window.shairModuleLoader === "function" || document.getElementById('loading'))
        {
            const loading = document.getElementById('loading')
            if (window.getComputedStyle(loading, null).backgroundImage === 'url("https://i.imgur.com/1en4JTp.png")')
            {

                document.getElementById("textarea-background").style.left = "146px"
                document.getElementById("inpchat").style.left = "65px"
                setTimeout(function ()
                {
                    getRealCollors()
                    checkColors()
                    createTextareaBackground()
                }, 3000)
                setTimeout(function ()
                {
                    getRealCollors()
                    checkColors()
                    createTextareaBackground()
                }, 5000)
                setTimeout(function ()
                {
                    getRealCollors()
                    checkColors()
                    createTextareaBackground()
                }, 20000)
            }
        }
        //every motyw is dumb
        setTimeout(function ()
        {
            getRealCollors()
            checkColors()
            createTextareaBackground()
        }, 1000)
        setTimeout(function ()
        {
            getRealCollors()
            checkColors()
            createTextareaBackground()
        }, 2000)
    }()

//multiple msgs
    !function ()
    {
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

            if (typeof (window.chatSendMsg) === "function")
            {
                const oldSendMsg = window.chatSendMsg


                window.chatSendMsg = function (msg)
                {
                    if (window.chatPlusPlus.options.multiMsg && msg !== "")
                    {
                        msg = msg.trim()

                        const addOnStart = calculateAddOnStart(msg)

                        const sendArr = []
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
                        const not_only_dots = /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g

                        function sendPart(sendArray, number)
                        {
                            if (number === 0)
                            {
                                if (sendArray[number].match(not_only_dots))
                                    oldSendMsg(sendArray[number])

                                //fix to not folding textarea
                                setTimeout(function ()
                                {
                                    document.getElementById("inpchat").focus()
                                    document.getElementById("inpchat").blur()
                                }, 100)
                                sendPart(sendArray, number + 1)
                            }
                            else if (number < sendArray.length)
                                setTimeout(function ()
                                {
                                    if (sendArray[number].match(not_only_dots))
                                        oldSendMsg(sendArray[number])
                                    sendPart(sendArray, number + 1)
                                }, 2000)

                        }

                        if (sendArr.length > 0)
                            sendPart(sendArr, 0)
                        document.getElementById("inpchat").blur()

                    }
                    else
                        oldSendMsg(msg)
                }
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
            "ci pan"
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
                        copy = copy.split(e).join('X')

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
})
