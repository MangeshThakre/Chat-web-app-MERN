import React from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import { containerClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

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

function Register() {
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_API_URL;

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [PhoneNoerror, setPhoneNoError] = useState(false);
  const [emailError, setEamilError] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailInput, setEmailInput] = useState();
  const submit = async () => {
    const phone = Number(
      phoneNo
        .replace("-", "")
        .replace(" ", "")
        .replace(")", "")
        .replace("(", "")
    );
    if (!email.includes("@gmail.com")) {
      setEamilError(true);
      setEmailInput("invalid");
    } else if (password !== conformPassword) {
      setError(true);
    } else {
      try {
        setIsLoading(true);
        const response = await axios({
          method: "post",
          url: URL + "/register",
          header: { "Content-type ": "application/json " },
          data: { userName, email, phoneNo: phone, password },
        });
        const data = response.data;
        if (data.result == "email already exist") {
          setEamilError(true);
          setEmailInput("already exist");
        }
        if (data.result == "phoneNo exist") {
          setPhoneNoError(true);
        }
        if (data.result?.email) {
          navigate("/signin");
        }
        setIsLoading(false);
      } catch (error) {
        console.log("error ", error);
      }
    }
  };
  const style = { margin: "10px  0" };

  return (
    <div>
      <Card
        sx={{
          backgroundColor: "#001e3c",
          borderRadius: "10px",
          width: "500px",
        }}
      >
        <CardContent>
          <div style={{ display: "flex" }}>
            <div className="sinIn-text">
              <TextField
                sx={{
                  input: { color: "white" },
                  label: { color: "#1873ce" },
                  margin: "10px  0",
                }}
                id="filled-error-helper-text"
                label="userName"
                defaultValue={userName}
                placeholder="userName"
                autoComplete="false"
                variant="standard"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <div>
                <TextField
                  sx={{
                    input: { color: "white" },
                    label: { color: "#1873ce" },
                    margin: "10px  0",
                  }}
                  error={emailError}
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  helperText={emailInput}
                  defaultValue={email}
                  placeholder="test@gmail.com"
                  autoComplete="email"
                  variant="standard"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEamilError(false);
                  }}
                />
              </div>
              <div>
                <InputLabel
                  sx={{ color: "#1873ce" }}
                  htmlFor="formatted-text-mask-input"
                >
                  Phone-Number
                </InputLabel>
                <Input
                  error={PhoneNoerror}
                  helperText="error"
                  variant="filled"
                  sx={{
                    input: { color: "white" },
                  }}
                  value={phoneNo}
                  onChange={(e) => {
                    setPhoneNo(e.target.value);
                    setPhoneNoError(false);
                  }}
                  placeholder="(100) 000-0000"
                  name="textmask"
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                />
              </div>
              <div>
                <TextField
                  sx={{
                    input: { color: "white" },
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
              <div>
                <TextField
                  sx={{
                    input: { color: "white" },
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
              <Button
                variant="outlined"
                color="primary"
                disabled={
                  (userName !== "") &
                  (email !== "") &
                  (phoneNo.length >= 14) &
                  (password !== "") &
                  (conformPassword !== "")
                    ? false
                    : true
                }
                onClick={submit}
              >
                Register
              </Button>
            </div>
            <div> hello</div>
          </div>
          <div style={{ textAlign: "center", color: "white" }}>
            <p>
              Already have an account
              <Link to="/signin">
                <Button>Sign in</Button>
              </Link>
            </p>
          </div>
          <div style={{ float: "right" }}>
            {isLoading ? <CircularProgress /> : " "}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
