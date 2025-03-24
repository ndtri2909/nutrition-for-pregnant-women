const jwt = require("jsonwebtoken")

module.exports.generateActiveToken = (payload) => {
  return jwt.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
  })
}

module.exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
  })
}

module.exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
  })
}
module.exports.generateRefreshTokenShortExpiration = (payload) => {
  return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
  })
}

module.exports.generateAuthenticateToken = (payload) => {
  return jwt.sign(payload, `${process.env.AUTHENTICATE_TOKEN_SECRET}`, {
  })
}
