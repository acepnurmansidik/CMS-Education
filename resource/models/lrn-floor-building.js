const { DataTypes } = require("sequelize");
const DBConn = require("../../db");
const {LrnSchoolBuildingModel} = require("./lrn-school-building");

const LrnFloorBuildingModelDefine = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  floor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  room_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Lab Matematika",
  },
  room_code: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  school_building_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: LrnSchoolBuildingModel,
      key: "id",
    },
  },
};

const LrnFloorBuildingModel = DBConn.define(
  "lrn_floor_building",
  LrnFloorBuildingModelDefine,
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

// Definisikan relasi
LrnFloorBuildingModel.belongsTo(LrnSchoolBuildingModel, { foreignKey: "school_building_id" });
LrnSchoolBuildingModel.hasMany(LrnFloorBuildingModel, { foreignKey: "school_building_id" });

delete LrnFloorBuildingModelDefine.id;
Object.keys(LrnFloorBuildingModelDefine).map((item) => {
  LrnFloorBuildingModelDefine[item] = LrnFloorBuildingModelDefine[item][
    "defaultValue"
  ]
    ? LrnFloorBuildingModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { LrnFloorBuildingModelDefine, LrnFloorBuildingModel };
