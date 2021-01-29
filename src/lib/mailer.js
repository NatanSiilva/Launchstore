const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8bdcfe805be836",
      pass: "41e8e6ae69e0e9"
    }
});

