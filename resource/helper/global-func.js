const Mustache = require("mustache");
const nodemailer = require("nodemailer");
const ENV = require("../utils/config");
const bcrypt = require("bcrypt");

const transporter = nodemailer.createTransport({
  host: ENV.emailHost,
  port: ENV.emailPort,
  secure: ENV.emailSecure, // true for 465, false for other ports
  auth: {
    user: ENV.emailSender,
    // password device
    pass: ENV.emailPassword,
  },
});

const globalFunc = {};

globalFunc.sendEmail = async ({ template, payload, receive, subject }) => {
  // Get template email from html file
  const tempFile = fs.readFileSync(
    `resource/app/templates/html/${template}.html`,
    "utf-8",
  );

  // create instance email/config email
  let message = {
    from: ENV.emailSender,
    to: receive,
    subject,
    html: Mustache.render(tempFile, payload),
  };

  // send email
  return await transporter.sendMail(message);
};

globalFunc.hashPassword = async ({ password }) => {
  return await bcrypt.hash(password, 12);
};

globalFunc.verifyPassword = async ({ password, hashPassword }) => {
  return await bcrypt.compare(password, hashPassword);
};

module.exports = globalFunc;
