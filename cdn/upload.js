const fetch = require('node-fetch')
const console_ = require('../utils/console.js')
const fs = require('fs')
module.exports = ({directory, fileFormat2}, props, functions) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(directory, (err, data) => {
                let fileFormat = fileFormat2
                const format = fileFormat;
                if( fileFormat == 'jpg' || fileFormat == 'jpeg' ) fileFormat = 'jpeg'
                else if( fileFormat == 'png' ) fileFormat = 'png'
                else if( fileFormat == 'gif' ) fileFormat = 'gif'
                else return console_.error('File format is invalid')
                const imageBuffer = data.toString('base64')
                fetch(`https://fsdb.tk/cdn/upload`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        buff: imageBuffer,
                        format: format
                    })
                }).then(res => res.json()).then(
                    res => {
                        return resolve(res)
                    }
                )
            })
        } catch (er) {
            console_.error('Fails to get the image')
            reject(er)
        }
    })
}