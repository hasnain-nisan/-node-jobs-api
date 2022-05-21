
const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')


const register = async (req, res) => {

    // const { name, email, password } = req.body;
    // if (!name || !email || !password) {
    //     throw new BadRequestError("Please provide name, email and password");
    // }

    const user = await User.create({ ...req.body }); 
    res.status(StatusCodes.CREATED).send({
        user: user.getUser(),
        token: user.generateToken()
    });
}


 
const login = async (req, res) => {
    res.send("Login User");
};

module.exports = {
    register,
    login
}