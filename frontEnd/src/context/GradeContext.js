import React, { createContext, useContext, useState, useEffect } from "react";
import Papa from "papaparse";
import { toast, ToastContainer } from "react-toastify";

export const GradeContext = createContext();

export const GradeProvider = ({ children }) => {
  const [grades, setGrades] = useState([
    {
      id: 1,
      gradeCode: "GR001",
      topic: "Assignments",
      ratio: 30,
    },
    {
      id: 2,
      gradeCode: "GR002",
      topic: "Projects",
      ratio: 30,
    },
    {
      id: 3,
      gradeCode: "GR003",
      topic: "Exams",
      ratio: 40,
    },
    // ... (rest of the grades data remains unchanged)
  ]);
  const [board, setBoard] = useState([
    { id: 20127145, name: "Ho Quoc Duy", total: 0 },
    { id: 20127146, name: "Cao Nhu Y", total: 0 },
    { id: 20127147, name: "Tran Xuan Quang", total: 0 },
    { id: 20127148, name: "Le Ngoc Yen Nhi", total: 0 },
    // { id: 20127149, name: "Le Ngoc Yen Nhi", total: 0 },
    // { id: 20127150, name: "Ho Quoc Duy", total: 0 },
    // { id: 20127151, name: "Cao Nhu Y", total: 0 },
    // { id: 20127152, name: "Tran Xuan Quang", total: 0 },
    // { id: 20127153, name: "Le Ngoc Yen Nhi", total: 0 },
    // { id: 20127154, name: "Le Ngoc Yen Nhi", total: 0 },
    // { id: 20127155, name: "Tran Xuan Quang", total: 0 },
    // { id: 20127156, name: "Le Ngoc Yen Nhi", total: 0 },
    // { id: 20127157, name: "Le Ngoc Yen Nhi", total: 0 },
    // ... (rest of the board data remains unchanged)
  ]);
  // New state to store temporary values entered in text fields
  const [tempValues, setTempValues] = useState({});

  const updateTempValues = (studentId, topic, value) => {
    setTempValues((prevTempValues) => ({
      ...prevTempValues,
      [studentId]: {
        ...prevTempValues[studentId],
        [topic]: value,
      },
    }));
  };

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
