import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Avatar } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

function HomePage() {
  const [avt, setAvt] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <div className="mt-10 container w-full lg:max-w-[calc(100%-7rem)] mx-auto max-w-4xl pb-10 flex">
      <div className="w-1/4 md:w-1/5 lg:w-1/12 p-4 rounded-lg border border-solid border-gray-200 ">
        {/* Sidebar content here */}
        <ul className="space-y-8 text-center">
          <li className="">
            <button
              className="btn bg-[#2E80CE] text-white px-3 py-1 lg:px-4 lg:py-1 rounded-full  text-2xl"
              onClick={() => {
                // Add button click functionality here
              }}
            >
              +
            </button>
          </li>
          <li>
            <HomeIcon />
            <a
              href="#!"
              className="block text-gray-700 hover:text-gray-900 transition-colors duration-300"
            >
              Main Page
            </a>
          </li>
          <li>
            <AutoStoriesIcon />
            <a
              href="#!"
              className="block text-gray-700 hover:text-gray-900 transition-colors duration-300"
            >
              Classes
            </a>
          </li>
          <li>
            <SchoolIcon />
            <a
              href="#!"
              className="block text-gray-700 hover:text-gray-900 transition-colors duration-300"
            >
              Courses
            </a>
          </li>
          {/* Add more items as needed */}
        </ul>
      </div>

      {/* COURSES */}
      <div className="w-11/12 pl-6">
        {/* <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className=" rounded-lg "
        >
          <SwiperSlide className="text-center text-lg flex justify-center items-center">
            <img
              className="block w-full h-64 object-cover"
              src="/assets/imgs/slide-01.jpg"
              alt="Slide 1"
            />
          </SwiperSlide>
          <SwiperSlide className="text-center text-lg flex justify-center items-center">
            <img
              className="block w-full h-64 object-cover"
              src="/assets/imgs/class-02.jpg"
              alt="Slide 2"
            />
          </SwiperSlide>
          <SwiperSlide className="text-center text-lg flex justify-center items-center">
            <img
              className="block w-full h-64 object-cover"
              src="/assets/imgs/slide-03.jpg"
              alt="Slide 3"
            />
          </SwiperSlide>
        </Swiper> */}
        <div>
          <h1 className="text-2xl font-semibold mb-4 text-[#10375c]">
            My Classes
          </h1>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
          >
            {courses.map((course, index) => (
              <Grid item xs={3} key={index}>
                <section className="work-item  bg-white  border-[10px] border-[#EAF6FF] rounded-md transition-transform hover:translate-y-[-10px] hover:border-blue-400 cursor-pointer">
                  <div className="p-5">
                    <h2 className="font-semibold text-2xl leading-[1.38] text-[#10375c]  mb-3">
                      {course.title}
                    </h2>
                    <hr className="border-t border-gray-200 dark:border-[#575F66] mb-3" />
                    <p className=" text-[#575F66] font-sora text-base font-light leading-[28px]">
                      Teacher:
                      <span className=" text-[#2E80CE]"> {course.author}</span>
                    </p>
                    <p className="  text-[#575F66] font-sora text-base font-light leading-[28px]">
                      Class:
                      <span className=" text-[#2E80CE]"> {course.class}</span>
                    </p>
                  </div>
                </section>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className="mt-7">
          <h1 className="text-2xl font-semibold mb-4 text-[#10375c]">
            My Courses
          </h1>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
          >
            {myClasses.map((myClass, index) => (
              <Grid item xs={3} key={index}>
                <section className="work-item  bg-white  border-[10px] border-[#EAF6FF] rounded-md transition-transform hover:translate-y-[-10px] hover:border-blue-400 cursor-pointer">
                  <div className="p-5">
                    <h2 className="font-semibold text-2xl leading-[1.38] text-[#10375c]  mb-3">
                      {myClass.title}
                    </h2>
                    <hr className="border-t border-gray-200 dark:border-[#575F66] mb-3" />
                    <p className=" text-[#575F66] font-sora text-base font-light leading-[28px]">
                      Teacher:
                      <span className=" text-[#2E80CE]"> {myClass.author}</span>
                    </p>
                    <p className="  text-[#575F66] font-sora text-base font-light leading-[28px]">
                      Class:
                      <span className=" text-[#2E80CE]"> {myClass.class}</span>
                    </p>
                  </div>
                </section>
              </Grid>
            ))}
          </Grid>
        </div>
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
];

export default HomePage;
