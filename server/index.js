const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('../database/index.js')
const port = 3000




//// MIDDLEWARE


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
// app.use(express.static('public'))


//// ROUTES

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/SampleData', (req, res) => {
  const sampleUser = {
    username: 'JoonPark2',
    password: 'password',
    email: 'hello@email.com'
  };

  db.userFuntions.NewAccount( sampleUser, (err, result) => {

    if (err) { res.status(400).send(result.code); }
    else if (res.status) { res.status(400).send(result.code); }
    else { res.send('SampleCreated'); }


    //Redirect

  } );

})



app.get('/checkName/:username', (req, res) => {
  db.userFuntions.NameCheck(req.params.username, (err, result) => {

    if (!result.status) {
      res.status(400).send('Match found');
    } else {
      res.status(200).send('No Match found');
    }


  });
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))