const { LrnFloorBuildingModel } = require("../../models/lrn-floor-building");
const { methodConstant } = require("../../utils/constanta");
const { NotFoundError } = require("../../utils/errors");
const response = require("../../utils/response");

const controller = {};

controller.Index = async (req, res, next) => {
  /* 
    #swagger.tags = ['LRN ROOM BUILDING']
    #swagger.summary = 'Room Building'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['room_name'] = { description: 'Search by room_name' }
    #swagger.parameters['room_code'] = { description: 'Search by room_code' }
    #swagger.parameters['floor'] = { description: 'Search by floor' }
    #swagger.parameters['school_building_id'] = { description: 'Search by school_building_id' }
    #swagger.parameters['limit'] = { default: 10, description: 'Limit data show' }
    #swagger.parameters['page'] = { default: 1, description: 'Page data show' }
  */
  try {
    // get filter at req.query
    const { limit, page, ...query } = req.query;
    // find data from database with filter condition
    const result = await LrnFloorBuildingModel.findAll({
      where: { ...query },
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
    #swagger.tags = ['LRN ROOM BUILDING']
    #swagger.summary = 'Room Building'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new room number',
      schema: { $ref: '#/definitions/BodyFloorBuildingSchema' }
    }
  */
  try {
    // get data payload from req body
    const payload = req.body;

    // save to database
    const result = await LrnFloorBuildingModel.create(payload);

    // send success response
    response.MethodResponse(res, methodConstant.POST, result);
  } catch (err) {
    next(err);
  }
};

controller.FindOne = async (req, res, next) => {
  /* 
    #swagger.tags = ['LRN ROOM BUILDING']
    #swagger.summary = 'Room Building'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get id from params
    const id = req.params.id;
    // find data by id on database
    const result = await LrnFloorBuildingModel.findOne({
      where: { id },
      attributes: ["id", "room_name"],
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
    #swagger.tags = ['LRN ROOM BUILDING']
    #swagger.summary = 'Room Building'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new room number',
      schema: { $ref: '#/definitions/BodyFloorBuildingSchema' }
    }
  */
  try {
    // get id from params and payload from body
    const id = req.params.id;
    const payload = req.body;
    // find data by id on database
    const result = await LrnFloorBuildingModel.findOne({ where: { id } });
    // when data not exist send not found response
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);
    // update data to database
    await LrnFloorBuildingModel.update(payload, { where: { id } });
    // send success resposne
    response.MethodResponse(res, methodConstant.PUT, null);
  } catch (err) {
    next(err);
  }
};

controller.Delete = async (req, res, next) => {
  /* 
    #swagger.tags = ['LRN ROOM BUILDING']
    #swagger.summary = 'Room Building'
    #swagger.description = 'every school have buildings'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get id from params and payload from body
    const id = req.params.id;
    const payload = req.body;
    // find data by id on database
    const result = await LrnFloorBuildingModel.findOne({ where: { id } });
    // when data not exist send not found response
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);
    // update data to database
    await LrnFloorBuildingModel.destroy({ where: { id } });
    // send success resposne
    response.MethodResponse(res, methodConstant.DELETE, null);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
