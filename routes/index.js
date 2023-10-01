const express = require("express");
const router = express.Router();
const userRouter = require("../resource/app/auth/router");
const refParamRouter = require("../resource/app/sys-ref-parameter/router");

router.use(`/`, userRouter);
router.use(`/ref-param`, refParamRouter);

module.exports = router;
