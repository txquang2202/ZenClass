import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import SideBar from "../../components/SideBar/SideBar";
import NavDetail from "../../components/NavDetail/NavDetail";

function Default({ children }) {
  return (
    <div>
      <NavBar />
      <div className="mt-10 container w-full lg:max-w-[calc(100%-7rem)] mx-auto max-w-4xl pb-10 flex min-h-96">
        {/* Sidebar content */}
        {/* <Sidebar activeLink={activeLink} handleLinkClick={handleLinkClick} /> */}
        <SideBar />
        {/* Main content */}
        <div className="w-11/12 pl-6 flex-1">
          <NavDetail />
          <section className="container w-full lg:max-w-[calc(100%-10rem)] mx-auto mt-6">
            {children}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Default;
