// ==UserScript==
// @name         Chat Plus Plus
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Makes game chat 200% better
// @author       Kris Aphalon
// @match        http://*.margonem.pl/
// ==/UserScript==


(function ()
{
    "use strict"

    function getCookie(cname)
    {
        const name = cname + "="
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++)
        {
            let c = ca[i]
            while (c.charAt(0) === ' ')
                c = c.substring(1)
            if (c.indexOf(name) === 0)
                return c.substring(name.length, c.length)
        }
        return ""
    }

    function loadScript(scriptSrc)
    {
        const script = document.createElement("script")
        script.src = scriptSrc
        script.async = false
        document.head.appendChild(script)
    }

    if (getCookie("interface") === "ni")
        loadScript("https://krisaphalon.github.io/margonem-chat-plus-plus/NI/src/chatPlusPlus.js")
    else
        loadScript("https://krisaphalon.github.io/margonem-chat-plus-plus/SI/src/chatPlusPlus.js")
})()
