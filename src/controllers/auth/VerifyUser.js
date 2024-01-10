const jwt = require("jsonwebtoken");

// Verify User
const verifyUser = (req, res) => {
  try {
    // Getting the token from cookie
    const userToken = req.cookies.entertainment_app_token;
    if (!userToken) {
      return res.status(201).json({ statusCode: 400, msg: "You are not logged in" });
    } else {
      // verifying the token
      jwt.verify(userToken, process.env.JWT_KEY, (err, decode) => {
        if (err) {
          return res.status(201).json({ statusCode: 400, msg: "Token is not okay" });
        } else {
          req.email = decode.email;
          return res.status(200).json({
            Status: "Success",
            statusCode: 200,
            email: req.email,
            msg: "User Verified Successfully.",
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ statusCode:500, success: "false", msg: error.message });
  }
};

module.exports = verifyUser;