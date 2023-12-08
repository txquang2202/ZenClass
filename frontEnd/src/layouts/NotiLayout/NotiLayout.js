import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
// import { NotificationProvider } from "../../context/NotificationContext";
import IsBlocked from "../../components/IsBlocked/IsBlocked";

function Default({ children }) {
  return (
    <div>
      <NavBar />
        <IsBlocked>{children}</IsBlocked>
      <Footer />
    </div>
  );
}

export default Default;
