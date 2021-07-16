import {loadSettings} from './settings'
import {initMultiMsg} from './multi-msg'
import {initTextMerger} from './text-merger'
import {initInputColor} from './input-textarea'
import {loadBasicStyles} from './css-manager'
import {initPanel} from './panel'
import {initTextJustify} from './text-justify'
import {initChatCleaner} from './chat-cleaner'
import {initAutomuteCatcher} from './automute-catcher'
import {initInputFolding} from './input-folding'
import {initMultiMsgSender} from './multi-msg-sender'

export function handleNoAnswer()
{
    if (common.sendArr.length === 0) return

    if (!sessionStorage.noAnwserMsgDisplayed)
    {
        window.message('Coś poszło nie tak i twoja wiadomość nie została wysłana na chat. Kliknij PPM na koordynaty by przywrócić resztę niewysłanej wiadomości.\n Jeżeli wiadomość widnieje na chacie, zignoruj ten komunikat.')
        sessionStorage.noAnwserMsgDisplayed = true
    }
}


//TODO naming
export const common = {
    sendArr: [],
    sendTimeout: 0,
    blockTextareaChanging: false
}

function start()
{
    loadSettings()
    loadBasicStyles()

    initInputColor()
    initInputFolding()
    initChatCleaner()

    initMultiMsgSender()
    // Order of loading this two modules is crucial, do not reverse it.
    // Reversing it will break common.sendMsg chaining
    const sendMsg = initMultiMsg()
    initAutomuteCatcher(sendMsg)


    if (INTERFACE === 'SI')
    {
        initTextMerger()
        initTextJustify()
    }

    initPanel()
}

if (INTERFACE === 'NI')
{
    if (Engine && Engine.allInit)
    {
        start()
    }
    else
    {
        let started = false
        let _
        Object.defineProperty(Engine, 'allInit', {
            set(val)
            {
                _ = val
                if (val === true && !started)
                {
                    start()
                    started = true
                }
            },
            get()
            {
                return _
            }
        })
    }
}
else
{
    if (document.readyState === 'complete')
        start()
    else
        window.addEventListener('load', start)
}
