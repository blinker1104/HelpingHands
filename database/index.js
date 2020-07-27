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


db.user = require('./controllers/user.js');
db.request = require('./controllers/request.js');
// sdb.user = require('./controllers/user.js');


module.exports = db;