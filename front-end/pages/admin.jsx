import { AdminNav } from "../components/Admin/adminnav";
import { Dashboard } from "../components/Admin/dashboard";
export const Admin = () => {
  return (
    <>
      <div className="flex  h-screen ">
        <div className=" md:w-[20%]  flex flex-col items-center justify-center">
          <div className="flex  h-[95%] w-full md:w-[90%] ">
            <AdminNav />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex md:flex-col  md:w-[70%] ">
          <Dashboard />
        </div>
      </div>
    </>
  );
};
