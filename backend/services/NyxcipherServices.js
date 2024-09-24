const { NotFoundError, ValidationError, BadRequestError } = require('../utils/errors')
const Nyxcipher = require("../models/Nyxcipher")
const User = require("../models/User")
const { NYXCIPHER_STATUS } = require('../config/constant')

exports.getAllActiveNyxciphers = async () => {
    let active_nyxciphers = await Nyxcipher.find({nyxcipher_status: NYXCIPHER_STATUS.ACTIVE})
        .populate("nyxcipher_item_id")
        .populate("nyxcipher_sponsor")
        .exec()
    if (!active_nyxciphers) throw new NotFoundError('Nyxcipher not found')

    return active_nyxciphers
}

exports.getActiveNyxciphers = async () => {
    let active_nyxciphers = await Nyxcipher.find({nyxcipher_status: NYXCIPHER_STATUS.ACTIVE})
        .populate("nyxcipher_item_id")
        .populate("nyxcipher_sponsor")
        .exec()
    if (!active_nyxciphers) throw new NotFoundError('Nyxcipher not found')

    return active_nyxciphers
}

exports.getOneNyxcipher = async (id) => {  // role & return
    let nyxcipher = await Nyxcipher.findById(id)
        .populate("nyxcipher_item_id")
        .exec()
    if (!nyxcipher) throw new NotFoundError('Nyxcipher not found')

    return nyxcipher
}

exports.getAllNyxciphers = async () => {
    let all_nyxciphers = await Nyxcipher.find({$or: [{nyxcipher_status: NYXCIPHER_STATUS.ACTIVE}, {nyxcipher_status: NYXCIPHER_STATUS.CLOSED}]})
        .populate("nyxcipher_item_id")
        .populate("winning_ticket_id")
        .populate("winner_id")
        .exec()
    if (!all_nyxciphers) throw new NotFoundError('Nyxcipher not found')

    return all_nyxciphers
}

exports.getWinners = async () => {
    let winners = await Nyxcipher.find({nyxcipher_status: NYXCIPHER_STATUS.CLOSED, winner_id: {$ne: null}})
        .populate("nyxcipher_item_id")
        .populate("winner_id")
        .exec()
    if (!winners) throw new NotFoundError('Winner not found')

    return winners
}

exports.getNyxciphers = async (email) => {
    const user = await User.findOne({email: email})
    if (!user) throw new NotFoundError('Account not found')

    let all_nyxciphers = await Nyxcipher.find({nyxcipher_sponsor: user._id})
    if (!all_nyxciphers) throw new NotFoundError('Nyxcipher not found')

    return all_nyxciphers
}

exports.getNyxcipher = async (email, id) => {
    const user = await User.findOne({email: email})
    if (!user) throw new NotFoundError('Account not found')

    const nyxcipher = await Nyxcipher.findOne({_id: id, nyxcipher_sponsor: user._id})
    if (!nyxcipher) throw new NotFoundError('Nyxcipher not found')

    return nyxcipher
}

exports.saveNyxcipher = async (body) => {
    const nyxcipher = new Nyxcipher(body.nyxcipher)

    await nyxcipher.save()
    return nyxcipher
}

exports.updateNyxcipher = async (id, body) => {
    const {nyxcipher_name, nyxcipher_category, nyxcipher_item_id, charity_recipient} = body
    let nyxcipher = await Nyxcipher.findById(id)

    if (!nyxcipher) throw new NotFoundError('Nyxcipher not found')
    let update_nyxcipher = {
        ...nyxcipher._doc,
        nyxcipher_name: nyxcipher_name ? nyxcipher_name : nyxcipher._doc.nyxcipher_name,
        nyxcipher_category: nyxcipher_category ? nyxcipher_category : nyxcipher._doc.nyxcipher_category,
        nyxcipher_item_id: nyxcipher_item_id ? nyxcipher_item_id : nyxcipher._doc.nyxcipher_item_id,
        charity_recipient: charity_recipient ? charity_recipient : nyxcipher._doc.charity_recipient,
    }

    console.log(update_nyxcipher)
    await nyxcipher.updateOne(update_nyxcipher)

    return update_nyxcipher
}

exports.deleteNyxcipher = async (id) => {
    let nyxcipher = await Nyxcipher.findById(id)
    if (!nyxcipher) throw new NotFoundError('Nyxcipher not found')
    await nyxcipher.deleteOne()
	return true
}
