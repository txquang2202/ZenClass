import axios from "../setup/axios";

const getAllGradeClass = (id, token) => {
  return axios.get(`/api/v1/getAllGradeClass/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const deleteGradeClass = (id, token) => {
  return axios.get(`/api/v1/deleteGradeClass/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getAllGradeClass, deleteGradeClass };
