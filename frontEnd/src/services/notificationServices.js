import axios from "../setup/axios";

const getAllNotifications = (id, token) => {
  return axios.get(`/api/v1/getAllNotifications/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const addNotification = (id, token, content, avt, date, link, userID) => {
  return axios.post(`/api/v1/addNotification/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    content,
    avt,
    date,
    link,
    userID,
  });
};

export { getAllNotifications, addNotification };
