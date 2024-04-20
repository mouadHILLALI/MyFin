import axios from "axios";
import { useState, useEffect } from "react";
export const PortfolioDash = () => {
  const API = "http://localhost/api/";
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [profit, setProfit] = useState(0);
  const [ID, setID] = useState(0);
  const [show, setShow] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [estimatedProfit, setEstimatedProfit] = useState(0);
  const fetchAllLoans = async () => {
    try {
      const res = await axios.get(API + "portfolio/loans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(API + "portfolio/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBalance(res.data.balance);
      setProfit(res.data.estimated_profit);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllLoans();
    fetchPortfolio();
  }, []);
  const fetchToInvest = async (id) => {
    try {
      const res = await axios.get(API + `invest/loan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedLoan(res.data);
      setShow(true);
      console.log(selectedLoan.loan);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfit = (investment, rate) => {
    const percent = rate / 100;
    const profit = parseInt(investment * percent);
    setEstimatedProfit(profit);
    setBalance(prevBalance => prevBalance - investment);
  };
  return (
    <>
      <div className="bg-yellow-400 p-4 rounded-[15px] mb-2 w-[90%] m-auto flex text-white font-bold items-center justify-end">
        <div className="flex gap-4">
          <button>Your Balance : {balance}DH</button>
          <button> Your Estimated Profit : {profit}DH</button>
        </div>
      </div>
      <section className="">
        <div className="">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Borrower Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Loan Amount
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Business Model
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Profit Rate
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((info) => {
                    return (
                      <tr>
                        <th className="border-t-0 flex items-center gap-2 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          <img
                            src={info.user.image}
                            className="rounded-[100%] w-[5%] h-[5%] "
                            alt=""
                          />
                          {info.user.first_name}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {info.user.email}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {info.loan.amount}DH
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <a href="" target="blank">
                            Bussniss Model
                          </a>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                          {info.loan.profit_rate}%
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            onClick={() => {
                              setShow(true);
                              fetchToInvest(info.loan.id);
                            }}
                            value={info.loan.id}
                            className="p-2 bg-green-500 rounded-lg text-white font-bold "
                          >
                            Invest
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
      </section>

      {show && (
        <div className=" fixed top-[10%] drop-shadow-lg right-[20%] md:left-[25%] w-[80%] md:w-[40%] h-[80%] bg-white p-6 rounded-[20px]  ">
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
            {selectedLoan && (
              <div>
                <span className="flex">
                  <label className="text-[#c9caca] ">Amount : </label>{" "}
                  <h4 className=" text-[#344771] font-bold ">
                    {selectedLoan.loan.amount} DH
                  </h4>
                </span>
                <span className="flex">
                  <label className="text-[#c9caca] ">Your Balance : </label>
                  <h4 className=" text-[#344771] font-bold">{balance} DH</h4>
                </span>
                <span className="flex">
                  <label className="text-[#c9caca] ">
                    Your Estimated Profit :
                  </label>
                  <h4 className=" text-[#344771] font-bold">
                    {estimatedProfit} DH
                  </h4>
                </span>
                <input
                  type="text"
                  className="text-center"
                  onClick={(e) => {
                    handleProfit(e.target.value, selectedLoan.loan.profit_rate);
                  }}
                  name="amount"
                  min={10}
                  max={selectedLoan.loan.amount}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
