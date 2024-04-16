import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const VerifyProfile = () => {
  const [CIN, setCIN] = useState("");
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleform = async (e) => {
    e.preventDefault();
    console.log(token);
    try {
      const fr = new FormData();
      fr.append("CIN", CIN);
      const res = await axios.post("http://localhost/api/user/verify", fr, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      navigate("/fundraiser");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
        <h1 className="text-xl m-4  font-bold">
          Please enter your identity card to verify your account :
        </h1>
      <div className="flex flex-col h-[40%] items-center justify-center">
        <form onSubmit={handleform} className="w-[60%] flex flex-col gap-3">
          <input
            placeholder="Enter Your CIN (e.g JM44553) :"
            type="text"
            name="CIN"
            value={CIN}
            onChange={(e) => setCIN(e.target.value)}
            className="w-[60%] p-2 rounded-[30px]"
          />
          <button className="w-[60%] text-center p-2 bg-[#02A95C] mb-2 text-white text-xl ">
            Verify
          </button>
        </form>
      </div>
    </>
  );
};
