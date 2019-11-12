FROM node:10

WORKDIR /microservice

COPY ./app/package.json /microservice
COPY ./app/index.js     /microservice
COPY ./app/app.js       /microservice
COPY ./app/controllers  /microservice/controllers
COPY ./app/routes       /microservice/routes
COPY ./app/models       /microservice/models

ENV GATEWAY_PORT=3000;
ENV GATEWAY_HOST='localhost';
ENV TOKEN_PATH='/validate'
ENV MONGO_URL='clustermongodb-1sv33.mongodb.net'
ENV MONGO_DB='up_tap'
ENV MONGO_USR='up_tap_veraz'
ENV MONGO_PASS='QoNCPCuTYSp3uAjC'
ENV PORT=3002
EXPOSE 3002

RUN npm install
CMD node index.js