import LandingPage from "../components/LandingPage";
import SignUpPage from "../components/SignUp";
import SignInPage from "../components/SignIn";
import HomePage from "../components/HomePage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
