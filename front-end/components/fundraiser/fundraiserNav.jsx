import { NavLink } from "react-router-dom";
export const FundraiserNav = ()=>{
return <div className="w-[20%] bg-[#02A95C] h-full fixed ">
  <div className="w-[80%] m-auto m-4  text-3xl text-white"><h1>Myfin</h1></div>
  <div className="flex flex-col">
    <NavLink>Dashboard</NavLink>
    <NavLink>Dashboard</NavLink>
  </div>
</div>
}