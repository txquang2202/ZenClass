import axios from "../setup/axios";

const getAllHomework = (id, token) => {
  return axios.get(`/api/v1/getAllHomework/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getHomeworkByID = (id, token) => {
  return axios.get(`/api/v1/getHomeworkByID/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createHomeworkByID = (
  id,
  token,
  title,
  teacherName,
  description,
  date
) => {
  return axios.post(`/api/v1/createHomework/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    title,
    teacherName,
    description,
    date,
  });
};

const editHomeworkByID = (id, token, updatedHomework) => {
  return axios.put(`/api/v1/editHomework/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    updatedHomework,
  });
};

const deleteHomeworkByID = (id, token) => {
  return axios.delete(`/api/v1/editHomework/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  getAllHomework,
  createHomeworkByID,
  editHomeworkByID,
  deleteHomeworkByID,
  getHomeworkByID,
};
