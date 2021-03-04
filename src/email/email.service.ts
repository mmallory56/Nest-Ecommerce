import { Injectable } from '@nestjs/common';
import nodemailer, { Transport } from 'nodemailer';
@Injectable()
export class EmailService {
   constructor() {}
  
  async sendEmail() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mmallory56@gmail.com',
      pass: 'Love005855!',
    },
  });

  var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'mmallory56@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    
  }
}
