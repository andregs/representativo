# Modelo de Dados

| [README](../README.md) | Modelo de Dados | [Referência da API](./doc/referencia-api.md) |
|------------------------|-----------------|----------------------------------------------|

Esta é a definição dos grafos que compõem o banco de dados do Representativo.

Aqui são apresentados somente os dados que são persistidos no ArangoDB.
Outras informações como, por exemplo, valores calculados em tempo de execução foram omitidas.
Assim, esta é uma documentação fiel das estruturas de dados encontradas no BD.

## Definição dos Grafos

### Usuários (userGraph)
- Cada usuário (`user`) está ligado à localidade em que vive (`location`).

```ts
[user] -liveIn-> [location]

user {
  _key: string,
  email: string,
  name: string,
  emailVerified: boolean,
  picture: string,
  nickname: string,
  admin: boolean, // administrador do sistema
  createdAt: Date,
  updatedAt: Date,
}
```

### Rede Social (socialGraph)
- Usuários podem seguir uns aos outros. A aresta `follow` aponta do usuário seguidor para o usuário seguido.

```ts
[user] -follow-> [user]

follow {
  createdAt: Date,
  updatedAt: Date
}
```

### Perguntas & Respostas (qaGraph)
- Usuários (`user`) estão ligados às perguntas (`question`) que responderam através da aresta `answer`.
- As perguntas estão ligadas aos seus respectivos autores através da aresta `questioner`.

```ts
[user] -answer-> [question] -questioner-> [user]
  
question {
  _key: string,
  title: string, // enunciado
  options: string[], // alternativas. length == 2
  createdAt: Date,
  updatedAt: Date
}

answer {
  _key: string,
  chosen: 0 | 1,
  opinion: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Geográfico (worldGraph)
- As localidades (`location`) estão divididas em três níveis: federal, estadual e municipal.
- Elas se ligam às suas sub-localidades através da aresta `include`.
- Exemplo: `[Brasil] -inclui-> [MinasGerais] -inclui-> [BeloHorizonte]`.

```ts
[location] -include-> [location]

location {
  _key: string,
  name: string
}
```

### Partidos Políticos (partyGraph)
- Partidos (`party`) são compostos de membros (`member`), que podem ser candidatos (`candidates`) em alguma localidade.
- Os usuários podem ser membros de, no máximo, 1 partido.
- Membros podem ser candidatos a, no máximo, 1 cargo.

```ts
[party] -member-> [user] -candidate-> [location]

party {
  _key: string, // sigla do partido
  code: number, // número do partido na urna
  name: string
}

member {
  _key: string,
  admin: boolean // admin do partido
}

candidate {
  _key: string,
  office: 'Presidente'
    | 'Vice-Presidente'
    | 'Governador'
    | 'Vice-Governador'
    | 'Prefeito'
    | 'Senador'
    | 'Deputado Federal'
    | 'Deputado Estadual'
    | 'Vereador'
}
```
