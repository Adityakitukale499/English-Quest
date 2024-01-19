const express = require("express");
const router = express.Router();

const {
  getBookDetails,
  getAllBooks,
  editBook,
  createBook,
  deleteBook,
} = require("../controllers/booksController");
const isCreater = require("../middleWare/isCreator");

router.get("/details/:id", getBookDetails);
router.get("", getAllBooks);

router.use(isCreater);
router.put("/edit-book/:id", editBook);
router.post("/create", createBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
