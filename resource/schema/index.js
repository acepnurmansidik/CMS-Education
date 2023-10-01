const UserSchema = require("./user");
const RefParameterSchema = require("./sys-ref-parameter");

const GlobalSchema = {
  ...UserSchema,
  ...RefParameterSchema,
};

module.exports = GlobalSchema;
