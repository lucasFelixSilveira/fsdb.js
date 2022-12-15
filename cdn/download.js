const fetch = require('node-fetch')
const console_ = require('../utils/console.js')
const axios = require('axios')
const fs = require('fs')
module.exports = (element, folder, typeUrl, props, functions) => {
    return new Promise((resolve, reject) => {
        try {
            if( typeUrl == false ) {
                fetch('https://fsdb.tk/cdn/'+element.hash+'.'+element.format, {
                    method: 'GET',
                }).then(res => res.json()).then(
                    res => {
                        if( res.status !== 200 ) return console_.error('This image is invalid')
                        else {
                            axios({
                                metohd: 'GET',
                                url: res.url,
                                responseType: 'stream'
                            }).then(response => {
                                new Promise((resolve_, reject_) => {
                                    response.data.pipe(fs.createWriteStream(folder + `/${element.hash}.${element.format}`))
                                    resolve_('ok')
                                }).then(
                                    () => {
                                        const json = res;
                                        json.keys = 'fsdbFileDownload'
                                        resolve(json)
                                    }
                                )
                            })
                        }
                    }
                )
            } else {
                fetch(element.replace('ups', 'cdn'), {
                    method: 'GET',
                }).then(res => res.json()).then(
                    res => {
                        if( res.status !== 200 ) return console_.error('This image is invalid')
                        else {
                            axios({
                                metohd: 'GET',
                                url: res.url,
                                responseType: 'stream'
                            }).then(response => {
                                new Promise((resolve_, reject_) => {
                                    const element_ = {
                                        hash: element.split('/').pop().split('.')[0],
                                        format: element.split('/').pop().split('.')[1],
                                    }
                                    response.data.pipe(fs.createWriteStream(folder + `/${element_.hash}.${element_.format}`))
                                    resolve_('ok')
                                }).then(
                                    () => {
                                        const json = res;
                                        json.keys = 'fsdbFileDownload'
                                        resolve(json)
                                    }
                                )
                            })
                        }
                    }
                )
            }
        } catch (er) {
            console_.error('Fails to get the image')
            reject(er)
        }
    })
}