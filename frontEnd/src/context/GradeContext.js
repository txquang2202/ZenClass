import React, { createContext, useEffect, useState } from "react";
import Papa from "papaparse";
import { toast } from "react-toastify";
import { getAllGradeStructs } from "../services/gradeStructureServices";
import { useNavigate } from "react-router-dom";

export const GradeContext = createContext();

export const GradeProvider = ({ children }) => {
  const [grades, setGrades] = useState([
    // {
    //   topic: "Assignments",
    //   ratio: 30,
    // },
    // {
    //   topic: "Projects",
    //   ratio: 30,
    // },
    // {
    //   topic: "Exams",
    //   ratio: 40,
    // },
  ]);

  const [board, setBoard] = useState([
    { id: 20127145, name: "Ho Quoc Duy", total: 0 },
    { id: 20127146, name: "Cao Nhu Y", total: 0 },
    { id: 20127147, name: "Tran Xuan Quang", total: 0 },
    { id: 20127148, name: "Le Ngoc Yen Nhi", total: 0 },
  ]);
  // New state to store temporary values entered in text fields
  const [tempValues, setTempValues] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const updateTempValues = (studentId, topic, value) => {
    setTempValues((prevTempValues) => ({
      ...prevTempValues,
      [studentId]: {
        ...prevTempValues[studentId],
        [topic]: value,
      },
    }));
  };

  // IMPORT
  const handleImportCSV = (file) => {
    // Modify the handleImportCSV function to use context state and functions
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            let importedData = rawCSV.map((item) => {
              return {
                id: item.ID,
                name: item.Name,
                ...grades.reduce((acc, grade) => {
                  acc[grade.topic] =
                    item[`${grade.topic} ${grade.ratio}%`] || 0;
                  return acc;
                }, {}),
                total: item.Total || 0,
              };
            });

            // Update the board state with the imported data
            setBoard(importedData);

            // Update the tempValues state based on the new board data
            let updatedTempValues = {};
            importedData.forEach((student) => {
              updatedTempValues[student.id] = { ...student };
            });
            setTempValues(updatedTempValues);

            toast.success("Import successful!");
          } else {
            toast.error("No data found in CSV file!");
          }
        },
      });
    } else {
      toast.error("Only accept CSV files");
    }
  };

  function extractFinalId(input) {
    if (input.includes("/homework")) {
      // Trích xuất ID nếu có phần "/homework" trong input
      var match = input.match(/\/([^\/]+)\/homework/);
      return match ? match[1] : null;
    } else {
      // Trích xuất ID từ cuối đường dẫn nếu không có phần "/homework"
      const parts = input.split("/");
      return parts[parts.length - 1];
    }
  }

  var urlString = window.location.href;
  var id1 = extractFinalId(urlString);

  //API get gradestructure
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllGradeStructs(id1, token);
        const data = response.data.gradestructs.map((grade) => ({
          id: grade._id || "",
          topic: grade.topic || "",
          ratio: grade.ratio || "",
        }));
        setGrades(data || []);
      } catch (error) {
        console.error("Error fetching grade structure:", error);
        navigate("/500");
      }
    };
    fetchUserData();
  }, [id1, token, navigate]);

  return (
    <GradeContext.Provider
      value={{
        grades,
        setGrades,
        board,
        setBoard,
        tempValues,
        updateTempValues,
        setTempValues,
        handleImportCSV,
      }}
    >
      {children}
    </GradeContext.Provider>
  );
};
