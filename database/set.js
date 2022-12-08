const fetch = require('node-fetch')
const console_ = require('../utils/console.js')
module.exports = (directory, object, props, functions, att) => {
    functions.setColdown(true)
    let setteed = false;
    let dir__;
    function resumeDir(x) {
        const letters = x.split('');
        if( letters.length > 15 ) {
            letters.length = 15
            let string = '';
            letters.forEach(
                (item, index) => {
                    string = string+item;
                    if( index == ( letters.length - 1 ) ) {
                        setteed = true;
                        return dir__ = string+"...";
                    }
                }
            )
        } else {
            setteed = true;
            return x
        };
    }
    resumeDir(directory);
    while( setteed == false ) {}
    const _props = functions.updateProps();
    if( _props.logged == false ) {
        functions.setColdown(false)
        return console_.error('You do not have any logged-in databases.') 
    }
    if(! directory ) {
        functions.setColdown(false)
        return console_.error('You need to inform the directory to be set.')
    } else if( typeof directory !== 'string' ){
        functions.setColdown(false)
        return console_.error('The directory to be defined must be a string')
    } else if(! object ) {
        functions.setColdown(false)
        return console_.error(`You need to inform the object that will be set to: `+"\033[1;33m"+`${dir__}`+"\033[0m")
    } else if( typeof object !== 'object' ) return console_.error(`The object where you define the new information from the `+"\033[1;33m"+`"${dir__}"`+"\033[0m"+` directory must be an object.`)
    else {
            fetch(`https://fsdb.tk/cli/set`, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ getFrom: 'cli', props: _props, infosDirectory: directory, infosObject: object })}).then(res => res.json())
                .then(res => {
                    _nextTick(res)
                })
            function _nextTick(res) {
                switch(`${res.status.toString()}`) {
                    case '200': {
                        functions.setDeploy(true)
                        functions.setData({ db: res.db })
                        functions.updateProps();
                        att();
                        break;
                    }
                    case '404': {
                        functions.setColdown(false)
                        console_.error(res.error)
                        break;
                    }
                }
            }
    }
}