import nodemailer from 'nodemailer';
import config from '../app/config';

export const sendEmail = async (token) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production' ? true : false, 
    auth: {
      user: 'iftakharalamshuvo11@gmail.com',
      pass: 'cfyx mmqh qwtb gapi',
    },
  });
  await transporter.sendMail({
    from: "iftakharalamshuvo11@gmail.com", // sender address
    to: "iftakharalamshuvo11@gmail.com", // list of receivers
    subject: "Password change koro na hoi moro", // Subject line
    text: "Hello ki khobor , password bhule geso ? ", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

};
