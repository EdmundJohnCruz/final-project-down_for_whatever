const express = require('express');
const {MongoClient, ObjectID} = require('mongodb');
const cors = require('cors');

const auth = 'dfw:dfw123';
const dbName = '667Final';
const url = `mongodb+srv://${auth}@cluster0.gefuv.mongodb.net/?retryWrites=true&w=majority`;
const inquiryCollectionName = 'Inquiries';

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
    const inquiryCollection = db.collection(inquiryCollectionName);
  
  
    app.get('/api/inquiryserver/inquiries', (req, res) => {
      inquiryCollection.find({})
      .toArray()
      .then((docs) => {
          res.send({inquiries: docs})
      })
      .catch((e) => {
          console.log("error: ", e);
          res.send('FAILED');
      });
    });
    
    app.post('/api/inquiryserver/inquiry', (req, res) => {
      const newInquiry = req.body.inquiry;
      newInquiry.timestamp = new Date();
      inquiryCollection.insertOne(newInquiry, (err, dbRes) => {
        if(err) {
          console.log('error! can\'t insert newInquiry');
          console.log('newInquiry: ', newInquiry);
          console.log(err);
          res.status(500).send({'message': 'error: cant insert inquiry'});
        }
      
        console.log('inserted newInquiry: ', newInquiry);
        res.send({'insertedId': dbRes.insertedId});
      });
    });

    app.delete('/api/inquiryserver/:inquiry_id', (req, res) => {
        const del_id = req.params.inquiry_id;
        let query = {"_id": ObjectID(del_id)};
        inquiryCollection.deleteOne(query, function(err, dbRes) {
            if(err){
                console.log('error cannot delete inquiry');
                console.log('inquiryID: ', del_id);
                console.log(err);
                res.status(500).send({'message': 'error: cannot delete inquiry'});
            }
            console.log(dbRes);
        });
    });

    app.post('/api/inquiryserver/editinquiry', (req, res) => {
        const newInquiry = req.body.inquiry;
        inquiryCollection.updateOne({"_id": ObjectID(req.body.inquiry.inquiry_id)}, newInquiry, (err, dbRes) => {
          if(err) {
            console.log('error! can\'t insert newInquiry');
            console.log('newInquiry: ', newInquiry);
            console.log(err);
            res.status(500).send({'message': 'error: cant insert inquiry'});
          }
        
          console.log('inserted newInquiry: ', newInquiry);
          res.send({'insertedId': dbRes.insertedId});
        });
      });
  
    app.listen(5050, () => console.log('App listening on port 5050'));
  });