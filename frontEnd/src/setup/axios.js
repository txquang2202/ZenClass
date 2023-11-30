import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://localhost:8080/",
});
instance.defaults.withCredentials = true;
// // Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);

    // Kiểm tra hết hạn token
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }

    return token;
  }
  return null;
};

instance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        console.log("Token is invalid or expired. Redirecting to login page.");
        window.location.href = "/signin";
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Add a request interceptor
// instance.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// instance.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
export default instance;
