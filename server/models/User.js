const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  profile: {
    name: String,
    contributors: [{}]
  }
}, { timestamps: true });

/**
 * Helper method for validating user's password.
 */
function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};


const User = mongoose.model('User', userSchema);

module.exports = User;