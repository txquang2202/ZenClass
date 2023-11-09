import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
//import SideBar nếu có

export function Layout() {
  return (
    <div>
      <NavBar />
      <div className="container">
        {/* để side bar ở đây nếu có */}
        <Outlet />
      </div>
    </div>
  );
}
