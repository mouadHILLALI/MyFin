
import { NavLink } from "react-router-dom"; 
import logo from "../public/MyFin.png";
import React, { useState } from 'react';
function Navbar() {
    const [search, setSearch] = useState(false);

    const handleSearchClick = () => {
        setSearch(true);
    };

    return (
        <div className=" mb-5 flex items-center justify-between m-auto py-2 rounded-[15px] mt-5 w-[80%] bg-[#02A95C]">
            {search ? (
                <input type="search" placeholder="search" className="rounded-lg w-[20%] ml-2 p-2" />
            ) : (
                <svg className="ml-2" onClick={handleSearchClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={40}>
                    <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
            )}
            <NavLink to="/donations" className="font-bold text-white p-2">Donations</NavLink>
            <img src={logo} alt="myfinlogo" className="w-[7%] rounded-full" />
            <NavLink to="/signin" className="font-bold text-white p-2">Sign in</NavLink>
            <NavLink to="/register" className="font-bold text-white p-2 mr-2">Register</NavLink>
        </div>
    );
}

export default Navbar;
