const { DataTypes } = require("sequelize");
const DBConn = require("../../../db");

const SysRefParameterModelDefine = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  key: {
    type: DataTypes.NUMBER,
    allowNull: false,
    unique: false,
    defaultValue: "1",
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "X",
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "level",
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Tingkat kelas",
  },
};

const SysRefParameterModel = DBConn.define(
  "sys_ref_parameter",
  SysRefParameterModelDefine,
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

delete SysRefParameterModelDefine.id;
Object.keys(SysRefParameterModelDefine).map((item) => {
  SysRefParameterModelDefine[item] = SysRefParameterModelDefine[item][
    "defaultValue"
  ]
    ? SysRefParameterModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { SysRefParameterModelDefine, SysRefParameterModel };
