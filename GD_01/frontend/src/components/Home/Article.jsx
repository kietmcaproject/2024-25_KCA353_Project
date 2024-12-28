import React from "react";
import { IoCarSportOutline  } from "react-icons/io5";
import { HiOutlineWallet } from "react-icons/hi2";
import { RiShieldStarLine } from "react-icons/ri";

function Article() {
  return (
    <div className="flex justify-between align-center py-[60px] px-[80px] flex-wrap">
      <div className="w-[200px] my-2">
        <h1 className="text-4xl font-semibold text-gray-400">Why choose driveOnDemand Self Drive Cars in Delhi?</h1>
      </div>

      <div className=" w-[200px] my-2">
        <IoCarSportOutline className="text-[50px] text-gray-600"/>
        <h2 className="font-semibold text-xl mt-[10px] text-gray-600">Accessible</h2>
        <p className="text-gray-500 mt-[10px]">There’s always a driveOnDemand near you</p>
      </div>

      <div className=" w-[200px] my-2">
        <HiOutlineWallet className="text-[50px] text-gray-600"/>
        <h2 className="font-semibold text-xl mt-[10px] text-gray-600">Secure</h2>
        <p className="text-gray-500 mt-[10px]">Pay 0 security deposit, get unlimited KMs</p>
      </div>

      <div className=" w-[200px] my-2">
        <RiShieldStarLine className="text-[50px] text-gray-600"/>
        <h2 className="font-semibold text-xl mt-[10px] text-gray-600">Convenient</h2>
        <p className="text-gray-500 mt-[10px]">From Hatchbacks to SUVs, choose from 25,000+ cars</p>
      </div>

    </div>
  );
}

export default Article;
