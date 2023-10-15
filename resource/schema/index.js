const UserSchema = require("./user-auth");
const RefParameterSchema = require("./sys-ref-parameter");
const MasterRoleSchema = require("./sys-mst-role");
const MasterModulSchema = require("./sys-mst-modul");
const MenuSchema = require("./sys-menu");
const AccessRoleModulSchema = require("./sys-access-roles-moduls");
const MasterUserModulSchema = require("./sys-mst-user");
const RefMajorModulSchema = require("./sys-ref-major");
const UserRolesModulSchema = require("./sys-user-roles");
const SchoolBuildingSchema = require("./lrn-school-building");

const GlobalSchema = {
  ...UserSchema,
  ...RefParameterSchema,
  ...MasterRoleSchema,
  ...MasterModulSchema,
  ...MenuSchema,
  ...AccessRoleModulSchema,
  ...MasterUserModulSchema,
  ...RefMajorModulSchema,
  ...UserRolesModulSchema,
  ...SchoolBuildingSchema,
};

module.exports = GlobalSchema;
