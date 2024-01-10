import React, { useState } from "react";
import { MdMovie } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { FaSatellite } from "react-icons/fa6";
import { BsBookmarksFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserLogout from "../dialouge-boxes/UserLogout";

const NavBar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const navigate = useNavigate();

  // Handeling the nav items
  const handelSelected = (index) => {
    setSelectedItem(index);
    switch (index) {
      case 0:
        navigate("/root/home");
        break;
      case 1:
        navigate("/root/movie");
        break;
      case 2:
        navigate("/root/tv-series");
        break;
      case 3:
        navigate("/root/bookmarks");
        break;
      default:
        navigate("/root/home")
    }
  };

  return (
    <nav className="bg-[#161D2F] w-24 h-full max-lg:w-full max-lg:h-20 max-sm:h-16 rounded-2xl max-sm:rounded-none text-3xl max-sm:text-2xl flex lg:flex-col items-center max-lg:justify-between lg:py-6 max-lg:px-6 max-sm:px-4">
      <div className="lg:flex lg:items-start lg:h-1/6">
        <MdMovie
          onClick={() => {
            navigate("/root/home");
          }}
          className="text-red-500 text-5xl max-sm:text-4xl cursor-pointer hover:text-red-600"
        />
      </div>
      <div className="text-gray-400 flex lg:flex-col gap-8 max-sm:gap-4 lg:h-2/6">
        <NavItem
          index={0}
          selected={selectedItem === 0}
          onClick={() => handelSelected(0)}
        >
          <IoHome />
        </NavItem>
        <NavItem
          index={1}
          selected={selectedItem === 1}
          onClick={() => handelSelected(1)}
        >
          <MdLocalMovies />
        </NavItem>
        <NavItem
          index={2}
          selected={selectedItem === 2}
          onClick={() => handelSelected(2)}
        >
          <FaSatellite />
        </NavItem>
        <NavItem
          index={3}
          selected={selectedItem === 3}
          onClick={() => handelSelected(3)}
        >
          <BsBookmarksFill />
        </NavItem>
      </div>
      <div className="max-lg:hidden lg:h-2/6"></div>
      <div className="relative lg:h-1/6 lg:flex lg:items-end z-30">
        <FaUserCircle
          onClick={() => setShowUserDetails((prev) => !prev)}
          className="text-white hover:text-gray-200 cursor-pointer"
        />
        {showUserDetails && (
          <UserLogout setShowUserDetails={setShowUserDetails} />
        )}
      </div>
    </nav>
  );
};

// Selecting Each nav items
const NavItem = ({ index, selected, onClick, children }) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`hover:text-white cursor-pointer ${selected && "text-white"}`}
    >
      {children}
    </div>
  );
};

export default NavBar;
