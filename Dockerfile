FROM node:16.17 as build

WORKDIR /usr/src/app

COPY ./ ./
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install

RUN --mount=type=cache,target=./node_modules/.cache/webpack yarn build

EXPOSE 3000
CMD node ./src/server.js






