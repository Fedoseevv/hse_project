const Router = require("express");
const router = Router();
const playersController = require('../controllers/players-controller');

router.post('/add', playersController.addRecord);
router.post('/update', playersController.updateRecord);
router.get('/all', playersController.allRecords);
router.get('/delete/:id', playersController.deleteRecord);
router.get('/get/:id', playersController.getPersonById);

module.exports = router;