const express = require('express');
const router = express.Router();

const cabinetController = require('../controllers/cabinetController');
//const { authenticator } = require('../middlewares/middlewareCorrAdmin');

// Routes pour la table commentaire
router.get('/', /* authenticator,*/ cabinetController.getAllCabinets);
router.get('/:id', /* authenticator,*/ cabinetController.getCabinet);
router.post('/', /* authenticator,*/ cabinetController.addCabinet);
router.put('/:id', /* authenticator,*/ cabinetController.editCabinet);
router.delete('/:id', /* authenticator,*/ cabinetController.deleteCabinet);
router.get('/moncabinet/:id', cabinetController.getCabinetByOwnerID);

module.exports = router;