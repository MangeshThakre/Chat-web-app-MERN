import React from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { Link } from "react-router-dom";

import { useState } from "react";
// import "dotenv/config";
function Register() {
  const APP_URL = process.env.URL;
  const [firstName, setFirsttName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = async () => {
    password === conformPassword ? setError(false) : setError(true);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8081/register",
        header: { "Content-type ": "application/json " },
        data: { firstName, lastName, gender, phoneNo, password },
      });
      console.log(response);
    } catch (error) {
      console.log("error ", error);
    }
  };
  return (
    <div>
      <Card>
        <CardContent>
          <Stack spacing={2} direction="row">
            <TextField
              id="filled-error-helper-text"
              label="FirstName"
              defaultValue={firstName}
              placeholder="FirstName"
              autoComplete="false"
              variant="filled"
              onChange={(e) => {
                setFirsttName(e.target.value);
              }}
            />

            <TextField
              id="filled-error-helper-text"
              label="LastName"
              defaultValue={lastName}
              placeholder="LastName"
              variant="filled"
              autoComplete="false"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Stack>
          <div>
            <TextField
              error={false}
              id="filled-error-helper-text"
              label="Geder"
              defaultValue={gender}
              maximun=""
              autoComplete="false"
              variant="filled"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              error={false}
              id="filled-error-helper-text"
              label="Phone Number"
              defaultValue={phoneNo}
              type="number"
              maximun=""
              autoComplete="false"
              variant="filled"
              onChange={(e) => {
                setPhoneNo(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              //   error={error}
              id="filled-error-helper-text"
              label="Password"
              type="password"
              defaultValue={password}
              placeholder="password"
              autoComplete="false"
              variant="filled"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              error={error}
              id="filled-error-helper-text"
              label="Conform password"
              defaultValue={conformPassword}
              type="password"
              placeholder="Conform password"
              autoComplete="false"
              variant="filled"
              onChange={(e) => {
                setConformPassword(e.target.value);
              }}
            />
          </div>
          <Button
            variant=""
            disabled={
              (firstName !== "") &
              (lastName !== "") &
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
          <div>
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
