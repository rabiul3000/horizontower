import { NavLink } from "react-router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { FaUserCircle } from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";

const SidebarUser = () => {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/dashboard" end>
          <ListItemIcon>
            <FaUserCircle size={20} />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/dashboard/announcements" end >
          <ListItemIcon>
            <MdAnnouncement size={20} />
          </ListItemIcon>
          <ListItemText primary="Announcement" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default SidebarUser;
