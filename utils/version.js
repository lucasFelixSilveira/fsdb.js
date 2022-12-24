const console_ = require('./console.js');
const fetch = require('node-fetch');
module.exports = (version, var_, _func) => {
    try {
        const config = require('./configs.json')
        if(! config.updateAlert ) ex();
        else {
            if( config.updateAlert == "active" ) ex();
            else if( config.updateAlert == "disable" ) return;
            else ex();
        }
    } catch (er) {
        ex();
    }
    function ex() {
        if( var_ == true ) return;
        fetch(`https://lucasfelixsilveira.github.io/fsdb.js/`, { method: 'GET' })
            .then(res => res.json())
            .then(res => {
                if( res.version === version ) return; 
                console_.warn("You're using an old version! Update using:")
                setTimeout(() => {
                    console_.shellCommand("npm i fsdb.js")
                }, 100)
                _func();
            })
    }
}