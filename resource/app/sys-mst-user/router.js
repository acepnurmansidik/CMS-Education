const controller = require("./controller");

const router = require("express").Router();

/**
 * @route GET /user-profile
 * @group Users - Operations about users
 * @tag Users
 * @returns {Array.<User>} 200 - An array of users
 * @returns {Error} 500 - Internal server error
 */
router.post("/", controller.Create);
router.put("/:id", controller.Update);
module.exports = router;
