import express from 'express';
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

const router = express.Router();

const auth = {
  auth: {
    api_key: process.env.MAIL_KEY,
    domain: process.env.MAIL_DOMAIN
  }
};

const transporter = nodemailer.createTransport(mg(auth));

router.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `${name} <${email}>`,
    to: 'tyler@dynamicshark.com',
    subject: `Photo Form Submssion from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
      return res.status(500).send('Email sending failed');
    }
    console.log('Email sent:', info);
    return res.status(200).send('Email successfully sent');
  });
});

export { router };