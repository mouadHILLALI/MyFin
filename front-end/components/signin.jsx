import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let style = "p-2 border-none w-full";
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/; // Corrected regex definition

      if (emailRegex.test(email)) {
        form.append("email", email);
      } else {
        setError("Invalid Email");
        return;
      }

      form.append("password", password);
      const res = await axios.post("http://localhost/api/user/login", form);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("image", res.data.image);
      let role = res.data.role;
      if (res.data.status === 200) {
        switch (role) {
          case "Investor":
            localStorage.setItem('role' , role);
            navigate("/investor");
            break;
          case "FundRaiser":  
            localStorage.setItem('role' , role);
            navigate("/fundraiser");
            break;
          case "Admin":
            localStorage.setItem('role' , role);
            navigate("/admin");
            break;
          default:
            navigate("/");
            break;
        }
      } else {
        setError(`Error: ${res.data.data}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="flex flex-col md:flex-row h-[100vh] bg-[#FBF8F6] overflow-x-hidden justify-between">
        <div className="flex flex-col w-[30%] hidden md:block h-[50%] justify-around m-auto">
          <div className="h-[50%]">
            <h1 className="text-6xl text-[#4C4B4B]">MyFin</h1>
          </div>
          <div className="h-[30%] text-[#4C4B4B] flex flex-col gap-2">
            <h2 className="text-4xl">Welcome Back</h2>
            <p className="text-xl">Sign in to MyFin</p>
          </div>
        </div>
        <div className="bg-white rounded-lg md:rounded-l-[60px] md:rounded-t-[0px] flex flex-col   h-full md:h-[90%]  w-full md:w-[60%]  shadow-2xl">
          <div className="flex justify-end w-[90%] mt-4">
            <h1>
              Don’t Have an account ?
              <NavLink to="/register" className="pl-1 underline">
                Sign up
              </NavLink>
            </h1>
          </div>
          <form
            onSubmit={handleLogin}
            className="flex flex-col w-[80%] md:w-[60%] h-full md:h-[90vh] m-auto  justify-around"
          >
            <div className="flex flex-col gap-5">
              <h2>Your account Credentials </h2>
              <div className="p-3 border border-black rounded-[15px] w-[70%] ">
                <input
                  className="p-2 border-none w-full"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                />
              </div>

              <div className="p-3 border border-black rounded-[15px] w-[70%] ">
                <input
                  className="border-none  p-2 w-full "
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                />
              </div>
              <span className=" flex gap-3 text-red-600  font-bold">
                {error}
              </span>
              <div className="flex flex-row items-center gap-4">
                <NavLink to="/resetpassword" className=" pr-2 underline">
                  forget your password ?
                </NavLink>
                <button type="submit" className="p-2  bg-green-400 ">
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
