const console_ = require('./console.js');
const fetch = require('node-fetch');
module.exports = (version, var_, _func) => {
    fetch(`https://lucasfelixsilveira.github.io/fsdb.js/`, { method: 'GET' })
        .then(res => res.json())
        .then(res => {
            if( res.version === version ) return; 
            if( var_ == true ) return;
            console_.warn("You're using an old version! Update using:")
            setTimeout(() => {
                console_.shellCommand("npm i fsdb.js@"+res.version)
            }, 100)
            _func();
        })
}