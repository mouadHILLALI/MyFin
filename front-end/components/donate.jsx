import InvestorNavbar from "./investorNav";
import axios from "axios";
import { useState, useEffect } from "react";
export const Donate = () => {
  const API = "http://localhost/api/";
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState(0);
  const [id, setID] = useState(0);
  const [total, setTotal] = useState(0);
  const [fund, setFund] = useState(null);
  const fetchAllFunds = async () => {
    try {
      const res = await axios.get(API + "donations/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFund = async (id) => {
    try {
      const res = await axios.get(API + `fund/fetch/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setID(res.data.id);
      setFund(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllFunds();
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
          <div className="relative mt-5 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ">
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Fundraiser Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Compagain Goal
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Letter of Justifcation
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((info, index) => {
                    return (
                      <tr key={index}>
                        <th className="border-t-0 flex items-center gap-2 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          <img
                            src={info.user.image}
                            className="rounded-[100%] w-[35%] md:w-[15%] h-[35%] md:h-[15%] "
                            alt=""
                          />
                          {info.user.first_name}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {info.user.email}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {info.fund.goal}DH
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <a href="" target="blank">
                            Justification Letter
                          </a>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            onClick={() => {
                              setShow(true);
                              fetchFund(info.fund.id);
                            }}
                            value={info.fund.id}
                            className="p-2 bg-green-500 rounded-lg text-white font-bold "
                          >
                            Donate
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {show && (
        <div className=" fixed top-[10%] drop-shadow-lg right-[20%] left-[5%] md:left-[25%] w-[80%] md:w-[40%] h-[45%] md:h-[80%] bg-white p-6 rounded-[20px]  ">
          <div className="flex justify-end">
            <button onClick={() => setShow(false)}>
              <svg
                width={25}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="#000000"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </button>
          </div>
          <div className=" w-[80%] bg-[#f8f9fa] flex flex-col gap-2 p-6 rounded-[20px]">
            <h2 className=" text-[#344771] font-bold ">Your Informations :</h2>

            <div>
              <span className="flex">
                <label className="text-[#c9caca] ">Amount : </label>{" "}
                <h4 className=" text-[#344771] font-bold ">DH</h4>
              </span>
              <span className="flex">
                <label className="text-[#c9caca] ">Your Balance : </label>
                <h4 className=" text-[#344771] font-bold"> DH</h4>
              </span>
              <span className="flex">
                <label className="text-[#c9caca] ">
                  Your Estimated Profit :
                </label>
                <h4 className=" text-[#344771] font-bold">DH</h4>
              </span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="flex mt-3 flex-col gap-3"
              >
                <input
                  type="number"
                  className="text-center w-full rounded-lg p-2"
                  placeholder="enter the amount you wish to invest :"
                  onChange={(e) => setAmount(e.target.value)}
                  value={50}
                  name="amount"
                  min={10}
                  max={23}
                />
                <button className="p-2 bg-[#02a95c] text-white font-bold rounded-[10px] ">
                  Donate
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
