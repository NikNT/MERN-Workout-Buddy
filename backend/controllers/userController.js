const User = require("../models/UserModel");

// login user

const loginUser = async (req, res) => {
  res.json({
    message: "Login User",
  });
};

// signup user
const signupUser = async (req, res) => {
  res.json({
    message: "Signup User",
  });
};

module.exports = {
  signupUser,
  loginUser,
};
