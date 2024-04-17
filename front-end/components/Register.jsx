import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

const Register = () => {
  const [first_name, setFirst_name] = useState("");
  const [family_name, setFamily_name] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  let image = document.getElementById("image");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData();
      if (image.files && image.files[0]) {
        form.append("image", image.files[0]);
      }
      form.append("first_name", first_name);
      form.append("family_name", family_name);
      form.append("role", role);
      form.append("password", password);
      form.append("email", email);
      const res = await axios.post("http://localhost/api/user/register", form);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('image', res.data.image);
      let Role = res.data.role ;
      localStorage.setItem("role",Role);
      switch (role) {
        case 'Investor':
          navigate('/investor');
          break;
        case 'FundRaiser' :
          navigate('/fundraiser');
          break;
      case 'Admin' : 
       navigate('/admin');
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="m-auto fixed top-[50%] left-[50%] ">
          <TailSpin color="red" radius={"8px"} />
        </div>
      ) : (
        <section className="flex h-[100vh] bg-[#FBF8F6] overflow-x-hidden justify-between">
          <div className="flex flex-col w-[30%] h-[50%] justify-around m-auto">
            <div className="h-[50%]">
              <h1 className="text-6xl text-[#4C4B4B]">MyFin</h1>
            </div>
            <div className="h-[30%] text-[#4C4B4B] flex flex-col gap-2">
              <h2 className="text-4xl">Lets Begin your Journey with MyFin</h2>
              <p className="text-xl">
                We are here to help you reach your goals
              </p>
            </div>
          </div>
          <div className="bg-white rounded-l-[60px] rounded-t-[0px] flex flex-col h-[90%]  w-[60%]  drop-shadow-md">
            <form
              encType="multipart/form/data"
              onSubmit={handleRegister}
              className="flex flex-col w-[60%] h-[90vh] m-auto justify-around"
            >
              <div className="p-3 border border-black rounded-[15px] w-[70%] ">
                <input
                  className="border-1 border-black rounded-lg  p-2"
                  type="text"
                  name="first_name"
                  placeholder="Enter your First name"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                />
              </div>
              <div className="p-3 border border-black rounded-[15px] w-[70%] ">
                <input
                  className="border-1 border-black p-2"
                  type="text"
                  name="family_name"
                  value={family_name}
                  onChange={(e) => setFamily_name(e.target.value)}
                  placeholder="Enter your Last name"
                />
              </div>
              <div className="p-3 border border-black rounded-[15px] w-[70%] ">
                <input
                  className="border-1 border-black p-2"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                />
              </div>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-3 border border-black rounded-[15px] w-[70%]"
                name="role"
              >
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
                <label className="text-center" htmlFor="image">
                  Upload your image
                </label>
                <input className="hidden" type="file" name="image" id="image" />
              </div>
              <div className="p-3 border border-black rounded-[15px] w-[70%] ">
                <input
                  className="border-1 border-black rounded-lg p-2"
                  type="password"
                  placeholder="Enter your Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
      )}
    </>
  );
};

export default Register;
