import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getClassByID } from "../../services/classServices";
import { jwtDecode } from "jwt-decode";
import { useClassDetailContext } from "../../context/ClassDetailContext";

function NavDetail(props) {
  const [activeLink, setActiveLink] = useState("general");
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  let dataUser;
  if (token) dataUser = jwtDecode(token);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const { detailClass } = useClassDetailContext();

  // // // APIgetClass
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await getClassByID(id, token);
  //       const data = response.data.classInfo;
  //       setDetailClass({
  //         id: data._id || "",
  //         title: data.title || "",
  //         teacher: data.teachers[0].fullname || data.teachers[0].username || "",
  //         className: data.className || "",
  //       });
  //     } catch (error) {
  //       console.error("Error fetching classes:", error);
  //       navigate("/500");
  //     }
  //   };

  //   fetchUserData();
  // }, [navigate, token, id]);

  return (
    <div>
      <nav>
        <div className="container border-b-2 border-gray-100 mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Các liên kết điều hướng */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-20  px-10 text-sm">
            <Link
              to={`/home/classes/detail/${detailClass.id}`}
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
              to={`/home/classes/detail/people/${detailClass.id}`}
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
              to={`/home/classes/detail/grade-board/${detailClass.id}`}
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
              to={`/home/classes/detail/grade-structure/${detailClass.id}`}
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
