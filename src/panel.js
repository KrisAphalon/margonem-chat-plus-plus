import {setDraggable} from './dragging'
import {settings} from './settings'
import {setNITipsInsideOf} from './utility-functions'


const settingsElms = []
const callbacks = {}

export function addSettingToPanel(settingName, translation, tip, callback)
{
    const checked = settings[settingName] ? ' checked' : ''

    const setting = `html
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

const PANEL_HTML = `html
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
    <div class="settings-box"></div>
    <div class="bottom-box">
        <button class="button text-button bottom-close">OK</button>
        <a href="https://www.buymeacoffee.com/krisaphalon" target="_blank"><button class="button donate-button" tip="Wesprzyj mnie"><span>♥</span></button></a>
    </div>
</div>
`

export function showPanel(e)
{
    e.preventDefault()
    if (document.getElementById('cpp-panel')) return

    const panel = document.createElement('div')
    setDraggable(panel)
    panel.id = 'cpp-panel'
    panel.className = 'cpp-panel'
    panel.innerHTML = PANEL_HTML
    panel.querySelector('.settings-box').innerHTML = settingsElms.join('')

    const deletePanel = () => document.body.removeChild(panel)
    panel.querySelector('#cpp-panel .close-button').addEventListener('click', deletePanel)
    panel.querySelector('.bottom-close').addEventListener('click', deletePanel)
    panel.querySelector('.bottom-close').addEventListener('click', () => message('Zapisano!'))

    for (const settingName in callbacks)
    {
        const input = panel.querySelector(`#cpp-setting-${settingName}`)
        input.checked = settings[settingName]
        input.addEventListener('input', callbacks[settingName])
    }
    document.body.appendChild(panel)
    if (INTERFACE === 'NI')
        setNITipsInsideOf(panel)
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
