import {addCustomStyle, removeCustomStyle} from './css-manager'
import {textarea} from './input-textarea'

/**
 * Folds textarea hiding big message edit window
 */
function foldTextarea()
{
    if (INTERFACE === 'NI')
    {
        const scrollPanel = document.querySelector(':not([data-template=chat-tpl]) > .messages-wrapper > .scroll-pane')
        document.getElementById('textarea-background').style.display = 'none'
        document.getElementById('textarea-background-up').style.display = 'none'
        textarea.classList.remove('unfolded')
        scrollPanel.classList.remove('input-unfolded')
    }
    else
    {
        const bg = document.getElementById('textarea-background')
        textarea.classList.remove('unfolded')
        bg.classList.remove('unfolded')
    }
    addCustomStyle('hideInputScrollbar', '#input {-ms-overflow-style: none;} #inpchat::-webkit-scrollbar { display: none;}')
}

/**
 * Unfolds textarea showing big message edit window
 */
function unfoldTextarea()
{
    // fix for strange bug that doesn't fold when it should
    if (textarea.value === '')
    {
        foldTextarea(textarea)
        return
    }

    if (INTERFACE === 'NI')
    {
        const scrollPanel = document.querySelector(':not([data-template=chat-tpl]) > .messages-wrapper > .scroll-pane')
        document.getElementById('textarea-background').style.display = 'block'
        document.getElementById('textarea-background-up').style.display = 'block'
        textarea.classList.add('unfolded')
        let scroll = false
        if (scrollPanel.scrollTop === scrollPanel.scrollHeight - scrollPanel.clientHeight) scroll = true
        scrollPanel.classList.add('input-unfolded')
        if (scroll) scrollPanel.scrollTop = scrollPanel.scrollHeight
    }
    else
    {
        const bg = document.getElementById('textarea-background')
        textarea.classList.add('unfolded')
        bg.classList.add('unfolded')
    }
    removeCustomStyle('hideInputScrollbar')
}

function checkToUnfold()
{
    let maxSmallInputLength = 30
    if (INTERFACE === 'SI' && Number(g.chat.state) !== 3) return
    if (INTERFACE === 'NI')
    {
        maxSmallInputLength = textarea.style.width === '466px' ? 45 : 20
    }

    if (textarea.value.length > maxSmallInputLength) return unfoldTextarea()
    return foldTextarea()
}

function makeChatScalable(textarea)
{
    textarea.addEventListener('focusout', foldTextarea, false)
    textarea.addEventListener('focusin', checkToUnfold, false)
}

function revokeChatScalable(textarea)
{
    textarea.removeEventListener('focusout', foldTextarea, false)
    textarea.removeEventListener('focusin', checkToUnfold, false)
}

function initChatScalableChange()
{
    window.g.chat.__state = window.g.chat.state
    Object.defineProperty(window.g.chat, 'state', {
        set(val)
        {
            if (val === 3 || val === '3')
                makeChatScalable(textarea)
            else
                revokeChatScalable(textarea)

            this.__state = val
        },
        get()
        {
            return this.__state
        }
    })
}

export function initInputFolding()
{
    textarea.addEventListener('input', checkToUnfold, false)
    if (INTERFACE === 'NI')
    {
        makeChatScalable(textarea)
    }
    else
    {
        const state = window.g.chat.state
        if (state === 3 || state === '3')
            makeChatScalable(textarea)
        else
        {
            foldTextarea()
            revokeChatScalable(textarea)
        }
        initChatScalableChange()
    }
}
