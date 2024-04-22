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
  const [id, setID] = useState(0);
  const [model, setModel] = useState("");
  const [loans, SetLoan] = useState([]);
  const [investment, setInvestment] = useState(0);
  const [profit, setProfit] = useState(0);
  let file = document.getElementById("file");
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
  const fetchUserData =async ()=>{
    
  }
  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(API + "portfolio/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInvestment(res.data.balance);
      setProfit(res.data.estimated_profit);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLoans();
    fetchPortfolio();
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
      fetchLoans();
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
      setDuration(res.data.data.duration);
      setModel(res.data.data.business_model);
      setID(res.data.data.id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      let fr = new FormData();
      fr.append("id", id);
      fr.append("rate", rate);
      fr.append("amount", amount);
      fr.append("duration", duration);
      if (file.files && file.files[0]) {
        fr.append("file", file.files[0]);
      }
      const res = await axios.post(
        "http://localhost/api/investor/loan/update",
        fr,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      fetchLoans();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full gap-3 flex">
      <div className="flex flex-col w-[80%]">
        <div className="flex font-bold  gap-2 h-[30%] mt-5  w-full ">
          <div className="flex bg-[#ffffff] flex flex-col items-start justify-center p-4 drop-shadow-lg rounded-lg gap-2 w-[40%] h-[70%]">
            <h3>Request a loan :</h3>
            {loans.length == 0 ? (
              <button
                onClick={() => setSlide(true)}
                className="bg-[#02A95C] flex gap-2  items-center text-white text-lg  p-3 rounded-full  "
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
              </button>
            ) : (
              <h3>You have already requested a loan</h3>
            )}
          </div>
          <div className="flex flex-col items-start justify-center w-[40%] h-[70%] bg-[#ffffff] p-4 drop-shadow-lg rounded-lg">
            <h2 className="text-[#02a95c] font-bold ">Your Balance :</h2>
            <h1 className="text-3xl">{investment ? investment : 0}DH</h1>
          </div>
          <div className="flex flex-col items-start justify-center w-[40%] h-[70%] bg-[#ffffff] p-4 drop-shadow-lg rounded-lg">
            <h2 className="text-[#02a95c] font-bold ">Your Profits :</h2>
            <h1 className="text-3xl">{profit ? profit : 0}DH</h1>
          </div>
        </div>
        <div className="flex flex-col bg-white h-[64%] rounded-lg drop-shadow-lg  overflow-auto">
          <div className=" flex flex-col h-full">
            {loans.length == 0 ? (
              <div className="flex flex-col h-full justify-center items-center">
                <div className="opacity-75 flex flex-col items-center">
                  <svg
                    width={150}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#02a95c"
                      d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                    />
                  </svg>
                  <p className="font-bold text-[#02A95C]">Notice : </p>
                  <p className="text-[#02A95c]">You have no loans yet.</p>
                </div>
              </div>
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
                        className="transition-all hover:bg-blue-500 border-black hover:text-white hover:border bg-white text-black text-center font-bold shadow-sm	 p-4 rounded-[25px] "
                        target="blank"
                        href={loans[0].business_model}
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
                <div className="w-[30%]">
                  {loans[0].reviewd == 0 ? (
                    <h1 className="bg-yellow-400  text-white mt-2 p-2 rounded-[15px] ">
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
            <form
              onSubmit={handleEdit}
              className="flex  flex-col gap-4 h-[70%] bg-[#02a95c] w-[70%] m-auto p-6 rounded-[20px] "
            >
              <div className="flex gap-6 justify-center ">
                <div className="flex items-center gap-3">
                  <label className="text-white font-bold" htmlFor="">
                    Loan Amount :{" "}
                  </label>
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
                  <label className="text-white font-bold" htmlFor="">
                    Loan Profit Rate :{" "}
                  </label>
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
              <input type="text" value={id} className="hidden" name="id" />
              <label className="text-white text-center font-bold">
                Loan Duration :{" "}
              </label>
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
      </div>
      <div className=" w-[30%] m-auto rounded-lg drop-shadow-lg  h-[94%] bg-white ">
      {loans.length == 0 ? (
             <div className="h-full flex flex-col items-center justify-center">
                <h3 className="font-bold text-xl w-[80%] text-center ">You have not submitted a loan yet</h3>
             </div>
            ) : (
              <div></div>
            )}
      </div>
    </div>
  );
};
