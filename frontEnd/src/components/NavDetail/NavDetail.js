import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function NavDetail(props) {
  const [activeLink, setActiveLink] = useState("general");
  const { id } = useParams();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div>
      <nav>
        <div className="container border-b-2 border-gray-100 mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Các liên kết điều hướng */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-20  px-10 text-sm">
            <Link
              to={`/home/classes/detail/${id}`}
              className={`${
                activeLink === "general"
                  ? "text-[#2E80CE] border-b-2 border-[#2E80CE] pb-2 "
                  : ""
              }`}
              onClick={() => handleLinkClick("general")}
            >
              General
            </Link>
            <Link
              to={`/home/classes/detail/people/${id}`}
              className={` ${
                activeLink === "people"
                  ? "text-[#2E80CE] border-b-2 border-[#2E80CE] pb-2 "
                  : ""
              }`}
              onClick={() => handleLinkClick("people")}
            >
              People
            </Link>
            <Link
              to={`/home/classes/detail/grade-board/${id}`}
              className={` ${
                activeLink === "grade-board"
                  ? "text-[#2E80CE] border-b-2 border-[#2E80CE] pb-2 "
                  : ""
              }`}
              onClick={() => handleLinkClick("grade-board")}
            >
              Grade board
            </Link>
            <Link
              to={`/home/classes/detail/grade-structure/${id}`}
              className={` ${
                activeLink === "grade-structure"
                  ? "text-[#2E80CE] border-b-2 border-[#2E80CE] pb-2"
                  : ""
              }`}
              onClick={() => handleLinkClick("grade-structure")}
            >
              Grade structure
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavDetail;
