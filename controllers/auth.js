
const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')


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
  const { email, password } = req.body;

  if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({email})

  if(!user) {
      throw new UnauthenticatedError('Invalid Credentials')
  }

  const isPasswordMatch = await user.comparePassword(password)
  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  res.status(StatusCodes.OK).send({
    user: user.getUser(),
    token: user.generateToken(),
  });
};

module.exports = {
    register,
    login
}