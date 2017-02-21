// Crie um arquivo 'app-config.ts' baseado neste template.

// Dados da sua conta no Auth0, disponiveis em:
// https://manage.auth0.com/#/clients
export const shared = {
  auth0: {
    domain: null,
    clientId: null,
  }
};

// Estes dados são confidenciais. Nunca importe-os em código dentro de 'client/'
export const secret = {
  auth0: {
    // Também disponível em https://manage.auth0.com/#/clients
    secret: null,

    // Um usuário válido para testes de integração.
    // Ele precisa existir no BD do Auth0.
    testUser: {
      id: null, // ex.: 'auth0|blabla...',
      username: null, // ex.: 'admin'
    }
  },

  // Credenciais para conectar-se ao banco de dados ArangoDB.
  arangodb: {
    rootpasswd: "",
    host: "localhost",
    port: "8529",

    // Este usuário será criado junto com o banco de dados.
    username: "repr",
    password: "repr"
  }
};
