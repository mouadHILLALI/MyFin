import axios from "axios";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [inv , setInv] = useState(0);
  const [fund , setFund] = useState(0);
  const [total , setTotal] = useState(0);
  const API = "http://localhost/api/";
  const token = localStorage.getItem("token");
  const fetchstats = async () => {
    try {
      const res = await axios.get(API+'admin/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInv(res.data.totalinv);
      setFund(res.data.totalfunds);
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchstats();
  },[]);

  let counts = setInterval(updated);
  let upto = 0;
  function updated() {
      let count = document.getElementById("total");
      count.innerText = ++upto +'DH';
      if (upto === total) {
          clearInterval(counts);
      }
  }
  return (
    <>
      <div className="w-full h-[15%] bg-white flex flex-row justify-between m-4">
        <div className="w-[30%] flex flex-col items-center bg-white drop-shadow-lg rounded-lg ">
          <h3 className="font-bold m-2 ">Total Investors :</h3>
          <h3 className="text-green-400 font-bold text-2xl">{inv}</h3>
        </div>
        <div className="w-[30%] flex flex-col items-center bg-white drop-shadow-lg rounded-lg ">
          <h3 className="font-bold m-2 ">Total Fundraisers :</h3>
          <h3 className="text-green-400 font-bold text-2xl">{fund}</h3>
        </div>
        <div className="w-[30%] flex flex-col items-center bg-white drop-shadow-lg  rounded-lg">
          <h3 className="font-bold m-2 ">Total Amount Invested :</h3>
          <h3 id="total" className="  text-green-400 font-bold text-2xl">{total}DH</h3>
        </div>
      </div>
      <div className=" h-[80%] w-full m-4 bg-white drop-shadow-lg ">
        
      </div>
    </>
  );
};
