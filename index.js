// vars
let logged = false;
let db = {};
let hasUpdate = false;
let dbInfos = {};
let coldown = false;
let versionAlerted = false;

let props_ = {
    db: db,
    logged: logged,
    updated: hasUpdate,
    infos: dbInfos,
}

// especial functions
const isLogged = () => logged = true;
const getUp = (_db) => { db = _db.db; };
const deploy = (x) => hasUpdate = x;
const getDeploy = () => hasUpdate;
const getProps = () => require('./').getProps(true);
const updateProps = () => { return { db: db, logged: logged, updated: hasUpdate, infos: dbInfos }; }
const setColdown = (x) => coldown = x;
const getColdown = () => coldown;
const getFile = (fileName) => require(`./database/${fileName}.js`); 
const getCdnFile = (fileName) => require(`./cdn/${fileName}.js`); 
const setWaringVersion = () => versionAlerted = true;
const moldarMs = (ms) => require('./utils/ms.js')(0, ms)
const verifyVersion = () => require('./utils/version.js')(require('./package.json').version, versionAlerted, setWaringVersion)

// especial functions²
function functions() {
    return {
        setDeploy: deploy,
        setData: getUp,
        updateProps: updateProps,
        getDeploy: getDeploy,
        garantirProps: () => { props_ = updateProps(); require('./').resetProps(); setColdown(false); return getProps() },
        setColdown: setColdown,
        getColdown: getColdown
    }
}

function loopingProps(x) {
    props_ = updateProps();
    require('./').resetProps()
    if( x == true ) setTimeout(() => loopingProps(true), 2)
}

//imports
const fetch = require('node-fetch');
const console_ = require('./utils/console.js')
const fs = require('fs');

//module
module.exports = {
    props: props_,
    connect: function(infos) {
        verifyHasBank()
        return new Promise((resolve, reject) => {
            const oldDate = new Date();
            if( this.props.logged == true ) this.resetProps()
            if(! infos ) return console_.error('Enter the login information.')
            else if(! infos['token'] ) return console_.error('In the login information, enter the token.')
            else if(! infos['password'] ) return console_.error('In the login information, enter the password.')
            if( logged == true ) return console_.error(`You are already logged into a database.`)
            setColdown(true)
            const setNewProps = () => props_ = updateProps();
            try {
                fetch(`https://fsdb.tk/cli/connect`, { method: 'POST', body: JSON.stringify(infos), headers: { 'Content-type': 'application/json' }})
                    .then(res => res.json())
                    .then(res => {
                        _nextTick(res)
                    })
                function _nextTick(res) {
                    switch(`${res.status.toString()}`) {
                        case '200': {
                            isLogged();
                            getUp({ db: res.db == {}? null : res.db})
                            dbInfos = infos;
                            setNewProps();
                            loopingProps(true);
                            setColdown(false)
                            if( ( !infos.ok && infos.ok !== false ) || infos.ok == true ) console_.ok('Database successfully logged in!')
                            const ms = moldarMs(new Date() - oldDate);
                            if( infos.debug && infos.debug == true ) console_.debug(`Login in: ${ms}`)
                            resolve(true)
                            break;
                        }
                        case '404': {
                            setColdown(false)
                            if( res.error ) return console_.error(res.error)
                            resolve(false)
                            return console_.error('Invalid login data.');
                        }
                    }
                }
            } catch (er) {
                setColdown(false)
                console_.error('Conection failure')
                reject(er)
            }    
        })
    },
    database: function() {
        return {
            get: (directory) => {
                verifyHasBank()
                verifyVersion()
                return getFile('get')(directory, this.props, functions());
            },
            block: (directory) => {
                return {
                    set: (object) => {
                        verifyHasBank()
                        verifyVersion()
                        const att = () => {
                            this.resetProps();
                        }
                        return getFile('set')(directory, object, this.props, functions(), att);
                    },
                    delete: () => {
                        verifyHasBank()
                        verifyVersion()
                        const att = () => {
                            this.resetProps();
                        }
                        return getFile('delete')(directory, this.props, functions(), att);
                    }
                }
            }
        }
    },
    cdn: function (folder, typeUrl) {
        return {
            upload: (directory) => {
                verifyVersion()
                let fileFormat = directory.split('.').pop();
                return getCdnFile('upload')({directory, fileFormat2: fileFormat}, this.props, functions())
            },
            download: (element) => {
                verifyVersion()
                if(! typeUrl || typeUrl == false ) {
                    if( ! element.hash || ! element.format ) return console_.error('This object is not from an Fsdb img.')
                    return getCdnFile('download')(element, folder, false, this.props, functions())
                } else {
                    return getCdnFile('download')(element, folder, true, this.props, functions())
                }
            },
            validate: (element) => {
                verifyVersion()
                if( ! element.hash || ! element.format ) return console_.error('This object is not from an Fsdb img.')
                return getCdnFile('validate')(element, folder, this.props, functions())
            }
        }
    },
    getProps: function(x) {
        if( x !== true ) loopingProps(false);
        return this.props;
    },
    resetProps: function() {
        this.props = props_;
    }
}