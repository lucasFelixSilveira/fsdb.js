<div align="center">
    <img src="https://media.discordapp.net/attachments/1045802171146453124/1047137968042823800/Design_sem_nome__9_-removebg-preview.png?width=694&height=230" width="320">
    <br>
    Uma database simples e completa!
    <h1>V. 3.0.0 [Beta]</h1>
</div>

> Clique [aqui](https://github.com/lucasFelixSilveira/fsdb.js) to see the documentation in English

# 🟣 Installation
- Abara your Visual Studio code or other IDE, open the terminal and use:
```sh-session
> npm i fsdb.js
```
**Perfect!** Now You can use _**Fsdb**_!

# 📡 Connection

- First, you have to know the login principles of fsdb.
- - How do I create my database?
- - - Click **[here](https://github.com/lucasFelixSilveira/fsdb.js/raw/main/services/files.zip)** to download the files.
- - - Click **[here](https://github.com/lucasFelixSilveira/fsdb.js/blob/main/docs/pt/createBanks.md)** to see how to create a database

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

# 🔗 Links
- **[Repositório](https://github.com/lucasFelixSilveira/fsdb.js)**
- **[Módulo](https://www.npmjs.com/package/fsdb.js)**

# ⚙ Creation reasons

<div align="center">
    When I started programming, learning to use database, first I started <strong>at Lowdb</strong> That had jsons base and the system was boring to use, to realize this, I decided to <strong>migrate and went to Quick.db</strong>, I used it for a long time, but still was not happy with my results that were often closed to a single node. So <strong>Firebase was</strong> the solution. I've used it for a long time, but it's not good enough for many tasks,  so, making me migrate to <strong>Mongoose</strong>. After studying it, I barely used it, because only work that <strong>Firebase already</strong> held was closed. So I decided to do something like her, but better! We are still in development and constantly updating, but <strong>Fsdb</strong> will help many people, just as <strong>firebase saved</strong> me in the old days with its simplicity of use and good results.
</div>

# 📋 Release notes
- **3.0.0** 
- - ` Launch! `
