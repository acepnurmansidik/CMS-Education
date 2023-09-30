const Mustache = require("mustache");
const nodemailer = require("nodemailer");
const {
  emailHost,
  emailPort,
  emailSecure,
  emailSender,
  emailPassword,
} = require("../utils/config");

const transporter = nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  secure: emailSecure, // true for 465, false for other ports
  auth: {
    user: emailSender,
    // password device
    pass: emailPassword,
  },
});

const sendEmail = async ({ template, payload, receive, subject }) => {
  // Get template email from html file
  const tempFile = fs.readFileSync(
    `resource/app/templates/html/${template}.html`,
    "utf-8",
  );

  // create instance email/config email
  let message = {
    from: emailSender,
    to: receive,
    subject,
    html: Mustache.render(tempFile, payload),
  };

  // send email
  return await transporter.sendMail(message);
};

module.exports = { sendEmail };
