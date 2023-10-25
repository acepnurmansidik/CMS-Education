const { Op } = require("sequelize");
const { globalFunc } = require("../../helper/global-func");
const { SysMenuModel } = require("../../models/sys-menu");
const { compaOpr, methodConstant } = require("../../utils/constanta");
const { NotFoundError } = require("../../utils/errors");
const response = require("../../utils/response");
const { SysMasterModulModel } = require("../../models/sys-mst-modul");

const controller = {};

controller.Index = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['SYS MENU']
    #swagger.summary = 'Menu'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['menu_name'] = { default: 'Dashboard', description: 'Search by menu_name' }
    #swagger.parameters['mst_modul_id'] = { default: 'Dashboard', description: 'Search by mst_modul_id' }
    #swagger.parameters['limit'] = { default: 10, description: 'Limit data show' }
    #swagger.parameters['page'] = { default: 1, description: 'Page data show' }
  */
  try {
    // get data from payload
    const { limit, page, mst_modul_id, ...query } = req.query;

    const where = await globalFunc.QuerySearch([
      { opr: compaOpr.ILIKE, values: { ...query } },
      { opr: compaOpr.AND, values: { mst_modul_id } },
    ]);

    // get data from database
    const result = await SysMenuModel.findAll({
      where,
      offset: page - 1,
      limit,
      include: {
        model: SysMasterModulModel,
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
    #swagger.tags = ['SYS MENU']
    #swagger.summary = 'Menu'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new role',
      schema: { $ref: '#/definitions/BodyMenuSchema' }
    }
  */
  try {
    // get data from body payload
    let { menu_name, ...payload } = req.body;
    menu_name = menu_name.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    // saving to databse
    const result = await SysMenuModel.create({ menu_name, ...payload });
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
    #swagger.tags = ['SYS MENU']
    #swagger.summary = 'Menu'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get uuid from params
    const id = req.params.id;

    // find data on database by uuid
    const result = await SysMenuModel.findOne({
      where: { id },
      include: {
        model: SysMasterModulModel,
        include: [],
      },
    });

    // when data empty send not found
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`);
    // send success response
    response.MethodResponse(res, methodConstant.GET, result);
  } catch (err) {
    next(er);
  }
};

controller.Update = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['SYS MENU']
    #swagger.summary = 'Menu'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new role',
      schema: { $ref: '#/definitions/BodyMenuSchema' }
    }
  */
  try {
    // get data from body payload and uuid from params
    const id = req.params.id;
    let { menu_name, ...payload } = req.body;
    menu_name = menu_name.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );

    // get data on database by uuid
    const result = await SysMenuModel.findOne({ where: { id } });

    // when data is empty send resposne error not found
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`);

    // update to database
    await SysMenuModel.update({ menu_name, ...payload }, { where: { id } });

    // send success response
    response.MethodResponse(res, methodConstant.POST, result);
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
    #swagger.tags = ['SYS MENU']
    #swagger.summary = 'Menu'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get uuid from params
    const id = req.params.id;

    // get data on database by uuid
    const result = await SysMenuModel.findOne({ where: { id } });

    // when data is empty send resposne error not found
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`);

    // update to database
    await SysMenuModel.destroy({ where: { id } });

    // send success response
    response.MethodResponse(res, methodConstant.POST, result);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
