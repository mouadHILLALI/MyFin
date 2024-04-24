import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export const Stats = () => {
  const [inv, setInv] = useState(0);
  const [fund, setFund] = useState(0);
  const [Ivestments, setIvestments] = useState(0);
  const [loans, setLoans] = useState(0);

  const API = "http://localhost/api/";
  const token = localStorage.getItem("token");

  const fetchStats = async () => {
    try {
      const res = await axios.get(API + "admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInv(res.data.totalinv);
      setFund(res.data.totalfunds);
      setIvestments(res.data.total);
      setLoans(res.data.amount);
    } catch (error) {
      setError(error);
    } finally {
      
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const chartData = {
    options: {
      labels: ["Investors", "Fundraisers"],
    },
    series: [inv, fund],
  };
  const chartData2 = {
    options: {
      labels: ["Total loans", "Ivestments"],
    },
    series: [loans, Ivestments],
  };

  return (
    <>
      <div className="donut">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          width={350}
        />
      </div>
      <div className="donut">
        <Chart
          options={chartData2.options}
          series={chartData2.series}
          type="donut"
          width={350}
        />
      </div>
    </>
  );
};
