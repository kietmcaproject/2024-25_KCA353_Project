import Helix from "@/public/assests/landingPage/cube-helix 1.png";
import Cube from "@/public/assests/landingPage/cube-helix.png";
import Image from "next/image";

const ProductCard = () => {
  return (
    <div className="pb-28 flex flex-col items-center">
      <div className="flex flex-col items-center justify-center pt-28 px-12 pb-10 md:w-[600px]">
        <div className="border-2 w-fit p-0.5 px-3 text-sm rounded-xl border-slate-300/80">
          About Us
        </div>
        <div className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">
          Meet the <br></br>InnovateX-KIET Team
        </div>

        <div className="text-center text-lg mb-8 md:text-xl">
         We are a dedicated team of MCA students from KIET Group of Institutions, passionate about leveraging technology to enhance the educational experience.
        </div>
      </div>

      <div className="flex flex-col gap-16 pt-4 lg:flex-row justify-center items-center px-8">
        <div className="shadow-2xl rounded-xl flex justify-center items-center flex-col p-8 max-w-[400px]">
          <Image src={Helix} alt="Helix" className="pb-4" />
          <div className="text-2xl font-bold pb-3 text-center">
            Amit Kumar Singh
          </div>
          <div className="text-center">
            Enhance your productivity by connecting with your favorite tools,
            keeping all your essentials in one place.
          </div>
        </div>

        <div className="shadow-2xl rounded-xl flex justify-center items-center flex-col p-8 max-w-[400px]">
          <Image src={Cube} alt="Cube" className="pb-4" />
          <div className="text-2xl font-bold pb-3 text-center">
            Anand Dhar Dwivedi
          </div>
          <div className="text-center">
            Define and track your goals, breaking down objectives into
            achievable tasks to keep your targets in sight.
          </div>
        </div>

        <div className="shadow-2xl rounded-xl flex justify-center items-center flex-col p-8 max-w-[400px]">
          <Image src={Cube} alt="Cube" className="pb-4" />
          <div className="text-2xl font-bold pb-3 text-center">
            Aditya Panday
          </div>
          <div className="text-center">
            Define and track your goals, breaking down objectives into
            achievable tasks to keep your targets in sight.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
