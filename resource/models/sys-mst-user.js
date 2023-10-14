const { DataTypes } = require("sequelize");
const DBConn = require("../../db");
const { SysFileUploadModel } = require("./sys-file-upload");
const { SysRefParameterModel } = require("./sys-ref-parameter");
const { SysRefMajorModel } = require("./sys-ref-major");

const SysMasterUserModelDefine = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Samantha O'Conner",
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: "1999-01-01",
  },
  place_of_birth: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Florida",
  },
  role_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  residential_address: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Florida, USA",
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "081977661100",
  },
  unique_number: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  npwp_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  no_identity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  file_url_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: SysFileUploadModel,
      key: "id",
    },
  },
  gender_id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: "d0c57bd3-6d7e-4240-a369-a4e3f08d6b2e",
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  religion_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  marrital_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  level_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  major_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: SysRefMajorModel,
      key: "id",
    },
  },
};

const SysMasterUserModel = DBConn.define(
  "sys_mst_user",
  SysMasterUserModelDefine,
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

SysMasterUserModel.belongsTo(SysFileUploadModel, { foreignKey: "file_url_id" });
SysMasterUserModel.belongsTo(SysFileUploadModel, { foreignKey: "gender_id" });
SysMasterUserModel.belongsTo(SysFileUploadModel, { foreignKey: "religion_id" });
SysMasterUserModel.belongsTo(SysFileUploadModel, { foreignKey: "marrital_id" });
SysMasterUserModel.belongsTo(SysFileUploadModel, { foreignKey: "level_id" });
SysMasterUserModel.belongsTo(SysRefMajorModel, { foreignKey: "major_id" });

delete SysMasterUserModelDefine.id;
Object.keys(SysMasterUserModelDefine).map((item) => {
  SysMasterUserModelDefine[item] = SysMasterUserModelDefine[item][
    "defaultValue"
  ]
    ? SysMasterUserModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { SysMasterUserModelDefine, SysMasterUserModel };
