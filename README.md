# docker-tutorial
Aplicativos para serem utilizados em uma aula sobre Docker.


## Objetivo
Demonstrar os benefícios da utilização de Docker em ambientes de desenvolvimento contínuo e integrado.


## Benefícios docker
- Compatibilidade (acaba com a famosa frase "funciona no meu computador")
- Versionamento
    - Uso de tags ajuda na rápida troca da versão em funcionamento
- Desenvolvimento contínuo:
    - Mantém as mesmas configurações desde os testes até produção
- Isolamento/Segurança
    - Docker garante o isolamento da aplicação e seus recursos entre os containers.
    - Um container tem todos os arquivos necessários para sua execução e os mesmos são completamente deletados ao remover o container. Nada fica para trás no sistema host.


## Tecnologias utilizadas:

- Docker - https://www.docker.com/
- NodeJS - https://nodejs.org/en/
- Mongo - https://www.mongodb.com/
- Angular5 - https://angular.io/


## Comandos básicos
Para mais informações refira-se a documentação oficial no site do Docker.

`docker build -t {tag} .`  
`docker run -p {porta-externa}:{porta-interna} --name {nome-container} --link {container-a-ser-linkado}:{apelido-para-o-link} -d {container}:{tag}`  
`docker ps -a`  
`docker rm -f`  


## Exercícios
Lembrando que estes exercícios não devem ser usados como referência de melhores práticas. A metodologia utilizada na construção dos mesmos foi escolhida com objetivo de facilitar o aprendizado.

Um exemplo é o uso do `--link` que é uma função obsoleta do Docker não devendo ser utilizada em produção. A alternativa para o mesmo efeito é a utilização de `user-defined networks`. Link para mais informações: https://docs.docker.com/network/bridge/

Para a utilização dos containers abaixo é necessário apenas que:  
- clone este repositório
- entre no diretório do exercicío escolhido
- monte o container com a sua devida tag: `docker build -t {nome}:{tag} .`
- execute o mesmo com seu respectivo comando
- informações mais específicas em cada tópico

Caso queira utilizar os exercícios localmente:  
- clone este repositório
- entre no diretório do exercicío escolhido
- instale os modulos npm: `npm install`
- monte o aplicativo angular: `ng build`
- inicie o webserver: `node server.js`


### /app1
- container1 (docker-tutorial:1.0): Aplicação simples sem acesso a banco.

![Alt text](./images/app1.png?raw=true "app1 diagram")

- Monte o container:  
`docker build -t docker-tutorial:1.0 .`  

- Rode o container e exponha a porta 8080 para acesso:  
`docker run -p 8080:8080 -d docker-tutorial:1.0`

Acesse no seu navegador: `http://localhost:8080`


### /app2
- container1 (docker-tutorial:1.0): Aplicação com acesso a banco de dados
- container2 (mongo): banco de dados (mongo)

Note que não há acesso externo ao banco de dados. Somente a aplicação tem acesso a rede que o banco está e a mesma consegue acessá-lo através do seu nome utilizando o serviço de DNS do Docker.

![Alt text](./images/app2.png?raw=true "app2 diagram")

- Monte o container:  
`docker build -t docker-tutorial:2.0 .`  

- Rode o container do banco de dados e de um nome para que possa ser utilizado pelo DNS da aplicação  
`docker run --name app-db -d mongo`  

- Rode o container da aplicação e exponha a porta 8181 para acesso:  
`docker run -p 8181:8080 --link app-db:app-db -d docker-tutorial:2.0`  

Acesse no seu navegador: `http://localhost:8181`

API:
- GET: `http://localhost:8181/nomes/`
- POST: `http://localhost:8181/nomes/` -- { 'data': { 'nome': 'Caio Trevisan' } }
- DELETE: `http://localhost:8181/nomes/_nome_id`


### /app3
- container1 (docker-tutorial-front:1.0): Angular5 Frontend
- container2 (docker-tutorial-back:1.0): NodeJS Backend
- container3 (mongo): Mongo banco de dados

Note que não há acesso externo ao backend e muito menos ao banco de dados. Somente a aplicação tem acesso a rede que o backend e o banco estão. E a mesma consegue acessá-los através do seus nomes utilizando o serviço de DNS do Docker.

![Alt text](./images/app3.png?raw=true "app3 diagram")


- Monte os containers:  
`docker build -t docker-tutorial-front:1.0 .`  
`docker build -t docker-tutorial-back:1.0 .`  

- Rode o container do banco de dados e de um nome para que possa ser utilizado pelo DNS do backend  
`docker run --name app-db -d mongo`  

- Rode o container do backend e de um nome para que possa ser utilizado pelo DNS do frontend  
`docker run --name app-back --link app-db:app-db -d docker-tutorial-back:1.0`  

- Rode o container do backend e exponha a porta 9090 para acesso:  
`docker run -p 9090:8080 --name app-front -link app-back:app-back -d docker-tutorial-front:1.0`  

Acesse no seu navegador: `http://localhost:9090`

API:
- GET: `http://app-back:8000/nomes/`
- POST: `http://app-back:8000/nomes/` -- { 'data': { 'nome': 'Caio Trevisan' } }
- DELETE: `http://app-back:8000/nomes/_nome_id`


## docker-compose
Ferramenta utilizada para a criação de vários containers ao mesmo tempo  

https://docs.docker.com/compose/compose-file/

Arquivo exemplo: `docker-compose.yml`

Comando para utilização: `docker-compose up`


## O que vem depois?
Em um ambiente com dezenas/centenas ou até mesmo milhares de containers rodando em um computador ou em 100 computadores ao mesmo tempo:

- Como saber quais portas estão sendo utilizadas (expostas) para lançar um novo container?

- Como manter o controle de onde cada container está rodando para fazer o correto link entre eles?

- Como criar recuperações automáticas do container em caso de falhas?

- Como criar balanceamento de carga entre os containers?

- Como auto-escalar os containers?