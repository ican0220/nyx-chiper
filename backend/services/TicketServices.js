const { NotFoundError, ValidationError, BadRequestError } = require('../utils/errors')
const Nyxcipher = require("../models/Nyxcipher")
const User = require("../models/User")
const Ticket = require("../models/Ticket")

exports.getTickets = async (email) => {
    const user = await User.findOne({email: email})
    console.log(user)
    if (!user) throw new NotFoundError('Account not found')

    let all_ticekts = await Ticket.find({buyer_id: user._id})
        .populate("nyxcipher_id")
        .populate("buyer_id")
        .populate("payment_id")
        .exec()

    if (!all_ticekts) throw new NotFoundError('Ticket not found')

    return all_ticekts
}

exports.getTicket = async (email, id) => {
    const user = await User.findOne({email: email})
    if (!user) throw new NotFoundError('Account not found')

    const ticket = await Ticket.findOne({_id: id, buyer_id: user._id})
    if (!ticket) throw new NotFoundError('Ticket not found')

    return ticket
}

exports.getTicketsForNyxcipher = async (email, id) => {
    const user = await User.findOne({email: email})
    if (!user) throw new NotFoundError('Account not found')

    let all_ticekts = await Ticket.find({buyer_id: user._id, nyxcipher_id: id})
        .populate("nyxcipher_id")
        .populate("buyer_id")
        .populate("payment_id")
        .exec()

    if (!all_ticekts) throw new NotFoundError('Ticket not found')

    return all_ticekts
}

exports.saveTicket = async (email, body) => {
    const user = await User.findOne({email: email})
    if (!user) throw new NotFoundError('Account not found')

    const ticket = new Ticket(body.ticket)
    ticket.buyer_id = user._id

    await ticket.save()
    return ticket
}

// *** WIP: working func *** //
exports.updateTicket = async (id, body) => {
    const {nyxcipher_id, ticket_count, payment_id, winning_ticket} = body
    let ticket = await Ticket.findById(id)

    if (!ticket) throw new NotFoundError('Ticket not found')
    let update_ticket = {
        ...ticket._doc,
        nyxcipher_id: nyxcipher_id ? nyxcipher_id : ticket._doc.nyxcipher_id,
        ticket_count: ticket_count ? ticket_count : ticket._doc.ticket_count,
        payment_id: payment_id ? payment_id : ticket._doc.payment_id,
        winning_ticket: winning_ticket ? winning_ticket : ticket._doc.winning_ticket,
    }

    console.log(update_ticket)
    await ticket.updateOne(update_ticket)

    return update_ticket
}

exports.deleteTicket = async (id) => {
    let nyxcipher = await Ticket.findById(id)
    if (!nyxcipher) throw new NotFoundError('Ticket not found')
    await nyxcipher.deleteOne()
	return true
}