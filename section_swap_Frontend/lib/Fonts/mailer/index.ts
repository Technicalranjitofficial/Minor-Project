// const nodemailer = require("nodemailer");

import nodemailer from "nodemailer";
import { cache } from "react";

// Create a transport object
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    // pass: "wbrknqwssdophyyd",
    pass: process.env.MAIL_PASSWORD,
  },
});


const feedbackEmailTemplate = (name:string, email:string, subject:string, message:string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Feedback / Report</title>
      <style>
        /* Add your custom inline CSS styles here */
        body {
          font-family: Arial, sans-serif;
        }
        h1 {
          color: #333;
        }
        p {
          color: #555;
        }
      </style>
    </head>
    <body>
      <h1>Feedback / Report</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </body>
  </html>
`;


export const sendMail = (
  email:string,
  name:string,
  subject:string,
  message:string
):Promise<{message:string,success:boolean}> =>
  new Promise((resolve, reject) => {
    let mailOptions = {
        from: '"KIIT CONNECT" <no-reply@kiitconnect.live>',
        to: "21053420@kiit.ac.in",
        subject: "KIIT-CONNECT(Feedback/Report)",
        html: feedbackEmailTemplate(name,email,subject,message),
      };
      
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject({ message: "Error Occured", success: false });
      } else {
        
        resolve({ message: "Your response has been recorded", success: true });
      }
    });
  });
