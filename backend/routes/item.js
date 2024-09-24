const express = require('express');
const router = express.Router();
const {ROLE} = require("../config/constant")

const AuthMiddleware = require('../middlewares/Authentication');
const ItemController = require('../controllers/ItemController')

// sponsor & admin
router.get('/list', AuthMiddleware(ROLE.SPONSOR), ItemController.getItems);
router.get('/:id', AuthMiddleware(ROLE.SPONSOR), ItemController.getItem);
router.post('/', AuthMiddleware(ROLE.SPONSOR), ItemController.saveItem);
router.put('/:id', AuthMiddleware(ROLE.SPONSOR), ItemController.updateItem);
router.delete('/:id', AuthMiddleware(ROLE.SPONSOR), ItemController.deleteItem);

module.exports = router;