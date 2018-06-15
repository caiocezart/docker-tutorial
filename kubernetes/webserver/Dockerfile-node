# a partir de qual sistema base o seu aplicativo vai funcionar
# {nome-da-imagem}:{tag}
# nome-da-imagem -> nome que identifica o repositorio/imagem
# tag -> versão do container
#
# node:9-alpine
# alpine é uma distribuição unix com o mínimo de pacotes necessários instalado. Nem mesmo o bash vem instalado.
# a imagem do node então inicia a partir do alpine e instala apenas os pacotes necessários para rodar o node no sistema
# recomendo analisar o Dockerfile da imagem em si: 
# https://github.com/nodejs/docker-node/blob/9023f588717d236a92d91a8483ff0582484c22d1/9/alpine/Dockerfile
FROM node:9-alpine

# copiar arquivos
COPY package.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

# ir para o diretorio /app
WORKDIR /ng-app

COPY . .

RUN $(npm bin)/ng build

CMD ["node", "server.js"]