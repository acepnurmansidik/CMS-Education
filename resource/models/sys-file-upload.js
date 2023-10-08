const { DataTypes } = require("sequelize");
const DBConn = require("../../db");

const SysFileUploadModelDefine = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "/shdqansda-234b32vh2.jpg",
  },
};

const SysFileUploadModel = DBConn.define(
  "sys_file_upload",
  SysFileUploadModelDefine,
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

delete SysFileUploadModelDefine.id;
Object.keys(SysFileUploadModelDefine).map((item) => {
  SysFileUploadModelDefine[item] = SysFileUploadModelDefine[item][
    "defaultValue"
  ]
    ? SysFileUploadModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { SysFileUploadModelDefine, SysFileUploadModel };
