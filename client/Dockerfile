FROM node:12.22.1-alpine

ENV APP_HOME /dl_client

RUN mkdir -p ${APP_HOME}
WORKDIR ${APP_HOME}

ENV PATH ${APP_HOME}/node_modules/.bin:$PATH

COPY package.json ${APP_HOME}/package.json

RUN yarn install

EXPOSE 3001