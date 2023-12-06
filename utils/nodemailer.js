const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
     process.env.oauth_client_id,
     process.env.oauth_client_secret,
     process.env.oauth_redirect_uri
);

oauth2Client.setCredentials({
     refresh_token: process.env.refresh_token,
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
          type: "OAuth2",
          user: process.env.e_username,
          clientId: process.env.oauth_client_id,
          clientSecret: process.env.oauth_client_secret,
          refreshToken: process.env.refresh_token,
          accessToken: accessToken,
     },
});

// let mailOptions = {
//      from: process.env.e_username,
//      to: "drgstriker@gmail.com",
//      subject: "Test Email",
//      text: "Hello, this is a test email from Nodemailer!",
// };

// let mailOptions = {
//   from: process.env.e_username,
//   to: 'recipient-email@gmail.com', // Replace with the recipient's email
//   subject: 'Test Email with Attachment',
//   text: 'Hello, this is a test email from Nodemailer with an attachment!',
//   attachments: [
//     {
//       filename: 'test.txt',
//       path: './test.txt' // Replace with your file's path
//     }
//   ]
// };

// transporter.sendMail(mailOptions, function (error, info) {
//      if (error) {
//           console.log(error);
//      } else {
//           console.log("Email sent: " + info.response);
//      }
// });

module.exports = transporter