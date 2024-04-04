// mail.service.ts
import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import * as ejs from "ejs";
import * as path from "path";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MyMailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMailToSwapFound(
    matchedUserName: string,
    matchedUserEmail: string,
    matchedUserContact: string,
    senderName: string,
    currentAlloted: number,
    currentLookingFor: number[],
    remoteAlloted: number,
    remoteLookingFor: number[]
  ) {
    const data = {
      matchedUserName: matchedUserName,
      matchedUserEmail: matchedUserEmail,
      matchedUserContact: matchedUserContact,
      senderName: senderName,
      currentAlloted: currentAlloted,
      currentLookingFor: currentLookingFor,
      remoteAlloted: remoteAlloted,
      remoteLookingFor: remoteLookingFor,
    };

    console.log(data);
    await this.mailService
      .sendMail({
        to: matchedUserEmail,
        subject: "Match Found For Section Swapping",
        template: "matchFound", // Name of your template file without extension
        context: data,
      })
      .then((d) => {
        console.log("Email Has been Sent", d);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async sendMailToRemoveProfileByUser(senderEmail: string, senderName: string) {
    const data = {
      senderName: senderName,
    };

    console.log(data);
    await this.mailService
      .sendMail({
        to: senderEmail,
        subject: "Match Removed",
        template: "match-removal", // Name of your template file without extension
        context: data,
      })
      .then((d) => {
        console.log("Email Has been Sent", d);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async sendMailToUnmatchedUser(senderEmail: string, senderName: string) {
    const data = {
      senderName: senderName,
    };

    console.log(data);
    await this.mailService
      .sendMail({
        to: senderEmail,
        subject: "Profile Removed",
        template: "profile-removed", // Name of your template file without extension
        context: data,
      })
      .then((d) => {
        console.log("Email Has been Sent", d);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
