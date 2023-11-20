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
import Sidebar from "../../components/SideBar/SideBar";

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
      {/* Sidebar content */}
      <Sidebar activeLink={activeLink} handleLinkClick={handleLinkClick} />

      {/* Main content */}
      <div className="w-11/12 pl-6 flex-1">
        {/* <DetailPage /> */}
        {activeLink === "main" && (
          <MainPage myClasses={myClasses} courses={courses} />
        )}
        {activeLink === "classes" && <ClassPage myClasses={myClasses} />}
        {activeLink === "courses" && <CoursePage courses={courses} />}
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
