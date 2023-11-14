import React from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function HomePage() {


  return (
        <div >
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
            className="m-[50px] w-[1500px]"
          >
            <SwiperSlide className="text-center text-[18px] flex justify-center items-center"><img className="block w-[1500px] h-[500px] object-cover" src="./assets/imgs/good.jpg"/></SwiperSlide>
            <SwiperSlide className="text-center text-[18px] flex justify-center items-center"><img className="block w-[1500px] h-[500px] object-cover" src="./assets/imgs/good.jpg"/></SwiperSlide>
            <SwiperSlide className="text-center text-[18px] flex justify-center items-center"><img className="block w-[1500px] h-[500px] object-cover" src="./assets/imgs/good.jpg"/></SwiperSlide>
          </Swiper>
          <div className="flex justify-center items-center  w-[1170px] ml-[225px] pt-[50px] ">
              
          <Grid container spacing={{sx:0, sm:0, md:1, lg:8}} >
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <section class="group mt-[15px] relative border-solid border-[1.5px] border-[#DADCE0] rounded-[10px] w-[300px] h-[350px] hover:translate-y-[-16px] hover:rounded-[10px] hover:shadow-xl hover:duration-[0.25s]">
                <img 
                  src="./assets/imgs/good.jpg"
                  className="absolute w-[100%] h-[120px] z-[-1] rounded-t-[10px]"
                />
                <img 
                  src="./assets/imgs/profile1.png"
                  className="absolute w-[50px] h-[50px] rounded-[50%] right-[10px] mt-[95px] "
                />
                <h3 class="absolute text-white mt-[20px] pl-[15px] pr-[15px] text-[1.2rem] font-[600]  ">Search doctor</h3>
                <p class="mt-[50px] pl-[15px] pr-[10px] text-white text-[0.7rem] font-[250]  ">
                  Search a doctor by education, qualifications or
                  experience-contact for inquiry.
                </p>
                <a href="#!" class="inline-block mt-[5px] pl-[15px] text-white text-[0.9rem] font-[450] ">Phan Le Minh Hieu</a>
                <div className="absolute mt-[30px] pl-[15px]">
                  <h1 className="text-[1.3rem] font-[500]">Due monday</h1>
                  <p className="text-[1rem] font-[400]">Homework 5</p>
                </div>
                <hr class="h-[1.5px] mt-[180px] bg-[#DADCE0] border-0 dark:bg-[#DADCE0] group-hover:shadow-xl"/>
                <div className="absolute right-0 flex mt-[4px] mr-[10px]">
                  <div className="w-[50px] h-[50px] border-solid hover:bg-[#E0E0E0] hover:duration-[0.5s] flex items-center justify-center rounded-[50%]">
                    <AccountBoxOutlinedIcon className=" w-[25px] h-[25px] "/>
                  </div>
                  <div className="w-[50px] h-[50px] border-solid hover:bg-[#E0E0E0] hover:duration-[0.5s] flex items-center justify-center rounded-[50%]">
                    <FolderOpenIcon className=" w-[25px] h-[25px] "/>
                  </div>
                </div>
              </section>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <section class="group mt-[15px] relative border-solid border-[1.5px] border-[#DADCE0] rounded-[10px] w-[300px] h-[350px] hover:translate-y-[-16px] hover:rounded-[10px] hover:shadow-xl hover:duration-[0.25s]">
                <img 
                  src="./assets/imgs/good.jpg"
                  className="absolute w-[100%] h-[120px] z-[-1] rounded-t-[10px]"
                />
                <img 
                  src="./assets/imgs/profile1.png"
                  className="absolute w-[50px] h-[50px] rounded-[50%] right-[10px] mt-[95px] "
                />
                <h3 class="absolute text-white mt-[20px] pl-[15px] pr-[15px] text-[1.2rem] font-[600]  ">Search doctor</h3>
                <p class="mt-[50px] pl-[15px] pr-[10px] text-white text-[0.7rem] font-[250]  ">
                  Search a doctor by education, qualifications or
                  experience-contact for inquiry.
                </p>
                <a href="#!" class="inline-block mt-[5px] pl-[15px] text-white text-[0.9rem] font-[450] ">Phan Le Minh Hieu</a>
                <div className="absolute mt-[30px] pl-[15px]">
                  <h1 className="text-[1.3rem] font-[500]">Due monday</h1>
                  <p className="text-[1rem] font-[400]">Homework 5</p>
                </div>
                <hr class="h-[1.5px] mt-[180px] bg-[#DADCE0] border-0 dark:bg-[#DADCE0] group-hover:shadow-xl"/>
                <div className="absolute right-0 flex mt-[4px] mr-[10px]">
                  <div className="w-[50px] h-[50px] border-solid hover:bg-[#E0E0E0] hover:duration-[0.5s] flex items-center justify-center rounded-[50%]">
                    <AccountBoxOutlinedIcon className=" w-[25px] h-[25px] "/>
                  </div>
                  <div className="w-[50px] h-[50px] border-solid hover:bg-[#E0E0E0] hover:duration-[0.5s] flex items-center justify-center rounded-[50%]">
                    <FolderOpenIcon className=" w-[25px] h-[25px] "/>
                  </div>
                </div>
              </section>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <section class="group mt-[15px] relative border-solid border-[1.5px] border-[#DADCE0] rounded-[10px] w-[300px] h-[350px] hover:translate-y-[-16px] hover:rounded-[10px] hover:shadow-xl hover:duration-[0.25s]">
                <img 
                  src="./assets/imgs/good.jpg"
                  className="absolute w-[100%] h-[120px] z-[-1] rounded-t-[10px]"
                />
                <img 
                  src="./assets/imgs/profile1.png"
                  className="absolute w-[50px] h-[50px] rounded-[50%] right-[10px] mt-[95px] "
                />
                <h3 class="absolute text-white mt-[20px] pl-[15px] pr-[15px] text-[1.2rem] font-[600]  ">Search doctor</h3>
                <p class="mt-[50px] pl-[15px] pr-[10px] text-white text-[0.7rem] font-[250]  ">
                  Search a doctor by education, qualifications or
                  experience-contact for inquiry.
                </p>
                <a href="#!" class="inline-block mt-[5px] pl-[15px] text-white text-[0.9rem] font-[450] ">Phan Le Minh Hieu</a>
                <div className="absolute mt-[30px] pl-[15px]">
                  <h1 className="text-[1.3rem] font-[500]">Due monday</h1>
                  <p className="text-[1rem] font-[400]">Homework 5</p>
                </div>
                <hr class="h-[1.5px] mt-[180px] bg-[#DADCE0] border-0 dark:bg-[#DADCE0] group-hover:shadow-xl"/>
                <div className="absolute right-0 flex mt-[4px] mr-[10px]">
                  <div className="w-[50px] h-[50px] border-solid hover:bg-[#E0E0E0] hover:duration-[0.5s] flex items-center justify-center rounded-[50%]">
                    <AccountBoxOutlinedIcon className=" w-[25px] h-[25px] "/>
                  </div>
                  <div className="w-[50px] h-[50px] border-solid hover:bg-[#E0E0E0] hover:duration-[0.5s] flex items-center justify-center rounded-[50%]">
                    <FolderOpenIcon className=" w-[25px] h-[25px] "/>
                  </div>
                </div>
              </section>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <section class="group mt-[15px] relative border-solid border-[1.5px] border-[#DADCE0] rounded-[10px] w-[300px] h-[350px] hover:translate-y-[-16px] hover:rounded-[10px] hover:shadow-xl hover:duration-[0.25s]">
                <img 
                  src="./assets/imgs/good.jpg"
                  className="absolute w-[100%] h-[120px] z-[-1] rounded-t-[10px]"
                />
                <img 
                  src="./assets/imgs/profile1.png"
                  className="absolute w-[50px] h-[50px] rounded-[50%] right-[10px] mt-[95px] "
                />
                <h3 class="absolute text-white mt-[20px] pl-[15px] pr-[15px] text-[1.2rem] font-[600]  ">Search doctor</h3>
                <p class="mt-[50px] pl-[15px] pr-[10px] text-white text-[0.7rem] font-[250]  ">
                  Search a doctor by education, qualifications or
                  experience-contact for inquiry.
                </p>
                <a href="#!" class="inline-block mt-[5px] pl-[15px] text-white text-[0.9rem] font-[450] ">Phan Le Minh Hieu</a>
                <div className="absolute mt-[30px] pl-[15px]">
                  <h1 className="text-[1.3rem] font-[500]">Due monday</h1>
                  <p className="text-[1rem] font-[400]">Homework 5</p>
                </div>
                <hr class="h-[1.5px] mt-[180px] bg-[#DADCE0] border-0 dark:bg-[#DADCE0] group-hover:shadow-xl"/>
                <div className="absolute right-0 flex mt-[4px] mr-[10px]">
                  <div className="w-[50px] h-[50px] border-solid hover:bg-[#E0E0E0] hover:duration-[0.5s] flex items-center justify-center rounded-[50%]">
                    <AccountBoxOutlinedIcon className=" w-[25px] h-[25px] "/>
                  </div>
                  <div className="w-[50px] h-[50px] border-solid hover:bg-[#E0E0E0] hover:duration-[0.5s] flex items-center justify-center rounded-[50%]">
                    <FolderOpenIcon className=" w-[25px] h-[25px] "/>
                  </div>
                </div>
              </section>
            </Grid>
          </Grid>
          </div>
        </div>

  );
}

export default HomePage;
