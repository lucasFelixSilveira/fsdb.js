const fetch = require('node-fetch')
const console_ = require('../utils/console.js')
module.exports = (directory, props, functions) => {
    return new Promise((resolve, reject) => {
        try {
        let cont = functions.getColdown()
        return verificar();
        function verificar() {
            if( cont == true ) genLooping();
            else setTimeout(() => deixarPassar(), 10);
        }
        function genLooping() {
            if( functions.getColdown() == false ) {
                cont = false;
                setTimeout(() => deixarPassar(), 10);
            } else {
                setTimeout(() => verificar(), 10);
            }
        }
        function deixarPassar() {
            setTimeout(() => {
                const _props = functions.updateProps();
                if( _props.logged == false ) return console_.error('You do not have any logged-in databases.') 
                if(! directory ) return console_.error('You need to inform the collection directory!')
                else if( typeof directory !== 'string' ) return console_.error('The collection directory can only be a string')
                else {
                    if( _props.updated == true ) {
                        fetch(`https://fsdb.tk/cli/get`, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ getFrom: 'cli', directory: directory, props: _props })})
                            .then(res => res.json())
                            .then(res => {
                                if( `${res.status.toString()}` == '404' ) return console_.error(res.error)
                                functions.setDeploy(false)
                                functions.setData(res.db == {}? null : res.db)
                                return resolve(res.dbDir == {}? null : res.dbDir)
                            })
                    } else {
                        let db = _props.db;
                        if( directory == '/' ) return resolve(db == {}? null : db)
                        if( directory.includes('/') ) {
                            if(! db ) resolve(null)
                            try {
                                db = eval(`db.${directory.replaceAll('/', '.')}`)
                                if(! db ) resolve(null)
                                return resolve(db == {}? null : db)
                            } catch (er) {
                                return resolve(null)
                            }
                        } else {
                            db = db[directory]
                            if(! db ) return resolve(null)
                            return resolve(db == {}? null : db)
                        }
                    }
                }
            }, 10)
        }
        } catch (er) {
            console_.error('Fails to get the collection')
            reject(null)
        }
    })
}