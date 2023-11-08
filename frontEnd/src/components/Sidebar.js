import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <List className="p-0">
        <ListItem
          button
          component={Link}
          to="/page1"
          className="px-4 py-2 hover:bg-blue-500"
        >
          <ListItemText primary="Page 1" className="" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/page2"
          className="px-4 py-2 hover:bg-blue-500"
        >
          <ListItemText primary="Page 2" className="" />
        </ListItem>
        {/* Add more sidebar items as needed */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
