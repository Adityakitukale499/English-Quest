const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorId: { type: String, required: true },
  created_at: { type: Date, default: Date.now, required:true },
  description:{type:String, require:true},
  content:{type:String, required:true}
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
