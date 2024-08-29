import nodemailer from "nodemailer";

interface OptionsValues {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: OptionsValues) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    //secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    //only in test mode
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
    to: options.email,
    subject: options.subject,
    // text: options.message,
    html: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
