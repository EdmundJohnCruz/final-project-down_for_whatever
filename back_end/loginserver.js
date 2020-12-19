const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const {MongoClient} = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');

const saltRounds = 3;

// const auth = process.env.MONGO_AUTH;
const auth = 'dfw:dfw123';
const dbName = '667Final';
const url = `mongodb+srv://${auth}@cluster0.gefuv.mongodb.net/?retryWrites=true&w=majority`;
const urlSession = `mongodb+srv://${auth}@cluster0.gefuv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const usersCollectionName = 'Users';
const dbClient = new MongoClient(url);


const store = new MongoDBStore({
  uri: urlSession,
  collection: 'sessions'
  },  (error) => {
    if(error){
      console.log('this is an error bc we cant connect to db for store');
      console.log(error);    
    }
});

// this should console log when an error happens
store.on('error', function(error) {
  console.log('Session Store Error:');
  console.log(error);
});

const app = express();
app.use(express.json());
app.use(cors());

// const sessionSecret = process.env.SESSION_SECRET;
const sessionSecret = 'dfw123secret';
app.use(session({
  name: 'dfwFinalProject',
  secret: sessionSecret,
  store: store,
  resave: true,
  saveUninitialized: false,
}));

dbClient.connect((error) => {
  if(error) {
    console.log('error! can\'t connect to DB instance');
    console.log(error);
    process.exit(1);
  }

  console.log("Connected!");
  const db = dbClient.db(dbName);
  const usersCollection = db.collection(usersCollectionName);


  app.post('/api/loginserver/login', (req, res) => {
    const uname = req.body.username;
    const pass = req.body.password;

    if(uname && pass){
      usersCollection.findOne({username: uname})
      .then((foundUser) => {
        bcrypt.compare(pass, foundUser.password, (bErr, response) => {
          if(bErr){
            console.log('Becrypt Error: ', bErr);
            res.response(500).send("bcrypt error");
          }
          if(response === true){
            console.log('sucessful login for ', uname);
            // set session values
            req.session.username = uname;
            req.session.userId = foundUser._id;
            req.session.admin = foundUser.admin;
  
            res.send({error: false, username: uname, admin: foundUser.admin, userId: foundUser._id, message: 'login success'});
          }
          else{
            console.log('login failed');
            res.send({error: false, username: null, admin: false, userId: null, message: 'login failed'});  
          }  
        });
      })
      .catch((e) => {
        console.log("login dberror: ", e);
        res.send({error: true, username: null, admin: false, userId: null, message: 'error'});
      });  
    }
    else {
      console.log('bad request: ', req);
      res.send({error: true, username: null, admin: false, userId: null, message: 'bad login request, missing un&pw'});
    }
  });

  app.post('/api/loginserver/signup', (req, res) => {
    const uname = req.body.username;
    const pass = req.body.password;
    const admin = req.body.admin;

    bcrypt.hash(pass, saltRounds, (bErr, hash) => {
      if(bErr){
        console.log('Becrypt Error: ', bErr);
        res.response(500).send("bcrypt error");
      }
      const newUser = { username: uname, password: hash, admin: admin }

      if(uname && pass){
        usersCollection.find({username: uname})
        .toArray()
        .then((found) => {
          if(found.length === 0){
            usersCollection.insertOne(newUser, (err, dbRes) => {
              if(err) {
                console.log('db signup error: ', err);
                res.send({error: true, username: null, admin: false, userId: null, message: 'db error creating user account'});
              }
              else {
                req.session.username = uname;
                req.session.userId = dbRes.insertedId;    
                req.session.admin = admin;
                res.send({error: false, username: uname, admin: newUser.admin, userId: dbRes.insertedId, message: 'signup success'});
              }
            })
          }
          else{
            res.send({error: false, username: null, admin: false, userId: null, message: 'name taken'});  
          }
        })
      }
      else {
        console.log('bad request: ', req);
        res.send({error: true, username: null, admin: false, userId: null, message: 'bad login request, missing un&pw'});
      }
    });
  });

  app.post('/api/loginserver/logout', (req, res) => {
    req.session.destroy();
    res.send({message: 'logged out'})
  });

  app.listen(5060, () => console.log('App listening on port 5060'));
});
