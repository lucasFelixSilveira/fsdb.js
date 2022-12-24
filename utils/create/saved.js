const input = require('prompt-sync')({ sigint: true })
const exec = require('child_process').exec;
const { exit } = require('process');
const readlineSync = require('readline-sync');
const fetch = require('node-fetch');
const fs = require('fs')
const crypto = require('crypto')
const fs_ = require('fs-extra');

const usageFrom = () => __dirname.replaceAll('\\', '/').includes('/npm/node_modules/fsdb-cli') ? 'cli' : 'root';

const defaultConfigs = {
    updateAlert: "active"
} 

remember();
function remember() {

    console.clear();

    console_().question("What do you want to do?")
    setTimeout(() => {
        array = ['Database creation', 'Token recovery', 'Settings']
        index = readlineSync.keyInSelect(array, '')
        console.clear();
        if( index == 0 ) create();
        else if( index == 1 ) recovery();
        else if( index == 2 ) configure();
        else if( index == -1 ) exit;
    }, 500)

    function configure() {
        console.clear()
        console_().question("What do you want to set up?")
        setTimeout(() => {
            array = ['Alerts']
            index = readlineSync.keyInSelect(array, '')
            console.clear();
            if( index == 0 ) alerts();
            else if( index == -1 ) remember();
            function alerts() {
                console.clear();
                array = ['Update alert']
                index = readlineSync.keyInSelect(array, '')
                console.clear();
                if( index == 0 ) presec('update_alert');
                else if( index == -1 ) configure();
                function presec(alertT) {
                    console.clear();
                    console_().question("Do you want to turn this alert on or off? "+console_().strong('[ '+alertT+' ]'))
                    setTimeout(() => {
                        array = ['Activate', 'Disable']
                        index = readlineSync.keyInSelect(array, '')
                        console.clear();
                        if( index == 0 ) activeConfig(alertT);
                        if( index == 1 ) disableConfig(alertT);
                        else if( index == -1 ) alerts();
                    }, 100)
                }
            }
        }, 500)
    }

    async function disableConfig(conf) {
        if( usageFrom() == 'root' ) {
            fs.readFile(__dirname + '/node_modules/fsdb.js/utils/configs.json', (err, data) => {
                if(! err ) {
                    crypto.randomBytes(16, (err, data2) => {
                        const hash = data2.toString('hex')
                        fs.writeFile(__dirname + `/${hash}.json`, data, null, (err) => {
                            if( err ) return console.log(err)
                            const file = require(`./${hash}.json`);
                            let newFile = file;
                            if( conf == 'update_alert' ) comps = 'updateAlert';
                            newFile[comps] = 'disable'
                            fs.writeFile(__dirname + '/node_modules/fsdb.js/utils/configs.json', JSON.stringify(newFile), null, (err) => {
                                if( err ) return console.log(err)
                                fs_.remove(`./${hash}.json`)
                                configure();
                            })
                        })
                    })
                }
            })
        } else {
            function backDir(dir) {
                return new Promise((resolve, reject) => {
                    const array = dir.split('\\')
                    const no = array.length - 1
                    let str = '';
                    array.forEach((item, index) => {
                        if( index !== no ) str = str +'\\'+ item
                        if( index == no ) {
                            const str_ = str.replace('\\', '');
                            resolve(str_)
                        }
                    })
                })
            }
            const dir = await backDir(await backDir(__dirname))
            fs.readFile(dir + '/configsSave.json', (err, data) => {
                if( err ) {
                    const configs = defaultConfigs
                    if( conf == 'update_alert' ) comps = 'updateAlert';
                    configs[comps] = 'disable'
                    fs.writeFile(dir + '/configsSave.json', JSON.stringify(configs), null, (err) => {
                        if( err ) return console.log(err)
                        configure();
                    })
                } else {
                    fs.writeFile(__dirname + '/configs.json', data, null, (err) => {
                        if( err ) return console.log(err)
                        const configs = require('./configs.json')
                        const newConfig = configs;
                        if( conf == 'update_alert' ) comps = 'updateAlert';
                        newConfig[comps] = 'disable'
                        fs.writeFile(dir + '/configsSave.json', JSON.stringify(newConfig), null, (err) => {
                            if( err ) return console.log(err)
                            fs_.remove(`./configs.json`)
                            configure();
                        })
                    })
                }
            })
        }
    }

    async function activeConfig(conf) {
        if( usageFrom() == 'root' ) {
            fs.readFile(__dirname + '/node_modules/fsdb.js/utils/configs.json', (err, data) => {
                if(! err ) {
                    crypto.randomBytes(16, (err, data2) => {
                        const hash = data2.toString('hex')
                        fs.writeFile(__dirname + `/${hash}.json`, data, null, (err) => {
                            if( err ) return console.log(err)
                            const file = require(`./${hash}.json`);
                            let newFile = file;
                            if( conf == 'update_alert' ) comps = 'updateAlert';
                            newFile[comps] = 'active'
                            fs.writeFile(__dirname + '/node_modules/fsdb.js/utils/configs.json', JSON.stringify(newFile), null, (err) => {
                                if( err ) return console.log(err)
                                fs_.remove(`./${hash}.json`)
                                configure();
                            })
                        })
                    })
                }
            })
        } else {
            function backDir(dir) {
                return new Promise((resolve, reject) => {
                    const array = dir.split('\\')
                    const no = array.length - 1
                    let str = '';
                    array.forEach((item, index) => {
                        if( index !== no ) str = str +'\\'+ item
                        if( index == no ) {
                            const str_ = str.replace('\\', '');
                            resolve(str_)
                        }
                    })
                })
            }
            const dir = await backDir(await backDir(__dirname))
            fs.readFile(dir + '/configsSave.json', (err, data) => {
                if( err ) {
                    const configs = defaultConfigs
                    if( conf == 'update_alert' ) comps = 'updateAlert';
                    configs[comps] = 'active'
                    fs.writeFile(dir + '/configsSave.json', JSON.stringify(configs), null, (err) => {
                        if( err ) return console.log(err)
                        configure();
                    })
                } else {
                    fs.writeFile(__dirname + '/configs.json', data, null, (err) => {
                        if( err ) return console.log(err)
                        const configs = require('./configs.json')
                        const newConfig = configs;
                        if( conf == 'update_alert' ) comps = 'updateAlert';
                        newConfig[comps] = 'active'
                        fs.writeFile(dir + '/configsSave.json', JSON.stringify(newConfig), null, (err) => {
                            if( err ) return console.log(err)
                            fs_.remove(`./configs.json`)
                            configure();
                        })
                    })
                }
            })
        }
    }

    function console_() {
        return {
            question: function (msg) {
                console.log("\033[1;36m?\033[0m "+msg)
            },
            ok: function (msg) {
                console.log("\033[0;32m+\033[0m "+msg)
            },
            wait: function (msg) {
                console.log("\033[0;34m%\033[0m "+msg)
            },
            problem: function (er) {
                console.log("\033[0;31mx \033[0m"+er)
            },
            alert: function (msg) {
                console.log("\033[0;33m! \033[0m"+msg)
            },
            note: function (msg) {
                console.log("\033[0;36m[Note] \033[0m"+msg)
            },
            success: function (msg0, msg1) {
                console.log("\033[0;32m"+msg0+" \033[0m"+msg1)
            },
            strong: function(msg) {
                return "\033[0;35m"+msg+"\033[0m"
            },
        }
    }

    function recovery() {
        console_().alert(`${console_().strong('STILL')} unavailable, will soon come out to all users`)
        setTimeout(() => {
            console_().note(`Coming back in ${console_().strong('5')} seconds...`)
            setTimeout(() => {
                remember();
            }, 5000)
        }, 100)
    }

    function create() {
        console_().question("Enter your recovery email:")
        setTimeout(() => {
            const email = input("» ")
            if(! email.includes("@") ) {
                console.clear();
                console_().problem("Invalid email.")
                setTimeout(() => {
                    console.clear();
                    create();
                }, 3000)
            } else {
                console.clear();
                console_().ok("Recovery email.")
                setTimeout(() => {
                    console_().question("Enter the database password:")
                    setTimeout(() => {
                        const senha = input("» ")
                        console.clear();
                        console_().ok("Recovery email.")
                        setTimeout(() => {
                        console_().ok("Database password.")
                            setTimeout(() => {
                                console_().wait("Wait for creation...")
                                fetch('https://fsdb.tk/cli/create', {
                                    method: 'POST',
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    body: JSON.stringify({ email: email, password: senha })
                                }).then(res => res.json()).then(
                                    res => {
                                        setTimeout(() => {
                                            if( res.status == 404 ) {
                                                console_().problem(res.error)
                                                setTimeout(() => {
                                                    exit;
                                                }, 200)
                                            } else {    
                                                console.clear();
                                                setTimeout(() => {
                                                    console.clear();
                                                        console_().alert(`${console_().strong('Don\'t')} share this token with ${console_().strong("anyone")}!`)
                                                    setTimeout(() => {
                                                        console_().success(`Token:`, `${res.token}`)
                                                    }, 100)
                                                }, 200)
                                            }
                                        }, 3000)
                                    }
                                )
                            }, 500)
                        }, 200)
                    }, 200)
                }, 200)
            }
        }, 200)
    }

}