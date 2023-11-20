import React, { useState } from "react";
import { Link, useParams} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

function SideBar() {
  const { id } = useParams();
  const [activeLink, setActiveLink] = useState("main");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="w-1/5 md:w-1/6 lg:w-1/12 p-4 rounded-lg border border-solid border-gray-200 ">
      <ul className="space-y-8 text-center">
        <li className="">
          <button className="btn bg-[#2E80CE] text-white px-3 py-1 lg:px-4 lg:py-1 rounded-full text-2xl">
            +
          </button>
        </li>
        <li>
          <Link
            to={`/home/${id}`}
            className={`flex flex-col items-center text-gray-700  text-xs ${
              activeLink === "main" ? "text-blue-500" : ""
            }`}
            onClick={() => handleLinkClick("main")}
          >
            <span className="w-8 h-8">
              <HomeIcon className="w-full h-full" />
            </span>
            <span className="mt-1">Main Page</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/home/classes/${id}`}
            className={`flex flex-col items-center text-gray-700  text-xs ${
              activeLink === "classes" ? "text-blue-500" : ""
            }`}
            onClick={() => handleLinkClick("classes")}
          >
            <span className="w-8 h-8">
              <SchoolIcon className="w-full h-full" />
            </span>
            <span className="mt-1">Classes</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/home/courses/${id}`}
            className={`flex flex-col items-center text-gray-700  text-xs ${
              activeLink === "courses" ? "text-blue-500" : ""
            }`}
            onClick={() => handleLinkClick("courses")}
          >
            <span className="w-8 h-8">
              <AutoStoriesIcon className="w-full h-full" />
            </span>
            <span className="mt-1">Courses</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
