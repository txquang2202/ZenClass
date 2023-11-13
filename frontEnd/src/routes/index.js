import LandingPage from "../Pages/LandingPage/LandingPage";
import SignUpPage from "../components/SignUp/SignUp";
import SignInPage from "../components/SignIn/SignIn";
import HomePage from "../Pages/HomePage/HomePage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import ResponsiveDrawer from "../components/Profile";

const routes = [
  {
    path: "/signin",
    page: SignInPage,
    isShowHeader: false,
    isProtected: false,
  },
  {
    path: "/signup",
    page: SignUpPage,
    isShowHeader: false,
    isProtected: false,
  },
  {
    path: "/home",
    page: HomePage,
    isShowHeader: true,
    isProtected: true,
  },
  {
    path: "/profile",
    page: ResponsiveDrawer,
    isShowHeader: false,
    isProtected: true,
  },
  {
    path: "/",
    page: LandingPage,
    isShowHeader: true,
    isProtected: false,
  },
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
    isProtected: false,
  },
];

export default routes;
