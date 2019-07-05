// ==UserScript==
// @name         Chat Plus Plus
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Makes game chat 200% better
// @author       Kris Aphalon
// @match        http://*.margonem.pl/
// ==/UserScript==


(function ()
{
    "use strict"
    function loadScript(scriptSrc)
    {
        const script = document.createElement("script")
        script.src = scriptSrc
        script.async = false
        document.head.appendChild(script)
    }
    loadScript("https://krisaphalon.github.io/margonem-chatPlusPlus/NI/src/chatPlusPlus.js")
})()
