const { NotFoundError, ValidationError, BadRequestError } = require('../utils/errors')
const bcryptjs = require('bcryptjs')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const jwt = require('jsonwebtoken')
const {ROLE, NYXCIPHER_STATUS} = require('../config/constant')

const User = require('../models/User')
const Cart = require('../models/Cart')
const Nyxcipher = require('../models/Nyxcipher')
const Item = require('../models/Item')
const Ticket = require('../models/Ticket')

const JWT_KEY = "jwtactive987"

// ----------------- Customers ------------------ //
exports.getNyxciphers = async (email) => {
    const user = await User.findOne({email: email})
        .populate({
            path: "cart_entry",
            populate: [{
                path: "nyxcipher_id",
                model: "Nyxcipher",
                populate: {
                    path: "nyxcipher_item_id",
                    model: "Item",
                }
            }, {
                path: "ticket_id",
                model: "Ticket",
            }]
        }).exec()

    if (!user) throw new NotFoundError('Account not found')
    if (!user.verified) throw new ValidationError('Account not verify')

    // console.log(user.cart_entry)
	return user.cart_entry
}

exports.getNyxcipher = async (email, id) => {
    let nyxciphers = await this.getNyxciphers(email)
    console.log(nyxciphers)
    if (nyxciphers.length <= 0) return []

    const nyxcipher = nyxciphers.find(id)
    // const nyxcipher = await Nyxcipher.findById(id)
    if (!nyxcipher) throw new NotFoundError('Nyxcipher not found')

	return nyxcipher
}

exports.getActiveNyxciphers = async (email) => {
    const user = await User.findOne({email: email})
    const pipeline = [
        { $match: { buyer_id: user._id } },
        { $group: { _id: "$nyxcipher_id", count: { $sum: 1 } } }
    ];

    let active_nyxciphers = []
    const tickets = await Ticket.aggregate(pipeline)
    console.log(tickets)
    for (let i=0; i<tickets.length; i++) {
        let nyxcipher = await Nyxcipher.findOne({_id: tickets[i]._id.toString(), nyxcipher_status: NYXCIPHER_STATUS.ACTIVE})
            .populate("nyxcipher_item_id")
            .exec()

        console.log(tickets[i]._id.toString(), nyxcipher)
        if (!nyxcipher) continue
        active_nyxciphers = [...active_nyxciphers, nyxcipher]
    }

    return active_nyxciphers
}

exports.getClosedNyxciphers = async (email) => {
    const user = await User.findOne({email: email})
    const pipeline = [
        { $match: { buyer_id: user._id } },
        { $group: { _id: "$nyxcipher_id", count: { $sum: 1 } } }
    ];

    let active_nyxciphers = []
    const tickets = await Ticket.aggregate(pipeline)
    console.log(tickets)
    for (let i=0; i<tickets.length; i++) {
        let nyxcipher = await Nyxcipher.findOne({_id: tickets[i]._id.toString(), nyxcipher_status: NYXCIPHER_STATUS.CLOSED})
            .populate("nyxcipher_item_id")
            .exec()

        console.log(tickets[i]._id.toString(), nyxcipher)
        if (!nyxcipher) continue
        active_nyxciphers = [...active_nyxciphers, nyxcipher]
    }

    return active_nyxciphers
}

exports.getProfile = async (email) => {
	let user = await User.findOne({email: email})
        .populate("cart_entry")
        .exec()

    if (!user) throw new NotFoundError('User not found')
    else if (!user.verified) throw new ValidationError('User not verify')

    for (let i=0; i<user.cart_entry.length; i++) {
        user.cart_entry[i].nyxcipher_item_id = await Item.findOne(user.cart_entry[i].nyxcipher_item_id)
    }

	return user
}

exports.getMyCart = async (cart_entry) => {
    carts = await Cart.find({}).populate([{
        path: "nyxcipher_id",
        model: "Nyxcipher",
        populate: {
            path: "nyxcipher_item_id",
            model: "Item",
        }
    }, {
        path: "ticket_id",
        model: "Ticket",
    }])

	return carts
}

const isExistCart = async ({nyxcipher_id, ticket_count, ticket_price}) => {
    const carts = await Cart.find({nyxcipher_id: nyxcipher_id}).populate("ticket_id").exec()
    console.log("===>", carts)
    for (let i=0; i<carts.length; i++) {
        if ((carts[i].ticket_id.ticket_count == ticket_count) && (carts[i].ticket_id.ticket_price == ticket_price)) {
            return true
        }
    }
    return false
}

exports.addMyCart = async (email, body) => {
    const user = await User.findOne({email: email})
        .populate({
            path: "cart_entry",
            populate: [{
                path: "nyxcipher_id",
                model: "Nyxcipher",
                populate: {
                    path: "nyxcipher_item_id",
                    model: "Item",
                }
            }, {
                path: "ticket_id",
                model: "Ticket",
            }]
        }).exec()

    if (!user) throw new NotFoundError('User not found')
    if (!user.verified) throw new ValidationError('User not verify')

    const nyxcipher = await Nyxcipher.findOne({_id: body.nyxcipher_id, nyxcipher_status: NYXCIPHER_STATUS.ACTIVE})
        .populate('nyxcipher_item_id')
        .exec()
    if (!nyxcipher) throw new ValidationError('Nyxcipher is not active')

    /** in case the ticket for the nyxcipher is existed in ticket table */
    const result = await isExistCart({nyxcipher_id: body.nyxcipher_id, ticket_count: body.ticket_count, ticket_price: body.price})
    if (result) throw new ValidationError('Ticket already exists')

    let ticket = new Ticket({
        ticket_count: body.ticket_count,
        nyxcipher_id: body.nyxcipher_id,
        buyer_id: user._id,
        ticket_price: body.price
    })
    ticket = await ticket.save()

    let cart = new Cart({
        nyxcipher_id: body.nyxcipher_id,
        ticket_id: ticket._id
    })
    cart = await (await cart.save()).populate([{
        path: "nyxcipher_id",
        model: "Nyxcipher",
        populate: {
            path: "nyxcipher_item_id",
            model: "Item",
        }
    }, {
        path: "ticket_id",
        model: "Ticket",
    }])

    user.cart_entry = [...user.cart_entry, cart]
    await user.save()

    // console.log(user.cart_entry)
    return user.cart_entry
}

exports.deleteMyCart = async (email, id) => {
    const user = await User.findOne({email: email})
        .populate("cart_entry")
        .exec()
    if (!user) throw new NotFoundError('Account not found')
    if (!user.cart_entry) throw new NotFoundError('My Cart is empty')

    const result = await User.findOne({email: email, cart_entry: id})
    if (!result) throw new NotFoundError('Cart is not existed')

    user.cart_entry = user.cart_entry.filter(cart => cart._id != id)
    const cart = await Cart.findOne({_id: id})
    await Ticket.deleteMany({_id: cart.ticket_id, nyxcipher_id: cart.nyxcipher_id})
    await cart.delete()

    const update_user = await (await user.save())
        .populate({
            path: "cart_entry",
            populate: [{
                path: "nyxcipher_id",
                model: "Nyxcipher",
                populate: {
                    path: "nyxcipher_item_id",
                    model: "Item",
                }
            }, {
                path: "ticket_id",
                model: "Ticket",
            }]
        })
    const mycarts = update_user.cart_entry

	return mycarts
}

exports.saveProfile = async (header, body) => {
	return true
}

exports.updateProfile = async (self, body) => {
    const {email, username, phone_number, address} = body
    let user = await User.findOne({email: self})

    if (!user) throw new NotFoundError('Account not found')
    let update_user = {
        ...user._doc,
        email: email ? email : user._doc.email,
        username: username ? username : user._doc.username,
        phone_number: phone_number ? phone_number : user._doc.phone_number,
        address: address ? address : user._doc.address,
    }

    console.log(update_user)
    await user.updateOne(update_user)

    return update_user
}

exports.deleteProfile = async (user) => {
	return true
}

// ----------------- Owner ------------------ //
exports.saveSponsor = async (header, body) => {
    console.log(body)
    let {username, email, password} = body.sponsor

    if (await User.exists({ email: email }))
        throw new BadRequestError('Account already exist.')

    let hashedPass = await bcryptjs.hash(password, 10)

	let sponsor = new User({
		username: username,
		password: hashedPass,
		email: email,
        role: ROLE.SPONSOR,
	})

    await sponsor.save()

    const oauth2Client = new OAuth2(
        "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
        "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    );

    oauth2Client.setCredentials({
        refresh_token: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w"
    });
    const accessToken = oauth2Client.getAccessToken()

    const token = jwt.sign({ username, email, password, role: ROLE.SPONSOR }, JWT_KEY, { expiresIn: '24h' });
    const CLIENT_URL = 'http://' + header.host;

    console.log(token, CLIENT_URL)
    const output = `
    <h2>Please click on below link to activate your account</h2>
    <a href=${CLIENT_URL}/auth/verify/${token}>Verify Email</a>
    <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
    `;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: "nodejsa@gmail.com",
            clientId: "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
            clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
            refreshToken: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
            accessToken: accessToken
        },
    });

    // send mail with defined transport object
    const mailOptions = {
        from: '<nodejsa@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Account Verification: OASIS Nyxcipher Auth", // Subject line
        generateTextFromHTML: true,
        html: output, // html body
    };

    await transporter.sendMail(mailOptions)

	return sponsor
}

exports.updatePerson = async (id, body) => {
    const {username, role, phone_number, address, cart_entry} = body
    let person = await User.findById(id)
    let update_person = {
        ...person._doc,
        username: username?username:person._doc.username,
        role: role?role:person._doc.role,
        phone_number: phone_number?phone_number:person._doc.phone_number,
        address: address?address:person._doc.address,
        cart_entry: cart_entry?cart_entry:person._doc.cart_entry
    }

    // console.log(update_person)
    await person.updateOne(update_person)

	return update_person
}

exports.deletePerson = async (id) => {
    console.log(id)

    let persons = await User.deleteOne({_id: id})
	return persons
}