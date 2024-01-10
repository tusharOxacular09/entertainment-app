const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Complete User Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookmarkedMovies: [
    {
      title: {
        type: String,
        required: true,
      },
      backdrop_path: {
        type: String,
        required: true,
      },
      poster_path: {
        type: String,
        required: true,
      },
      original_language: {
        type: String,
        required: true,
      },
      release_date: {
        type: String,
        required: true,
      },
    },
  ],
  bookmarkedTVSeries: [
    {
      original_name: {
        type: String,
        required: true,
      },
      backdrop_path: {
        type: String,
        required: true,
      },
      poster_path: {
        type: String,
        required: true,
      },
      original_language: {
        type: String,
        required: true,
      },
      origin_country: [],
    },
  ],
});

// Creating a model
const userDetailsModel = mongoose.model("userDetailsModel", userSchema);

module.exports = userDetailsModel;
