const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// for creating JWT token
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  //   console.log(token);
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

// attach token to cokkie to send as response
const attach_ResTOCookie = ({ res, user }) => {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;
  // console.log(token);
  // res.cookie('jwt-auth-token', token, {
  //   httpOnly: true,
  //   secure:
  // })
};

module.exports = {
  createJWT,
  attach_ResTOCookie,
  isTokenValid,
};
