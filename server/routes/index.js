const Router = require("express");
const router = Router();

const monitoringRouter = require('./monitoring-routes');
const userRouter = require('./user-routes');
const playersRouter = require('./players-routes');

router.use('/monitoring', monitoringRouter);
router.use('/user', userRouter);
router.use('/players', playersRouter);

module.exports = router;