import axios from "../setup/axios";

const loginUser = (username, password) => {
  return axios.post("/api/v1/login", {
    username: username,
    password: password,
  });
};
const registerUser = (username, email, password) => {
  return axios.post("/api/v1/register", {
    username,
    email,
    password,
  });
};
const updateUser = (id, data) => {
  return axios.put(`/api/v1/editprofile/${id}`, data);
};
const getUserID = (id) => {
  return axios.get(`/api/v1/getprofile/${id}`);
};
const getAllUsers = () => {
  return axios.get("/api/v1/getallusers");
};

export { loginUser, registerUser, updateUser, getUserID, getAllUsers };
