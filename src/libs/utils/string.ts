export const spliceZipCode: (code?: string) => string = (code = '') => {
    code = String(code)
    return `${code.slice(0, 3)}-${code.slice(3, 7)}`
}

export const clipTitle = (text: string) => {
    let title = text || '...'
    if (text?.length > 12) {
        title = (text || '').substring(0, 12) + '...'
    }
    return title
}

export const REGEX_PASSWORD =
    /^(?=.*[0-9])(?=.*[A-Z|a-z])(?=.*[\!\@\#\$\%\^\&\*\(\){\}[\]:\;\<\>\,\.\?\/~\_\+\-\=\\])[a-zA-Z0-9\!\@\#\$\%\^\&\*\(\){\}[\]:\;\<\>\,\.\?\/~\_\+\-\=\\]{8,255}$/

export const REGEX_PHONE_NUMBER = /^[0-9\-]{1,}[0-9\-]{0,15}$/
