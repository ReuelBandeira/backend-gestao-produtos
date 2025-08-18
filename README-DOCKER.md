# 🐳 Executando o Projeto com Docker

Este projeto está configurado para rodar completamente com Docker e Docker Compose.

## 📋 Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado e rodando
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

## 🚀 Inicialização

### **Comandos Básicos:**

```bash
# 1. Construir e iniciar
docker-compose up --build

# 2. Para rodar em background
docker-compose up --build -d

# 3. Para parar
docker-compose down

# 4. Para parar e remover volumes (resetar banco)
docker-compose down -v
```

## 🔧 Configurações

### **Portas:**

- **API:** http://localhost:3335
- **Banco MySQL:** localhost:3307

### **Credenciais do Banco:**

- **Host:** db (container)
- **Porta:** 3306 (interno)
- **Usuário:** root
- **Senha:** P@ssw0rd
- **Banco:** management

## 📊 Comandos Úteis

```bash
# Ver logs em tempo real
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f app
docker-compose logs -f db

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (resetar banco)
docker-compose down -v

# Reconstruir containers
docker-compose build --no-cache

# Acessar container da aplicação
docker-compose exec app sh

# Acessar banco MySQL
docker-compose exec db mysql -u root -p
```

## 🗄️ Banco de Dados

### **Primeira Execução:**

1. O container MySQL será criado automaticamente
2. O banco `management` será criado
3. A aplicação iniciará

### **Resetar Banco:**

```bash
docker-compose down -v
docker-compose up --build
```

## 🐛 Troubleshooting

### **Problema: Porta já em uso**

```bash
# Verificar o que está usando a porta
lsof -i :3335  # Linux/Mac
netstat -an | findstr :3335  # Windows

# Parar o processo ou mudar a porta no docker-compose.yml
```

### **Problema: Erro de conexão com banco**

```bash
# Verificar se o container MySQL está rodando
docker-compose ps

# Ver logs do MySQL
docker-compose logs db

# Reiniciar apenas o banco
docker-compose restart db
```

### **Problema: Erro de permissão no Windows**

- Execute o PowerShell como Administrador
- Verifique se o Docker Desktop está rodando

## 📁 Estrutura dos Arquivos Docker

```
├── docker-compose.yml      # Configuração dos serviços
├── Dockerfile             # Imagem da aplicação
├── env-docker            # Variáveis de ambiente (opcional)
└── mysql-init/           # Scripts de inicialização do MySQL
    └── init.sql         # Criação do banco e usuário
```

## 🔄 Desenvolvimento

### **Hot Reload:**

- O código está mapeado como volume
- Alterações são refletidas automaticamente
- Use `yarn dev` para desenvolvimento

### **Logs:**

- A aplicação mostra logs detalhados
- Use `docker-compose logs -f app` para acompanhar

## ✅ Verificação de Funcionamento

Após iniciar, verifique:

1. **Container rodando:** `docker-compose ps`
2. **API respondendo:** http://localhost:3335
3. **Banco conectando:** `docker-compose logs app`

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs: `docker-compose logs`
2. Reinicie os containers: `docker-compose restart`
3. Reconstrua: `docker-compose up --build`
4. Reset completo: `docker-compose down -v && docker-compose up --build`
