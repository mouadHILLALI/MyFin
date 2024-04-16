
import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const VerifyProfile = () => {
    const [CIN , setCIN] = useState("");
    let token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleform = async (e)=> {
        e.preventDefault();
        try {
            const fr = new FormData();
            fr.append('CIN', CIN);
            const res = await axios.post("http://localhost/api/user/verify",fr ,{
                headers: {
                  Authorization: `Bearer ${token}`, 
                },
              });
              console.log(res);
              navigate('/investor');
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className=" w-[80%] h-full flex flex-col m-auto gap-7 border-2  rounded-lg  ">
      <h1 className="text-3xl border-b-2 p-2">Enter Your Account Info:</h1>
     
      <form onSubmit={handleform} className="w-full ">
        <div className="border-2 border-black w-[50%] m-3 rounded-[30px]">
          <input
            placeholder="Enter Your CIN (e.g JM44553) :"
            type="text"
            name="CIN"
            value={CIN}
            onChange={(e)=>setCIN(e.target.value)}
            className="w-full p-2 rounded-[30px]"
          />
        </div>
        <h1 className="m-3 text-xl">Enter Your Billing Info : </h1>
        <button className="w-full text-center p-2 bg-[#02A95C] mb-2 text-white text-xl ">Verify</button>
      </form>
    </div>
  );
};
