# Crochet API

API RESTful para gerenciamento de produtos de crochê, utilizando Node.js, TypeScript, Express e Sequelize com PostgreSQL.

---

## Índice

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
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
DATABASE_URL=postgres://usuario:senha@host:porta/banco
DATABASE_PUBLIC_URL=postgres://usuario:senha@host_publico:porta/banco
NODE_ENV=development
```

---

## Scripts

- `npm run compile` — Compila o TypeScript para JavaScript na pasta `dist`.
- `npm start` — Inicia o servidor a partir dos arquivos compilados.
- `npm run lint` — Executa o ESLint para checagem de código.
- `npm run format` — Formata o código usando Prettier.
- `npm test` — Executa os testes unitários com Jest.

---

## Endpoints

Todos os endpoints são acessíveis a partir da rota base `/products` e aceitam os seguintes query params para filtragem:

- `id` (number) — Busca produto por ID.
- `brand` (string) — Busca produtos pela marca.
- `name` (string) — Busca produtos pelo nome.
- `tex` (number) — Busca produtos pelo TEX exato.
- `texStart` e `texEnd` (number) — Busca produtos dentro da faixa TEX.

Exemplo:  
`GET /products?brand=Circulo` — Retorna produtos da marca "Circulo".

---

## Testes

Para rodar os testes, execute:

```bash
npm test
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
