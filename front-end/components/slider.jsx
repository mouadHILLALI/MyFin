import cancer from "../public/image1.png"
import village from "../public/village.png"
import gaza from "../public/gaza.png"
import React, { useState } from 'react';
let slider = document.getElementById('slider');
function toLeft() {
    slider.style.left = '0%';
}
function toRight() {
    slider.style.left  = '-110%'; 
}

function Slider(){
    
return <>
    <section className="w-[80%] m-auto mt-3 overflow-hidden">
        <div className="flex items-center justify-between "> 
            <h1 className="font-bold text-5xl w-[70%]">We Encourage Philanthropy</h1>
            <div className="w-[20%] flex items-center gap-6">
            <button onClick={toLeft}><svg width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#000000" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button>
            <button onClick={toRight}><svg width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#000000" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg></button>
            </div>
        </div>
        <div id="slider" className="flex relative w-[200%] justify-between ">
        <div className="flex justify-between mt-7 gap-7 ">
            <div>
                <img src={cancer} alt="cancer" />
                <h3>Help me fight brain cancer</h3>
                <progress id="file" value="32" max="100"> 32% </progress>
                <h3>50.000 DH Raised</h3>
            </div>
            <div className="flex flex-col">
                <div>
                <img src={village} alt="village" />
                <h3>Help people in the atlas get fresh water</h3>
                <progress id="file" value="32" max="100"> 32% </progress>
                <h3>100.000 DH Raised</h3>
                </div>
                <div>
                <img src={gaza} alt="gaza" />
                <h3>Donate to children in Gaza </h3>
                <progress id="file" value="32" max="100"> 32% </progress>
                <h3>123.000 DH Raised</h3>
                </div>
            </div>
        </div>
        <div className=" flex justify-between mt-7 gap-7">
            <div>
                <img src={cancer} alt="cancer" />
                <h3>Help me fight brain cancer</h3>
                <progress id="file" value="32" max="100"> 32% </progress>
                <h3>50.000 DH Raised</h3>
            </div>
            <div className="flex flex-col">
                <div>
                <img src={village} alt="village" />
                <h3>Help people in the atlas get fresh water</h3>
                <progress id="file" value="32" max="100"> 32% </progress>
                <h3>100.000 DH Raised</h3>
                </div>
                <div>
                <img src={gaza} alt="gaza" />
                <h3>Donate to children in Gaza2 </h3>
                <progress id="file" value="32" max="100"> 32% </progress>
                <h3>123.000 DH Raised</h3>
                </div>
            </div>
        </div>
        </div>
    </section>
</>

}

export default Slider;