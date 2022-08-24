const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token == null) return res.json('no token');
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json(err);
    }
    console.log('user', user);
    req.user = user;
    next();
  });
};

module.exports = authorization;
