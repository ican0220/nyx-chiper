const UserServices = require('../services/UserServices')
const { NotFoundError, ValidationError, BadRequestError } = require('../utils/errors')
const {ROLE} = require('../config/constant')

const User = require('../models/User')

// ----------------- Customers ------------------ //
exports.getNyxciphers = async (req, res) => {
    const nyxciphers = await UserServices.getNyxciphers(req.email)
	res.status(200).json(nyxciphers)
}

exports.getNyxcipher = async (req, res) => {
    const nyxcipher = await UserServices.getNyxcipher(req.email, req.params.id)
	res.status(200).json(nyxcipher)
}

exports.getActiveNyxciphers = async (req, res) => {
    console.log("getActive")
    const nyxciphers = await UserServices.getActiveNyxciphers(req.email)
	res.status(200).json(nyxciphers)
}

exports.getClosedNyxciphers = async (req, res) => {
    const nyxciphers = await UserServices.getClosedNyxciphers(req.email)
	res.status(200).json(nyxciphers)
}

exports.getProfile = async (req, res) => {
    const user = await UserServices.getProfile(req.email)
	res.status(200).json(user)
}

exports.addMyCart = async (req, res) => {
    const carts = await UserServices.addMyCart(req.email, req.body)
	res.status(200).json(carts)
}

exports.deleteMyCart = async (req, res) => {
    const carts = await UserServices.deleteMyCart(req.email, req.params.id)
	res.status(200).json(carts)
}

exports.saveProfile = async (req, res) => {
    // const user = await UserServices.saveProfile(req.)
    res.status(200).json('post respond')
}

exports.updateProfile = async (req, res) => {
    console.log("updatedprofle")
    const user = await UserServices.updateProfile(req.email, req.body)
    res.status(200).json(user)
}

exports.deleteProfile = async (req, res) => {
    // const user = await UserServices.deleteProfile(req.)
    res.status(200).json('del respond')
}


// ----------------- Owner ------------------ //
exports.getCustomers = async (req, res) => {
    const customers = await User.find({"role": ROLE.CUSTOMER})
	res.status(200).json(customers)
}

exports.getSponsors = async (req, res) => {
    const sponsors = await User.find({"role": ROLE.SPONSOR})
	res.status(200).json(sponsors)
}

exports.saveSponsor = async (req, res) => {
    const sponsor = await UserServices.saveSponsor(req.headers, req.body)
    res.status(200).json(sponsor)
}

exports.updatePerson = async (req, res) => {
    const person = await UserServices.updatePerson(req.params.id, req.body)
    res.status(200).json(person)
}

exports.deletePerson = async (req, res) => {
    const persons = await UserServices.deletePerson(req.params.id)
    res.status(200).json(persons)
}