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
      const fetchLoans = async () => {
        const res = await axios.get("http://localhost/api/loans/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.combinedData);
      };
      fetchLoans();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleApprove = ()=>{
    
  }
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

        <div className="relative overflow-x-auto text-white">
          <table className="w-[80%] m-auto mt-4 bg-[#02a95c] rounded-[15px] ">
            <thead className="border-b-2 border-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Investor name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Loan Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Bussniss Model
                </th>
                <th scope="col" className="px-6 py-3">
                  Profit Rate
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((info, index) => (
                <tr key={index} className="">
                  <th
                    scope="row"
                    className="px-6 flex gap-2 items-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {info.user && info.user.image && (
                      <img
                        src={info.user.image}
                        className="rounded-[100%] w-[40%] h-[40%] "
                        alt=""
                      />
                    )}
                    {info.user && info.user.first_name}
                  </th>
                  <td className="px-8 py-4">{info.user && info.user.email}</td>
                  <td className="px-8 py-4">{info.loan && info.loan.amount}DH</td>
                  <td className="px-8 py-4">
                    {info.loan && <a target="blank" href={`http://localhost/storage/` + info.loan.business_model}>Bussniss Model</a> }
                  </td>
                  <td className="px-8 py-4">{info.loan && info.loan.profit_rate}%</td>
                  <td className="px-8 py-4">
                    {info.loan && info.loan.duration}
                  </td>
                  <td className="px-8 py-4"><button onClick={handleApprove} value={info.loan.id}>Approve</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
