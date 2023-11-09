import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Grid} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake,faThumbsUp,faWallet,faPhone,faMap,faEnvelope} from '@fortawesome/free-solid-svg-icons'

import pic_1 from "../img/pic_1.jpg"
import pic_2 from "../img/pic_2.jpg"
function LandingPage() {
  return (
    <Container maxWidth="100%" className="pt-[50px]">
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        paddingBottom="50px"
        backgroundColor="#10375C"
        paddingTop="20px"
      >
        <Grid item lg={6}>
          <div className="pl-5">
            <h1 className="font-black text-4xl text-white">Trang thương mại điện tử do nhóm ABC phát triển.</h1>
            <p className="text-gray-300 pt-3">Giúp cho người dùng có trải nghiệm mua sắm tốt nhất.</p>
            <div className="pt-5 flex justify-center">
              <button className="bg-white rounded-2xl w-36 h-14">Mua ngay</button>
              <p className="text-white pl-5 h-14 leading-lh14">or call 0901234567</p>
            </div>
          </div>
        </Grid>
        <Grid item lg={6}>
          <div className="flex justify-center ">
              <img src={pic_1} className="w-imghead h-imghead rounded-xl"></img>
              <img src={pic_2} className="w-imgheadsmall h-imgheadsmall rounded-r-lg  mt-[25px]"></img>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        paddingBottom="50px"
        paddingTop="20px"
      >
        <Grid item >
          <h1 className="font-black text-4xl text-center text-main">Về chúng tôi</h1>
          <p className="pt-5">Nhằm đem lại cảm giác mua sắm tốt nhất cho người dùng nhóm chúng tôi phát triển nên trang web này. </p>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        paddingBottom="50px"
        paddingTop="20px"
      >
        <Grid item lg={12}>
          <div className="pl-10 ">
            <h1 className="font-black text-4xl text-main">Chúng tôi muốn đem lại cho khách hàng</h1>
            <p className="pt-5">Nhằm đem lại cảm giác mua sắm tốt nhất cho người dùng nhóm chúng tôi phát triển nên trang web này. </p>
          </div>
          <Grid
            container
            spacing={5}
            paddingBottom="50px"
            paddingTop="20px"
            paddingLeft="40px"
          >
            <Grid item lg={4}>
              <div className="border-solid border-4 border-bdcolor w-full h-full p-8">
                <div className="text-center text-main">
                  <FontAwesomeIcon icon={faHandshake} className="w-28 h-28"/>
                  <h1 className="font-bold text-2xl">Sự tin tưởng</h1>
                </div>
                <p className="pt-5">Sự tin tưởng của khách hàng chính là niềm vinh hạnh của chúng tôi</p>
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className="border-solid border-4 border-bdcolor w-full h-full p-8">
                  <div className="text-center text-main">
                    <FontAwesomeIcon icon={faThumbsUp} className="w-28 h-28 "/>
                    <h1 className="font-bold text-2xl">Chất lượng</h1>
                  </div>
                  <p className="pt-5">Chất lượng luôn được chúng tôi để lên hàng đầu</p>
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className="border-solid border-4 border-bdcolor w-full h-full p-8">
                <div className="text-center text-main">
                  <FontAwesomeIcon icon={faWallet} className="w-28 h-28"/>
                  <h1 className="font-bold text-2xl">Giá tốt nhất</h1>
                </div>
                <p className="pt-5 ">Chúng tôi đem lại sản phẩm với giá tốt nhất</p>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        paddingBottom="50px"
        paddingTop="20px"
      >
        <Grid item lg={12}>
          <div className="pr-10">
            <h1 className="font-black text-4xl text-main text-right">Các thành viên</h1>
            <p className="pt-5 text-right">Nhằm đem lại cảm giác mua sắm tốt nhất cho người dùng nhóm chúng tôi phát triển nên trang web này. </p>
          </div>
          <Grid
            container
            spacing={5}
            paddingBottom="50px"
            paddingTop="20px"
            paddingLeft="40px"
          >
            <Grid item lg={4}>
              <div className="w-full h-full p-8 ">
                <div className="text-center justify-center">
                  <div className="flex justify-center"><img src={pic_1} className="w-imghead h-imghead "></img></div>
                  <h1 className="font-bold text-3xl pt-5 text-main">Phan Lê Minh Hiếu</h1>
                  <p className="pt-5 text-2xl">Front-end developer</p>
                  <p className="pt-5">20127499@student.hcmus.edu.vn</p>
                </div>
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className="w-full h-full p-8 ">
                <div className="text-center justify-center">
                  <div className="flex justify-center"><img src={pic_1} className="w-imghead h-imghead "></img></div>
                  <h1 className="font-bold text-3xl pt-5 text-main">Phan Lê Minh Hiếu</h1>
                  <p className="pt-5 text-2xl">Front-end developer</p>
                  <p className="pt-5">20127499@student.hcmus.edu.vn</p>
                </div>
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className="w-full h-full p-8 ">
                <div className="text-center justify-center">
                  <div className="flex justify-center"><img src={pic_1} className="w-imghead h-imghead "></img></div>
                  <h1 className="font-bold text-3xl pt-5 text-main">Phan Lê Minh Hiếu</h1>
                  <p className="pt-5 text-2xl">Front-end developer</p>
                  <p className="pt-5">20127499@student.hcmus.edu.vn</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid
        container
        spacing={2}
        paddingBottom="50px"
        paddingTop="20px"
        paddingLeft="40px"
        >
          <Grid item lg={12}>
            <h1 className="font-black text-4xl text-main">Thông tin liên lạc</h1>
            <p className="pt-5">Hãy liên lạc với chúng tôi bằng các phương thức sau:</p>
            <Grid
              container
              spacing={5}
              paddingBottom="50px"
              paddingTop="40px"
              paddingLeft="40px"
            >
              <Grid item lg={5}>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faPhone} />
                  <h1 className="font-semibold text-xl pl-2">Hotline 1 - Hiếu</h1>
                </div>
                <p className="text-xl pb-5">Sdt: 0996833801</p>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faPhone} />
                  <h1 className="font-semibold text-xl pl-2">Hotline 2 - Duy</h1>
                </div>
                <p className="text-xl pb-5">Sdt: 0996833801</p>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faPhone} />
                  <h1 className="font-semibold text-xl pl-2">Hotline 2 - Quang</h1>
                </div>
                <p className="text-xl pb-5">Sdt: 0996833801</p>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <h1 className="font-semibold text-xl pl-2">Mail</h1>
                </div>
                <p className="text-xl pb-5">123456789@gmail.com</p>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faMap} />
                  <h1 className="font-semibold text-xl pl-2">Địa chỉ</h1>
                </div>
                <p className="text-xl pb-5">227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh</p>
              </Grid>
              <Grid item lg={7}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.629929475504!2d106.68081942588326!3d10.762977880719951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1699470750949!5m2!1svi!2s" width="800" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </Container>
  );
}

export default LandingPage;
