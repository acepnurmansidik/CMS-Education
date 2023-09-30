const globalFunc = require("../../helper/global-func");
const { UserModel } = require("../../models/user");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../../utils/errors/index");
const { StatusCodes } = require("http-status-codes");
const response = require("../../utils/response");
const { methodConstant } = require("../../utils/constanta");

const controller = {};
controller.Register = async (req, res, next) => {
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
    payload.password = await globalFunc.hashPassword({ ...payload });
    const result = await UserModel.create(payload);
    return res.status(200).json({ status: 200, result });
  } catch (err) {
    next(err);
  }
};

controller.Login = async (req, res, next) => {
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
    const { email, password } = req.body;
    // check body
    if (!email || !password)
      throw new BadRequestError("Credentials is invalid");
    // get data from databse by email
    const result = await UserModel.findOne({ where: { email } });

    // compare password from input with saving database
    const isMatch = await globalFunc.verifyPassword({
      hashPassword: result.password,
      password,
    });
    // send error password no match
    if (!isMatch)throw new BadRequestError("Credentials is invalid");

    // create JWT token for response

    response.MethodResponse(res, methodConstant.POST, result);
  } catch (err) {
    next(err)
  }
};

module.exports = controller;
