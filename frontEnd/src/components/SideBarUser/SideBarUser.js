import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useParams } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Sidebar = () => {
  const { id } = useParams();
  const [activeLink, setActiveLink] = useState("profile");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const Navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("account");
    Navigate("/");
  };

  return (
    <div className="bg-[#10375C] w-[200px] h-screen min-h-full">
      <ul className="py-4 font-bold">
        <li>
          <Link
            to={`/home/${id}`}
            className="block py-6 px-8 text-white text-lg"
            style={{
              color: activeLink === "main" ? "#2E80CE" : "white",
            }}
            onClick={() => handleLinkClick("main")}
          >
            <span className="mr-3">
              <HomeIcon className="text-white" />
            </span>
            Home
          </Link>
        </li>
        <li>
          <Link
            to={`/home/profile/${id}`}
            className="block py-6 px-8 text-white text-lg"
            style={{
              color: activeLink === "profile" ? "#2E80CE" : "white",
            }}
            onClick={() => handleLinkClick("profile")}
          >
            <span className="mr-3">
              <AccountCircleIcon className="text-white" />
            </span>
            Profile
          </Link>
        </li>

        <li>
          <Link
            to={`/home/courses/${id}`}
            className="block py-6 px-8 text-white text-lg"
            style={{
              color: activeLink === "courses" ? "#2E80CE" : "white",
            }}
            onClick={() => handleLinkClick("courses")}
          >
            <span className="mr-3">
              <LockResetIcon className="text-white" />
            </span>
            Password
          </Link>
        </li>

        <li>
          <span
            to={`/home/courses/${id}`}
            className="block py-6 px-8 cursor-pointer text-white text-lg"
            style={{
              color:
                activeLink !== "main" &&
                activeLink !== "profile" &&
                activeLink !== "courses"
                  ? "#2E80CE"
                  : "white",
            }}
            onClick={handleLogout}
          >
            <span className="mr-3">
              <ExitToAppIcon className="text-white" />
            </span>
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
