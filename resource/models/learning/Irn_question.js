const { DataTypes } = require("sequelize");
const DBConn = require("../../../db");
const { SysRefParameterModel } = require("../sys-ref-parameter");
const { SysFileUploadModel } = require("../sys-file-upload");

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
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 20,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flag_img: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  question_type_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  exam_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  right_answer: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  file_url_id: {
    type: DataTypes.UUID,
    allowNull: false,
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

LrnQuestionModel.belongsTo(SysRefParameterModel, {
  foreignKey: "exam_id",
});
SysRefParameterModel.hasMany(LrnQuestionModel, {
  foreignKey: "exam_id",
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
