import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-hot-toast";

const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const movie = location.state;

  // Some Comman Casts for Movie Details page
  const commonCasts = [
    "Johnny Depp",
    "Arnold Schwarzenegger",
    "Jim Carrey",
    "Emma Watson",
    "Robert Downey Jr.",
    "Daniel Radcliffe",
    "Chris Evans",
    "Leonardo DiCaprio",
    "Tom Cruise",
    "Brad Pitt",
    "Natalie Portman",
  ];

  const BookmarkMovie = async (movie) => {
    // Getting the user email from local storage
    const email = JSON.parse(localStorage.getItem("userEmail"));

    // Bookmarking Movies
    if (movie.title) {
      await fetch("http://localhost:8080/api/user/bookmark-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          type: "movie",
          movie: movie,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.statusCode === 200) {
            toast.success(data.msg);
          } else {
            toast.error(data.msg);
          }
        });
    }

    // Bookmarking TV series
    if (movie.original_name) {
      await fetch("http://localhost:8080/api/user/bookmark-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          type: "tv_series",
          movie: movie,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.statusCode === 200) {
            toast.success(data.msg);
          } else {
            toast.error(data.msg);
          }
        });
    }
  };

  return (
    <div className="h-full lg:py-8 max-lg:overflow-y-scroll scrollbar-hide max-lg:pb-6">
      <div className="flex  max-lg:flex-col">
        <div className="w-1/3 max-lg:w-full h-fit max-lg:p-8 lg:px-10 flex max-lg:items-center max-lg:justify-center">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            className="w-full max-sm:w-full max-lg:w-1/2 rounded-lg shadow-lg hover:opacity-90 cursor-pointer"
          />
        </div>

        <div className="w-2/3 max-lg:w-full lg:px-12 text-white max-lg:px-8 max-sm:px-4 pb-4">
          <h2 className="max-sm:text-xl max-lg:text-3xl lg:text-4xl font-semibold mb-2">
            {movie.title || movie.original_name}
          </h2>
          <p className="max-sm:text-xs max-lg:text-base lg:text-base text-gray-500 font-medium truncate">
            {movie.overview}
          </p>
          <div className="flex items-center gap-4 max-sm:gap-2 mt-6 max-sm:mt-3">
            <p className="max-sm:text-lg max-lg:text-2xl lg:text-3xl font-medium">
              4.8
            </p>
            <div className="flex max-sm:text-xs">
              <GoStarFill />
              <GoStarFill />
              <GoStarFill />
              <GoStarFill />
              <GoStar />
            </div>
          </div>
          <div className="flex justify-between font-medium max-sm:text-xs mt-3 lg:mt-6">
            <div>
              <p className="text-gray-500">Language</p>
              <p>{movie.original_language}</p>
            </div>
            <div>
              <p className="text-gray-500">First Air</p>
              <p>{movie.release_date}</p>
            </div>
            <div>
              <p className="text-gray-500">Popularity</p>
              <p>{movie.popularity}</p>
            </div>
            <div>
              <p className="text-gray-500">Vote average</p>
              <p>{movie.vote_average}</p>
            </div>
          </div>

          <div className="mt-6 max-sm:mt-3 font-medium">
            <p className="max-sm:text-sm text-xl">Genres</p>
            <div className="flex gap-1 lg:gap-3 max-sm:text-xs mt-1 lg:mt-2">
              <p className="text-black bg-white px-3 py-1 max-sm:px-2 max-sm:py-1 rounded lg:rounded-md">
                Action
              </p>
              <p className="text-black bg-white px-3 py-1 max-sm:px-2 max-sm:py-1 rounded lg:rounded-md">
                Crime
              </p>
              <p className="text-black bg-white px-3 py-1 max-sm:px-2 max-sm:py-1 rounded lg:rounded-md">
                Mistery
              </p>
              <p className="text-black bg-white px-3 py-1 max-sm:px-2 max-sm:py-1 rounded lg:rounded-md">
                Drama
              </p>
            </div>
          </div>

          <div className="mt-6 max-sm:mt-3">
            <p className="max-sm:text-sm text-xl font-medium">Synopsys</p>
            <p className="max-sm:text-xs mt-1 max-sm:mt-0.5">
              {movie.overview ||
                "It is a series of still photographs on film, projected in rapid succession onto a screen by means of light2. A movie synopsis summarizes the film’s storyline, introduces the main characters and the movie’s setting34. Most movies are made so they can be watched at home or on a movie theaters."}
            </p>
          </div>

          <div className="mt-6 max-sm:mt-3 font-medium">
            <p className="max-sm:text-sm text-xl">Casts</p>
            <div className="flex gap-1 lg:gap-3 flex-wrap max-sm:text-xs mt-1 lg:mt-2">
              {commonCasts.map((cast, i) => (
                <p
                  key={i}
                  className="max-sm:border border-2 border-white px-3 py-1 max-sm:px-2 max-sm:py-1 rounded lg:rounded-md"
                >
                  {cast}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-4 lg:mt-6 flex items-center gap-10 max-md:gap-4">
            <div
              className="flex gap-1 items-center font-semibold hover:text-gray-300 duration-150 cursor-pointer"
              onClick={() => {
                navigate("/root/home");
              }}
            >
              <FaArrowLeft />
              <p>back</p>
            </div>
            {!movie.bookmarked && (
              <div
                onClick={() => BookmarkMovie(movie)}
                className="max-sm:border border-2 border-green-400 text-green-400 font-semibold px-3 py-1 max-sm:px-2 max-sm:py-1 rounded lg:rounded-md max-sm:hover:rounded-xl hover:rounded-2xl duration-500 cursor-pointer"
              >
                Bookmark Now
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
