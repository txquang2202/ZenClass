import { Routes, Route } from "react-router-dom";
import ResponsiveDrawer from "../components/Profile";

const AdminRoutes = (props) => {
  return (
    <>
      <Routes>
        <Route path="/profile" element={<ResponsiveDrawer />} />
      </Routes>
    </>
  );
};
export default AdminRoutes;
