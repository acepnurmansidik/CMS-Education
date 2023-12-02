const {
  SysRefParameterModelDefine,
} = require("../models/setting/sys-ref-parameter");

const RefParameterSchema = {
  BodyRefParameterSchema: {
    value: SysRefParameterModelDefine.value,
    type: SysRefParameterModelDefine.type,
    description: SysRefParameterModelDefine.description,
  },
};

module.exports = RefParameterSchema;
