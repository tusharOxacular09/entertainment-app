const bcrypt = require("bcrypt");
const saltRounds = 10;
const userDetailsModel = require("../../model/userModel");

const SignUp = (req, res) => {
  const { email, password } = req.body;
  try {
    // encrypting the password
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res
          .status(400)
          .json({ statusCode: 400, msg: "Error for hashing password" });
      }
      const HashedUserData = { email: email, password: hash };
      // Storing user details with Hashed Password
      const newUser = await new userDetailsModel(HashedUserData);
      await newUser
        .save()
        .then((result) => {
          if (result) {
            return res.status(200).json({
              statusCode: 200,
              msg: "Thank you for registering with us. Your account has been successfully created.",
            });
          }
        })
        .catch((err) =>
          res.status(400).json({ statusCode: 400, msg: err.message })
        );
    });
  } catch (error) {
    return res.status(400).json({ statusCode: 400, msg: error.message });
  }
};

module.exports = SignUp;
