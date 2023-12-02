const { DataTypes } = require("sequelize");
const DBConn = require("../../../db");
const { SysRefParameterModel } = require("../setting/sys-ref-parameter");
const { SysMasterUserModel } = require("../setting/sys-mst-user");
const { SysRefMajorModel } = require("../setting/sys-ref-major");

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
  processing_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 60,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: "false",
  },
  major_id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: "8053488f-318f-4ec3-b90b-331c50949bd0",
    references: {
      model: SysRefMajorModel,
      key: "id",
    },
  },
  day_id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: "580a91bf-16ec-4ff1-b61d-32b9240a772d",
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  teacher_id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: "ce877533-6ab2-4583-81fa-ba838c01d04c",
    references: {
      model: SysMasterUserModel,
      key: "id",
    },
  },
  level_id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: "aa53de8a-29f4-4562-96b8-f557f9f43e5c",
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  lesson_id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: "74f94d7f-7183-4598-9034-d850f634193e",
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  type_exam_id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: "74bb2172-d27a-4599-b1f7-0444bd4d0b95",
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
  foreignKey: "type_exam_id",
  as: "type_exam",
});
SysRefParameterModel.hasMany(LrnExamQuestionsModel, {
  foreignKey: "type_exam_id",
});

LrnExamQuestionsModel.belongsTo(SysRefMajorModel, {
  foreignKey: "major_id",
});
SysRefMajorModel.hasMany(LrnExamQuestionsModel, {
  foreignKey: "major_id",
});

LrnExamQuestionsModel.belongsTo(SysRefParameterModel, {
  foreignKey: "day_id",
  as: "day",
});
SysRefParameterModel.hasMany(LrnExamQuestionsModel, {
  foreignKey: "day_id",
});

LrnExamQuestionsModel.belongsTo(SysRefParameterModel, {
  foreignKey: "level_id",
  as: "level",
});
SysRefParameterModel.hasMany(LrnExamQuestionsModel, {
  foreignKey: "level_id",
});

LrnExamQuestionsModel.belongsTo(SysRefParameterModel, {
  foreignKey: "lesson_id",
  as: "lesson",
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
