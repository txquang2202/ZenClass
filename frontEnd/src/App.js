// Trong tệp App.js hoặc tệp nơi bạn định nghĩa định tuyến

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import HomePage from "./components/HomePage";
import NavBar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <NavBar />
      {/* <Sidebar /> */}
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
