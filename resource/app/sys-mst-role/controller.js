const response = require("../../utils/response");
const { SysMasterRoleModel } = require("../../models/setting/sys-mst-role");
const { methodConstant } = require("../../utils/constanta");
const { Sequelize, Op } = require("sequelize");
const { NotFoundError } = require("../../utils/errors");
const { globalFunc } = require("../../helper/global-func");

const controller = {};

controller.Index = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['SYS MASTER ROLE']
    #swagger.summary = 'Master Roler'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['role_name'] = { default: 'Admin', description: 'Search by role_name' }
    #swagger.parameters['limit'] = { default: 10, description: 'Limit data show' }
    #swagger.parameters['page'] = { default: 1, description: 'Page data show' }
  */
  try {
    // get data from body payload
    const { limit, page, ...query } = req.query;

    const where = await globalFunc.QuerySearch([
      { opr: "iLike", values: { ...query } },
    ]);

    // search on database
    const result = await SysMasterRoleModel.findAll({
      where,
      offset: page - 1,
      limit,
    });

    // send response
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
    #swagger.tags = ['SYS MASTER ROLE']
    #swagger.summary = 'Master Role'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new role',
      schema: { $ref: '#/definitions/BodyMasterRoleSchema' }
    }
  */
  try {
    // get data from body payload
    const payload = req.body;
    // saving to database
    const result = await SysMasterRoleModel.create(payload);
    // send response
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
    #swagger.tags = ['SYS MASTER ROLE']
    #swagger.summary = 'Master Role'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get data from body payload
    const id = req.params.id;
    // check same type in database
    const result = await SysMasterRoleModel.findOne({ where: { id } });
    // send response 404 when data not found
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`);
    // send response
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
    #swagger.tags = ['SYS MASTER ROLE']
    #swagger.summary = 'Master Role'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create reference parameter',
      schema: { $ref: '#/definitions/BodyMasterRoleSchema' }
    }
  */
  try {
    // get data from body payload
    const id = req.params.id;
    const payload = req.body;
    // check same type in database
    const result = await SysMasterRoleModel.findOne({ where: { id } });
    // send response 404 when data not found
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`);
    // update data
    await SysMasterRoleModel.update(payload, { where: { id } });
    // send response
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
    #swagger.tags = ['SYS MASTER ROLE']
    #swagger.summary = 'Master Role'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get data from body payload
    const id = req.params.id;
    // check same type in database
    let result = await SysMasterRoleModel.findOne({ where: { id } });
    // send response 404 when data not found
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`);
    // update data
    await SysMasterRoleModel.destroy({ where: { id } });
    // send response
    response.MethodResponse(res, methodConstant.DELETE, result);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
