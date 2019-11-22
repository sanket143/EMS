const nodemailer = require("nodemailer");

module.exports = new Promise((resolve, reject) => {
  nodemailer.createTestAccount().then((testAccount) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      }
    });

    resolve(transporter);
  }).catch((err) => {
    reject(err);
  })
})