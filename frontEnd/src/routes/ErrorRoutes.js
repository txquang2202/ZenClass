import { Outlet } from "react-router-dom";
import NotFound from "../components/NotFound";
//import SideBar nếu có

export function ELayout() {
  return (
    <div>
      <div className="container">
        {/* để side bar ở đây nếu có */}
        <NotFound />
        <Outlet />
      </div>
    </div>
  );
}
