import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  const [user, setUser] = useState(null);

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" className="text-white text-2xl flex-grow">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          Home
        </Link>
        {user ? (
          <>
            <Typography variant="h6" className="text-white">
              Hi, <span className="font-bold">{user}</span>
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/logout"
            >
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/signin"
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/signup"
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
