# Crochet API

API RESTful para gerenciamento de produtos de crochê, utilizando Node.js, TypeScript, Express e Sequelize com PostgreSQL.

---

## Índice

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Execução com Docker Compose](#execução-com-docker-compose)
- [Scripts](#scripts)
- [Endpoints](#endpoints)
- [Testes](#testes)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Sobre

Esta API tem como objetivo fornecer uma interface para consulta e gerenciamento de produtos de crochê, permitindo filtros por ID, marca, nome e faixa de TEX.

---

## Tecnologias

- Node.js
- TypeScript
- Express
- Sequelize (ORM)
- PostgreSQL
- Jest (testes)
- ESLint & Prettier (qualidade de código)
- Docker & Docker Compose (containerização)

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/fabifelicia/crochet-api.git
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente conforme [Variáveis de Ambiente](#variáveis-de-ambiente).

4. Compile o projeto:

```bash
npm run compile
```

5. Inicie a aplicação:

```bash
npm start
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
  PORT=3000
  POSTGRES_USER=seu_usuario
  POSTGRES_PASSWORD=sua_senha
  POSTGRES_DB=seu_banco
  DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
  NODE_ENV=development
```
Um arquivo .env.example está disponível como referência.

---

## Execução com Docker Compose

Esta aplicação pode ser executada localmente usando Docker Compose, que sobe o banco de dados PostgreSQL e a API juntos.

O banco de dados PostgreSQL será criado e populado automaticamente ao iniciar os containers com o Docker Compose.

Isso acontece porque o script de popular os dados está configurado para rodar automaticamente na inicialização do container do banco.

Para isso funcionar corretamente:

1. Criar o arquivo .env

Crie um arquivo .env na raiz do projeto com base no .env.example:
```bash
cp .env.example .env
```
Edite as variáveis conforme necessário (usuário, senha, nome do banco, etc).

2. Subir os serviços

Para construir e iniciar os containers:

```bash
docker-compose up --build
```

Para rodar em segundo plano:

```bash
docker-compose up -d
```

3. Acessar a aplicação

  - API: http://localhost:3000

  - Swagger: http://localhost:3000/api-docs


4. Para parar os containers:

```bash
docker-compose down
```
## Scripts

- `npm run compile` — Compila o TypeScript para JavaScript na pasta `dist`.
- `npm start` — Inicia o servidor a partir dos arquivos compilados.
- `npm run lint` — Executa o ESLint para checagem de código.
- `npm run format` — Formata o código usando Prettier.
- `npm run test` — Executa os testes unitários com Jest.

---

## Endpoints

Todos os endpoints são acessíveis a partir da rota base `/products` e aceitam os seguintes query params para filtragem:

- `id` (number) — Busca produto por ID.
  Exemplo: `GET /products?id=1` — Retorna o produto com ID 1.  
    
- `brand` (string) — Busca produtos pela marca.
  Exemplo: `GET /products?brand=Circulo` — Retorna produtos da marca "Circulo".  
  
- `name` (string) — Busca produtos pelo nome.
  Exemplo: `GET /products?name=Brisa` — Retorna produtos com o nome "Brisa".  
  
- `tex` (number) — Busca produtos pelo TEX exato.
  Exemplo: `GET /products?tex=100` — Retorna produtos com TEX igual a 100.  
  
- `texStart` e `texEnd` (number) — Busca produtos dentro da faixa TEX.
  Exemplo: `GET /products?texStart=100&texEnd=200` — Retorna produtos com TEX entre 100 e 200.  

---

## Testes

Para rodar os testes, execute:

```bash
npm run test
```

Os testes incluem mocks para garantir que o código seja testado isoladamente.

---

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch com sua feature: `git checkout -b minha-feature`
3. Faça commit das alterações: `git commit -m 'feat: Minha nova feature'`
4. Push para sua branch: `git push origin minha-feature`
5. Abra um Pull Request

---

## Licença

Este projeto está licenciado sob a MIT License.

---

Feito com 💜 por Fabiana Barreto
