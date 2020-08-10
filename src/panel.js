import {setDraggable} from './dragging'
import {settings} from './settings'


const settingsElms = []
const callbacks = {}

export function addSettingToPanel(settingName, translation, tip, callback)
{
    const checked = settings[settingName] ? ' checked' : ''

    const setting = `
<label class="setting-label">
    <span class="setting-label-text" tip="${tip}">${translation}</span>
    <input class="setting-checkbox" id="cpp-setting-${settingName}" name="${settingName}" type="checkbox" ${checked}>
    <span class="checkbox-outline">
        <span class="checkmark">
        <div class="checkmark-stem"></div>
        <div class="checkmark-kick"></div>
    </span>
    </span>
</label>
`
    settingsElms.push(setting)
    callbacks[settingName] = callback
}

export function showPanel(e)
{
    e.preventDefault()
    console.log('???')
    if (!document.getElementById('cpp-panel'))
    {
        const panel = document.createElement('div')
        setDraggable(panel)
        panel.id = 'cpp-panel'
        panel.innerHTML = `
<div class="header-label-positioner">
    <div class="header-label">
        <div class="left-decor"></div>
        <div class="right-decor"></div>
        <span class="panel-name">Chat Plus Plus</span>
    </div>
</div>
<div class="close-decor">
    <button class="close-button" tip="Zamknij"/>
</div>
<div class="background">
    <div class="settings-box">
    ${settingsElms.join('')}
    </div>
    <div class="bottom-box">
        <button class="button text-button save-button">Zapisz</button>
        <button class="button text-button cancel-button">Anuluj</button>
    </div>
</div>
`
        panel.querySelector('#cpp-panel .close-button').addEventListener('click', function ()
        {
            document.body.removeChild(panel)
        })

        for (const settingName in callbacks)
        {
            const input = panel.querySelector(`#cpp-setting-${settingName}`)
            input.checked = settings[settingName]
            input.addEventListener('input', function ()
            {
                callbacks[settingName]()
            })
        }
        document.body.appendChild(panel)
    }
}

export function initPanel()
{
    if (INTERFACE === 'NI')
    {
        document.getElementsByClassName('lag')[0].addEventListener('contextmenu', showPanel)
    }
    else
    {
        document.getElementById('bchat').addEventListener('contextmenu', showPanel)
    }
}
