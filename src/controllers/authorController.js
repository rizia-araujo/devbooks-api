const prisma = require("../prismaClient");

// POST /authors - Cria um novo autor
async function createAuthor(req, res) {
  try {
    const { name, biography } = req.body;

    if (!name) {
      return res.status(400).json({ error: "O campo 'name' é obrigatório." });
    }

    const author = await prisma.authors.create({
      data: {
        name,
        biography: biography || null,
      },
    });

    return res.status(201).json(author);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Já existe um autor com esse nome." });
    }
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar autor." });
  }
}

// GET /authors - Lista todos os autores
async function listAuthors(req, res) {
  try {
    const authors = await prisma.authors.findMany({
      include: { books: true },
    });
    return res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar autores." });
  }
}

module.exports = { createAuthor, listAuthors };
