import React, { createContext, useContext, useState } from "react";

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
      }}
    >
      {children}
    </GradeContext.Provider>
  );
};
