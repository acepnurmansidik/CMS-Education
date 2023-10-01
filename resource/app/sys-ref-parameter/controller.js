const response = require("../../utils/response");
const { SysRefParameterModel } = require("../../models/sys-ref-parameter");
const { methodConstant } = require("../../utils/constanta");
const { Sequelize } = require("sequelize");
const { NotFoundError } = require("../../utils/errors");

const controller = {};

controller.Index = async (req, res, next) => {
  /* 
    #swagger.tags = ['SYS REF PARAMETER']
    #swagger.summary = 'Ref parameter'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['type'] = { default: 'level', description: 'Search by type' }
    #swagger.parameters['value'] = { description: 'Search by value' }
    #swagger.parameters['limit'] = { default: 10, description: 'Limit data show' }
    #swagger.parameters['page'] = { default: 1, description: 'Page data show' }
  */
  try {
    // get data from body payload
    const { limit, page, ...query } = req.query;

    // search on database
    const result = await SysRefParameterModel.findAll({
      where: { ...query },
      offset: page - 1,
      limit,
    });

    // resnd response 404 if data not found
    if (!result.length) throw new NotFoundError("Data not found!");

    // send response
    response.MethodResponse(res, methodConstant.GET, result);
  } catch (err) {
    next(err);
  }
};

controller.Create = async (req, res, next) => {
  /* 
    #swagger.tags = ['SYS REF PARAMETER']
    #swagger.summary = 'Ref parameter'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create reference parameter',
      schema: { $ref: '#/definitions/BodyRefParameterSchema' }
    }
  */
  try {
    // get data from body payload
    const payload = req.body;
    // check same type in database
    let result = await SysRefParameterModel.findOne({
      order: [[Sequelize.literal("key"), "DESC"]],
    });
    // if same increament key +1
    payload.key = Number(result.key) ? Number(result.key) + 1 : 1;
    // saving to database
    result = await SysRefParameterModel.create(payload);
    // send response
    response.MethodResponse(res, methodConstant.POST, result);
  } catch (err) {
    next(err);
  }
};

controller.FindOne = async (req, res, next) => {
  /* 
    #swagger.tags = ['SYS REF PARAMETER']
    #swagger.summary = 'Ref parameter'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get data from body payload
    const id = req.params.id;
    // check same type in database
    const result = await SysRefParameterModel.findOne({ where: { id } });
    // send response 404 when data not found
    if (!result) throw new NotFoundError("Data not found!");
    // send response
    response.MethodResponse(res, methodConstant.GET, result);
  } catch (err) {
    next(err);
  }
};

controller.Update = async (req, res, next) => {
  /* 
    #swagger.tags = ['SYS REF PARAMETER']
    #swagger.summary = 'Ref parameter'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create reference parameter',
      schema: { $ref: '#/definitions/BodyRefParameterSchema' }
    }
  */
  try {
    // get data from body payload
    const id = req.params.id;
    const payload = req.body;
    // check same type in database
    const result = await SysRefParameterModel.findOne({ where: { id } });
    // send response 404 when data not found
    if (!result) throw new NotFoundError("Data not found!");
    // update data
    await SysRefParameterModel.update(payload, { where: { id } });
    // send response
    response.MethodResponse(res, methodConstant.PUT, null);
  } catch (err) {
    next(err);
  }
};

controller.Delete = async (req, res, next) => {
  /* 
    #swagger.tags = ['SYS REF PARAMETER']
    #swagger.summary = 'Ref parameter'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get data from body payload
    const id = req.params.id;
    // check same type in database
    let result = await SysRefParameterModel.findOne({ where: { id } });
    // send response 404 when data not found
    if (!result) throw new NotFoundError("Data not found!");
    // update data
    await SysRefParameterModel.destroy({ where: { id } });
    // send response
    response.MethodResponse(res, methodConstant.DELETE, result);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
