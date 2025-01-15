FROM node:16

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos do projeto para o contêiner
COPY . .

# Instala as dependências
RUN npm install

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o servidor
CMD ["node", "app.js"]