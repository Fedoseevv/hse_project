const Router = require("express");
const router = Router();
const monitoringController = require('../controllers/monitoring-controller');

router.post('/add', monitoringController.addRecord);
router.get('/all', monitoringController.allMonitoring);
router.get('/greater/:id', monitoringController.monitoringDataById);
router.get('/maxId', monitoringController.getMaxId);
router.get('/last3s/:id', monitoringController.getDataForLast3S);
router.post('/period', monitoringController.getDataByPeriod);
router.get('/lastPos/:id', monitoringController.getLastPosition);
router.get('/positions/all/:id', monitoringController.allPositions);
module.exports = router;