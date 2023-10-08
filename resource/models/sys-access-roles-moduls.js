const { DataTypes } = require("sequelize");
const DBConn = require("../../db");
const { SysMasterModulModel } = require("./sys-mst-modul");
const { SysMasterRoleModel } = require("./sys-mst-role");

const SysAccessRoleModulDefine = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  role_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysMasterRoleModel,
      key: "id",
    },
  },
  modul_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysMasterModulModel,
      key: "id",
    },
  },
};

const SysAccessRoleModul = DBConn.define(
  "sys_access_roles_moduls",
  SysAccessRoleModulDefine,
  {
    timestamps: true,
    schema: "setting",
    force: false,
    createdAt: true,
    updatedAt: true,
    paranoid: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["role_id", "modul_id"],
      },
    ],
  },
);

// Definisikan relasi
SysAccessRoleModul.belongsTo(SysMasterModulModel, {
  foreignKey: "modul_id",
});
SysMasterModulModel.hasMany(SysAccessRoleModul, { foreignKey: "modul_id" });

SysAccessRoleModul.belongsTo(SysMasterRoleModel, {
  foreignKey: "role_id",
});
SysMasterRoleModel.hasMany(SysAccessRoleModul, { foreignKey: "role_id" });

delete SysAccessRoleModulDefine.id;
Object.keys(SysAccessRoleModulDefine).map((item) => {
  SysAccessRoleModulDefine[item] = SysAccessRoleModulDefine[item][
    "defaultValue"
  ]
    ? SysAccessRoleModulDefine[item]["defaultValue"]
    : null;
});

module.exports = { SysAccessRoleModulDefine, SysAccessRoleModul };
