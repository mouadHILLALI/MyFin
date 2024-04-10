import InvestorNavbar from "../components/investorNav";
import { logout, check } from "../functions/Util.jsx";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyProfile } from "../components/verifyprofile.jsx";
import { ProfileInfo } from "../components/profileinfo.jsx";
export const InvestorProfile = () => {
  const [Check, setCheck] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await check();
        if (data == "false") {
          setCheck(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <InvestorNavbar />
      {!Check ?<VerifyProfile/>: <ProfileInfo/> }
    </>
  );
};
