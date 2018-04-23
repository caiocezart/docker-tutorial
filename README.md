# docker-tutorial
Alguns aplicativos com NodeJS (backend) e Angular (frontend) para demonstrar alguns usos de caso com containers

## /app1
Aplicação simples sem acesso a banco. Ambos front e backend rodando no mesmo container.

`docker run -p 8080:8080 -d docker-tutorial:1.0`

## /app2
container1: Aplicação com front e back end com acesso a banco de dados
container2: banco de dados (mongo)

`docker run -d mongo`
`docker run -p 8181:8080 -d -link app-db:app-db docker-tutorial:2.0`

## /app3
container1: Frontend
container2: Backend
container3: banco de dados

`docker run -p 8080:8080 docker-tutorial:1.0`
`docker run -d mongo`
`docker run -p 8181:8080 -d -link app-db:app-db docker-tutorial:2.0`