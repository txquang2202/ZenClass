import axios from "../setup/axios";

const getAllGradeClass = (id, token) => {
  return axios.get(`/api/v1/getAllGradeClass/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const editClassGrade = (id, token, updatedGrade) => {
  return axios.put(`/api/v1/editClassGrade/${id}`, updatedGrade, {
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

export { getAllGradeClass, deleteGradeClass, editClassGrade };
