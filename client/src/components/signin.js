import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TOKEN } from "../redux/reduxToken/currentUserSplice.js";
import md5 from "md5";
function Signin() {
  const URL = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phoneNo, setphoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(false);
  const [passWarnint, setPasswarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function signIn(useremail_phone, userpass) {
    setIsLoading(true);
    var data;
    if (useremail_phone.includes(".com")) {
      data = {
        email: useremail_phone.toLowerCase(),
        password: md5(userpass),
      };
    } else {
      data = {
        email: useremail_phone.toLowerCase(),
        password: md5(userpass),
      };
    }

    try {
      const response = await axios({
        method: "post",
        url: URL + "/signin",
        headers: { "content-type": "application/json" },
        data: data,
      });
      const responseData = await response.data.Token;
      setIsLoading(false);
      if (responseData === "invalid") {
        setWarning(true);
        setPasswarning(true);
      } else {
        localStorage.setItem("Token", responseData);
        dispatch(TOKEN(responseData));
        setphoneNo("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const style = { margin: "10px  0" };

  return (
    <div>
      <Card
        sx={{
          backgroundColor: "#001e3c",
          borderRadius: "10px",
          width: " 400px",
        }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: "0", right: "0" }}>
              {isLoading ? <CircularProgress /> : " "}
            </div>
            <div style={style}>
              <TextField
                sx={{
                  input: { color: "white", width: "300px" },
                  label: { color: "#1873ce" },
                }}
                error={warning}
                id="filled-error-helper-text"
                label="Phone no. or Email"
                defaultValue={phoneNo}
                placeholder="phone No or Email"
                autoComplete="false"
                variant="standard"
                onChange={(e) => {
                  setphoneNo(e.target.value);
                  setWarning(false);
                }}
              />
            </div>
            <div style={style}>
              <TextField
                error={passWarnint}
                sx={{
                  input: { color: "white", width: "300px" },
                  label: { color: "#1873ce" },
                }}
                id="filled-error-helper-text"
                label="Password"
                type="password"
                defaultValue={password}
                placeholder="******"
                autoComplete="false"
                variant="standard"
                inputProps={{ minLength: 6 }}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setWarning(false);
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button
                style={{ marginTop: "5px", width: "228px" }}
                variant="contained"
                color="primary"
                disabled={(phoneNo !== "") & (password !== "") ? false : true}
                onClick={() => {
                  if (password.length < 6) {
                    alert("password must have minimum 6 characters");
                  } else {
                    signIn(phoneNo, password);
                  }
                }}
              >
                Sign in
              </Button>
              <Button
                style={{ marginTop: "5px", width: "228px" }}
                variant="contained"
                color="error"
                onClick={() => {
                  signIn("userone@gmail.com", "111111");
                }}
              >
                Guest user
              </Button>
              <Button
                style={{
                  marginTop: "5px",
                  width: "228px",
                }}
                variant="contained"
                color="error"
                onClick={() => {
                  signIn("usertwo@gmail.com", "111111");
                }}
              >
                Guest user
              </Button>
            </div>
          </div>
          <div style={{ color: "white" }}>
            <p>
              Create a new account
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </p>
            <Link to="/reset">
              <Button> I forgot my password</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signin;
