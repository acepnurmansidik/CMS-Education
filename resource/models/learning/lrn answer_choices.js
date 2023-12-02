const { DataTypes } = require("sequelize");
const DBConn = require("../../../db");
const { SysRefParameterModel } = require("../setting/sys-ref-parameter");
const { SysFileUploadModel } = require("../setting/sys-file-upload");
const { LrnQuestionModel } = require("./lrn_question");

const LrnAnswerChoiceModelDefine = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Lorem ipsum",
    unique: true,
  },
  flag_img: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  question_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: LrnQuestionModel,
      key: "id",
    },
  },
  answer_type_id: {
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

const LrnAnswerChoiceModel = DBConn.define(
  "lrn_answer_choices",
  LrnAnswerChoiceModelDefine,
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
LrnAnswerChoiceModel.belongsTo(SysRefParameterModel, {
  foreignKey: "answer_type_id",
});
SysRefParameterModel.hasMany(LrnAnswerChoiceModel, {
  foreignKey: "answer_type_id",
});

LrnAnswerChoiceModel.belongsTo(LrnQuestionModel, {
  foreignKey: "question_id",
});
LrnQuestionModel.hasMany(LrnAnswerChoiceModel, {
  foreignKey: "question_id",
});

LrnAnswerChoiceModel.belongsTo(SysFileUploadModel, {
  foreignKey: "file_url_id",
});
SysFileUploadModel.hasMany(LrnAnswerChoiceModel, {
  foreignKey: "file_url_id",
});

delete LrnAnswerChoiceModelDefine.id;
Object.keys(LrnAnswerChoiceModelDefine).map((item) => {
  LrnAnswerChoiceModelDefine[item] = LrnAnswerChoiceModelDefine[item][
    "defaultValue"
  ]
    ? LrnAnswerChoiceModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { LrnAnswerChoiceModelDefine, LrnAnswerChoiceModel };
