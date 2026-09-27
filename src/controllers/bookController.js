const prisma = require("../prismaClient");

// POST /books - Cria um livro associado a um autor existente
async function createBook(req, res) {
  try {
    const { title, release_year, author_id } = req.body;

    if (!title || !release_year || !author_id) {
      return res.status(400).json({
        error: "Os campos 'title', 'release_year' e 'author_id' são obrigatórios.",
      });
    }

    const authorExists = await prisma.authors.findUnique({
      where: { id: author_id },
    });

    if (!authorExists) {
      return res.status(404).json({ error: "Autor não encontrado para o author_id informado." });
    }

    const book = await prisma.books.create({
      data: {
        title,
        release_year,
        author: {
          connect: { id: author_id },
        },
      },
      include: { author: true },
    });

    return res.status(201).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar livro." });
  }
}

// GET /books - Lista todos os livros com os dados do autor
async function listBooks(req, res) {
  try {
    const books = await prisma.books.findMany({
      include: { author: true },
    });
    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar livros." });
  }
}

// PUT /books/:id - Atualiza um livro pelo ID
async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const { title, release_year, author_id } = req.body;

    const bookExists = await prisma.books.findUnique({ where: { id } });
    if (!bookExists) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    if (author_id) {
      const authorExists = await prisma.authors.findUnique({ where: { id: author_id } });
      if (!authorExists) {
        return res.status(404).json({ error: "Autor não encontrado para o author_id informado." });
      }
    }

    const updatedBook = await prisma.books.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(release_year !== undefined && { release_year }),
        ...(author_id !== undefined && { author_id }),
      },
      include: { author: true },
    });

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar livro." });
  }
}

// DELETE /books/:id - Remove um livro pelo ID
async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    const bookExists = await prisma.books.findUnique({ where: { id } });
    if (!bookExists) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    await prisma.books.delete({ where: { id } });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao excluir livro." });
  }
}

module.exports = { createBook, listBooks, updateBook, deleteBook };
