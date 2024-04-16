import { FundraiserNav } from "../components/fundraiser/fundraiserNav";
import { VerifyProfile } from "../components/fundraiser/verifyprofile";
import { ProfileInfo } from "../components/fundraiser/profileinfo";
import { useState ,useEffect } from "react";
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
      <FundraiserNav />
      <div className="w-[85%] absolute left-[15%] bg-[#f1f4f9] h-full ">
      {Check ? <ProfileInfo/> : <VerifyProfile/>}
      </div>
    </>
  );
};
