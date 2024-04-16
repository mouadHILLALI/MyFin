import { NavLink } from "react-router-dom";
export const FundraiserNav = () => {
  return (
    <>
      <div className="w-[20%] bg-[#fffff] h-full fixed top-0 border-2 border-black drop-shadow-lg ">
        <div className="flex flex-col">
          <div className="flex gap-3 m-4 items-center">
            <svg width={80} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                fill="#02a95c"
                d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
              />
            </svg>
            <h1 className="text-[#02a95c] font-bold text-5xl">MyFin</h1>
          </div>
          <NavLink>Dashboard</NavLink>
          <button>Profile</button>
          <button>Logout</button>
        </div>
      </div>
    </>
  );
};
