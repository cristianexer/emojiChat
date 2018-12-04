FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN yarn install

COPY . /usr/src/app

ENV PORT=3000 
ENV SOCKET_PORT=8080 
ENV HOST='0.0.0.0'
ENV MONGODB_URI='mongodb://heroku_9h9v22sl:abmm6u6v1nikdj3pi09cv0okc8@ds115874.mlab.com:15874/heroku_9h9v22sl'
ENV API_VERSION='2018-03-16'
ENV API_KEY='JIWGm3lxzHdk5tiqNxRiiDQJ2gPYLC3F-RChCqQaGJzf'
ENV API_URL='https://gateway-syd.watsonplatform.net/natural-language-understanding/api'
EXPOSE 3000 
EXPOSE 8080 
CMD ["yarn", "start:prod"]