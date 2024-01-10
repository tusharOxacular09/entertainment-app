import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    repeat_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // Handeling The Input Fields
  const handleChange = (e) => {
    setUserDetails((user_value) => ({
      ...user_value,
      [e.target.name]: e.target.value,
    }));
  };

  // Checking the user's auth status
  const checkUsersAuthStatus = async () => {
    await fetch("https://entertainment-app-server.onrender.com/api/user/verify-user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    checkUsersAuthStatus();
  });

  // Signup the user
  const handelSignUp = async () => {
    if (
      userDetails.email === "" ||
      userDetails.password === "" ||
      userDetails.repeat_password === ""
    ) {
      return toast.error("Please Enter all the feilds", {
        duration: 5000,
      });
    } else if (userDetails.password.length < 8) {
      return toast.error("Password must be at least 8 characters.", {
        duration: 5000,
      });
    } else if (userDetails.password !== userDetails.repeat_password) {
      return toast.error("Password and Repeat Password Didn't match.", {
        duration: 5000,
      });
    } else {
      setIsLoading((prev) => !prev);
      await fetch("https://entertainment-app-server.onrender.com/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading((prev) => !prev);
          if (data.statusCode === 200) {
            toast.success(data.msg);
            navigate("/login");
          } else {
            toast.error(data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative bg-[#161D2F] text-gray-400 px-8 py-8 mx-auto w-full max-w-lg rounded-2xl">
        <MdMovie className="absolute -top-28 max-lg:-top-24 left-0 right-0 mx-auto text-red-500 text-6xl max-lg:text-5xl" />
        <div className="mx-auto flex w-full max-w-md flex-col">
          <div className="font-semibold text-3xl max-lg:text-2xl text-gray-200 mb-8">
            <p>Sign Up</p>
          </div>
          <form>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-4"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  autoComplete="email"
                  className="block w-full text-gray-200 bg-[#161D2F] rounded-md py-1.5 px-3 border border-gray-600 outline-none focus:ring-1 focus:ring-white duration-100"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-4"
              >
                Password{" "}
                <span className="text-xs font-normal text-yellow-500">
                  (At Least 8 characters)
                </span>
              </label>
              <div className="relative mt-2">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  autoComplete="section-blue shipping address-level2"
                  className="block w-full text-gray-200 bg-[#161D2F] rounded-md py-1.5 px-3 border border-gray-600 outline-none focus:ring-1 focus:ring-white duration-100"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="repeat_password"
                className="block text-sm font-medium leading-4"
              >
                Repeat Password
              </label>
              <div className="relative mt-2">
                <input
                  name="repeat_password"
                  type={showRepeatPassword ? "text" : "password"}
                  onChange={handleChange}
                  autoComplete="section-blue shipping address-level2"
                  className="block w-full text-gray-200 bg-[#161D2F] rounded-md py-1.5 px-3 border border-gray-600 outline-none focus:ring-1 focus:ring-white duration-100"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 py-2"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-evenly">
            <button
              onClick={handelSignUp}
              className="flex items-center justify-center w-full rounded-md text-center mt-6 bg-red-500 py-2.5 max-sm:py-2 text-sm max-sm:text-xs font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              <p>Create an account</p>
            </button>
          </div>
          <div className="text-base max-sm:text-xs mt-6 max-sm:mt-4">
            <p className="text-center">
              Already have an account?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
                className="text-red-500 hover:text-red-600 cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
