const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const {MongoClient, ObjectId} = require('mongodb');
const cors = require('cors');
const multer = require('multer');

// const redis = require('redis');
// // const redisClient = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

// const auth = process.env.MONGO_AUTH;
const auth = 'dfw:dfw123';
const dbName = '667Final';
const url = `mongodb+srv://${auth}@cluster0.gefuv.mongodb.net/?retryWrites=true&w=majority`;
const urlSession = `mongodb+srv://${auth}@cluster0.gefuv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const listingCollectionName = 'Listings';

const store = new MongoDBStore({
  uri: urlSession,
  collection: 'Sessions'
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


const dbClient = new MongoClient(url);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    //console.log(req.body);
    console.log(file);
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage });

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
  const listingCollection = db.collection(listingCollectionName);


  app.get('/api/listingserver/listings', (req, res) => {
    listingCollection.find({})
      .toArray()
      .then((docs) => {
          res.send({listings: docs})
      })
      .catch((e) => {
          console.log("error: ", e);
          res.send('FAILED');
      });
  });

  app.post('/api/listingserver/listing', upload.single('image'), (req, res, next) => {
    console.log(req.body);
    if(session.userId === null){
      res.send({insertedId: null, message: 'must be logged in to make new post'});
    }

     const newListing = {
       userId : req.session.userId,
       title : req.body.title,
       description : req.body.description,
       price : req.body.price,
       imgaddr : req.file.filename,
       timestamp : new Date(),
     };
    listingCollection.insertOne(newListing, (err, dbRes) => {
      if(err) {
        console.log('error! can\'t insert newListing');
        console.log('newListing: ', newListing);
        console.log(err);
        res.status(500).send({'message': 'error: cant insert listing'});
      }
      console.log('inserted newListing: ', newListing);
      // redisClient.publish('wsMessage', JSON.stringify({ 'message': 'listingChange' }));
      res.send({'insertedId': dbRes.insertedId});
    });
  });

  app.post('/api/listingserver/editListing', (req, res) => {
    if(req.session.userId === null) {
      res.send({editedId: null, message: 'must be logged in to make new post'});
      return;
    }

    const listingData = req.body.listing;
    const listingIdToEdit = ObjectId(listingData._id);
    const filter = req.session.admin ? {_id: listingIdToEdit } : {_id: listingIdToEdit, userId: req.session.userId};
    listingData.timestamp = new Date();
    
    const newListingData = {
      title: listingData.title,
      description: listingData.description,
      price: listingData.price,
    }

    listingCollection.updateOne(filter, {$set :newListingData}, (err, dbRes) => { //Make new obj that replaces items inside of listing data
      if(err) {
        console.log(`error! can\'t edit ${listingIdToEdit}`);
        console.log('listingData: ', listingData);
        console.log(err);
        res.status(500).send({'message': 'error: could not edit listing'});
      }
      else if(dbRes.modifiedCount >= 0) {
        console.log('edited listingID: ', listingIdToEdit);
        console.log('listingData: ', listingData);
        res.send({'editedId': listingIdToEdit, message: 'edit success'});
      }
      else {
        console.log('couldn\'t find listing to edit');
        res.send({editedId: null, message: 'couldn\'t find listing to edit'});
      }
    });
  });

  app.delete('/api/listingserver/:listing_id', (req, res) => {
    if(req.session.userId === null) {
      res.send({editedId: null, message: 'must be logged in to make new post'});
      return;
    }

    const del_id = req.params.listing_id;
    const query = { "_id": ObjectId(del_id),  };
    const filter = req.session.admin ? {_id: listingIdToEdit } : {_id: listingIdToEdit, userId: req.session.userId};

    // delete listing with ID listingID
    listingCollection.deleteOne(query, function(err, dbRes)  {
      if (err)  {
        console.log('error cannot delete listing');
        console.log('listingID: ', del_id);
        console.log(err);
        res.status(500).send({'message': 'error: cannot delete listing'});
      }
      else if(dbRes.deletedCount === 0){
        console.log('couldn\'t find listing to delete');
        res.send({'deletedId': null, message: 'couldn\'t find listing to delete'});
      }
      else{
        // redisClient.publish('wsMessage', JSON.stringify({ 'message': 'listingChange' }));
        console.log('delete called, id: ', del_id);
        res.send({'deletedId': del_id, message: 'delete success'});
      }
    });
  });

  app.listen(5000, () => console.log('App listening on port 5000'));
});
