// Sidebar.js
import React from "react";
import { Link, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

function Sidebar({ activeLink, handleLinkClick }) {
  const { id } = useParams();

  return (
    <div className="w-1/5 md:w-1/6 lg:w-1/12 p-4 rounded-lg border border-solid border-gray-200 ">
      {/* Sidebar content */}
      <ul className="space-y-8 text-center">
        <li className="">
          <button
            className={`btn bg-[#2E80CE] text-white px-3 py-1 lg:px-4 lg:py-1 rounded-full text-2xl ${
              activeLink === "main" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("main")}
          >
            +
          </button>
        </li>
        <li>
          <Link
            to="#!" // You can set this to the appropriate path
            onClick={() => handleLinkClick("main")}
            className={`flex flex-col items-center text-gray-700 hover:text-gray-900   text-xs ${
              activeLink === "main" ? "text-blue-500" : ""
            }`}
          >
            <span className="w-8 h-8">
              <HomeIcon className="w-full h-full" />
            </span>
            <span className="mt-1">Main Page</span>
          </Link>
        </li>
        <li>
          <Link
            to="#!" // You can set this to the appropriate path
            onClick={() => handleLinkClick("classes")}
            className={`flex flex-col items-center text-gray-700 hover:text-gray-900   text-xs ${
              activeLink === "classes" ? "text-blue-500" : ""
            }`}
          >
            <span className="w-8 h-8">
              <SchoolIcon className="w-full h-full" />
            </span>
            <span className="mt-1">Classes</span>
          </Link>
        </li>
        <li>
          <Link
            to="#!" // You can set this to the appropriate path
            onClick={() => handleLinkClick("courses")}
            className={`flex flex-col items-center text-gray-700 hover:text-gray-900   text-xs ${
              activeLink === "courses" ? "text-blue-500" : ""
            }`}
          >
            <span className="w-8 h-8">
              <AutoStoriesIcon className="w-full h-full" />
            </span>
            <span className="mt-1">Courses</span>
          </Link>
        </li>
        {/* Add more items as needed */}
      </ul>
    </div>
  );
}

export default Sidebar;
