import {default as badWords} from '../res/automute/bad-words.json'
import {default as badWordsWithSpace} from '../res/automute/bad-words-with-space.json'
import {default as falsePositivesWithPolishLetters} from '../res/automute/false-positives-with-polish-letters.json'
import {default as falsePositives} from '../res/automute/false-positives.json'
import {setDraggable} from './dragging'

let oldSendMsg


// removes duplicate letters from message
// "teeeeeets" changes to "tests"
function removeDuplicates(msg)
{
    if (msg.length === 0) return ''

    let copy = msg[0]
    let lastLetter = msg[0]
    for (let i = 1; i < msg.length; i++)
    {
        if (msg[i] !== lastLetter)
            copy = copy + msg[i]
        lastLetter = msg[i]
    }
    return copy
}

function testMessage(originalMsg, caughtMsg)
{
    const inpchatVal = document.querySelector('#inpchat').value

    let copy = originalMsg
    if (copy[0] === '@')
        copy = copy.slice(copy.indexOf(' '))

    const arr = caughtMsg.match(/<span style='color: red; font-weight: bold'>(.*)<\/span>/)
    if (arr && arr[1])
    {
        let start = copy.indexOf(arr[1])
        start = start > 20 ? start - 20 : 0
        let end = copy.indexOf(arr[1]) + arr[1].length
        end = end < copy.length + 20 ? end + 20 : copy.length - 1

        const subMsg = copy.substring(start, end)

        if (INTERFACE === 'NI')
        {
            document.querySelector('#inpchat').value = '/g ' + subMsg
            oldSendMsg()
        }
        else
        {
            oldSendMsg('@' + hero.nick.split(' ').join('_') + ' ' + subMsg)
        }
    }
    else
    {
        message('Coś poszło nie tak przy testowaniu. Wyślij wiadomość którą próbowałeś przetestować do Kris Aphalon na Discordzie')
    }

    document.querySelector('#inpchat').value = inpchatVal
    setTimeout(function ()
    {
        document.querySelector('#inpchat').value = inpchatVal
    }, 501) // workaround for deleting msg on SI
}

const TIP_SEND_NI = `
Wysyła podejrzaną część wiadomości na chat grupowy.
Jeżeli wiadomość zostanie zagwiazdkowana, to nie należy jej wysyłać.
Testuje tylko pierwsze zaczerwienione słowo w wiadomości.
`.trim()

const TIP_SEND_SI = `
Wysyła podejrzaną część wiadomości do samego siebie.
Jeżeli wiadomość zostanie zagwiazdkowana <b>lub nie pojawi się dwa razy</b> prawdopodobnie nie należy jej wysyłać.
Testuje tylko pierwsze zaczerwienione słowo w wiadomości.
`.trim()

const PANEL_HTML = `
<div class="header-label-positioner">
    <div class="header-label">
        <div class="left-decor"></div>
        <div class="right-decor"></div>
        <span class="panel-name">Automute Catcher</span>
    </div>
</div>
<div class="close-decor">
    <button class="close-button" tip="Zamknij"/>
</div>
<div class="background">
    <div class="top-box">
    </div>
    <div class="bottom-box">
        <button class="button text-button bottom-test">Przetestuj</button>
        <button class="button text-button bottom-send">Wyślij</button>
        <button class="button text-button bottom-close">Nie wysyłaj</button>
        <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a>
    </div>
</div>
`.trim()

function alertUser(originalMsg, caughtMsg, ahoj)
{
    if (document.getElementById('cpp-automute-panel')) return

    const alertMsg = ahoj
        ? `
Twoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br>
<span style="color:red">Zawiera ona zwrot "ahoj", który poprzedzony jest przez
dowolną literę "a". Tak, w ten sposób automute sprawdza czy jest to "przekleństwo".
Jeżeli chcesz wysłać tak czy siak, droga wolna.
Wiedz jednak, że akurat w tym przypadku nie ma pomyłek.</span>
`
        : `
Twoja wiadomość prawdopodobnie byłaby wyłapana przez automute, ale masz szczęście ;) <br>
Poniżej wiadomość, jaką widzi automute:<hr><span style="word-wrap: break-word; text-align: left;">
${caughtMsg}</span><hr>Czy mimo tego chcesz ją wysłać? Jeżeli wiadomość przejdzie bez
gwiazdkowania wyślij wyjątek do Kris Aphalon#3484 na discordzie bądź na skrzynkę pocztową
`

    const panel = document.createElement('div')
    setDraggable(panel)
    panel.id = 'cpp-automute-panel'
    panel.className = 'cpp-panel'
    panel.innerHTML = PANEL_HTML

    const whereToSend = INTERFACE === 'NI' ? TIP_SEND_NI : TIP_SEND_SI
    panel.querySelector('.bottom-test').setAttribute('tip', whereToSend)
    panel.querySelector('.top-box').innerHTML = alertMsg
    const deletePanel = function ()
    {
        document.body.removeChild(panel)
        document.getElementById('inpchat').focus()
    }
    panel.querySelector('#cpp-automute-panel .close-button').addEventListener('click', deletePanel)
    panel.querySelector('.bottom-close').addEventListener('click', deletePanel)
    panel.querySelector('.bottom-send').addEventListener('click', deletePanel)
    panel.querySelector('.bottom-send').addEventListener('click', function ()
    {
        oldSendMsg(originalMsg)
    })

    panel.querySelector('.bottom-test').addEventListener('click', function ()
    {
        testMessage(originalMsg, caughtMsg)
    })

    document.body.appendChild(panel)
    if (INTERFACE === 'NI')
    {
        // set tips the NI way
        $('[tip]', $(panel)).each(function ()
        {
            const $this = $(this)
            $this.tip($this.attr('tip'))
        })
    }
}

/**
 * @param {string} msg
 * @param {array} badWords
 * @returns {boolean|string} false or prepared HTML text with red matches
 */
function checkMessageForBadWords(msg, badWords)
{
    let innocent = true
    for (const e of badWords)
    {
        if (!msg.includes(e)) continue

        console.log('Wykryto zwrot który jest niemiły: ' + e)
        msg = msg.split(e).join('<span style=\'color: red; font-weight: bold\'>' + e + '</span>')
        innocent = false
    }
    if (innocent) return false
    return msg
}

function checkForMuteWordsThenSend(msg)
{
    let copy = msg

    //don't parse nick
    if (copy[0] === '@')
        copy = copy.slice(copy.indexOf(' '))

    copy = copy.toLowerCase()

    //delete innocent phrases
    for (const e of falsePositivesWithPolishLetters)
        copy = copy.split(e).join('X')

    //delete characters that aren't used to create words
    copy = copy.replace(/[^a-zńąćśźżóęł ]/g, '')
        .replace(/ą/g, 'a')
        .replace(/ę/g, 'e')
        .replace(/ł/g, 'l')
        .replace(/[żź]/g, 'z')
        .replace(/ó/g, 'o')
        .replace(/ń/g, 'n')
        .replace(/ć/g, 'c')
        .replace(/ś/g, 's')


    //check weird 'ahoj'
    const ahojRegex = /a(?=(?:.)*ahoj)(?!hoj.*ahoj)/g
    if (ahojRegex.test(copy))
    {
        alertUser(msg, '', true)
        return
    }

    //check for known phrases that get flagged as swear words
    let alertMsg = checkMessageForBadWords(copy, badWordsWithSpace)
    if (alertMsg) return alertUser(msg, alertMsg)

    //delete innocent phrases
    for (const e of falsePositives)
        copy = copy.split(e).join('X')

    copy = copy.replace(/ /g, '')
    copy = removeDuplicates(copy)

    alertMsg = checkMessageForBadWords(copy, badWords)
    if (alertMsg) return alertUser(msg, alertMsg)

    oldSendMsg(msg)
}


export function initAutomuteCatcher(sendMsg)
{
    oldSendMsg = sendMsg
    if (INTERFACE === 'NI')
    {
        Engine.chat.sendMessage = checkForMuteWordsThenSend.bind(Engine.chat)
    }
    else
    {
        window.chatSendMsg = checkForMuteWordsThenSend
    }
}
