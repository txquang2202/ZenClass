import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let session = localStorage.getItem("account");
    if (!session) {
      navigate("/signin");
    }
  }, [navigate]);
  return <>{children}</>;
};

export default ProtectedRoute;
