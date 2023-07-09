FROM node:16.17.0

WORKDIR /usr/src/app

COPY package*.json ./
CMD ls
RUN npm install -g npm@9.8.0 && npm install -f

COPY ./src ./src

EXPOSE 3000
CMD [ "node", "src/server.js" ]




