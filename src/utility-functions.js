export function setNITipsInsideOf(element)
{
    // set tips the NI way
    $('[tip]', $(element)).each(function ()
    {
        const $this = $(this)
        $this.tip($this.attr('tip'))
    })
}
