const express = require("express");
const router = express.Router();
const userRouter = require("../resource/app/auth/router");

router.use(`/`, userRouter);

module.exports = router;
