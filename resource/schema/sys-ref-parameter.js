const { SysRefParameterModelDefine } = require("../models/sys-ref-parameter");

const RefParameterSchema = {
  BodyRefParameterSchema: {
    value: SysRefParameterModelDefine.value,
    type: SysRefParameterModelDefine.type,
    description: SysRefParameterModelDefine.description,
  },
};

module.exports = RefParameterSchema;
