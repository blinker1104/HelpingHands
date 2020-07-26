const User = require('../models/user.js');



const NameCheck = (name, callback) => {
  console.log(' Checking whether name is available to use');

  User.findOne({ username : name }, (err, data) => {
    // console.log(`name:${name} data:${data}`);
    const status = (data === null);
    callback(err, {status:status, data:data});
  });
};


const NewAccount = (newUser, callback) => {
  console.log(' Checking User Credential ');

  NameCheck(newUser.username, (err, result) => {
    if(result.status) {
      const newAccount = new User(newUser);
      newAccount.save( (err, result) => {
        if(err) { console.error(err); }
        console.log('NEW ACCOUNT CREATED SUCCESSFULLY');
        callback(err, {status : (err === undefined), code: 'no same username'});
      });
    } else {
      console.log('Cannot CREATE NEW USER - NAME ALREADY EXISTS');
      callback(err, {status : false, code:'Name already exists'});
    }
  });
};

const LoginProcess = (loginAttempt, callback) => {
  // console.log(' Checking User Credential :', loginAttempt);

  User.findOne({ username : loginAttempt.username }, (err, data) => {
    if (data.password !== loginAttempt.password) {
      // console.log(`LOGIN FAILED: ${loginAttempt.username} ${loginAttempt.password}`);
      callback(err, {status:false, data:data});
    } else {
      callback(err, {status:true, data:data});
    }
  });
};

module.exports = { NameCheck, NewAccount, LoginProcess };


// NewAccount = (newUser, callback)
// NameCheck = (name, callback)
// LoginProcess = (loginAttempt, callback)