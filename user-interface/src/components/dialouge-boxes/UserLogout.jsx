import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Logout Functionality
const UserLogout = ({ setShowUserDetails }) => {
  const navigate = useNavigate();
  return (
    <p
      onClick={async () => {
        await fetch("https://entertainment-app-server.onrender.com/api/user/logout", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.statusCode === 200) {
              toast.success(data.msg);
              navigate("/");
            } else {
              toast.error("Error In Logging out the user.");
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
        setShowUserDetails(false);
      }}
      className="absolute lg:left-9 lg:-bottom-1.5 max-lg:-right-2 max-lg:mt-1 max-md:text-sm max-md:px-4 max-md:py-1 px-6 py-2 rounded-md bg-[#10142E] shadow shadow-white text-white font-medium text-base duration-300 cursor-pointer"
    >
      Logout
    </p>
  );
};

export default UserLogout;
