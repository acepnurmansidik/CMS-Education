const { DataTypes } = require("sequelize");
const DBConn = require("../../db");

const SysMstRoleModelDefine = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Admin",
  },
};

const SysMasterRoleModel = DBConn.define(
  "sys_mst_role",
  SysMstRoleModelDefine,
  {
    timestamps: true,
    schema: "setting",
    force: false,
    createdAt: true,
    updatedAt: true,
    paranoid: true,
    underscored: true,
  },
);

delete SysMstRoleModelDefine.id;
Object.keys(SysMstRoleModelDefine).map((item) => {
  SysMstRoleModelDefine[item] = SysMstRoleModelDefine[item]["defaultValue"]
    ? SysMstRoleModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { SysMstRoleModelDefine, SysMasterRoleModel };
