// authMiddleware.js
// const jwt = require('jsonwebtoken');

// exports.authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).send('Access denied');

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(403).send('Invalid token');
//   }
// };

const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    console.error('Token not provided');
    return res.status(401).send('Access denied. No token provided');
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    req.user = verified; // Attach user info to the request object
    console.log('Authenticated User:', req.user);
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    res.status(403).send('Invalid token');
  }
};

