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

    const include = globalFunc.JoinsRelation([
      {
        model: SysMasterModulModel,
        include: [],
      },
    ]);

    // get data from database
    const result = await SysMenuModel.findAll({
      where,
      offset: page - 1,
      limit,
      include,
    });

    // send success response
    response.GetPaginationResponse(res, result, page, limit);
  } catch (err) {
    next(err);
  }
};

controller.Create = async (req, res, next) => {
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
    const payload = req.body;
    // saving to databse
    const result = await SysMenuModel.create(payload);
    // send success response
    response.MethodResponse(res, methodConstant.POST, result);
  } catch (err) {
    next(err);
  }
};

controller.FindOne = async (req, res, next) => {
  /* 
    #swagger.tags = ['SYS MENU']
    #swagger.summary = 'Menu'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get uuid from params
    const id = req.params.id;
    // joins relation
    const include = globalFunc.JoinsRelation([
      {
        model: SysMasterModulModel,
        include: [],
      },
    ]);
    // find data on database by uuid
    const result = await SysMenuModel.findOne({ where: { id }, include });
    // when data empty send not found
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`)
    // send success response
    response.MethodResponse(res, methodConstant.GET, result);
  } catch (err) {
    next(er);
  }
};

controller.Update = async (req, res, next) => {
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
    const payload = req.body;
    const id = req.params.id;

    // get data on database by uuid
    const result = await SysMenuModel.findOne({ where: { id } });

    // when data is empty send resposne error not found
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`)

    // update to database
    await SysMenuModel.update(payload, { where: { id } });

    // send success response
    response.MethodResponse(res, methodConstant.POST, result);
  } catch (err) {
    next(err);
  }
};

controller.Delete = async (req, res, next) => {
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
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`)

    // update to database
    await SysMenuModel.destroy({ where: { id } });

    // send success response
    response.MethodResponse(res, methodConstant.POST, result);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
