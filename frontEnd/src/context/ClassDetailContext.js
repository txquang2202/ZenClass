import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getClassByID } from "../services/classServices";

const ClassDetailContext = createContext();

export const useClassDetailContext = () => useContext(ClassDetailContext);

export const ClassDetailProvider = ({ children }) => {
  const { id1, id2 } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [detailClass, setDetailClass] = useState({});
  const location = useLocation();
  let dataUser;

  if (token) dataUser = jwtDecode(token);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let finalId1;

        if (location.pathname.includes("homework")) {
          // Nếu đường dẫn chứa "homework", lấy id1 đầu tiên
          finalId1 = id1;
        } else {
          // Ngược lại, lấy id1 cuối cùng
          const parts = location.pathname.split("/");
          finalId1 = parts[parts.length - 1];
        }

        const response = await getClassByID(finalId1, token);
        const data = response.data.classInfo;

        setDetailClass({
          id: data._id || "",
          title: data.title || "",
          teacher: data.teachers[0].fullname || data.teachers[0].username || "",
          className: data.className || "",
        });
      } catch (error) {
        console.error("Error fetching classes:", error);
        navigate("/500");
      }
    };

    fetchUserData();
  }, [navigate, token, id1, location.pathname]);

  return (
    <ClassDetailContext.Provider value={{ detailClass }}>
      {children}
    </ClassDetailContext.Provider>
  );
};
