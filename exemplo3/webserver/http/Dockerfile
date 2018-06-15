FROM node:9-alpine

COPY package.json ./

RUN npm i && mkdir /app && cp -R ./node_modules ./app

WORKDIR /app

COPY . .

CMD ["npm", "start"]