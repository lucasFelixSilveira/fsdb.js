const fs = require('fs');
const console_ = require('../console.js');
const saves = require('../saves.json')
module.exports = () => {
    if( saves.createdBanks ) return;
    const retornar = () => console_.message(`The database creation system was successfully created.`)
    let package = require('../../../../package.json')
    const scripts = package.scripts || {};
    scripts.fsdb = `node fsdb.js`
    package.scripts = scripts;
    let newSave = saves;
    newSave.createdBanks = true;
    fs.writeFile(__dirname.split('node_modules')[0] + 'node_modules/fsdb.js/utils/saves.json', JSON.stringify(newSave), null, (err) => {
        if( err ) console.log(err)
    })
    fs.writeFile(__dirname.split('node_modules')[0] + 'package.json', JSON.stringify(package), null, (err) => {
        if( err ) console.log(err)
    })
    fs.readFile(__dirname + `/saved.js`,(err, data) => {
        if( err ) console.log(err)
        fs.writeFile(__dirname.split('node_modules')[0] + 'fsdb.js', data, null, (err) => {
            if( err ) console.log(err)
        })
    })
    retornar()
}