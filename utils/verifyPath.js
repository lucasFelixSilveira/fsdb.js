const color = require('ansi-256-colors')
module.exports = (path) => {
    return new Promise((resolve, reject) => {
        function er() {
            return `Characters such as: ${color.fg.getRgb(4,0,0)} . $ # { } [ ] ! ( ) * & % @ ... ${color.reset} They are not allowed.`
        }
        const perms = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_/'
        const perms_ = perms.split('')
        path.split('').forEach(async (item, index) => {
            if(! perms_.includes(item) ) return resolve(er())
            if( index == ( path.split('').length - 1 ) ) resolve(false)
        })
    })
}