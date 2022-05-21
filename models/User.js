
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

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

UserSchema.pre("save", async function() {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
});

module.exports = mongoose.model('User', UserSchema)