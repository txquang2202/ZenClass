import axios from "../setup/axios";

const getAllClasses = (token) => {
  return axios.get("/api/v1/getallclasses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createClass = (title, teacher, className, token) => {
  return axios.post("/api/v1/createClass", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    title,
    teacher,
    className,
  });
};

const deleteClass = (id, token) => {
  return axios.post(`/api/v1/deleteClass/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getAllClasses, createClass, deleteClass };
