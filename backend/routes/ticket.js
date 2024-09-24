const express = require('express')
const router = express.Router()
const {ROLE} = require('../config/constant')

const AuthMiddleware = require('../middlewares/Authentication')
const TicketController = require('../controllers/TicketController')

// me
router.get('/list', AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), TicketController.getTickets)
router.get('/:id', AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), TicketController.getTicket)
router.get('/list/nyxcipher/:id', AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), TicketController.getTicketsForNyxcipher)
router.post('/', AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), TicketController.saveTicket)
router.put('/:id', AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), TicketController.updateTicket)

// // sponsor
// router.get('/sponsor/list', AuthMiddleware(ROLE.SPONSOR), NyxcipherController.getNyxciphers)
// router.get('/sponsor/:id', AuthMiddleware(ROLE.SPONSOR), NyxcipherController.getNyxcipher)
// router.post('/', AuthMiddleware(ROLE.SPONSOR), NyxcipherController.saveNyxcipher)
// router.put('/:id', AuthMiddleware(ROLE.SPONSOR), NyxcipherController.updateNyxcipher)
// router.delete('/:id', AuthMiddleware(ROLE.SPONSOR), NyxcipherController.deleteNyxcipher)

// // owner
// router.put('/:id/approve', AuthMiddleware(ROLE.OWNER), NyxcipherController.approveNyxcipher)
// router.put('/:id/cancel', AuthMiddleware(ROLE.OWNER), NyxcipherController.cancelNyxcipher)
// router.put('/:id/winner', AuthMiddleware(ROLE.OWNER), NyxcipherController.drawWinnerNyxcipher)

module.exports = router;