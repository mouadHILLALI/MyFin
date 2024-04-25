import { useEffect, useState } from "react";
import InvestorNavbar from "../components/investorNav";
import axios from "axios";
import { Message2 } from "../components/Message2";
import { PortfolioDash } from "../components/portfoliodash";
export const Portfolio = () => {
  const [check, setCheck] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const check = async () => {
      try {
        const res = await axios.get("http://localhost/api/investor/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setCheck(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    check();
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
          {check ? <PortfolioDash /> : <Message2 />}
        </div>
      </div>
    </>
  );
};
