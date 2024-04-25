import axios from "axios";
import { useState, useEffect } from "react";
export const PortfolioDash = () => {
  const API = "http://localhost/api/";
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [profit, setProfit] = useState(0);
  const [amount, setAmount] = useState(0);
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
      setData(res.data.data);
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
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfit = async (rate, id) => {
    const investment = parseFloat(amount);
    if (isNaN(investment) || investment <= 0) {
      console.log("Invalid ²investment amount");
      return;
    }
    const percent = rate / 100;
    const profit = parseFloat((investment * percent).toFixed(2));
    const newBalance = parseFloat((balance - investment).toFixed(2));
    setEstimatedProfit(profit);
    setBalance(newBalance);
    try {
      let fr = new FormData();
      fr.append("id", id);
      fr.append("profit", profit);
      fr.append("balance", newBalance);
      fr.append("investment", investment);
      const res = await axios.post(API + `portfolio/invest`, fr, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAllLoans();
      fetchPortfolio();
      console.log(res);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className=" w-full md:h-[15%] mt-5 mb-5 flex flex-col md:flex-row gap-3  ">
        <div className="h-full w-full md:w-[20%] bg-white p-2 rounded-lg  drop-shadow-lg ">
          <h3 className="text-sm font-bold">Your Balance :</h3>
          <h1 className="text-[#02a95c] text-2xl font-bold ">{balance ? balance :0 }DH</h1>
        </div>
        <div className="h-full w-full md:w-[20%] bg-white p-2 rounded-lg  drop-shadow-lg ">
          <h3 className="text-sm font-bold">Your Estimated Profit :</h3>
          <h1 className="text-[#02a95c] text-2xl font-bold ">{profit ? profit : 0}DH</h1>
        </div>
      </div>

      <div className="h-[76%] overflow-auto bg-white p-2 rounded-lg drop-shadow-lg border-slate-50 border-2  ">
        <div className="relative flex flex-col min-w-0 break-words  w-full   ">
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
                {data && data.length > 0 ? (
                  data.map((info, index) => (
                    <tr key={index}>
                      <th className="border-t-0 flex items-center gap-2 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        <img
                          src={info.user.image}
                          className="rounded-[100%] w-[15%] h-[15%]"
                          alt=""
                        />
                        {info.user.first_name}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {info.user.email}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {info.loan.amount}DH
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <a href="" target="blank">
                          Business Model
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
                          className="p-2 bg-green-500 rounded-lg text-white font-bold"
                        >
                          Invest
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleProfit(
                      selectedLoan.loan.profit_rate,
                      selectedLoan.loan.id
                    );
                  }}
                  className="flex mt-3 flex-col gap-3"
                >
                  <input
                    type="text"
                    className="text-center w-full rounded-lg p-2"
                    placeholder="enter the amount you wish to invest :"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    name="amount"
                    min={10}
                    max={selectedLoan.loan.amount}
                  />
                  <button className="p-2 bg-[#02a95c] text-white font-bold rounded-[10px] ">
                    Invest
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
