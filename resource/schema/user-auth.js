const { UserModelDefine } = require("../models/user-auth");

const UserSchema = {
  BodyUserSchema: {
    email: UserModelDefine.email,
    password: UserModelDefine.password,
    fullname: "Samantha O'Conner",
    date_of_birth: "1999-01-01",
    gender_id: null,
  },
  BodyUserLoginSchema: {
    email: UserModelDefine.email,
    password: UserModelDefine.password,
  },
  BodyActivationUserSchema: {
    email: UserModelDefine.email,
    otp: "462354",
  },
  BodySendOTPActivationUserSchema: {
    email: UserModelDefine.email,
  },
  BodyRecoveryPasswordUserSchema: {
    email: UserModelDefine.email,
    otp: "462354",
    password: UserModelDefine.password,
    confirmPassword: UserModelDefine.password,
  },
  QueryUserSchema: {
    email: UserModelDefine.email,
  },
};

module.exports = UserSchema;
