const express = require('express');
const moment = require('moment');
const router = express.Router();

const dbservices = require("./services/dbservices");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/visitors', function(req, res){
  let data = {
    moment: moment,
  }

  dbservices.getAllData().then((docs) => {
    data.visitors = docs.reverse();
    res.render('visitors', data);
  }).catch((err) => {
    console.log(err);
  })
})

module.exports = router;
