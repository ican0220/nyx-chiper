const NyxcipherServices = require('../services/NyxcipherServices')
const { NotFoundError, ValidationError, BadRequestError } = require('../utils/errors')

const User = require('../models/User')
const Nyxcipher = require('../models/Nyxcipher')

exports.getAllActiveNyxciphers = async (req, res) => {
    const nyxcipher = await NyxcipherServices.getAllActiveNyxciphers()
    res.status(200).json(nyxcipher)
}

exports.getActiveNyxciphers = async (req, res) => {
    const active_nyxciphers = await NyxcipherServices.getActiveNyxciphers()
    res.status(200).json(active_nyxciphers)
}

exports.getOneNyxcipher = async (req, res) => {
    const nyxcipher = await NyxcipherServices.getOneNyxcipher(req.params.id)
    res.status(200).json(nyxcipher)
}

exports.getAllNyxciphers = async (req, res) => {
    const nyxcipher = await NyxcipherServices.getAllNyxciphers()
    res.status(200).json(nyxcipher)
}

exports.getWinners = async (req, res) => {
    const active_nyxciphers = await NyxcipherServices.getWinners()
    res.status(200).json(active_nyxciphers)
}

// --------------- Sponsor ---------------- //
exports.getNyxciphers = async (req, res) => {
    const all_nyxciphers = await NyxcipherServices.getNyxciphers(req.email)
    res.status(200).json(all_nyxciphers)
}

exports.getNyxcipher = async (req, res) => {
    const nyxcipher = await NyxcipherServices.getNyxcipher(req.email, req.params.id)
	res.status(200).json(nyxcipher)
}

exports.saveNyxcipher = async (req, res) => {
    const save_nyxcipher = await NyxcipherServices.saveNyxcipher(req.body)
    res.status(200).json(save_nyxcipher)
}

exports.updateNyxcipher = async (req, res) => {
    const updated_nyxcipher = await NyxcipherServices.updateNyxcipher(req.params.id, req.body)
    res.status(200).json(updated_nyxcipher)
}

exports.deleteNyxcipher = async (req, res) => {
    const success = await NyxcipherServices.deleteNyxcipher(req.params.id)
    if (!success) throw new UnprocessableEntityError('Deleting is failed')
    res.status(200).json('Delete successful.')
}

// --------------- Owner ---------------- //
exports.approveNyxcipher = async (req, res) => {
    const save_nyxcipher = await NyxcipherServices.approveNyxcipher(req.body)
    res.status(200).json(save_nyxcipher)
}

exports.cancelNyxcipher = async (req, res) => {
    const updated_nyxcipher = await NyxcipherServices.cancelNyxcipher(req)
    res.status(200).json(updated_nyxcipher)
}
