import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
//import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    <Router>
      {/* <Sidebar /> */}
      <div className="Container">
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
          <Route path="/profile/*" element={<UserRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
