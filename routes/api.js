const express = require('express');
const moment = require('moment');
const nodemailer = require("nodemailer");

const dbservices = require("./services/dbservices");
const transporterService = require("./services/transporter");

const router = express.Router();

/* NEW VISITOR */
router.post('/submitentry', function (req, res, next) {

  let reqdb = req.body;
  let currentTimeStamp = moment(Date.now()).format();

  let insertData = {
    firstname: reqdb.firstname,
    lastname: reqdb.lastname,
    email: reqdb.email,
    contact: reqdb.contact,
    checkin_timestamp: currentTimeStamp
  }

  transporterService.then((transporter) => {

    // Frae Mail
    let text = `Name: ${reqdb.firstname} ${reqdb.lastname}\n`;
    text += `Email: ${reqdb.email}\n`;
    text += `Phone: ${reqdb.contact}\n`;
    text += `Check In: ${moment(currentTimeStamp).format("Do MMM YYYY, h:mm:ss a")}\n`;

    // Send Mail
    let info = transporter.sendMail({
      from: '"Example Company" <no-reply@example.com>',
      to: '"Host" <host@example.com>',
      subject: "New Visitor",
      text: text,
    }).then((_info) => {
      let _url = nodemailer.getTestMessageUrl(_info);

      dbservices.insertOne(insertData).then((result) => {
        console.log("Successfully Inserted.");

        res.json({
          auth: true,
          fields: {
            mailUrl: _url
          }
        });
      }).catch((err) => {
        console.log(err);

        res.json({
          auth: false
        });
      })
    }).catch((err) => {
      console.log(err);

      res.json({
        auth: false
      })
    })
  }).catch((err) => {
    console.log(err);

    res.json({
      auth: false
    })
  })
});

/* CHECKOUT */
router.post('/checkout', function (req, res, next) {

  let reqdb = req.body;
  let currentTimeStamp = moment(Date.now()).format();

  let updateData = {
    checkout_timestamp: currentTimeStamp
  }

  transporterService.then((transporter) => {
    dbservices.find(reqdb.id).then((visitors) => {
      if(visitors.length){
        
        let visitor = visitors[0];
        // Frame Mail
        let text = `Name: ${visitor.firstname} ${visitor.lastname}\n`;
        text += `Phone: ${visitor.contact}\n`;
        text += `Check In: ${moment(visitor.checkin_timestamp).format("Do MMM YYYY, h:mm:ss a")}\n`;
        text += `Check Out: ${moment(visitor.checkout_timestamp).format("Do MMM YYYY, h:mm:ss a")}\n`;
        text += "Host: Host Name\n";
        text += "Address: Address\n";

        // Send Mail
        let info = transporter.sendMail({
          from: '"Example Company" <no-reply@example.com>',
          to: `"${visitor.firstname} ${visitor.lastname}" <${visitor.email}>`,
          subject: "Thank You for coming!",
          text: text,
        }).then((_info) => {
          let _url = nodemailer.getTestMessageUrl(_info);

          dbservices.updateData(reqdb.id, updateData).then((result) => {

            res.json({
              auth: true,
              fields: {
                timestamp: moment(currentTimeStamp).format("Do MMM YYYY, h:mm:ss a"),
                mailUrl: _url
              }
            });
          }).catch((err) => {
            console.log(err);

            res.json({
              auth: false
            });
          });
        }).catch((err) => {
          console.log(err);

          res.json({
            auth: false
          })
        })
      } else {
        res.json({
          auth: false
        })
      }

    }).catch((err) => {

    });
  }).catch((err) => {
    console.log(err);

    res.json({
      auth: false
    })
  });
});

module.exports = router;
