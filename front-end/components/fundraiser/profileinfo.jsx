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
    <>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex justify-between m-4">
              <div>
                <h4 className="text-xl">Welcome back.</h4>
                <h1 className="text-5xl">
                  {user.owner.first_name} {user.owner.family_name}
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full w-24 h-24 border-2 border-blue flex  items-center justify-center  ">
                  <img
                    className="rounded-full w-24 h-24 p-2  "
                    src={user.owner.image}
                    alt="..."
                  />
                </div>
                <h4 className="text-lg">{user.owner.role}</h4>
              </div>
            </div>
            <div className="flex flex-col m-4 gap-6  p-3 ">
              <div className="flex w-full gap-7 items-center">
                <label className="text-xl">Email</label>
                <input
                  className="w-[30%] p-2 rounded-[15px] "
                  type="text"
                  value={user.owner.email}
                />
              </div>

              <div className="flex w-full items-center gap-3">
                <label className="text-xl" htmlFor="">User ID:</label>
                <input className="w-[30%] p-2 rounded-[15px] " type="text" value={user.info.CIN} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
