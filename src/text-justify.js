import {saveSettings, settings} from './settings.js'
import {addSettingToPanel} from './panel.js'
import {addCustomStyle, removeCustomStyle} from './css-manager.js'

const scrollbar = document.getElementById('chatscrollbar')
let timeout

function onChatScroll()
{
    clearTimeout(timeout)
    scrollbar.style.opacity = 1
    scrollbar.classList.add('moving')
    timeout = setTimeout(function ()
    {
        scrollbar.style.opacity = 0
        scrollbar.classList.remove('moving')
    }, 1000)
}

const css = `
#chat.left #chatTxtContainer #chattxt {
    width: 253px;
    padding-left: 4px;
    text-align: justify;
}

#chatscrollbar {
    -webkit-transition: opacity 0.5s ease-out;
    -moz-transition: opacity 0.5s ease-out;
    transition: opacity 0.5s ease-out;
}
#chatscrollbar.moving {
    -webkit-transition: opacity 0.15s ease-out;
    -moz-transition: opacity 0.15s ease-out;
    transition: opacity 0.15s ease-out;
}
#chatscrollbar:hover {
    opacity: 1 !important;
    -webkit-transition: opacity 0.15s ease-out;
    -moz-transition: opacity 0.15s ease-out;
    transition: opacity 0.15s ease-out;
}
`

function toggleJustify()
{
    settings.justifyChat = !settings.justifyChat

    if (settings.justifyChat)
    {
        addCustomStyle('justify', css)
        document.getElementById('chattxt').addEventListener('scroll', onChatScroll)
        scrollbar.style.opacity = '0'
    }
    else
    {
        removeCustomStyle('justify')
        document.getElementById('chattxt').removeEventListener('scroll', onChatScroll)
        scrollbar.style.opacity = '1'
    }

    saveSettings()
    return false
}

export function initTextJustify()
{
    if (INTERFACE === 'SI')
    {
        if (settings.justifyChat)
        {
            addCustomStyle('justify', css)
            document.getElementById('chattxt').addEventListener('scroll', onChatScroll)
        }
        addSettingToPanel(
            'justifyChat',
            'Justowanie czatu',
            'Inny wygląd rozszerzonego czatu. Znikający scrollbar oraz wyjustowany text.',
            toggleJustify
        )
    }
}
