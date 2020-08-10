import {addCustomStyle} from './css-manager'

let textHide = false

function toggleHide()
{
    if (INTERFACE === 'NI')
    {
        const chat = document.getElementsByClassName('section chat-tpl')[0]
        const scroll_pane = chat.children[4].children[1]
        const classesToHide = ['sys_info']
        const classesToHide2 = ['priv-in-general', 'group-in-general', 'clan-in-general', 'system-in-general']
        const classes2Length = classesToHide2.length
        const classesToNotHide = ['me', 'nar', 'nar2', 'nar3', 'dial1', 'dial2', 'dial3', 'dial666']

        const allchat_button = document.getElementsByClassName('tabs-wrapper connectedSortable ui-sortable')[0].children[0]
        if (allchat_button.classList.contains('active'))
        {
            const display = textHide ? '' : 'none'

            const len = scroll_pane.children.length
            for (let i = 0; i < len; i++)
            {
                if (classesToNotHide.indexOf(scroll_pane.children[i].classList[1]) < 0
                    && classesToNotHide.indexOf(scroll_pane.children[i].classList[2]) < 0
                    && classesToNotHide.indexOf(scroll_pane.children[i].classList[3]) < 0
                )
                {
                    if (classesToHide.indexOf(scroll_pane.children[i].classList[1]) >= 0)
                        scroll_pane.children[i].style.display = display
                    else
                    {
                        const len2 = scroll_pane.children[i].children.length
                        for (let j = 0; j < len2; j++)
                        {
                            for (let k = 0; k < classes2Length; k++)
                            {
                                if (scroll_pane.children[i].children[j].classList.contains(classesToHide2[k]))
                                {
                                    scroll_pane.children[i].style.display = display
                                    break
                                }
                            }

                        }
                    }
                }
            }
            textHide = !textHide
        }
    }
    else
    {
        const chattxt = document.getElementById('chattxt')
        const classesToHide = ['clant', 'syst', 'priv', 'priv2', 'sys_info', 'team']

        const display = textHide ? 'block' : 'none'

        const len = chattxt.children.length
        for (let i = 0; i < len; i++)
            if (classesToHide.indexOf(chattxt.children[i].className) >= 0)
                chattxt.children[i].style.display = display

        textHide = !textHide
    }
}

export function initChatCleaner()
{
    if (INTERFACE === 'NI')
    {
        const lagmeter = document.getElementsByClassName('lagmeter')[0]
        lagmeter.addEventListener('click', toggleHide)
        lagmeter.style.cursor = 'cell'
    }
    else
    {
        addCustomStyle('chatCleaner', '#msghider-button{position:\'absolute\';width:17px;height:21px;textAlign:center;cursor:cell}')

        const hideButton = document.createElement('div')
        hideButton.id = 'msghider-button'
        hideButton.addEventListener('click', toggleHide)
        document.getElementById('lagmeter').appendChild(hideButton)
    }
}
