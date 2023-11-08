import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    <Router>
      <div className="Header">
        <NavBar />
      </div>
      {/* <Sidebar /> */}
      <div className="Container">
        <AppRoutes />
        <UserRoutes />
      </div>
    </Router>
  );
}

export default App;
