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
    const res = await axios.get(
      "http://localhost/api/fundingrequests/show",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRequests(res.data);
    console.log(requests);
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
      <div className="m-4">
        {requests.length == 0 ? (
          <button
            onClick={() => setPop(true)}
            className="flex p-2 rounded-[10px] text-white items-center gap-2 bg-[#02a95c]"
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
            Create a funding compagain
          </button>
        ) : (
          <button className="flex p-2 rounded-[10px] text-white items-center gap-2 bg-[#02a95c]">
            Your request is pending for review
          </button>
        )}
      </div>

      {requests.length !== 0 &&
        requests.map((request) => (
          <div className="w-[80%] flex flex-col m-3" key={request.id}>
            <div>
              <h1 className="text-2xl font-bold w-full">{request.title}</h1>
            </div>
            <div className="flex ">
              <div className="flex flex-col w-[90%] gap-3 overflow-auto">
                <img
                  className="w-[90%] rounded-[15px] border-2 border-black "
                  src={request.image}
                  alt="..."
                />
                <p className="text-lg">{request.description}</p>
              </div>
              <div className="flex flex-col w-[60%] justify-between drop-shadow rounded-[15px] border-2 border-slate p-2 ">
                <div className="flex items-center  gap-2 border-b-2 border-[#02a95c]">
                  <h1 className="text-2xl">${request.goal}</h1>
                  <h4 className="text-[#8d8d8d] ">compagain goal</h4>
                </div>
                <a
                  className="text-lg p-2 font-bold bg-[#fcb533] text-black text-center rounded-[15px] "
                  target="blank"
                  href={request.letter}
                >
                  Letter of Justification
                </a>
                <div className="flex items-center justify-between">
                  <a className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={25}
                    >
                    </svg>
                    Facebook
                  </a>
                  <button className="flex flex-col items-center bg-slate-200 p-2 rounded-full ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width={25}
                    >
                    </svg>
                  </button>
                </div>
                {request.reviewd === 0 ? (
                  <h1 className="text-xl text-center p-2 bg-[#fcb533] rounded-[15px] font-bold ">
                    {" "}
                    Under review{" "}
                  </h1>
                ) : (
                  <h1>Request Approved</h1>
                )}
              </div>
            </div>
          </div>
        ))}

      {pop && (
        <div className="absolute h-[50%] w-[50%] overflow-auto p-3 bg-[#02a95c] top-[15%] left-[20%] rounded-[15px] ">
          <div className="flex justify-center">
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
              type="text"
              className="p-2 rounded-[15px] text-center "
              placeholder="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex flex-col items-center">
              <label
                className="flex flex-col items-center text-white font-bold"
                htmlFor="image"
              >
                Upload Your Image :
                <svg
                  width={40}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="#ffffff"
                    d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z"
                  />
                </svg>
              </label>
              <input id="image" type="file" className="hidden" />
            </div>
            <div className="flex flex-col items-center">
              <label
                className="flex flex-col items-center text-white font-bold"
                htmlFor="letter"
              >
                Upload your letter of Justification:
                <svg
                  width={40}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="#ffffff"
                    d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z"
                  />
                </svg>
              </label>
              <input id="letter" type="file" className="hidden" />
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
            <button className="p-2 text-white font-bold">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};
