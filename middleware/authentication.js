const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authMiddleware = async (req, res, next) => {

    //check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            id: payload.id,
            name: payload.name
        }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to this route')
    }

}