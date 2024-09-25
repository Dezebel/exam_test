FROM node:16-alpine

WORKDIR /final-exam-client

ADD ./package.json ./
ADD ./yarn.lock ./
ADD ./tsconfig.json ./
ADD ./public ./public
RUN yarn

CMD yarn start