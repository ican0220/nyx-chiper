const { NotFoundError, ValidationError, BadRequestError } = require('../utils/errors')
const ItemServices = require('../services/ItemServices')

const User = require('../models/User');
const Item = require('../models/Item');
const Nyxcipher = require('../models/Nyxcipher');

exports.getItems = async (req, res) => {
    // console.log("created_nyxcipher", req.email)
    let user = await User.findOne({email: req.email})
    let nyxciphers_created = await Nyxcipher.findById(user._id.str)
    // console.log("created_nyxcipher", user, nyxciphers_created)
    if (!nyxciphers_created) throw new NotFoundError('You are created nyxciphers not found.')
    const items = await ItemServices.getItems(nyxciphers_created)
	res.status(200).json(items)
}

exports.getItem = async (req, res) => {
    const item = await ItemServices.getItem(req.params.id)
	res.status(200).json(item)
}

exports.saveItem = async (req, res) => {
    const item = await ItemServices.saveItem(req.body)
    res.status(200).json(item)
}

exports.updateItem = async (req, res) => {
    const item = await ItemServices.updateItem(req.params.id, req.body)
    res.status(200).json(item)
}

exports.deleteItem = async (req, res) => {
    const success = await ItemServices.deleteItem(req.params.id)
    if (!success) throw new UnprocessableEntityError('Deleting is failed')
    res.status(200).json('Delete successful.')
}
