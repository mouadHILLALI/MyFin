import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { logout, check } from "../functions/Util.jsx";
import { useNavigate } from "react-router-dom";
import { Message1 } from "./message1.jsx";
import { Dashboardinv } from "./Dashboard1.jsx";
export const InvestorDash = () => {
    let name = localStorage.getItem('name');
    const [Check , setCheck] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await check();
        if(data=='false'){
            setCheck(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return <>
   {
    !Check ?<Message1/>: <Dashboardinv /> 
   }
  </>
};
