import LandingPage from "../components/LandingPage";
import SignUpPage from "../components/SignUp";
import SignInPage from "../components/SignIn";
import HomePage from "../components/HomePage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { Layout } from "./LayOut";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
