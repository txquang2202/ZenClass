import { Routes, Route } from "react-router-dom";

const AdminRoutes = (props) => {
  return (
    <>
      <Routes>
        <Route path={props.path} Component={props.Component} />
      </Routes>
    </>
  );
};
export default AdminRoutes;
