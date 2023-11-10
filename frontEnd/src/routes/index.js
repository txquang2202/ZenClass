import LandingPage from "../components/LandingPage";
import SignUpPage from "../components/SignUp";
import SignInPage from "../components/SignIn";
import HomePage from "../components/HomePage";
import NotFound from "../components/NotFound";
import ResponsiveDrawer from "../components/Profile";

const routes = [
  {
    path: "/signin",
    page: SignInPage,
    isShowHeader: true,
    isProtected: false,
  },
  {
    path: "/signup",
    page: SignUpPage,
    isShowHeader: true,
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
    page: NotFound,
    isShowHeader: false,
    isProtected: false,
  },
];

export default routes;
