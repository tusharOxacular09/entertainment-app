const UserDetailsModel = require("../../model/userModel");

const DeleteBookmark = async (req, res) => {
  const id = req.params.movie_id;
  const email = req.params.email;
  const type = req.params.type;

  try {
    // Deleting Bookmarked Movie
    if (type === "movie") {
      await UserDetailsModel.updateOne(
        { email: email },
        {
          $pull: { bookmarkedMovies: { _id: id } },
        }
      ).then((result) => {
        if (result.acknowledged) {
          res
            .status(200)
            .json({
              statusCode: 200,
              msg: "Deleted Successfully!",
            });
        } else {
          res
            .status(201)
            .json({
              statusCode: 201,
              msg: "Error while Deletion!",
            });
        }
      });
    }
    // Deleting Bookmarked TV Series
    if (type === "tv_series") {
      await UserDetailsModel.updateOne(
        { email: email },
        {
          $pull: { bookmarkedTVSeries: { _id: id } },
        }
      ).then((result) => {
        if (result.acknowledged) {
          res
            .status(200)
            .json({
              statusCode: 200,
              msg: "Deleted Successfully!",
            });
        } else {
          res
            .status(201)
            .json({
              statusCode: 201,
              msg: "Error while Deletion!",
            });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      msg: error.message,
    });
  }
};

module.exports = DeleteBookmark;
