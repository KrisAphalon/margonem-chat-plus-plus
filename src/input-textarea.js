// Recolors textarea to match it's color with color of command it starts with
// If textarea doesn't start with any valid command, then it resets color to default
import {common} from './main'
import {settings} from './settings'
import {addCustomStyle, removeCustomStyle} from './css-manager'

let textarea
let background
const chatColors = {
    priv: '#fc0',
    clant: '#ffa500',
    team: '#b554ff',
    sys_comm: '#f33'
}

/**
 * Changes chatColors object to have accurate colors as seen in chat
 */
function updateCommandsColors()
{
    const chat = document.createElement('div')
    if (INTERFACE === 'NI')
    {
        chat.className = 'chat-message'
    }
    else
    {
        chat.id = 'chattxt'
    }
    chat.style.display = 'none'
    const msg = document.createElement('div')
    chat.appendChild(msg)


    const classList = ['priv', 'sys_comm', 'clant', 'team']
    const classListLength = classList.length

    if (INTERFACE === 'NI')
    {
        document.body.appendChild(chat)
        const classListNI = ['priv-in-general', 'chat-message sys_red', 'clan-message', 'group-message']

        for (let i = 0; i < classListLength; i++)
        {
            const className = classListNI[i]
            msg.className = className
            chatColors[className] = window.getComputedStyle(msg).color
        }
    }
    else
    {
        const chatmsg = document.createElement('span')
        chatmsg.className = 'chatmsg'
        msg.appendChild(chatmsg)
        document.body.appendChild(chat)

        for (let i = 0; i < classListLength; i++)
        {
            const className = classList[i]
            msg.className = className
            chatColors[className] = window.getComputedStyle(chatmsg).color
        }
    }
    document.body.removeChild(chat)
}

/**
 * Takes part of image that is used for chat and creates image for background.
 * With this function textarea's background should look nice on all user themes.
 */
function applyCustomBackground(backgroundElm)
{
    const chat = document.createElement('div')
    chat.id = 'chat'
    chat.className = 'left'
    chat.style.display = 'none'
    document.body.appendChild(chat)
    const newImg = window.getComputedStyle(chat).backgroundImage
    document.body.removeChild(chat)
    if (backgroundElm.style.backgroundImage !== newImg)
        backgroundElm.style.backgroundImage = newImg
}

/**
 * Saves last input msg
 */
function saveInputMsg()
{
    localStorage.setItem('lastInputtedMsg', textarea.value)
}

function checkMaxLength(textarea)
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
    const input = document.getElementById('inpchat')
    if (INTERFACE === 'NI')
    {
        const len = textarea.value.length

        //fixes bug when clicking enter to start chatting
        textarea.value = textarea.value.replace(/\r?\n/gi, '')

        //check maxLength
        if (!settings.multiMsg)
            checkMaxLength(textarea)
        else
            textarea.removeAttribute('maxLength')
        //check colors
        recolorTextarea()
        //check length
        if (len > (textarea.style.width === '466px' ? 45 : 20))
            unfoldTextarea()
        else
            foldTextarea()
        if (!settings.multiMsg)
            input.value = textarea.value
        return textarea.value
    }
    else
    {
        const len = input.value.length

        //fixes bug when clicking enter to start chatting
        input.value = input.value.replace(/\r?\n/gi, '')

        //check maxLength
        if (!settings.multiMsg)
            checkMaxLength(textarea)
        else
            input.removeAttribute('maxLength')
        //check colors
        recolorTextarea()
        //check length
        if (g.chat.state === 3 || g.chat.state === '3')
        {
            if (len > 30)
                unfoldTextarea()
            else
                foldTextarea()
        }
        return input.value
    }
}

/**
 * Recolors textarea's text color according to message inside of it
 */
function recolorTextarea()
{
    const value = textarea.value.trim()

    const command = value.split(' ')[0]

    if (textarea.classList.contains('unfolded'))
        textarea.className = 'unfolded'
    else
        textarea.className = ''
    textarea.style.color = ''
    if (command[0] === '@')
        textarea.style.color = chatColors.priv
    else switch (command)
    {
        case '/g':
            textarea.style.color = chatColors.team
            break
        case '/k':
            textarea.style.color = chatColors.clant
            break
        case '*me':
        case '/me':
            textarea.classList.add('me')
            break
        case '*nar':
        case '*nar1':
        case '/nar':
            textarea.classList.add('nar')
            break
        case '*nar2':
            textarea.classList.add('nar2')
            break
        case '*nar3':
            textarea.classList.add('nar3')
            break
        case '*dial':
        case '*dial1':
            textarea.classList.add('dial1')
            break
        case '*dial2':
            textarea.classList.add('dial2')
            break
        case '*dial3':
            textarea.classList.add('dial3')
            break
        case '*dial666':
            textarea.classList.add('dial666')
            break
        case '*sys':
        case '*map':
        case '*light':
        case '*addGraf':
        case '*delGraf':
        case '*hide':
        case '*weather':
            textarea.style.color = chatColors.sys_comm
            break
    }
}

/**
 * Folds textarea hiding big message edit window
 */
function foldTextarea()
{
    if (INTERFACE === 'NI')
    {
        const scrollPanel = document.querySelector(':not([data-template=chat-tpl]) > .messages-wrapper > .scroll-pane')
        const background = document.getElementById('textarea-background')
        const backgroundUp = document.getElementById('textarea-background-up')
        textarea.classList.remove('unfolded')
        background.style.display = 'none'
        backgroundUp.style.display = 'none'
        scrollPanel.classList.remove('input-unfolded')
    }
    else
    {
        const bg = document.getElementById('textarea-background')
        textarea.classList.remove('unfolded')
        bg.classList.remove('unfolded')
    }
    addCustomStyle('hideInputScrollbar', '#input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}')
}

/**
 * Unfolds textarea showing big message edit window
 */
function unfoldTextarea()
{
    // fix for strange bug that doesn't fold when it should
    if (textarea.value === '')
        foldTextarea(textarea)
    else
    {
        if (INTERFACE === 'NI')
        {
            const scrollPanel = document.querySelector(':not([data-template=chat-tpl]) > .messages-wrapper > .scroll-pane')
            const background = document.getElementById('textarea-background')
            const backgroundUp = document.getElementById('textarea-background-up')
            textarea.classList.add('unfolded')
            background.style.display = 'block'
            backgroundUp.style.display = 'block'
            let scroll = false
            if (scrollPanel.scrollTop === scrollPanel.scrollHeight - scrollPanel.clientHeight) scroll = true
            scrollPanel.classList.add('input-unfolded')
            if (scroll) scrollPanel.scrollTop = scrollPanel.scrollHeight
        }
        else
        {
            const bg = document.getElementById('textarea-background')
            textarea.classList.add('unfolded')
            bg.classList.add('unfolded')
        }
        removeCustomStyle('hideInputScrollbar')
    }
}

function makeChatScalable(textarea)
{
    textarea.addEventListener('focusout', foldTextarea, false)
    textarea.addEventListener('focusin', checkInputMsg, false)
}

function revokeChatScalable(textarea)
{
    textarea.removeEventListener('focusout', foldTextarea, false)
    textarea.removeEventListener('focusin', checkInputMsg, false)
}

export function initInputColor()
{
    if (INTERFACE === 'NI')
    {
        const inputWrapper = document.getElementsByClassName('chat-tpl')[0].children[5]
        inputWrapper.style.zIndex = '200'
        const inpchat = inputWrapper.children[0]
        inpchat.style.opacity = '0'
        inpchat.style.pointerEvents = 'none'

        textarea = document.createElement('textarea')
        textarea.id = 'inpchat'
        textarea.placeholder = 'Naciśnij Enter, aby porozmawiać'
        if (!settings.multiMsg)
            textarea.maxLength = 199

        textarea.addEventListener('keypress', function (e)
        {
            if (e.key === 'Enter')
            {
                //TODO validate if it was really sent
                textarea.blur()
                if (textarea.value !== '') //initSendButton
                    Engine.chat.sendMessage(textarea.value)
            }
        }, true)

        //move focus to our textarea
        inpchat.addEventListener('focusin', function ()
        {
            textarea.focus()
        })

        inputWrapper.prepend(textarea)

        background = document.createElement('div')
        background.id = 'textarea-background'
        inputWrapper.insertBefore(background, textarea)

        const backgroundUp = document.createElement('div')
        backgroundUp.id = 'textarea-background-up'
        inputWrapper.insertBefore(backgroundUp, background)

        makeChatScalable(textarea)


        //Change value of textarea when something changes value of input
        const inpchat_value = inpchat.value
        Object.defineProperty(inpchat, 'value', {
            set(val)
            {
                this.__value = val
                if (textarea.value !== inpchat.value && !common.blockTextareaChanging)
                    textarea.value = inpchat.value
            },
            get()
            {
                if (typeof this.__value === 'undefined')
                    return inpchat_value
                return this.__value
            }
        })
        checkInputMsg()
    }
    else
    {
        const bottombar = document.getElementById('bottombar')
        const inpchat = document.getElementById('inpchat')
        inpchat.parentNode.removeChild(inpchat)

        background = document.createElement('div')
        background.id = 'textarea-background'
        bottombar.appendChild(background)

        textarea = document.createElement('textarea')
        textarea.id = 'inpchat'
        bottombar.appendChild(textarea)

        // This listener makes sure that unfolded textarea does not close immediately when clicked on.
        textarea.addEventListener('click', function (e)
        {
            e.stopPropagation()
        }, true)
        // This listener makes sure that user's char doesn't walk when selecting text on unfolded textarea.
        textarea.addEventListener('mousedown', function (e)
        {
            e.stopPropagation()
        }, true)


        const state = window.g.chat.state
        if (state === 3 || state === '3')
            makeChatScalable(textarea)
        else
        {
            foldTextarea()
            revokeChatScalable(textarea)
        }

        window.g.chat.__state = window.g.chat.state
        Object.defineProperty(window.g.chat, 'state', {
            set(val)
            {
                if (val === 3 || val === '3')
                    makeChatScalable(textarea)
                else
                    revokeChatScalable(textarea)

                this.__state = val
            },
            get()
            {
                return this.__state
            }
        })
    }

    // Fix for last available version of Firefox on Windows XP.
    // This fix is one of a kind, this script is not designed to work on older web browsers
    // It's only implemented because it's quick, easy and fixes massive problem.
    // (scrollbar that makes writing impossible)
    if (navigator.userAgent.endsWith('Firefox/52.0'))
        textarea.style.overflowX = 'hidden'


    textarea.addEventListener('input', checkInputMsg, false)
    textarea.addEventListener('input', saveInputMsg, false)

    updateCommandsColors()

    const savedMessage = localStorage.getItem('lastInputtedMsg')
    if (savedMessage)
    {
        textarea.value = savedMessage
        if (INTERFACE === 'SI')
        {
            document.getElementById('bottxt').style.display = 'block'
            textarea.style.opacity = '0'
        }
    }
    recolorTextarea()


    if (INTERFACE === 'SI')
    {
        textarea.addEventListener('focusout', function ()
        {
            const inpchat = document.getElementById('inpchat')
            if (inpchat.value === '')
            {
                document.getElementById('bottxt').style.display = 'block'
                inpchat.style.opacity = '0'
            }
        }, false)
        textarea.addEventListener('focusin', function ()
        {
            document.getElementById('bottxt').style.display = 'none'
            document.getElementById('inpchat').style.opacity = '1'
        }, false)

        if (!settings.multiMsg) textarea.maxLength = 199

        const check = function ()
        {
            updateCommandsColors()
            recolorTextarea()
            applyCustomBackground(background)
        }
        // I haven't found a great way of knowing if user theme has loaded.
        // For now it just checks stuff that it requires in one and two seconds after start
        setTimeout(check, 1000)
        setTimeout(check, 2000)

        // "Shair" theme is known for loading really long, so I added extra checks
        if (typeof window.shairModuleLoader === 'function' || document.getElementById('loading'))
        {
            const loading = document.getElementById('loading')
            if (window.getComputedStyle(loading, null).backgroundImage === 'url("https://i.imgur.com/1en4JTp.png")')
            {
                document.getElementById('textarea-background').style.left = '146px'
                document.getElementById('inpchat').style.left = '65px'
                setTimeout(check, 3000)
                setTimeout(check, 5000)
                setTimeout(check, 20000)
            }
        }
    }
}
