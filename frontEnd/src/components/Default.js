import React from "react";
import NavBar from "./Navbar";

const Default = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default Default;
