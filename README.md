<div align="center">
    <img src="https://media.discordapp.net/attachments/1045802171146453124/1047137968042823800/Design_sem_nome__9_-removebg-preview.png?width=694&height=230" width="320">
    <br>
    Uma database simples e completa!
    <h1>V. 3.0.0 [Beta]</h1>
</div>

> Click [here](https://github.com/lucasFelixSilveira/fsdb.js/blob/main/docs/en/documentation.md) to see the documentation in English

# 🟣 Instalação
- Abara o seu Visual Studio code ou outra IDE, abra o terminal e use:
```sh-session
> npm i fsdb.js
```
**Perfeito!** Agora Você já pode usar a _**Fsdb**_!

# 📡 Conexão

- Primeiro, você tem que conhecer os principios de login da fsdb.
- - Como criar meu banco de dados?
- - - Clique **[aqui](https://github.com/lucasFelixSilveira/fsdb.js/raw/main/services/files.zip)** para baixar os arquivos.
- - - Clique **[aqui](https://github.com/lucasFelixSilveira/fsdb.js/blob/main/docs/pt/createBanks.md)** para ver como criar um banco de dados.

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

# 🔗 Links
- **[Repositório](https://github.com/lucasFelixSilveira/fsdb.js)**
- **[Módulo](https://www.npmjs.com/package/fsdb.js)**

# ⚙ Motivos de criação

<div align="center">
    Quando comecei a programar, ao aprender usar database, primeiro comecei na <strong>Lowdb</strong> Que tinha de base jsons e o sistema era chato de se usar, ao perceber isso, resolvi migrar e fui para a <strong>Quick.db</strong>, a usei por muito tempo, porém ainda sim não estava feliz com meus resultados que muitas das vezes eram fechados a um só node. Então, a <strong>Firebase</strong> foi a solução. A usei por muito tempo, porém ela não é boa o suficiente para muitas tarefas, assim, me fazendo migrar para a <strong>Mongoose</strong>. Após estuda-la, mal a usei, pois foi fechado trabalhos apenas que a <strong>Firebase</strong> já segurava. Então, resolvi fazer algo parecido com ela, porém melhor! Ainda estamos em desenvolvimento e em constante atualização, porém a <strong>Fsdb</strong> vai ajudar muita gente, assim como antigamente a <strong>Firebase</strong> me salvou com sua simplicidade de uso e bons resultados.
</div>

# 📋 Notas da versão
- **3.0.0** 
- - ` Lançamento! `
