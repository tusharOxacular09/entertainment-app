const userDetailsModel = require("../../model/userModel");

// Bookmark Movie and TV Series
const BookmarkMovie = async (req, res) => {
  const email = req.body.email;
  const type = req.body.type;
  const selectedMovie = req.body.movie;
  try {
    if (type === "movie") {
      // Storing Bookmarked Movies
      await userDetailsModel
        .updateOne(
          { email, email },
          { $push: { bookmarkedMovies: selectedMovie } }
        )
        .then((result) => {
          if (result.acknowledged) {
            res
              .status(200)
              .json({ statusCode: 200, msg: "Movie Bookmarked Successfully" });
          } else {
            res.status(201).json({
              statusCode: 201,
              msg: "Error while bookmarking the movie!",
            });
          }
        });
    } else if (type === "tv_series") {
      // Storing Bookmarked TV Series
      await userDetailsModel
        .updateOne(
          { email, email },
          { $push: { bookmarkedTVSeries: selectedMovie } }
        )
        .then((result) => {
          if (result.acknowledged) {
            res
              .status(200)
              .json({
                statusCode: 200,
                msg: "TV Series Bookmarked Successfully",
              });
          } else {
            res.status(201).json({
              statusCode: 201,
              msg: "Error while bookmarking the TV series!",
            });
          }
        });
    } else {
      res
        .status(201)
        .json({ statusCode: 201, msg: "Please send valid type of Content!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ statusCode: 404, msg: error.message });
  }
};

module.exports = BookmarkMovie;
