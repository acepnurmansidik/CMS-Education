const { DataTypes } = require("sequelize");
const DBConn = require("../../db");
const { SysMasterModulModel } = require("./sys-mst-modul");

const SysMenuModelDefine = {
  menu_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Laporan",
  },
  mst_modul_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysMasterModulModel,
      key: "id",
    },
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

// Definisikan relasi
SysMenuModel.belongsTo(SysMasterModulModel, { foreignKey: "mst_modul_id" });
SysMasterModulModel.hasMany(SysMenuModel, { foreignKey: "mst_modul_id" });

Object.keys(SysMenuModelDefine).map((item) => {
  SysMenuModelDefine[item] = SysMenuModelDefine[item]["defaultValue"]
    ? SysMenuModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { SysMenuModelDefine, SysMenuModel };
