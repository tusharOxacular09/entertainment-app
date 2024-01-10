const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDetailsModel = require("../../model/userModel");

const Login = async (req, res) => {
  const userData = req.body;
  try {
    // Getting the user from the database
    const userFromDB = await userDetailsModel.findOne({
      email: userData.email,
    });
    if (userFromDB !== null) {
      // comparing the password
      await bcrypt.compare(
        `${userData["password"]}`,
        userFromDB["password"],
        (error, response) => {
          if (error) {
            console.log(error);
            return res
              .status(400)
              .json({ statusCode: 400, msg: "Error in Logging the user." });
          } else if (response) {
            // creating session and token
            const userEmail = userFromDB["email"];
            const token = jwt.sign({ email: userEmail }, process.env.JWT_KEY, {
              expiresIn: "2h",
            });

            // setting up the cookie
            res
              .status(200)
              .cookie("entertainment_app_token", token, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
              })
              .json({ statusCode: 200, msg: "User LoggedIn Successfully.." });
          } else {
            return res
              .status(201)
              .send({ statusCode: 400, msg: "Password Didn't match." });
          }
        }
      );
    } else {
      return res
        .status(201)
        .json({ statusCode: 400, msg: "The User is not exists." });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};

module.exports = Login;
