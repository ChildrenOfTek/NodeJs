// productsRouter.js

var express = require('express');
var router = express.Router();
var productsController= require('../controllers/productsController');

router.get('/',productsController.fetchAllAction);
router.get('/add',productsController.addAction);
//router.get('/:id(\\d+)',productsController.fetchOneAction);
router.post('/add',productsController.insertAction);
router.get('/:id/delete',productsController.deleteAction);
router.get('/:id/show',productsController.getOneAction);
router.get('/:id/update',productsController.getOneAction);
router.post('/:id/update',productsController.updateAction);

module.exports = router;