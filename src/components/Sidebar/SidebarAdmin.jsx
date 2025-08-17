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
import { GrOverview } from "react-icons/gr";

const SidebarAdmin = () => {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/dashboard" end>
          <ListItemIcon><FaUserShield size={20} /></ListItemIcon>
          <ListItemText primary="Admin Profile" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/dashboard/overview" end>
          <ListItemIcon><GrOverview  size={20} /></ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/dashboard/manage_members" end>
          <ListItemIcon><MdGroups size={20} /></ListItemIcon>
          <ListItemText primary="Manage Members" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/dashboard/announcements" end>
          <ListItemIcon><MdAnnouncement size={20} /></ListItemIcon>
          <ListItemText primary="All Announcements" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/dashboard/make_announcement" end>
          <ListItemIcon><MdAnnouncement size={20} /></ListItemIcon>
          <ListItemText primary="Make Announcement" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/dashboard/agreement_requests" end>
          <ListItemIcon><RiFileList2Line size={20} /></ListItemIcon>
          <ListItemText primary="Agreement Requests" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/dashboard/manage_coupons" end>
          <ListItemIcon><RiCoupon2Line size={20} /></ListItemIcon>
          <ListItemText primary="Manage Coupons" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default SidebarAdmin;
