const UserSchema = require("./user");
const RefParameterSchema = require("./sys-ref-parameter");
const MasterRoleSchema = require("./sys-mst-role");
const MasterModulSchema = require("./sys-mst-modul");
const MenuSchema = require("./sys-menu");
const AccessRoleModulSchema = require("./sys-access-roles-moduls");

const GlobalSchema = {
  ...UserSchema,
  ...RefParameterSchema,
  ...MasterRoleSchema,
  ...MasterModulSchema,
  ...MenuSchema,
  ...AccessRoleModulSchema,
};

module.exports = GlobalSchema;
