const { Op } = require("sequelize");
const { globalFunc } = require("../../helper/global-func");
const { SysAccessRoleModul } = require("../../models/sys-access-roles-moduls");
const { SysMasterModulModel } = require("../../models/sys-mst-modul");
const { SysMasterRoleModel } = require("../../models/sys-mst-role");
const { compaOpr, methodConstant } = require("../../utils/constanta");
const { NotFoundError } = require("../../utils/errors");
const response = require("../../utils/response");

const controller = {};

controller.Index = async (req, res, next) => {
  /* 
    #swagger.tags = ['SYS ACCESS ROLE MODULE']
    #swagger.summary = 'Access Role Module'
    #swagger.description = 'every user has role for access'
  */
  try {
    // search on database
    const result = await SysMasterRoleModel.findAll({
      attributes: ["id", "role_name"],
      include: [
        {
          model: SysAccessRoleModul,
          where: { deleted_at: null },
          attributes: ["role_id", "modul_id"],
          include: [
            {
              model: SysMasterModulModel,
              where: { deleted_at: null },
              attributes: ["modul_name"],
              include: [],
            },
          ],
        },
      ],
    });
    // send success response
    response.MethodResponse(res, methodConstant.GET, result);
  } catch (err) {
    next(err);
  }
};

controller.Create = async (req, res, next) => {
  /* 
    #swagger.tags = ['SYS ACCESS ROLE MODULE']
    #swagger.summary = 'Access Role Module'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new role',
      schema: [{ $ref: '#/definitions/BodyAccessRoleModulSchema' }]
    }
  */
  try {
    // get payload from body
    const payload = req.body;

    const _temp = [];
    payload.map((item) =>
      item.role_access.map((subItem) => _temp.push(subItem.id)),
    );

    for (const everyItem of payload) {
      let result = await SysAccessRoleModul.findAll({
        where: { role_id: everyItem["id"] },
        attributes: ["id"],
        raw: true,
      });
      for (const everyDelItem of result) {
        await SysAccessRoleModul.destroy({ where: { id: everyDelItem["id"] } });
      }
      await SysAccessRoleModul.bulkCreate(everyItem["role_access"]);
    }

    // send success response
    response.MethodResponse(res, methodConstant.POST, null);
  } catch (err) {
    next(err);
  }
};

controller.FindOne = async (req, res, next) => {
  /* 
    #swagger.tags = ['SYS ACCESS ROLE MODULE']
    #swagger.summary = 'Access Role Module'
    #swagger.description = 'every user has role for access'
  */
  try {
    // get uuid form params
    const id = req.params.id;

    const include = globalFunc.JoinsRelation([
      {
        model: SysMasterModulModel,
        include: [],
      },
      {
        model: SysMasterRoleModel,
        include: [],
      },
    ]);

    // search on database with filter
    const result = await SysAccessRoleModul.findOne({ where: { id }, include });

    // when data not found in database send error
    if (!result) throw new NotFoundError(`Data with ID ${id} not found!`)

    // send success response
    response.MethodResponse(res, methodConstant.GET, result);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
