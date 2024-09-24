const User = require('../models/User')
const { UnauthorizedError, ForbiddenError, BadRequestError } = require('../utils/errors')
const {ROLE} = require("../config/constant")

const jwt = require('jsonwebtoken')
const JWT_KEY = require("../config/key")

function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

module.exports = (role=null) => {
	return async (req, res, next) => {
		const roles = [ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]

		// console.log(role)
		const token = getTokenFromHeader(req)
		if (!token) throw new BadRequestError('Token is empty!')

		const decode = jwt.decode(token, JWT_KEY)
        if(!decode) throw new UnauthorizedError('Unauthorized')

		if (!roles.includes(decode.role)) throw new ForbiddenError('Access is denied.')
		// console.log(decode.role, role)

		if (typeof role == "string") {
			if (role !== decode.role) throw new ForbiddenError('Access is denied.')
			// console.log(decode.role)
			req.email = decode.email
			return next()
		}

		if (role.length == 2) {
			// console.log("========")
			if (!role.includes(decode.role)) throw new ForbiddenError('Access is denied.')
			req.email = decode.email
			return next()
		}
		// console.log("3 way", decode.role)
		req.email = decode.email
		return next()
	}
}