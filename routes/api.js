const express = require('express');
const moment = require('moment');

const dbservices = require("./services/dbservices");

const router = express.Router();

/* NEW VISITOR */
router.post('/submitentry', function(req, res, next) {

  let reqdb = req.body;
  let currentTimeStamp = moment(Date.now()).format();

  let insertData = {
    firstname: reqdb.firstname,
    lastname: reqdb.lastname,
    email: reqdb.email,
    contact: reqdb.contact,
    checkin_timestamp: currentTimeStamp
  }

  dbservices.insertOne(insertData).then((result) => {
    console.log("Successfully Inserted.");

    res.json({
      auth: true
    });
  }).catch((err) => {
    console.log(err);

    res.json({
      auth: false
    });
  })

});

/* CHECKOUT */
router.post('/checkout', function(req, res, next) {

  let reqdb = req.body;
  let currentTimeStamp = moment(Date.now()).format();

  let updateData = {
    checkout_timestamp: currentTimeStamp
  }

  dbservices.updateData(reqdb.id, updateData).then((result) => {
    console.log("Updated Successfully!");

    res.json({
      auth: true,
      fields: {
        timestamp: moment(currentTimeStamp).format("Do MMM YYYY, h:mm:ss a")
      }
    });
  }).catch((err) => {
    console.log(err);

    res.json({
      auth: false
    });    
  });

});

module.exports = router;
