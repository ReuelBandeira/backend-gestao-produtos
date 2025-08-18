FROM node:20-alpine

WORKDIR /usr/src/app

# Instalar netcat para testar conexão
RUN apk add --no-cache netcat-openbsd

# Copiar package files
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install --frozen-lockfile

# Copiar código
COPY . .

# Expor porta
EXPOSE 3334

# Script simples: aguarda porta + migrations + app
CMD sh -c '\
  echo "Aguardando MySQL na porta 3306..."; \
  while ! nc -z $DB_HOST $DB_PORT; do \
  echo "MySQL não está disponível - aguardando..."; \
  sleep 2; \
  done; \
  echo "MySQL disponível! Aguardando 5s para estabilizar..."; \
  sleep 5; \
  echo "Executando migrations..."; \
  yarn typeorm migration:run; \
  echo "Iniciando aplicação..."; \
  yarn dev'
