import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const TOKEN = localStorage.getItem("Token");

function NewGroup({
  contactList,
  setCurrentlyChatingWith,
  setReloadContactlist,
}) {

  var contactOnly = [];
  for (const e of contactList) {
    if (e.type == "PRIVATE") contactOnly.push(e);
  }

  const navigation = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [checked, setChecked] = useState([]);
  const [preNext, setPreNext] = useState("next");
  const [base64Image, setBase64Image] = useState("");
  const [image, setImage] = useState([]);

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

  const upload = async (e) => {
    const newImage = e.target.files[0];
    setImage(newImage);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(newImage);
    await fileReader.addEventListener("load", () => {
      setBase64Image(fileReader.result);
    });
  };

  const handelCreate = async () => {
    var userIDs = checked.map((e) => {
      return e.contactID;
    });
    const formData = new FormData();
    formData.append("userIDs", userIDs);
    formData.append("groupName", groupName);
    formData.append("roomId", uuidv4());
    formData.append("groupImage", image);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8081/newgroup",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: formData,
      });

      const data = await response.data;
      setReloadContactlist(true);
      setCurrentlyChatingWith(data.result);
      navigation("/roomId/" + data.roomID);
      setGroupName("");
      setChecked([]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const pre = (
    <>
      select contact
      <List
        style={{
          height: "160px",
          // width: "340px",
          backgroundColor: "#001e3c",
          color: "white",
          overflowY: "scroll",
        }}
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {contactOnly.map((value) => {
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
      <div style={{ width: "100%" }}>
        <IconButton
          disabled={checked.length !== 0 ? false : true}
          sx={{ marginTop: "10px", color: "white" }}
          onClick={() => {
            setPreNext("pre");
          }}
        >
          <ArrowForwardIosIcon style={{ float: "right" }} />
        </IconButton>
      </div>
    </>
  );

  const next = (
    <>
      <div className="userImg">
        <img
          src={
            base64Image
              ? base64Image
              : "https://imageio.forbes.com/specials-images/imageserve/6240e81218e4f5d1deaf91c3/0x0.jpg?format=jpg&crop=1744,981,x0,y49,safe&width=1200"
          }
          alt="img"
        />

        <label id="icon-button-file" className="edit">
          <PhotoCameraIcon />
          <input
            type="file"
            accept="image/*"
            id="icon-button-file"
            onChange={(e) => {
              upload(e);
            }}
            style={{ display: "none" }}
          />
        </label>
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <TextField
          required
          id="standard-required"
          label="Group Name"
          sx={{ input: { color: "white" } }}
          InputLabelProps={{
            style: { color: "#135ba3", borderBlockColor: "white" },
          }}
          value={groupName}
          variant="standard"
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <IconButton sx={{ color: "white" }} onClick={() => setPreNext("next")}>
          <ArrowBackIosIcon sx={{ marginTop: "4px" }} />
        </IconButton>
        <Button
          sx={{ height: "40px" }}
          edge="end"
          disabled={(checked.length !== 0) & (groupName !== "") ? false : true}
          variant="outlined"
          color="primary"
          onClick={() => handelCreate()}
        >
          Create Group
        </Button>
      </div>
    </>
  );

  return (
    <div>
      <Card
        style={{
          backgroundColor: "#071a2e",
          color: "white",
          lineHeight: "4",
          borderRadius: " 10px",
        }}
      >
        <CardContent>{preNext == "next" ? pre : next}</CardContent>
      </Card>
    </div>
  );
}
export default NewGroup;
