import { NavLink } from "react-router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Icons
import { FaUserShield } from "react-icons/fa";
import { MdGroups, MdAnnouncement } from "react-icons/md";
import { RiFileList2Line, RiCoupon2Line } from "react-icons/ri";

const SidebarAdmin = () => {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="profile">
          <ListItemIcon><FaUserShield size={20} /></ListItemIcon>
          <ListItemText primary="Admin Profile" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="manage-members">
          <ListItemIcon><MdGroups size={20} /></ListItemIcon>
          <ListItemText primary="Manage Members" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="make-announcement">
          <ListItemIcon><MdAnnouncement size={20} /></ListItemIcon>
          <ListItemText primary="Make Announcement" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="agreement-requests">
          <ListItemIcon><RiFileList2Line size={20} /></ListItemIcon>
          <ListItemText primary="Agreement Requests" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="manage-coupons">
          <ListItemIcon><RiCoupon2Line size={20} /></ListItemIcon>
          <ListItemText primary="Manage Coupons" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default SidebarAdmin;
