const Router = require("express");
const router = Router();

const monitoringRouter = require('./monitoring-routes');
const userRouter = require('./user-routes');

router.use('/monitoring', monitoringRouter);
router.use('/user', userRouter);

module.exports = router;