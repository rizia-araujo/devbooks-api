const express = require("express");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "DevBooks API está no ar 📚" });
});

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

// Handler para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada." });
});

app.listen(PORT, () => {
  console.log(`Servidor DevBooks API rodando em http://localhost:${PORT}`);
});
