
const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const bcrypt = require('bcryptjs')


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          throw new BadRequestError("Please provide name, email and password");
        }

        //hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const tempUser = {
          name,
          email,
          password: hashedPassword,
        };

        const user = await User.create({ ...tempUser });
        res.status(StatusCodes.CREATED).send(user);
    } catch (error) {
        res.send(error)
    }
}


 
const login = async (req, res) => {
    res.send("Login User");
};

module.exports = {
    register,
    login
}