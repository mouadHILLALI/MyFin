export const Dashboard = () => {
  return (
    <>
      <div className="w-full h-[15%] bg-white flex flex-row justify-between m-4">
        <div className="w-[30%] flex flex-col  bg-white drop-shadow-lg rounded-lg ">
          <h3 className="font-bold m-2 ">Total Investors :</h3>
          <h3></h3>
        </div>
        <div className="w-[30%] flex flex-col bg-white drop-shadow-lg rounded-lg ">
          <h3 className="font-bold m-2 ">Total Fundraisers :</h3>
          <h3></h3>
        </div>
        <div className="w-[30%] flex flex-col bg-white drop-shadow-lg  rounded-lg">
          <h3 className="font-bold m-2 ">Total Amount Invested :</h3>
          <h3></h3>
        </div>
      </div>
      <div className=" h-[80%] w-full m-4 bg-white drop-shadow-lg ">

      </div>
    </>
  );
};
