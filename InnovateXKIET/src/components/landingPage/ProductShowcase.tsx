"use client";

import ProductImage from "@/public/assests/landingPage/productImageFeed.png";
import Pyramid from "@/public/assests/landingPage/pyramid.png";
import Tube from "@/public/assests/landingPage/tube.png";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FaRegHandshake } from "react-icons/fa";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { SiCodementor } from "react-icons/si";
import { FaArrowRight } from "react-icons/fa";


const ProductShowcase = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-t from-[#acbae8] to-white flex flex-col items-center overflow-x-hidden pb-24"
    >
      <div className="flex flex-col items-center font-medium mt-24 px-8 mx-auto md:w-[550px] lg:w-[630px]">
        <div className="border-2 w-fit p-0.5 px-3 text-sm rounded-xl border-slate-300/80">
          Features
        </div>
        <div className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">
          A more effective way to track progress
        </div>

        <div className="text-center text-lg mb-8 md:text-xl">
          Seamlessly track your project progress and collaboration in real time, empowering students to achieve more together.
        </div>
      </div>
      <div className="relative ">
        <motion.img
          src={Pyramid.src}
          alt="Pyramid Image"
          className="absolute -right-24 -top-20 w-72 h-72 hidden md:block"
          style={{
            translateY: translateY,
          }}
        />
        <Image src={ProductImage} alt="Product Image" className="px-1 w-auto lg:w-[1200px]" />
        <motion.img
          src={Tube.src}
          alt="Tube Image"
          className="absolute w-72 h-72 top-64 -left-28 hidden md:block"
          style={{
            translateY: translateY,
          }}
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-20 max-w-[1400px] lg:px-28">

        <div className="mt-16">
          <HiMiniComputerDesktop className="text-2xl mb-3" />
          <div className="font-bold text-2xl">Promote Peer-to-Peer Learning</div>
          <div className="text-lg my-2">
        Enable students to learn from each other and share expertise across disciplines for mutual growth.
          </div>
          <div className="text-lg font-medium">
            Learn more <FaArrowRight className="inline h-3 w-3" />
          </div>
        </div>

            <div className="mt-16">
          <FaRegHandshake  className="text-2xl mb-3" />
          <div className="font-bold text-2xl">Enhance Student Collaboration</div>
          <div className="text-lg my-2">
            Track your progress and motivate your efforts everyday.
          </div>
          <div className="text-lg font-medium">
            Learn more <FaArrowRight className="inline h-3 w-3" />
          </div>
        </div>

           <div className="mt-16">
          <SiCodementor className="text-2xl mb-3" />
          <div className="font-bold text-2xl">Offer Mentorship Opportunities</div>
          <div className="text-lg my-2">
            Facilitate mentorship by connecting students with experienced peers and faculty for guidance and growth.
          </div>
          <div className="text-lg font-medium">
            Learn more <FaArrowRight className="inline h-3 w-3" />
          </div>
        </div>

        <div className="mt-16">
          <HiOutlineWrenchScrewdriver  className="text-2xl mb-3" />
          <div className="font-bold text-2xl">Support Project Development and Innovation</div>
          <div className="text-lg my-2">
            Provide resources that help students develop, manage, and execute innovative tech projects.
          </div>
          <div className="text-lg font-medium">
            Learn more <FaArrowRight className="inline h-3 w-3" />
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default ProductShowcase;
