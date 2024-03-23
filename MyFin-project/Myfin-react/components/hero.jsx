import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import hero from '../public/hero.png';

function Hero() {
    return (
        <>
            <section style={{ backgroundImage: `url(${hero})` }} className="w-full h-[80vh] bg-cover bg-center flex flex-col items-center">
                <div className="w-[35%] m-auto flex flex-col items-center gap-4">
                    <h1 className="text-[#01743F] font-bold text-5xl text-center">
                    Learn More About 
                        MyFin
                    </h1>
                    <a className="p-4 bg-white hover:bg-[#01743F] text-black hover:text-white  rounded-xl" href="#about">Discover MyFin</a>
                </div>
            </section>
        </>
    );
}

export default Hero;
