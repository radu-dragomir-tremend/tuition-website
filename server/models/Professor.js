const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const ProfessorSchema = new mongoose.Schema({
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
  subject: {
    type: String,
    required: [true, 'Please enter a subject you want to teach'],
  },
  availableRemote: {
    type: Boolean,
    required: [true, 'Please enter if you are available for remote tutoring'],
  },
  city: {
    type: String,
    required: [true, 'Please enter the city you are based in'],
    maxlength: [50, 'Max length of 50 characters is reached'],
  },
  description: {
    type: String,
    maxlength: [600, 'Max length of 600 characters is reached'],
  },
  maxNoOfStudents: {
    type: Number,
    min: [1, 'Invalid number'],
  },
});

ProfessorSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Professor = mongoose.model('professor', ProfessorSchema);

module.exports = Professor;
