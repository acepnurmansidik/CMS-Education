const { LrnScoreLimitModel } = require("../../models/lrn-score-limit");
const { SysRefMajorModel } = require("../../models/sys-ref-major");
const { SysRefParameterModel } = require("../../models/sys-ref-parameter");
const { methodConstant } = require("../../utils/constanta");
const { NotFoundError } = require("../../utils/errors");
const response = require("../../utils/response");

const controller = {};

controller.Index = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['LRN SCORE LIMIT']
    #swagger.summary = 'Score Limit'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['limit'] = { default: 10, description: 'Limit data show' }
    #swagger.parameters['page'] = { default: 1, description: 'Page data show' }
  */
  try {
    // get filter at req.query
    const { limit, page, ...query } = req.query;
    // find data from database
    const result = await LrnScoreLimitModel.findAll({
      where: { ...query },
      offset: page - 1,
      include: [
        {
          model: SysRefMajorModel,
          attributes: ["role"],
        },
        {
          model: SysRefParameterModel,
          attributes: ["value"],
          as: "level",
        },
        {
          model: SysRefParameterModel,
          attributes: ["value"],
          as: "lesson",
        },
        {
          model: SysRefParameterModel,
          attributes: ["value"],
          as: "exam",
        },
      ],
      attributes: ["special_status", "min_score", "max_score", "status"],
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
    #swagger.tags = ['LRN SCORE LIMIT']
    #swagger.summary = 'Score Limit'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new room number',
      schema: { $ref: '#/definitions/BodyScoreLimitSchema' }
    }
  */
  try {
    // get data payload from req body
    const payload = req.body;

    // save to database
    const result = await LrnScoreLimitModel.create(payload);

    // send success response
    response.MethodResponse(res, methodConstant.POST, result);
  } catch (err) {
    next(err);
  }
};

controller.FindOne = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /*
    #swagger.tags = ['LRN SCORE LIMIT']
    #swagger.summary = 'Score Limit'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get id from param
    const id = req.params.id;

    // search data from database
    const result = await LrnScoreLimitModel.findOne({
      where: { id },
      attributes: ["special_status", "min_score", "max_score", "status"],
    });

    // send not found response when data empty
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);

    // send success response
    response.MethodResponse(res, methodConstant.GET, result);
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
    #swagger.tags = ['LRN SCORE LIMIT']
    #swagger.summary = 'Score Limit'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get id from param and body
    const id = req.params.id;
    const payload = req.body;

    // search data from database
    const result = await LrnScoreLimitModel.findOne({ where: { id } });

    // send not found response when data empty
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);

    // update data
    await LrnScoreLimitModel.update(payload, { where: { id } });

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
    #swagger.tags = ['LRN SCORE LIMIT']
    #swagger.summary = 'Score Limit'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get id from param
    const id = req.params.id;

    // search data from database
    const result = await LrnScoreLimitModel.findOne({ where: { id } });

    // send not found response when data empty
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);

    // delete data from database
    await LrnScoreLimitModel.destroy({ where: { id } });

    // send success response
    response.MethodResponse(res, methodConstant.DELETE, result);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
