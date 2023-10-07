const { DataTypes } = require("sequelize");
const DBConn = require("../../db");

const SysMstModulModelDefine = {
  modul_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Dashboard",
  },
};

const SysMasterModulModel = DBConn.define(
  "sys_mst_modul",
  SysMstModulModelDefine,
  {
    timestamps: true,
    schema: "setting",
    force: false,
    createdAt: true,
    updatedAt: true,
    paranoid: true,
  },
);

Object.keys(SysMstModulModelDefine).map((item) => {
  SysMstModulModelDefine[item] = SysMstModulModelDefine[item]["defaultValue"]
    ? SysMstModulModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { SysMstModulModelDefine, SysMasterModulModel };
