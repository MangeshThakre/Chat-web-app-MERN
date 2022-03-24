import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSatate, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER } from "../redux/reduxToken/currentUserSplice.js";

function Dashbord() {
  const dispatch = useDispatch();

  //   const TOKEN = useSelector((state) => state.currentUserReducer.token);
  const TOKEN = localStorage.getItem("Token");
  const navigate = useNavigate();
  if (!localStorage.getItem("Token")) {
    navigate("/signin");
  }

  //   localStorage.removeItem("Token");

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8081/verify",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      dispatch(USER(data));
    } catch (error) {
      console.log("Error", error);
      navigate("/signin");
    }
  };
  return <div>Dashbord</div>;
}

export default Dashbord;
