import {default as badWords} from '../res/automute/bad-words.json'
import {default as badWordsWithSpace} from '../res/automute/bad-words-with-space.json'
import {default as falsePositivesWithPolishLetters} from '../res/automute/false-positives-with-polish-letters.json'
import {default as falsePositives} from '../res/automute/false-positives.json'

let oldSendMsg


// removes duplicate letters from message
// "teeeeeets" changes to "tests"
function removeDuplicates(msg)
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
    return ''
}

function alertUser(originalMsg, caughtMsg, ahoj)
{
    const alertMsg = ahoj
        ? `
Twoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br>
<span style="color:red">Zawiera ona zwrot "ahoj", który poprzedzony jest przez
dowolną literę "a". Tak, w ten sposób automute sprawdza czy jest to "przekleństwo".
Jeżeli chcesz wysłać tak czy siak, droga wolna.
Wiedz jednak, że akurat w tym przypadku nie ma pomyłek.</span>
`
        : `
Twoja wiadomość byłaby wyłapana przez automute, ale masz szczęście ;) <br>
Poniżej wiadomość, jaką widzi automute:<hr><span style="word-wrap: break-word">
${caughtMsg}</span><hr>Czy mimo tego chcesz ją wysłać? Jeżeli wiadomość przejdzie bez
gwiazdkowania wyślij wyjątek do Kris Aphalon#3484 na discordzie bądź na skrzynkę pocztową
`

    if (INTERFACE === 'NI')
    {
        window.mAlert(alertMsg, [
            {
                txt: 'Wyślij',
                callback: function ()
                {
                    oldSendMsg(originalMsg)
                    return true
                }
            },
            {
                txt: 'Nie wysyłaj',
                callback: function ()
                {
                    document.getElementById('inpchat').focus()
                    return true
                }
            }
        ])
    }
    else
    {
        window.mAlert(alertMsg,
            2, [function ()
            {
                oldSendMsg(originalMsg)
            }, function ()
            {
                document.getElementById('inpchat').focus()
                return false
            }])
    }
}

function checkForMuteWordsThenSend(msg)
{
    let copy = msg

    //don't parse nick
    if (copy[0] === '@')
        copy = copy.slice(copy.indexOf(' '))

    copy = copy.toLowerCase()


    let innocent = true
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
    }
    else
    {
        //check for known phrases that get flagged as swear words
        for (const e of badWordsWithSpace)
        {
            if (copy.includes(e))
            {
                console.log('Wykryto zwrot który jest niemiły: ' + e)
                copy = copy.split(e).join('<span style=\'color: red; font-weight: bold\'>' + e + '</span>')
                innocent = false
                break
            }
        }
        if (innocent)
        {
            //delete innocent phrases
            for (const e of falsePositives)
                copy = copy.split(e).join('X')


            copy = copy.replace(/ /g, '')
            copy = removeDuplicates(copy)

            for (const e of badWords)
                if (copy.includes(e))
                {
                    console.log('Wykryto zwrot który jest niemiły: ' + e)
                    copy = copy.split(e).join('<span style=\'color: red; font-weight: bold\'>' + e + '</span>')
                    innocent = false
                    break
                }
            if (innocent)
                oldSendMsg(msg)
            else
                alertUser(msg, copy)
        }
        else
            alertUser(msg, copy)
    }
}


export function initAutomuteCatcher(sendMsg)
{
    oldSendMsg = sendMsg
    if (INTERFACE === 'NI')
    {
        window.Engine.chat.sendMessage = checkForMuteWordsThenSend.bind(Engine.chat)
    }
    else
    {
        window.chatSendMsg = checkForMuteWordsThenSend
    }
}
