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

router.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `${name} <${email}>`,
    to: 'tyler@dynamicshark.com',
    subject: `Photo Form Submssion from ${name}`,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);
    return res.status(200).json({ message: 'Email successfully sent' });

  } catch (error) {
    console.error('Error sending email:', err);
    return res.status(500).json({ message: `Server sending failed: ${error.message}` });
  }
});

export { router };