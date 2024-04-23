import { useState, useEffect } from "react";
import axios from "axios";

export const ProfileInfo = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="w-full h-[8%] m-5">
            <div className="flex items-center text-[#b2b9c6]">
              <svg
                width={15}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="#b2b9c6"
                  d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                />
              </svg>
              /<h4 className="font-bold">Profile</h4>
            </div>
          </div>

          <div className="w-full  h-[83vh] bg-white drop-shadow-lg rounded-lg">
            <div className="m-4 flex items-center gap-3">
              {user.owner && user.owner.image && (
                <img
                  src={user.owner.image}
                  className="rounded-full drop-shadow-lg w-[20%] md:w-[10%] h-[90px] object-cover"
                />
              )}
              <div className="flex flex-col ">
                <h2 className="text-[#3d4f6e] font-bold ">
                  {user.owner.first_name} <span>{user.owner.family_name}</span>
                </h2>
                <h3 className="text-[#7b809a] text-sm ">{user.owner.role}</h3>
              </div>
            </div>
            <div className="w-full flex flex-col  md:flex-row justify-evenly">
              <div className="flex flex-col w-[30%] text-[#344767]">
                <h2 className=" font-bold m-4 w-full ">Profile Informations :</h2>
                <div className="flex flex-col m-4 gap-1">
                  <div className="flex  text-sm">
                    <h3>Email : {user.owner.email}</h3>
                  </div>
                  <div className="flex  text-sm">
                    <h3>CIN : {user.info.CIN}</h3>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-[30%] text-[#344767]">
              <h2 className=" font-bold m-4 ">Transactions History :</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
