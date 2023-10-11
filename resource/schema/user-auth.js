const { UserModelDefine } = require("../models/user-auth");

const UserSchema = {
  BodyUserSchema: {
    email: UserModelDefine.email,
    password: UserModelDefine.password,
    fullname: "Samantha O'Conner",
    date_of_birth: "1999-01-01",
    gender_id: null,
  },
  QueryUserSchema: {
    email: UserModelDefine.email,
  },
};

module.exports = UserSchema;

