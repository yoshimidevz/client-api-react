# 🧑‍💼 Gerenciador de Usuários

Este projeto é um **gerenciador de usuários** que realiza operações de **listagem**, **busca**, **edição** e **exclusão** de usuários armazenados em um banco de dados. A aplicação é dividida em duas partes principais:

- **Frontend**: Interface web desenvolvida com React + Bootstrap.
- **Backend**: API construída em PHP com rotas REST, conectada a um banco de dados MySQL.

## Requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Composer](https://getcomposer.org/) instalado na máquina (opcional, pode rodar pelo container)

## Como rodar o projeto

1. **Clone este repositório:** https://github.com/mitugui/bd_II_api_php
2. **Instale as dependências da API**: composer install
3. **Inicie os containers**: docker-compose up -d
4. **Acesse a aplicação**: 
    Frontend: http://localhost:5173
    Backend/API: http://localhost:8080
    # OBS: se a aplicação frotend não estiver rodando, deve-se acessar o repositório https://github.com/yoshimidevz/client-api-react e rodar o npm run dev.