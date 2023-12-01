import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [menuItemsData, setMenuItemsData] = useState([
    {
      id: 1,
      name: "Duy",
      avatarSrc: "/static/images/avatar/1.jpg",
      content: "Reprehenderit quia neque error Ipsa laudantium molestias",
      timestamp: "1 month ago",
    },
    {
      id: 2,
      name: "Duy",
      avatarSrc: "/static/images/avatar/1.jpg",
      content: "Reprehenderit quia neque error Ipsa laudantium molestias",
      timestamp: "1 month ago",
    },
    {
      id: 3,
      name: "Nhan",
      avatarSrc: "/static/images/avatar/1.jpg",
      content: "Reprehenderit quia neque error Ipsa laudantium molestias",
      timestamp: "1 month ago",
    },
    {
      id: 4,
      name: "Quang",
      avatarSrc: "/static/images/avatar/1.jpg",
      content: "Reprehenderit quia neque error Ipsa laudantium molestias",
      timestamp: "1 month ago",
    },
    {
      id: 5,
      name: "Y",
      avatarSrc: "/static/images/avatar/1.jpg",
      content: "Reprehenderit quia neque error Ipsa laudantium molestias",
      timestamp: "1 month ago",
    },
    {
      id: 6,
      name: "Duy",
      avatarSrc: "/static/images/avatar/1.jpg",
      content: "Reprehenderit quia neque error Ipsa laudantium molestias",
      timestamp: "1 month ago",
    },
    // Add more items as needed
  ]);

  const updateMenuItemsData = (newData) => {
    setMenuItemsData(newData);
  };

  return (
    <NotificationContext.Provider
      value={{ menuItemsData, updateMenuItemsData }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
