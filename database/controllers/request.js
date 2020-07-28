const ReqModel = require('../models/request.js');



const getAllRequest = (callback) => {
  ReqModel.find({}, (err, requests) => {
    const status = !(requests === null);
    console.log('All Requests found');
    callback(err, {status, requests});
  });
};

const newRequest = (reqInfo, callback) => {
  const newReq = new ReqModel(reqInfo);
  newReq.save( (err, result) => {
    if(err) {
      console.error(err);
      callback(err, {status : false});
    }
    else {
      console.log('NEW Request CREATED SUCCESSFULLY');
      callback(err, {status : true});
    }
  });
};


module.exports = { getAllRequest, newRequest };


// NewAccount = (newUser, callback)
// NameCheck = (name, callback)
// LoginProcess = (loginAttempt, callback)