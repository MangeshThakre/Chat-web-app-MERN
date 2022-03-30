import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import NewContact from "./NewContact.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import "./add.css";
import IconButton from "@mui/material/IconButton";
function Add({ addToggle, setAddToggle }) {
  const [newContactToggle, setNewContactToggle] = useState(false);
  return (
    <div>
      <Card
        className="add"
        style={{
          height: "580px",
          width: "340px",
          backgroundColor: "#001e3c",
          color: "white",
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
              onClick={() => setNewContactToggle(!newContactToggle)}
            >
              <ListItemAvatar>
                <Avatar alt="New contact" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText style={{ margin: "10px" }} primary="New contact" />
            </ListItem>

            {newContactToggle ? <NewContact /> : ""}
            <ListItem button alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="New Group" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText style={{ margin: "10px" }} primary="New Group" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

export default Add;
