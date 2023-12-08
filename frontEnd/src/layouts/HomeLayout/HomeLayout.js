import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import SideBar from "../../components/SideBar/SideBar";
import { ClassProvider } from "../../context/ClassContext";
import IsBlocked from "../../components/IsBlocked/IsBlocked";

function Default({ children }) {
  return (
    <div>
      <NavBar />
      <ClassProvider>
        <div className="mt-10 container w-full lg:max-w-[calc(100%-7rem)] mx-auto max-w-4xl pb-10 flex min-h-96">
          <SideBar />
          <div className="w-11/12 pl-6 flex-1"><IsBlocked>{children}</IsBlocked></div>
        </div>
      </ClassProvider>
      <Footer />
    </div>
  );
}

export default Default;
