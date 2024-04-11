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
        <>
          <div className="  z--1 p-4 bg-[#02A95C] w-full h-[20vh] rounded-b-[25px]  ">
            <div className="fixed top-[20%] left-[4%] rounded-[50%]    w-[15%] h-[30%] flex">
              <span className="fixed gap-2 flex top-[25%] left-[20%]">
                <h1 className="text-white text-3xl">{user.owner.first_name}</h1>
                <h1 className="text-white text-3xl">
                  {user.owner.family_name}
                </h1>
              </span>
              <img
                className="fixed top-[15%]  left-[4%] rounded-[100%]  w-[15%] h-[30%] flex"
                src={user.owner.image}
                alt=""
              />
            </div>
            <h1 className="fixed top-[35%] left-[20%] text-2xl ">
              {user.owner.role}
            </h1>
          </div>
          <div className="mt-[10%] w-[90%] m-auto drop-shadow-lg flex flex-col p-2 rounded-lg justify-between h-[30vh] bg-slate-50 ">
            <h1 className="text-2xl">Account info :</h1>
            <div className="flex w-[50%] justify-between text-xl">
                <label htmlFor="rib">Bank Account Number :</label>
            <input id="rib" type="text" value={user.info.RIB} />
            </div>
            <div className="flex w-[50%] justify-between text-xl">
            <label htmlFor="cin">CIN :</label>
            <input type="text" id="cin" value={user.info.CIN} />
            </div>
            <div className="flex w-[50%] justify-between text-xl">
            <label htmlFor="email">Email :</label>
            <input type="text" id="email" value={user.owner.email} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
