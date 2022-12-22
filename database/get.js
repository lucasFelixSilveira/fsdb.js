const fetch = require('node-fetch')
const console_ = require('../utils/console.js')
module.exports = (directory, props, functions) => {
    return new Promise((resolve, reject) => {
        const _props = functions.updateProps();
        if( _props.logged == false ) return console_.error('You do not have any logged-in databases.') 
        if(! directory ) return console_.error('You need to inform the collection directory!')
        else if( typeof directory !== 'string' ) return console_.error('The collection directory can only be a string')
        else {
            setTimeout(() => {
                fetch(`https://fsdb.tk/cli/get`, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ getFrom: 'cli', directory: directory, props: _props })})
                    .then(res => res.json())
                    .then(res => {
                        if( `${res.status.toString()}` == '404' ) return console_.error(res.error)
                        functions.setData(res.db == {}? null : res.db)
                        return resolve(res.dbDir == {}? null : res.dbDir)
                    })
            }, 500)
        }
    })
}