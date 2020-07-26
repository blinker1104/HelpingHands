const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/helphand',
  {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});


db.userFuntions = require('./controllers/user.js');


module.exports = db;