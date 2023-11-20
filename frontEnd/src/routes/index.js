import LandingPage from "../Pages/LandingPage/LandingPage";
import SignUpPage from "../components/SignUp/SignUp";
import SignInPage from "../components/SignIn/SignIn";
import HomePage from "../Pages/HomePage/HomePage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import ResponsiveDrawer from "../components/Profile";
import MainPage from "../Pages/MainPage/MainPage";

const routes = [
  {
    path: "/signin",
    page: SignInPage,
    isShowHeader: false,
    isProtected: false,
    isShowSideBar: false,
  },
  {
    path: "/signup",
    page: SignUpPage,
    isShowHeader: false,
    isProtected: false,
    isShowSideBar: false,
  },
  {
    path: "/home/:id",
    page: HomePage,
    isShowHeader: true,
    isProtected: true,
    isShowSideBar: true,
  },
  {
    path: "/home/main/:id",
    page: MainPage,
    isShowHeader: true,
    isProtected: true,
    isShowSideBar: true,
  },
  {
    path: "/profile/:id",
    page: ResponsiveDrawer,
    isShowHeader: false,
    isProtected: true,
    isShowSideBar: false,
  },
  {
    path: "/",
    page: LandingPage,
    isShowHeader: true,
    isProtected: false,
    isShowSideBar: false,
  },
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
    isProtected: false,
    isShowSideBar: false,
  },
];

export default routes;
