import axios from "../setup/axios";

const getAllClasses = (token) => {
  return axios.get("/api/v1/getallclasses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const getClassMembers = (id, token) => {
  return axios.get(`/api/v1/getclassmembers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const addStudent = (id, studentId, token) => {
  return axios.post(`/api/v1/addStudentsToClass/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    studentId,
  });
};
const addTeacher = (id, teacherId, token) => {
  return axios.post(`/api/v1/addTeacherToClass/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    teacherId,
  });
};
const createClass = (title, teacherName, className, token) => {
  return axios.post("/api/v1/createClass", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    title,
    teacherName,
    className,
  });
};
const inviteLink = (id, check, searchText, token) => {
  return axios.post(
    `/api/v1/sendInvitation/${id}`,
    {
      check: check,
      searchText: searchText,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const deleteClass = (id, token) => {
  return axios.post(`/api/v1/deleteClass/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const getClassByID = (id, token) => {
  return axios.get(`/api/v1/getClassID/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const deleteClassbyID = (id, token) => {
  return axios.delete(`/api/v1/deleteClass/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const editClass = (id, data, token) => {
  return axios.put(`/api/v1/editclass/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  getAllClasses,
  createClass,
  deleteClass,
  getClassByID,
  deleteClassbyID,
  editClass,
  addStudent,
  addTeacher,
  getClassMembers,
  inviteLink,
};
