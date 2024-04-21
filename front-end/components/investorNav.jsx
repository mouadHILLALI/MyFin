import { NavLink } from "react-router-dom";
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
  let image = localStorage.getItem("image");
  const [bar, setBar] = useState(false);
  let style = "";
  let style2 = "";
  if (bar) {
    style =
      "fixed z-10 h-[50%] md:h-[90%] w-[50%] md:w-[20%] top-[5%] left-[5%] flex flex-col items-center justify-between rounded-[20px] bg-[#3e3e45]";
    style2 = "h-[10%] rounded-full flex top-[220px] md:top-[40%] bg-[#3e3e45] p-4 fixed z-10 left-[220px] md:left-[310px]";
  } else {
    style = "fixed flex left-[-100%]";
    style2 = "h-[10%] rounded-full flex top-[220px] md:top-[40%] bg-[#3e3e45] p-4 fixed z-10 left-0";
  }

  const handlelogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <div className="flex">
        <div className={style}>
          <div className="text-white font-bold h-[10%] mt-4 w-[90%] text-center  text-3xl">
            <h1>MyFin</h1>
          </div>
          <div className="flex flex-col text-white h-[70%] items-start w-[80%] justify-around ">
            <NavLink
              to="/investor"
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row bg-[#02a95c] font-bold w-full py-3 p-2 rounded-[15px] items-center gap-2"
                  : "flex font-bold px-2 items-center gap-2"
              }
            >
              <svg
                width={25}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="#ffffff"
                  d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                />
              </svg>
              Dashboard
            </NavLink>
            {Check && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex flex-row bg-[#02a95c] font-bold w-full py-3 p-2 rounded-[15px] items-center gap-2"
                      : "flex font-bold px-2 items-center gap-2"
                  }
                  to="/portfolio"
                >
                  <svg
                    width={25}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#ffffff"
                      d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"
                    />
                  </svg>
                  Portfolio
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex flex-row bg-[#02a95c] font-bold w-full py-3 p-2 rounded-[15px] items-center gap-2"
                      : "flex font-bold px-2 items-center gap-2"
                  }
                  to="/donate"
                >
                  <svg
                    width={25}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="#ffffff"
                      d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z"
                    />
                  </svg>
                  Donate
                </NavLink>
              </>
            )}
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row bg-[#02a95c] font-bold w-full py-3 p-2 rounded-[15px] items-center gap-2"
                  : "flex font-bold  items-center gap-2"
              }
              to="/investorprofile"
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#ffffff"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                />
              </svg>
              Profile
            </NavLink>
            <button onClick={handlelogout} className="flex gap-2 font-bold">
              <svg
                width={25}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#f2f2f2"
                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
        <div className={style2}>
          <button
            onClick={() => {
              bar ? setBar(false) : setBar(true);
            }}
          >
            <svg width={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                fill="#ffffff"
                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H256z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default InvestorNavbar;
