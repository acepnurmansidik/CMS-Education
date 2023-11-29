const { DataTypes } = require("sequelize");
const DBConn = require("../../../db");

const SysRefMajorModelDefine = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  code: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 111,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Teknik Komputer Jaringan",
  },
  role_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
};

const SysRefMajorModel = DBConn.define(
  "sys_ref_major",
  SysRefMajorModelDefine,
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

delete SysRefMajorModelDefine.id;
Object.keys(SysRefMajorModelDefine).map((item) => {
  SysRefMajorModelDefine[item] = SysRefMajorModelDefine[item]["defaultValue"]
    ? SysRefMajorModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { SysRefMajorModelDefine, SysRefMajorModel };
