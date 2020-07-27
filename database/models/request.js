const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  title: String,
  author: String,
  body: String,
  contact: String,
  location: String,
  date: { type: Date, default: Date.now }
});

const ReqModel = mongoose.model('HelpRequest', requestSchema);

module.exports = ReqModel;