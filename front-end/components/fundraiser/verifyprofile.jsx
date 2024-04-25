import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const VerifyProfile = () => {
  const [CIN, setCIN] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("CIN", CIN);
      const res = await axios.post("http://localhost/api/user/verify", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      console.log(res);
      if (res.status === 200) {
        navigate("/fundraiser");
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="m-auto h-[40%] md:h-[60%] bg-white drop-shadow-lg p-2 flex flex-col items-center justify-center w-[80%] md:w-[60%] flex flex-col gap-3"
    >
      <h1 className="text-xl m-4 text-[#344767] font-bold">
        Please enter your identity card to verify your account:
      </h1>
      <input
        placeholder="Enter Your CIN (e.g JM44553):"
        type="text"
        name="CIN"
        value={CIN}
        onChange={(e) => setCIN(e.target.value)}
        className="w-[60%] p-2 rounded-lg"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-[60%] text-center p-2 bg-[#02A95C] font-bold rounded-lg mb-2 text-black text-xl"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </form>
  );
};
