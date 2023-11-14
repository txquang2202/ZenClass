import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState(false);
  const Navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("account"));
    if (userData) {
      setUser(true);
    }
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem("account");
    setUser(false);
    setAnchorEl(null);
    Navigate("/");
  };
  return (
    <nav className="bg-[#10375C] pt-4 pb-3 font-sans sticky top-0 z-10">
      <div className="container w-full lg:max-w-[calc(100%-20rem)] mx-auto">
        <div className="flex items-center justify-between">
          <Link to="#" className="text-white text-lg">
            ZenClass
          </Link>
          <div className="flex items-center space-x-4 gap-12">
            <Link to="#!" className="text-white">
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
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white cursor-pointer">Name</span>
                <Avatar
                  alt="User Avatar"
                  src="URL_TO_USER_AVATAR"
                  onClick={handleMenu}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    // vertical: "bottom", // Chỉnh đỉnh menu xuất hiện ở phía dưới người dùng
                    horizontal: "left", // Chỉnh menu xuất hiện từ phía trái
                  }}
                  transformOrigin={{
                    vertical: "top", // Chỉnh đỉnh menu xuất hiện ở phía trên người dùng
                    // horizontal: "right", // Chỉnh menu xuất hiện từ phía phải
                  }}
                  className="mt-12"
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
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
