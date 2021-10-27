const jwt = require('jsonwebtoken');
const { roles } = require('../helpers/roles')
const { redisClient } = require('../config/db')

exports.authenticate = async function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send({ msg: 'No token ,auth denied' });
  }
  try {
    const client = await redisClient();
    client.lrange('expired-tokens', 0, -1, (err, expiredTokens) => {
      if (expiredTokens.includes(token)) return res.status(401).send({ msg: 'token is invalid' });
      const decoded = jwt.verify(token, process.env.jwtSecret);
      req.user = decoded.user;
      req.jwtToken = token;
      next();
    })
  } catch (err) {
    res.status(401).send({ msg: 'token is invalid' });
  }
};

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action"
        });
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}