const express = require('express');
const {MongoClient} = require('mongodb');
const cors = require('cors');

const auth = 'dfw:dfw123';
const dbName = '667Final';
const url = `mongodb+srv://${auth}@cluster0.gefuv.mongodb.net/?retryWrites=true&w=majority`;
const listingCollectionName = 'Listings';

const dbClient = new MongoClient(url);

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


  app.get('/listings', (req, res) => {
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
  
  app.post('/listing', (req, res) => {
    const newListing = req.body.listing;
    newListing.timestamp = new Date();
    listingCollection.insertOne(newListing, (err, dbRes) => {
      if(err) {
        console.log('error! can\'t insert newListing');
        console.log('newListing: ', newListing);
        console.log(err);
        res.status(500).send({'message': 'error: cant insert listing'});
      }
    
      console.log('inserted newListing: ', newListing);
      res.send({'insertedId': dbRes.insertedId});
    });
  });

  app.listen(4001, () => console.log('App listening on port 4001'));
});