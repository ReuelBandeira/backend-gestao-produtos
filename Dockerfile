FROM node
WORKDIR /usr/src/app

# Copiar o código para o contêiner
COPY . /usr/src/app

# Definir o fuso horário
ENV TZ=America/Manaus

# Atualizar a lista de pacotes e instalar o netcat-openbsd
RUN apt-get update && apt-get install -y netcat-openbsd

# Instalar o Yarn globalmente, forçando a instalação para garantir a versão mais recente
RUN npm install -g yarn@latest --force

# Instalar as dependências do projeto
RUN yarn install

# Adicionar ts-node
RUN yarn add ts-node@latest

# Expor a porta
EXPOSE 3334

# Comando para iniciar a aplicação
CMD ["yarn", "dev"]

