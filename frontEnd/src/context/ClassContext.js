import React, { createContext, useState, useContext } from "react";

const ClassContext = createContext();

export const useClassContext = () => useContext(ClassContext);

export const ClassProvider = ({ children }) => {
  const [classes, setClasses] = useState([
    {
      title: "ReactJS",
      author: "Minh Hieu",
      class: "KTPM 1",
    },
    {
      title: "ReactJS",
      author: "Minh Hieu",
      class: "KTPM 1",
    },
    {
      title: "ReactJS",
      author: "Minh Hieu",
      class: "KTPM 1",
    },
  ]);

  const createClass = (newClass) => {
    setClasses((prevClasses) => [...prevClasses, newClass]);
  };

  return (
    <ClassContext.Provider value={{ classes, createClass }}>
      {children}
    </ClassContext.Provider>
  );
};
