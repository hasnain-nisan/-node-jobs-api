
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 50,
  },  
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide an password"],
    minlength: 6,
  },
});


//hashing password
UserSchema.pre("save", async function() {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
});


//get user data
UserSchema.methods.getUser = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email
  }
}


//generate token
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return token
}

module.exports = mongoose.model('User', UserSchema)