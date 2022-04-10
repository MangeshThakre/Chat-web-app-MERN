import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import { useSelector, useDispatch } from "react-redux";
import md5 from "md5";
import { IMaskInput } from "react-imask";

import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { ROOMID } from "../redux/reduxToken/currentUserSplice.js";
import CircularProgress from "@mui/material/CircularProgress";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

function NewContact({ setCurrentlyChatingWith, setReloadContactlist }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contactName, setContactName] = useState("");
  const [contactPhoneNo, setContactPhoneNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertText, setAlertText] = useState("");
  const TOKEN = localStorage.getItem("Token");

  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  const phoneNo = USERDATA.phoneNo;
  const roomId = md5(phoneNo + "_" + contactPhoneNo);
  dispatch(ROOMID(roomId));
  const addNewContact = async () => {
    const phone = Number(
      phoneNo
        .replace("-", "")
        .replace(" ", "")
        .replace(")", "")
        .replace("(", "")
    );

    setIsLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8081/newContact",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: { contactName, contactPhoneNo, phoneNo: phone },
      });
      const data = await response.data;
      setContactName("");
      setContactPhoneNo("");
      setReloadContactlist(true);
      if (data?.roomID) {
        setShowError(true);
        setSeverity("success");
        setAlertText("Contact added successfuly");
        navigate("/roomId/" + data.roomID);
        setCurrentlyChatingWith(data.result);
      }
      if (data.response == "already exist") {
        setShowError(true);
        setSeverity("info");
        setAlertText("Contact already exist");
      }
      if (data.response == "contact not exist") {
        setShowError(true);
        setSeverity("error");
        setAlertText("contact not exist");
      }
      if (data.response == "You can't add yourself") {
        setShowError(true);
        setSeverity("error");
        setAlertText("You can't add yourself");
      }

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
          borderRadius: " 10px",
        }}
      >
        <CardContent>
          <div>
            <TextField
              required
              id="standard-required"
              label="Name"
              sx={{ input: { color: "white" }, label: { color: "#1873ce" } }}
              value={contactName}
              variant="standard"
              onChange={(e) => {
                setContactName(e.target.value);
                setShowError(false);
              }}
            />
          </div>
          {/* <TextField
            id="input-with-sx"
            label="Phone No."
            sx={{ input: { color: "white" } }}
            InputLabelProps={{
              style: { color: "#135ba3" },
            }}
            variant="standard"
            value={contactPhoneNo}
            onChange={(e) => {
              setContactPhoneNo(e.target.value);
              setShowError(false);
            }}
          /> */}
          <div>
            <InputLabel
              sx={{ color: "#1873ce" }}
              htmlFor="formatted-text-mask-input"
            >
              Phone-Number
            </InputLabel>
            <Input
              sx={{
                input: { color: "white" },
              }}
              placeholder="(100) 000-0000"
              value={contactPhoneNo}
              onChange={(e) => {
                setContactPhoneNo(e.target.value);
                setShowError(false);
              }}
              name="textmask"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom}
            />
          </div>

          <Button
            disabled={
              (contactName !== "") & (contactPhoneNo !== "") ? false : true
            }
            variant="outlined"
            color="primary"
            onClick={() => addNewContact()}
          >
            {isLoading ? <CircularProgress /> : " "}
            Add Contact
          </Button>
          <Collapse in={showError}>
            <Alert sx={{ backgroundColor: "#bababa00" }} severity={severity}>
              {alertText}
            </Alert>
          </Collapse>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewContact;
