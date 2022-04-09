FROM node:alpine

WORKDIR /home/api

COPY package*.json .

RUN npm i

COPY . .

CMD npm run start:dev