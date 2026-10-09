# API de Autenticação e Gerenciamento de Usuários 🐳

Esta é uma API RESTful completa de cadastro e login de usuários construída com foco em segurança de dados e infraestrutura moderna de conteinerização. 

O projeto foi desenvolvido seguindo a metodologia do curso **DevClub**, com o upgrade técnico de arquitetura isolada via Docker e banco NoSQL.

## Tecnologias Utilizadas

*   **Node.js & Express**: Ambiente de execução e gerenciamento de rotas.
*   **Prisma ORM (v6)**: Integração estável de dados com banco de dados.
*   **MongoDB Atlas**: Banco de dados NoSQL em nuvem baseado em documentos.
*   **Bcrypt**: Hashing de segurança para criptografia de senhas.
*   **JSON Web Token (JWT)**: Geração e validação de tokens para rotas privadas.
*   **Docker**: Conteinerização e portabilidade completa da aplicação.

## Funcionalidades e Segurança

*   **POST `/cadastro`**: Realiza o registro de novos usuários utilizando criptografia de senhas através de Salts com Bcrypt.
*   **POST `/login`**: Valida as credenciais guardadas no MongoDB e retorna um token de acesso JWT seguro.
*   **Middleware de Autenticação**: Um segurança de rotas personalizado (`auth.js`) que intercepta requisições privadas, extrai, limpa e valida tokens digitais antes de liberar dados confidenciais.

## Como Executar o Projeto com Docker

Para rodar esta API na sua máquina local de forma isolada, garanta que possui o Docker Desktop instalado e execute as instruções abaixo no terminal:

1. **Construir a imagem do contêiner:**
   ```bash
   docker build -t minha-api-devclub .
   ```

2. **Iniciar a aplicação injetando as variáveis de ambiente:**
   ```bash
   docker run -d -p 3000:3000 -e DATABASE_URL="SUA_STRING_DO_MONGODB" -e JWT_SECRET="SUA_CHAVE_JWT" --name api-container minha-api-devclub
   ```
