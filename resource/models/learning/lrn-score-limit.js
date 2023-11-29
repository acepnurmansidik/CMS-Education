const { DataTypes } = require("sequelize");
const DBConn = require("../../../db");
const { SysRefMajorModel } = require("../setting/sys-ref-major");
const { SysRefParameterModel } = require("../setting/sys-ref-parameter");

const LrnScoreLimitModelDefine = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  special_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  min_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  max_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
  },
  major_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefMajorModel,
      key: "id",
    },
  },
  level_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  lesson_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  exam_type_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
};

const LrnScoreLimitModel = DBConn.define(
  "lrn_score_limit",
  LrnScoreLimitModelDefine,
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
LrnScoreLimitModel.belongsTo(SysRefMajorModel, {
  foreignKey: "major_id",
});
LrnScoreLimitModel.belongsTo(SysRefParameterModel, {
  foreignKey: "level_id",
  as: "level",
});
LrnScoreLimitModel.belongsTo(SysRefParameterModel, {
  foreignKey: "lesson_id",
  as: "lesson",
});
LrnScoreLimitModel.belongsTo(SysRefParameterModel, {
  foreignKey: "exam_type_id",
  as: "exam",
});

delete LrnScoreLimitModelDefine.id;
delete LrnScoreLimitModelDefine.max_score;
Object.keys(LrnScoreLimitModelDefine).map((item) => {
  LrnScoreLimitModelDefine[item] = LrnScoreLimitModelDefine[item][
    "defaultValue"
  ]
    ? LrnScoreLimitModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { LrnScoreLimitModelDefine, LrnScoreLimitModel };
