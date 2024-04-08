import { NavLink } from "react-router-dom";
const Login = () => {
  return (
    <>
      <section className="flex h-[100vh] bg-[#FBF8F6] overflow-x-hidden justify-between">
        <div className="flex flex-col w-[30%] h-[50%] justify-around m-auto">
          <div className="h-[50%]">
            <h1 className="text-6xl text-[#4C4B4B]">MyFin</h1>
          </div>
          <div className="h-[30%] text-[#4C4B4B] flex flex-col gap-2">
            <h2 className="text-4xl">Welcome Back</h2>
            <p className="text-xl">Sign in to MyFin</p>
          </div>
        </div>
        <div className="bg-white rounded-l-[60px] rounded-t-[0px] flex flex-col h-[90%]  w-[60%]  shadow-2xl">
          <div className="flex justify-end w-[90%] mt-4"> 
          <h1>Don’t Have an account ?<NavLink to="/register" className="pl-1 underline">Sign up</NavLink></h1>
          </div>
          <form
            action=""
            className="flex flex-col w-[60%] h-[90vh] m-auto justify-around"
          >
            <div className="flex flex-col gap-5">
              <h2>Your account Credentials </h2>
              <div className="p-3 border border-black rounded-[15px] w-[70%] ">
              <input
                className="p-2 border-none"
                type="text"
                name="email"
                placeholder="Enter your Email"
              />
              </div>

              <div className="p-3 border border-black rounded-[15px] w-[70%] ">
              <input
                className="border-none  p-2"
                type="text"
                name="password"
                placeholder="Enter your Password"
              />
              </div>
              <div className="flex items-center gap-4">
                <NavLink to="/resetpassword" className=" pr-2 underline">
                  forget your password ?
                </NavLink>
                <button type="submit" className="p-2 bg-blue-300 ">
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