import React from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import "./sidebar.css";
import SidebarList from "./SidebarList";
import { height } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
function Sidebar({ contactList, setCurrentlyChatingWith }) {
  // setCurrentlyChatingWith(["hello"]);
  return (
    <div className="sidebar">
      <List
        sx={{
          width: "80%",
        }}
      >
        {contactList.map((contact) => (
          <div key={contact._id}>
            <SidebarList
              contact={contact}
              setCurrentlyChatingWith={setCurrentlyChatingWith}
            />
          </div>
        ))}
      </List>
    </div>
  );
}

export default Sidebar;
