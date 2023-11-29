const { SysUserRolesModul } = require("../../models/setting/sys-user-roles");
const { SysMasterRoleModel } = require("../../models/setting/sys-mst-role");
const { SysMasterUserModel } = require("../../models/setting/sys-mst-user");
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
    #swagger.tags = ['SYS USER ROLES']
    #swagger.summary = 'Access User Role'
    #swagger.description = 'every user has role for access'
  */
  try {
    // search on database
    const result = await SysUserRolesModul.findAll({
      include: [
        {
          model: SysMasterRoleModel,
          where: { deleted_at: null },
          attributes: ["id", "role_name"],
        },
        {
          model: SysMasterUserModel,
          where: { deleted_at: null },
          attributes: ["id", "fullname"],
        },
      ],
      raw: true,
    });
    // send success response
    response.MethodResponse(res, methodConstant.GET, result);
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
    #swagger.tags = ['SYS USER ROLES']
    #swagger.summary = 'Access User Role'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new role',
      schema: { $ref: '#/definitions/BodyUserRolesModulSchema' }
    }
  */
  try {
    // get payload from body
    const payload = req.body;

    const result = await SysUserRolesModul.findAll({
      where: { user_id: payload.user_id },
      raw: true,
    });

    if (result.length) {
      for (const dltData of result) {
        await SysUserRolesModul.destroy({ where: { id: dltData.id } });
      }
    }

    await SysUserRolesModul.bulkCreate(payload["role_access"]);

    // send success response
    response.MethodResponse(res, methodConstant.PUT, null);
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
    #swagger.tags = ['SYS USER ROLES']
    #swagger.summary = 'Access User Role'
    #swagger.description = 'every user has role for access'
  */
  try {
    // get uuid form params
    const id = req.params.id;

    // search on database with filter
    const result = await SysUserRolesModul.findOne({
      where: { id },
      include: [
        {
          model: SysMasterRoleModel,
          where: { deleted_at: null },
          attributes: ["id", "role_name"],
        },
        {
          model: SysMasterUserModel,
          where: { deleted_at: null },
          attributes: ["id", "fullname"],
        },
      ],
      raw: true,
    });

    // when data not found in database send error
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`);

    // send success response
    response.MethodResponse(res, methodConstant.GET, result);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
