const Router = require("express");
const router = Router();

const monitoringRouter = require('./monitoring-routes');
const userRouter = require('./user-routes');
const playersRouter = require('./players-routes');
const deviceRouter = require('./device-routes');
const sessionRouter = require('./session-routes');

router.use('/monitoring', monitoringRouter);
router.use('/user', userRouter);
router.use('/players', playersRouter);
router.use('/devices', deviceRouter);
router.use('/sessions', sessionRouter);

module.exports = router;