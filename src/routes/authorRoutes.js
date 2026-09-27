const express = require("express");
const router = express.Router();
const { createAuthor, listAuthors } = require("../controllers/authorController");

router.post("/", createAuthor);
router.get("/", listAuthors);

module.exports = router;
