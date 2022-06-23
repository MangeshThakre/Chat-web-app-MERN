import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import md5 from "md5";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import OTPInput from "otp-input-react";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

function Restet() {
  const navigation = useNavigate();
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState(false);
  const [OTP, setOTP] = useState("");
  const [actualOTP, setActualOTP] = useState("");
  const [passwordPage, setPasswordPage] = useState(false);
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const URL = process.env.REACT_APP_API_URL;

  const sendOTP = async () => {
    if (!email.includes("@gmail.com")) {
      setWarning(true);
    } else {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: URL + "/otp",
        headers: { "Content-type": "application/json" },
        data: { email: email.toLowerCase() },
      });
      const data = await response.data.otp;
      setActualOTP(data);
      setOpen(true);
      setIsLoading(false);
    }
  };

  const submmitOtp = () => {
    if (md5(Number(OTP)) == actualOTP) {
      setPasswordPage(true);
    } else {
      setShowError(true);
    }
  };

  const handelResetPass = async () => {
    if (password !== conformPassword) {
      setError(true);
    } else {
      try {
        const response = await axios({
          method: "post",
          url: URL + "/updatepass",
          headers: { "content-type": "application/json" },
          data: { password: md5(password), email: email.toLowerCase() },
        });
        const data = response.data;
        setSuccess(true);
        setTimeout(() => {
          navigation("/signin");
        }, 3000);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div>
      <Card
        sx={{
          height: "300px",
          width: "600px",
          backgroundColor: "#001e3c",
        }}
      >
        <CardContent>
          {!passwordPage ? (
            <div>
              <div style={{ position: "relative" }}>
                <h3 style={{ color: "white" }}>Forgot your Password ?</h3>
                <div style={{ position: "absolute", top: "0", right: "0" }}>
                  {isLoading ? <CircularProgress /> : " "}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <TextField
                  sx={{
                    input: { color: "white" },
                    label: { color: "#1873ce" },
                    width: "400px",
                  }}
                  error={warning}
                  id="filled-error-helper-text"
                  label="Email"
                  defaultValue={email}
                  placeholder="your@gmail.com"
                  autoComplete="false"
                  variant="standard"
                  helperText="invalid email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setWarning(false);
                  }}
                />
                <Button onClick={() => sendOTP()}>
                  <p>Send me OTP</p>
                </Button>
              </div>
              <div
                className="otp"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <OTPInput
                  value={OTP}
                  onChange={setOTP}
                  autoFocus
                  OTPLength={4}
                  otpType="number"
                  disabled={false}
                  secure
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button disabled={OTP.length < 4} onClick={() => submmitOtp()}>
                  <p>Submit</p>
                </Button>
              </div>
              <Collapse in={showError}>
                <Alert sx={{ backgroundColor: "#bababa00" }} severity="error">
                  Wrong OTP
                </Alert>
              </Collapse>
              <p style={{ color: "white" }}>
                Go to
                <Link to="/signin">
                  <Button>SignIn</Button>
                </Link>
                page
              </p>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  sx={{
                    input: { color: "white", width: "300px" },
                    label: { color: "#1873ce" },
                    margin: "10px  0",
                  }}
                  error={error}
                  id="filled-error-helper-text"
                  label="Password"
                  type="password"
                  defaultValue={password}
                  placeholder="******"
                  autoComplete="false"
                  variant="standard"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  sx={{
                    input: { color: "white", width: "300px" },
                    label: { color: "#1873ce" },
                    margin: "10px  0",
                  }}
                  error={error}
                  id="filled-error-helper-text"
                  label="Conform password"
                  defaultValue={conformPassword}
                  type="password"
                  placeholder="******"
                  autoComplete="false"
                  variant="standard"
                  onChange={(e) => {
                    setConformPassword(e.target.value);
                    setError(false);
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px",
                }}
              >
                <div></div>
                <Button
                  disabled={
                    password !== "" && conformPassword !== "" ? false : true
                  }
                  color="success"
                  onClick={() => {
                    if (password.length < 6 && conformPassword.length < 6) {
                      alert("password must have minimum 6 charecters");
                    } else {
                      handelResetPass();
                    }
                  }}
                >
                  Reset
                </Button>
                <Collapse in={success}>
                  <Alert
                    sx={{ backgroundColor: "#bababa00" }}
                    severity="success"
                  >
                    password updated successfull
                  </Alert>
                </Collapse>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textDecoration: "none",
                }}
              >
                <p style={{ color: "white" }}>
                  Change
                  <Button onClick={() => setPasswordPage(false)}>Email</Button>
                  address
                </p>
                <p style={{ color: "white" }}>
                  Go to
                  <Link to="/signin">
                    <Button>SignIn</Button>
                  </Link>
                  page
                </p>
              </div>
            </div>
          )}
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              <b>Note: </b> check Email in spam
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </div>
  );
}

export default Restet;
