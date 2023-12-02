const { DataTypes } = require("sequelize");
const DBConn = require("../../../db");
const { SysRefParameterModel } = require("../setting/sys-ref-parameter");
const { SysFileUploadModel } = require("../setting/sys-file-upload");
const { LrnExamQuestionsModel } = require("./lrn_exam_questions");

const LrnQuestionModelDefine = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  question_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    unique: true,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 20,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  flag_img: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  question_type_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  exam_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: LrnExamQuestionsModel,
      key: "id",
    },
  },
  right_answer: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  file_url_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: SysFileUploadModel,
      key: "id",
    },
  },
};

const LrnQuestionModel = DBConn.define("lrn_question", LrnQuestionModelDefine, {
  timestamps: true,
  schema: "learning",
  force: false,
  createdAt: true,
  updatedAt: true,
  paranoid: true,
  underscored: true,
});

// Definisikan relasi
LrnQuestionModel.belongsTo(SysRefParameterModel, {
  foreignKey: "question_type_id",
});
SysRefParameterModel.hasMany(LrnQuestionModel, {
  foreignKey: "question_type_id",
});

LrnQuestionModel.belongsTo(LrnExamQuestionsModel, {
  foreignKey: "exam_id",
  as: "questions",
});
LrnExamQuestionsModel.hasMany(LrnQuestionModel, {
  foreignKey: "exam_id",
  as: "questions",
});

LrnQuestionModel.belongsTo(SysRefParameterModel, {
  foreignKey: "right_answer",
});
SysRefParameterModel.hasMany(LrnQuestionModel, {
  foreignKey: "right_answer",
});

LrnQuestionModel.belongsTo(SysFileUploadModel, {
  foreignKey: "file_url_id",
});
SysFileUploadModel.hasMany(LrnQuestionModel, {
  foreignKey: "file_url_id",
});

delete LrnQuestionModelDefine.id;
Object.keys(LrnQuestionModelDefine).map((item) => {
  LrnQuestionModelDefine[item] = LrnQuestionModelDefine[item]["defaultValue"]
    ? LrnQuestionModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { LrnQuestionModelDefine, LrnQuestionModel };
