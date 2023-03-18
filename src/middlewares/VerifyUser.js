const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ message: 'Missing access token' });
  
    jwt.verify(token, 'my_secret_key', (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid access token' });
      req.user = { id: decoded.userId };
      next();
    });
  };
  
  module.exports = verifyUser;