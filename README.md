# Desafio Front-end
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
- Não ficou claro se o campo `quantidade` estava relacionado diretamente a `unidadeMedida`, neste caso deduzi que ao informar a unidade de medida (quilograma, litros, unidade) o input quantidade receberia o valor correspondente.
- O menu lateral foi com status oculto inicialmente, evitando esgotar o espaço na tela. Na topbar foi adicionado um botão estilo `burguer menu` para exibir/ocultar. 
- Para a máscara do input preço foi utilizado o repositório de um colega: https://github.com/nbfontana/ngx-currency
- Para a máscara dos campos com limite de casas decimais, utilizei o repositório TextMask: https://github.com/text-mask/text-mask
- Não havia obrigatoriedade de o campo `quantidade` ser modelado como do tipo number, neste caso optei por string, acompanhado já da unidade de medida escolhida.
  

### Estrutura de rotas
- / - `ListagemComponent`
    - /listagem `ListagemComponent`
    - /cadastro `CadastroComponent`
- ** `NotFoundComponent`


# Tarefa

Construir uma aplicação web para realizar o cadastro de itens.

A aplicação deverá ser composta por 2 páginas, sendo uma para cadastro e outra para listagem. Ambas as páginas devem possuir um menu lateral, localizado à esquerda, com links para as mesmas, além de um sistema de navegação estrutural.

Os dados devem ser persistidos no formato JSON, fazendo uso da LocalStorage, adicionando, removendo e editando itens do JSON em questão. Não é necessária a utilização de APIs.

Cada página será melhor descrita a seguir:

## 1- Formulário:
Deve ser criado um formulário com validação conforme os campos descritos a seguir para cadastro de itens. É necessário informar com clareza os campos que apresentem erro de validação ou obrigatoriedade.

| Campo | Tipo | Obrigatoriedade | Validação |
| --- | --- | --- | --- |
| Nome do item | Texto | Sim | Tamanho máximo de 50 caracteres (somente letras) |
| Unidade de medida | Enumeração \* | Sim | - |
| Quantidade | Numérico | Não | Varia conforme regra da unidade medida \*\* |
| Preço | Monetário | Sim | Validações de campo monetário\*\*\* |
| Produto perecível | Checkbox booleano | Sim | - |
| Data de validade | Data | Só é obrigatório caso o produto seja perecível | Data no formato pt-Br. Caso a data de validade seja inferior a data atual deve informar que o produto encontra-se vencido. |
| Data de fabricação | Data | Sim | Data no formato pt-Br e não pode ser superior a data de validade (caso seja um produto perecível) |

\* Enumeração contendo os seguintes valores: Litro, Quilograma, Unidade.

\*\* Regra da unidade de medida:

- Campos com unidade de medida em litro deve permitir somente números, com até 3 casas decimais e apresentar a abreviatura &quot;lt&quot; ao final do campo (addon);

- Campos com unidade de medida em Quilograma deve permitir somente números, com até 3 casas decimais e apresentar a abreviatura &quot;kg&quot; ao final do campo (addon);

- Campos com unidade de medida em Unidade deve permitir somente números inteiros e apresentar a abreviatura &quot;un&quot; ao final do campo (addon);

\*\*\* Validação de campo monetário incluí exibição do tipo de moeda no início do campo e limite de casas decimais utilizando máscara (preenchimento da direita para esquerda).

O formulário deverá possuir dois botões, um para salvar e outro para cancelar. Ao selecionar o botão de salvar, caso esteja editando um item, deve salvar essas alterações, do contrário um novo será adicionado. O botão de cancelar direciona o usuário para a tela de listagem.

## 2- Listagem:

A listagem deverá exibir uma tabela com os itens cadastrados, bem como um link para edição e exclusão de cada item, e um botão para adicionar um novo item. A busca dos itens para listagem deve ser realizada de forma assíncrona. Ao clicar em excluir o usuário deverá ser questionado se realmente deseja excluir o item em questão. Caso sim, o item deverá ser removido e exibida uma notificação de sucesso ou erro.

Ao clicar em editar, o usuário deverá ser redirecionado para o formulário, carregado com os dados do item em questão. O botão de adicionar apenas redirecionará para a página do formulário.

#### Tecnologias e conceitos que serão avaliados:

- Angular 2 + (caso necessário pode ser realizado com Angular JS);
- HTML 5;
- CSS;
- TypeScript / JavaScript;
- Rotas;
- Utilização de LocalStorage;
- Recomenda-se a utilização da biblioteca PrimeNG.

Critérios de avaliação da tela:

- Usabilidade e experiência de uso;
- Responsividade (deve ser ajustável a diferentes tamanhos de tela);
- Padrão visual;
- Cross-browser (deve ser utilizavel em ie 10 +, Edge, Chrome, FireFox)

Critério de avaliação do código:

- Qualidade;
- Clareza;
- Documentação;
- Reutilização (criação de componentes);
