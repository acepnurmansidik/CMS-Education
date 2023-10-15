const controller = require("./controller");

const router = require("express").Router();

/**
 * @route GET /building
 * @group Users - Operations about users
 * @tag Users
 * @returns {Array.<User>} 200 - An array of users
 * @returns {Error} 500 - Internal server error
 */
router.get("/", controller.Index);
router.post("/", controller.Create);
router.get("/:id", controller.FindOne);
router.put("/:id", controller.Update);
router.delete("/:id", controller.Delete);

module.exports = router;
