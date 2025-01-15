# Usa a imagem oficial do Node.js como base
FROM node:14

# Cria o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código-fonte da aplicação
COPY . .

# Define a porta que a aplicação vai usar
EXPOSE 80

# Comando para rodar a aplicação
CMD ["node", "src/app.js"]