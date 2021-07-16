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

function sendMultiMsg(msg)
{
    msg = msg.trim()
    const addOnStart = calculateAddOnStart(msg)

    //delete old sendArr if there was some problem (e.g. lost group chat)
    common.sendArr.splice(0)

    const maxLen = 195 - calcMargoLength(addOnStart)
    if (calcMargoLength(msg) <= maxLen)
    {
        oldSendMsg(msg)
        fixTextareaFolding()
        return
    }
    divideMessageToParts(msg, addOnStart, maxLen)

    if (common.sendArr.length > 0)
    {
        oldSendMsg(common.sendArr[0])
        common.sendTimeout = setTimeout(handleNoAnswer, settings.messageTimeout * 3)
    }
    document.getElementById('inpchat').blur()
    fixTextareaFolding()
}

function chatSendMsg(msg)
{
    if (INTERFACE === 'NI')
    {
        const inpchat = document.getElementById('inpchat')
        msg = inpchat.value
        inpchat.value = ''
    }

    // replace hard spaces (alt + space) with normal one
    // eslint-disable-next-line no-irregular-whitespace
    msg = msg.replace(/ /g, ' ')
    msg = msg.replace(/[«»]/g, '')

    if (settings.multiMsg && msg !== '')
    {
        return sendMultiMsg(msg)
    }
    oldSendMsg(msg)
    fixTextareaFolding()
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
