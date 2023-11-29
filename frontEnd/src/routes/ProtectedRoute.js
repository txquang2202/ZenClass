import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children, roleRequired }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let session = localStorage.getItem("token");
    const items = JSON.parse(session);

    if (!session) {
      navigate("/signin");
    } else if (roleRequired && items.userData.role !== roleRequired) {
      navigate("*"); // Chuyển hướng đến trang 404 nếu không có quyền
    }
  }, [navigate, roleRequired]);
  return <>{children}</>;
};

export default ProtectedRoute;
