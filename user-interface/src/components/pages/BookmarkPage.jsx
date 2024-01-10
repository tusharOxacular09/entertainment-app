import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SearchResult from "../search-result/SearchResult";
import { MdLocalMovies } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaSatellite } from "react-icons/fa6";
import { toast } from "react-hot-toast";

const BookmarkPage = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const [searchedContentType, setSearchedContentType] = useState("movie");
  const navigate = useNavigate();
  const [bookmarkedContents, setBookmarkedContents] = useState({});
  const GetBookmarkedMovies = async () => {
    const email = JSON.parse(localStorage.getItem("userEmail"));
    await fetch(
      `https://entertainment-app-server.onrender.com/api/user/get-all-bookmarks/${email}`
    )
      .then((res) => res.json())
      .then((movie) => {
        setBookmarkedContents(movie.data);
      });
  };

  // Getting all the bookmarked contents after the rendering of the page
  useEffect(() => {
    GetBookmarkedMovies();
  }, []);

  const handleChange = async (e) => {
    setSearchedValue(e.target.value);
    setSearchedMovieList([]);
    setOpenSearchResult(true);
  };

  // Deleting Bookmarks
  const DeleteBooking = async (id, type) => {
    const email = JSON.parse(localStorage.getItem("userEmail"));
    await fetch(
      `https://entertainment-app-server.onrender.com/api/user/delete-bookmark/${type}/${email}/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          toast.success(data.msg);
          GetBookmarkedMovies();
        } else {
          toast.error(data.msg);
        }
      });
  };

  useEffect(() => {
    function setSearchedMovies() {
      // edge case
      if (searchedValue.length === 0) {
        return setSearchedMovieList([]);
      }

      // Search bookmarks for Movies
      if (searchedContentType === "movie") {
        bookmarkedContents.bookmarkedMovies.map((movie) => {
          if (
            movie.title.toLowerCase().startsWith(searchedValue.toLowerCase())
          ) {
            return setSearchedMovieList((prev) => [...prev, movie]);
          }
          return null;
        });
      }

      // Search bookmarks for TV series
      if (searchedContentType === "tv_series") {
        bookmarkedContents.bookmarkedTvSeries.map((movie) => {
          if (
            movie.original_name
              .toLowerCase()
              .startsWith(searchedValue.toLowerCase())
          ) {
            return setSearchedMovieList((prev) => [...prev, movie]);
          }
          return null;
        });
      }
    }
    setSearchedMovies();
  }, [searchedValue]);

  return (
    <div className="max-md:mx-2 max-sm:pb-2 pb-6">
      <div>
        <div className="lg:mt-1 flex max-lg:flex-col lg:items-center">
          <div className="flex items-center">
            <button type="submit" className="">
              <IoSearchOutline className="h-5 w-5 lg:h-6 lg:w-6 font-semibold text-gray-200" />
            </button>
            <input
              placeholder="Search for bookmarked content"
              name="search-box"
              onChange={handleChange}
              type="text"
              autoComplete="false"
              className="block w-full lg:w-[400px] text-gray-200 bg-[#10141E] py-1.5 ml-3 outline-none focus:border-b-2 focus:border-gray-600 duration-100 lg:text-xl"
            />
          </div>
          {!openSearchResult && (
            <div className="text-white flex items-center gap-2 max-md:text-xs max-lg:mt-2 max-sm:mt-1">
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="movie"
                  name="type_of_content"
                  defaultChecked="checked"
                  onChange={() => setSearchedContentType("movie")}
                />
                <label htmlFor="movie">Movie</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  id="tv_series"
                  type="radio"
                  name="type_of_content"
                  onChange={() => setSearchedContentType("tv_series")}
                />
                <label htmlFor="tv_series">Tv Series</label>
              </div>
            </div>
          )}
        </div>
        {openSearchResult && (
          <SearchResult
            searchedMovieList={searchedMovieList}
            searchedValue={searchedValue}
            isBookmarkedPage={true}
            setSearchedMovieList={setSearchedMovieList}
            type={searchedContentType}
          />
        )}
      </div>
      {!openSearchResult && (
        <div className="text-white mt-4 max-md:mt-2 pr-6 max-lg:pb-6 max-sm:pr-2 h-5/6">
          <div className="">
            <p className="text-2xl max-sm:text">Bookmarked Movies</p>
            {bookmarkedContents.bookmarkedMovies?.length === 0 && (
              <p className="max-sm:text-xs text-gray-500 max-sm:mt-0.5 mt-1">
                There is no bookmarked Movies.
              </p>
            )}
            <div className="mt-4 lg:mt-8 grid lg:grid-cols-4 2xl:grid-cols-5 lg:gap-6 xl:gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:gap-2 max-lg:gap-6">
              {bookmarkedContents.bookmarkedMovies?.map((movie, index) => {
                if (movie.backdrop_path) {
                  return (
                    <div key={index} className="relative text-white">
                      <div
                        onClick={() => DeleteBooking(movie._id, "movie")}
                        className="group absolute cursor-pointer z-10 top-2 right-2 max-sm:top-1 max-sm:right-1 max-sm:text-lg sm:text-xl p-1 rounded-full bg-black bg-opacity-50"
                      >
                        <MdDelete />
                        <span className="max-sm:text-xs ml-2 mt-1 max-sm:ml-0 invisible group-hover:visible opacity-0 text-base font-medium group-hover:opacity-100 absolute duration-100 px-3 py-1 rounded-lg bg-[#10141E] text-white">
                          Delete
                        </span>
                      </div>
                      <img
                        onClick={() => {
                          navigate("/movie-details", {
                            state: { ...movie, bookmarked: true },
                          });
                        }}
                        className="cursor-pointer lg:rounded-lg max-lg:rounded-md max-sm:rounded hover:opacity-70"
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        alt=""
                      />
                      <div className="flex items-center max-md:gap-1 max-lg:gap-1.5 lg:gap-2 max-sm:gap-0.5 max-sm:text-xs text-gray-300 max-lg:text-sm lg:text-base max-sm:mt-0.5 mt-1">
                        <p>{movie.release_date.slice(0, 4)}</p>
                        <div className="flex items-center">
                          <MdLocalMovies />
                          <p>Movie</p>
                        </div>
                        <p className="font-medium">{movie.original_language}</p>
                      </div>
                      <p className="max-sm:text-xs max-md:text-sm max-lg:text-lg font-medium">
                        {movie.title}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div>
            <p className="text-2xl max-sm:text mt-4 max-sm:mt-2">
              Bookmarked TV Series
            </p>
            {bookmarkedContents.bookmarkedTvSeries?.length === 0 && (
              <p className="max-sm:text-xs text-gray-500 max-sm:mt-0.5 mt-1">
                There is no bookmarked TV Series.
              </p>
            )}
            <div className="mt-4 lg:mt-8 grid lg:grid-cols-4 2xl:grid-cols-5 lg:gap-6 xl:gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:gap-2 max-lg:gap-6">
              {bookmarkedContents.bookmarkedTvSeries?.map((serial, index) => {
                if (serial.backdrop_path) {
                  return (
                    <div key={index} className="relative text-white">
                      <div
                        onClick={() => DeleteBooking(serial._id, "tv_series")}
                        className="group absolute cursor-pointer z-10 top-2 right-2 max-sm:top-1 max-sm:right-1 max-sm:text-lg sm:text-xl p-1 rounded-full bg-black bg-opacity-50"
                      >
                        <MdDelete />
                        <span className="max-sm:text-xs ml-2 mt-1 max-sm:ml-0 invisible group-hover:visible opacity-0 text-base font-medium group-hover:opacity-100 absolute duration-100 px-3 py-1 rounded-lg bg-[#10141E] text-white">
                          Delete
                        </span>
                      </div>
                      <img
                        onClick={() => {
                          navigate("/movie-details", {
                            state: { ...serial, bookmarked: true },
                          });
                        }}
                        className="cursor-pointer lg:rounded-lg max-lg:rounded-md max-sm:rounded hover:opacity-70"
                        src={`https://image.tmdb.org/t/p/original/${serial.backdrop_path}`}
                        alt=""
                      />
                      <div className="flex items-center max-md:gap-1 max-lg:gap-1.5 lg:gap-2 max-sm:gap-0.5 max-sm:text-xs text-gray-300 max-lg:text-sm lg:text-base max-sm:mt-0.5 mt-1">
                        <p>{serial.origin_country[0]}</p>
                        <div className="flex items-center">
                          <FaSatellite />
                          <p>TV</p>
                        </div>
                        <p className="font-medium">
                          {serial.original_language}
                        </p>
                      </div>
                      <p className="max-sm:text-xs max-md:text-sm max-lg:text-lg font-medium">
                        {serial.original_name}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
