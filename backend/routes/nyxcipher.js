const express = require('express')
const router = express.Router()
const {ROLE} = require('../config/constant')

const AuthMiddleware = require('../middlewares/Authentication')
const NyxcipherController = require('../controllers/NyxcipherController')

router.get('/all/active/list', NyxcipherController.getAllActiveNyxciphers)   // active nyxciphers

// me
router.get('/active/list', NyxcipherController.getActiveNyxciphers)   // active nyxciphers
router.get('/list', NyxcipherController.getAllNyxciphers)  // active & closed nyxciphers
router.get('/winners/list', NyxcipherController.getWinners)    // winners nyxciphers
router.get('/active/:id', NyxcipherController.getOneNyxcipher)

// sponsor
router.get('/sponsor/list', AuthMiddleware(ROLE.SPONSOR), NyxcipherController.getNyxciphers)  //
router.get('/sponsor/:id', AuthMiddleware(ROLE.SPONSOR), NyxcipherController.getNyxcipher)
router.post('/', AuthMiddleware(ROLE.SPONSOR), NyxcipherController.saveNyxcipher)
router.put('/:id', AuthMiddleware(ROLE.SPONSOR), NyxcipherController.updateNyxcipher)
router.delete('/:id', AuthMiddleware(ROLE.SPONSOR), NyxcipherController.deleteNyxcipher)

// owner
// router.get('/owner/:sponsor_id/list', AuthMiddleware(ROLE.OWNER), NyxcipherController.getSponsorNyxciphers)
// router.get('/owner/:sponsor_id/:nyxcipher_id', AuthMiddleware(ROLE.OWNER), NyxcipherController.getSponsorNyxcipher)
// router.get('/owner/search', AuthMiddleware(ROLE.OWNER), NyxcipherController.getSearchNyxcipher)
router.put('/:id/approve', AuthMiddleware(ROLE.OWNER), NyxcipherController.approveNyxcipher)
router.put('/:id/cancel', AuthMiddleware(ROLE.OWNER), NyxcipherController.cancelNyxcipher)
// router.put('/:id/winner', AuthMiddleware(ROLE.OWNER), NyxcipherController.drawWinnerNyxcipher)

module.exports = router;