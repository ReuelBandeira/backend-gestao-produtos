# Documento de instalação Projeto Gestão de Produtos

## Configuração do Backend

---

<br></br>

### Sumário

#### 1. Tecnologias

#### 2. Estrutura de pastas Backend

#### 4. Pré-requisitos

#### 5. Clonar o Projeto para o ambiente local

#### 6. Inicializar o projeto Utilizando docker e docker compose

#### 7. Opcional inicializar o projeto localmente usando Yarn (Instalação e configurações de pacotes)

#### 8. Documentação da API com Swagger

#### 9. Testando as Rotas com Insomnia

<br></br>

---

## 1. Tecnologias

- [NodeJS](https://nodejs.org/en/docs/)
- [Typeorm](https://typeorm.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Mysql](https://dev.mysql.com/doc/)
- [Swagger]('https://swagger.io/')
- [MySQL]('https://www.mysql.com/')
- [Docker]('https://www.docker.com/')
- [Docker Compose]('https://docs.docker.com/compose/')
- [JWT (JSON Web Token)]('https://jwt.io/')

### Justificativas para as Tecnologias Utilizadas

#### NodeJS

- **JavaScript no Servidor:** Node.js permite utilizar JavaScript no lado do servidor, proporcionando uma base de código única entre frontend e backend.
- **Assíncrono e Não Bloqueante:** Node.js é construído em torno de um modelo de I/O não-bloqueante, ideal para aplicações de alta demanda e escaláveis.
- **Grande Ecossistema:** A comunidade ativa do Node.js oferece uma vasta gama de bibliotecas e ferramentas através do npm.

#### TypeScript

- **Tipagem Estática:** TypeScript adiciona tipagem estática ao JavaScript, ajudando a detectar erros durante o desenvolvimento, o que melhora a qualidade do código.
- **Código Mais Legível:** A sintaxe mais rica de TypeScript torna o código mais legível e fácil de manter.
- **Suporte a ES6+:** TypeScript suporta as funcionalidades mais recentes do JavaScript, permitindo escrever código moderno e compatível.

#### TypeORM

- **ORM Maduro:** TypeORM é um ORM (Object-Relational Mapping) maduro, que facilita a interação com bancos de dados relacionais.
- **Suporte a Múltiplos Bancos de Dados:** TypeORM suporta diversos bancos de dados, permitindo flexibilidade na escolha do sistema de gerenciamento de banco de dados.
- **Integração com TypeScript:** TypeORM é totalmente integrado com TypeScript, proporcionando uma experiência de desenvolvimento mais coesa.

#### MySQL

- **Banco de Dados Relacional Popular:** MySQL é um dos sistemas de gerenciamento de banco de dados mais populares, amplamente utilizado para aplicações web.
- **Alta Performance:** MySQL é conhecido por sua alta performance em operações de leitura e escrita.
- **Comunidade e Suporte:** MySQL tem uma vasta comunidade e excelente suporte, com uma rica documentação e muitos recursos disponíveis.

#### Swagger

- **Documentação Automática:** Swagger permite a geração automática de documentação para APIs RESTful, facilitando o entendimento e o uso da API por desenvolvedores.
- **Testes Diretos na Documentação:** A interface do Swagger permite testar diretamente os endpoints da API, sem a necessidade de ferramentas externas.
- **Padrão de Mercado:** Swagger é amplamente reconhecido e utilizado no mercado, o que facilita a integração com outras ferramentas e equipes.

#### Yarn

- **Gerenciamento de Pacotes Rápido:** Yarn é um gerenciador de pacotes que proporciona uma instalação mais rápida e confiável em comparação ao npm.
- **Workspaces:** Suporte a workspaces, permitindo o gerenciamento de monorepos com facilidade.
- **Determinismo:** Yarn garante que as instalações de pacotes sejam consistentes em diferentes ambientes, evitando problemas de compatibilidade.

#### Docker

- **Ambientes Isolados:** Docker permite a criação de contêineres, garantindo que a aplicação rode de maneira consistente em qualquer ambiente.
- **Facilidade de Deploy:** Com Docker, é possível empacotar a aplicação com todas as suas dependências, facilitando o deploy em diferentes servidores.
- **Escalabilidade:** Docker facilita a escalabilidade da aplicação, permitindo o gerenciamento eficiente de recursos.

#### Docker Compose

- **Orquestração Simples:** Docker Compose permite a orquestração de múltiplos contêineres com facilidade, ideal para ambientes de desenvolvimento e produção.
- **Configuração em Arquivo Único:** Toda a configuração da aplicação, como serviços, volumes e redes, pode ser gerida em um único arquivo YAML.
- **Automação:** Docker Compose permite automatizar o start, stop e rebuild de serviços, aumentando a eficiência no desenvolvimento.

#### JWT (JSON Web Token)

- **Segurança e Autenticação**: JWT é uma solução eficiente para autenticação e autorização em aplicações web, permitindo que informações seguras sejam transmitidas entre cliente e servidor.

- **Compacto e Seguro**: JWTs são compactos, fáceis de gerar e podem ser assinados e criptografados, garantindo a integridade e autenticidade dos dados.

- **Estateless**: Com JWT, o servidor não precisa manter o estado da sessão, pois todas as informações necessárias estão contidas no próprio token, facilitando a escalabilidade da aplicação.

## 2. Estrutura de pastas Backend

Seguindo um pouco do conceito de DDD e SOLID

- 📦 src
  - 📂 config: Arquivos de configuração
  - 📂 modules: Camada das Entidades da aplicação
    - 📂 NOME_DA_ENTIDADE: Referência o nome do módulo desenvolvido
      - 📂 dtos: Modelos do projeto
      - 📂 infra: Camada da aplicação em que usa diretamente alguma Tecnologia ou Protocolo
        - 📂 http: Camada responsável pelo protocolo HTTP
          - 📂 controllers: Camada responsável pelo Controller da entidade usando as funções definidas pelo REST
          - 📂 routes: Camada responsável por definir as rotas da entidade
        - 📂 typeorm: Camada responsável pelo TypeOrm
          - 📂 entities: Camada responsável por definir a entidade
          - 📂 respositories: Camada reponsável pela implementação
      - 📂 repositories: Camada reponsável por definir a estrutura do repositório
      - 📂 providers(opcional): Camada responsável por definir um serviço próprio da entidade
        - 📂 implementations: Camada responsável por implementar através da tecnologia/serviço
        - model: Camada responsável por definir o modelo da implementação
      - 📂 services: Camada responsável por aplicar as regras de negócio da aplicação e das funcionaidades. Exemplo: Service para criar usuário
  - 📂 shared: Camada referente a tudo aquilo que for compartilhável por toda a aplicação
    - 📂 container: Camada responsável por definir/unir todas as injeções de dependência
      - 📂 providers(opcional): Camada responsável pelos serviços
        - 📂 NOME_SERVICO: Camada responsável pelo serviço em específico)
          - 📂 implementations: Camada responsável por implementar através da tecnologia/serviço
          - 📂 model: Camada responsável por definir o modelo da implementação
    - 📂 erros: Camada responsável por definir o tratamento de exceções
    - 📂 infra: Camada da aplicação em que usa diretamente alguma Tecnologia ou Protocolo
      - 📂 http: Camada responsável pelo protocolo HTTP e pela definição do servidor(ex: server.js)
        - 📂 routes: Camada responsável por unir todas as rotas da aplicação
      - 📂 typeorm: Camada responsável pelo TypeOrm
        - 📂 database: Camada responsável pelo banco de dados

---

## 4. Pré-requisitos <br></br>

- Sistema operacional Linux instalado - Ubuntu 20.04

- https://ubuntu.com/download/desktop <br/><br/>

- ️ Instalar VS CODE para visualizar os projetos

  - https://code.visualstudio.com/Download <br/><br/>

- Instalar a versão Git 2.25.1 LTS (ou superior LTS)

- https://git-scm.com/download/linux

  ou instale via linha de comando no terminal de Ubuntu

  ```sh
  $ sudo apt update
  $ sudo apt install git-all
  ```

  Após a instalação, você pode acessar o Git a partir do Terminal.
  Para verificar se a instalação foi bem-sucedida, abra um novo terminal e digite:

  ```sh
  git --version
  ```

  Você deverá ver a versão do Git instalada no seu sistema.

OBS:Caso utilize o docker e docker composse, passar para o item de número 6 ( Inicializar o projeto Utilizando docker e docker compose)

- ️ Instalar Node versão 16.13.1 LTS (ou versão superior LTS)

  - https://nodejs.org/en/download/ <br/><br/>

    - Obs: Existe várias formas de instalação do node, uma delas é via package manager. Se optar por essa forma de instalação, é necessário da instalação do <b>CURL</b>.<br/><br/>
      \*Para instalar o <b>CURL</b> acesse o link abaixo

      ```sh
      https://curl.se/
      ```

      ou instale via linha de comando no terminal de Ubuntu

      ```sh
      sudo apt  install curl  # version 7.68.0-1ubuntu2.7
      ```

  - Verificar se o Node.js e NPM estão instalados.<br/>
    Quando instalamos o Node.js o gerenciador de pacotes NPM também é instalado, para confirmar a instalação do Node.js e NPM abra o terminal de comando do Ubuntu e execute os comandos abaixo <br/><br/>

    ```sh
    node --version
    ```

    ou

    ```sh
    npm --version
    ```

  se a instalação estiver correta a resposta do terminal deve conter algo assim.

  ```sh
    $ node --version
    v16.13.1
  ```

  ```sh
  $ npm --version
  v10.8.1
  ```

- ️ Instalar Yarn versão 1.22.17 LTS (ou versão superior LTS)

  - https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable

    ```sh
    $ sudo npm install --global yarn
    ```

- ️ Instalar o Banco de Dados do MySQL Server no Ubuntu:

  - Atualize a lista de pacotes:

  No terminal :

  ```sh
   sudo apt-get update
  ```

  Instale o MySQL Server:

  ```sh
  sudo apt-get install mysql-server
  ```

  Proteja a instalação do MySQL:

  Após a instalação, você pode executar o script de segurança do MySQL para definir uma senha root e remover usuários anônimos e bases de dados de teste:

  ```sh
  sudo mysql_secure_installation
  ```

  Quando solicitado, escolha uma senha segura para o usuário root.
  Responda Y (sim) para todas as perguntas subsequentes para garantir uma instalação segura.
  Acesse o MySQL com o usuário root:

  ```sh
  sudo mysql -u root -p
  ```

  Digite a senha que você criou anteriormente.
  Crie um novo usuário com privilégios totais (opcional):

  Se você preferir usar um usuário diferente do root, siga estes passos:

  ```sh
  CREATE USER 'nome_do_usuario'@'localhost' IDENTIFIED BY 'sua_senha';
  ```

  Liberação de privilegios total:

  ```sh
  GRANT ALL PRIVILEGES ON *.* TO 'nome_do_usuario'@'localhost' WITH GRANT OPTION;
  FLUSH PRIVILEGES;
  ```

  Substitua 'nome_do_usuario' por um nome de usuário desejado e 'sua_senha' por uma senha forte.

  Exemplo de credenciais para o .env:

  No arquivo .env do projeto, você pode usar as seguintes credenciais:

  ```sh
  DB_USERNAME='root'
  DB_PASS='P@ssw0rd'
  ```

  (Opcional) Instale o MySQL Workbench:

  O MySQL Workbench é uma ferramenta gráfica para gerenciar o banco de dados. Para instalar:

  ```sh
  sudo apt-get install mysql-workbench
  ```

  Depois de instalar, você pode abri-lo e conectar-se ao seu banco de dados usando o usuário e a senha configurados.

- ✔️ Instalar Docker versão 24.0.2 LTS (ou versão superior LTS)

  - https://docs.docker.com/engine/install/ubuntu/
  - Dar privilégios para o Docker não pedir o “Sudo” durante a execução dos seus comandos.
  - https://docs.docker.com/engine/install/linux-postinstall/ <br/><br />

- ✔️ Instalar Docker-compose versão 1.29.2 LTS (ou versão superior LTS)
- https://docs.docker.com/compose/install/ <br /><br />

---

## 5. Clonar o Projeto para o ambiente local <br></br>

Vá até o diretório que deseja colocar o projeto e execute o seguinte comando para clonar:

```sh
git clone URL_DO_REPOSITORIO
```

Substitua URL_DO_REPOSITORIO pela URL do repositório que você deseja clonar. Você pode encontrar a URL no canto superior direito da página do repositório no GitHub.

seu comando é pra ficar parecido com este:

```sh
git clone https://github.com/ReuelBandeira/Backend-Gestao-Produtos.git
```

Adicione usuário e senha do git para clonar o repositório.

---

## 6. Inicializar o projeto Utilizando docker e docker compose

- É preciso ter instalado o docker e o Docker-compose, recomendações: Docker versão 24.0.2 LTS (ou versão superior LTS) Docker-compose versão 1.29.2 LTS (ou versão superior LTS)

### Configure o .env <br></br>

- Renomei e salve o arquivo que se encontra na raiz 'env-docker' para .env , seu arquivo deve parecer este:

  ```sh
  DB_HOST=db
  DB_PORT=3306
  DB_USERNAME='root'
  DB_PASS=P@ssw0rd
  DB_NAME='management'
  PORT=3334
  ```

### Inicializar aplicação com docker compose <br></br>

- Para construir as imagens:

  ```sh
  docker-compose build
  ```

- Para subir os contêineres:

  ```sh
  docker-compose up -d
  ```

  Se tudo ocorreu bem o projeto já esta estartado com sucesso. Ao visualizar o log do container 'backend_app', no terminal terá essa informação :Api running 🚀 on port 3334

- OBS:Se você está enfrentando problemas relacionados ao cache no Docker,pode utilizar esse comando para limpeza e refazer o passo anterior:

  ```sh
  docker system prune --all --force --volumes
  ```

  ***

## 7. Opicional inicializar o projeto localmente usando Yarn (Instalação e configurações de pacotes) <br></br>

No diretório do projeto execute os seguintes comandos para instalar os pacotes

```sh
yarn install
```

Se aparecer algum erro de permissão tente rodar com sudo:

```sh
sudo yarn install
```

dentro de backend/ execute os seguintes comandos para verificar as ultimas atualizações na branch:

```sh
git pull
```

isso irá manter sua branch atualizada com as ultimas modificações feitas.

Antes de inicializar é preciso configurar o arquivo .env na raiz do projeto

### Configure o .env <br></br>

- Crie um novo arquivo na raiz do seu backend com o nome '.env'

  ```sh
  DB_HOST=
  DB_POR=
  DB_USERNAME=
  DB_PASS=
  DB_NAME=
  PORT=
  ```

ou renomeie e salve o arquivo que se encontra na raiz 'env-exemple' para '.env' , seu arquivo deve parecer este:

    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME='root'
    DB_PASS=P@ssw0rd
    DB_NAME='management'
    PORT=3334

### Rodar migrations <br></br>

Antes de inicializar o projeto você precisará rodar as migrations, elas irão configurar as tabelas do seu banco.

execute o comando abaixo para rodar as migrations ainda no seu diretório backend

```sh
yarn typeorm migration:run
```

### Inicializar com yarn <br></br>

Após instalar os pacotes você estará pronto para executar o projeto

No backend voçê deve startar o projeto com dev:

```sh
yarn dev
```

---

## 8. Documentação da API com Swagger <br></br>

O projeto utiliza o Swagger para fornecer uma documentação interativa e amigável da API. A seguir, estão as instruções para acessar e utilizar a documentação Swagger.

- Após iniciar o servidor, abra um navegador da web e acesse a documentação Swagger usando o seguinte URL:

```sh
http://localhost:3334/api-docs
```

- Obtenha um Token: Primeiro, você precisa autenticar-se para obter um token JWT. Utilize o endpoint '/sessions' para autenticar e obter um token , poderá nesse momento utilizar o usario administrador, para fins didático este usuario ja esta cadastrado, podendo em seguida criar outros no endpoint /employee.

```sh
{
  "username": "admin",
  "password": "admin"
}
```

- Configure o Token no Swagger UI: No canto superior direito da interface do Swagger, clique no botão "Authorize".Na janela que aparecerá, insira o token JWT no campo Authorization no formato Bearer token. Utilize este IREDES token.
- Clique em "Authorize" para aplicar o token a todas as requisições.
- Realize Requisições Autenticadas

  Com o token JWT configurado, você poderá acessar os endpoints que exigem autenticação. Todos os endpoints protegidos na documentação Swagger exigem que o token seja incluído no cabeçalho da solicitação.

---

## 9. Testando as Rotas com Insomnia

Este projeto utiliza Insomnia para testar as rotas da API. A seguir estão as instruções para configurar e executar testes de API utilizando Insomnia.

- Baixe e Instale o Insomnia

  Visite a página de downloads do Insomnia e baixe a versão adequada para seu sistema operacional. Siga as instruções de instalação para configurar o Insomnia em sua máquina.

  ```sh
  https://insomnia.rest/download
  ```

- Configurando o Insomnia

  Importando o Arquivo de Configuração: Clique no ícone de Importar/Exportar na parte superior esquerda da tela;
  Selecione a opção Importar Dados;
  Navegue até o caminho do arquivo de configuração localizado na raiz do projeto:

  ```sh
  ex:../backend/Insomnia/rotas_produtos_2024-08-23.json
  ```

- Visualize e Execute as Requisições:

  Após a importação, você verá todas as rotas e configurações disponíveis no Insomnia;

  Selecione a rota que deseja testar e ajuste os parâmetros conforme necessário;

  Execute as requisições para verificar o funcionamento das APIs;

---

# Comandos git commit

- git add --all
- git commit -m "feat: commit"
- git push

# Comando git para atualizar projeto

- git pull
