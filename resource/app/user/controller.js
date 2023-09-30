const { UserModel } = require("../../models/user");

const controller = {};
controller.Create = async (req, res, next) => {
  /* 
    #swagger.tags = ['Master Role']
    #swagger.summary = 'role user'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create role',
      schema: { $ref: '#/definitions/BodyUserSchema' }
    }
  */
  try {
    const payload = req.body;
    const result = await UserModel.create(payload);
    return res.status(200).json({ status: 200, result });
  } catch (error) {
    console.log(error);
  }
};

module.exports = controller;
