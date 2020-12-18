const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const {MongoClient, ObjectId} = require('mongodb');
const cors = require('cors');

// const redis = require('redis');
// const redisClient = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

// const auth = process.env.MONGO_AUTH;
const auth = 'dfw:dfw123';
const dbName = '667Final';
const url = `mongodb+srv://${auth}@cluster0.gefuv.mongodb.net/${dbName}/?retryWrites=true&w=majority`;
const usersCollectionName = 'Users';
const dbClient = new MongoClient(url);


const store = new MongoDBStore({
  uri: url,
  collection: 'Sessions'
  },  (error) => {
  console.log('this is an error bc we cant connect to db for store');
  console.log(error);
}
);

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

app.post('/api/login', (req, res) => {
  res.send('you just tried to login, wowee');
});

app.post('/api/signup', (req, res) => {
  res.send('you just tried to signup, wowee');
});

app.listen(5060, () => console.log('App listening on port 5060'));
});
