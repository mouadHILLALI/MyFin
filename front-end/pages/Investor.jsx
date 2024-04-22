import InvestorNavbar from "../components/investorNav";
import { InvestorDash } from "../components/investordash";
function Investor() {
  return (
    <>
      <div className="flex  h-screen ">
        <div className=" md:w-[20%] flex flex-col items-center justify-center">
          <div className="flex h-[95%] w-full md:w-[90%] ">
            <InvestorNavbar />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex md:flex-col  md:w-[70%] ">
          <InvestorDash />
        </div>
      </div>
    </>
  );
}

export default Investor;
