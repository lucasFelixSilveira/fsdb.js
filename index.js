const fetch = require('node-fetch');
const color = require('ansi-256-colors')
const fs = require('fs')

let __0x_ip = null;
const noReady = () => console.log(color.bg.getRgb(1,0,1)+color.fg.getRgb(4,4,4)+'[Fsdb.js]'+color.reset+' fsdb.js is '+color.fg.getRgb(4,0,0)+'OFFLINE'+color.reset+' or it\'s not ready to call. Please try again later.\n> '+color.bg.getRgb(4,4,0)+color.fg.getRgb(0,0,0)+' Do you think she fell? Report! '+color.reset+'\n🔗・https://discord.gg/mgmg3YYGVQ')
const getIpAddress = () => {
    if(! __0x_ip ) {
        const ip = require('./utils/getIp')()
        __0x_ip = ip;
        return ip;
    } else return __0x_ip;
}

let atual = null;
const login = {};
module.exports = {
    Connection: class {
        /**
         * @param {Object} userData - Enter an object that knows all the login data in the database.
         * @param {Function} callback - Make a function so that it runs as soon as the database connection is valid.
         */
        connect (userData, callback) {
            const firstData = new Date();
            return new Promise((resolve, reject) => {
                if( !userData || ( !userData.token && !userData.password ) || ( typeof userData.token !== 'string' && ( typeof userData.password !== 'string' || typeof userData.password !== 'number'  ) ) ) throw new Error(
                    `Enter the object that contains the database login data.`
                )
                fetch(`https://lucasfs.tk/api/fsdb`, {
                    method: 'GET',
                }).then(res => res.json()).then(res => {
                    const ngrok = res?.url;
                    try {
                        fetch(`${res.url}/`, {
                            method: 'POST'
                        }).then(res => res.json()).then(async res => {
                            if( res.status == 'online' ) {
                                async function _callback (response) {
                                    if( response.status !== 200 )
                                        throw new Error(`${response.status}: ` + response.message?.replaceAll('{client.ip}', await getIpAddress()))
                                    if( response.valid ) {
                                        if( callback ) {
                                            try {
                                                login.token = userData.token;
                                                login.password = userData.password;
                                                atual = ngrok; 
                                                callback({ ping: () => new Date() - firstData, token: login.token, ip: async () => await getIpAddress() });
                                                resolve({
                                                    /**
                                                     * @param {object} addons - addons are extra stuff for premium plans.
                                                    */
                                                    database: async function (addons) {
                                                        return {
                                                            /**
                                                             * @param {object} path - addons are extra stuff for premium plans.
                                                            */
                                                            get: async (path) => {
                                                                if(! path ) 
                                                                    throw new SyntaxError(
                                                                        `You have to enter the path where you want to access, if you want to see the Root of the database, just enter a bar inside a String.`
                                                                    )
                                                                if( typeof path !== 'string' ) 
                                                                    throw new SyntaxError(
                                                                        `The path must always be a string.`
                                                                    )
                                                                const erPath = await require('./utils/verifyPath')(path);
                                                                if( erPath ) 
                                                                    throw new SyntaxError(
                                                                        erPath
                                                                    )
                                                                return new Promise((resolve, reject) => {
                                                                    require('./database/get.js')(path, ngrok, userData, resolve)
                                                                })
                                                            },
                                                            outGet: async (path) => {
                                                                if(! path ) 
                                                                    throw new SyntaxError(
                                                                        `You have to enter the path where you want to access, if you want to see the Root of the database, just enter a bar inside a String.`
                                                                    )
                                                                if( typeof path !== 'string' ) 
                                                                    throw new SyntaxError(
                                                                        `The path must always be a string.`
                                                                    )
                                                                const erPath = await require('./utils/verifyPath')(path);
                                                                if( erPath ) 
                                                                    throw new SyntaxError(
                                                                        erPath
                                                                    )
                                                                return new Promise((resolve, reject) => {
                                                                    require('./database/get.js')(path, ngrok, userData, resolve, true)
                                                                })
                                                            },
                                                            /**
                                                             * @param {object} path - addons are extra stuff for premium plans.
                                                            */
                                                            delete: async function (path) {
                                                                if(! path ) 
                                                                    throw new SyntaxError(
                                                                        `Enter the path you want to delete.`
                                                                    )
                                                                if( typeof path !== 'string' ) 
                                                                    throw new SyntaxError(
                                                                        `The path must always be a string.`
                                                                    )
                                                                const erPath = await require('./utils/verifyPath')(path);
                                                                if( erPath ) 
                                                                    throw new SyntaxError(
                                                                        erPath
                                                                    )
                                                                return new Promise(async (resolve, reject) => {
                                                                    await this.set(path, null, {delete: true});
                                                                    resolve(200)
                                                                })
                                                            },
                                                            /**
                                                             * @param {object} path - addons are extra stuff for premium plans.
                                                            */
                                                            set: async (path, value, addons) => {
                                                                if(! path ) 
                                                                    throw new SyntaxError(
                                                                        `You have to enter the path where you want to access, if you want to see the Root of the database, just enter a bar inside a String.`
                                                                    )
                                                                if( typeof path !== 'string' ) 
                                                                    throw new SyntaxError(
                                                                        `The path must always be a string.`
                                                                    )
                                                                const erPath = await require('./utils/verifyPath')(path);
                                                                if( erPath ) 
                                                                    throw new SyntaxError(
                                                                        erPath
                                                                    )
                                                                if(! value && (!( value == null && addons?.delete )) ) 
                                                                    throw new SyntaxError(
                                                                        `You have to enter the value you want to set.`
                                                                    )
                                                                return new Promise((resolve, reject) => {
                                                                    require('./database/set.js')(path, ngrok, userData, value, resolve)
                                                                })
                                                            },
                                                        }
                                                    },
                                                    cdn: async function () {
                                                        return {
                                                            /**
                                                             * @param {path} directory - path to the image
                                                             */
                                                            upload: async function (directory) {
                                                                return new Promise((resolve, reject) => {
                                                                    require('./cdn/upload.js')(directory, ngrok, resolve);
                                                                })
                                                            },
                                                            /**
                                                             * @param {object} data - path to folder download and element of image
                                                             */
                                                            download: async function (data) {
                                                                return new Promise((resolve, reject) => {
                                                                    require('./cdn/download.js')(data, ngrok, resolve);
                                                                })
                                                            }
                                                        }
                                                    } 
                                                })
                                            } catch( err ) { 
                                                throw new Error(
                                                    `The callback has to be a function!`
                                                )
                                            }
                                        } 
                                    } else throw new Error(
                                        `Your login is invalid.`
                                    )
                                }
                                fetch(`${ngrok}/v_login`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        token: userData.token, 
                                        password: userData.password,
                                        ip: await getIpAddress() 
                                    })
                                }).then(res => res.json()).then(_callback)
                            }
                        }).catch(err => {
                            noReady()
                        })
                    } catch (er) {
                        noReady()
                    }
                })
            })
        }
    }
}