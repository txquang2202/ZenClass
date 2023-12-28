import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import SideBar from "../../components/SideBar/SideBar";
import NavDetail from "../../components/NavDetail/NavDetail";
import { ClassProvider } from "../../context/ClassContext";
import { GradeProvider } from "../../context/GradeContext";
import { CourseProvider } from "../../context/CourseContext";
import { ClassDetailProvider } from "../../context/ClassDetailContext";
import IsBlocked from "../../components/IsBlocked/IsBlocked";

function Default({ children }) {
  return (
    <div>
      <NavBar />
      <ClassProvider>
        <ClassDetailProvider>
          <CourseProvider>
            <GradeProvider>
              <div className="mt-10 container w-full lg:max-w-[calc(100%-7rem)] mx-auto max-w-4xl pb-10 flex min-h-96">
                <SideBar />
                <div className="w-11/12 pl-6 flex-1">
                  <NavDetail />
                  <section className="container w-full lg:max-w-[calc(100%-10rem)] mx-auto mt-6">
<<<<<<< HEAD
                  <IsBlocked>{children}</IsBlocked>
=======
                    {/* <IsBlocked>{children}</IsBlocked> */}
                    {children}
>>>>>>> 9346e2bad202a947c8979cc85277ebe9a7e1524c
                  </section>
                </div>
              </div>
            </GradeProvider>
          </CourseProvider>
        </ClassDetailProvider>
      </ClassProvider>
      <Footer />
    </div>
  );
}

export default Default;
