<div align="center">
    <img src="https://media.discordapp.net/attachments/1045802171146453124/1047137968042823800/Design_sem_nome__9_-removebg-preview.png?width=694&height=230" width="320">
    <br>
    Uma database simples e completa!
    <h1>V. 3.4.0 [Beta]</h1>
</div>

> Clique [aqui](https://github.com/lucasFelixSilveira/fsdb.js) para ver a documentação em Português

# 🟣 Installation
- Open your Visual Studio code or other IDE, open the terminal and use:
```sh-session
npm i fsdb.js
```
**Perfect!** Now You can use _**Fsdb**_!

# 📡 Connection

- First, you have to know the login principles of fsdb.
- - How do I create my database?
There are 2 ways to create databases currently, the _**[CLI](https://www.npmjs.com/package/fsdb-cli)**_ and fsdb standard.
- Nossa recomendação é a **CLI**

If you do not have the CLI installed, from the moment you use any fsdb command, a script will be created in your `package.json` and a file called `fsdb.js` at the root of your project. The Script can be run with `npm run fsdb` and it will have the same function as the CLI. _**( You can delete him whenever you want, he will not return.) **_

If you have the CLI installed **( Globally)** just use in your terminal `fsdb-cli` and create your bank!

- - After creating, log in to the database using the following command:
```js
const fsdb = require('fsdb.js'); // Import of npm module

fsdb.connect(
    {
        token: 'token',
        password: 'senha',
        ok: false // This false serves to return OR NOT the status of "success".
    }
) // This is for you to log in to your database.
```
- - You can pass the **debug** parameter as a parameter as well and report _**true**_ as a value.
- - - This will return the time in milliseconds that the bank took to log in.
```js
const fsdb = require('fsdb.js'); // Import of npm module

fsdb.connect(
    {
        token: 'token',
        password: 'senha',
        ok: false, // This false serves to return OR NOT the status of "success".
        debug: true
    }
) // This is for you to log in to your database.
```

# 🗃 Database

- Get
- - When using this command, the object/string/number/boolean saved in the requested directory is received.
```js
(async () => {  // "Async" method used to permit the use of await

    const fsdb = require('fsdb.js') // Import of npm module
    fsdb.connect() // Connection to the database
    const db = fsdb.database(); // Get database commands

    const collected = await db.get('directory'); // Use for data collection
    console.log(collected)

})();
```

- Set
- - When using this command, the informed object/string/number/boolean is allocated in the informed directory.
```js
const fsdb = require('fsdb.js') // Import of npm module
fsdb.connect() // Connection to the database
const db = fsdb.database(); // Get database commands

db.block('directory').set({}); // This sets the directory of parameter 0 to parameter 1.
```

- Delete
- - When using this command, the saved data is deleted in the informed directory.
```js
const fsdb = require('fsdb.js') // Import of npm module
fsdb.connect() // Connection to the database
const db = fsdb.database(); // Get database commands

db.block('directory').delete(); // This will delete the saved data in the directory.
```
# 🍕 Cdn
- **Top information:**
- - Our **CDN** was simple and intuitive, but there are things you need to understand...
- - `1`. Our **CDN** doesn't need login! You can use it even without being logged into an Fsdb database.
- - `2`. Elements are...? Elements are upadas images, they send an "Object" that can be collected using 'await' or '.then'.
- - `3`. Okay, but what's validation for? Validation is so that images don't weigh on our system, they are temporarily deleted from a **local** folder from hosting.

<br>

- **Now that you know the main concepts, let's go upstairs!**

<br>

> Mode of use
- We should just as in the examples above (of database) we must first collect the first return parameter.
```js
const cdn = fsdb.cdn; // Don't pass it as a function!
```
- **(DON'T PASS IT AS FUNCTION!)** 
- After collecting, you are already fit for use.
- **Upload**
- - Use this to upar the image to the cloud.
```js
(async() => { // await method
    
    const element = await cdn().upload(__dirname + `/images/img.jpg`)
    // ...

})()

// .then method
    cdn().upload(__dirname + `/images/img.jpg`).then(element => {
        // ...
    })
```
- **Download**
- - Use this to download an image of the phone to your "local server"
```js
(async() => { // await method

    // download by "element"
        await cdn(__dirname + `/downloads`).download(element)
        // ....

    // download by url
        const url = `https://fsdb.tk/ups/hash.jpg`
        await cdn(__dirname + `/downloads`, true).download(url)
        // ...

})()

// .then method

 // download by "element"
    cdn(__dirname + `/downloads`).download(element).then(() => {
        // ...
    })

// download by url
    const url = `https://fsdb.tk/ups/hash.jpg`
    cdn(__dirname + `/downloads`, true).download(url).then(() => {
        // ...
    })

```
- **Validate**
- - Use this to validate an image in which the link no longer works
- - - **( Remember that the image can only be validated again if it was sent in less than 10 minutes )**
- - - Inside we also have as "subcommand" the "getURL" that get the url of the element informed and returns directly to you.
```js
(async () => { // await method

    const valid = await cdn().validate(element)
    const validUrl = await valid.getURL();
    // ... 

})()

// .then method
    cdn().validate(element).then(valid => {
        valid.getURL().then(validUrl => {
            // ...
        })
    })
```

<div align="center">
    <h3>
        Resolution of some problems.
    </h3>
</div>

- You don't know how to `__dirname`
- - Problems with returning a directory? Try this:
```js
function getDir(dir) {
    return new Promise((resolve, reject) => {
        const array = dir.split('\\')
        const no = array.length - 1
        let str = '';
        array.forEach((item, index) => {
            console.log(str)
            if( index !== no ) str = str +'\\'+ item
            if( index == no ) {
                const str_ = str.replace('\\', '');
                resolve(str_)
            }
        })
    })
}

getDir(__dirname).then(x => console.log(x))
```
- - Problems using 🐧 linux?
```
In that case just do not use.
Remember that the fsdb "upload" file is within:
    /node_modules/fsdb.js/cdn

and use this as "relativity" for your directory with "./"
```

# 🧶 FIreray
- For the use of FIreray to fsdb as well as Firebase ( realtime ) does not have the use of arrays, so we provide a version of FIreray q contains the fsdb already inside.
- To install, use:
```sh-session
npm i fireray
```

<h3> Mode of use: </h3>

> Use mode by fsdb
- **Configure**
- - After installing fsdb and FIreray, you must configure fireray instances.
```js
const fsdb = require('fsdb.js');
const FIreray = {
    md: require('fireray'),
    fs: fsdb.FIreray()
}

await FIreray.configure(
    {
        get: FIreray.md.fsGet,
        set: FIreray.md.fsSet,
        delete: FIreray.md.fsDelete,
        remove: FIreray.md.fsRemove,
        replace: FIreray.md.fsReplace,
        push: FIreray.md.fsPush,
        clone: FIreray.md.fsClone,
    }
)

``` 
- - You can even rename by changing the name of the object parameter to whatever it is.

- **Use**
- - In use, you must pass in the first parameter the name q you configured in order to use.
- - In the second parameter you must pass an array content all parameters that you would normally pass to FIreray.
> Syntax: db, 'directory', add-on
```js
const fsdb = require('fsdb.js');

fsdb.connect().then(async () => {
    
    const db = fsdb.database();
    const FIreray = fsdb.FIreray();

    await FIreray.configure();

    const users = await FIreray.use('get', [db, 'users'])
    console.log(users)

})
```

> Use by FIreray

<h3> 1: </h3>

- **Single use**
- - **Sigle use** is a FIreray command that defines the single use of Firebase or Fsdb.
```js
const FIreray = require('fireray');

FIreray.singleUse('fsdb');
```

- **Use**
- - **Use** as well as the examples above asks for a string with the name of the "command" you want to use, but limited to having no modifications to the name.
```js
const FIreray = require('fireray');

FIreray.singleUse('fsdb');
FIreray.use('get', (cmd) => {
    // cmd is the return already with the respective function.
    cmd()
})
``` 

<h3> 2: </h3>

- FIreray's old usage mode is still out there, but a little fuller. Now before you need to inform either 'fs' or 'fb' according to the database you will use.
```js
const FIreray = require('fireray');
const fsdb = requir('fsdb.js');

await fsdb.connect().then(async () => {

    const db = fsdb.database()

    const get = await FIreray.fsGet(db, 'directory')
    console.log(get)

})
```

# 🔗 Links
- **[Repository](https://github.com/lucasFelixSilveira/fsdb.js)**
- **[Module](https://www.npmjs.com/package/fsdb.js)**

# ⚙ Creation reasons

<div align="center">
    When I started programming, learning to use database, first I started <strong>at Lowdb</strong> That had jsons base and the system was boring to use, to realize this, I decided to <strong>migrate and went to Quick.db</strong>, I used it for a long time, but still was not happy with my results that were often closed to a single node. So <strong>Firebase was</strong> the solution. I've used it for a long time, but it's not good enough for many tasks,  so, making me migrate to <strong>Mongoose</strong>. After studying it, I barely used it, because only work that <strong>Firebase already</strong> held was closed. So I decided to do something like her, but better! We are still in development and constantly updating, but <strong>Fsdb</strong> will help many people, just as <strong>firebase saved</strong> me in the old days with its simplicity of use and good results.
</div>

# 📋 Release notes
- **3.4.0** 
- - ` FIreray `

- **3.3.0** 
- - ` CLI `

- **3.1.0** & **3.1.1** 
- - ` Cdn! `

- **3.0.0** 
- - ` Launch! `
