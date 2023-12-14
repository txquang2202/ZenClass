import axios from "../setup/axios";

const getAllClasses = (id, token) => {
  return axios.get(`/api/v1/getallclasses/${id}`, {
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
const joinByCode = (id, studentId, token) => {
  return axios.post(`/api/v1/joinbycode/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    studentId,
  });
};
// const addStudent = (id, studentId, token) => {
//   return axios.post(`/api/v1/addStudentsToClass/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     studentId,
//   });
// };
// const addTeacher = (id, teacherId, token) => {
//   return axios.post(`/api/v1/addTeacherToClass/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     teacherId,
//   });
// };
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
const deleteStudentFromClass = (id, personID, token) => {
  console.log(personID);
  return axios.post(`/api/v1/deleteStudentFromClass/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    personID: personID,
  });
};
const deleteTeacherFromClass = (id, personID, token) => {
  console.log(personID);
  return axios.post(`/api/v1/deleteTeacherFromClass/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    personID: personID,
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
  getClassMembers,
  inviteLink,
  deleteStudentFromClass,
  deleteTeacherFromClass,
  joinByCode,
};
