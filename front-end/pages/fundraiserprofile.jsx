import { FundraiserNav } from "../components/fundraiser/fundraiserNav";
import { VerifyProfile } from "../components/fundraiser/verifyprofile";
import { ProfileInfo } from "../components/fundraiser/profileinfo";
import { useState, useEffect } from "react";
import { check } from "../functions/Util";
export const FundRaiserProfile = () => {
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
        <div className=" md:w-[20%]  flex flex-col items-center justify-center">
          <div className="flex  h-[95%] w-full md:w-[90%] ">
            <FundraiserNav />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex md:flex-col  md:w-[70%] ">
          {Check ? <ProfileInfo /> : <VerifyProfile />}
        </div>
      </div>
    </>
  );
};
