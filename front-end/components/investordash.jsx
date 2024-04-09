import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { logout, check } from "../functions/Util.jsx";
import { useNavigate } from "react-router-dom";

export const InvestorDash = () => {
    let name = localStorage.getItem('name');
    console.log(name);
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
    !Check ?<h1>Please Register Your Profile</h1> : <h1>Welcome {name}</h1> 
   }
  </>
};
