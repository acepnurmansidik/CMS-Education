const {
  LrnSchoolBuildingModel,
} = require("../../models/learning/lrn-school-building");
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
    #swagger.tags = ['LRN SCHOOL BUILDING']
    #swagger.summary = 'School Building'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['building_name'] = { description: 'Search by building_name' }
    #swagger.parameters['limit'] = { default: 10, description: 'Limit data show' }
    #swagger.parameters['page'] = { default: 1, description: 'Page data show' }
  */
  try {
    // get filter at req.query
    const { limit, page, ...query } = req.query;
    // find data from database with filter condition
    const result = await LrnSchoolBuildingModel.findAll({
      where: { ...query },
      attributes: ["id", "building_name"],
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
    #swagger.tags = ['LRN SCHOOL BUILDING']
    #swagger.summary = 'School Building'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new role',
      schema: { $ref: '#/definitions/BodySchoolBuildingSchema' }
    }
  */
  try {
    // get data payload from req body
    const payload = req.body;

    // save to database
    const result = await LrnSchoolBuildingModel.create(payload);

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
    #swagger.tags = ['LRN SCHOOL BUILDING']
    #swagger.summary = 'School Building'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get id from params
    const id = req.params.id;
    // find data by id on database
    const result = await LrnSchoolBuildingModel.findOne({
      where: { id },
      attributes: ["id", "building_name"],
    });
    // when data not exist send not found response
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);
    // send success responses
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
    #swagger.tags = ['LRN SCHOOL BUILDING']
    #swagger.summary = 'School Building'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new building name',
      schema: { $ref: '#/definitions/BodySchoolBuildingSchema' }
    }
  */
  try {
    // get id from params and payload from body
    const id = req.params.id;
    const payload = req.body;
    // find data by id on database
    const result = await LrnSchoolBuildingModel.findOne({ where: { id } });
    // when data not exist send not found response
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);
    // update data to database
    await LrnSchoolBuildingModel.update(payload, { where: { id } });
    // send success resposne
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
    #swagger.tags = ['LRN SCHOOL BUILDING']
    #swagger.summary = 'School Building'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get id from params and payload from body
    const id = req.params.id;
    const payload = req.body;
    // find data by id on database
    const result = await LrnSchoolBuildingModel.findOne({ where: { id } });
    // when data not exist send not found response
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);
    // update data to database
    await LrnSchoolBuildingModel.destroy({ where: { id } });
    // send success resposne
    response.MethodResponse(res, methodConstant.DELETE, null);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
