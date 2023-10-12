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
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "John Doe",
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reset_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mst_user_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: SysMasterUserModel,
      key: "id",
    },
  },
};

const UserModel = DBConn.define("sys_auth_users", UserModelDefine, {
  timestamps: true,
  schema: "setting",
  force: false,
  createdAt: true,
  updatedAt: true,
  paranoid: true,
  underscored: true,
});

// Definisikan relasi
UserModel.belongsTo(SysMasterUserModel, { foreignKey: "mst_user_id" });
SysMasterUserModel.hasOne(UserModel, { foreignKey: "mst_user_id" });

Object.keys(UserModelDefine).map((item) => {
  UserModelDefine[item] = UserModelDefine[item]["defaultValue"]
    ? UserModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { UserModelDefine, UserModel };
