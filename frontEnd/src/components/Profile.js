import * as React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockResetIcon from "@mui/icons-material/LockReset";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DatePicker } from "@mui/lab";
import { Facebook, Google } from "@mui/icons-material";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";

const drawerWidth = 210;

const options = ["Male", "Female", "Other"];

function ControllableStates() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        renderInput={(params) => <TextField {...params} label="Gender" />}
      />
    </div>
  );
}

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [avatar, setAvatar] = useState(null);
  const Navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = () => {
    sessionStorage.removeItem("account");
    Navigate("/");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData, avatar);
  };

  //sidebar
  const drawer = (
    <div className="bg-[#10375C] h-screen text-white">
      <List className="text-center  bg-[#10375C]">
        <ListItem>
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
        </ListItem>
        <Divider className="bg-white-200" />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
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
                      Yuki Hayashi
                    </Typography>
                    <Typography
                      variant="h8"
                      className="user-email text-sm font-normal text-gray-600"
                    >
                      yuki@Maxwell.com
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
                      I'm Yuki. Full Stack Designer I enjoy creating
                      user-centric, delightful and human experiences.
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
                      id="fullName"
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter full name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="lastName"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter last name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="birthdate"
                      label="Date of Birth"
                      variant="outlined"
                      fullWidth
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ControllableStates />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="phone"
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter phone number"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="mail"
                      label="Mail"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter mail"
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
                      id="Street"
                      label="Street"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter Street"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="ciTy"
                      label="City"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter City"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={4} className="mt-1">
                  <Grid item xs={12}>
                    <div className="text-right">
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: "10px", borderRadius: "5px" }}
                        className="bg-red-700 hover:bg-red-600 text-white rounded-md px-4 py-2 mr-2"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: "5px" }}
                        className="bg-[#10375C] hover:bg-[#10375C]-100 text-white rounded-md px-4 py-2"
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
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
