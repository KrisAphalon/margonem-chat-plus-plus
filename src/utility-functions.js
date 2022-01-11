export function setNITipsInsideOf(element)
{
    // set tips the NI way
    $('[tip]', $(element)).each(function ()
    {
        const $this = $(this)
        $this.tip($this.attr('tip'))
    })
}

export function regexIndexOf(string, regex, startPos)
{
    const indexOf = string.substring(startPos || 0).search(regex)
    return (indexOf >= 0) ? (indexOf + (startPos || 0)) : indexOf
}
