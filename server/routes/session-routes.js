const Router = require("express");
const router = Router();

const sessionController = require('../controllers/session-controller');

router.get('/all', sessionController.getAll);
router.get('/byId/:id', sessionController.getById);
router.get('/online/:id', sessionController.onlineSession);
router.post('/start', sessionController.startSession);
router.get('/close/:id', sessionController.closeSession);
router.post('/update', sessionController.updateSession);
router.get('/delete/:id', sessionController.deleteSession);
router.get('/sessionWithDevices/:id', sessionController.sessionWithDevices);
router.post('/totalByDevice', sessionController.totalDataBySessionAndDevice);
router.post('/deviceStat', sessionController.deviceStat);

module.exports = router;