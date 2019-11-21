const express = require('express');
const dbservices = require("./services/dbservices");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/logs', function(req, res){

  let insertData = {
    name: "Sanket Chaudhari",
    email: "chaudharisanket2000@gmail.com",
    contactNumber: "+91 7359814667"
  }
  dbservices.insertOne(insertData).then((result) => {
    console.log("Succesfully Inserted!");
  }).catch((err) => {
    console.log(err);
  })
  res.render('logs');
})

module.exports = router;
