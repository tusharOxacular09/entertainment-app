import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import SearchResult from "../search-result/SearchResult";
import { useNavigate } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { MdLocalMovies } from "react-icons/md";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const navigate = useNavigate();

  // maintaing the scrollbar in Left direction.
  const slideLeft = (id) => {
    let slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  // maintaing the scrollbar in Right direction.
  const slideRight = (id) => {
    let slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const handleChange = async (e) => {
    setSearchedValue(e.target.value);
    await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=e650044c91bcc2bdcaae705c6157424c&query=${searchedValue}`
    )
      .then((res) => res.json())
      .then((data) => setSearchedMovieList(data.results));
    setOpenSearchResult(true);
  };

  useEffect(() => {
    // IIFE for getting Trending Movies
    (async function () {
      await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=e650044c91bcc2bdcaae705c6157424c"
      )
        .then((res) => res.json())
        .then((data) => setTrendingMovies(data.results));
    })();

    // IIFE for getting Trending Movies
    (async function () {
      await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=e650044c91bcc2bdcaae705c6157424c"
      )
        .then((res) => res.json())
        .then((data) => setRecommendedMovies(data.results));
    })();
  }, []);

  // Bookmark a movie
  const BookmarkMovie = async (movie) => {
    const email = JSON.parse(localStorage.getItem("userEmail"));
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
  };

  return (
    <div className="max-md:mx-2 pb-6 max-md:pb-2">
      <div>
        <div className="lg:mt-1 flex items-center">
          <button type="submit" className="">
            <IoSearchOutline className="h-5 w-5 lg:h-6 lg:w-6 font-semibold text-gray-200" />
          </button>
          <input
            placeholder="Search for movies"
            name="search-box"
            onChange={handleChange}
            type="text"
            className="block w-full text-gray-200 bg-[#10141E] py-1.5 ml-3 lg:w-1/2 outline-none focus:border-b-2 focus:border-gray-600 duration-100 lg:text-xl"
          />
        </div>
        {openSearchResult ? (
          <SearchResult
            searchedMovieList={searchedMovieList}
            searchedValue={searchedValue}
            BookmarkMovie={BookmarkMovie}
            isBookmarkedPage={false}
            type={"movie"}
          />
        ) : (
          <div className="text-white mt-4 max-sm:mt-2">
            <div>
              <p className="text-2xl max-sm:text-lg max-lg:text-xl font-medium">
                Trending
              </p>
              <div className="relative w-full mt-4 max-sm:mt-2">
                <div className="flex items-center">
                  <MdChevronLeft
                    className="absolute left-1 z-50 cursor-pointer text-white"
                    onClick={() => slideLeft(2)}
                    size={40}
                  />
                  <div
                    id={2}
                    className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                  >
                    {trendingMovies?.map((movie, index) => {
                      return (
                        <div
                          key={index}
                          className={`relative bg-black w-80 max-lg:w-72 h-full max-sm:h-28 max-sm:w-[200px] inline-block cursor-pointer rounded-lg mx-2 max-sm:mx-1`}
                        >
                          <div
                            onClick={() => BookmarkMovie(movie)}
                            className="group absolute z-10 top-2 right-2 lg:top-3 lg:right-3 max-sm:text-xl sm:text-2xl p-1 rounded-full bg-black bg-opacity-50"
                          >
                            <CiBookmark />
                            <span className="max-sm:text-xs ml-2 mt-1 max-sm:ml-0 invisible group-hover:visible opacity-0 text-base font-medium group-hover:opacity-100 absolute duration-100 px-3 py-1 rounded-lg bg-[#10141E] text-white">
                              Bookmark
                            </span>
                          </div>
                          <img
                            onClick={() => {
                              navigate("/movie-details", {
                                state: { ...movie, bookmarked: false },
                              });
                            }}
                            className="bg-cover bg-fixed w-full h-full rounded-lg hover:opacity-80 duration-100"
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                            alt="Poster of the movie"
                          />
                          <div
                            onClick={() => {
                              navigate("/movie-details", {
                                state: { ...movie, bookmarked: false },
                              });
                            }}
                            className="w-full absolute bottom-2 left-2"
                          >
                            <div className="flex items-center max-md:gap-1 max-lg:gap-1.5 lg:gap-2 max-sm:gap-0.5 max-sm:text-xs text-gray-300 font-medium sm:text-sm max-sm:mt-0.5 mt-1">
                              <p>{movie.release_date.slice(0, 4)}</p>
                              <div className="flex items-center">
                                <MdLocalMovies />
                                <p>Movie</p>
                              </div>
                              <p className="font-medium">
                                {movie.original_language}
                              </p>
                            </div>
                            <p className="max-sm:text-xs sm:text-base font-semibold overflow-x-hidden">
                              {movie.title}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <MdChevronRight
                    className="absolute right-1 z-50 cursor-pointer text-white"
                    onClick={() => slideRight(2)}
                    size={40}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 max-sm:mt-2">
              <p className="text-2xl max-sm:text-lg max-lg:text-xl font-medium">
                Recommended for you
              </p>
              <div className="mt-4 lg:mt-8 grid lg:grid-cols-5 lg:gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:gap-2 max-lg:gap-6">
                {recommendedMovies.map((movie, index) => {
                  if (movie.backdrop_path) {
                    return (
                      <div key={index} className="relative text-white">
                        <div
                          onClick={() => BookmarkMovie(movie)}
                          className="group absolute z-10 top-2 right-2 lg:top-3 lg:right-3 max-sm:text-xl sm:text-2xl p-1 rounded-full bg-black bg-opacity-50"
                        >
                          <CiBookmark />
                          <span className="max-sm:text-xs ml-2 mt-1 max-sm:ml-0 invisible group-hover:visible opacity-0 text-base font-medium group-hover:opacity-100 absolute duration-100 px-3 py-1 rounded-lg bg-[#10141E] text-white">
                            Bookmark
                          </span>
                        </div>
                        <img
                          onClick={() => {
                            navigate("/movie-details", {
                              state: { ...movie, bookmarked: false },
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
                          <p className="font-medium">
                            {movie.original_language}
                          </p>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
