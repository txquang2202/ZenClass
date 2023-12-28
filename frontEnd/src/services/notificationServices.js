import axios from "../setup/axios";

const getAllNotifications = (id, token) => {
  return axios.get(`/api/v1/getAllNotifications/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getAllNotifications };
