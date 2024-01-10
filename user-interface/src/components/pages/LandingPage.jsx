import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LandingPage = () => {
  const navigate = useNavigate();

  const checkUsersAuthStatus = async () => {
    // Verifying the user
    await fetch("http://localhost:8080/api/user/verify-user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          navigate("/root/home");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  // Checking the user is Loggedin or not
  useEffect(() => {
    checkUsersAuthStatus();
  });

  return (
    <div className="flex h-full bg-gradient-to-r from-blue-500 to-purple-500 max-lg:px-2">
      <div className="m-auto text-center text-white">
        <h1 className="text-4xl font-bold mb-6 max-lg:text-3xl max-md:text-2xl max-sm:text-xl">
          EntertainmentHub
        </h1>
        <div className="mb-10">
          <p className="text-lg max-sm:text-sm mb-2">
            Your gateway to endless entertainment and joy!
          </p>
          <p className="text-lg max-sm:text-xs">
            {" "}
            Discover the latest movies, TV shows, and more. Join now and immerse
            yourself in a world of entertainment.
          </p>
        </div>
        <div className="flex justify-center font-semibold">
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 max-sm:py-1.5 max-sm:px-4 rounded mr-4 max-sm:text-xs"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 max-sm:py-1.5 max-sm:px-4 rounded max-sm:text-xs"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
