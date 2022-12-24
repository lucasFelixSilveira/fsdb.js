const input = require('prompt-sync')({ sigint: true })
const exec = require('child_process').exec;
const { exit } = require('process');
const readlineSync = require('readline-sync');
const fetch = require('node-fetch');

remember();
function remember() {

    console.clear();

    console_().question("What do you want to do?")
    setTimeout(() => {
        animals = ['Database creation', 'Token recovery']
        index = readlineSync.keyInSelect(animals, '')
        console.clear();
        if( index == 0 ) create();
        else if( index == 1 ) recovery();
        else if( index == -1 ) exit;
    }, 500)

    function console_() {
        return {
            log: function (cmd) {
                exec('echo '+cmd, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(stdout.split('\n').join(''));
                });
            },
            question: function (msg) {
                this.log("\033[1;36m?\033[0m "+msg)
            },
            ok: function (msg) {
                this.log("\033[0;32m+\033[0m "+msg)
            },
            wait: function (msg) {
                this.log("\033[0;34m%\033[0m "+msg)
            },
            problem: function (er) {
                this.log("\033[0;31mx \033[0m"+er)
            },
            alert: function (msg) {
                this.log("\033[0;33m! \033[0m"+msg)
            },
            note: function (msg) {
                this.log("\033[0;36m[Note] \033[0m"+msg)
            },
            success: function (msg0, msg1) {
                this.log("\033[0;32m"+msg0+" \033[0m"+msg1)
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