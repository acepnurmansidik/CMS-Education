const { UserModel } = require("../../models/user");

const controller = {};
controller.Create = async (req, res, next) => {
  try {
    const result = await UserModel.create({
      email: "acep@gmail.com",
      password: "Technical Lead JavaScript",
    });
    return res.status(200).json({ status: 200, result });
  } catch (error) {
    console.log(error);
  }
};

module.exports = controller;
