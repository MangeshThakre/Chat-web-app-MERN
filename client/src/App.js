import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./components/authentication.js";
import Button from "@mui/material/Button";
import Register from "./components/registration";
import Signin from "./components/signin";
import Dashbord from "./components/dashbord.js";

function App() {
  return (
    <div>
      <div className="body">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashbord />} />
            <Route path="/roomId/:roomId" element={<Dashbord />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
