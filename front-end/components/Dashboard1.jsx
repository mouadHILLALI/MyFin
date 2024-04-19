import { useEffect, useState } from "react";
import axios from "axios";

export const Dashboardinv = () => {
  let style = "";
  const API = "http://localhost/api/";
  const token = localStorage.getItem("token");
  const [slide, setSlide] = useState(false);
  const [option, setOption] = useState(false);
  const [edit, setEdit] = useState(false);
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(0);
  const [model, setModel] = useState("");
  const [loans, SetLoan] = useState([]);
  let file = document.getElementById("file");
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get("http://localhost/api/investor/loan/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        SetLoan(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLoans();
  }, []);
  if (slide) {
    style =
      "ease-in-out overflow-auto duration-300 fixed top-[7.5%] w-[30%] h-full bg-[#02A95C] border-2 border-black rounded-r-[14px] ";
  } else {
    style =
      "ease-in-out overflow-auto duration-300 fixed left-[-100%] h-full bg-[#02A95C] border-2 border-black rounded-r-[14px] top-[7.5%] w-[30%] h-[80%]";
  }
  const handleform = async (e) => {
    e.preventDefault();
    let days = document.getElementById("days").value;
    let months = document.getElementById("months").value;
    let years = document.getElementById("years").value;
    let deadline = days + months * 30 + years * 360;
    setDuration(deadline);
    const fr = new FormData();
    fr.append("amount", amount);
    fr.append("duration", duration);
    fr.append("rate", rate);
    if (file.files && file.files[0]) {
      fr.append("file", file.files[0]);
    }
    try {
      const res = await axios.post(
        "http://localhost/api/investor/loan/create",
        fr,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchEditData = async (id) => {
    try {
      const res = await axios.get(`http://localhost/api/investor/loan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAmount(res.data.data.amount);
      setRate(res.data.data.profit_rate);
      console.log(res.data.data);
      setDuration(res.data.data.duration);
      setModel(res.data.data.business_model);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className=" w-[90%] m-auto flex gap-7 ">
        {loans.length == 0 ? (
          <button
            onClick={() => setSlide(true)}
            className="bg-[#02A95C] flex gap-2 items-center text-white text-lg  p-3 rounded-[16px] drop-shadow-lg "
          >
            <svg
              width={15}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#ffffff"
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
              />
            </svg>
            Request a Loan
          </button>
        ) : (
          <button className="bg-[#02A95C] flex gap-2 items-center text-white text-lg  p-3 rounded-[16px] drop-shadow-lg ">
            You have a loan pending for review
          </button>
        )}
        <button className="bg-[#02A95C] flex gap-2 items-center text-white text-lg  p-3 rounded-[16px] drop-shadow-lg ">
          <svg
            width={15}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 460 512"
          >
            <path
              fill="#ffffff"
              d="M220.6 130.3l-67.2 28.2V43.2L98.7 233.5l54.7-24.2v130.3l67.2-209.3zm-83.2-96.7l-1.3 4.7-15.2 52.9C80.6 106.7 52 145.8 52 191.5c0 52.3 34.3 95.9 83.4 105.5v53.6C57.5 340.1 0 272.4 0 191.6c0-80.5 59.8-147.2 137.4-158zm311.4 447.2c-11.2 11.2-23.1 12.3-28.6 10.5-5.4-1.8-27.1-19.9-60.4-44.4-33.3-24.6-33.6-35.7-43-56.7-9.4-20.9-30.4-42.6-57.5-52.4l-9.7-14.7c-24.7 16.9-53 26.9-81.3 28.7l2.1-6.6 15.9-49.5c46.5-11.9 80.9-54 80.9-104.2 0-54.5-38.4-102.1-96-107.1V32.3C254.4 37.4 320 106.8 320 191.6c0 33.6-11.2 64.7-29 90.4l14.6 9.6c9.8 27.1 31.5 48 52.4 57.4s32.2 9.7 56.8 43c24.6 33.2 42.7 54.9 44.5 60.3s.7 17.3-10.5 28.5zm-9.9-17.9c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z"
            />
          </svg>
          consult Investors
        </button>
      </div>
      <div className=" w-[90%] m-auto ">
        {loans.length == 0 ? (
          <h1>You have no Loans yet</h1>
        ) : (
          <div className=" flex flex-col justify-between w-[60%] m-4 p-2 rounded-[15px] h-[50vh] bg-white drop-shadow-lg ">
            <div className="flex flex-col gap-2 ">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 w-[40%] ">
                  <label className="font-bold text-xl">Loan Amount :</label>
                  <h2 className="font-bold text-xl">{loans[0].amount}DH</h2>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      option ? setOption(false) : setOption(true);
                    }}
                    className="flex flex-col items-center bg-slate-200 p-2 rounded-full mr-3 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width={20}
                    >
                      <path
                        fill="#000000"
                        d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
                      />
                    </svg>
                  </button>
                  {option && (
                    <div className="fixed flex flex-col gap-3 px-4 items-center z-10 bg-slate-200 rounded-[15px] p-2 top-[15%] ">
                      <button
                        value={loans[0].id}
                        onClick={(e) => {
                          setEdit(true);
                          fetchEditData(loans[0].id);
                        }}
                        className="flex items-center "
                      >
                        <svg
                          width={25}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="#74C0FC"
                            d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                          />
                        </svg>
                      </button>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          width={25}
                        >
                          <path
                            fill="#e51c06"
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="bg-blue-500 flex flex-col justify-between  gap-4 p-6 rounded-[20px] text-white">
                  <label className="font-bold text-2xl">
                    Reimbursement Duration
                  </label>
                  <h2 className="text-2xl">{loans[0].duration}Days</h2>
                  <a
                    className=" bg-white text-black text-center font-bold shadow-sm	 p-4 rounded-[25px] "
                    target="blank"
                    href={`http://localhost/storage/` + loans[0].business_model}
                  >
                    Busseniss Model
                  </a>
                </div>
                <div className="bg-green-500 p-5 rounded-[20px] text-white ">
                  <label className="font-bold text-5xl">Profit Rate</label>
                  <h1 className="font-bold text-6xl">
                    {loans[0].profit_rate}%
                  </h1>
                </div>
              </div>
            </div>
            <div className="w-[15%]">
              {loans[0].reviewd == 0 ? (
                <h1 className="bg-yellow-200 text-white p-3 rounded-[15px] ">
                  Submited for Review
                </h1>
              ) : (
                <h1 className="bg-green-400 text-white text-center p-2 rounded-[15px] ">
                  Approved
                </h1>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={style}>
        <div className=" flex justify-end p-4">
          <button className="mr-4" onClick={() => setSlide(false)}>
            <svg
              width={30}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="#ffffff"
                d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
              />
            </svg>
          </button>
        </div>
        <form
          onSubmit={handleform}
          encType="multipart/form/data"
          className="flex flex-col h-full gap-4 "
        >
          <div className="flex">
            <input
              className="p-2 rounded-[15px] w-[80%] m-auto"
              min={1000}
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter the Amount of the Loan :"
            />
          </div>
          <label className="text-white text-lg m-4 " htmlFor="duration">
            Enter the loan Riembursement Duration:
          </label>
          <div id="duration" className="flex justify-around m-4 ">
            <input
              className=" w-[30%] p-2 rounded-lg "
              min={0}
              id="years"
              type="number"
              placeholder="Years"
            />
            <input
              className=" w-[30%] p-2 rounded-lg "
              min={0}
              max={12}
              id="months"
              type="number"
              placeholder="Months"
            />
            <input
              className=" w-[30%] p-2 rounded-lg "
              min={10}
              max={31}
              id="days"
              type="number"
              placeholder="Days"
            />
          </div>
          <div className="flex">
            <input
              className="w-[80%] m-auto p-2 rounded-[15px] "
              type="number"
              min={1}
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              name="rate"
              placeholder="Enter the Loan profit Rate :"
            />
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-col items-center gap-3 m-auto">
              <label className="text-white text-lg ">
                Upload Your Bussiness Model:
              </label>
              <label htmlFor="file">
                <svg
                  width={80}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="#ffffff"
                    d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z"
                  />
                </svg>
              </label>
              <input id="file" name="file" type="file" className="hidden" />
            </div>
          </div>
          <button className=" p-2 bg-white text-white text-lg" type="submit">
            Submit for Review
          </button>
        </form>
      </div>

      {edit && (
        <div className="h-full bg-slate-50 w-full fixed  flex flex-col justify-center rounded-[15px] top-[8%]">
          <div className="flex w-[90%] justify-end m-4 ">
            <button onClick={() => setEdit(false)}>
              <svg
                width={30}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
          <form className="flex  flex-col gap-4 h-[70%] bg-[#02a95c] w-[70%] m-auto p-6 rounded-[20px] ">
            <div className="flex gap-6 justify-center ">
              <div className="flex items-center gap-3">
                <label className="text-white font-bold" htmlFor="">Loan Amount : </label>
                <input
                  type="number"
                  className="text-center p-2 rounded-[15px] "
                  name="amount"
                  min={1000}
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-white font-bold" htmlFor="">Loan Profit Rate : </label>
                <input
                  type="number"
                  min={1}
                  className="text-center p-2 rounded-[15px] "
                  name="rate"
                  onChange={(e) => setRate(e.target.value)}
                  value={rate}
                />
              </div>
            </div>
            <label className="text-white text-center font-bold">Loan Duration : </label>
            <input
              type="number"
              min={10}
              className="text-center p-2 rounded-[15px] "
              name="duration"
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
            />
            <div className="flex flex-col ">
              <div className="flex flex-col items-center gap-3 m-auto">
                <label className="text-white text-lg ">
                  Upload Your Bussiness Model:
                </label>
                <label htmlFor="file">
                  <svg
                    width={80}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="#ffffff"
                      d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z"
                    />
                  </svg>
                </label>
                <input id="file" name="file" type="file" className="hidden" />
              </div>
            </div>
            <button className="font-bold text-white text-2xl">Edit</button>
          </form>
        </div>
      )}
    </>
  );
};
