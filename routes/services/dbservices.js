const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'emsdb';

module.exports = {
  insertOne: (data) => {
    return new Promise((resolve, reject) => {

      MongoClient.connect(url, (err, client) => {
        if (err) {
          reject(err);
        }

        const db = client.db(dbName);
        const collection = db.collection('visitors');

        collection.insertOne(data, (err, result) => {
          if (err) {
            reject(err);
          } else {
            console.log("Result Inserted!")
            resolve(result);
          }
        })
        client.close();
      })
    })
  },
  getAllData: () => {
    return new Promise((resolve, reject) => {

      MongoClient.connect(url, (err, client) => {
        if (err) {
          reject(err);
        }

        const db = client.db(dbName);
        const collection = db.collection('visitors');

        collection.find({}).toArray((err, docs) => {
          if (err) {
            reject(err);
          }

          resolve(docs);
        })

        client.close();
      })
    })
  }
};
