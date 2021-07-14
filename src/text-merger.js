import {common, handleNoAnswer} from './main'
import {saveSettings, settings} from './settings'
import {addSettingToPanel} from './panel'

const messages = {}
const ALLOWED_COMMANDS = ['nar', 'nar2', 'nar3', 'sys_comm', 'me']
const NOT_ONLY_DOTS = /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g

function parseMessage(tab, nick, text, time, command)
{
    if (typeof messages[nick] === 'undefined') return false
    if (messages[nick][0] !== tab || messages[nick][1] !== command || time - messages[nick][3] > 5) return false

    const chattxt = document.getElementById('chattxt')
    // count down so it should be faster
    for (let i = chattxt.children.length - 1; i >= 0; i--)
    {
        if (chattxt.children[i].innerHTML !== messages[nick][2]) continue
        const html_regexp = /(.*)<\/span>$/g
        const html_match = html_regexp.exec(messages[nick][2])
        if (!html_match) continue

        const new_text = html_match[1] + ' ' + text + '</span>'
        chattxt.children[i].innerHTML = new_text
        messages[nick] = [tab, command, new_text, time]
        log('[' + tab + '] ' + nick + ' -> ' + text)

        window.clearTimeout(common.sendTimeout)
        if (typeof common.sendArr[0] !== 'undefined')
            common.sendArr.shift()
        if (common.sendArr.length > 0)
            setTimeout(function ()
            {
                if (common.sendArr[0].match(NOT_ONLY_DOTS).length > 0)
                    window.chatSendMsg(common.sendArr[0])
            }, settings.messageTimeout)
        if (common.sendArr.length > 1)
            common.sendTimeout = setTimeout(handleNoAnswer, settings.messageTimeout * 3)

        return true
    }
}

function parser(ch)
{
    if (!settings.mergeMessages) return false
    if (!ALLOWED_COMMANDS.includes(ch.s)) return false

    const tab = ch.k
    const nick = ch.n === '' ? ch.nick : ch.n // Handle Nerthus Addon
    const text = ch.t
    const time = ch.ts
    const command = ch.s
    const wasParsed = parseMessage(tab, nick, text, time, command)
    if (wasParsed) return true

    const html_text = `<span></span><span class="chatmsg">${text}</span>`
    messages[nick] = [tab, command, html_text, time]
    return false
    /*
    // when user uses /me command, response doesn't contain nick of user who wrote command
    // you can't distinguish between user "Kris Aphalon" and user "Kris" who wrote "Aphalon" as 1st word
    // therefore I won't be trying to fix this
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
    else
    */
}

function toggleMergeMessages()
{
    settings.mergeMessages = !settings.mergeMessages
    saveSettings()
    return false
}


export function initTextMerger()
{
    if (INTERFACE === 'SI')
    {
        g.chat.parsers.push(parser)

        addSettingToPanel(
            'mergeMessages',
            'Scalaj wiadomości',
            'Scala wizualnie wiadomości typu *me czy *nar jeżeli są one wysyłane z bardzo krótkim opóźnieniem.',
            toggleMergeMessages
        )
    }
}

