import { useEffect, useState } from "react";
import InvestorNavbar from "../components/investorNav";
import axios from "axios";
export const Portfolio = () => {
  const [check, setCheck] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const check = async () => {
      try {
        const res = await axios.get("http://localhost/api/investor/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(res.data.res!='no portfolio was found'){
            setCheck(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    check();
  }, []);
  return (
    <>
      <InvestorNavbar />
      {
        !check ? <h1>register ur portfolio</h1> :  <h1>Portfolio</h1>
      }
     
    </>
  );
};
