const express = require("express");
const router = express.Router();
const userRouter = require("../resource/app/auth/router");
const refParamRouter = require("../resource/app/sys-ref-parameter/router");
const masterRoleRouter = require("../resource/app/sys-mst-role/router");
const masterModulRouter = require("../resource/app/sys-mst-modul/route");
const menuRouter = require("../resource/app/sys-menu/router");

router.use(`/`, userRouter);
router.use(`/ref-param`, refParamRouter);
router.use(`/master-role`, masterRoleRouter);
router.use(`/master-modul`, masterModulRouter);
router.use(`/menu`, menuRouter);

module.exports = router;
