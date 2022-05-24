
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

let User = ""

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
    { expiresIn: process.env.JWT_LIFETIME }
  );

  return token
}

//comparte password
UserSchema.methods.comparePassword = async function (formPassword) {
  const isMatch = await bcrypt.compare(formPassword, this.password)
  return isMatch;
}



if (mongoose.models.User) {
  User = mongoose.model("User");
} else {
  User = mongoose.model("User", UserSchema);
}

module.exports = User