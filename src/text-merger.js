import {common, handleNoAnswer} from './main'
import {settings} from './settings'

const messages = {}

function parser(ch)
{
    const tab = ch.k
    const nick = ch.n
    const text = ch.t
    const time = ch.ts
    const command = ch.s
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

    //const allowed = ['nar', 'nar1', 'nar2', 'nar3', 'sys', 'me']
    const allowed = ['nar', 'nar2', 'nar3', 'sys_comm', 'me']
    const not_only_dots = /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g

    if (allowed.includes(command))
    {
        if (typeof messages[nick] !== 'undefined')
        {
            if (messages[nick][0] === tab && messages[nick][1] === command && time - messages[nick][3] < 3)
            {
                const chattxt = document.getElementById('chattxt')

                // count down so it should be faster
                for (let i = chattxt.children.length - 1; i >= 0; i--)
                {
                    if (chattxt.children[i].innerHTML === messages[nick][2])
                    {
                        const html_regexp = /(.*)<\/span>$/g
                        const html_match = html_regexp.exec(messages[nick][2])
                        if (html_match)
                        {
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
                                    if (common.sendArr[0].match(not_only_dots).length > 0)
                                        window.chatSendMsg(common.sendArr[0])
                                }, settings.messageTimeout)
                            if (common.sendArr.length > 1)
                                common.sendTimeout = setTimeout(handleNoAnswer, settings.messageTimeout * 3)

                            console.log(ch)
                            return true
                        }
                    }
                }
            }
        }
        const html_text = '<span></span><span class="chatmsg">' + text + '</span>'
        messages[nick] = [tab, command, html_text, time]
        return false
    }
    else
        return false
}

export function initTextMerger()
{
    if (INTERFACE === 'SI')
    {
        g.chat.parsers.push(parser)
    }
}

