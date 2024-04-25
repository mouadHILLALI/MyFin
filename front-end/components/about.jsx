import buss from "../public/buss.png";
import invest from "../public/invest.png";
function About() {
  return (
    <>
      <div id="about" className="flex flex-col mb-5">
        <div className="flex  flex-col md:flex-row items-center w-[80%] m-auto justify-between">
          <div className="flex flex-col w-full md:w-[40%] gap-6">
            <h1 className="font-bold text-xl md:text-5xl">What is MyFin ? </h1>
            <p className="font-bold">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="flex flex-col w-full md:w-[45%]">
            <img width={350} src={buss} alt="buss" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center w-[80%] m-auto justify-between">
          <div className="flex flex-col w-full md:w-[40%] gap-6">
            <h1 className="font-bold text-xl md:text-5xl">Invest with MyFin</h1>
            <img src={invest} alt="invest" />
          </div>
          <div className="flex flex-col w-full md:w-[40%] m-1 md:mr-10 ">
            <p className="font-bold">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
