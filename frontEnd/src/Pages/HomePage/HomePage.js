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
    <div className="mt-3 container w-full lg:max-w-[calc(100%-20rem)] mx-auto max-w-4xl pb-10">
      <Swiper
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
      </Swiper>

      {/* COURSES */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3}>
          <section class="group mt-3 md:mt-10 lg:mt-15 border border-gray-300 rounded-lg overflow-hidden transition-transform transform hover:translate-y-[-16px] hover:rounded-lg hover:shadow-xl hover:duration-300">
            <img
              src="/assets/imgs/river.jpg"
              class="w-full h-32 object-cover"
              alt="River Image"
            />
            <div class="flex items-center justify-end pr-2 -mt-14">
              <Avatar
                src={`/assets/imgs/${avt}`}
                alt="User Avatar"
                class="w-[84px] h-[84px] rounded-full bg-[#bdbdbd] text-center text-[#fafafa]"
              />
            </div>
            <div class="p-4">
              <h3 class=" text-lg font-semibold mb-2">ReactJS</h3>

              <a href="#!" class=" text-sm font-medium mb-2">
                Phan Le Minh Hieu
              </a>
              <div class="mt-2">
                <h1 class=" text-md font-semibold mb-2">Due Monday</h1>
                <p class=" text-sm font-light">Homework 5</p>
              </div>
            </div>
            <hr class="border-t border-gray-300 dark:border-gray-600" />
            <div class="flex justify-end p-2">
              <div class="w-10 h-10 border border-gray-300 hover:bg-gray-200 hover:duration-500 flex items-center justify-center rounded-full mr-2">
                <AccountBoxOutlinedIcon class="w-5 h-5" />
              </div>
              <div class="w-10 h-10 border border-gray-300 hover:bg-gray-200 hover:duration-500 flex items-center justify-center rounded-full">
                <FolderOpenIcon class="w-5 h-5" />
              </div>
            </div>
          </section>
        </Grid>
        <Grid item xs={3}>
          <section class="group mt-5 md:mt-10 lg:mt-15 border border-gray-300 rounded-lg overflow-hidden transition-transform transform hover:translate-y-[-16px] hover:rounded-lg hover:shadow-xl hover:duration-300">
            <img
              src="/assets/imgs/river.jpg"
              class="w-full h-32 object-cover"
              alt="River Image"
            />
            <div class="flex items-center justify-end pr-2 -mt-14">
              <Avatar
                src={`/assets/imgs/${avt}`}
                alt="User Avatar"
                class="w-[84px] h-[84px] rounded-full bg-[#bdbdbd] text-center text-[#fafafa]"
              />
            </div>
            <div class="p-4">
              <h3 class=" text-lg font-semibold mb-2">ReactJS</h3>

              <a href="#!" class=" text-sm font-medium mb-2">
                Phan Le Minh Hieu
              </a>
              <div class="mt-2">
                <h1 class=" text-md font-semibold mb-2">Due Monday</h1>
                <p class=" text-sm font-light">Homework 5</p>
              </div>
            </div>
            <hr class="border-t border-gray-300 dark:border-gray-600" />
            <div class="flex justify-end p-2">
              <div class="w-10 h-10 border border-gray-300 hover:bg-gray-200 hover:duration-500 flex items-center justify-center rounded-full mr-2">
                <AccountBoxOutlinedIcon class="w-5 h-5" />
              </div>
              <div class="w-10 h-10 border border-gray-300 hover:bg-gray-200 hover:duration-500 flex items-center justify-center rounded-full">
                <FolderOpenIcon class="w-5 h-5" />
              </div>
            </div>
          </section>
        </Grid>
        <Grid item xs={3}>
          <section class="group mt-5 md:mt-10 lg:mt-15 border border-gray-300 rounded-lg overflow-hidden transition-transform transform hover:translate-y-[-16px] hover:rounded-lg hover:shadow-xl hover:duration-300">
            <img
              src="/assets/imgs/river.jpg"
              class="w-full h-32 object-cover"
              alt="River Image"
            />
            <div class="flex items-center justify-end pr-2 -mt-14">
              <Avatar
                src={`/assets/imgs/${avt}`}
                alt="User Avatar"
                class="w-[84px] h-[84px] rounded-full bg-[#bdbdbd] text-center text-[#fafafa]"
              />
            </div>
            <div class="p-4">
              <h3 class=" text-lg font-semibold mb-2">ReactJS</h3>

              <a href="#!" class=" text-sm font-medium mb-2">
                Phan Le Minh Hieu
              </a>
              <div class="mt-2">
                <h1 class=" text-md font-semibold mb-2">Due Monday</h1>
                <p class=" text-sm font-light">Homework 5</p>
              </div>
            </div>
            <hr class="border-t border-gray-300 dark:border-gray-600" />
            <div class="flex justify-end p-2">
              <div class="w-10 h-10 border border-gray-300 hover:bg-gray-200 hover:duration-500 flex items-center justify-center rounded-full mr-2">
                <AccountBoxOutlinedIcon class="w-5 h-5" />
              </div>
              <div class="w-10 h-10 border border-gray-300 hover:bg-gray-200 hover:duration-500 flex items-center justify-center rounded-full">
                <FolderOpenIcon class="w-5 h-5" />
              </div>
            </div>
          </section>
        </Grid>
        <Grid item xs={3}>
          <section class="group mt-5 md:mt-10 lg:mt-15 border border-gray-300 rounded-lg overflow-hidden transition-transform transform hover:translate-y-[-16px] hover:rounded-lg hover:shadow-xl hover:duration-300">
            <img
              src="/assets/imgs/river.jpg"
              class="w-full h-32 object-cover"
              alt="River Image"
            />
            <div class="flex items-center justify-end pr-2 -mt-14">
              <Avatar
                src={`/assets/imgs/${avt}`}
                alt="User Avatar"
                class="w-[84px] h-[84px] rounded-full bg-[#bdbdbd] text-center text-[#fafafa]"
              />
            </div>
            <div class="p-4">
              <h3 class=" text-lg font-semibold mb-2">ReactJS</h3>

              <a href="#!" class=" text-sm font-medium mb-2">
                Phan Le Minh Hieu
              </a>
              <div class="mt-2">
                <h1 class=" text-md font-semibold mb-2">Due Monday</h1>
                <p class=" text-sm font-light">Homework 5</p>
              </div>
            </div>
            <hr class="border-t border-gray-300 dark:border-gray-600" />
            <div class="flex justify-end p-2">
              <div class="w-10 h-10 border border-gray-300 hover:bg-gray-200 hover:duration-500 flex items-center justify-center rounded-full mr-2">
                <AccountBoxOutlinedIcon class="w-5 h-5" />
              </div>
              <div class="w-10 h-10 border border-gray-300 hover:bg-gray-200 hover:duration-500 flex items-center justify-center rounded-full">
                <FolderOpenIcon class="w-5 h-5" />
              </div>
            </div>
          </section>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
