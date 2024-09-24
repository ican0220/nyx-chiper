const mongoose = require('mongoose');

//------------ Payment Schema ------------//
const PaymentSchema = new mongoose.Schema({
  buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  nyxcipher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Nyxcipher' }, // nyxciphers joined with phurchased tickets
  ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }, // phurchased tickets
  assigned_numbers: {type: [Number], default: []},
  purchase_date: Date,
  amount_paid: {type: Number, default: 0},
  // payment_confirmation_id: {type: String, required: true},
  payment_processor: {type: String, required: true},
}, { timestamps: true });

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;