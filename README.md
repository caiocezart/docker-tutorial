# docker-tutorial
Alguns aplicativos para serem utilizados em uma aula básica de Docker. Tecnologias utilizadas:

- Docker - https://www.docker.com/
- NodeJS - https://nodejs.org/en/
- Mongo - https://www.mongodb.com/
- Angular5 - https://angular.io/


## /app1
- container1: Aplicação simples sem acesso a banco.

`docker run -p 8080:8080 -d docker-tutorial:1.0`

## /app2
- container1: Aplicação com acesso a banco de dados
- container2: banco de dados (mongo)

`docker run -d mongo`
`docker run -p 8181:8080 -d -link app-db:app-db docker-tutorial:2.0`

## /app3
- container1: Frontend
- container2: Backend
- container3: banco de dados

`docker run -p 8080:8080 docker-tutorial:1.0`
`docker run -d mongo`
`docker run -p 8181:8080 -d -link app-db:app-db docker-tutorial:2.0`