const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'No token found!',
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: 'Token not valid!',
        });
      }

      console.log('Inside token:' + user._id);

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'You are not authorized',
    });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  console.log('Param sent:' + req.params.id);
  verifyToken(req, res, () => {
    if (req.user._id === req.params.id) {
      next();
    } else {
      return res.status(403).json({
        status: false,
        error: 'Unauthorized, Access Denied!',
      });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
};
