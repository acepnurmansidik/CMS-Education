const express = require("express");
const router = express.Router();
const userRouter = require("../resource/app/auth/router");
const refParamRouter = require("../resource/app/sys-ref-parameter/router");
const masterRoleRouter = require("../resource/app/sys-mst-role/router");

router.use(`/`, userRouter);
router.use(`/ref-param`, refParamRouter);
router.use(`/master-role`, masterRoleRouter);

module.exports = router;
