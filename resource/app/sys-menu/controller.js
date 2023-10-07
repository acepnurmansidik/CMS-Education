const { Op } = require("sequelize");
const { globalFunc } = require("../../helper/global-func");
const { SysMenuModel } = require("../../models/sys-menu");
const { compaOpr, methodConstant } = require("../../utils/constanta");
const { NotFoundError } = require("../../utils/errors");
const response = require("../../utils/response");

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

    // get data from database
    const result = await SysMenuModel.findAll({
      where,
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

module.exports = controller;
