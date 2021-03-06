import {saveSettings, settings} from './settings'
import {common, handleNoAnswer} from './main'
import {addSettingToPanel} from './panel'

let oldSendMsg

function deconstructSendArrPart(part)
{
    if (['/', '@', '*'].includes(part[0]))
    {
        if (part[0] === '*')
        {
            const split = part.split(' ')
            switch (split[0])
            {
                case '*me':
                case '*nar':
                case '*nar1':
                case '*nar2':
                case '*nar3':
                case '*sys':
                    split.shift()
                    return split.join(' ')
                case '*dial':
                case '*dial1':
                case '*dial2':
                case '*dial3':
                case '*dial666':
                {
                    const npcSplit = part.split(',')
                    npcSplit.shift()
                    return npcSplit.join(',')
                }
            }
        }
        else
        {
            const split = part.split(' ')
            split.shift()
            if (part[0] === '@')
                return deconstructSendArrPart(split.join(' '))
            else
                return split.join(' ')
        }
    }
    return part
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

function restoreMsg(e)
{
    e.preventDefault()
    const inpchat = document.getElementById('inpchat')
    let newChatValue = ''
    const len = common.sendArr.length
    if (len === 0)
        return false
    else if (len >= 1)
    {
        window.message('Przywracanie wiadomości...')
        newChatValue = common.sendArr[0].trim()
    }
    if (len > 1)
        for (let i = 1; i < len; i++)
        {
            const part = deconstructSendArrPart(common.sendArr[i]).trim()
            newChatValue += ' ' + part
        }
    console.log(newChatValue)
    inpchat.value = newChatValue
    return false
}


function parseMessageToChatForm(message)
{
    message = message.trim()
    // replace characters
    // message = message.replace(/[«»]/g, '')

    let split = message.split(' ')

    let retry = false
    if (message[0] === '/' || message[0] === '*')
    {
        let command = message.split(' ', 1)[0]
        switch (command)
        {
            case '/me':
                if (INTERFACE === 'NI')
                {
                    command = Engine.hero.nick
                }
                else
                {
                    command = hero.nick
                }
                break
            case '/g':
            case '/k':
                retry = true
            // falls through
            case '/nar':
            case '*me':
            case '*nar':
            case '*nar1':
            case '*nar2':
            case '*nar3':
            case '*sys':
                command = ''
                break
            case '*dial':
            case '*dial1':
            case '*dial2':
            case '*dial3':
            case '*dial666':
            {
                const npcNameSplit = message.split(',')
                const npcNameSplitSpace = npcNameSplit[0].split(' ')
                npcNameSplit.shift()
                split = npcNameSplit.join(',').split(' ')
                split.unshift('')
                npcNameSplitSpace.shift()
                const npcName = npcNameSplitSpace.join(' ')
                command = '«' + npcName + '»'
                break
            }
        }
        split.shift()
        if (command !== '')
            split.unshift(command)
    }
    else if (message[0] === '@')
    {
        retry = true
        split.shift()
    }
    message = ''
    //.join would sometimes produce multiple spaces in a row when messages can have only 1
    const len = split.length
    for (let i = 0; i < len; i++)
        if (split[i] !== '')
            message += split[i] + ' '
    message = message.trim()

    if (retry)
        return parseMessageToChatForm(message)
    else
        return message
}

const polishLetters = /[ąćęłńóśźż*@,. _]/gi

function calculateAddOnStart(msg)
{
    let addOnStart = ''
    const arr = msg.split(' ')
    if (arr.length > 1)
    {
        if (arr[0][0] === '*' || arr[0][0] === '/')
        {
            if ((arr[0][1] === 'k' || arr[0][1] === 'g') && arr[0][2] === undefined)
                addOnStart = '/'
            else
                addOnStart = '*'
            const command = arr[0].slice(1)
            addOnStart += command + ' '
            if (command.startsWith('dial'))
                addOnStart = msg.split(',')[0] + ', '
            //no bullshit with e.g. *le*n*n*gt*h

        }
        else if (arr[0][0] === '@')
            addOnStart = msg.split(' ')[0] + ' '

        //if it's command on specific channel or priv
        if (arr[1][0] === '*' &&
            (arr[0].startsWith('/k') || arr[0].startsWith('/g') || arr[0].startsWith('@'))
        )
        {
            const command = arr[1].slice(1)
            addOnStart += '*' + command + ' '
            if (command.startsWith('dial'))
                addOnStart = msg.split(',')[0] + ', '
        }
    }
    return addOnStart
}

function divideMessageToParts(msg, addOnStart, maxLen)
{
    let last_slice = 0
    let current = 0
    let last_space = 0
    let last_dot = 0

    //these two are needed to properly calculate char count when slicing message
    let chars_from_last_space = 0
    let chars_from_last_dot = 0

    for (let i = 0; i < msg.length; i++)
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

        if (msg[i] === ' ')
        {
            last_space = i
            chars_from_last_space = 0
        }
        else if (msg[i] === '.')
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
                    common.sendArr.push(msg.slice(0, last_space))
                else
                    common.sendArr.push(addOnStart + msg.slice(last_slice, last_space).trim())
                last_slice = last_space
                current = chars_from_last_space
            }
            else
            {
                let additional_shift = 0
                for (let j = 0; j < 5; j++)
                    if (msg[last_dot + j] === '.' || msg[last_dot + j] === ' ')
                        additional_shift++
                    else
                        break
                if (last_slice === 0)
                    common.sendArr.push(msg.slice(0, last_dot + additional_shift))
                else
                    common.sendArr.push(addOnStart + msg.slice(last_slice, last_dot + additional_shift).trim())
                last_slice = last_dot + additional_shift
                current = chars_from_last_dot
            }
            console.log(common.sendArr)
        }
    }
    if (msg !== '')
        if (last_slice === 0)
            common.sendArr.push(msg)
        else if (msg.slice(last_slice) !== '')
            common.sendArr.push(addOnStart + msg.slice(last_slice).trim())
}

function fixTextareaFolding()
{
    setTimeout(function ()
    {
        document.getElementById('inpchat').focus()
        document.getElementById('inpchat').blur()
    }, 100)
}

function chatSendMsg(msg)
{
    if (INTERFACE === 'NI') msg = document.getElementById('inpchat').value

    // replace hard spaces (alt + space) with normal one
    // eslint-disable-next-line no-irregular-whitespace
    msg = msg.replace(/ /g, ' ')
    msg = msg.replace(/[«»]/g, '')

    if (settings.multiMsg && msg !== '')
    {
        msg = msg.trim()
        const addOnStart = calculateAddOnStart(msg)

        //delete old sendArr if there was some problem (e.g. lost group chat)
        common.sendArr.splice(0)

        const maxLen = 195 - calcMargoLength(addOnStart)
        if (calcMargoLength(msg) > maxLen)
        {
            divideMessageToParts(msg, addOnStart, maxLen)

            const not_only_dots = /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g
            let chattxt
            if (INTERFACE === 'NI') chattxt = document.querySelector('.chat-tpl .messages-wrapper .scroll-pane')
            else chattxt = document.getElementById('chattxt')
            const mutation_config = {attributes: false, childList: true, subtree: false}

            const callback = function (mutationsList)
            {
                for (const mutation of mutationsList)
                {
                    const len = mutation.addedNodes.length
                    for (let i = 0; i < len; i++)
                    {
                        let message
                        if (INTERFACE === 'NI') message = mutation.addedNodes[i].children[2].innerText.trim()
                        else message = mutation.addedNodes[i].children[1].innerText.trim()

                        if (typeof common.sendArr[0] !== 'undefined')
                        {
                            console.log([
                                message.trim(),
                                parseMessageToChatForm(common.sendArr[0]),
                                message.trim() === parseMessageToChatForm(common.sendArr[0])
                            ])
                            if (message.trim() === parseMessageToChatForm(common.sendArr[0]))
                            {
                                clearTimeout(common.sendTimeout)
                                common.sendArr.shift()
                                if (common.sendArr.length > 0)
                                {
                                    setTimeout(function ()
                                    {
                                        if (common.sendArr[0].match(not_only_dots).length > 0)
                                            oldSendMsg(common.sendArr[0])
                                    }, settings.messageTimeout)

                                    if (common.sendArr.length > 1)
                                        common.sendTimeout = setTimeout(handleNoAnswer, settings.messageTimeout * 3)
                                }
                            }
                        }
                    }
                }
            }

            const observer = new MutationObserver(callback)
            observer.observe(chattxt, mutation_config)

            if (common.sendArr.length > 0)
            {
                oldSendMsg(common.sendArr[0])
                common.sendTimeout = setTimeout(handleNoAnswer, settings.messageTimeout * 3)
            }
            document.getElementById('inpchat').blur()

            //fix to not folding textarea
            fixTextareaFolding()
        }
        else
        {
            oldSendMsg(msg)
            //fix to not folding textarea
            fixTextareaFolding()
        }
    }
    else
    {
        oldSendMsg(msg)
        //fix to not folding textarea
        fixTextareaFolding()
    }
    if (INTERFACE === 'NI') document.getElementById('inpchat').value = ''
}

function toggleMultiMsg()
{
    settings.multiMsg = !settings.multiMsg
    saveSettings()
    return false
}


export function initMultiMsg()
{
    addSettingToPanel(
        'multiMsg',
        'MultiMsg',
        'Wysyłaj wiadomości dłuższe niż 200 znaków dzięki wykorzystaniu najnowszych nowinek technologi.',
        toggleMultiMsg
    )

    if (INTERFACE === 'NI')
    {
        oldSendMsg = Engine.chat.sendMessage.bind(Engine.chat)
        Engine.chat.sendMessage = chatSendMsg.bind(Engine.chat)

        document.querySelector('.chat-tpl .send-btn').addEventListener('contextmenu', restoreMsg)
        return Engine.chat.sendMessage
    }
    else
    {
        oldSendMsg = window.chatSendMsg
        window.chatSendMsg = chatSendMsg

        document.getElementById('botloc').addEventListener('contextmenu', restoreMsg)
        return window.chatSendMsg
    }
}
