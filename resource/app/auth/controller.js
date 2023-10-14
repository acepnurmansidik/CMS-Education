const { globalFunc } = require("../../helper/global-func");
const { UserModel } = require("../../models/user-auth");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../../utils/errors/index");
const response = require("../../utils/response");
const { methodConstant } = require("../../utils/constanta");
const { SysMasterUserModel } = require("../../models/sys-mst-user");
const { SysUserRolesModul } = require("../../models/sys-user-roles");
const service = require("./service");
const DBConn = require("../../../db");
const { DateTime } = require("luxon");
const { timeZone } = require("../../utils/config");
const { SysMasterRoleModel } = require("../../models/sys-mst-role");
const { SysAccessRoleModul } = require("../../models/sys-access-roles-moduls");
const { Op } = require("sequelize");
const { SysMasterModulModel } = require("../../models/sys-mst-modul");

const controller = {};
controller.Register = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'role user'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['register'] = {
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
          otp_expired: DateTime.now().plus({ minute: 10 }).setZone(timeZone),
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

    response.MethodResponse(res, methodConstant.POST, null);
  } catch (err) {
    next(err);
  }
};

controller.Login = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'role user'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['login'] = {
      in: 'body',
      description: 'Create role',
      schema: { $ref: '#/definitions/BodyUserLoginSchema' }
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
      attributes: ["password", "email", "active", "mst_user_id"],
      include: {
        model: SysMasterUserModel,
        attributes: ["fullname", "role_status", "unique_number"],
        raw: true,
      },
    });

    let payload = { profile: { ...data.dataValues } };
    delete payload.profile.sys_mst_user;
    payload.profile = {
      ...payload.profile,
      ...data.dataValues.sys_mst_user.dataValues,
    };

    // compare password from input with saving database
    const isMatch = await bcrypt.compare(password, data.password);
    // send error password no match
    if (!isMatch) throw new BadRequestError("Credentials is invalid");

    // send error password no match
    if (!data.active)
      throw new BadRequestError("Your account has not been activated!");

    // get use role
    const roles = await SysUserRolesModul.findAll({
      where: { user_id: data.dataValues.mst_user_id },
      attributes: ["role_id"],
      include: {
        model: SysMasterRoleModel,
        attributes: ["role_name"],
      },
      raw: true,
    });

    const _tempRoleID = [];
    const _tempRole = [];
    for (const everyRole of roles) {
      _tempRoleID.push(everyRole.role_id);
      _tempRole.push({
        id: everyRole.role_id,
        role_name: everyRole["sys_mst_role.role_name"],
      });
    }

    const moduls = await SysAccessRoleModul.findAll({
      where: {
        role_id: {
          [Op.in]: _tempRoleID,
        },
      },
      include: [
        {
          model: SysMasterModulModel,
          attributes: ["modul_name"],
        },
        {
          model: SysMasterRoleModel,
          attributes: ["role_name"],
        },
      ],
    });

    const _tempModul = [];
    for (const everyModul of moduls) {
      _tempModul.push({
        role_id: everyModul.role_id,
        role_name: everyModul.dataValues.sys_mst_role.dataValues.role_name,
        modul_id: everyModul.modul_id,
        modul_name: everyModul.dataValues.sys_mst_modul.dataValues.modul_name,
      });
    }

    payload.role_access = _tempRole;
    payload.modul_access = _tempModul;

    // create JWT token for response
    const result = await globalFunc.generateJwtToken(payload);

    response.MethodResponse(res, methodConstant.GET, result);
  } catch (err) {
    next(err);
  }
};

controller.Activation = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'role user'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['active'] = {
      in: 'body',
      description: 'Create role',
      schema: { $ref: '#/definitions/BodyActivationUserSchema' }
    }
  */
  try {
    // get email and otp number from body
    const { email, otp } = req.body;
    // search data on databse
    const result = await UserModel.findOne({ where: { email }, raw: true });

    // check OTP number expired date
    if (DateTime.local(result.otp_expired).setZone(timeZone).diffNow().isValid)
      throw new BadRequestError("OTP number has expired!");

    if (result.active)
      // when account ha active send error message
      throw new BadRequestError("Your account is active!");

    // compare otp code, send error message when otp number not same
    if (result.otp != otp)
      throw new BadRequestError("Wrong OTP number, please check your email");

    // active account
    // await UserModel.update({ active: true }, { where: { id: result.id } });
    return res.status(201).json({
      code: 201,
      status: true,
      message: "Account has active",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

controller.SendOTPActivation = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'role user'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['active'] = {
      in: 'body',
      description: 'Create role',
      schema: { $ref: '#/definitions/BodySendOTPActivationUserSchema' }
    }
  */
  try {
    // get email and otp number from body
    const { email } = req.body;
    // search data on databse
    const result = await UserModel.findOne({ where: { email }, raw: true });

    // create OTP Number
    const OTPNumber = String(Math.random() * 1000000).split(".")[0];

    // // send OTP number to EMAIL
    // await globalFunc.sendEmail({
    //   template: "OTP",
    //   payload: OTPNumber,
    //   receive: "acepnurmansidik@gmail.com",
    //   subject: "Activate account",
    // });

    // send otp activation again
    await UserModel.update(
      {
        otp: OTPNumber,
        otp_expired: DateTime.now().plus({ minute: 10 }).setZone(timeZone),
      },
      { where: { id: result.id } },
    );
    return res.status(201).json({
      code: 201,
      status: true,
      message: "OTP activation has been send your email!",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

controller.ForgotPassword = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'role user'
    #swagger.description = 'every user has role for access'
    #swagger.parameters['active'] = {
      in: 'body',
      description: 'Create role',
      schema: { $ref: '#/definitions/BodyRecoveryPasswordUserSchema' }
    }
  */
  try {
    // get email and otp number from body
    let { email, otp, password, confirmPassword } = req.body;
    // search data on databse
    const result = await UserModel.findOne({ where: { email }, raw: true });

    // check OTP number expired date
    if (DateTime.local(result.otp_expired).setZone(timeZone).diffNow().isValid)
      throw new BadRequestError("OTP number has expired!");

    // compare otp code, send error message when otp number not same
    if (result.otp != otp)
      throw new BadRequestError("Wrong OTP number, please check your email");

    // check password no match
    if (password != confirmPassword)
      throw new BadRequestError(
        "The password you entered is different from the previous one!",
      );

    // hasing password
    password = await bcrypt.hash(password, 12);

    // update to database
    await UserModel.update(
      {
        password,
      },
      { where: { id: result.id } },
    );
    return res.status(201).json({
      code: 201,
      status: true,
      message: "Successfuly change password!",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
