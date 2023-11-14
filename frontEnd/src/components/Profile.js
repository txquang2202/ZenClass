import * as React from "react";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockResetIcon from "@mui/icons-material/LockReset";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Facebook, Google } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const drawerWidth = 210;
function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const userData = JSON.parse(sessionStorage.getItem("account"));
  const [avatar, setAvatar] = useState(null);
  const date = new Date(userData.userData.birthdate)
    .toISOString()
    .split("T")[0];
  const [formData, setFormData] = useState({
    fullname: userData.userData.fullname,
    username: userData.userData.username,
    birthdate: date,
    gender: userData.userData.gender,
    phone: userData.userData.phone,
    mail: userData.userData.email,
    street: userData.userData.street,
    city: userData.userData.city,
    img: userData.userData.img,
  });

  const Navigate = useNavigate();
  const { id } = useParams();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = () => {
    sessionStorage.removeItem("account");
    Navigate("/");
  };
  const handleCancel = () => {};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      //setAvatar(URL.createObjectURL(file));
      setAvatar(file);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log(formData, avatar);
  // };
  const handleEditProfile = async () => {
    try {
      const data = new FormData();

      // Append text fields to FormData
      data.append("fullname", formData.fullname);
      data.append("username", formData.username);
      data.append("birthdate", formData.birthdate);
      data.append("gender", formData.gender);
      data.append("phone", formData.phone);
      data.append("mail", formData.mail);
      data.append("street", formData.street);
      data.append("city", formData.city);
      data.append("img", avatar);

      const response = await axios.put(
        `http://localhost:8080/api/v1/editprofile/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  //sidebar
  const drawer = (
    <div className="bg-[#10375C] h-screen text-white">
      <List className="text-center  bg-[#10375C]">
        <ListItem>
          <Link to="/home">
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon className="text-white" />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                primaryTypographyProps={{
                  fontSize: "sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl", // Responsive font size
                  fontWeight: "bold",
                }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <Divider className="bg-white-200" />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Profile" className="text-blue-400" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <LockResetIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Password" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Setting" />
          </ListItemButton>
        </ListItem>
        <Divider className="bg-white-200" />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <ExitToAppIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Logout" onClick={handleLogout} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  // useEffect(() => {
  //   const userData = JSON.parse(sessionStorage.getItem("account"));
  //   console.log(formData);
  //   if (userData) {
  //     const storedName = userData.userData.username;
  //     const storedEmail = userData.userData.email;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       username: storedName,
  //       mail: storedEmail,
  //     }));
  //     console.log(formData);
  //   }
  // }, []);

  return (
    <Box sx={{ display: "flex", background: "#f5f6fa", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "none",
        }}
        className="bg-blue-500 bg-opacity-0"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon className="text-black" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* EDIT PROFILE */}
        <Container className="w-full lg:max-w-[calc(100%-6rem)] mx-auto">
          <Grid container spacing={3}>
            {/* Left Grid */}
            <Grid item xs={12} sm={12} md={3}>
              <Paper
                elevation={3}
                style={{ height: "100%", padding: "26px 34px" }}
              >
                <div className="account-settings">
                  <div className="user-profile mx-0 mb-1 pb-1 text-center">
                    <div className="user-avatar mb-1">
                      <label
                        htmlFor="avatarInput"
                        className="block cursor-pointer"
                      >
                        <Avatar
                          alt="Avatar"
                          src={avatar || "/path/to/default-avatar.jpg"}
                          className="w-[150px] h-[150px] object-cover mx-auto max-w-full max-h-full border-2 border-white-500 rounded-full shadow-md "
                        />
                        <input
                          type="file"
                          accept="image/*"
                          id="avatarInput"
                          name="avatar"
                          onChange={handleAvatarChange}
                          className="hidden" // Ẩn thẻ input mặc định
                        />
                      </label>
                    </div>
                    <Typography
                      variant="h6"
                      className="user-name mt-2 mb-0 font-semibold text-[#10375C]"
                    >
                      {formData.username}
                    </Typography>
                    <Typography
                      variant="h8"
                      className="user-email text-sm font-normal text-gray-600"
                    >
                      {formData.mail}
                    </Typography>
                  </div>
                  <div className="about mt-8 text-center">
                    <Typography
                      variant="h5"
                      className="mb-4 text-[#10375C] font-semibold text-[22px]"
                    >
                      About
                    </Typography>
                    <Typography variant="body1" className="text-[16px]">
                      I'm {formData.username}. Full Stack Designer I enjoy
                      creating user-centric, delightful and human experiences.
                    </Typography>
                    <div className="text-center mt-5">
                      <Facebook
                        fontSize="large"
                        className="cursor-pointer text-blue-600 hover:text-blue-800 mx-2"
                      />
                      <Google
                        fontSize="large"
                        className="cursor-pointer text-red-600 hover:text-red-800 mx-2"
                      />
                    </div>
                  </div>
                </div>
              </Paper>
            </Grid>

            {/* Right Grid */}
            <Grid item xs={12} sm={12} md={9}>
              <Paper elevation={3} style={{ height: "100%", padding: "30px" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      className="text-primary text-[#10375C]"
                    >
                      Personal Details
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="fullname"
                      type="text"
                      placeholder="Enter full name"
                      variant="outlined"
                      value={formData.fullname}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="username"
                      disabled
                      placeholder="Username"
                      variant="outlined"
                      value={formData.username}
                      fullWidth
                      className="bg-gray-200"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="birthdate"
                      name="birthdate" // add name attribute
                      label="Date of Birth"
                      variant="outlined"
                      value={formData.birthdate}
                      onChange={handleChange}
                      fullWidth
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <select
                      id="gender"
                      name="gender" // add name attribute
                      className="border-2 p-[16px] w-full rounded-md"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="phone"
                      type="text"
                      placeholder="Enter phone number"
                      variant="outlined"
                      value={formData.phone}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="mail"
                      variant="outlined"
                      placeholder="Enter mail"
                      className="bg-gray-200"
                      value={formData.mail}
                      disabled
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      className="mt-6 text-primary text-[#10375C]"
                    >
                      Address
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="street"
                      label="Street"
                      variant="outlined"
                      value={formData.street}
                      onChange={handleChange}
                      fullWidth
                      placeholder="Enter Street"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="city"
                      label="City"
                      variant="outlined"
                      value={formData.city}
                      onChange={handleChange}
                      fullWidth
                      placeholder="Enter City"
                    />
                  </Grid>
                </Grid>

                {/* BUTTON */}
                <Grid container spacing={4} className="mt-1">
                  <Grid item xs={12}>
                    <div className="text-right">
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: "10px", borderRadius: "5px" }}
                        className="bg-red-700 hover:bg-red-600 text-white rounded-md px-4 py-2 mr-2"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: "5px" }}
                        className="bg-[#10375C] hover:bg-[#10375C]-100 text-white rounded-md px-4 py-2"
                        onClick={handleEditProfile}
                      >
                        Update
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
