const express = require("express");
const controller = require("./controller");
const router = express.Router();

/**
 * @route GET /ref-positon
 * @group Users - Operations about users
 * @tag Users
 * @returns {Array.<User>} 200 - An array of users
 * @returns {Error} 500 - Internal server error
 */
router.get("/:id", controller.FindOne);
router.get("/", controller.Index);
router.post("/", controller.Create);
router.put("/:id", controller.Update);
router.delete("/:id", controller.Delete);

module.exports = router;
