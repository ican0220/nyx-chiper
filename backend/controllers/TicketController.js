const { NotFoundError, ValidationError, BadRequestError } = require('../utils/errors')
const TicketServices = require('../services/TicketServices')

const User = require('../models/User')
const Ticket = require('../models/Ticket')

// --------------- me ---------------- //
exports.getTickets = async (req, res) => {
    const tickets = await TicketServices.getTickets(req.email)
    res.status(200).json(tickets)
}

exports.getTicket = async (req, res) => {
    const ticket = await TicketServices.getTicket(req.email, req.params.id)
	res.status(200).json(ticket)
}

exports.getTicketsForNyxcipher = async (req, res) => {
    const tickets = await TicketServices.getTicketsForNyxcipher(req.email, req.params.id)
    res.status(200).json(tickets)
}

exports.saveTicket = async (req, res) => {
    const save_ticket = await TicketServices.saveTicket(req.email, req.body)
    res.status(200).json(save_ticket)
}

exports.updateTicket = async (req, res) => {
    const updated_Ticket = await TicketServices.updateTicket(req.params.id, req.body)
    res.status(200).json(updated_Ticket)
}

exports.deleteTicket = async (req, res) => {
    const success = await TicketServices.deleteTicket(req.params.id)
    if (!success) throw new UnprocessableEntityError('Deleting is failed')
    res.status(200).json('Delete successful.')
}

// --------------- Owner ---------------- //
// exports.getTicketsForNyxcipher = async (req, res) => {
//     const save_Ticket = await TicketServices.approveTicket(req.body)
//     res.status(200).json(save_Ticket)
// }

// exports.cancelTicket = async (req, res) => {
//     const updated_Ticket = await TicketServices.cancelTicket(req)
//     res.status(200).json(updated_Ticket)
// }
