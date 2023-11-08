import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const NavBar = () => {
  const [user, setUser] = useState("null");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <AppBar position="static" className="bg-[#10375C] pt-2">
        <Toolbar className="w-full lg:max-w-[calc(100%-12rem)] mx-auto">
          <Link
            to="/home"
            className="text-white text-2xl lg:text-3xl flex-grow font-bold"
          >
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            Home.
          </Link>

          {user ? (
            <>
              <Typography variant="h10" className="text-white text-base">
                Hi, <span className="text-base">{user}</span>
              </Typography>
              <Avatar
                className="ml-4 w-10 h-10 object-cover cursor-pointer"
                alt="User Avatar"
                src="./assets/imgs/card.jpg"
                onClick={handleMenuClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleMenuClose}
                >
                  My Account
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <MenuItem
                  component={Link}
                  to="/signin"
                  onClick={handleMenuClose}
                >
                  Log Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                className="capitalize"
                variant="text"
                color="inherit"
                component={Link}
                to="/signin"
              >
                Log In
              </Button>
              <Button
                className="text-white ml-4 bg-[#2E80CE] rounded-full capitalize"
                variant="contained"
                color="inherit"
                component={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Use the Sidebar component here */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
};

export default NavBar;
