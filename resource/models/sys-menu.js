const { DataTypes } = require("sequelize");
const DBConn = require("../../db");

const SysMenuModelDefine = {
  menu_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Laporan",
  },
  mst_modul_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
};

const SysMenuModel = DBConn.define("sys_menu", SysMenuModelDefine, {
  timestamps: true,
  schema: "setting",
  force: false,
  createdAt: true,
  updatedAt: true,
  paranoid: true,
});

Object.keys(SysMenuModelDefine).map((item) => {
  SysMenuModelDefine[item] = SysMenuModelDefine[item]["defaultValue"]
    ? SysMenuModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { SysMenuModelDefine, SysMenuModel };
