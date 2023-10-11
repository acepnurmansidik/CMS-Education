const { DataTypes } = require("sequelize");
const DBConn = require("../../db");
const { SysMasterUserModel } = require("./sys-mst-user");

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
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reset_token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mst_user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: "d0c57bd3-6d7e-4240-a369-a4e3f08d6b2e",
    references: {
      model: SysMasterUserModel,
      key: "id",
    },
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
