import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Message1 } from "./message1.jsx";
import { Dashboardinv } from "./Dashboard1.jsx";
import axios from "axios";
export const InvestorDash = () => {
  const token = localStorage.getItem("token");
  const [Check, setCheck] = useState(false);
  const check = async () => {
    try {
      const res = await axios.get("http://localhost/api/user/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setCheck(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    check();
  }, []);
  
  return <>{Check ? <Dashboardinv /> : <Message1 />}</>;
};
