import React, { useEffect, useState } from "react";
//import { useParams, useNavigate } from "react-router-dom";
import ClassPage from "../ClassPage/ClassPage";
import CoursePage from "../CoursePage/CoursePage";
// import { getUserID } from "../../services/userServices";

function HomePage() {
  // const { id } = useParams();
  const [myClasses, setMyClasses] = useState([]);
  const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   // const fetchUserData = async () => {
  //   //   try {
  //   //     const response = await getUserID(id);
  //   //   } catch (error) {
  //   //     console.error("Error fetching user profile:", error);
  //   //     const session = JSON.parse(sessionStorage.getItem("account"));
  //   //     if (!session || !session.userData) {
  //   //       navigate("/signin");
  //   //     } else {
  //   //       navigate("/NotFound");
  //   //     }
  //   //   }
  //   // };
  //   // fetchUserData();
  // }, [id]);

  return (
    <>
      <div>{myClasses && <ClassPage myClasses={myClasses} />}</div>
      <div className="mt-7 relative">
        {courses && <CoursePage courses={courses} />}
      </div>
    </>
  );
}

export default HomePage;
