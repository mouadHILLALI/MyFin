import { Dash } from "./dash";
import { Message1 } from "../message1";
import { useEffect, useState } from "react";
import axios from "axios";
import { logout, check } from "../../functions/Util.jsx";
import { useNavigate } from "react-router-dom";
export const FundRaiserDash = () => {
  const [Check, setCheck] = useState(false);
  const fetchData = async () => {
    try {
      const data = await check();
      if (data.status === 200) {
        setCheck(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    fetchData();
  }, [Check]);
  return (
    <>
      <div className="w-full   h-full ">{Check ? <Dash /> : <Message1 />}</div>
    </>
  );
};
