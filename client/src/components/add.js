import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import NewContact from "./NewContact.js";
import NewGroup from "./NewGroup.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import "./add.css";
import IconButton from "@mui/material/IconButton";
function Add({
  addToggle,
  setAddToggle,
  contactList,
  setCurrentlyChatingWith,
  setReloadContactlist,
}) {
  const [newContactToggle, setNewContactToggle] = useState(false);
  const [newGroup, setNewGroup] = useState(false);
  return (
    <div>
      <Card
        className="add"
        style={{
          height: "579px",
          width: "309px",
          backgroundColor: "#001e3c",
          color: "white",
          borderTopLeftRadius: "10px",
          WebkitBorderBottomLeftRadius: "10px",
          boxShadow: "rgb(0 0 0 / 35%) 0px 5px 15px",
        }}
      >
        <div style={{ height: "80px", width: "340px" }}>
          <div
            style={{
              display: "flex",
              padding: "32px 0px  20px 15px",
              backgroundColor: "#071a2e",
            }}
          >
            <span>
              <IconButton
                style={{ color: "white" }}
                aria-label="back"
                component="span"
              >
                <ArrowBackIcon onClick={() => setAddToggle(!addToggle)} />
              </IconButton>
            </span>
            <h3 style={{ margin: "0px 0px 0px 15px" }}>New chat</h3>
          </div>
        </div>
        <CardContent>
          <List>
            <ListItem
              button
              alignItems="flex-start"
              onClick={() => {
                setNewContactToggle(!newContactToggle);
                setNewGroup(false);
              }}
            >
              <ListItemAvatar>
                <PersonAddIcon sx={{ fontSize: 30 }} />
              </ListItemAvatar>
              <ListItemText style={{ margin: "10px" }} primary="New contact" />
            </ListItem>

            {newContactToggle ? (
              <NewContact
                setCurrentlyChatingWith={setCurrentlyChatingWith}
                setReloadContactlist={setReloadContactlist}
              />
            ) : (
              ""
            )}
            <ListItem
              button
              alignItems="flex-start"
              onClick={() => {
                setNewContactToggle(false);
                setNewGroup(!newGroup);
              }}
            >
              <ListItemAvatar>
                <GroupsIcon sx={{ fontSize: 30 }} />
              </ListItemAvatar>
              <ListItemText style={{ margin: "10px" }} primary="New Group" />
            </ListItem>
            {newGroup ? (
              <NewGroup
                contactList={contactList}
                setCurrentlyChatingWith={setCurrentlyChatingWith}
                setReloadContactlist={setReloadContactlist}
              />
            ) : null}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

export default Add;
