<div align="center">
    <img src="https://media.discordapp.net/attachments/1045802171146453124/1047137968042823800/Design_sem_nome__9_-removebg-preview.png?width=694&height=230" width="320">
    <br>
    Uma database simples e completa!
    <h1>V. 3.4.3 [Beta]</h1>
</div>

> Click [here](https://github.com/lucasFelixSilveira/fsdb.js/blob/main/docs/en/documentation.md) to see the documentation in English

# 🟣 Instalação
- Abra o seu Visual Studio code ou outra IDE, abra o terminal e use:
```sh-session
npm i fsdb.js
```
**Perfeito!** Agora Você já pode usar a _**Fsdb**_!

# 📡 Conexão

- Primeiro, você tem que conhecer os principios de login da fsdb.
- - Como criar meu banco de dados?

Há 2 modos de criação de bancos de dados atualmente, a _**[CLI](https://www.npmjs.com/package/fsdb-cli)**_ e a padrão da fsdb.
- Nossa recomendação é a **CLI**

Caso você não tenha a CLI instalada, apartir do momento que você usar qualquer comando da fsdb, será criado um script em sua `package.json` e um arquivo chamado `fsdb.js` na raiz do seu projeto. o Script pode ser rodado com `npm run fsdb` e ele terá a mesma função da CLI. _**( Você poderá deletar ele quando quiser, ele não voltará mais. )**_

Caso você tenha a CLI instalada **( Globalmente )** é só usar no seu terminal `fsdb-cli` e criar seu banco!

- - Após criar, faça o login no banco de dados usando o seguinte comando:
```js
const fsdb = require('fsdb.js'); // Importação do módulo npm

fsdb.connect(
    {
        token: 'token',
        password: 'senha',
        ok: false // Esse false serve para retornar OU NÃO o status de "sucesso".
    }
) // Isso serve para você fazer login no seu banco de dados.
```
- - Você pode dentro do connect passar como parâmetro também o **debug** e informar _**true**_ como valor.
- - - Isso retornará o tempo em milisegundos que o banco demorou para executar o login.
```js
const fsdb = require('fsdb.js'); // Importação do módulo npm

fsdb.connect(
    {
        token: 'token',
        password: 'senha',
        ok: false, // Esse false serve para retornar OU NÃO o status de "sucesso".
        debug: true
    }
) // Isso serve para você fazer login no seu banco de dados.
```

# 🗃 Database

- Get
- - Ao usar esse comando, é recebido o object/string/number/boolean salvo no diretório pedido.
```js
(async () => {  // Método "Async" utilizado para permissão do uso de await

    const fsdb = require('fsdb.js') // Importação do módulo npm
    fsdb.connect() // Conexão com o banco de dados
    const db = fsdb.database(); // Obter os comandos da database

    const collected = await db.get('directory'); // Uso para a coleta dos dados
    console.log(collected)

})();
```

- Set
- - Ao usar esse comando, é alocado no diretório informado o object/string/number/boolean informado.
```js
const fsdb = require('fsdb.js') // Importação do módulo npm
fsdb.connect() // Conexão com o banco de dados
const db = fsdb.database(); // Obter os comandos da database

db.block('directory').set({}); // Isso define o diretório do parâmetro 0 como o parâmetro 1.
```

- Delete
- - Ao usar esse comando, é adeletado os dados salvos no diretório informado.
```js
const fsdb = require('fsdb.js') // Importação do módulo npm
fsdb.connect() // Conexão com o banco de dados
const db = fsdb.database(); // Obter os comandos da database

db.block('directory').delete(); // Isso irá deletar os dados salvos no diretório.
```

# 🍕 Cdn
- **Principais informações:**
- - Nossa **CDN** ficou simples e intuitiva, porém há coisas que você precisam entender...
- - `1`. Nossa **CDN** não precisa de login! Você pode usa-la mesmo sem estar logado em um banco de dados da Fsdb.
- - `2`. Elementos são...? Elementos são as imagens upadas, elas enviam um "Object" que pode ser coletado com uso de `await` ou `.then`.
- - `3`. Certo, mas para que serve a validação? A validação seve para que as imagens não fiquem pesando nosso sistema, elas são temporariamente excluidas de uma pasta **local** da hospedagem.

<br>

- **Agora que você conhece os principais conceitos, vamos para cima!**

<br>

> Modo de uso
- Devemos assim como nos exemplos acima ( da database ) devemos primeiro coletar o primeiro parâmetro de retorno.
```js
const cdn = fsdb.cdn; // Não passe ela como função!
```
- **( NÃO PASSE ELA COMO FUNÇÃO! )** 
- Após coletar, você já está apto para uso.
- **Upload**
- - Use isso para upar a imagem para a núvem.
```js
(async() => { // método do await
    
    const element = await cdn().upload(__dirname + `/images/img.jpg`)
    // ...

})()

// método do .then
    cdn().upload(__dirname + `/images/img.jpg`).then(element => {
        // ...
    })
```
- **Download**
- - Use isso para baixar uma imagem da núvem para seu "servidor local"
```js
(async() => { // método do await

    // download pelo "element"
        await cdn(__dirname + `/downloads`).download(element)
        // ....

    // download por url
        const url = `https://fsdb.tk/ups/hash.jpg`
        await cdn(__dirname + `/downloads`, true).download(url)
        // ...

})()

// método do .then

 // download pelo "element"
    cdn(__dirname + `/downloads`).download(element).then(() => {
        // ...
    })

// download por url
    const url = `https://fsdb.tk/ups/hash.jpg`
    cdn(__dirname + `/downloads`, true).download(url).then(() => {
        // ...
    })

```
- **Validate**
- - Use isso para validar uma imagem na qual o link já não funciona mais 
- - - **( Lembre-se que a imagem só pode ser validada novamente se ela foi enviada em menos de 10 minutos )**
- - - Aqui dentro também temos como "subcomando" o "getURL" que obtêm a url do elemento informado e retorna diretamente para você.
```js
(async () => { // método do await

    const valid = await cdn().validate(element)
    const validUrl = await valid.getURL();
    // ... 

})()

// método do .then
    cdn().validate(element).then(valid => {
        valid.getURL().then(validUrl => {
            // ...
        })
    })
```

<div align="center">
    <h3>
        Resolução de alguns problemas.
    </h3>
</div>

- Não sabe usar `__dirname`
- - Problemas com voltar um diretório? Tente isso:
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
- - Problemas de uso no 🐧 linux?
```
Nesse caso apenas não use.
Lembre-se que o arquivo de "upload" da fsdb está dentro de:
    /node_modules/fsdb.js/cdn

e use isso como "relatividade" para seu diretório com "./"
```

# 🧶 FIreray
- Para o uso da FIreray a fsdb assim como a Firebase ( realtime ) não tem o uso de arrays, ent, disponibilizamos uma versão da FIreray q contem a fsdb já dentro.
- Para instalar, use:
```sh-session
npm i fireray
```

<h3> Modo de uso </h3>

> Modo de uso pela fsdb
- **Configure**
- - Após a instalação da fsdb e a FIreray é preciso que vocês configurem as instâncias da FIreray.
```js
const fsdb = require('fsdb.js');
const FIreray = {
    md: require('fireray'),
    fs: fsdb.FIreray()
}

await FIreray.fs.configure(
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
- - Você pode até renomear, trocando o nome do parâmetro do object para o que for.

- **Use**
- - No use, vc deve passar no primeiro parâmetro o nome q você configurou para podermos usar.
- - No segundo parâmetro você deve passar um array contento todos os parâmetros que você passaria normalmente para a FIreray.
> Sintaxe: db, 'diretório', complemento
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

> Uso pela FIreray

<h3> 1: </h3>

- **Single use**
- - O **Sigle use** é um comando da FIreray que define o uso único da Firebase ou da Fsdb.
```js
const FIreray = require('fireray');

FIreray.singleUse('fsdb');
```

- **Use**
- - O **Use** assim como dos exemplos acima pede uma string com o nome do "comando" que deseja usar, porém limitado a não ter modificações no nome.
```js
const FIreray = require('fireray');

FIreray.singleUse('fsdb');
FIreray.use('get', (cmd) => {
    // cmd é o retorno já com a função respectiva.
    cmd()
})
``` 

<h3> 2: </h3>

- O modo de uso antigo da FIreray ainda está por ai, porém um pouco mais cheio. Agora antes é preciso informar ou `fs` ou `fb` de acordo com a database que vai usar.
```js
const FIreray = require('fireray');
const fsdb = requir('fsdb.js');

await fsdb.connect().then(async () => {

    const db = fsdb.database()

    const get = await FIreray.fsGet(db, 'diretório')
    console.log(get)

})
```

# 🔗 Links
- **[Repositório](https://github.com/lucasFelixSilveira/fsdb.js)**
- **[Módulo](https://www.npmjs.com/package/fsdb.js)**

# ⚙ Motivos de criação

<div align="center">
    Quando comecei a programar, ao aprender usar database, primeiro comecei na <strong>Lowdb</strong> Que tinha de base jsons e o sistema era chato de se usar, ao perceber isso, resolvi migrar e fui para a <strong>Quick.db</strong>, a usei por muito tempo, porém ainda sim não estava feliz com meus resultados que muitas das vezes eram fechados a um só node. Então, a <strong>Firebase</strong> foi a solução. A usei por muito tempo, porém ela não é boa o suficiente para muitas tarefas, assim, me fazendo migrar para a <strong>Mongoose</strong>. Após estuda-la, mal a usei, pois foi fechado trabalhos apenas que a <strong>Firebase</strong> já segurava. Então, resolvi fazer algo parecido com ela, porém melhor! Ainda estamos em desenvolvimento e em constante atualização, porém a <strong>Fsdb</strong> vai ajudar muita gente, assim como antigamente a <strong>Firebase</strong> me salvou com sua simplicidade de uso e bons resultados.
</div>

# 📋 Notas da versão
- **3.4.0** 
- - ` FIreray `

- **3.3.0** 
- - ` CLI `

- **3.1.0** & **3.1.1** 
- - ` Cdn! `

- **3.0.0** 
- - ` Lançamento! `
