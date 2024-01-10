const express = require("express");
const router = express.Router();
const SignUp = require("../controllers/auth/SignUp");
const Login = require("../controllers/auth/Login");
const Logout = require("../controllers/auth/Logout");
const VerifyUser = require("../controllers/auth/VerifyUser");
const userDetailsModel = require("../model/userModel");
const BookmarkMovie = require("../controllers/movie/Bookmark");
const GetAllBookmarks = require("../controllers/movie/GetAllBookmarks");
const DeleteBookmark = require("../controllers/movie/DeleteBookmark");

// This is a middleware which checks the user is previously exists or not
const checkUserExistance = async (req, res, next) => {
  const { email } = req.body;
  const user = await userDetailsModel.findOne({
    email: email,
  });
  if (user) {
    return res.status(201).json({
      statusCode: 409,
      status: "failed",
      msg: "It seems you already have an account, please log in instead.",
    });
  } else {
    next();
  }
};

// user router
router
  .post("/signup", checkUserExistance, SignUp)
  .post("/login", Login)
  .get("/logout", Logout)
  .get("/verify-user", VerifyUser)
  .post("/bookmark-movie", BookmarkMovie)
  .get("/get-all-bookmarks/:email", GetAllBookmarks)
  .delete("/delete-bookmark/:type/:email/:movie_id", DeleteBookmark);

module.exports = router;
