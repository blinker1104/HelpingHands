const express = require('express')
const app = express()
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('../database/index.js')
const port = 3000




//// MIDDLEWARE

app.use(session({
	secret: 'helpinghands handshake',
	resave: false,
	saveUninitialized: true
}));

app.use(function (req, res, next) {

  //Setup Session Info
  if (req.session.loggedin === undefined || req.session.loggedin === false)  {
    req.session.loggedin = false;
    req.session.username = undefined;
    req.session.id = undefined;
  }

  next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/login', express.static('public/login'));

//// ROUTES

app.use(express.static('public'))

// app.get('/', (req, res) => {
//   console.log(req.session);
//   if (req.session.loggedin!== true) {
//     res.send(req.session.username);
//   }
// });

app.get('/userStatus', (req, res) => {
  if (req.session.loggedin) {
    res.send(req.session);
  }
  res.end();
});


app.post('/registrationFormSubmit', (req, res) => {
  const newUser =  req.body.newForm;

  db.userFuntions.NewAccount( newUser, (err, result) => {
    console.log(result);
    if (err) { res.status(400); }
    else if (result.status) {
      res.status(201);
    } else { res.status(400); }
    res.end();
  });
})

app.post('/loginProcess', (req, res) => {
  const loginAttempt =  req.body.newForm;

  db.userFuntions.LoginProcess( loginAttempt, (err, result) => {
    if (err) { res.status(400).send(result); }
    else if (result.status) {
      let hour = 3600000;
      req.session.cookie.expires = new Date(Date.now() + hour);
      req.session.cookie.maxAge = hour;
      req.session.cookie.username = loginAttempt.username;

      req.session.loggedin = true;
      req.session.username = loginAttempt.username;
      console.log('login success: ', loginAttempt.username);
      res.status(200).send('success');
      // res.redirect('/home');
    } else {
      console.log('login failed ', loginAttempt.username);
      res.status(400).send('fail');
    }
    res.end();
  });
})

app.post('/logoutProcess', (req, res) => {
  if (req.session.loggedin) {
    req.session.loggedin = false;
    req.session.username = undefined;
    res.status(200);
  }
  res.redirect('/');
  res.end();
})




app.get('/checkName/:username', (req, res) => {
  db.userFuntions.NameCheck(req.params.username, (err, result) => {

    if (!result.status) {
      res.status(400).send('Match found');
    } else {
      res.status(200).send('No Match found');
    }
    res.end();

  });
})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))



/*




app.get('/home', (req, res) => {

  if (req.session.loggedin) {
    console.log('Welcome back, ' + req.session.username + '!');
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});


app.post('/SampleData', (req, res) => {
  const sampleUser = {
    username: 'JoonPark2',
    password: 'password',
    email: 'hello@email.com'
  };

  db.userFuntions.NewAccount( sampleUser, (err, result) => {

    if (err) { res.status(400).send(result.code); }
    else if (res.status) { res.status(400).redirect('/registrationFailed'); }
    else { res.redirect('/registrationCompleted'); }


    //Redirect

  } );

})

*/