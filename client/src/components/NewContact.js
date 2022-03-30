import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import { useSelector, useDispatch } from "react-redux";
import md5 from "md5";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { ROOMID } from "../redux/reduxToken/currentUserSplice.js";
import CircularProgress from "@mui/material/CircularProgress";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import axios from "axios";
function NewContact() {
  const dispatch = useDispatch();
  const [contactName, setContactName] = useState("");
  const [contactPhoneNo, setContactPhoneNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const TOKEN = localStorage.getItem("Token");
  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  const phoneNo = USERDATA.phoneNo;
  const roomId = md5(phoneNo + "_" + contactPhoneNo);
  dispatch(ROOMID(roomId));
  const addNewContact = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8081/newContact",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: { contactName, contactPhoneNo, phoneNo },
      });
      const data = await response.data;
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <Card
        style={{
          backgroundColor: "#071a2e",
          color: "white",
          lineHeight: "4",
        }}
      >
        <CardContent>
          <div>
            <TextField
              required
              id="standard-required"
              label="Name"
              value={contactName}
              variant="standard"
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <Box sx={{ color: "white", display: "flex", alignItems: "flex-end" }}>
            <TextField
              id="input-with-sx"
              label="Phone No."
              variant="standard"
              type="number"
              value={contactPhoneNo}
              onChange={(e) => setContactPhoneNo(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => addNewContact()}
          >
            {isLoading ? <CircularProgress /> : " "}
            Add Contact
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewContact;
