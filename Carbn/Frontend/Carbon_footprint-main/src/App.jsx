import { NavLink } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-green-900 to-emerald-900 relative  flex justify-center items-center overflow-hidden">
        <FloatingShape
          color="bg-green-500"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-emerald-500"
          size="w-48 h-48"
          top="50%"
          left="60%"
          delay={5}
        />
        <FloatingShape
          color="bg-lime-500"
          size="w-32 h-32"
          top="40%"
          left="-10%"
          delay={2}
        />

        <div className=" gap-5 flex flex-col mt-8  text-center">
          <div>
            <h1 className=" text-6xl text-green-600">Welcome to</h1>
            <h1 className="text-8xl text-green-400">Corbon Footprint</h1>
            <h1 className="text-6xl text-green-600">Calculator</h1>
          </div>
          <p className="px-64 mt-6">
            <strong className="text-green-600 ">
              Track Your Impact with the Carbon Footprint Calculator
            </strong>
            <br />
            <span className="text-green-400">
              Discover how your daily choices affect the environment by
              calculating your carbon emissions. This tool provides personalized
              insights based on your activities, helping you make more
              eco-friendly decisions and reduce your carbon footprint.
            </span>
          </p>

          <div className="flex justify-center w-full mt-4">
            <NavLink to="FormPage">
              <button className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-green-700 rounded-md group">
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-400 rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-400 rounded group-hover:-ml-4 group-hover:-mb-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-green-400 rounded-md group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  Get Started
                </span>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
