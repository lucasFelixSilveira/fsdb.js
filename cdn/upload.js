const fetch = require('node-fetch');
const fs = require('fs');
module.exports = async (directory, ngrok, end) => {
    const filename = directory.split('/').pop();
    const type = filename.split('.').pop();
    fs.readFile(directory, async (err, data) => {
        if( err ) 
            throw new Error(
                `I couldn't find the "`+filename+`.${type}" file in the path: ${directory}`
            )
        fetch(`${ngrok}/cdn/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                buffer: data.toString('base64'),
                filename, type
            })
        }).then(res => res.json()).then(
            async (res) => {
                if( res.status !== 200 )
                    throw new Error(res.message)
                else {
                    return end(res.client_response)
                }
            }
        ).catch(err => {
            throw new Error(
                `there was a problem sending the image, check if the size of it exceeds 5.242.880 bytes.`
            )
        })
    })
}