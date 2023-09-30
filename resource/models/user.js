const { DataTypes } = require("sequelize");
const DBConn = require("../../db");

const UserModelDefine = {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      isEmail: true, // Pastikan nilai email sesuai format email
    },
    defaultValue: "example@gmail.com",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "example secret",
  },
};

const UserModel = DBConn.define("user", UserModelDefine, {
  timestamps: true,
  schema: "setting",
  force: false,
  createdAt: true,
  updatedAt: true,
  paranoid: true,
});

Object.keys(UserModelDefine).map((item) => {
  UserModelDefine[item] = UserModelDefine[item]["defaultValue"]
    ? UserModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { UserModelDefine, UserModel };
