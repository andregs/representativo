# Documentação da API

| [README](../README.md) | [Modelo de Dados](./doc/modelo-dados.md) | Referência da API |
|------------------------|------------------------------------------|-------------------|

## Endpoints para Gerenciamento dos Usuários

### GET /api/user/:username
Seleciona um usuário pelo seu `username`.

```ts
// when :username == me
{
  email: string,
  name: string,
  admin: boolean,
  me: true,
  followers: number,
  following: number,
  news: [{
    who: { _key: string, name: string },
    when: Date,
    action: 'ANSWERED' | 'FOLLOWED',
    questions: number // when action == ANSWERED
  }],
  myAnswers: [{ _key: string, title: string, when: Date }]
}

// when :username != me
{
  email: string,
  name: string,
  admin: boolean,
  me: false,
  followed: boolean, // by me
  agree: [{ _key: string, title: string }],
  disagree: [{ _key: string, title: string }],
  affinity: {
    // parece que isto não é mais preciso visto que pode ser obtido de agree + disagree
    answers: number, // num de questões respondidas por nós dois
    matches: number // num de questões para as quais demos a mesma resposta
  }
}
```

### POST /api/user/:username/upsert
Cria ou atualiza um usuário. Atualiza apenas atributos próprios do vértice `user`.

### POST /api/user/:username/follow
Segue um usuário.

### DELETE /api/user/:username/follow
Deixa de seguir um usuário.

### PATCH /user/:username
Atualiza um usuário. Não só os atributos próprios do vértice `user` como também 
a aresta `location` que representa onde ele mora.

```ts
// Exemplo de requisição
{
  name: "André Gomes",
  nickname: "André",
  location: "123" // _key de uma localidade
}
```

## Endpoints para Gestão das Perguntas & Respostas

### GET /api/question/random?skip={number}
Seleciona uma questão aleatória ainda não respondida pelo usuário autenticado.
Opcionalmente, passe uma `key` de pergunta em `skip` para pulá-la.

```ts
{
  _key: string,
  title: string,
  options: string[],
  questioner: {
    _key: string,
    name: string,
    nickname: string
  }
  createdAt: Date,
  updatedAt: Date
}
```

### GET /api/question/:key
Seleciona uma pergunta pela sua chave.

### POST /api/question
Cria uma nova pergunta.

```ts
{
  title: string,
  options: string[] // length == 2
}
```

### PATCH /api/question/:key
Atualiza uma dada pergunta.

```ts
{
  title: string,
  options: string[] // length == 2
}
```

### POST /api/answer/:questionKey
Responde uma pergunta.

```ts
{
  chosen: 0 | 1,
  opinion: string
}
```

### GET /api/answer/:key
Seleciona a resposta do usuário autenticado para a dada pergunta.

```ts
{
  _key: string,
  chosen: 0 | 1,
  opinion: string,
  question: {
    _key: string,
    title: string,
    options: string[],
    questioner: {
      _key: string,
      nickname: string,
      name: string
    }
  }
}
```

### POST /api/answer/:key
Atualiza uma resposta.

```ts
{
  chosen: 0 | 1,
  opinion: string
}
```

## Endpoints para Gestão das Localidades

### GET /api/location?lvl={0|1|2}&qry={string}
Procura por localidades. Os parâmetros `lvl` e `qry` são obrigatórios.
- `lvl == 0` procura por países;
- `lvl == 1` procura por estados;
- `lvl == 2` procura por cidades;
```ts
[
  { _key: string, name: string },
  { _key: string, name: string },
  ...
]
```

## Endpoints para Gestão dos Partidos Políticos

### GET /api/party
Seleciona todos os partidos políticos.

### GET /api/party/:key
Seleciona um partido pela sua sigla. Traz também a lista de membros.

```ts
[
  {
    _key: string,
    name: string,
    code: number,
    members: [{
      _key: string,
      admin: boolean,
      user: {
        _key: string,
        name: string,
        nickname: string,
        admin: boolean
      },
      candidate: {
        _key: string,
        office: string,
        location: { _key: string, name: string }
      }
    }]
  }
]
```

### POST /api/party
Cria um partido político. O usuário autenticado se torna automaticamente um membro administrador do partido.

### PATCH /api/party/:key
Atualiza um partido político.

### DELETE /api/party/:key
Exclui um partido político, sua lista de membros e candidatos.

### GET /api/party/:key/member?qry={string}
Pesquisa usuários para serem adicionados como membros do partido.
Ou seja, usuários que ainda não são membros de nenhum partido.

```ts
[
  { _key: string, name: string, nickname: string },
  { _key: string, name: string, nickname: string },
  ...
]
```

### POST /api/party/:key/member
Adiciona um novo membro ao partido.

```ts
// Exemplo de Requisição
{
  admin: boolean,
  user: { _key: string },
  candidate: {
    office: string,
    location: { _key: string }
  }
}
```

### POST /api/party/:partyKey/:memberKey/toggleAdmin
Inverte a flag que determina se o membro é administrador do partido.

### DELETE /api/party/:partyKey/:memberKey
Exclui o membro do partido.

## Endpoints para a Busca

### GET /api/search/:terms
Busca por usuários, partidos e questões.

```ts
{
  users: [
    { _key: string, name: string, nickname: string }
  ],
  parties: [
    { _key: string, name: string }
  ],
  questions: [
    { _key: string, title: string }
  ],
}
```
