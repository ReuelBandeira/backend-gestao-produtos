-- Crie o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS management;

-- Altere o usuário para usar o protocolo de autenticação mysql_native_password
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'P@ssw0rd';

-- Recarregue as permissões
FLUSH PRIVILEGES;

