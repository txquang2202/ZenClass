import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, roleRequired }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let session = localStorage.getItem("token");
    const items = session ? jwtDecode(session) : null;
    if (!session) {
      navigate("/signin");
    } else if (roleRequired && items.userData.role !== roleRequired) {
      navigate("*");
    }
  }, [navigate, roleRequired]);
  return <>{children}</>;
};

export default ProtectedRoute;
