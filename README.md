### Informações de referência nos estudos
- [Este artigo](https://programandosolucoes.dev.br/2021/01/26/rotas-express-nodejs/) explica mais sobre rotas no Express.
- A medida que as rotas de um sistema crescem, é uma boa prática separar essas rotas em arquivos, imagine 100 rotas no mesmo arquivo, dificulta muito a manutenção.

- Para fazer isso existe o express.Router, com ele é possível uma rota em um arquivo e depois exportar ela para que seja usado no arquivo principal, com isso as rotas de um módulo ficam separadas.