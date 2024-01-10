import React from "react";
import { MdLocalMovies } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";

const SearchResult = ({
  setSearchedMovieList,
  searchedMovieList,
  searchedValue,
  BookmarkMovie,
  isBookmarkedPage,
  type,
}) => {
  const navigate = useNavigate();

  // Delete Bookmarked Content
  const DeleteBooking = async (movieId, type) => {
    const email = JSON.parse(localStorage.getItem("userEmail"));
    await fetch(
      `http://localhost:8080/api/user/delete-bookmark/${type}/${email}/${movieId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          toast.success(data.msg);
          setSearchedMovieList(
            searchedMovieList.filter((movie) => movie._id !== movieId)
          );
        } else {
          toast.error(data.msg);
        }
      });
  };
  return (
    <div className="absolute mt-4 max-md:mt-2 pr-6 max-lg:pb-6 max-sm:pr-2 h-5/6 overflow-y-scroll scrollbar-hide overflow-x-hidden">
      <p className="text-white font-semibold lg:text-2xl lg:my-2">
        Found {searchedMovieList.length} results for "{searchedValue || "movie"}
        "
      </p>
      <div className="mt-4 lg:mt-8 grid lg:grid-cols-4 lg:gap-6 xl:gap-8 2xl:gap-10 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:gap-2 max-lg:gap-6">
        {searchedMovieList.map((movie, index) => {
          if (movie.backdrop_path) {
            return (
              <div key={index} className="relative text-white">
                {isBookmarkedPage ? (
                  <div
                    onClick={() => DeleteBooking(movie._id, type)}
                    className="group absolute cursor-pointer z-10 top-2 right-2 max-sm:top-1 max-sm:right-1 max-sm:text-lg sm:text-xl p-1 rounded-full bg-black bg-opacity-50"
                  >
                    <MdDelete />
                    <span className="max-sm:text-xs ml-2 mt-1 max-sm:ml-0 invisible group-hover:visible opacity-0 text-base font-medium group-hover:opacity-100 absolute duration-100 px-3 py-1 rounded-lg bg-[#10141E] text-white">
                      Delete
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => BookmarkMovie(movie)}
                    className="group absolute z-10 top-2 right-2 lg:top-3 lg:right-3 max-sm:text-xl sm:text-2xl p-1 rounded-full bg-black bg-opacity-50 cursor-pointer"
                  >
                    <CiBookmark />
                    <span className="max-sm:text-xs ml-2 mt-1 max-sm:ml-0 invisible group-hover:visible opacity-0 text-base font-medium group-hover:opacity-100 absolute duration-100 px-3 py-1 rounded-lg bg-[#10141E] text-white">
                      Bookmark
                    </span>
                  </div>
                )}

                <img
                  onClick={() => {
                    if (isBookmarkedPage) {
                      navigate("/movie-details", {
                        state: { ...movie, bookmarked: true },
                      });
                    } else {
                      navigate("/movie-details", {
                        state: { ...movie, bookmarked: false },
                      });
                    }
                  }}
                  className="cursor-pointer lg:rounded-lg max-lg:rounded-md max-sm:rounded hover:opacity-70"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt=""
                />
                <div className="flex items-center max-md:gap-1 max-lg:gap-1.5 lg:gap-2 max-sm:gap-0.5 max-sm:text-xs text-gray-300 max-lg:text-sm lg:text-base max-sm:mt-0.5 mt-1">
                  {type === "movie" && <p>{movie.release_date.slice(0, 4)}</p>}
                  {type === "tv_series" && <p>{movie.origin_country[0]}</p>}
                  <div className="flex items-center">
                    <MdLocalMovies />
                    <p>Movie</p>
                  </div>
                  <p className="font-medium">{movie.original_language}</p>
                </div>
                <p className="max-sm:text-xs max-md:text-sm max-lg:text-lg font-medium">
                  {type === "movie" && movie.title}
                  {type === "tv_series" && movie.original_name}
                </p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default SearchResult;
