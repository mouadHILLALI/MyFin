import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export const Stats = () => {
  const [inv, setInv] = useState(0);
  const [fund, setFund] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
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

  return (
    <div className="donut">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width={350}
      />
    </div>
  );
};
