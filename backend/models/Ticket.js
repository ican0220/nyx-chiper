const mongoose = require('mongoose');

//------------ Ticket Schema ------------//
const TicketSchema = new mongoose.Schema({
  nyxcipher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Nyxcipher' },
  buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  payment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  ticket_count: {type: Number, default: 0},
  ticket_price: {type: Number, default: 0},
  winning_ticket: {type: Boolean, default: false},
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;