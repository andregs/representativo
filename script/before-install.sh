#!/bin/bash
set -eu

# Instala o ArangoDB
echo arangodb3 arangodb3/password password root | sudo debconf-set-selections
echo arangodb3 arangodb3/password_again password root | sudo debconf-set-selections
curl -s -L https://www.arangodb.com/repositories/travisCI/setup_arangodb_3.1.12.sh -o setup_arangodb.sh
chmod +x setup_arangodb.sh
./setup_arangodb.sh > arango.log
grep -v ^ArangoDB- arango.log

# Cria o arquivo de configuração do nosso app
echo "export const config = { auth0: { domain: '$AUTH0_DOMAIN', clientId: '$AUTH0_CLIENT_ID' } };" > app-config.ts

# Prepara a chave p/ entrar no servidor
set +x
openssl aes-256-cbc -k "$super_secret_password" -in deploy-key.enc -out deploy-key -d
chmod 600 deploy-key
mv deploy-key ~/.ssh/id_rsa
