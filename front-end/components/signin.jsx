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
        <div className="bg-white rounded-l-[60px] rounded-t-[0px] flex flex-col h-[90%]  w-[60%]  drop-shadow-md">
          <form
            action=""
            className="flex flex-col w-[60%] h-[90vh] m-auto justify-around">
                <div className="flex flex-col">
            <input
              className="border-1 border-black rounded-lg  p-2"
              type="text"
              name="cin"
              placeholder="Enter your CIN"
            />
            <input
              className="border-1 border-black rounded-lg  p-2"
              type="text"
              name="password"
              placeholder="Enter your Password"
            />

            <button type="submit" className=" p-3 bg-black">
              Register
            </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
