import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/signin");
    }
  }, [navigate]);
  return <>{children}</>;
};

export default ProtectedRoute;
