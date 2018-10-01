const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, required: true }
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
