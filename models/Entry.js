const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const entrySchema = new Schema({
  originalWord: String,
  convertedWord: String
});

const Entry= mongoose.model('Entry', entrySchema);
module.exports = Entry;
