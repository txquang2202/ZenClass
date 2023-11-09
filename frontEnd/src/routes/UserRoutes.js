import { Routes, Route } from "react-router-dom";
import ResponsiveDrawer from "../components/Profile";

const UserRoutes = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ResponsiveDrawer />} />
        {/* <Route path="/*" element={<ELayout />}>
          <Route index element={<NotFound />} />
        </Route> */}
      </Routes>
    </>
  );
};
export default UserRoutes;
