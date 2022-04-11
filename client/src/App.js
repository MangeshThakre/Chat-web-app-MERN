import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./components/authentication.js";
import Button from "@mui/material/Button";
import Register from "./components/registration";
import Signin from "./components/signin";
import Dashbord from "./components/dashbord.js";
import { useState } from "react";
function App() {
  const [crossOpen, setCrossOpen] = useState(false);
  return (
    <div>
      {crossOpen ? (
        <div
          className="cross"
          onClick={() => {
            setCrossOpen(false);
          }}
        ></div>
      ) : null}

      <div className="body">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Dashbord crossOpen={crossOpen} setCrossOpen={setCrossOpen} />
              }
            />
            <Route
              path="/roomId/:roomId"
              element={
                <Dashbord crossOpen={crossOpen} setCrossOpen={setCrossOpen} />
              }
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
