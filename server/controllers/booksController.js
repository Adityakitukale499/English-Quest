const { ObjectId } = require("bson");
const Book = require("../models/Book");


const getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json({
      book,
    });
  } catch(e){
    console.log(e)
    res.status(500).json({
      message: "internal server error",
    });
  }
};

const getAllBooks = async (req, res) => {
  if (req.query?.new || req.query?.old) {
    try {
      if (req.query?.old) {
        const currentTime = new Date();
        const tenMinutesAgo = new Date(currentTime - 10 * 60 * 1000);
        const books = await Book.aggregate([
          {
            $match: {
              created_at: {
                $lte: tenMinutesAgo,
              },
            },
          },
        ]);
        res.status(200).json({ books });
      } else if (req.query.new) {
        const currentTime = new Date();
        const tenMinutesAgo = new Date(currentTime - 10 * 60 * 1000);
        const books = await Book.aggregate([
          {
            $match: {
              created_at: {
                $gte: tenMinutesAgo,
                $lte: currentTime,
              },
            },
          },
        ]);
        res.status(200).json({ books });
      }
    } catch (error) {
      res.status(500).json({
        message: "internal server error",
      });
    }
  } else {
    try {
      const books = await Book.find();
      res.json({
        books,
      });
    } catch (error) {
      res.status(500).json({
        message: "internal server error",
      });
    }
  }
};


const editBook = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "provide details!",
    });
  }
  const { id } = req.params;
  const { content, description, title } = req.body;
  try {
    const existingBook = await Book.findById(id);

    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    existingBook.title = title || existingBook.title;
    existingBook.description = description || existingBook.description;
    existingBook.content = content || existingBook.content;
    const updatedBook = await existingBook.save();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createBook = async (req, res) => {
    if(!req.body){
        return res.status(400).json({
            message:"provide book details"
        })
    }
    const { title, created_at, description,content } = req.body;
  
    try {
      const newBook = new Book({ title, authorId:req.user.userId, created_at, description,content });
      await newBook.save();
  
      res.json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

const deleteBook = async (req, res) => {
    if(!req.params?.id){
        res.status(400).json({
            message:"provide book id"
        })
    }
    const { id } = req.params;
    try {
      const deletedBook = await Book.findByIdAndDelete(id);
  
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.json({ message: 'Book deleted successfully', book: deletedBook });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}



  module.exports = {getBookDetails, getAllBooks, editBook, createBook, deleteBook}
