import React, { useState, useEffect } from "react";
import { getUserID } from "../../services/userServices";
import { jwtDecode } from "jwt-decode";
import BlockPage from "../../Pages/BlockPage/BlockPage";

function IsBlocked({ children }) {
  const [userstatus, setUserstatus] = useState();

  const fetchUserData = async () => {
    try {
      const data = localStorage.getItem("token");
      const session = jwtDecode(data);
      const response = await getUserID(session._id, data);
      const userData = response.data.user.status;
      setUserstatus(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div>
     
      {userstatus === "Normal" ? children : <BlockPage/>}
    </div>
  );
}

export default IsBlocked;