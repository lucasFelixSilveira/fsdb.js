const fetch = require('node-fetch')
const console_ = require('fsdb.js/utils/console.js')
module.exports = (element, folder, props, functions) => {
    return new Promise((resolve, reject) => {
        try {
            fetch('https://fsdb.tk/cdn/'+element.hash+'.'+element.format, {
                method: 'GET',
            }).then(res => res.json()).then(
                res => {
                    if( res.status !== 200 ) return console_.error('This image is invalid')
                    else {
                        const url = res.url;
                        const json = {
                            getURL: () => {
                                const url_ = url;
                                return new Promise((resolve_, reject_) => {
                                    resolve_(url_)
                                })
                            },
                            status: 200
                        }
                        return resolve(json)
                    }
                }
            )
        } catch (er) {
            console_.error('Fails to get the image')
            reject(er)
        }
    })
}