// ==UserScript==
// @name         Chat Plus Plus
// @namespace    http://tampermonkey.net/
// @version      2.3.2
// @description  Makes game chat 200% better
// @author       Kris Aphalon
// @match        https://*.margonem.pl/
// @exclude https://www.margonem.pl/
// @exclude https://addons2.margonem.pl/
// @exclude https://forum.margonem.pl/
// ==/UserScript==

(function ()
{
    function start(version)
    {
        const arr = /interface=(..)/.exec(document.cookie)
        if (arr)
        {
            const gameInterface = arr[1]
            let src
            if (gameInterface === 'ni') src = 'https://cdn.jsdelivr.net/gh/KrisAphalon/margonem-chat-plus-plus@' + version + '/dist/chat-plus-plus-NI.js'
            else if (gameInterface === 'si') src = 'https://cdn.jsdelivr.net/gh/KrisAphalon/margonem-chat-plus-plus@' + version + '/dist/chat-plus-plus-SI.js'
            else
            {
                const errorMsg = 'Chat Plus Plus couldn\'t detect your interface.'
                error(errorMsg)
                console.error(errorMsg)
            }

            if (src)
            {
                let logText = 'Chat Plus Plus version: ' + version
                if (gameInterface === 'si') logText = '<span style="color:lime">' + logText + '</span>'
                log(logText)
                const script = document.createElement('script')
                script.src = src
                document.head.appendChild(script)
            }
        }
        else setTimeout(start, 500)
    }

    const request = new XMLHttpRequest()
    request.open('GET', 'https://raw.githubusercontent.com/KrisAphalon/margonem-chat-plus-plus/production/version', true)
    request.onload = function ()
    {
        if (this.status >= 200 && this.status < 400) start(this.response.toString())
        else console.error('Chat Plus Plus version check returned error: ' + this.status)
    }
    request.onerror = function ()
    {
        console.error('Chat Plus Plus version check returned error (connection)')
    }

    request.send()
})()
