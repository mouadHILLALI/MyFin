import visa from "../public/visa.jpg";
import Mastercard from "../public/Mastercard.png";

export const VerifyProfile = () => {
  return (
    <div className=" w-[80%] h-full flex flex-col m-auto gap-7 border-2  rounded-lg  ">
      <h1 className="text-3xl border-b-2 p-2">Enter Your Account Info:</h1>
     
      <form className="w-full ">
        <div className="border-2 border-black w-[50%] m-3 rounded-[30px]">
          <input
            placeholder="Enter Your CIN (e.g JM44553) :"
            type="text"
            className="w-full p-2 rounded-[30px]"
          />
        </div>
        <h1 className="m-3 text-xl">Enter Your Billing Info : </h1>
        <div className="flex flex-col gap-7">
          <div className="flex  justify-center">
            <img
              width={200}
              className="w-[30%] drop-shadow-lg"
              src={visa}
              alt="..."
            />
            <img
              width={200}
              className="w-[30%] drop-shadow-lg"
              src={Mastercard}
              alt="..."
            />
          </div>
          <div className="w-full flex flex-col gap-7  ">
            <div className="w-full text-xl border-t-2 border-b-2 border-slate  p-2">
              <h2>Card Info :</h2>
            </div>
            <div className="w-full flex justify-between p-2">
              <label htmlFor="cardinfo">Card Number</label>
              <input
                id="cardinfo"
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className="w-[30%]"
              />
              <label htmlFor="carddate">Card Expiration Date</label>
              <input id="carddate" type="date" className="w-[30%]" />
            </div>
          </div>
        </div>
        <button className="w-full text-center p-2 bg-[#02A95C] mb-2 text-white text-xl ">Verify</button>
      </form>
    </div>
  );
};
