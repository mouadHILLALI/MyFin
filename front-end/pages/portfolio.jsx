import { useEffect, useState } from "react";
import InvestorNavbar from "../components/investorNav";
import axios from "axios";
import { check } from "../functions/Util";
import { Message2 } from "../components/Message2";
import { PortfolioDash } from "../components/portfoliodash";
export const Portfolio = () => {
  const [Check, setCheck] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
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
          {Check ? <PortfolioDash /> : <Message2 />}
        </div>
      </div>
    </>
  );
};
