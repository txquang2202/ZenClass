import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import ClassPage from "../ClassPage/ClassPage";
import CoursePage from "../CoursePage/CoursePage";
import DetailPage from "../DetailPage/DetailPage";

function HomePage() {
  const [avt, setAvt] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("main"); // default to "main"

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/getprofile/${id}`
        );
        const userData = response.data.user;
        if (userData.img) {
          setAvt(userData.img);
        } else {
          setAvt(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        const session = JSON.parse(sessionStorage.getItem("account"));

        if (!session || !session.userData) {
          navigate("/signin");
        } else {
          navigate("/NotFound");
        }
      }
    };

    fetchUserData();
  }, [id]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="mt-10 container w-full lg:max-w-[calc(100%-7rem)] mx-auto max-w-4xl pb-10 flex min-h-96">
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
            <a
              href="#!"
              onClick={() => handleLinkClick("main")}
              className={`flex flex-col items-center text-gray-700 hover:text-gray-900   text-xs ${
                activeLink === "main" ? "text-[#4E94E5]" : ""
              }`}
            >
              <span className="w-8 h-8">
                <HomeIcon className="w-full h-full" />
              </span>
              <span className="mt-1">Main Page</span>
            </a>
          </li>
          <li>
            <a
              href="#!"
              onClick={() => handleLinkClick("classes")}
              className={`flex flex-col items-center text-gray-700 hover:text-gray-900   text-xs ${
                activeLink === "classes" ? "text-[#4E94E5]" : ""
              }`}
            >
              <span className="w-8 h-8">
                <SchoolIcon className="w-full h-full" />
              </span>
              <span className="mt-1">Classes</span>
            </a>
          </li>
          <li>
            <a
              href="#!"
              onClick={() => handleLinkClick("courses")}
              className={`flex flex-col items-center text-gray-700 hover:text-gray-900   text-xs ${
                activeLink === "courses" ? "text-[#4E94E5]" : ""
              }`}
            >
              <span className="w-8 h-8">
                <AutoStoriesIcon className="w-full h-full" />
              </span>
              <span className="mt-1">Courses</span>
            </a>
          </li>
          {/* Add more items as needed */}
        </ul>
      </div>

      {/* Main content */}
      <div className="w-11/12 pl-6 flex-1">
        <DetailPage />
        {/* {activeLink === "main" && (
          <MainPage myClasses={myClasses} courses={courses} />
        )}
        {activeLink === "classes" && <ClassPage myClasses={myClasses} />}
        {activeLink === "courses" && <CoursePage courses={courses} />} */}
      </div>
    </div>
  );
}

const myClasses = [
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
];

const courses = [
  {
    title: "Angular",
    author: "Quoc Duy",
    class: "KTPM 2",
  },
  {
    title: "Angular",
    author: "Quoc Duy",
    class: "KTPM 2",
  },
  {
    title: "Angular",
    author: "Quoc Duy",
    class: "KTPM 2",
  },
  {
    title: "Angular",
    author: "Quoc Duy",
    class: "KTPM 2",
  },
  {
    title: "Angular",
    author: "Quoc Duy",
    class: "KTPM 2",
  },
  {
    title: "Angular",
    author: "Quoc Duy",
    class: "KTPM 2",
  },
  {
    title: "Angular",
    author: "Quoc Duy",
    class: "KTPM 2",
  },
  {
    title: "Angular",
    author: "Quoc Duy",
    class: "KTPM 2",
  },
  {
    title: "Angular",
    author: "Quoc Duy",
    class: "KTPM 2",
  },
  {
    title: "Angular",
    author: "Quoc Duy",
    class: "KTPM 2",
  },
  {
    title: "Angular",
    author: "Quoc Duy",
    class: "KTPM 2",
  },
  {
    title: "Angular",
    author: "Quoc Duy",
    class: "KTPM 2",
  },
  {
    title: "Angular",
    author: "Quoc Duy",
    class: "KTPM 2",
  },
];

export default HomePage;
