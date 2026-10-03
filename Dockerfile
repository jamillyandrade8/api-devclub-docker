# Baixa uma imagem oficial do Node v24 para ser o sistema base
FROM node:24

# Cria uma pasta interna dentro do contêiner para colocar o projeto
WORKDIR /usr/src/app

# copia os arquivos de configuração de pacotes para o contêiner
COPY package*.json ./

# Instala todas as dependências Express, Bcrypt, JWT, Prisma v6 lá dentro
RUN npm install

# Copia o resto dos arquivos do computador para dentro do contêiner
COPY . .

#Executa o gerador do Prisma v6 dentro do ambiente isolado do contêiner
RUN npx prisma generate

# Avisa ao Docker que o servidor Express vai rodar na porta 3000
EXPOSE 3000

# Comando oficial que o Docker vai rodar para ligar a API
CMD ["node", "server.js"] 