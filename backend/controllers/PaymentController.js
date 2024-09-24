const { NotFoundError, ValidationError, BadRequestError } = require('../utils/errors')
const PaymentServices = require('../services/PaymentServices')

const User = require('../models/User')
const Payment = require('../models/Payment')

// --------------- Sponsor ---------------- //
exports.getPayments = async (req, res) => {
    const payments = await PaymentServices.getPaymentsHistory(req.email)
    res.status(200).json(payments)
}

exports.getPayment = async (req, res) => {
    const payment = await PaymentServices.getOnePaidPayment(req.email, req.params.id)
	res.status(200).json(payment)
}

exports.savePayment = async (req, res) => {
    const payment = await PaymentServices.savePayment(req.email, req.body)
    res.status(200).json(payment)
}

exports.updatePayment = async (req, res) => {
    const updated_Ticket = await PaymentServices.updateTicket(req.params.id, req.body)
    res.status(200).json(updated_Ticket)
}

exports.deletePayment = async (req, res) => {
    const success = await PaymentServices.deleteTicket(req.params.id)
    if (!success) throw new UnprocessableEntityError('Deleting is failed')
    res.status(200).json('Delete successful.')
}

// --------------- Owner ---------------- //
exports.getPaymentsForNyxcipher = async (req, res) => {
    const save_Ticket = await PaymentServices.approveTicket(req.body)
    res.status(200).json(save_Ticket)
}

exports.cancelPayment = async (req, res) => {
    const updated_Ticket = await PaymentServices.cancelTicket(req)
    res.status(200).json(updated_Ticket)
}
