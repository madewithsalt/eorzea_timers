FROM node:7

RUN apt update -y && apt-get upgrade -y && apt-get install -y netcat

WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet

RUN npm install -g brunch@2
COPY . .
