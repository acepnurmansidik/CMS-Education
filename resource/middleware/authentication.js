const { Op } = require("sequelize");
const { verifyJwtToken } = require("../helper/global-func");
const { SysAccessRoleModul } = require("../models/sys-access-roles-moduls");
const { SysMasterModulModel } = require("../models/sys-mst-modul");
const { SysMasterRoleModel } = require("../models/sys-mst-role");
const { SysUserRolesModul } = require("../models/sys-user-roles");
const { UserModel } = require("../models/user-auth");
const { UnauthenticatedError, BadRequestError } = require("../utils/errors");
const NotFound = require("../utils/errors/not-found");

const AuthorizeUserLogin = async (req, res, next) => {
  try {
    // get JWT token from header
    const authHeader =
      req.headers?.authorization?.split(" ")[
        req.headers.authorization.split(" ").length - 1
      ];

    // send error Token not found
    if (!authHeader || !req.headers.authorization)
      throw new UnauthenticatedError("Invalid credentials!");

    // verify JWT token
    const dataValid = await verifyJwtToken(authHeader, next);

    // check email is register on database
    const verifyData = await UserModel.findOne({
      where: { email: dataValid.profile.email },
    });

    // send error not found, if data not register
    if (!verifyData) throw new NotFound("Data not register!");

    // impliment login user
    delete dataValid.iat;
    delete dataValid.exp;
    delete dataValid.jti;

    req.login = { ...dataValid };
    // next to controller
    next();
  } catch (err) {
    next(err);
  }
};

const AuthorizeRoleAccess = async (req, res, next) => {
  try {
    // Role Access
    let RoleAccess = await SysUserRolesModul.findAll({
      where: { user_id: req.login.profile.id },
      attributes: ["role_id"],
      include: {
        model: SysMasterRoleModel,
        attributes: ["role_name", "id"],
      },
    });

    const _tempRoleID = [];
    RoleAccess = RoleAccess.map((everyRole) => {
      _tempRoleID.push(everyRole["sys_mst_role"]["id"]);
      return everyRole["sys_mst_role"]["role_name"];
    });

    // Module Access
    const role_access = req.login.role_access.split(",");
    for (const every_role of role_access) {
      if (!RoleAccess.includes(every_role)) {
        throw new BadRequestError("You do not have access rights!");
      }
    }

    let ModulAccess = await SysAccessRoleModul.findAll({
      where: {
        role_id: {
          [Op.in]: _tempRoleID,
        },
      },
      attributes: ["modul_id"],
      include: [
        {
          model: SysMasterModulModel,
          attributes: ["modul_name"],
        },
      ],
    });
    ModulAccess = ModulAccess.map(
      (everyRole) => everyRole["sys_mst_modul"]["modul_name"],
    );

    const module_access = req.login.modul_access.split(",");
    for (const every_module of module_access) {
      if (!ModulAccess.includes(every_module)) {
        throw new BadRequestError("You do not have access rights!");
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { AuthorizeUserLogin, AuthorizeRoleAccess };
