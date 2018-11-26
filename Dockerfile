FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN yarn install

COPY . /usr/src/app

EXPOSE 8080
EXPOSE 3000
CMD ["yarn", "run", "start:prod"]