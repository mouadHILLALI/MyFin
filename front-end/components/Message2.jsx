import { useState  } from "react";
import axios from "axios";

export const Message2 = () => {
    const [balance , setBalance] = useState(1000);
    const token = localStorage.getItem("token");
    const handleform = async (e)=>{
        e.preventDefault();
        try {
            let fr = new FormData();
            fr.append('balance', balance);
            const res = await axios.post("http://localhost/api/investor/portfolio/create", fr,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
      <div className=" h-[80vh] w-full flex flex-col  ">
        <div className=" flex flex-col items-center h-[30vh] w-[50vw] m-auto ">
          <h1 className="text-3xl text-black">
            Please Register Your Portfolio
          </h1>
          <form onSubmit={handleform} className="flex items-center flex-col m-4" >
            <input value={balance} 
            name="balance"
            onChange={(e)=>setBalance(e.target.value)}
            type="number" min={1000} className="p-4 rounded-[15px]  text-center " placeholder="Enter Your Balance" />
          <button
            onClick={() => setPop(true)}
            className="p-4 bg-[#02A95C] text-white flex items-center gap-2 m-4 rounded-[15px]"
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
            Create a Portfolio
          </button>
          </form>
        </div>
      </div>
    </>
  );
};
