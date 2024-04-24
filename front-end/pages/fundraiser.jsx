import { FundraiserNav } from "../components/fundraiser/fundraiserNav";
import { FundRaiserDash } from "../components/fundraiser/fundraiserDash";
function Fundraiser() {
  return (
    <>
      <div className="flex  h-screen ">
        <div className=" md:w-[20%]  flex flex-col items-center justify-center">
          <div className="flex  h-[95%] w-full md:w-[90%] ">
            <FundraiserNav />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex md:flex-col  md:w-[70%] ">
          <FundRaiserDash />
        </div>
      </div>
    </>
  );
}

export default Fundraiser;
