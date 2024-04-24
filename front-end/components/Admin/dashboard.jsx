import axios from "axios";
import { useEffect, useState } from "react";
import { Stats } from "./adminstats";
export const Dashboard = () => {
  const [inv, setInv] = useState(0);
  const [fund, setFund] = useState(0);
  const [total, setTotal] = useState(0);
  const [loans, setLoans] = useState([]);
 const [chartData , setChartData]=useState([]);
  const API = "http://localhost/api/";
  const token = localStorage.getItem("token");
  const fetchstats = async () => {
    try {
      const res = await axios.get(API + "admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInv(res.data.totalinv);
      setFund(res.data.totalfunds);
      setTotal(res.data.total);
      setLoans(res.data.loans);
      setChartData([res.data.totalinv, res.data.totalfunds]);
      console.log(chartData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchstats();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full justify-between md:justify-start ">
      <div className="w-full h-[20%] bg-white flex flex-col gap-2 md:flex-row justify-between m-4">
        <div className=" w-[90%] md:w-[30%] flex flex-col items-center bg-white drop-shadow-lg rounded-lg ">
          <h3 className="font-bold m-2 ">Total Investors :</h3>
          <h3 className="text-green-400 font-bold text-2xl">{inv}</h3>
        </div>
        <div className="w-[90%] md:w-[30%] flex flex-col items-center bg-white drop-shadow-lg rounded-lg ">
          <h3 className="font-bold m-2 ">Total Fundraisers :</h3>
          <h3 className="text-green-400 font-bold text-2xl">{fund}</h3>
        </div>
        <div className="w-[90%] md:w-[30%] flex flex-col items-center bg-white drop-shadow-lg  rounded-lg">
          <h3 className="font-bold m-2 ">Total Amount Invested :</h3>
          <h3 id="total" className="  text-green-400 font-bold text-2xl">
            {total}DH
          </h3>
        </div>
      </div>

      <div className=" flex flex-col justify-between h-[30%] w-full m-4  ">
        <h1 className="text-[#344767] font-bold text-xl ">
          Latest Loans requests :{" "}
        </h1>
        <div className="flex flex-col md:flex-row w-full h-full justify-between">
          {loans.map((loan, index) => {
            return (
              <div
                key={index}
                className="w-[90%] md:w-[30%] h-full flex flex-col  items-start p-2 justify-around bg-white drop-shadow-lg rounded-lg "
              >
                <div className="flex gap-2">
                  <h1 className=" text-[#344767] font-bold text-lg ">
                    Loan amount :{" "}
                  </h1>
                  <h1 className="text-green-400 font-bold text-lg">
                    {loan.amount}DH
                  </h1>
                </div>
                <div className="flex gap-2">
                  <h1 className=" text-[#344767] font-bold text-lg ">
                    Loan Duration :
                  </h1>
                  <h1 className="text-green-400 font-bold text-lg">
                    {loan.duration}Days
                  </h1>
                </div>
                <div className="flex gap-2">
                  <h1 className=" text-[#344767] font-bold text-lg ">
                    Loan Profit Rate :
                  </h1>
                  <h1 className="text-green-400 font-bold text-lg">
                    {loan.profit_rate}%
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className=" flex flex-col md:flex-row justify-between h-[40%] w-full m-4 bg-white drop-shadow-lg ">
        <Stats/>

        <Stats />
      </div>
    </div>
  );
};
