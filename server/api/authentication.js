const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Professor = require('../models/Professor');
const Student = require('../models/Student');
const authorize = require('../middleware/authorization');

const maxAgeSeconds = 7 * 24 * 60 * 60;
const router = Router();

const createToken = (id, userType) => {
  return jwt.sign({ id, userType }, process.env.JWT_SECRET, {
    expiresIn: maxAgeSeconds,
  });
};

router.post('/register', async (req, res) => {
  const { userType, email, password } = req.body;
  try {
    let user;
    if (userType === 'student') {
      user = await Student.create({ email, password, name: 'Name', availableRemote: false });
    }
    if (userType === 'professor') {
      user = await Professor.create({
        email,
        password,
        name: 'Name',
        availableRemote: false,
        subject: 'Subject',
        city: 'City',
      });
    }
    const token = createToken(user._id, userType);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAgeSeconds * 1000,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/login', async (req, res) => {
  const { userType, email, password } = req.body;
  try {
    let user;
    if (userType === 'student') {
      user = await Student.findOne({ email });
    }
    if (userType === 'professor') {
      user = await Professor.findOne({ email });
    }
    if (!user) {
      res.status(404).json('No such user found');
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json('Password invalid');
      return;
    }
    const token = createToken(user._id, userType);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAgeSeconds * 1000,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/isauth', authorize, async (req, res) => {
  try {
    res.status(200).json('AUTHORIZED');
  } catch (error) {
    res.status(403).json(error);
  }
});

module.exports = router;
