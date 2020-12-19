const KafkaConsumer = require('./KafkaConsumer.js');
const sharp = require('sharp');
const {MongoClient, ObjectId} = require('mongodb');

const consumer = new KafkaConsumer(['imgresize']);

const auth = 'dfw:dfw123';
const dbName = '667Final';
const url = `mongodb+srv://${auth}@cluster0.gefuv.mongodb.net/?retryWrites=true&w=majority`;
const listingCollectionName = 'Listings';

const dbClient = new MongoClient(url);

 consumer.on('message', (message) => {
     console.log('message recieved on kafkaworker');
     console.log(message);

    dbClient.connect((error) => {
        if(error) {
          console.log('error! can\'t connect to DB instance');
          console.log(error);
          process.exit(1);
        }
      
        console.log("Connected!");
      
        const db = dbClient.db(dbName);
        const listingCollection = db.collection(listingCollectionName);
        img_id = new ObjectId(message);
        const query = { "_id": img_id };
        listingCollection.findOne(query)
          .then((doc) => {
              // console.log(doc._id);
              sharp(doc.og_img.data.buffer).resize(100, 100, {
                  fit: sharp.fit.inside,
                  withoutEnlargement: true
              })
              .toFormat('jpeg')
              .toBuffer()
              .then(function(outputBuffer){
                //  console.log(outputBuffer);
                const listingIdToEdit = ObjectId(doc._id);
                const filter = {_id: listingIdToEdit};
                listingCollection.updateOne(filter, {$addToSet : {
                    smaller_img: {
                        data: outputBuffer,
                        contentType: doc.og_img.contentType,
                    }
                }}, (err, dbRes) => {
                    if(err) {
                        console.log(`error! can\'t edit ${listingIdToEdit}`);
                        console.log(err);
                      } else {
                      console.log('edited listingID: ', listingIdToEdit);
                      }
                    });
              });
              sharp(doc.og_img.data.buffer).resize(500, 500, {
                        fit: sharp.fit.inside,
                        withoutEnlargement: true,
                    })
                    .toFormat('jpeg')
                    .toBuffer()
                    .then(function(outputBuffer){
                      // console.log(outputBuffer);
                      const listingIdToEdit = ObjectId(doc._id);
                      const filter = {_id: listingIdToEdit};
                      listingCollection.updateOne(filter, {$addToSet : {
                          small_img: {
                              data: outputBuffer,
                              contentType: doc.og_img.contentType,
                          }
                      }}, (err, dbRes) => {
                          if(err) {
                              console.log(`error! can\'t edit ${listingIdToEdit}`);
                              console.log(err);
                            } else {
                            console.log('edited listingID: ', listingIdToEdit);
                            }
                          });
                    });
          })
          .catch((e) => {
              console.log("error: ", e);
          });
      });
      dbClient.close();
});


console.log('connecting...');
consumer.connect();