const Router = require("express");
const router = Router();
const monitoringController = require('../controllers/monitoring-controller');

router.post('/add', monitoringController.addRecord);
router.get('/all', monitoringController.allMonitoring);
router.get('/greater/:id', monitoringController.monitoringDataById);
router.get('/maxId', monitoringController.getMaxId);
router.get('/last3s', monitoringController.getDataForLast3S);
module.exports = router;