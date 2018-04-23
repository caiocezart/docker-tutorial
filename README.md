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

## O que vem depois?
Em um ambiente com dezenas/centenas ou até mesmo milhares de containers rodando em um computador ou em 100 computadores ao mesmo tempo:

- Como saber quais portas estão sendo utilizadas (expostas) para lançar um novo container?

- Como manter o controle de onde cada container está rodando para fazer o correto link entre eles?

- Como criar recuperações automáticas do container em caso de falhas?

- Como criar balanceamento de carga entre os containers?

- Como auto-escalar os containers?