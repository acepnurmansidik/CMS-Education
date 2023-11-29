const { globalFunc } = require("../../helper/global-func");
const { SysMenuModel } = require("../../models/setting/sys-menu");
const { SysMasterModulModel } = require("../../models/setting/sys-mst-modul");
const { compaOpr, methodConstant } = require("../../utils/constanta");
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
    #swagger.tags = ['SYS MASTER MODUL']
    #swagger.summary = 'Master Modul'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['modul_name'] = { default: 'Dashboard', description: 'Search by role_name' }
    #swagger.parameters['limit'] = { default: 10, description: 'Limit data show' }
    #swagger.parameters['page'] = { default: 1, description: 'Page data show' }
  */
  try {
    // get data from payload
    const { limit, page, modul_name } = req.query;

    const where = await globalFunc.QuerySearch([
      { opr: compaOpr.ILIKE, values: { modul_name } },
    ]);

    // get data from database
    const result = await SysMasterModulModel.findAll({
      where,
      offset: page - 1,
      limit,
      include: {
        model: SysMenuModel,
        include: [],
      },
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
    #swagger.tags = ['SYS MASTER MODUL']
    #swagger.summary = 'Master Modul'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new role',
      schema: { $ref: '#/definitions/BodyMasterModulSchema' }
    }
  */
  try {
    // get data from body payload
    let { modul_name } = req.body;
    modul_name = modul_name.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
    // saving to databse
    const result = await SysMasterModulModel.create({ modul_name });
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
    #swagger.tags = ['SYS MASTER MODUL']
    #swagger.summary = 'Master Modul'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get data from body payload
    const id = req.params.id;
    // checking data from database
    const result = await SysMasterModulModel.findOne({
      where: { id },
      include: {
        model: SysMenuModel,
        include: [],
      },
    });
    // send error data not found
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`);
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
    #swagger.tags = ['SYS MASTER MODUL']
    #swagger.summary = 'Master Modul'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new role',
      schema: { $ref: '#/definitions/BodyMasterModulSchema' }
    }
  */
  try {
    // get data from body payload and params
    const id = req.params.id;
    let { modul_name } = req.body;
    modul_name = modul_name.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );

    // checking data from database
    const result = await SysMasterModulModel.findOne({ where: { id } });

    // send error data not found
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`);

    // saving to databse
    await SysMasterModulModel.update({ modul_name }, { where: { id } });

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
    #swagger.tags = ['SYS MASTER MODUL']
    #swagger.summary = 'Master Modul'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get data from body payload and params
    const id = req.params.id;

    // checking data from database
    const result = await SysMasterModulModel.findOne({ where: { id } });

    // send error data not found
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`);

    // saving to databse
    await SysMasterModulModel.destroy({ where: { id } });

    // send success response
    response.MethodResponse(res, methodConstant.DELETE, null);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
