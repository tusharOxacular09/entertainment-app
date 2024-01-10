import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { FaSatellite } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import SearchResult from "../search-result/SearchResult";

const TvSeriesPage = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const [tvseries, setTvseries] = useState([]);

  const navigate = useNavigate();
  const handleChange = async (e) => {
    setSearchedValue(e.target.value);
    await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=e650044c91bcc2bdcaae705c6157424c&query=${searchedValue}`
    )
      .then((res) => res.json())
      .then((data) => setSearchedMovieList(data.results));
    setOpenSearchResult(true);
  };

  useEffect(() => {
    // IIFE for getting Tvseries
    (async function () {
      await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=e650044c91bcc2bdcaae705c6157424c"
      )
        .then((res) => res.json())
        .then((data) => setTvseries(data.results));
    })();
  }, []);

  // Bookmark TV series
  const Bookmarkserials = async (movie) => {
    const email = JSON.parse(localStorage.getItem("userEmail"));
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
            BookmarkMovie={Bookmarkserials}
            isBookmarkedPage={false}
            type="tv_series"
          />
        ) : (
          <div className="text-white mt-4 max-sm:mt-2">
            <div className=" mt-4 max-sm:mt-2">
              <p className="text-2xl max-sm:text-lg max-lg:text-xl font-medium">
                TV Seriese
              </p>
              <div className="mt-4 max-sm:mt-2 grid lg:grid-cols-5 lg:gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:gap-2 max-lg:gap-6">
                {tvseries.map((serials, index) => {
                  if (serials.backdrop_path) {
                    return (
                      <div key={index} className="relative text-white">
                        <div
                          onClick={() => Bookmarkserials(serials)}
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
                              state: { ...serials, bookmarked: false },
                            });
                          }}
                          className="cursor-pointer lg:rounded-lg max-lg:rounded-md max-sm:rounded hover:opacity-70"
                          src={`https://image.tmdb.org/t/p/original/${serials.backdrop_path}`}
                          alt=""
                        />
                        <div className="flex items-center max-md:gap-1 max-lg:gap-1.5 lg:gap-2 max-sm:gap-0.5 max-sm:text-xs text-gray-300 max-lg:text-sm lg:text-base max-sm:mt-0.5 mt-1">
                          <p>{serials.origin_country[0]}</p>
                          <div className="flex items-center">
                            <FaSatellite />
                            <p>TV</p>
                          </div>
                          <p className="font-medium">
                            {serials.original_language}
                          </p>
                        </div>
                        <p className="max-sm:text-xs max-md:text-sm max-lg:text-lg font-medium">
                          {serials.original_name}
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

export default TvSeriesPage;
