import { NavLink } from "react-router-dom";
import { AdminNav } from "../components/Admin/adminnav";
import { useEffect, useState } from "react";
import axios from "axios";

export const ManageRequests = () => {
  const token = localStorage.getItem("token");
  const [loanActive, setLoanActive] = useState(true);
  const [fundingActive, setFundingActive] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      const fetchloans = async () => {
        const res = await axios.get("http://localhost/api/loans/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
      };
      fetchloans();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <AdminNav />
      <div className="w-[85%] absolute left-[15%] bg-[#f1f4f9] h-full ">
        <div className="flex w-[90%] gap-3 border-b-1   border-slate mt-4 m-auto ">
          <button
            onClick={() => {
              setLoanActive(true);
              setFundingActive(false);
            }}
            className={
              loanActive
                ? "text-[#02a95c] font-bold pb-2 border-b-4 border-[#02a95c]"
                : "text-black pb-2 font-bold"
            }
          >
            Loan Requests
          </button>
          <button
            onClick={() => {
              setLoanActive(false);
              setFundingActive(true);
            }}
            className={
              fundingActive
                ? "text-[#02a95c] font-bold pb-2 border-b-4 border-[#02a95c]"
                : "text-black pb-2 font-bold"
            }
          >
            Funding Requests
          </button>
        </div>
      </div>
    </>
  );
};
