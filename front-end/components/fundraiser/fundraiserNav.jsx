import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../functions/Util";

export const FundraiserNav = () => {
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className=" hidden md:flex md:flex-col md:w-full  md:items-center md:justify-between md:rounded-[10px] md:bg-[#3e3e45]">
        <div className="flex flex-col text-white h-[42%] items-start w-[80%] justify-around ">
          <div className="flex w-full pb-12 border-b-2 border-gray-500 rounded-md h-[10%] justify-center">
            <h1 className="font-bold text-3xl">MyFin</h1>
          </div>
          <div className="flex flex-col h-[60%] w-full gap-4">
            <NavLink
              to="/fundraiser"
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row bg-[#02a95c] font-bold w-full py-3 p-2 rounded-[15px] items-center gap-2"
                  : "flex font-bold  items-center gap-2"
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
            <NavLink
              to="/fundraiserprofile"
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row bg-[#02a95c] font-bold w-full py-3 p-2 rounded-[15px] items-center gap-2"
                  : "flex font-bold  items-center gap-2"
              }
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="#ffffff"
                  d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
                />
              </svg>
              Profile
            </NavLink>
          </div>
        </div>
        <div className="h-[20%] flex flex-col text-white items-start justify-around w-[80%]  ">
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

      <div className="h-[8%] z-10 flex justify-around items-center fixed w-full bottom-0 bg-[#3e3e45] md:hidden">
        <NavLink
          to="/fundraiser"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 h-[15%] p-4 text-white font-bold  bg-green-400 rounded-lg "
              : "flex items-center text-white font-bold p-4 gap-2 h-[15%] "
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
        </NavLink>
        <NavLink
          to="/fundraiserprofile"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 h-[15%] p-4 text-white font-bold  bg-green-400 rounded-lg "
              : "flex items-center text-white font-bold p-4 gap-2 h-[15%] "
          }
        >
          <svg
            width={20}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              fill="#ffffff"
              d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
            />
          </svg>
        </NavLink>
        
        <button onClick={handlelogout} className="flex gap-2  font-bold">
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
        </button>
      </div>
    </>
  );
};
