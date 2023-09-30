const { UserModelDefine } = require("../models/user");

const UserSchema = {
  BodyUserSchema: UserModelDefine,
  QueryUserSchema: {
    email: UserModelDefine.email,
  },
};

module.exports = UserSchema;
