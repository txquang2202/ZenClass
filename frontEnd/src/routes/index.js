import LandingPage from "../Pages/LandingPage/LandingPage";
import SignUpPage from "../components/SignUp/SignUp";
import SignInPage from "../components/SignIn/SignIn";
import HomePage from "../Pages/HomePage/HomePage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import ResponsiveDrawer from "../components/Profile";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import DetailLayout from "../layouts/DetailLayout/DetailLayout";
import ClassPage from "../Pages/ClassPage/ClassPage";
import CoursePage from "../Pages/CoursePage/CoursePage";
import DetailPage from "../Pages/DetailPage/DetailPage";
import PeoplePage from "../Pages/PeoplePage/PeoplePage";
import HomeWorkPage from "../Pages/HomeWorkPage/HomeWorkPage";
import ServerErrorPage from "../Pages/ServerErrorPage/ServerErrorPage";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";

const routes = [
  {
    path: "/signin",
    page: SignInPage,
    layout: null,
    isProtected: false,
  },
  {
    path: "/signup",
    page: SignUpPage,
    layout: null,
    isProtected: false,
  },
  {
    path: "/forgot-password",
    page: ForgotPassword,
    layout: null,
    isProtected: false,
  },
  {
    path: "/home/:id",
    page: HomePage,
    layout: HomeLayout,
    isProtected: true,
  },
  {
    path: "/home/classes/:id",
    page: ClassPage,
    layout: HomeLayout,
    isProtected: true,
  },
  {
    path: "/home/courses/:id",
    page: CoursePage,
    layout: HomeLayout,
    isProtected: true,
  },
  {
    path: "/home/classes/detail/:id",
    page: DetailPage,
    layout: DetailLayout,
    isProtected: true,
  },
  {
    path: "/home/classes/detail/people/:id",
    page: PeoplePage,
    layout: DetailLayout,
    isProtected: true,
  },
  {
    path: "/home/classes/detail/homework/:id",
    page: HomeWorkPage,
    layout: DetailLayout,
    isProtected: true,
  },
  {
    path: "/home/",
    page: HomePage,
    layout: HomeLayout,
    isProtected: true,
  },
  {
    path: "/profile/:id",
    page: ResponsiveDrawer,
    layout: null,
    isProtected: true,
  },
  {
    path: "/",
    page: LandingPage,
    isProtected: false,
  },
  {
    path: "*",
    page: NotFoundPage,
    layout: null,
    isProtected: false,
  },
  {
    path: "500",
    page: ServerErrorPage,
    layout: null,
    isProtected: false,
  },
];

export default routes;
