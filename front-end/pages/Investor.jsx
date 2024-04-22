import InvestorNavbar from "../components/investorNav";
import { InvestorDash } from "../components/investordash";
function Investor() {
  return (
    <>
      <div className="flex w-full h-screen bg-[#f0f2f5] ">
        <div className=" md:w-[20%] flex flex-col items-center justify-center">
          <div className="flex h-[95%] w-full md:w-[90%] ">
            <InvestorNavbar />
          </div>
        </div>
        <div className="flex flex-col  w-[70%] ">
          <InvestorDash />
        </div>
      </div>
    </>
  );
}

export default Investor;
