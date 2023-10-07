const controller = require("./controller");

const router = require("express").Router();

/**
 * @route GET /master-modul
 * @group Users - Operations about users
 * @tag Users
 * @returns {Array.<User>} 200 - An array of users
 * @returns {Error} 500 - Internal server error
 */
router.get("/", controller.Index);
router.get("/:id", controller.FindOne);
router.post("/", controller.Create);
router.put("/:id", controller.Update);
router.delete("/:id", controller.Delete);

module.exports = router;
