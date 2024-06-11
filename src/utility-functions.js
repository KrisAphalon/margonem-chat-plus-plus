import {CHANNEL_MAPPINGS, CHANNELS} from './constants.js'

export function setNITipsInsideOf(element)
{
    // set tips the NI way
    $('[tip]', $(element)).each(function ()
    {
        const $this = $(this)
        $this.tip($this.attr('tip'))
    })
}

export function regexIndexOf(string, regex, startPos)
{
    const indexOf = string.substring(startPos || 0).search(regex)
    return (indexOf >= 0) ? (indexOf + (startPos || 0)) : indexOf
}

export function sanitizeText(text)
{
    const element = document.createElement('div')
    element.innerText = text
    return element.innerHTML
}

/**
 *
 * @param msg {string} Message in SI format
 */
export function sendMessage(msg)
{
    if (msg.startsWith('@'))
    {
        const nick = msg.split(' ')[0].substring(1)
        msg = msg.split(' ')
        msg.shift()
        msg = msg.join(' ')
        window._g(`chat&channel=personal&receiver=${nick}`, false, {c: msg})
        return
    }
    if (CHANNELS[msg.substring(0, 3)])
    {
        window._g(`chat&channel=${CHANNELS[msg.substring(0, 3)]}`, false, {c: msg.substring(3)})
        return
    }
    window._g('chat&channel=local', false, {c: msg})
}

export function getSiMessageFormat(message)
{
    if (INTERFACE === 'SI')
    {
        return message
    }
    
    const channelName = document.querySelector('.chat-input-wrapper .card-name').innerText
    if (channelName === 'Prywatny')
    {
        const receiverName = document.querySelector('.chat-input-wrapper .private-nick').innerText.replaceAll(' ', '_')
        return `@${receiverName} ${message}`
    }
    if (CHANNEL_MAPPINGS[channelName])
    {
        return `${CHANNEL_MAPPINGS[channelName]} ${message}`
    }
    return message
}