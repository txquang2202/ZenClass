import React, { createContext, useContext, useState } from "react";

// Create a context for grades
export const GradeContext = createContext();

// Create a provider component to wrap the app and provide the context
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
    { id: 20127145, name: "John Doe", grade: "A" },
    // ... (rest of the board data remains unchanged)
  ]);

  return (
    <GradeContext.Provider value={{ grades, setGrades, board }}>
      {children}
    </GradeContext.Provider>
  );
};
