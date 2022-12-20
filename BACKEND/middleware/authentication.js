const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  //check HEADER

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SERCRET);

    const user = User.findById(payload.id).select("-password");
    req.user = user;

    req.user = { userId: payload.userId, name: payload.name };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid1");
  }
};
module.exports = auth;
