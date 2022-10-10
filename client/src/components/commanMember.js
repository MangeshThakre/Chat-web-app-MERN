import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

function CommanMember({ contactList, contactID }) {
  const URL = process.env.REACT_APP_API_URL;

  const group = contactList.filter(
    (e) => e.type == "GROUP" && e.userIDs.some((e) => e.userId == contactID)
  );

  return (
    <div className="commanMember">
      <p style={{ padding: "5px", margin: "0" }}>
        {" "}
        common in {group.length} group
      </p>
      <List>
        {group.map((e) => {
          return (
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  alt="name"
                  src={e?.profilePic ? URL + "/" + e?.profilePic : null}
                />
              </ListItemAvatar>
              <ListItemText style={{ margin: "10px" }} primary={e.name} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default CommanMember;
