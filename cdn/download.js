const fetch = require('node-fetch');
const fs = require('fs');
module.exports = async (data, ngrok, end) => {
    fetch(`${ngrok}/cdn/download`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data['element'])
    }).then(res => res.json()).then(res => {
        if( res.status == 200 ) {
            fs.writeFile(`${data.path}/${data['element'].hash}.${data['element'].format}`, Buffer.from(res.data, 'base64'), null, (err) => {
                if(err) throw console.error(err);
                end(true);
            });
        } else {
            console.log(res)
            end(false);
        }
    })
}