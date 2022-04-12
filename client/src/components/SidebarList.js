import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import md5 from "md5";

function SidebarList({ contact, setCurrentlyChatingWith }) {
  const URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  const phoneNo = USERDATA.phoneNo;
  const contactPhoneNo = contact.phoneNo;
  const existingroomId = md5(contactPhoneNo + "_" + phoneNo);
  const newroomId = md5(phoneNo + "_" + contactPhoneNo);
  var roomId;
  const room = () => {
    if (contact?.type == "GROUP") {
      roomId = contact.roomId[0];
    } else {
      roomId = contact.roomId.find((e) => {
        if (e === existingroomId) {
          return e;
        } else if (e === newroomId) {
          return e;
        }
      });
    }

    navigate(`/roomId/${roomId}`);
    setCurrentlyChatingWith(contact);
  };

  return (
    <div>
      <Box>
        <ListItem button alignItems="flex-start" onClick={() => room()}>
          <ListItemAvatar>
            <Avatar
              alt={contact.name}
              src={contact.profilePic ? URL + "/" + contact.profilePic : null}
            />
          </ListItemAvatar>
          <ListItemText style={{ margin: "10px" }} primary={contact.name} />
        </ListItem>
        <Divider variant="inset" component="li" color="primary" />
      </Box>
    </div>
  );
}

export default SidebarList;
