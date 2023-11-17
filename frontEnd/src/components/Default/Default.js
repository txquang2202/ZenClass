import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

function Default({ children }) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}

export default Default;
