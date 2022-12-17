<div align="center">
    <img src="https://media.discordapp.net/attachments/1045802171146453124/1047137968042823800/Design_sem_nome__9_-removebg-preview.png?width=694&height=230" width="320">
    <br>
    Uma database simples e completa!
    <h1>V. 3.2.0 [Beta]</h1>
</div>

> Click [here](https://github.com/lucasFelixSilveira/fsdb.js/blob/main/docs/en/documentation.md) to see the documentation in English

# 🟣 Instalação
- Abara o seu Visual Studio code ou outra IDE, abra o terminal e use:
```sh-session
npm i fsdb.js
```
**Perfeito!** Agora Você já pode usar a _**Fsdb**_!

# 📡 Conexão

- Primeiro, você tem que conhecer os principios de login da fsdb.
- - Como criar meu banco de dados?
- - - Instale o módulo npm em sem projeto e use qualquer "comando", automaticamente será criado um script na sua `package.json` chamado "fsdb" e também um .js na raiz do seu projeto. Apenas use:
```sh-session 
npm run fsdb
```
- - - Para executar o criador e poder configurar seu novo banco de dados.

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
    const validUrl = valid.getURL();
    // ... 

})()

// método do .then
    cdn().validate(element).then(valid => {
        const validUrl = valid.getURL();
        // ...
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

# 🔗 Links
- **[Repositório](https://github.com/lucasFelixSilveira/fsdb.js)**
- **[Módulo](https://www.npmjs.com/package/fsdb.js)**

# ⚙ Motivos de criação

<div align="center">
    Quando comecei a programar, ao aprender usar database, primeiro comecei na <strong>Lowdb</strong> Que tinha de base jsons e o sistema era chato de se usar, ao perceber isso, resolvi migrar e fui para a <strong>Quick.db</strong>, a usei por muito tempo, porém ainda sim não estava feliz com meus resultados que muitas das vezes eram fechados a um só node. Então, a <strong>Firebase</strong> foi a solução. A usei por muito tempo, porém ela não é boa o suficiente para muitas tarefas, assim, me fazendo migrar para a <strong>Mongoose</strong>. Após estuda-la, mal a usei, pois foi fechado trabalhos apenas que a <strong>Firebase</strong> já segurava. Então, resolvi fazer algo parecido com ela, porém melhor! Ainda estamos em desenvolvimento e em constante atualização, porém a <strong>Fsdb</strong> vai ajudar muita gente, assim como antigamente a <strong>Firebase</strong> me salvou com sua simplicidade de uso e bons resultados.
</div>

# 📋 Notas da versão
- **3.1.0** & **3.1.1** 
- - ` Cdn! `

- **3.0.0** 
- - ` Lançamento! `
