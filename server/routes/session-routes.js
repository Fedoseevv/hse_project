const Router = require("express");
const router = Router();

const sessionController = require('../controllers/session-controller');

router.get('/all', sessionController.getAll);
router.get('/byId/:id', sessionController.getById);
router.post('/start', sessionController.startSession);
router.get('/close', sessionController.closeSession);

module.exports = router;