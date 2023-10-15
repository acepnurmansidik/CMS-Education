const { DataTypes } = require("sequelize");
const DBConn = require("../../db");
const { SysMasterRoleModel } = require("./sys-mst-role");
const { SysMasterUserModel } = require("./sys-mst-user");

const SysUserRolesDefine = {
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
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysMasterUserModel,
      key: "id",
    },
  },
};

const SysUserRolesModul = DBConn.define("sys_users_roles", SysUserRolesDefine, {
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
      fields: ["role_id", "user_id"],
    },
  ],
});

// Definisikan relasi
SysUserRolesModul.belongsTo(SysMasterUserModel, { foreignKey: "user_id" });
SysMasterUserModel.hasMany(SysUserRolesModul, { foreignKey: "user_id" });

SysUserRolesModul.belongsTo(SysMasterRoleModel, { foreignKey: "role_id" });
SysMasterRoleModel.hasMany(SysUserRolesModul, { foreignKey: "role_id" });

delete SysUserRolesDefine.id;
Object.keys(SysUserRolesDefine).map((item) => {
  SysUserRolesDefine[item] = SysUserRolesDefine[item]["defaultValue"]
    ? SysUserRolesDefine[item]["defaultValue"]
    : null;
});

module.exports = { SysUserRolesDefine, SysUserRolesModul };
