# Desafio Front-end ([Demo](https://tiagoboeing.github.io/desafio-frontend-senior/))
### Vai rodar localmente? 
Partindo do princípio que você tem Node e Angular instalados...
- Rode `npm install` para baixar as dependências
- Suba a aplicação com `npm start` ou `npm run start:proxy:api`

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--7f5GjxUW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/c29t9uc8roz8g9rddbqs.png" width="200"/>

A API encontra-se no Heroku em uma instância preemptiva, sendo assim pode ser necessário aguardar alguns minutos para que a mesma seja ativada. Caso não ocorra automaticamente, atualize a página.

O frontend (Angular) encontra-se no GitHub Pages, sendo assim a ativação é instantânea.

<hr>

## Considerações do autor

- Implementei uma `fake API` utilizando JSON-Server (https://github.com/typicode/json-server), por permitir o tratamento dos dados de forma assíncrona mais rapidamente, melhor que ao utilizarmos `localStorage`. JSON-Server possui um endpoint gratuito para repositórios públicos: https://my-json-server.typicode.com/tiagoboeing/desafio-frontend-senior
- Ao rodar `npm start` localmente a dependência Concurrently automatiza a tarefa, levantando a aplicação com `ng serve` + `json-server db.json` (https://www.npmjs.com/package/concurrently), tudo em um único comando. [`npm start`]
- Como a tarefa não especifica quais campos devem ou não ser exibidos na tela de listagem, tomei a liberdade de utilizar `table-responsive` do Bootstrap 4 para ocultar algumas colunas na exibição mobile e deixar a tela de certa forma mais organizada, evitando conteúdo verboso.
- Para tornar a aplicação mais interativa e demonstrar suas funcionalidades aproveitei também para exibir um `alert` questionando se o usuário deseja alguns dados fictícios inicialmente, caso a listagem esteja vazia.
- Não ficou claro se o campo `quantidade` estava relacionado diretamente a `unidadeMedida`, neste caso deduzi que ao informar a unidade de medida (quilograma, litros, unidade) o input quantidade receberia o valor correspondente como sufixo.
- Para a máscara do input `preço` foi utilizado o repositório de um colega: https://github.com/nbfontana/ngx-currency
- Para a máscara dos campos com limite de casas decimais, utilizei o repositório TextMask: https://github.com/text-mask/text-mask
- Não havia obrigatoriedade de o campo `quantidade` ser modelado como do tipo number, neste caso optei por string, acompanhado já da unidade de medida escolhida.
- Como utilizei API, para fazer uso do `localStorage` de alguma forma, acabei implementando uma rota para personalização da cor da barra superior, sendo assim a escolha será guardada para visitas posteriores.
- O menu lateral fica com status oculto inicialmente, evitando aproveitar melhor o espaço da tela. Na topbar foi adicionado um botão estilo `burguer menu` para exibir/ocultar. A animação e triggers foi desenvolvida utilizando `Angular Animations`. A Snackbar também utiliza animações, bem como `pipes` para personalizar a ação e tempo na tela. `(do() que agora chama-se tap(); switchmap(); timer())`
- Mesmo que não obrigatório, utilizei de `EventEmitter` para personalizar o comportamento de alguns components, entre eles a atualização da listagem (quando um evento é emitido), abrir/fechar menu e a snackbar (barra de notificações).
