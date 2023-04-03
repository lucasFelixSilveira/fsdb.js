const fetch = require('node-fetch')
module.exports = async function (Path, ngrok, userData, value, resolve) {
    fetch(`${ngrok}/set`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path: Path,
            data: userData,
            value
        })
    }).then(res => res.json()).then(
        res => {
            const { status, valid, sucess } = res;
            if( status !== 200 ) {
                console.log('Catched error: ' + status)
            } else {
                if(! valid ) 
                    throw new Error(
                        `Your login is invalid.`
                    )
                if( sucess ) resolve(200);
                else new Error(res['error'])
            }
        }
    )
}