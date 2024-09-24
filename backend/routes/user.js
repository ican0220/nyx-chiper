const express = require('express')
const router = express.Router()
const {ROLE} = require('../config/constant')

const AuthMiddleware = require('../middlewares/Authentication')
const UserController = require('../controllers/UserController')

// customer
router.get('/me', AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), UserController.getProfile)
router.get('/me/nyxcipher/list', AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), UserController.getNyxciphers)
router.get('/me/nyxcipher/:id', AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), UserController.getNyxcipher)
router.get('/me/active/nyxcipher/list', AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), UserController.getActiveNyxciphers)
router.get('/me/closed/nyxcipher/list', AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), UserController.getClosedNyxciphers)
router.post('/me/cart', AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), UserController.addMyCart)
router.delete('/me/cart/:id', AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), UserController.deleteMyCart)

router.post('/me', AuthMiddleware(ROLE.CUSTOMER), UserController.saveProfile)
router.put('/me', AuthMiddleware(ROLE.CUSTOMER), UserController.updateProfile)
router.delete('/me', AuthMiddleware, UserController.deleteProfile)

// owner
router.get('/customers', AuthMiddleware(ROLE.OWNER), UserController.getCustomers)
router.get('/sponsors', AuthMiddleware(ROLE.OWNER), UserController.getSponsors)
router.post('/sponsor', AuthMiddleware(ROLE.OWNER), UserController.saveSponsor)
router.put('/:id', AuthMiddleware(ROLE.OWNER), UserController.updatePerson)
router.delete('/:id', AuthMiddleware(ROLE.OWNER), UserController.deletePerson)

module.exports = router