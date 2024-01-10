const userDetailsModel = require("../../model/userModel");

const GetAllBookmarks = async (req, res) => {
  const email = req.params.email;
  try {
    // Getting All Bookmarks
    await userDetailsModel.findOne({ email: email }).then((result) => {
      if (result) {
        // Storing Bookmarked Movies and Tv Series
        const bookmarkedContents = {
          bookmarkedMovies: result.bookmarkedMovies,
          bookmarkedTvSeries: result.bookmarkedTVSeries,
        };
        res
          .status(200)
          .json({ statusCode: 200, data: bookmarkedContents, success: "ok" });
      } else {
        res.status(201).json({
          statusCode: 201,
          data: [],
          success: "failed",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ statusCode: 404, msg: error.message });
  }
};

module.exports = GetAllBookmarks;
