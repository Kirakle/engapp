const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  text: String,
  translation: String,
});

const wordSchema = new mongoose.Schema({
  word: String,
  translate: String,
  examples: [exampleSchema],
  isLearn: Boolean,
});

const categorySchema = new mongoose.Schema({
  id: String,
  definition: String,
  words: [wordSchema],
});

module.exports = mongoose.model('Category', categorySchema);
