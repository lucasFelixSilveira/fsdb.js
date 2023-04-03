const fetch = require('node-fetch')
module.exports = async function (Path, ngrok, userData, resolve, out) {
    fetch(`${ngrok}/get`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path: Path,
            data: userData
        })
    }).then(res => res.json()).then(
        async res => {
            const { status, valid, conteins } = res;
            if( status !== 200 ) {
                console.log('Catched error: ' + status)
            } else {
                if(! valid ) 
                    throw new Error(
                        `Your login is invalid.`
                    )
                if( conteins ) {
                    if( out ) return resolve(res.data);
                    const isArray = Array.isArray(res.data)
                    let funcs = {
                        value: () => res.data
                    };
                    if( isArray ) {
                        funcs = await require('../utils/array.js')(funcs)
                    }
                    resolve(funcs)
                }
                else resolve(null)
            }
        }
    )
}