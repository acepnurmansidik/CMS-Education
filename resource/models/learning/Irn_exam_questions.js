const { DataTypes } = require("sequelize");
const DBConn = require("../../../db");
const { SysRefParameterModel } = require("../setting/sys-ref-parameter");
const { SysMasterUserModel } = require("../setting/sys-mst-user");

const LrnExamQuestionsModelDefine = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  exam_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: "2024-01-01",
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "XG41S7",
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  major_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  day_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  type_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  teacher_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysMasterUserModel,
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
  subjects_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
};

const LrnExamQuestionsModel = DBConn.define(
  "lrn_exam_questions",
  LrnExamQuestionsModelDefine,
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
LrnExamQuestionsModel.belongsTo(SysRefParameterModel, {
  foreignKey: "subjects_id",
});
SysRefParameterModel.hasMany(LrnExamQuestionsModel, {
  foreignKey: "subjects_id",
});

LrnExamQuestionsModel.belongsTo(SysRefParameterModel, {
  foreignKey: "major_id",
});
SysRefParameterModel.hasMany(LrnExamQuestionsModel, {
  foreignKey: "major_id",
});

LrnExamQuestionsModel.belongsTo(SysRefParameterModel, {
  foreignKey: "day_id",
});
SysRefParameterModel.hasMany(LrnExamQuestionsModel, {
  foreignKey: "day_id",
});

LrnExamQuestionsModel.belongsTo(SysRefParameterModel, {
  foreignKey: "type_id",
});
SysRefParameterModel.hasMany(LrnExamQuestionsModel, {
  foreignKey: "type_id",
});

LrnExamQuestionsModel.belongsTo(SysRefParameterModel, {
  foreignKey: "level_id",
});
SysRefParameterModel.hasMany(LrnExamQuestionsModel, {
  foreignKey: "level_id",
});

LrnExamQuestionsModel.belongsTo(SysRefParameterModel, {
  foreignKey: "lesson_id",
});
SysRefParameterModel.hasMany(LrnExamQuestionsModel, {
  foreignKey: "lesson_id",
});

LrnExamQuestionsModel.belongsTo(SysMasterUserModel, {
  foreignKey: "teacher_id",
});
SysMasterUserModel.hasMany(LrnExamQuestionsModel, {
  foreignKey: "teacher_id",
});

delete LrnExamQuestionsModelDefine.id;
Object.keys(LrnExamQuestionsModelDefine).map((item) => {
  LrnExamQuestionsModelDefine[item] = LrnExamQuestionsModelDefine[item][
    "defaultValue"
  ]
    ? LrnExamQuestionsModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { LrnExamQuestionsModelDefine, LrnExamQuestionsModel };
