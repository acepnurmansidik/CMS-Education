const express = require("express");
const router = express.Router();
const userRouter = require("../resource/app/auth/router");
const refParamRouter = require("../resource/app/sys-ref-parameter/router");
const masterRoleRouter = require("../resource/app/sys-mst-role/router");
const masterModulRouter = require("../resource/app/sys-mst-modul/route");
const menuRouter = require("../resource/app/sys-menu/router");
const AccessRoleModuleRouter = require("../resource/app/sys-access-roles-moduls/router");
const MasterUserModuleRouter = require("../resource/app/sys-mst-user/router");
const RefMajorModuleRouter = require("../resource/app/sys-ref-major/router");
const UserRolesRouter = require("../resource/app/sys-user-role/router");
const SchooldBuildingsRouter = require("../resource/app/lrn-school-building/router");

router.use(`/`, userRouter);
router.use(`/ref-param`, refParamRouter);
router.use(`/master-role`, masterRoleRouter);
router.use(`/master-modul`, masterModulRouter);
router.use(`/menu`, menuRouter);
router.use(`/access-role-module`, AccessRoleModuleRouter);
router.use(`/user-profile`, MasterUserModuleRouter);
router.use(`/ref-positon`, RefMajorModuleRouter);
router.use(`/user-access`, UserRolesRouter);
router.use(`/building`, SchooldBuildingsRouter);

module.exports = router;
