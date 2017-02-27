// Para compilar a aplicação, você primeiro precisa fazer as seguintes configurações:

// Passo 1: Crie um arquivo 'app-config.ts' baseado neste template, cos os seguintes
// dados da sua conta no Auth0 (disponíveis em https://manage.auth0.com/#/clients)

export const config = {
  auth0: {
    domain: null, // ex.: foo.auth0.com
    clientId: null, // ex.: Ld479uUf4j9blablabla...
  }
};

// Passo 2: Defina as seguintes variáveis de ambiente no seu sistema operacional:

// O secret da sua conta no Auth0, disponível em https://manage.auth0.com/#/clients
// AUTH0_SECRET

// Um usuário válido para testes de integração. Ele precisa existir no Auth0.
// TEST_USER_ID=<ex.: auth0|58a27blablabla...>
// TEST_USERNAME=<ex.: foo>
// TEST_PASSWORD=<ex.: bar>

// Passo 3 (opcional): você pode definir as seguintes variáveis de ambiente para
// sobrescrever os valores padrão adotados pela aplicação.

// Credenciais para conectar-se ao banco de dados ArangoDB.
// ARANGO_HOST=127.0.0.1
// ARANGO_PORT=8529
// ARANGO_ROOTPASSWD=

// Este usuário será criado junto com o banco de dados.
// DB_USERNAME=repres
// DB_PASSWORD=repres
