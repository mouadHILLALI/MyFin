import { useEffect, useState } from "react";
import axios from "axios";
export const Dash = () => {
  const [pop, setPop] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(1000);
  const [requests, setRequests] = useState([]);
  let image = document.getElementById("image");
  let letter = document.getElementById("letter");
  const token = localStorage.getItem("token");
  const handleform = async (e) => {
    e.preventDefault();
    try {
      let fr = new FormData();
      fr.append("title", title);
      fr.append("description", description);
      fr.append("goal", goal);
      if (image.files && image.files[0]) {
        fr.append("image", image.files[0]);
      }
      if (letter.files && letter.files[0]) {
        fr.append("letter", letter.files[0]);
      }
      const res = await axios.post(
        "http://localhost/api/fundraiser/fundingrequest/create",
        fr,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchrequest();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchrequest = async () => {
    const res = await axios.get("http://localhost/api/fundingrequests/show", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRequests(res.data);
  };
  useEffect(() => {
    try {
      fetchrequest();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div className="flex flex-row justify-between  w-full h-[25%] p-2 mt-3">
        <div className="bg-[#ffffff] w-[30%] md:h-[70%] flex flex-col items-center justify-center p-3 drop-shadow-lg rounded-lg gap-2 ">
          {requests.length == 0 ? (
            <>
              <h3 className="text-sm text-[#344767] font-bold">
                Start a funding compagain:
              </h3>
              <button
                onClick={() => setPop(true)}
                className=" bg-[#02A95C] flex gap-2  items-center text-white text-lg  p-3 rounded-full "
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
            </>
          ) : (
            <button className="text-sm text-[#344767] font-bold">
              compagain submitted
            </button>
          )}
        </div>

        <div className="bg-[#ffffff] w-[30%] md:h-[70%] flex flex-col items-center justify-center p-3 drop-shadow-lg rounded-lg gap-2 "></div>
        <div className="bg-[#ffffff] w-[30%] md:h-[70%] flex flex-col items-center justify-center p-3 drop-shadow-lg rounded-lg gap-2 "></div>
      </div>

      <div className="flex h-[70%] flex-row justify-between w-full ">
        {requests.length !== 0 ? (
          requests.map((request) => (
            <div
              className=" flex flex-col  h-full w-[65%] bg-white p-2 drop-shadow-lg rounded-lg "
              key={request.id}
            >
              <div className="m-2 ">
                <h1 className="text-2xl text-green-600 font-bold w-full">{request.title}</h1>
              </div>

              <div className="flex ">
                <div className="flex flex-col w-[70%] h-[60%] ">
                  <img
                    className="w-[90%] rounded-lg"
                    src={request.image}
                    alt="..."
                  />
                  <p className="text-md m-4">{request.description}</p>
                </div>
                <div className="flex flex-col gap-5 items-start w-[30%]   p-2 ">
                  <div className="flex items-center  gap-2">
                    <h1 className="text-sm text-green-500">${request.goal}</h1>
                    <h4 className="text-[#344767] text-sm ">compagain goal</h4>
                  </div>
                  <a
                    className="text-sm  font-bold text-[#344767] text-center rounded-[15px] "
                    target="blank"
                    href={request.letter}
                  >
                    Letter of Justification
                  </a>
                  {request.reviewd === 0 ? (
                    <h1 className="text-xl text-center p-2 bg-[#fcb533] text-white rounded-lg font-bold ">
                      {" "}
                      Under review{" "}
                    </h1>
                  ) : (
                    <h1 className="text-xl text-center p-2 bg--green-500 text-white rounded-lg font-bold ">Request Approved</h1>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className=" flex flex-col justify-center h-full w-[65%] bg-white p-2 drop-shadow-lg rounded-lg ">
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
              <p className="text-[#02A95c]">
                You have no funding compagains yet.
              </p>
            </div>
          </div>
        )}
        <div className=" w-[30%] h-full flex flex-col p-2 bg-white drop-shadow-lg "></div>
      </div>
      {pop && (
        <div className="absolute h-[90%] w-[70%]  p-3 bg-[#edeff2] top-[3%] left-[20%] rounded-lg ">
          <div className="flex w-full justify-end p-2">
            <button onClick={() => setPop(false)}>
              <svg
                width={30}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="#ffffff"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </button>
          </div>
          <form
            onSubmit={handleform}
            className="flex flex-col justify-between h-full gap-4 "
          >
            <input
              type="text"
              className="p-2 rounded-[15px] text-center "
              placeholder="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="textarea"
              className="p-4 rounded-[15px] text-center "
              placeholder="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex w-full justify-around">
              <div className="flex flex-col items-center">
                <label
                  className="flex flex-col items-center text-[#344767] font-bold"
                  htmlFor="image"
                >
                  Upload Your Image :
                  <svg
                    width={40}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="#fffffff"
                      d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z"
                    />
                  </svg>
                </label>
                <input id="image" type="file" className="hidden" />
              </div>
              <div className="flex flex-col items-center">
                <label
                  className="flex flex-col items-center text-[#344767] font-bold"
                  htmlFor="letter"
                >
                  Upload your letter of Justification:
                  <svg
                    width={40}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="#fffffff"
                      d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z"
                    />
                  </svg>
                </label>
                <input id="letter" type="file" className="hidden" />
              </div>
            </div>
            <input
              type="number"
              className="p-2 rounded-[15px] text-center "
              min={1000}
              placeholder="fundraising goal"
              name="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <button className="p-2 text-[#344767] bg-green-400 w-[30%] m-auto rounded-lg font-bold">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};
