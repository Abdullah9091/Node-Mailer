const nodemailer = require("nodemailer");
require('dotenv').config()
const transporter = nodemailer.createTransport({
    service:"gmail",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, 
  auth: {
    user: process.env.SMTP_Mail,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendMail(email,subject,content) {

  const info = await transporter.sendMail({
    from: process.env.SMTP_Mail,
    to: email, 
    subject:subject, 
  
    html: content, 
  });

transporter.sendMail(info);

  console.log("Email has been sent", info.messageId);
  
}

module.exports={
  sendMail
}