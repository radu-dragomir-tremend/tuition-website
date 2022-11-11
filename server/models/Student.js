const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const StudentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Password length must be at least 6 characters'],
  },
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  availableRemote: {
    type: Boolean,
    required: [true, 'Please enter if you are available for remote tutoring'],
  },
  description: {
    type: String,
    maxlength: [600, 'Max length of 600 characters is reached'],
  },
  yearOfStudy: {
    type: Number,
    min: [1, 'Invalid number'],
  },
});

StudentSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;
