const { DataTypes } = require("sequelize");
const DBConn = require("../../../db");

const LrnSchoolBuildingModelDefine = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  building_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Gedung 1",
  },
};

const LrnSchoolBuildingModel = DBConn.define(
  "lrn_school_building",
  LrnSchoolBuildingModelDefine,
  {
    timestamps: true,
    schema: "learning",
    force: false,
    createdAt: true,
    updatedAt: true,
    paranoid: true,
    underscored: true,
  },
);

delete LrnSchoolBuildingModelDefine.id;
Object.keys(LrnSchoolBuildingModelDefine).map((item) => {
  LrnSchoolBuildingModelDefine[item] = LrnSchoolBuildingModelDefine[item][
    "defaultValue"
  ]
    ? LrnSchoolBuildingModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { LrnSchoolBuildingModelDefine, LrnSchoolBuildingModel };
