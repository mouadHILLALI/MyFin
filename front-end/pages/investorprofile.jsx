import InvestorNavbar from "../components/investorNav";
import { logout, check } from "../functions/Util.jsx";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyProfile } from "../components/verifyprofile.jsx";
import { ProfileInfo } from "../components/profileinfo.jsx";
export const InvestorProfile = () => {
  const [Check, setCheck] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await check();
        if (data == "true") {
          setCheck(true);
        }
      } catch (error) { 
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex  h-screen ">
        <div className=" md:w-[20%] flex flex-col items-center justify-center">
          <div className="flex h-[95%] w-full md:w-[90%] ">
            <InvestorNavbar />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex md:flex-col  md:w-[70%] ">
          {Check ? <ProfileInfo /> : <VerifyProfile />}
        </div>
      </div>
    </>
  );
};
