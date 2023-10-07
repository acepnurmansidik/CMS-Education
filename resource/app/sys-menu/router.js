const router = require("express").Router();
const controller = require("./controller");

/**
 * @route GET /menu
 * @group Users - Operations about users
 * @tag Users
 * @returns {Array.<User>} 200 - An array of users
 * @returns {Error} 500 - Internal server error
 */
router.get("/", controller.Index);
router.post("/", controller.Create);

module.exports = router;
