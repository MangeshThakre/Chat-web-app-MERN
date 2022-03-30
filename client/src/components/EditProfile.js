import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./editProfile.css";
import { color } from "@mui/system";
function EditProfile({ toggle, setToggle, USERDATA }) {
  return (
    <div>
      <Card
        className="EditProfile"
        style={{
          height: "580px",
          width: "340px",
          backgroundColor: "#001e3c",
          color: "white",
        }}
      >
        <div style={{ height: "80px", width: "350px", color: "white" }}>
          <div
            style={{
              display: "flex",
              padding: "32px 0px  20px 15px",
              backgroundColor: "#071a2e",
            }}
          >
            <span>
              <ArrowBackIcon onClick={() => setToggle(!toggle)} />
            </span>
            <h3 style={{ margin: "0px 0px 0px 15px" }}>Profile</h3>
          </div>
        </div>
        <CardContent>edit</CardContent>
      </Card>
    </div>
  );
}

export default EditProfile;
