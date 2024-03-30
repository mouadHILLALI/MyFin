const Register = () => {
  return (
    <>
      <section className="flex h-[100vh] bg-[#FBF8F6] overflow-x-hidden justify-between">
        <div className="flex flex-col w-[30%] h-[50%] justify-around m-auto">
          <div className="h-[50%]">
            <h1 className="text-6xl text-[#4C4B4B]">MyFin</h1>
          </div>
          <div className="h-[30%] text-[#4C4B4B] flex flex-col gap-2">
            <h2 className="text-4xl">Lets Begin your Journey with MyFin</h2>
            <p className="text-xl">We are here to help you reach your goals</p>
          </div>
        </div>
        <div className="bg-white rounded-l-[60px] rounded-t-[0px] flex flex-col h-[90%]  w-[60%]  drop-shadow-md">
          <form
            action=""
            className="flex flex-col w-[60%] h-[90vh] m-auto justify-around"
          >
            <div className="p-3 border border-black rounded-[15px] w-[70%] ">
            <input
              className="border-1 border-black rounded-lg  p-2"
              type="text"
              name="first_name"
              placeholder="Enter your First name"
            />
            </div>
            <div className="p-3 border border-black rounded-[15px] w-[70%] ">
            <input
              className="border-1 border-black p-2"
              type="text"
              name="family_name"
              placeholder="Enter your Last name"
            />
            </div>
            <div className="p-3 border border-black rounded-[15px] w-[70%] ">
            <input
              className="border-1 border-black p-2"
              type="text"
              name="email"
              placeholder="Enter your Email"
            />
            </div>
            
            <select className="p-3 border border-black rounded-[15px] w-[70%]" name="role">
              <option selected disabled hidden>
                What is your purpose ?
              </option>
              <option
                className="border-1 border-black rounded-lg"
                value="FundRaiser"
              >
                FundRaiser
              </option>
              <option
                className="border-1 border-black rounded-lg"
                value="Investor"
              >
                Investor
              </option>
            </select>
            <div className=" p-3 border border-black rounded-[15px] w-[70%]">
            <label className="text-center" htmlFor="image">Upload your image</label>
            <input className="hidden" type="file" name="image" id="image"/>
            </div>
            <div className="p-3 border border-black rounded-[15px] w-[70%] ">
            <input
              className="border-1 border-black rounded-lg p-2"
              type="password"
              placeholder="Enter your Password"
              name="password"
            />
            </div>
            <div className="flex justify-end w-[73%] ">
              <span className="py-3 px-8 bg-[#02A95C] rounded-[15px] mr-3 text-white">
            <button type="submit" className="">
              Register
            </button>
            </span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
