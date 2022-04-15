import React from "react";
import "./authentication.css";
import Card from "@mui/material/Card";
function Authentication() {
  return (
    <div className="body">
      <Card
        style={{ backgroundColor: "#0c0c0d", color: "white" }}
        sx={{ minWidth: 275 }}
      >
        <div className="heading">
          <div>
            code sync
            <p>Realtime collebration</p>
          </div>
        </div>
        <h1>card</h1>
      </Card>
    </div>
  );
}

export default Authentication;
