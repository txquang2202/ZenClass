import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useParams } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import { useNotificationContext } from "../../context/NotificationContext";

function Noti(props) {
  const { menuItemsData } = useNotificationContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const { id } = useParams();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleMenu}
      >
        <Badge badgeContent={3} color="error">
          <NotificationsIcon className="text-white" />
        </Badge>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            maxHeight: "400px", // Set your desired max height here
            overflowY: "auto",
          },
        }}
      >
        <div className="w-[350px]">
          <header className="px-4 sticky top-0 bg-white z-10 pt-3 pb-3">
            <h3 className="text-base font-semibold text-[#10375c] ">
              Notifications
            </h3>
          </header>
          <hr className="text-gray-200 h-1" />
          <div className="mt-2 px-2 space-y-4">
            {menuItemsData.map((item) => (
              <MenuItem key={item.id}>
                <Link to={"#"}>
                  <div className="flex rounded-lg">
                    <Avatar
                      alt={item.name}
                      src={item.avatarSrc}
                      className="ml-[-10px] mt-2 h-12 w-12"
                    />
                    <div className="ml-3">
                      <span className="font-semibold">{item.name} </span>
                      <p
                        className="text-base inline"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {item.content}
                      </p>
                      <span className="text-[#10375c] font-bold text-sm block mt-2">
                        {item.timestamp}
                      </span>
                    </div>
                  </div>
                </Link>
              </MenuItem>
            ))}
          </div>
          <footer className=" py-2 mt-auto bg-white text-center sticky bottom-0 text-base">
            <Link
              to={`/home/notifications/${id}`}
              className="text-[#10375c] font-medium hover:underline"
              onClick={() => handleClose()}
            >
              See all
            </Link>
          </footer>
        </div>
      </Menu>
    </>
  );
}

export default Noti;
