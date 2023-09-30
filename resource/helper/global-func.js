const Mustache = require("mustache");
const nodemailer = require("nodemailer");
const ENV = require("../utils/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

globalFunc.generateJwtToken = async (payload, next) => {
  delete payload.password;
  const jwtSignOptions = {
    algorithm: ENV.algorithmToken,
    expiresIn: ENV.jwtExpired,
    jwtid: ENV.jwtID,
  };
  // create token
  const token = await jwt.sign(payload, ENV.secretToken, jwtSignOptions);

  // verify token
  const refresh = await verifyJwtToken(token);
  delete refresh.jti;
  delete refresh.exp;
  delete refresh.iat;
  jwtSignOptions.expiresIn = ENV.jwtRefreshExpired;
  // create refresh token
  const refreshToken = await jwt.sign(refresh, ENV.secretToken, jwtSignOptions);

  return {
    token,
    refreshToken,
  };
};

const verifyJwtToken = async (token, next) => {
  try {
    // verify token
    const decode = await jwt.verify(token, ENV.secretToken);
    return decode;
  } catch (err) {
    next(err);
  }
};

module.exports = globalFunc;
