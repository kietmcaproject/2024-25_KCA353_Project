import React from "react";
import { BiSolidQuoteLeft } from "react-icons/bi";

const Card = () => {
  return (
    <div className="flex flex-wrap min-h-[90vh] justify-between items-center py-[60px] px-[80px] relative">
      
      <div className="bg-blue-100 w-[350px] p-[25px] rounded-xl pt-[80px]">
        <div> 
          <img
            className="w-[240px] absolute top-8 rounded-xl"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXZhdGFyfGVufDB8fDB8fHww"
          />
        </div>
        <div>
          <h1 className="my-[10px] text-gray-600 text-2xl">
            Scarlett Johansson
          </h1>
          <BiSolidQuoteLeft className="my-[5px text-2xl text-blue-400" />
          <p className="my-[5px] text-gray-600 text-[17px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
            officia?
          </p>
        </div>
      </div>

      <div className="bg-blue-100 w-[350px] p-[25px] rounded-xl pt-[80px]">
        <div>
          <img
            className="w-[240px] absolute top-8 rounded-xl"
            src="https://sb.kaleidousercontent.com/67418/1920x1281/0e9f02a048/christian-buehner-ditylc26zvi-unsplash.jpg"
          />
        </div>
        <div>
          <h1 className="my-[10px] text-gray-600 text-2xl">
            Abhishek Rana
          </h1>
          <BiSolidQuoteLeft className="my-[5px text-2xl text-blue-400" />
          <p className="my-[5px] text-gray-600 text-[17px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
            officia?
          </p>
        </div>
      </div>

      <div className="bg-blue-100 w-[350px] p-[25px] rounded-xl pt-[80px]">
        <div>
          <img
            className="w-[240px] absolute top-8 rounded-xl"
            src="https://media.istockphoto.com/id/1347005975/photo/portrait-of-a-serious-muslim-young-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=mxRUDCuwDD3ML6-vMaUlTY7Ghqlj2R_LOhWWCB5CTXE="
          />
        </div>
        <div>
          <h1 className="my-[10px] text-gray-600 text-2xl">
            Tom Holland
          </h1>
          <BiSolidQuoteLeft className="my-[5px text-2xl text-blue-400" />
          <p className="my-[5px] text-gray-600 text-[17px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
            officia?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
