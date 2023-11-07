import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  const [user, setUser] = useState("duy");

  return (
    <AppBar position="static" className="bg-[#10375C]  ">
      <Toolbar className="w-full lg:max-w-[calc(100%-12rem)] mx-auto">
        <Link
          to="/"
          className="text-white text-2xl lg:text-3xl flex-grow font-bold"
        >
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          Home.
        </Link>
        {user ? (
          <>
            <Typography
              variant="h6"
              className="text-white text-base lg:text-lg"
            >
              Hi, <span className="text-base">{user}</span>
            </Typography>
            <Button
              className="text-white ml-4 bg-[#2E80CE] rounded-full capitalize"
              variant="contained"
              color="inherit"
              // component={Link}
              // to="/signup"
            >
              Log out
            </Button>
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
  );
};

export default NavBar;
