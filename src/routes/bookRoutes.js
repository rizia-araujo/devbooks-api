const express = require("express");
const router = express.Router();
const { createBook, listBooks, updateBook, deleteBook } = require("../controllers/bookController");

router.post("/", createBook);
router.get("/", listBooks);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
