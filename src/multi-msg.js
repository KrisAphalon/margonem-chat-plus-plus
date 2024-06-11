import {common, handleNoAnswer} from './main.js'
import {addSettingToPanel} from './panel.js'
import {saveSettings, settings} from './settings.js'
import {regexIndexOf} from './utility-functions.js'

const polishLetters = /[ąćęłńóśźż@]/gi // @ is strange, can't really test it
let oldSendMsg

function deconstructSendArrPart(part)
{
    if (!['/', '@', '*'].includes(part[0])) return part

    let split = part.split(' ')

    if (part[0] === '*' && split[0].includes('dial'))
    {
        split = part.split(',')
    }
    split.shift()
    if (part[0] === '@')
        return deconstructSendArrPart(split.join(' '))

    return split.join(' ')
}

function calcMargoLength(string)
{
    const match = string.match(polishLetters)
    if (match)
        return string.length + match.length

    return string.length
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

function calculateAddOnStartAsterix(arr, commandIndex)
{
    // force first letter to be asterix in case of /me
    if (arr[commandIndex][0] !== '*') arr[commandIndex] = '*' + arr[commandIndex].substr(1)

    if (arr[commandIndex].startsWith('*dial') || arr[commandIndex].startsWith('*lang'))
    {
        const arrStartingAtCommand = arr.slice(commandIndex)
        return arrStartingAtCommand.join(' ').split(',')[0] + ', '
    }
    return arr[commandIndex] + ' '
}

function calculateAddOnStart(msg)
{
    const arr = msg.split(' ')
    if (arr.length <= 1) return ''

    let addOnStart = ''
    if (msg.startsWith('@') || ['/k', '/g'].includes(arr[0])) addOnStart = arr[0] + ' '
    if (msg.startsWith('*') || msg.startsWith('/me'))
    {
        addOnStart = calculateAddOnStartAsterix(arr, 0)
    }

    if (addOnStart && !addOnStart.startsWith('*') && arr[1].startsWith('*'))
    {
        addOnStart += calculateAddOnStartAsterix(arr, 1)
    }

    return addOnStart
}

function getSplitCandidate(str, idx, maxLength)
{
    const dotPos = regexIndexOf(str, /[!?.] /, Math.floor(maxLength / 2))
    if (dotPos >= 0)
        return dotPos + 2

    const spacePos = str.lastIndexOf(' ')
    if (spacePos >= 0)
        return spacePos + 1

    return idx
}

function getIdx(msg, maxLength)
{
    let idx = 0
    for (let i = 0; i < maxLength; i++)
    {
        idx++
        if (idx >= msg.length) break
        if (msg[idx].match(polishLetters)) i++
    }
    return idx
}

function splitAndFormatLines(msg, prefix, maxLength)
{
    maxLength -= calcMargoLength(prefix)

    const ret = []
    while (msg.length > 0)
    {
        const idx = getIdx(msg, maxLength)
        const substr = msg.substring(0, idx)
        const split = calcMargoLength(msg) > maxLength ? getSplitCandidate(substr, idx, maxLength) : msg.length
        ret.push(prefix + substr.substring(0, split).trim())
        msg = msg.slice(split)
    }

    return ret
}

function divideMessageToParts(msg, prefix, maxLength)
{
    if (msg === '') return

    msg = msg.substring(prefix.length)
    const arr = splitAndFormatLines(msg, prefix, maxLength)
    console.log(arr)
    for (let msg of arr)
    {
        common.sendArr.push(msg)
    }
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

    // delete old sendArr if there was some problem (e.g. lost group chat)
    common.sendArr.splice(0)

    const maxLen = 197
    if (calcMargoLength(msg) <= maxLen)
    {
        oldSendMsg(msg)
        fixTextareaFolding()
        return
    }
    divideMessageToParts(msg, addOnStart, maxLen)

    // replace the *me prefix back to /me for the first part if message started with /me
    if (msg.startsWith('/me'))
    {
        common.sendArr[0] = common.sendArr[0].replace(/^.{3}/, '/me')
    }

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
