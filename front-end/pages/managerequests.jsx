import { NavLink } from "react-router-dom";
import { AdminNav } from "../components/Admin/adminnav";
import { useEffect, useState } from "react";
import axios from "axios";

export const ManageRequests = () => {
  const token = localStorage.getItem("token");
  const [loanActive, setLoanActive] = useState(true);
  const [fundingActive, setFundingActive] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("loan");
  const fetchLoans = async () => {
    try {
      const res = await axios.get("http://localhost/api/loans/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.combinedData);
    } catch (error) {
      console.log("Error fetching loans:", error);
    }
  };
  const fetchfunds = async () => {
    try {
      const res = await axios.get("http://localhost/api/funds/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.combinedData);
    } catch (error) {
      console.log("Error fetching funds:", error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleApprove = async (e) => {
    const id = e.target.value;
    const fr = new FormData();
    fr.append("id", id);
    fr.append("type", type);

    try {
      const res = await axios.post(
        "http://localhost/api/application/approve",
        fr,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Approval response:", res);
      if (type === "loan") {
        fetchLoans();
      } else if (type === "fund") {
        fetchfunds();
      }
    } catch (error) {
      console.log("Error approving request:", error);
    }
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const fr = new FormData();
      fr.append("search", search);
      const res = await axios.post("http://localhost/api/admin/search",fr ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = res.data.data;
      data.length != 0 && setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex gap-3  h-screen ">
        <div className=" md:w-[20%] flex flex-col items-center justify-center">
          <div className="flex h-[95%] w-full md:w-[90%] ">
            <AdminNav />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex md:flex-col  md:w-[80%]  ">
          <div className="   h-full ">
            <div className="flex flex-col md:flex-row  items-center  justify-between w-[90%] gap-3 border-b-1   border-slate mt-4 m-auto ">
              <div className="w-full md:w-[60%]  flex gap-2">
                <button
                  onClick={() => {
                    setLoanActive(true);
                    setType("loan");
                    setFundingActive(false);
                    data.length === 0 && fetchLoans();
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
                    setType("fund");
                    setFundingActive(true);
                    fetchfunds();
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
              <div className="w-full  md:w-[30%] ">
                <form onSubmit={handleSearch}>
                  <input
                    className="p-2 rounded-lg"
                    name="search"
                    value={search}
                    placeholder="search..."
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                  />
                </form>
              </div>
            </div>

            {loanActive && data.length != 0 ? (
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
                          className="px-2 flex gap-2  items-center py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                        <td className="px-8 py-4">
                          {info.user && info.user.email}
                        </td>
                        <td className="px-8 py-4">
                          {info.loan && info.loan.amount}DH
                        </td>
                        <td className="px-8 py-4">
                          {info.loan && (
                            <a
                              target="blank"
                              href={
                                `http://localhost/storage/` +
                                info.loan.business_model
                              }
                            >
                              Bussniss Model
                            </a>
                          )}
                        </td>
                        <td className="px-8 py-4">
                          {info.loan && info.loan.profit_rate}%
                        </td>
                        <td className="px-8 py-4">
                          {info.loan && info.loan.duration} Days
                        </td>
                        <td className="px-8 py-4">
                          <button onClick={handleApprove} value={info.loan.id}>
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="relative overflow-x-auto text-white">
                <table className="w-[80%] m-auto mt-4 bg-[#02a95c] rounded-[15px] ">
                  <thead className="border-b-2 border-white">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Fundraiser name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Compagain goal
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Letter of justification
                      </th>
                      <th scope="col" className="px-6 py-3">
                        title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Description
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
                        <td className="px-8 py-4">
                          {info.user && info.user.email}
                        </td>
                        <td className="px-8 py-4">
                          {info.funds && info.funds.goal}DH
                        </td>
                        <td className="px-8 py-4">
                          {info.funds && (
                            <a target="blank" href={info.funds.letter}>
                              Letter of justification
                            </a>
                          )}
                        </td>
                        <td className="px-8 py-4">
                          {info.funds && info.funds.title}
                        </td>
                        <td className="px-8 py-4">
                          {info.funds && info.funds.Description}
                        </td>
                        <td className="px-8 py-4">
                          <button
                            onClick={handleApprove}
                            value={info.funds && info.funds.id}
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
