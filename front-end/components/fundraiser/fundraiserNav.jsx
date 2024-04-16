import { NavLink } from "react-router-dom";
export const FundraiserNav = () => {
  return (
    <>
      <div className="w-[20%] bg-[#fffff] h-full fixed top-0 border-2 border-black drop-shadow-lg  ">
        <div className="flex flex-col  h-full justify-between ">
          <div className="flex flex-col h-[30%] justify-between m-4 ">
            <div className="flex gap-3 m-4 items-center">
              <svg
                width={80}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="#02a95c"
                  d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
                />
              </svg>
              <h1 className="text-[#02a95c] font-bold text-5xl">MyFin</h1>
            </div>
            <input
              type="search"
              className="p-2 rounded-[15px]  "
              placeholder="search..."
            />
            <NavLink
              to="/fundraiser"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 h-[10%] p-6 text-white  text-xl  bg-green-400 rounded-[15px] "
                  : "flex items-center p-4 gap-2 h-[10%] "
              }
            >
              <svg
                width={30}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#02a95c"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                />
              </svg>
              Dashboard
            </NavLink>
          </div>

          <div className="flex flex-col h-[20%] m-4 justify-around ">
            <NavLink
            to="/investorprofile"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 h-[10%] p-6 text-white  text-xl  bg-green-400 rounded-[15px] "
                  : "flex items-center gap-2 p-4 h-[10%] "
              }
            >
              <svg
                width={30}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#02a95c"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                />
              </svg>
              Profile
            </NavLink>
            <button className="flex w-full p-4 rounded-[20px] bg-[#02a95c] text-white text-xl items-center gap-2">
              <svg
                width={30}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#FFFFFF"
                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
