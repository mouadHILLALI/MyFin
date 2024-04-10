import { useState, useEffect } from "react";
import axios from "axios";
export const ProfileInfo = () => {
  const [user, setUser] = useState({});
  let token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost/api/user/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let userData = res.data.user;
        let accountData = res.data.account;
        let updatedUser = {
          owner: userData,
          info: accountData,
        };
        setUser(updatedUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 
  console.log(user);
  return (
    <div>
      <div className=" fixed z--1 p-4 bg-[#02A95C] w-full h-[20vh] rounded-b-[25px]  ">
        <div className="h-[5%]"></div>
        <div className="fixed top-[20%] left-[4%] rounded-[50%] bg-black  w-[15%] h-[30%] flex">
          <h1 className="fixed top-[25%] left-[20%]">{name}</h1>
          <h1 className="fixed top-[35%] left-[20%]">ef</h1>
        </div>
      </div>
    </div>
  );
};
