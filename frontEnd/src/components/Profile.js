import * as React from "react";
import PropTypes from "prop-types";
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
import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [avatar, setAvatar] = useState(null); // State để lưu trữ hình ảnh avatar

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
      setAvatar(URL.createObjectURL(file)); // Lưu hình ảnh avatar vào state
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi biểu mẫu ở đây, bao gồm cả hình ảnh avatar (trong state `avatar`)
    console.log(formData, avatar);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "none",
        }}
        className="bg-blue-500 bg-opacity-50"
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
        <Container
          component="main"
          maxWidth="xs"
          className="grid grid-flow-row-dense grid-cols-3 w-full lg:max-w-[calc(100%-6rem)] mx-auto gap-4 mt-[100px]"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <label htmlFor="avatarInput" className="block cursor-pointer">
              <Avatar
                alt="Avatar"
                src={avatar || "/path/to/default-avatar.jpg"}
                className="w-40 h-40 object-cover mx-auto max-w-full max-h-full mt-[-100px] border-2 border-white-500 rounded-full shadow-md "
              />
              <input
                type="file"
                accept="image/*"
                id="avatarInput"
                name="avatar"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <div className="mt-6 text-blue-500 font-semibold text-lg">
                Yuki Hayashi
              </div>
            </label>
          </div>

          <div class="col-span-2 bg-white p-8 rounded-lg shadow-lg">
            <form noValidate onSubmit={handleSubmit}>
              <div className="mt-4">
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-6">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
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
