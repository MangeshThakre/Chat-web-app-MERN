import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./Addparticapents.css";
import { useState } from "react";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
const TOKEN = localStorage.getItem("Token");

function Addparticapents({
  setaddParticapentsToggle,
  currentlyChatingWith,
  currentMember,
  contactList,
  setCurrentlyChatingWith,
  setReloadContactlist,
}) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  if (currentMember !== currentlyChatingWith._id)
    setaddParticapentsToggle(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  var contactOnly = contactList.filter((e) => e.type == "PRIVATE");
  var newContact = [];
  for (const element of contactOnly) {
    if (!currentlyChatingWith.userIDs.includes(element.contactID))
      newContact.push(element);
  }

  const addmember = async () => {
    const newuserIds = checked.map((e) => {
      return e.contactID;
    });
    const response = await axios({
      method: "post",
      url: "http://localhost:8081/addgroupmember",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      data: {
        _id: currentlyChatingWith._id,
        userIds: [...currentlyChatingWith.userIDs, ...newuserIds],
      },
    });
    const data = await response.data;

    setCurrentlyChatingWith(data);
    setReloadContactlist(true);
    setOpen(true);
  };

  return (
    <div className="Addparticapents">
      <div className=" AddparticapentsHeader">
        <span>
          <IconButton style={{ color: "white" }}>
            <ArrowBackIcon onClick={() => setaddParticapentsToggle(false)} />
          </IconButton>
        </span>
        <div style={{ marginLeft: "28px" }}>
          <h3>{currentlyChatingWith.name}</h3>

          <p>Add Particapants</p>
        </div>
      </div>

      <>
        <List
          style={{
            height: "450px",
            // width: "340px",
            backgroundColor: "#001e3c",
            color: "white",
            overflowY: "scroll",
          }}
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {newContact.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem
                key={value._id}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${value + 1}`}
                      src={
                        value.profilePic
                          ? `http://localhost:8081/${value.profilePic}`
                          : ""
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={value.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          successfuly added
        </Alert>
      </Snackbar>
      <div className=" AddparticapentsFooter">
        <IconButton
          button
          sx={{ color: "green" }}
          disabled={checked.length === 0}
          onClick={() => addmember()}
        >
          <AddCircleIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </div>
    </div>
  );
}

export default Addparticapents;
