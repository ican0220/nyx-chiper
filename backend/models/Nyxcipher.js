const mongoose = require('mongoose');
const {NEW} = require('../config/constant')

//------------ Nyxcipher Schema ------------//
const NyxcipherSchema = new mongoose.Schema({
  nyxcipher_name: {type: String, required: true},
  nyxcipher_category: {type: String, required: true},
  nyxcipher_approved: {type: Boolean, default: false},
  nyxcipher_status: {type: String, default: NEW},
  nyxcipher_item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  nyxcipher_sponsor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  winning_ticket_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
  winner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  charity_recipient: String,
  donation_collected: Number,
  start_date: Date,
  approved_date: Date,
  close_date: Date,
  cancel_date: Date,
  winner_drawn_date: Date,
}, { timestamps: true });

const Nyxcipher = mongoose.model('Nyxcipher', NyxcipherSchema);

module.exports = Nyxcipher;