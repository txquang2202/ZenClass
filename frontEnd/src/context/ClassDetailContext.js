import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getClassByID } from "../services/classServices";

const ClassDetailContext = createContext();

export const useClassDetailContext = () => useContext(ClassDetailContext);

export const ClassDetailProvider = ({ children }) => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [detailClass, setDetailClass] = useState({});
  let dataUser;
  if (token) dataUser = jwtDecode(token);
  // // APIgetClass
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getClassByID(id, token);
        const data = response.data.classInfo;
        console.log(data);
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
  }, [navigate, token, id]);
  return (
    <ClassDetailContext.Provider value={{ detailClass }}>
      {children}
    </ClassDetailContext.Provider>
  );
};
