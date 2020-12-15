const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const cors = require('cors');
const multer = require('multer');

const redis = require('redis');
const redisClient = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

// const auth = process.env.MONGO_AUTH;
const auth = 'dfw:dfw123';
const dbName = '667Final';
const url = `mongodb+srv://${auth}@cluster0.gefuv.mongodb.net/?retryWrites=true&w=majority`;
const listingCollectionName = 'Listings';

const dbClient = new MongoClient(url);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    //console.log(req.body);
    console.log(file);
    cb(null, file.originalname);
  }
})

var upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(cors());

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
     const newListing = {
       userid : req.body.userid,
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
      redisClient.publish('wsMessage', JSON.stringify({ 'message': 'listingChange' }));
      res.send({'insertedId': dbRes.insertedId});
    });
  });

  app.post('/api/listingserver/editListing', (req, res) => {
    const listingData = req.body.listing;
    const listingIdToEdit = ObjectId(listingData._id);
    const filter = {_id: listingIdToEdit};
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
      } else {
      console.log('edited listingID: ', listingIdToEdit);
      console.log('listingData: ', listingData);
      res.send({'editedId': listingIdToEdit});
      }
    });
  });

  app.delete('/api/listingserver/:listing_id', (req, res) => {
    const del_id = req.params.listing_id;
    var query = { "_id": ObjectId(del_id) };
    // delete listing with ID listingID
    listingCollection.deleteOne(query, function(err, dbRes)  {
      if (err)  {
        console.log('error cannot delete listing');
        console.log('listingID: ', del_id);
        console.log(err);
        res.status(500).send({'message': 'error: cannot delete listing'});
      }
    });
    console.log('delete called, id: ', del_id);
  });

  app.listen(5000, () => console.log('App listening on port 5000'));
});
