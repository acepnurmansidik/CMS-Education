const { globalFunc } = require("../../helper/global-func");
const { UserModel } = require("../../models/user-auth");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../../utils/errors/index");
const response = require("../../utils/response");
const { methodConstant } = require("../../utils/constanta");
const { SysMasterUserModel } = require("../../models/sys-mst-user");
const service = require("./service");
const DBConn = require("../../../db");

const controller = {};
controller.Register = async (req, res, next) => {
  // /*
  //   #swagger.security = [{
  //     "bearerAuth": []
  //   }]
  // */
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
    const { fullname, date_of_birth, gender_id, ...payload } = req.body;
    // save data user to database
    // create account with transaction
    await DBConn.transaction(async (trx) => {
      const unique_number = await service.GenerateUniqueNUmber({
        role_status: true,
      });
      const dUser = await SysMasterUserModel.create(
        {
          fullname,
          date_of_birth,
          unique_number,
          gender_id,
        },
        { transaction: trx },
      );

      // create OTP Number
      const OTPNumber = String(Math.random() * 1000000).split(".")[0];

      // // send OTP number to EMAIL
      // await globalFunc.sendEmail({
      //   template: "OTP",
      //   payload: OTPNumber,
      //   receive: "acepnurmansidik@gmail.com",
      //   subject: "Activate account",
      // });

      // verify email
      const emailExist = await UserModel.findOne({
        attributes: ["email"],
        where: { email: payload.email },
        raw: true,
      });
      if (emailExist) throw new BadRequestError("Email has register!");

      // hasing password
      const password = await bcrypt.hash(payload.password, 12);
      // create account login
      await UserModel.create(
        {
          ...payload,
          otp: OTPNumber,
          username: fullname,
          mst_user_id: dUser.dataValues.id,
          password,
        },
        { transaction: trx },
      );
    });

    // payload.password = await globalFunc.hashPassword({ ...payload });
    // const result = await UserModel.create(payload);
    return res.status(200).json({ status: 200, mstUser: "" });
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
    const data = await UserModel.findOne({
      where: { email },
      attributes: ["password", "email"],
    });

    // compare password from input with saving database
    const isMatch = await globalFunc.verifyPassword({
      hashPassword: data.password,
      password,
    });
    // send error password no match
    if (!isMatch) throw new BadRequestError("Credentials is invalid");

    // create JWT token for response
    const result = await globalFunc.generateJwtToken(data.toJSON());

    response.MethodResponse(res, methodConstant.GET, result);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
