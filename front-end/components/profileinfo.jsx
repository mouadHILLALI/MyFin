import { useState, useEffect } from "react";
import axios from "axios";

export const ProfileInfo = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost/api/user/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = res.data.user;
        const accountData = res.data.account;
        const updatedUser = {
          owner: userData,
          info: accountData,
        };
        setUser(updatedUser);
        setIsLoading(false);
        console.log(user);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className=" fixed z--1 p-4 bg-[#02A95C] w-full h-[20vh] rounded-b-[25px]  ">
          <div className="h-[5%]"></div>
          <div className="fixed top-[20%] left-[4%] rounded-[50%] bg-black  w-[15%] h-[30%] flex">
            <span className="fixed gap-2 flex top-[25%] left-[20%]">
              <h1>{user.owner.first_name}</h1>
              <h1>{user.owner.family_name}</h1>
            </span>
            <h1 className="fixed top-[35%] left-[20%]">{user.owner.role}</h1>
          </div>
          <img src={user.owner.image} width={30} alt="..." />
        </div>
      )}
    </div>
  );
};
