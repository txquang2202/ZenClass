import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, roleRequired }) => {
  const navigate = useNavigate();
  useEffect(() => {
    let session = localStorage.getItem("token");
    if (!session) {
      navigate("/signin", { replace: true });
      return;
    }
    const items = jwtDecode(session);
    if (roleRequired && items.role !== roleRequired) {
      navigate("*");
    }
  }, [navigate, roleRequired]);

  return <>{children}</>;
};

export default ProtectedRoute;
