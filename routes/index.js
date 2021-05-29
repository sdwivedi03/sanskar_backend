const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const masterRouter = require('./master.route');
const studentRouter = require('./student.route');


router.use('/user', userRouter);
router.use('/master', masterRouter);
router.use('/student', studentRouter);

module.exports = router;