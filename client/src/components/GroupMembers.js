import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const TOKEN = localStorage.getItem("Token");

function GroupMembers({
  currentlyChatingWith,
  setaddParticapentsToggle,
  setcurrentMember,
}) {
  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  const [groupMembers, setGroutMembers] = useState([]);
  setcurrentMember(currentlyChatingWith._id);
  useState(() => {
    async function allMembers() {
      const response = await axios({
        method: "post",
        url: "http://localhost:8081/allMembers",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: { userIDs: currentlyChatingWith.userIDs },
      });

      const data = await response.data;
      setGroutMembers(data);
    }
    allMembers();
  }, []);

  return (
    <div>
      <div className="GroupMembers">
        <p style={{ margin: "0", fontSize: "12px" }}>
          {/* {currentlyChatingWith?.userIDs.length + " particapents"} */}
        </p>
        <div>
          <List>
            <ListItem
              button
              alignItems="flex-start"
              sx={{ color: "green" }}
              onClick={() => setaddParticapentsToggle(true)}
            >
              <ListItemAvatar>
                <PersonAddIcon sx={{ fontSize: 30 }} />
              </ListItemAvatar>
              <ListItemText
                style={{ margin: "10px", color: "white" }}
                primary="Add participants"
              />
            </ListItem>

            {groupMembers.map((member) => {
              return (
                <ListItem key={member._id}>
                  <ListItemAvatar>
                    <Avatar
                      alt="name"
                      src={
                        member?.profilePic
                          ? "http://localhost:8081/" + member?.profilePic
                          : null
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    style={{ margin: "10px" }}
                    primary={
                      USERDATA._id == member._id ? "You" : member.firstName
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    </div>
  );
}

export default GroupMembers;
