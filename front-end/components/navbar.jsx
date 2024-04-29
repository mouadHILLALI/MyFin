import { NavLink } from "react-router-dom";
import logo from "../public/MyFin.png";
import React, { useState } from "react";
function Navbar() {
  const [search, setSearch] = useState(false);
  const [pop, setPop] = useState(false);
  const handleSearchClick = () => {
    setSearch(true);
  };
  const role = localStorage.getItem("role");
  let route = "";
  switch (role) {
    case "Admin":
      route = "/admin";
      break;
    case "Investor":
      route = "/investor";
    case "FundRaiser":
      route = "/fundraiser";
    default:
      route = "/";
      break;
  }
  return (
    <>
      <div className=" hidden md:flex mb-5  flex-row items-center justify-between m-auto py-2 rounded-[15px] mt-5 w-[80%] bg-[#02A95C]">
        {search ? (
          <input
            type="search"
            placeholder="search"
            className="rounded-lg w-[20%] ml-2 p-2"
          />
        ) : (
          <svg
            className="ml-2"
            onClick={handleSearchClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={40}
          >
            <path
              fill="#ffffff"
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            />
          </svg>
        )}
        {role ? (
          <>
            <NavLink to={route} className="font-bold text-white p-2">
              Dashboard
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/donations" className="font-bold text-white p-2">
              Donations
            </NavLink>
            <img src={logo} alt="myfinlogo" className="w-[7%] rounded-full" />
            <NavLink to="/signin" className="font-bold text-white p-2">
              Sign in
            </NavLink>
            <NavLink to="/register" className="font-bold text-white p-2 mr-2">
              Register
            </NavLink>
          </>
        )}
      </div>

      <div className=" flex md:hidden mb-5  flex-row items-center justify-around m-auto py-2 rounded-[15px] mt-5 w-[80%] bg-[#02A95C]">
        <h1 className="text-white w-[50%] font-bold">MyFin</h1>
        <button onClick={() => setPop(true)} className=" w-[10%]">
          <svg
            width={25}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="#ffffff"
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </button>
      </div>

      {pop && (
        <div className="h-[30%] w-full flex flex-col  bg-white top-0 fixed transition duration-75 ease-in-out   ">
          <div className="w-[80%] m-4 flex justify-end">
            <button onClick={() => setPop(false)}>
              <svg
                width={25}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="#000000"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col w-full items-center text-black justify-between">
            {role ? (
              <>
                <NavLink to={route} className="font-bold  p-2">
                  Dashboard
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/donations" className="font-bold  p-2">
                  Donations
                </NavLink>
                <NavLink to="/signin" className="font-bold  p-2">
                  Sign in
                </NavLink>
                <NavLink to="/register" className="font-bold  p-2 mr-2">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
