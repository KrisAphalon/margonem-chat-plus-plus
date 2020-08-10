export const settings = {
    multiMsg: true,
    justifyChat: false,
    mergeMessages: true,
    messageTimeout: 2000
}

export function loadSettings()
{
    const rawData = localStorage.getItem('chatPlusPlus')
    if (rawData)
    {
        const data = JSON.parse(rawData)
        for (const prop in data)
            if (Object.prototype.hasOwnProperty.call(data, prop))
                settings[prop] = data[prop]
    }
    localStorage.setItem('chatPlusPlus', JSON.stringify(settings))
}

export function saveSettings()
{
    localStorage.setItem('chatPlusPlus', JSON.stringify(settings))
}
