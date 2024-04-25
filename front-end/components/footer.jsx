import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="flex flex-col bg-[#02A95C] h-[60vh] rounded-t-[15px] justify-evenly ">
        <div className="flex">
          <div className="w-[30%] hidden md:block flex flex-col h-[50%] justify-center">
            <h1 className=" text-center text-7xl font-bold text-white ">
              MyFin
            </h1>
          </div>
          <div className=" flex flex-col md:flex-row h-[70%] w-[60%] items-center    justify-center md:justify-between mt-[5%]">
            <div className="flex flex-col text-white items-center justify-between">
              <h1 className="font-bold text-2xl">Contact us</h1>
              <navlink>Facebook</navlink>
              <navlink>Instagram</navlink>
              <navlink>Twitter</navlink>
              <navlink>+212625336329</navlink>
            </div>
            <div className="flex flex-col text-white items-center justify-between">
              <h1 className="font-bold text-2xl">Learn More</h1>
              <navlink>how to invest ?</navlink>
              <navlink>how to donate ?</navlink>
              <navlink>Discover our Portfolios</navlink>
              <navlink>What is Crowdfunding ?</navlink>
            </div>
            <div className="flex flex-col text-white items-center justify-between">
              <h1 className="font-bold text-2xl">Discover More</h1>
              <navlink>Meet our team</navlink>
              <navlink>About us</navlink>
              <navlink>Our terms and conditions</navlink>
              <navlink>Privacy Policy</navlink>
            </div>
          </div>
        </div>
        <p className="text-center text-white">All rights Reserved © 2024 </p>
      </div>
    </>
  );
};

export default Footer;
