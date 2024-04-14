import { NavLink } from "react-router-dom";
import logo from "../public/MyFin.png";
import React, { useState, useEffect } from "react";
import { logout, check } from "../functions/Util.jsx";
import { useNavigate } from "react-router-dom";
function InvestorNavbar() {
  const [Check, setCheck] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await check();
        if (data == "true") {
          setCheck(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);
  let image = localStorage.getItem("image");
  const handleSearchClick = () => {
    setSearch(true);
  };
  const [bar, setBar] = useState(false);
  const handlelogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <div className="mb-5 flex items-center justify-between m-auto py-1  rounded-b-[15px]   bg-[#02A95C]">
        <div className="flex text-white w-[40%] justify-around ">
          <NavLink to="/investor" className="">
            MyFin
          </NavLink>
          {Check && (
            <>
              <NavLink>Portfolio</NavLink>
              <NavLink>Donate</NavLink>
            </>
          )}
        </div>
        <div className="flex w-[40%] justify-around ">
          <input
            className=" rounded-[20px] p-2"
            placeholder="search...."
            type="search"
          />
          <button>
            <div className="p-2 bg-white rounded-[100%]  ">
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#02A95C"
                  d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
                />
              </svg>
            </div>
          </button>
          <button
            className="  rounded-[100%]  "
            onClick={() => (bar ? setBar(false) : setBar(true))}
          >
            <div className="p-2 bg-white rounded-[100%]  ">
              <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                
                  fill="#02A95C"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
      {bar && (
        <div className="flex z-10 fixed right-[0%] top-[7.5%] flex-col w-[9%] mr-1 items-center p-4 bg-[#FBF8F6] rounded-[20px] ">
          <NavLink to="/investorprofile" className="p-1">
            Profile
          </NavLink>
          <button onClick={handlelogout} className="p-1">
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default InvestorNavbar;
