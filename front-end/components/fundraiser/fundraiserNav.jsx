import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../functions/Util";

export const FundraiserNav = () => {
  const navigate = useNavigate();
  const handlelogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <div className="w-[15%] bg-[#fffff] h-full fixed top-0 border-2 border-slate drop-shadow-lg  ">
        <div className="flex flex-col  h-full justify-between ">
          <div className="flex flex-col h-[30%] justify-between m-4 ">
            <div className="flex gap-3 m-4 items-center">
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
                  ? "flex items-center gap-2 h-[10%] p-4 text-white font-bold  bg-green-400 rounded-[15px] "
                  : "flex items-center p-4 gap-2 h-[10%] "
              }
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path fill="#02a95c" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
              </svg>
              Dashboard
            </NavLink>  
          </div>

          <div className="flex flex-col h-[20%] m-4 justify-around ">
            <NavLink
              to="/fundraiserprofile"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 h-[10%] p-4 text-white  font-bold  bg-green-400 rounded-[15px] "
                  : "flex items-center gap-2 font-bold p-4 h-[10%] "
              }
            >
              <svg
                width={20}
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
            <button
              onClick={handlelogout}
              className="flex w-full p-2 rounded-[20px] bg-[#02a95c] text-white  items-center gap-2"
            >
              <svg
                width={20}
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
