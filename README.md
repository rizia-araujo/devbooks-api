# DevBooks API

API REST para o catálogo de Autores e Livros da Livraria Digital DevBooks, construída com **Node.js**, **Express** e **Prisma ORM** (SQLite).

## Estrutura do projeto

```
devbooks-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── authorController.js
│   │   └── bookController.js
│   ├── routes/
│   │   ├── authorRoutes.js
│   │   └── bookRoutes.js
│   ├── prismaClient.js
│   └── server.js
├── collection.json
├── .env
├── .gitignore
└── package.json
```

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Gere e aplique as migrations do Prisma (cria o `dev.db` e a pasta `prisma/migrations`):
   ```bash
   npx prisma migrate dev --name init
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor sobe em `http://localhost:3000`.

## Rotas disponíveis

| Método | Rota          | Descrição                                    |
|--------|---------------|-----------------------------------------------|
| POST   | `/authors`    | Cria um novo autor                            |
| GET    | `/authors`    | Lista autores (rota auxiliar)                 |
| POST   | `/books`      | Cria um livro vinculado a um `author_id`      |
| GET    | `/books`      | Lista livros, incluindo os dados do autor     |
| PUT    | `/books/:id`  | Atualiza um livro pelo ID                     |
| DELETE | `/books/:id`  | Remove um livro pelo ID                       |

## Testando com Postman/Insomnia

Importe o arquivo `collection.json` (na raiz do projeto). Fluxo sugerido:

1. Rode **"Criar Autor"** e copie o `id` retornado.
2. Cole esse `id` na variável de coleção `author_id` (ou direto no corpo da requisição "Criar Livro").
3. Rode **"Criar Livro"** e copie o `id` do livro retornado para a variável `book_id`.
4. Rode **"Listar Livros com Autores"**, **"Atualizar Livro"** e **"Excluir Livro"**.

## Modelagem (Prisma)

- **Authors**: `id` (UUID, PK), `name` (único), `biography` (opcional)
- **Books**: `id` (UUID, PK), `title`, `release_year`, `author_id` (FK)
- Relacionamento **1:N** — um Autor tem muitos Livros, cada Livro pertence a um único Autor.
