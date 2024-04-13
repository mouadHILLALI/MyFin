import { useState } from "react";

export const Dashboardinv = () => {
  let style = "";
  const [slide, setSlide] = useState(false);
  if (slide) {
    style =
      "ease-in-out overflow-auto duration-300 fixed top-[7.5%] w-[30%] h-full bg-[#02A95C] border-2 border-black rounded-r-[14px] ";
  } else {
    style =
      "ease-in-out overflow-auto duration-300 fixed left-[-100%] h-full bg-[#02A95C] border-2 border-black rounded-r-[14px] top-[7.5%] w-[30%] h-[80%]";
  }
  return (
    <>
      <div className=" w-[90%] m-auto flex gap-7 ">
        <button
          onClick={() => setSlide(true)}
          className="bg-[#02A95C] flex gap-2 items-center text-white text-lg  p-3 rounded-[16px] drop-shadow-lg "
        >
          <svg
            width={15}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="#ffffff"
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
            />
          </svg>
          Request a Loan
        </button>
        <button className="bg-[#02A95C] flex gap-2 items-center text-white text-lg  p-3 rounded-[16px] drop-shadow-lg ">
          <svg
            width={15}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 460 512"
          >
            <path
              fill="#ffffff"
              d="M220.6 130.3l-67.2 28.2V43.2L98.7 233.5l54.7-24.2v130.3l67.2-209.3zm-83.2-96.7l-1.3 4.7-15.2 52.9C80.6 106.7 52 145.8 52 191.5c0 52.3 34.3 95.9 83.4 105.5v53.6C57.5 340.1 0 272.4 0 191.6c0-80.5 59.8-147.2 137.4-158zm311.4 447.2c-11.2 11.2-23.1 12.3-28.6 10.5-5.4-1.8-27.1-19.9-60.4-44.4-33.3-24.6-33.6-35.7-43-56.7-9.4-20.9-30.4-42.6-57.5-52.4l-9.7-14.7c-24.7 16.9-53 26.9-81.3 28.7l2.1-6.6 15.9-49.5c46.5-11.9 80.9-54 80.9-104.2 0-54.5-38.4-102.1-96-107.1V32.3C254.4 37.4 320 106.8 320 191.6c0 33.6-11.2 64.7-29 90.4l14.6 9.6c9.8 27.1 31.5 48 52.4 57.4s32.2 9.7 56.8 43c24.6 33.2 42.7 54.9 44.5 60.3s.7 17.3-10.5 28.5zm-9.9-17.9c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z"
            />
          </svg>
          consult Investors
        </button>
      </div>
      <div className=" w-[90%] m-auto ">
        <h1>You have no Loans yet</h1>
      </div>

      <div className={style}>
        <div className=" flex justify-end p-4">
          <button className="mr-4" onClick={() => setSlide(false)}>
            <svg
              width={30}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="#ffffff"
                d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
              />
            </svg>
          </button>
        </div>
        <form className="flex flex-col h-full gap-4 ">
          <div className="flex">
            <input
              className="p-2 rounded-[15px] w-[80%] m-auto"
              min={1000}
              type="number"
              placeholder="Enter the Amount of the Loan :"
            />
          </div>
          <label className="text-white text-lg m-4 " htmlFor="duration">
            Enter the loan Riembursement Duration:
          </label>
          <div id="duration" className="flex justify-around m-4 ">
            <input
              className=" w-[30%] p-2 rounded-lg "
              min={0}
              type="number"
              placeholder="Years"
            />
            <input
              className=" w-[30%] p-2 rounded-lg "
              min={0}
              max={12}
              type="number"
              placeholder="Months"
            />
            <input
              className=" w-[30%] p-2 rounded-lg "
              min={10}
              max={31}
              type="number"
              placeholder="Days"
            />
          </div>
          <div className="flex">
            <input
              className="w-[80%] m-auto p-2 rounded-[15px] "
              type="number"
              min={1}
              placeholder="Enter the Loan profit Rate :"
            />
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-col items-center gap-3 m-auto">
              <label className="text-white text-lg ">Upload Your Bussiness Model:</label>
            <label htmlFor="file">
              <svg width={80} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path fill="#ffffff" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z" />
              </svg>
            </label>
            <input id="file" type="file" className="hidden" />
            </div>
          </div>
          <button className=" p-2 bg-white text-white text-lg" type="submit">Submit for Review</button>
        </form>
      </div>
    </>
  );
};
