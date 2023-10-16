const { SysMasterUserModel } = require("../../models/sys-mst-user");
const { methodConstant } = require("../../utils/constanta");
const { NotFoundError } = require("../../utils/errors");
const response = require("../../utils/response");

const controller = {};

controller.Create = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['SYS MASTER USER']
    #swagger.summary = 'Master User'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new role',
      schema: { $ref: '#/definitions/BodyMasterUserSchema' }
    }
  */
  try {
    const payload = req.body;
    const result = await SysMasterUserModel.create(payload);
    response.MethodResponse(res, methodConstant.POST, result);
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
    #swagger.tags = ['SYS MASTER USER']
    #swagger.summary = 'Master User'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new role',
      schema: { $ref: '#/definitions/BodyMasterUserSchema' }
    }
  */
  try {
    // get id from param and update data from body
    const id = req.params.id;
    const payload = req.body;
    // serach data on database
    let result = await SysMasterUserModel.findOne({ where: { id } });

    // send error not found when data emtyp
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`);

    // isexist update data
    result = await SysMasterUserModel.update(payload, { where: { id } });
    response.MethodResponse(res, methodConstant.PUT, null);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
