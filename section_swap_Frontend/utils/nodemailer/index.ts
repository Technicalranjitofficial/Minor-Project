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

export const sendMail = (
  senderEmail: string,
  senderName: string,
  matchedUserEmail: string,
  matchedUserContact: string,
  matchedUserName: string,
  currentAlloted: number,
  currentLookingFor: number[],
  remoteAlloted: number,
  remoteLookingFor: number[]
) =>
  new Promise((resolve, reject) => {
    let mailOptions = {
        from: '"KIIT CONNECT" <no-reply@kiitconnect.live>',
        to: senderEmail,
        subject: "Match Found For Section Swapping",
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
        <h1 style="color: #333;">Hey ${senderName},</h1>
        <p>Congratulations! You have found a match for Section Swapping:</p>
        
        <div style="background-color: #fff; border: 1px solid #ccc; padding: 15px; margin-top: 15px;">
            <h2>Details:</h2>
            <h3>Name: ${matchedUserName}</h3>
            <h3>Email: ${matchedUserEmail}</h3>
            <h3>Contact: ${matchedUserContact}</h3>
    
            <h2>Swapping Section Details:</h2>
            <div>
                <h3>Your Details:</h3>
                <p>Allotted: ${currentAlloted}</p>
                <p>Looking For: ${currentLookingFor.join(", ")}</p>
            </div>
            <div>
                <h3>Matched User Details:</h3>
                <p>Allotted: ${remoteAlloted}</p>
                <p>Looking For: ${remoteLookingFor.join(", ")}</p>
            </div>
        </div>
    
        <p style="font-size: 17px; color: #FF0000; margin-top: 15px;">
            Please note that KIIT CONNECT is not responsible for any kind of trouble or inconvenience that may arise from section swapping. We act as a medium to help you find a match, and you are responsible for contacting the matched user yourself for further arrangements.
        </p>
    
        <!-- Site Information -->
        <div style="margin-top: 20px;">
            <p>For more information, visit our website: <a href="https://kiitconnect.live/" target="_blank">kiitconnect.live</a></p>
        </div>
    
        <!-- WhatsApp Link -->
        <div style="margin-top: 10px;">
            <p>Still having Issue contact: <a href="mailto:21053420@kiit.ac.in" target="_blank">21053420@kiit.ac.in</a></p>
        </div>
    
        <!-- Contact Information -->
        <div style="margin-top: 10px;">
            <p>Join WhatsApp(KIIT-CONNECT-1) us: <a href="https://chat.whatsapp.com/C2RE26X5AMWDbswA7EbFVa" target="_blank">Click here</a></p>
            <p>Join If you are not in KIIT-CONNECT-1(KIIT-CONNECT-2) us: <a href="https://chat.whatsapp.com/BAgHPirA4JzANjGKDd8z2q" target="_blank">Click here</a></p>
        </div>
    
        <!-- Disclaimer -->
        <p style="font-size: 14px; color: #666; margin-top: 20px;">
            This information is generated from KIIT CONNECT. For any concerns or queries, please reach out to KIIT CONNECT directly.
        </p>
    </div>
    
        `,
      };
      
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject({ message: "Error Occured", success: false });
      } else {
        // console.log('Email sent: ' + info.response);
        resolve({ message: "Your response has been recorded", success: true });
      }
    });
  });




  export const informAboutRemovalSingal=(senderName:string,email:string)=>new Promise((resolve, reject) => {
    let mailOptions = {
        from: '"KIIT CONNECT" <no-reply@kiitconnect.live>',
        to: email,
        subject: "Match Removed",
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
        <h1 style="color: #333;">Hey ${senderName},</h1>
        <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 20px;">
        <h2 style="color: #333;">Match Removed</h2>
        <p>Your account has been successfully removed from our platform. You are now free to <a href="https://section.kiitconnect.live/" target="_blank">create a new Match</a> and explore other potential matches.</p>
        <p>If you have any questions or concerns, feel free to <a href="mailto:21053420@kiit.ac.in">contact us</a>.</p>
      </td>
    </tr>
  </table>

  <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f4f4f4" style="border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 20px; color: #666;">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; 2022 KIIT CONNECT. All rights reserved.</p>
      </td>
    </tr>
  </table>
    </div>
    
        `,
      };
      
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject({ message: "Error Occured", success: false });
      } else {
        // console.log('Email sent: ' + info.response);
        resolve({ message: "Your response has been recorded", success: true });
      }
    });
  });



  export const informAboutRemovalMatch=(senderName:string,email:string)=>new Promise((resolve, reject) => {
    let mailOptions = {
        from: '"KIIT CONNECT" <no-reply@kiitconnect.live>',
        to: email,
        subject: "Match Removed",
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
        <h1 style="color: #333;">Hey ${senderName},</h1>
        <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 20px;">
        <h2 style="color: #333;">Unmatched Notification</h2>
        <p>We regret to inform you that you have been unmatched on our platform according to the request from your partner. You are now free to <a href="https://section.kiitconnect.live/" target="_blank">create a new Match</a> and explore other potential matches.</p>
        <p>If you have any questions or concerns, feel free to <a href="mailto:21053420@kiit.ac.in">contact us</a>.</p>
      </td>
    </tr>
  </table>

  <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f4f4f4" style="border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 20px; color: #666;">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; 2022 KIIT CONNECT. All rights reserved.</p>
      </td>
    </tr>
  </table>
    </div>
    
        `,
      };
      
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject({ message: "Error Occured", success: false });
      } else {
        // console.log('Email sent: ' + info.response);
        resolve({ message: "Your response has been recorded", success: true });
      }
    });
  });