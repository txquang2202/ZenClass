import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import axios from "axios";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState(false);
  const [name, setName] = useState("");
  const [avt, setAvt] = useState("");
  const [id, setId] = useState("");
  const Navigate = useNavigate();

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
        const session = JSON.parse(localStorage.getItem("account"));

        if (!session || !session.userData) {
          setUser(false);
          return;
        }
        setId(session.userData._id);
        const response = await axios.get(
          `http://localhost:8080/api/v1/getprofile/${session.userData._id}`
        );
        const userData = response.data.user;

        if (userData) {
          setUser(true);
        }

        if (userData.img) {
          setAvt(userData.img);
        } else {
          setAvt(null);
        }

        if (userData.username) {
          setName(userData.username);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/NotFound");
      }
    };

    fetchUserData();
  }, [id]);

  // useEffect(() => {
  //   const userData = JSON.parse(sessionStorage.getItem("account"));
  //   if (userData) {
  //     console.log(userData);
  //     const storedName = userData.userData.username;
  //     const storedAvt = userData.userData.img;
  //     const storedId = userData.userData._id;

  //     if (storedName) {
  //       setName(storedName);
  //     }

  //     if (storedAvt) {
  //       setAvt(storedAvt);
  //     }
  //     if (storedId) {
  //       setId(storedId);
  //     }
  //     setUser(true);
  //   }
  // }, []);
  const handleLogout = () => {
    localStorage.removeItem("account");
    setUser(false);
    setAnchorEl(null);
    Navigate("/");
  };
  return (
    <nav className="bg-[#10375C] pt-3 pb-2 font-sans sticky top-0 z-10 ">
      <div className="container w-full lg:max-w-[calc(100%-7rem)] mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-lg">
            ZenClass
          </Link>
          <div className="flex items-center space-x-4 gap-12">
            <Link to={`/home/${id}`} className="text-white">
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
                <span className="text-white cursor-pointer">{name}</span>
                <Avatar
                  alt="User Avatar"
                  src={`/assets/imgs/${avt}`}
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
                  <Link to={`/profile/${id}`}>
                    <MenuItem>Profile</MenuItem>
                  </Link>
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
