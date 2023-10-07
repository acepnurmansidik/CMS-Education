const UserSchema = require("./user");
const RefParameterSchema = require("./sys-ref-parameter");
const MasterRoleSchema = require("./sys-mst-role");
const MasterModulSchema = require("./sys-mst-modul");

const GlobalSchema = {
  ...UserSchema,
  ...RefParameterSchema,
  ...MasterRoleSchema,
  ...MasterModulSchema
};

module.exports = GlobalSchema;
