import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Avatar from "@mui/material/Avatar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
function GroupMembers({ currentlyChatingWith }) {
  return (
    <div>
      <div className="GroupMembers">
        <p style={{ margin: "0", fontSize: "12px" }}>4 particapents</p>
        <div>
          <List>
            <ListItem button alignItems="flex-start" sx={{ color: "green" }}>
              <ListItemAvatar>
                <PersonAddIcon sx={{ fontSize: 30 }} />
              </ListItemAvatar>
              <ListItemText
                style={{ margin: "10px", color: "white" }}
                primary="New contact"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="name" src="" />
              </ListItemAvatar>
              <ListItemText style={{ margin: "10px" }} primary="name" />
            </ListItem>
          </List>
        </div>
      </div>

      <div className="leaveGroup">
        <ListItem button sx={{ color: "red" }}>
          <ExitToAppIcon />
          <ListItemText style={{ margin: "10px" }} primary="leave Group" />
        </ListItem>
      </div>
    </div>
  );
}

export default GroupMembers;
