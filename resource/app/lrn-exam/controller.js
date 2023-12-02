const {
  LrnExamQuestionsModel,
} = require("../../models/learning/lrn_exam_questions");
const {
  LrnAnswerChoiceModel,
} = require("../../models/learning/lrn answer_choices");
const { LrnQuestionModel } = require("../../models/learning/lrn_question");
const { methodConstant } = require("../../utils/constanta");
const { NotFoundError, BadRequestError } = require("../../utils/errors");
const response = require("../../utils/response");
const service = require("./service");
const controller = {};

controller.Index = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['LRN EXAM']
    #swagger.summary = 'Exam'
    #swagger.description = 'every student must take an exam'
    #swagger.parameters['limit'] = { default: 10, description: 'Limit data show' }
    #swagger.parameters['page'] = { default: 1, description: 'Page data show' }
  */

  // get filter at req.query
  const { limit, page, ...query } = req.query;
  try {
    const result = await service.getDataStudentExam({
      where: query,
      offset: page - 1,
      limit,
    });

    // send success response
    response.GetPaginationResponse(res, result, page, limit);
  } catch (err) {
    next(err);
  }
};

controller.Create = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['LRN EXAM']
    #swagger.summary = 'Exam'
    #swagger.description = 'every student must take an exam'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new room number',
      schema: { $ref: '#/definitions/BodyQuestionExamSchema' }
    }
  */
  const { questions, ...payloadExam } = req.body;
  const GenToken = await service.generateExamToken();
  try {
    // save to database
    payloadExam.token = GenToken;
    const resultExam = await LrnExamQuestionsModel.create(payloadExam);

    // validate not save to DB
    if (!resultExam) throw new BadRequestError(`Data failed to save`);
    for (const everyQuestion of questions) {
      const { multiple_question, ...quest } = everyQuestion;
      quest.exam_id = resultExam.id;
      let resultQuestion = await LrnQuestionModel.create(quest);

      // create answer from question with type multiple choice
      if (multiple_question.length) {
        for (const everyAnswer of multiple_question) {
          everyAnswer.question_id = resultQuestion.id;
          await LrnAnswerChoiceModel.create(everyAnswer);
        }
      }
    }

    // send success response
    response.MethodResponse(res, methodConstant.POST, null);
  } catch (err) {
    next(err);
  }
};

controller.Update = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['LRN EXAM']
    #swagger.summary = 'Exam'
    #swagger.description = 'every student must take an exam'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new room number',
      schema: { $ref: '#/definitions/BodyQuestionExamSchema' }
    }
  */
  const id = req.params.id;
  const { questions, ...payloadExam } = req.body;
  const GenToken = await service.generateExamToken();
  try {
    // search data from DB using UUID
    const resultExam = await LrnExamQuestionsModel.findOne({
      where: { id },
      raw: true,
    });
    if (!resultExam) throw new NotFoundError(`Data with id ${id} not found!`);
    // save to database
    payloadExam.token = GenToken;
    await LrnExamQuestionsModel.update(payloadExam, {
      where: { id },
    });

    // delete all question and answer
    let dltQuest = await LrnQuestionModel.findAll({
      where: { exam_id: id },
      attributes: ["id"],
      raw: true,
    });
    dltQuest = dltQuest.map((item) => item.id);
    await LrnQuestionModel.destroy({ where: { exam_id: id } });
    await LrnAnswerChoiceModel.destroy({ where: { question_id: dltQuest } });

    // re-create question and answer
    for (const everyQuestion of questions) {
      const { multiple_question, ...quest } = everyQuestion;
      quest.exam_id = resultExam.id;
      let resultQuestion = await LrnQuestionModel.create(quest);

      // create answer from question with type multiple choice
      if (multiple_question.length) {
        for (const everyAnswer of multiple_question) {
          everyAnswer.question_id = resultQuestion.id;
          await LrnAnswerChoiceModel.create(everyAnswer);
        }
      }
    }

    // send success response
    response.MethodResponse(res, methodConstant.PUT, null);
  } catch (err) {
    next(err);
  }
};

controller.Delete = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['LRN EXAM']
    #swagger.summary = 'Exam'
    #swagger.description = 'every student must take an exam'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  const id = req.params.id;
  try {
    // search data from DB using UUID
    const resultExam = await LrnExamQuestionsModel.findOne({
      where: { id },
      raw: true,
    });
    if (!resultExam) throw new NotFoundError(`Data with id ${id} not found!`);
    // delete exam, all question and answer
    let dltQuest = await LrnQuestionModel.findAll({
      where: { exam_id: id },
      attributes: ["id"],
      raw: true,
    });
    dltQuest = dltQuest.map((item) => item.id);
    await LrnExamQuestionsModel.destroy({ where: { id } });
    await LrnQuestionModel.destroy({ where: { exam_id: id } });
    await LrnAnswerChoiceModel.destroy({ where: { question_id: dltQuest } });

    // send success response
    response.MethodResponse(res, methodConstant.PUT, null);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
