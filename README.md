<div align="center">
    <img src="https://media.discordapp.net/attachments/937082107770077218/1086770314177953905/fsdb.js_logo_completa_.png?width=499&height=281" width="320">
    <br>
    The best database and cdn!
    <h1>V. 4.0.1</h1>
</div>

<p align="center">
    <a href="https://www.npmjs.com/package/fsdb.js"><img src="https://img.shields.io/npm/v/fsdb.js.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/fsdb.js"><img src="https://img.shields.io/npm/dt/fsdb.js.svg?maxAge=3600" alt="npm downloads" /></a>
    <img alt="visitants" src="https://visitor-badge.glitch.me/badge?page_id=lucasFelixSilveira-fsdbjs.visitor-badge" >
    <img alt="license" src="https://img.shields.io/badge/License-Apache_2.0-blue.svg" href="https://img.shields.io/badge/License-Apache_2.0-blue.svg">
</p>

##

# 🙏 Please read this.
- Hello user, to maintain this project, you need some donations to always be able to increase the storage space of the cdn and also the speed of processing and bandwidth of the database. Please, if you have an amount that can be donated, apply it to fsdb so that we can continue to survive and kill our servers. Regards, Lucas. 💜

- Olá usuário, para manter esse projeto, é preciso de algumas doações para poder sempre aumentar o espaço de armazenamento da cdn e também a velocidade de processamento e banda da database. Por favor, caso tenha uma quantia que possa ser doada, aplique ela na fsdb para que possamos continuar sobrevivendo e matendo nossos servidores.  Atenciosamente, Lucas. 💜

## How can I donate?

- É do Brasil? tens a opção de pix para `lucasdwbfff@gmail.com`
- Are you from outside or do you want to donate here even though you are from Brazil? Use the: **[☕ Buy me a coffe](https://www.buymeacoffee.com/lucasdwbffM)**!

##

# 💜 Installation
To install fsdb.js, you need the [NPM](https://www.npmjs.com) package installer, node's default.js and its terminal, to use the following command:
```sh-session
npm i fsdb.js
```

# 📡 Connection

<h3>
    ⚠ For ip blocking, it is highly recommended to use a VPN like <strong><a href="https://www.radmin-vpn.com">RadminVPN</a></strong>
</h3>

To connect to the service, you need to have an account on the system, and you also need to have created a database within the fsdb.js service.
After that, start a project in your IDE of choice and get to work!
- Use this code to start a fsdb.js service:
```js
const fsdb = require('fsdb.js');
const PROCESS = require('process'); // the Process method is being used here, but it's something entirely optional
(async () => {

    const services = await new fsdb.Connection().connect({ 
        token: PROCESS.ENV.TOKEN, 
        password: PROCCESS.ENV.PASSWORD
    }, async (client) => {
        console.log("Connection initiated!")
    })

    const db = services.database(); 
    const cdn = services.cdn();
    // Continue your code here.

})()
```

<h3 align="center">Synchronous method:</h3>

```js
const fsdb = require('fsdb.js');
const PROCESS = require('process'); // the Process method is being used here, but it's something entirely optional

const services = new fsdb.Connection().connect({ 
    token: PROCESS.ENV.TOKEN, 
    password: PROCCESS.ENV.PASSWORD
}, async (client) => {
    console.log("Connection initiated!")
}).then(() => {
    const db = services.database(); 
    const cdn = services.cdn();
    // Continue your code here.
})
```

# 🗂 Database
The ways of using the database were designed to be simple and at the same time functional. Something that if you hold on for functionality and readability of code, will be useful. Let's go to the examples of use!
- I'm not going to demonstrate the use of Synchronous so that the examples don't get too big.
##
- **📃 Get**
- The get, it searches within a path informed by the user the data, and frees you some functions, such as value or find.
```js
const user = await db.get('users/id/1');
console.log(`User definitions: `, user.value()) // Returns the user object.

const userInventory = await db.get('users/inventory/id/1'); // Collects the array from user inventory
let doesHeHaveAsword = false;
const conteins = await userInventory.find('item_name', 'Sword');

if( conteins ) doesHeHaveAsword = true;

if( doesHeHaveAsword ) {
    console.log(`Inventory definitions: `, userInventory.value()) // Returns the inventory array
}
``` 

- **🤓 OutGet**
- The outGet only collects the value of the object or array in the path entered.
```js
const userValue = await db.outGet('users/id/1');
console.log(`User definitions: `, userValue) // Returns the user object.
``` 

- **📜 Set**
- The set, as in other banks, is just to set a value for an item.
```js
const userValue = await db.outGet('users/id/1');
console.log(`Old user definitions: `, userValue) // Returns the user object. (old)

userValue.username = 'Astolfo';

const newUserValue = userValue;
await db.set('users/id/1', newUserValue)

console.log(`New user definitions: `, newUserValue) // Returns the user object. (new)
``` 

- **🗑 Delete**
- Just like the set, it just defines something, but differently, the set defines something as a "positive" value, and the "delete" as something "negative."
### Example given as an app express
```js
app.post('/deleteAccount', (req, res) => {
    const { userId } = req.query;
    await db.delete('users/id/' + userId);
    res.status(200).send('Account has been deleted');
})
``` 

## Other functions of get
- **🔎 Find**
- Find serves to find all objects within an array that have the key entered in index 0 equal to the value entered in index 1.

Example of how it works:
```js
const array = [
    { id: 1, username: 'Lucas' }, 
    { id: 2, username: 'Bruno' }
];
const returns = await array.find('username', 'Lucas'); // In the default javaScript this does not work! ( In the node.js not either! )
console.log(returns); // This will show the object of ALL users within that array who have the Username equal to "Lucas".
```


# 📷 CDN
The CDN is a system where we send to the server and receive a short link to access the big image. Something relatively simple, but very useful. Want to know more? Take a look at the examples of use!
- I'm not going to demonstrate the use of Synchronous so that the examples don't get too big.
##
- **⬆ Upload**
- To send the image, it is simple, you just need to collect the function of the CDN, as was already done in the connection example, and use the sending system, only inform the full path of the image inside the machine where you use the Fsdb.
```js
const image = await cdn.upload(__dirname + '/images/image01.jpg')
console.log(image.url) // Retornará o link de acesso a imagem.
```
- **⬇ Download**
- To download an image directly from the CDN
```js
const image = await cdn.upload(__dirname + '/images/image01.jpg')
await cdn.downlaod({
    path: `${__dirname}/downloads`,
    element: image // This element, is the return object of the image submission
})
```

##
# 💸 Sponsors
### There's no one yet. 

# 📄 Latest updates
- April, 2023
```
Finally officially launching fsdb!
```
