const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Professor = require('../models/Professor');
const Student = require('../models/Student');

const maxAgeSeconds = 7 * 24 * 60 * 60;
const router = Router();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAgeSeconds,
  });
};

router.post('/register/student', async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.create({ email, password });
    const token = createToken(student._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAgeSeconds * 1000,
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(403).json(error);
  }
});

router.post('/register/professor', async (req, res) => {
  const { email, password } = req.body;
  try {
    const professor = await Professor.create({ email, password });
    const token = createToken(professor._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAgeSeconds * 1000,
    });
    res.status(201).json(professor);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login/student', async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      res.status(404).json('No such user found');
      return;
    }
    const correctPassword = await bcrypt.compare(password, student.password);
    if (!correctPassword) {
      res.status(401).json('Password invalid');
      return;
    }
    const token = createToken(student._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAgeSeconds * 1000,
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login/professor', async (req, res) => {
  const { email, password } = req.body;
  try {
    const professor = await Professor.findOne({ email });
    if (!professor) {
      res.status(404).json('No such user found');
      return;
    }
    const correctPassword = await bcrypt.compare(password, professor.password);
    if (!correctPassword) {
      res.status(401).json('Password invalid');
      return;
    }
    const token = createToken(professor._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAgeSeconds * 1000,
    });
    res.status(200).json(professor);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
