const nodemailer = require("nodemailer");


async function sendMail(email,subject,text,output) {
   

     
    try {
      let transporter = nodemailer.createTransport({
        host: "gmail.com",
        port: 535,
        secure: false,
        auth: {
          user: 'salimaeii1997@gmail.com',
          pass: '0649018266sa',
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
  
      let info = await transporter.sendMail({
        from: "CNSS",
        to: email,
        subject: subject,
        text: text,
        html: output,
      });
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = {sendMail}