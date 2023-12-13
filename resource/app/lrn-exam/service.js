const {
  LrnAnswerChoiceModel,
} = require("../../models/learning/lrn answer_choices");
const {
  LrnExamQuestionsModel,
} = require("../../models/learning/lrn_exam_questions");
const { LrnQuestionModel } = require("../../models/learning/lrn_question");
const { SysMasterUserModel } = require("../../models/setting/sys-mst-user");
const { SysRefMajorModel } = require("../../models/setting/sys-ref-major");
const {
  SysRefParameterModel,
} = require("../../models/setting/sys-ref-parameter");

const service = {};

service.generateExamToken = async () => {
  const tokenCode = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const token = [];
  for (let i = 0; i < 8; i++) {
    token.push(tokenCode[~~(Math.random() * tokenCode.length + 1)]);
  }

  return token.join("");
};

service.getDataStudentExam = async ({ where, offset, limit }) => {
  return await LrnExamQuestionsModel.findAll({
    where,
    offset,
    limit,
    attributes: {
      exclude: ["is_active", "createdAt", "updatedAt", "deletedAt"],
    },
    include: [
      {
        model: SysRefParameterModel,
        attributes: ["value"],
        as: "level",
      },
      {
        model: SysRefParameterModel,
        attributes: ["value"],
        as: "type_exam",
      },
      {
        model: SysRefParameterModel,
        attributes: ["value"],
        as: "day",
      },
      {
        model: SysRefParameterModel,
        attributes: ["value"],
        as: "lesson",
      },
      {
        model: SysRefMajorModel,
        attributes: ["role"],
      },
      {
        model: SysMasterUserModel,
        attributes: ["fullname"],
      },
      {
        model: LrnQuestionModel,
        as: "questions",
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
      },
    ],
  });
};

module.exports = service;
