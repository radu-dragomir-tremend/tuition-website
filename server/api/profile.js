const { Router } = require('express');
const Professor = require('../models/Professor');
const Student = require('../models/Student');
const authorize = require('../middleware/authorization');

const router = Router();

router.get('/profile', authorize, async (req, res) => {
  try {
    let user;
    if (req.userInfo.userType === 'student') {
      user = await Student.findById(req.userInfo.id);
    }
    if (req.userInfo.userType === 'professor') {
      user = await Professor.findById(req.userInfo.id);
    }
    if (!user) {
      res.status(404).json('No such user found');
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/profile', authorize, async (req, res) => {
  const {
    email,
    password,
    name,
    availableRemote,
    description,
    yearOfStudy,
    subject,
    city,
    maxNoOfStudents,
  } = req.body;

  try {
    let user;
    if (req.userInfo.userType === 'student') {
      user = await Student.findById(req.userInfo.id);
      user.yearOfStudy = yearOfStudy;
    }
    if (req.userInfo.userType === 'professor') {
      user = await Professor.findById(req.userInfo.id);
      user.subject = subject;
      user.city = city;
      user.maxNoOfStudents = maxNoOfStudents;
    }
    user.name = name;
    user.availableRemote = availableRemote;
    user.description = description;
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
});

module.exports = router;
