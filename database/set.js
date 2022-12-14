const fetch = require('node-fetch')
const console_ = require('../utils/console.js')
module.exports = async (directory, object, props, functions, att) => {
    return new Promise( async (resolve, reject) => {
        let dir__;
        function resumeDir(x) {
            return new Promise((resolve, reject) => {
                const letters = x.split('');
                if( letters.length > 15 ) {
                    letters.length = 15
                    let string = '';
                    letters.forEach(
                        (item, index) => {
                            string = string+item;
                            if( index == ( letters.length - 1 ) ) {
                                resolve(string+"...")
                            }
                        }
                    ) 
                } else {
                    resolve(x)
                }
            })
        }
        dir__ = await resumeDir(directory);
        const _props = functions.updateProps();
        if( _props.logged == false ) {
            return console_.error('You do not have any logged-in databases.') 
        }
        if(! directory ) {
            return console_.error('You need to inform the directory to be set.')
        } else if( typeof directory !== 'string' ){
            return console_.error('The directory to be defined must be a string')
        } else if(! object ) {
            functions.setColdown(false)
            return console_.error(`You need to inform the object that will be set to: `+"\033[1;33m"+`${dir__}`+"\033[0m")
        } else if( typeof object !== 'object' ) return console_.error(`The object where you define the new information from the `+"\033[1;33m"+`"${dir__}"`+"\033[0m"+` directory must be an object.`)
        else {
            try {
                fetch(`https://fsdb.tk/cli/set`, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ getFrom: 'cli', props: _props, infosDirectory: directory, infosObject: object })}).then(res => res.json())
                    .then(res => {
                        _nextTick(res)
                    })
                function _nextTick(res) {
                    switch(`${res.status.toString()}`) {
                        case '200': {
                            functions.setDeploy(true)
                            functions.setData({ db: res.db })
                            resolve(200)
                            break;
                        }
                        case '404': {
                            console_.error(res.error)
                            reject(res.error)
                            break;
                        }
                    }
                }
            } catch (er) {
                reject(er)
            } 
        }
    })
}