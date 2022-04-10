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
  const APP_URL = process.env.URL;
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = async () => {
    password === conformPassword ? setError(false) : setError(true);

    const phone = Number(
      phoneNo
        .replace("-", "")
        .replace(" ", "")
        .replace(")", "")
        .replace("(", "")
    );

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8081/register",
        header: { "Content-type ": "application/json " },
        data: { userName, email, phoneNo: phone, password },
      });
      console.log(response);
    } catch (error) {
      console.log("error ", error);
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
                  error={false}
                  id="filled-error-helper-text"
                  label=" Email"
                  defaultValue={email}
                  maximun=""
                  placeholder="test@gmail.com"
                  type="email"
                  autoComplete="false"
                  variant="standard"
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  variant="filled"
                  sx={{
                    input: { color: "white" },
                  }}
                  value={phoneNo}
                  onChange={(e) => {
                    setPhoneNo(e.target.value);
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
                  //   error={error}
                  id="filled-error-helper-text"
                  label="Password"
                  type="password"
                  defaultValue={password}
                  placeholder="******"
                  autoComplete="false"
                  variant="standard"
                  onChange={(e) => {
                    setPassword(e.target.value);
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
                  }}
                />
              </div>
              <Button
                variant=""
                disabled={
                  (userName !== "") &
                  (email !== "") &
                  (phoneNo !== "") &
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
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
