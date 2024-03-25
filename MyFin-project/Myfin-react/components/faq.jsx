import { useState } from "react";

const [showAnswer , setShowAnswer] = useState(false) ;

function FAQ(){
return (
    <>
    <h1 className="text-center font-bold text-5xl">FAQ:</h1>
    <div className="w-[80%] m-auto flex flex-col gap-4 mt-4 mb-4">
    <div className="bg-[#02A95C] p-3 rounded-[15px] flex items-center text-white font-bold justify-between"> 
        <h3 className="text-xl">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet ?</h3>
        <button className="mr-5" >
        <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/></svg>
        </button>
    </div>
    <div className="bg-[#02A95C] p-3 rounded-[15px] flex flex-col items-end text-white font-bold justify-between">
        <button className="mr-5" >
        <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z"/></svg>
        </button>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ultricies nunc. Nunc at aliquam magna. Sed vel sem sapien. Proin sed maximus magna. Integer ultricies mauris ut odio volutpat, a euismod nisi fermentum. Morbi facilisis eros sapien, sed semper odio molestie sit amet. Nullam porta urna eu egestas porttitor. Quisque eu justo at massa ultrices consectetur quis sed enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque commodo porta efficitur. Nunc nec nunc accumsan tellus scelerisque pellentesque. Vivamus egestas orci nisl, a varius magna lacinia vel. Nulla dictum suscipit risus a molestie.
        </p>
    </div>
    </div>
    </>
)

}

export default FAQ ;