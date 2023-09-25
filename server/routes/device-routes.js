const Router = require("express");
const router = Router();

const deviceController = require("../controllers/device-controller");

router.get('/all', deviceController.getAll);
router.get('/byId/:id', deviceController.getById);
router.get('/delete/:id', deviceController.deleteDevice);
router.post('/add', deviceController.addDevice);
router.post('/update', deviceController.updateDevice);

module.exports = router;