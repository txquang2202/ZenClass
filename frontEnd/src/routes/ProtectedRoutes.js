import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/signin");
    }
  }, [navigate]);

  return <Outlet />;
};

export default ProtectedRoutes;
