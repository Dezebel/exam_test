FROM node:16-alpine

WORKDIR /final-exam-server

ADD ./package.json ./
ADD ./yarn.lock ./
ADD ./tsconfig.json ./
ADD ./.env ./
RUN yarn

CMD yarn start