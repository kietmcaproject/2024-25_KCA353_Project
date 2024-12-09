const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.signedCookies.jwtoken);
  // const {
  //   body: { token },
  // } = req.body;
  // console.log(req.headers);
  const token = req.headers["authorization"]?.split(" ")[1];
  // console.log(token);
  // const token = req.body.token;
  // console.log(token);

  if (!token) {
    console.log("no token");

    throw new CustomError.UnauthenticatedError(
      "Invalid Authentication: Check if you logged in."
    );
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    // console.log(req.user);

    next();
  } catch (error) {
    console.log(error);

    throw new CustomError.UnauthenticatedError("Invalid Authentication...");
  }
};

const authorizePermission = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user.role);

    if (!roles.includes(req.user.role)) {
      // console.log("check error");

      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this routes"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermission };
