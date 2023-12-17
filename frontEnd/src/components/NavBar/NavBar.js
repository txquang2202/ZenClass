import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import { getUserID } from "../../services/userServices";
import { jwtDecode } from "jwt-decode";
import Noti from "../Noti/Noti";
import LanguageSwitcher from "../SwitchLanguage/SwitchLanguage";

const getUser = () => {
  const data = localStorage.getItem("user");
  if (data !== null) {
    const user = JSON.parse(data);
    if (user !== null) {
      return user;
    }
  }
  return null;
}

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState(getUser());

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get("token");
        if (token === null) {
          token = localStorage.getItem("token");
        }

        if (token !== null) {
          const session = jwtDecode(token);
          const response = await getUserID(session._id, token);
          const userData = response.data.user;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userData));
        }

        const data = localStorage.getItem("user");
        if (data !== null) {
          const user = JSON.parse(data);
          if (user !== null) {
            setUser(user);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/500");
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <nav className="bg-[#10375C] pt-3 pb-2 font-sans sticky top-0 z-10">
      <div className="container w-full lg:max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between space-x-4 ">
          <div>
            <Link to="/" className="text-white text-lg">
              ZenClass
            </Link>
          </div>
          {/* <LanguageSwitcher /> */}
          <div className="flex items-center justify-between space-x-4 lg:gap-12">
            <Link to={`/home/${user?._id}`} className="text-white">
              Home
            </Link>
            <Link to="#!" className="text-white">
              About
            </Link>
            <Link to="#!" className="text-white">
              Services
            </Link>
            <Link to="#!" className="text-white">
              Contact
            </Link>
          </div>
          <div className="flex items-center justify-between space-x-4">
            {user !== null ? (
              <>
                <Noti />
                <span className="text-white cursor-pointer">
                  {user.username}
                </span>
                <Avatar
                  alt="User Avatar"
                  src={`/assets/imgs/${user.img}`}
                  onClick={handleMenu}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  className="cursor-pointer"
                />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                  }}
                  className="mt-12"
                >
                  <Link to={`/profile/${user._id}`}>
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={handleClose}>Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-white">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-[#2E80CE] px-4 py-2 rounded-full"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
